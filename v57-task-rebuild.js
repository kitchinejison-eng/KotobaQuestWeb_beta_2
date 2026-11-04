/* ことばクエスト V57｜対象課題の操作・UI再構成 */
(function(){
'use strict';
var $=function(id){return document.getElementById(id);};
var autoNextTimer=null;
var activityNames={fill:'穴埋め・自動言動',listen:'聴覚的指差し・選択',instruction:'聴覚的指示',board:'コミュニケーションボード'};
// 同一画像を使う複数問題でもSVGへ戻らないよう、JPG専用の参照表に統一。
var pictureJpg={
 'りんご':'matching/apple.jpg','林檎':'matching/apple.jpg',
 'バナナ':'matching/banana.jpg','みかん':'matching/mandarin.jpg','蜜柑':'matching/mandarin.jpg',
 'コーヒー':'matching/coffee.jpg','さくら':'matching/sakura.jpg','手洗い':'matching/handwash.jpg',
 'ごはん':'matching/rice.jpg','おふろ':'matching/bath.jpg','晴れ':'matching/sunny.jpg',
 'コップ':'matching/cup.jpg','タオル':'matching/towel.jpg','おさら':'matching/plate.jpg',
 'えんぴつ':'matching/enpitsu.jpg','バス':'matching/bus.jpg','でんしゃ':'listen/densya.jpg',
 'くるま':'matching/kuruma.jpg','くつ':'matching/kutu.jpg','かさ':'matching/kasa.jpg',
 'いぬ':'naming/inu.jpg','くま':'matching/kuma.jpg','ねこ':'matching/neko.jpg',
 'みず':'matching/mizu.jpg','とけい':'matching/tokei.jpg','かばん':'matching/kaban.jpg',
 'ほん':'matching/hon.jpg','いす':'matching/isu.jpg','さくらんぼ':'matching/sakuranbo.jpg',
 'スマートフォン':'matching/smartphone.jpg','じてんしゃ':'matching/jitensha.jpg','たまご':'matching/tamago.jpg',
 'パン':'matching/pan.jpg','せっけん':'matching/sekken.jpg','めがね':'matching/megane.jpg',
 'はさみ':'naming/hasami.jpg','でんわ':'matching/smartphone.jpg',
 'くつした':'cue/kutsushita.jpg','かぎ':'cue/kagi.jpg','ふうとう':'cue/fuutou.jpg','まくら':'cue/makura.jpg',
 'ひこうき':'listen/hikouki.jpg','ふね':'listen/fune.jpg'
};
var pictureMap={};
Object.keys(pictureJpg).forEach(function(word){pictureMap[word]=['images/quiz-jpg/'+pictureJpg[word],'画像を読み込めません'];});
// beta4: 聴覚的指差しの絵カードを独立したJPGにする。
// 添付画像がない交通機関は、問題内容を保った簡易イラストJPGを表示する。
var LISTEN_JPG_FILES={
 'りんご':'apple.jpg','くつ':'kutu.jpg','でんしゃ':'densya.jpg',
 'かさ':'kasa.jpg','ほん':'hon.jpg','とけい':'tokei.jpg',
 'パン':'pan.jpg','くるま':'kuruma.jpg',
 'ひこうき':'hikouki.jpg','ふね':'fune.jpg'
};
Object.keys(LISTEN_JPG_FILES).forEach(function(label){
 var info=pictureMap[label]||[null,'画像を読み込めません'];
 info[0]='images/quiz-jpg/listen/'+LISTEN_JPG_FILES[label];
 pictureMap[label]=info;
});
var actionJpg={
 '手をあげる':'raise-hand.jpg','目を閉じる':'close-eyes.jpg',
 '立ち上がる':'stand-up.jpg','座る':'sit.jpg',
 'ペンを持つ':'hold-pen.jpg','ペンを置く':'put-pen.jpg',
 'ペンを投げる':'throw-pen.jpg','本を閉じる':'close-book.jpg',
 '歩く':'walk.jpg','走る':'run.jpg'
};
function node(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;}
function button(text,cls,fn){var b=node('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
function setScore(){var n=$('score');if(n)n.textContent='正解 '+window.score;}
function resetFrame(q){
 if(autoNextTimer){clearTimeout(autoNextTimer);autoNextTimer=null;}
 window.answered=false;
 var game=$('game');if(game)game.classList.remove('aphasia-clear-mode-active');document.body.classList.remove('aphasia-clear-mode-active');
 var visual=$('visualArea'),img=$('questionImage'),emoji=$('emoji');
 if(visual){visual.classList.add('hidden');visual.classList.remove('aphasia-mode-visual','voice-read-hide-default-visual');}
 if(img){img.classList.add('hidden');img.removeAttribute('src');img.onload=null;img.onerror=null;}
 if(emoji){emoji.classList.remove('hidden');emoji.textContent='❓';}
 var title=$('trainingTitle');if(title){var cat=(window.selectedCategory&&window.selectedCategory.name)||(window.selectedGenre&&window.selectedGenre.name)||'トレーニング';title.textContent=cat+'｜'+(activityNames[window.selectedActivity]||window.selectedActivity||'練習');}
 var category=$('categoryLabel');if(category)category.textContent=(window.selectedCategory&&window.selectedCategory.name)||(window.selectedGenre&&window.selectedGenre.name)||'トレーニング';
 var label=$('questionLabel');if(label)label.textContent=q.question||'問題';
 var prog=$('progress');if(prog)prog.textContent=(window.current+1)+' / '+window.questions.length;
 setScore();
 var prompt=$('promptText');if(prompt){prompt.textContent='';prompt.classList.add('hidden');}
 var ins=$('instruction');if(ins){ins.textContent='';ins.classList.add('hidden');}
 var hint=$('hint');if(hint){hint.textContent=q.hint||'';hint.classList.add('hidden');}
 var hintBtn=$('hintBtn');if(hintBtn){hintBtn.textContent='💡 ヒント';hintBtn.classList.toggle('hidden',!(window.hintEnabled&&q.hint));}
 var speakBtn=$('speakBtn');if(speakBtn)speakBtn.textContent='🔊 お手本を聞く';
 var feedback=$('feedback');if(feedback){feedback.textContent='';feedback.className='feedback';}
 var next=$('nextBtn');if(next){next.classList.add('hidden');next.textContent='次へ →';}
 var voiceStatus=$('voiceStatus');if(voiceStatus)voiceStatus.textContent='';
 var area=$('answerArea');if(area){area.innerHTML='';area.className='answer-area v57-answer-area';}
}
function panel(intro){var p=node('section','v57-task-panel');if(intro){var lead=node('p','v57-task-intro',intro);p.appendChild(lead);}return p;}
function correct(btn,message){if(window.answered)return;window.answered=true;window.score++;setScore();if(btn)btn.classList.add('v57-correct');
 var fb=$('feedback');if(fb){fb.textContent='正解です。できました。'+(message?' '+message:'');fb.className='feedback ok';}
 if(typeof window.playCorrectSound==='function')window.playCorrectSound();if(typeof window.announceCorrect==='function')window.announceCorrect();
 disableTaskButtons();var next=$('nextBtn');if(next)next.classList.remove('hidden');}
function wrong(btn,message){if(window.answered)return;window.answered=true;if(btn)btn.classList.add('v57-wrong');
 var fb=$('feedback');if(fb){fb.textContent='不正解です。'+(message||'次の問題へ進みます。');fb.className='feedback ng';}
 disableTaskButtons();if(typeof window.playWrongSound==='function')window.playWrongSound();
 var at=window.current;autoNextTimer=setTimeout(function(){autoNextTimer=null;if(window.current===at&&typeof window.nextQuestion==='function')window.nextQuestion();},1450);}
function disableTaskButtons(){var area=$('answerArea');if(!area)return;area.querySelectorAll('button').forEach(function(b){b.disabled=true;});}
function choiceGrid(cls){return node('div',cls||'v57-choice-grid');}
function textChoice(choice,onAnswer){var b=button(choice,'v57-text-choice',function(){onAnswer(b,choice);});b.setAttribute('aria-label',choice);return b;}
function hero(q){var box=node('div','v57-hero');if(q.image){var image=node('img','v57-hero-image');image.alt='';image.style.display='none';var fallback=node('div','v57-hero-fallback','画像を読み込めません');image.onload=function(){image.style.display='block';fallback.style.display='none';};image.onerror=function(){image.style.display='none';fallback.style.display='grid';};box.append(image,fallback);image.src=q.image;}return box;}
function addImageChoice(grid,choice,onAnswer,showLabel){var info=pictureMap[choice]||[null,'画像を読み込めません'];var b=button('','v57-picture-choice',function(){onAnswer(b,choice);});b.setAttribute('aria-label',choice);var art=node('div','v57-picture-art');var fallback=node('span','v57-picture-fallback',info[1]);art.appendChild(fallback);if(info[0]){var im=node('img','v57-picture-choice-img');im.alt='';im.style.display='none';im.onload=function(){im.style.display='block';fallback.style.display='none';};im.onerror=function(){im.style.display='none';fallback.style.display='inline-flex';};im.src=info[0];art.appendChild(im);}b.appendChild(art);if(showLabel)b.appendChild(node('span','v57-picture-choice-label',choice));grid.appendChild(b);return b;}
function renderFill(q){resetFrame(q);var p=panel('文の空いているところに入る言葉を選びましょう。');var h=hero(q);if(h.childNodes.length)p.appendChild(h);var prompt=node('div','v57-fill-prompt',q.prompt||q.question||'');p.appendChild(prompt);var grid=choiceGrid('v57-choice-grid');(q.choices||[]).forEach(function(c){grid.appendChild(textChoice(c,function(b,val){if(val===q.answer)correct(b,'文を完成できました。');else wrong(b,'次の問題へ進みます。');}));});p.appendChild(grid);$('answerArea').appendChild(p);}
function speakText(text,force){if(typeof window.speak==='function')window.speak(text,!!force);}
function repeatAudio(text,label){return button('🔊　'+(label||'もう一度聞く'),'v57-repeat-audio',function(){speakText(text,true);});}
function renderListen(q){resetFrame(q);var word=q.voiceText||q.answer;var p=panel('音声を聞いて、合う絵のカードを選びましょう。文字の名前は表示しません。');p.appendChild(repeatAudio(word,'ことばをもう一度聞く'));var grid=choiceGrid('v57-picture-grid');(q.choices||[]).forEach(function(c){addImageChoice(grid,c,function(b,val){if(val===q.answer)correct(b,'聞いた言葉に合う絵を選べました。');else wrong(b,'次の問題へ進みます。');},false);});p.appendChild(grid);$('answerArea').appendChild(p);if(window.voiceEnabled)setTimeout(function(){if(window.selectedActivity==='listen'&&!window.answered)speakText(word);},380);}
function renderInstruction(q){resetFrame(q);var target=q.voiceText||q.answer;var p=panel('指示を音声で聞いて、合う動作を選びましょう。画面には正解の指示文を表示しません。');p.appendChild(repeatAudio(target,'指示をもう一度聞く'));var grid=choiceGrid('v57-action-choice-grid');(q.choices||[]).forEach(function(c){var b=button('','v57-action-choice',function(){if(c===q.answer)correct(b,'聞いた指示に合う動作を選べました。');else wrong(b,'次の問題へ進みます。');});var art=node('span','v57-action-icon');var fallback=node('span','v57-action-fallback','画像を読み込めません');art.appendChild(fallback);if(actionJpg[c]){var im=node('img','v57-action-jpg');im.alt='';im.style.cssText='display:block;width:100%;height:100%;max-width:108px;max-height:88px;object-fit:contain;border-radius:12px';im.onerror=function(){im.style.display='none';fallback.style.display='inline';};im.onload=function(){fallback.style.display='none';};im.src='images/quiz-jpg/instruction/'+actionJpg[c];art.appendChild(im);}b.appendChild(art);b.appendChild(node('span','v57-action-label',c));b.setAttribute('aria-label',c);grid.appendChild(b);});p.appendChild(grid);$('answerArea').appendChild(p);if(window.voiceEnabled)setTimeout(function(){if(window.selectedActivity==='instruction'&&!window.answered)speakText(target);},380);}
function iconAndPhrase(choice){var s=String(choice||'').trim();var parts=s.split(/\s+/);if(parts.length>1&&parts[0].length<=4)return {icon:parts.shift(),label:parts.join(' '),value:s};return {icon:({水:'💧',トイレ:'🚻',痛い:'🤕',休みたい:'🛏️',ごはん:'🍚',コーヒー:'☕'}[s]||'💬'),label:s,value:s};}
function renderBoard(q){resetFrame(q);var p=panel('伝えたい言葉を選びましょう。選んだ言葉は読み上げられます。');var chosen=null;var status=node('p','v57-board-status','まだ言葉を選んでいません。');status.setAttribute('aria-live','polite');var grid=choiceGrid('v57-board-grid');var buttons=[];
 (q.choices||[]).forEach(function(c){var data=iconAndPhrase(c);var b=button('','v57-board-card',function(){if(window.answered)return;chosen=data;buttons.forEach(function(x){x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b?'true':'false');});status.textContent='選択中：'+data.label+'。必要なら読み上げてから決定してください。';});b.setAttribute('aria-pressed','false');b.appendChild(node('span','v57-board-icon',data.icon));b.appendChild(node('span','v57-board-label',data.label));grid.appendChild(b);buttons.push(b);});p.appendChild(grid);p.appendChild(status);
 var actions=node('div','v57-board-actions');actions.appendChild(button('🔊　選んだ言葉を伝える','v57-board-speak',function(){if(!chosen){status.textContent='先に言葉のカードを選んでください。';return;}speakText(chosen.label,true);status.textContent='読み上げました：「'+chosen.label+'」。この言葉で進むか確認してください。';}));actions.appendChild(button('この言葉で決定　→','v57-board-confirm',function(){if(!chosen){status.textContent='先に言葉のカードを選んでください。';return;}if(chosen.value===q.answer)correct(null,'伝えたい内容に合うカードを選べました。');else wrong(null,'次の問題へ進みます。');}));p.appendChild(actions);$('answerArea').appendChild(p);}
// Correct data and instructions: auditory exercises must be heard, not read first.
if(window.QUESTIONS){
 (window.QUESTIONS.listen||[]).forEach(function(q){q.question='音声を聞いて、合う絵を選びましょう。';q.voiceText=q.voiceText||q.answer;});
 (window.QUESTIONS.instruction||[]).forEach(function(q){q.question='指示を聞いて、合う動作を選びましょう。';q.voiceText=q.answer;});
}
var originalRender=window.renderQuestion;
window.renderQuestion=function(){
 var id=window.selectedActivity;var q=window.questions&&window.questions[window.current];
 if(!q){if(typeof originalRender==='function')return originalRender.apply(this,arguments);return;}
 if(id==='fill')return renderFill(q);
 if(id==='listen')return renderListen(q);
 if(id==='instruction')return renderInstruction(q);
 if(id==='board')return renderBoard(q);
 return originalRender.apply(this,arguments);
};
})();
