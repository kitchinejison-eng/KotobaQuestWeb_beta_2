/* Kotoba Quest beta8.7: shared Japanese OCR for browser and Android WebView.
 * Tesseract.js v7 + its WASM core are packaged locally.  The Japanese model
 * is downloaded on first use and kept in the browser's IndexedDB cache.
 * Do not pass the expected answer to any recognizer or image preprocessor.
 */
(function(root){
 'use strict';
 var engine=null,enginePromise=null,libraryPromise=null;
 var listeners=[];
 var base=new URL('./',document.currentScript&&document.currentScript.src||new URL('ocr/browser-japanese-ocr.js',document.baseURI).href);
 function asset(relative){return new URL(relative,base).href;}
 function notice(message){listeners.slice().forEach(function(fn){try{fn(message);}catch(_){}});}
 function loadLibrary(){
  if(root.Tesseract&&typeof root.Tesseract.createWorker==='function')return Promise.resolve();
  if(libraryPromise)return libraryPromise;
  libraryPromise=new Promise(function(resolve,reject){
   var script=document.createElement('script');script.src=asset('vendor/tesseract.min.js');script.async=true;
   script.onload=function(){if(root.Tesseract&&typeof root.Tesseract.createWorker==='function')resolve();else reject(new Error('ocr-library-unavailable'));};
   script.onerror=function(){reject(new Error('ocr-library-unavailable'));};
   document.head.appendChild(script);
  }).catch(function(err){libraryPromise=null;throw err;});
  return libraryPromise;
 }
 function supported(){return typeof root.Worker==='function'&&typeof root.WebAssembly==='object'&&typeof document.createElement==='function';}
 function prepare(onProgress){
  if(!supported())return Promise.reject(new Error('ocr-unsupported-device'));
  if(engine)return Promise.resolve(engine);
  if(typeof onProgress==='function')listeners.push(onProgress);
  if(!enginePromise)enginePromise=(async function(){
   notice('日本語の文字認識を準備しています。初回はモデルのダウンロードが必要です。');
   await loadLibrary();
   // The same Tesseract.js model and configuration are used by both platforms.
   var worker=await root.Tesseract.createWorker('jpn',root.Tesseract.OEM.LSTM_ONLY,{
    workerPath:asset('vendor/worker.min.js'),
    corePath:asset('vendor/core'),
    cacheMethod:'write',
    logger:function(state){
     if(!state||!state.status)return;
     if(/loading language|initializing|loading tesseract|recognizing text/i.test(state.status)){
      var percent=typeof state.progress==='number'?' '+Math.round(state.progress*100)+'%':'';
      notice('日本語OCRの準備中：'+state.status+percent);
     }
    }
   });
   try{
    await worker.setParameters({tessedit_pageseg_mode:String(root.Tesseract.PSM.SINGLE_CHAR),user_defined_dpi:'300'});
   }catch(err){try{await worker.terminate();}catch(_){}throw err;}
   engine=worker;notice('日本語OCRの準備ができました。');return worker;
  })().catch(function(err){enginePromise=null;notice('日本語OCRを準備できませんでした。インターネット接続を確認してください。');throw err;});
  if(typeof onProgress==='function')return enginePromise.finally(function(){var index=listeners.indexOf(onProgress);if(index!==-1)listeners.splice(index,1);});
  return enginePromise;
 }
 // Render only actual writing strokes. Never send the guide grid to OCR.
 // In beta8.6 the line width was scaled with the coordinates, turning small
 // handwriting into very thick, closed-up glyphs. Keep its final pixel width
 // constant while normalizing the writing area.
 function makeImage(cell,variant){
  var strokes=(cell&&cell.strokes)||[],points=[];
  strokes.forEach(function(s){(s.points||[]).forEach(function(p){if(Number.isFinite(p.x)&&Number.isFinite(p.y))points.push(p);});});
  if(!points.length)throw new Error('ocr-empty-ink');
  var x1=Math.min.apply(null,points.map(function(p){return p.x;})),x2=Math.max.apply(null,points.map(function(p){return p.x;}));
  var y1=Math.min.apply(null,points.map(function(p){return p.y;})),y2=Math.max.apply(null,points.map(function(p){return p.y;}));
  var canvas=document.createElement('canvas');canvas.width=384;canvas.height=384;
  var ctx=canvas.getContext('2d');if(!ctx)throw new Error('ocr-canvas-unavailable');
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,384,384);
  var spanX=Math.max(12,x2-x1),spanY=Math.max(12,y2-y1);
  var imageSize=variant==='compact'?268:300;
  var scale=Math.min(imageSize/spanX,imageSize/spanY);
  var left=(384-(x2-x1)*scale)/2-x1*scale;
  var top=(384-(y2-y1)*scale)/2-y1*scale;
  function map(p){return {x:left+p.x*scale,y:top+p.y*scale};}
  ctx.strokeStyle='#101010';ctx.fillStyle='#101010';ctx.lineWidth=variant==='compact'?8:11;
  ctx.lineCap='round';ctx.lineJoin='round';
  strokes.forEach(function(s){var ps=(s.points||[]).filter(function(p){return Number.isFinite(p.x)&&Number.isFinite(p.y);});if(!ps.length)return;
   var start=map(ps[0]);ctx.beginPath();ctx.moveTo(start.x,start.y);
   for(var i=1;i<ps.length;i++){var point=map(ps[i]);ctx.lineTo(point.x,point.y);}
   if(ps.length===1){ctx.arc(start.x,start.y,ctx.lineWidth/2,0,2*Math.PI);ctx.fill();}else ctx.stroke();
  });
  return canvas.toDataURL('image/png');
 }
 function normalized(s){return String(s||'').normalize('NFKC').replace(/[\s\r\n\u3000「」『』。、,.・!！?？]/g,'');}
 // Multiple independent OCR passes, without ever supplying the exercise answer.
 // A second segmentation mode and a thinner image rescue faint/irregular ink.
 // Low-confidence garbage remains ungraded, rather than inflating wrong counts.
 async function recognizeCell(worker,cell,index){
  var readings=[];
  async function pass(variant,mode){
   await worker.setParameters({tessedit_pageseg_mode:String(mode)});
   var result=await worker.recognize(makeImage(cell,variant));
   var text=normalized(result&&result.data&&result.data.text);
   var confidence=Number(result&&result.data&&result.data.confidence)||0;
   if(Array.from(text).length===1&&confidence>0)readings.push({text:text,confidence:confidence});
   return {text:text,confidence:confidence};
  }
  var primary=await pass('regular',root.Tesseract.PSM.SINGLE_CHAR);
  if(Array.from(primary.text).length===1&&primary.confidence>=60)
   return {text:primary.text,candidates:[primary.text],confidence:primary.confidence,passes:1};
  notice('文字の形を変えて再確認しています（'+(index+1)+'文字目）…');
  await pass('regular',root.Tesseract.PSM.SINGLE_WORD||'8');
  var strongest=readings.reduce(function(best,r){return Math.max(best,r.confidence);},0);
  if(strongest<55)await pass('compact',root.Tesseract.PSM.SINGLE_CHAR);
  var grouped=Object.create(null);
  readings.forEach(function(r){if(!grouped[r.text])grouped[r.text]={text:r.text,max:0,count:0};
   grouped[r.text].count++;grouped[r.text].max=Math.max(grouped[r.text].max,r.confidence);});
  var ranked=Object.keys(grouped).map(function(key){return grouped[key];}).sort(function(a,b){
   return (b.max+Math.min(b.count-1,2)*8)-(a.max+Math.min(a.count-1,2)*8);
  });
  var best=ranked[0];
  if(!best||!(best.max>=22||(best.count>=2&&best.max>=10))){
   var error=new Error('ocr-low-confidence');error.cellIndex=index;throw error;
  }
  return {text:best.text,candidates:ranked.map(function(r){return r.text;}),confidence:best.max,passes:readings.length};
 }
 async function recognize(cells,onProgress){
  if(!Array.isArray(cells)||cells.length<1||cells.length>4)throw new Error('ocr-invalid-input');
  if(typeof onProgress==='function')listeners.push(onProgress);
  try{
   var worker=await prepare();var texts=[],candidates=[],confidences=[],passes=[];
   for(var i=0;i<cells.length;i++){
    notice('手書き文字を認識しています（'+(i+1)+'/'+cells.length+'文字）…');
    var reading=await recognizeCell(worker,cells[i],i);
    texts.push(reading.text);candidates.push(reading.candidates);
    confidences.push(reading.confidence);passes.push(reading.passes);
   }
   return {texts:texts,cellCandidates:candidates,phraseCandidates:[],ocrConfidence:confidences,ocrPasses:passes,recognitionEngine:'tesseract-jpn-v7-multipass'};
  }finally{
   if(typeof onProgress==='function'){var index=listeners.indexOf(onProgress);if(index!==-1)listeners.splice(index,1);}
  }
 }
 root.KotobaJapaneseOCR={supported:supported,prepare:prepare,recognize:recognize};
})(window);
