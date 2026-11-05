/* Kotoba Quest beta8.6: shared Japanese OCR for browser and Android WebView.
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
 // Render only actual writing strokes.  The guide grid is never supplied to OCR.
 function makeImage(cell){
  var strokes=(cell&&cell.strokes)||[],points=[];
  strokes.forEach(function(s){(s.points||[]).forEach(function(p){if(Number.isFinite(p.x)&&Number.isFinite(p.y))points.push(p);});});
  if(!points.length)throw new Error('ocr-empty-ink');
  var x1=Math.min.apply(null,points.map(function(p){return p.x;})),x2=Math.max.apply(null,points.map(function(p){return p.x;}));
  var y1=Math.min.apply(null,points.map(function(p){return p.y;})),y2=Math.max.apply(null,points.map(function(p){return p.y;}));
  var canvas=document.createElement('canvas');canvas.width=384;canvas.height=384;
  var ctx=canvas.getContext('2d');if(!ctx)throw new Error('ocr-canvas-unavailable');
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,384,384);
  var spanX=Math.max(12,x2-x1),spanY=Math.max(12,y2-y1);
  var scale=Math.min(304/spanX,304/spanY);
  ctx.translate((384-spanX*scale)/2-x1*scale,(384-spanY*scale)/2-y1*scale);
  ctx.scale(scale,scale);ctx.strokeStyle='#101010';ctx.fillStyle='#101010';ctx.lineWidth=8;ctx.lineCap='round';ctx.lineJoin='round';
  strokes.forEach(function(s){var ps=(s.points||[]).filter(function(p){return Number.isFinite(p.x)&&Number.isFinite(p.y);});if(!ps.length)return;
   ctx.beginPath();ctx.moveTo(ps[0].x,ps[0].y);for(var i=1;i<ps.length;i++)ctx.lineTo(ps[i].x,ps[i].y);
   if(ps.length===1){ctx.arc(ps[0].x,ps[0].y,4,0,2*Math.PI);ctx.fill();}else ctx.stroke();
  });
  return canvas.toDataURL('image/png');
 }
 function normalized(s){return String(s||'').normalize('NFKC').replace(/[\s\r\n\u3000「」『』。、,.・!！?？]/g,'');}
 async function recognize(cells,onProgress){
  if(!Array.isArray(cells)||cells.length<1||cells.length>4)throw new Error('ocr-invalid-input');
  if(typeof onProgress==='function')listeners.push(onProgress);
  try{
   var worker=await prepare();var texts=[],candidates=[],confidences=[];
   for(var i=0;i<cells.length;i++){
    notice('手書き文字を認識しています（'+(i+1)+'/'+cells.length+'文字）…');
    var picture=makeImage(cells[i]);
    var result=await worker.recognize(picture);
    var text=normalized(result&&result.data&&result.data.text);
    var confidence=Number(result&&result.data&&result.data.confidence)||0;
    // No forced success on ink quantity or target-dependent character filtering.
    // Invalid/uncertain OCR is not scored as an incorrect handwritten response.
    if(Array.from(text).length!==1||confidence<25)throw new Error('ocr-low-confidence');
    texts.push(text);candidates.push([text]);confidences.push(confidence);
   }
   return {texts:texts,cellCandidates:candidates,phraseCandidates:[],ocrConfidence:confidences,recognitionEngine:'tesseract-jpn-v7'};
  }finally{
   if(typeof onProgress==='function'){var index=listeners.indexOf(onProgress);if(index!==-1)listeners.splice(index,1);}
  }
 }
 root.KotobaJapaneseOCR={supported:supported,prepare:prepare,recognize:recognize};
})(window);
