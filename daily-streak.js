/* ことばクエスト V108: daily streak, flower emblem and pictogram celebration. */
(function(global){
  'use strict';
  var KEY='kotobaQuestDailyStreakV1';
  var fallback=null;
  var fallbackSaved=true;

  function localDay(date){
    var d=date||new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function dayIndex(day){
    if(typeof day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(day))return null;
    var y=+day.slice(0,4),m=+day.slice(5,7),d=+day.slice(8,10);
    var check=new Date(Date.UTC(y,m-1,d));
    if(check.getUTCFullYear()!==y||check.getUTCMonth()!==m-1||check.getUTCDate()!==d)return null;
    return Math.floor(Date.UTC(y,m-1,d)/86400000);
  }
  function number(value){return Math.max(0,Math.min(100000,Math.floor(Number(value)||0)));}
  function dateKeyFromIndex(index){return new Date(index*86400000).toISOString().slice(0,10);}
  function normalizedDates(value){
    if(!Array.isArray(value))return [];
    return Array.from(new Set(value.filter(function(v){return dayIndex(v)!==null;}))).sort().slice(-3650);
  }
  function read(){
    var data=fallback;
    if(fallbackSaved){try{var raw=global.localStorage.getItem(KEY);if(raw)data=JSON.parse(raw);}catch(e){}}
    if(!data||typeof data!=='object')data={};
    var lastDate=dayIndex(data.lastDate)!==null?data.lastDate:null;
    var days=number(data.days);
    var dates=normalizedDates(data.completedDates);
    // Older V106 saves had only the last date and the ongoing day count.
    // Recreate only those known consecutive days; do not invent older history.
    if(!Array.isArray(data.completedDates)&&lastDate&&days){
      var last=dayIndex(lastDate);
      for(var i=Math.min(days,3650)-1;i>=0;i--)dates.push(dateKeyFromIndex(last-i));
      dates=normalizedDates(dates);
    }
    return {lastDate:lastDate,days:days,best:Math.max(number(data.best),days),completedDates:dates};
  }
  function save(data){
    fallback=data;
    try{global.localStorage.setItem(KEY,JSON.stringify(data));fallbackSaved=true;return true;}
    catch(e){fallbackSaved=false;return false;}
  }
  function summary(){
    var today=localDay(new Date()),data=read(),delta=data.lastDate?dayIndex(today)-dayIndex(data.lastDate):null;
    var completedToday=delta===0;
    var activeDays=(delta===0||delta===1)?data.days:0;
    return {days:activeDays,best:data.best,completedToday:completedToday,lastDate:data.lastDate,today:today,completedDates:data.completedDates.slice()};
  }
  function complete(){
    var today=localDay(new Date()),data=read(),delta=data.lastDate?dayIndex(today)-dayIndex(data.lastDate):null;
    var already=delta===0;
    var recovered=!already&&data.days>0&&delta!==1;
    if(!already){
      data.days=delta===1?data.days+1:1;
      data.best=Math.max(data.best,data.days);
      data.lastDate=today;
      data.completedDates=normalizedDates(data.completedDates.concat(today));
    }
    var saved=already?fallbackSaved:save(data);
    var result={days:data.days,best:data.best,already:already,recovered:recovered,saved:saved,today:today};
    refreshBadge();
    return result;
  }
  function element(target){return typeof target==='string'?global.document.getElementById(target):target;}
  function pictogramSvg(){
    // The user's raised-fist pictogram, recreated as a small vector silhouette.
    return '<svg class="daily-streak-hero" viewBox="0 0 170 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
      '<circle cx="81" cy="43" r="14" fill="currentColor"/>'+
      '<path d="M88 69 L88 116 M81 82 L65 100 L54 87 M88 115 L64 174 M88 115 L117 173" stroke="currentColor" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
      '<g class="daily-streak-raised-arm"><path d="M94 77 L129 19" stroke="currentColor" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="129" cy="19" r="7" fill="currentColor"/></g></svg>';
  }
  var celebrationTimer=null;
  function celebrate(outcome){
    if(!global.document||!global.document.body||outcome.already)return;
    var previous=global.document.getElementById('dailyStreakCelebration');
    if(previous&&previous.parentNode)previous.parentNode.removeChild(previous);
    if(celebrationTimer){clearTimeout(celebrationTimer);celebrationTimer=null;}
    var overlay=global.document.createElement('div');
    overlay.id='dailyStreakCelebration';
    overlay.className='daily-streak-celebration';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','連続記録を達成しました');
    overlay.innerHTML='<div class="daily-streak-celebration-card">'+
      '<div class="daily-streak-petals" aria-hidden="true"><span>🌸</span><span>🌼</span><span>🌸</span><span>🌼</span><span>🌸</span><span>🌼</span></div>'+
      '<div class="daily-streak-celebration-hero">'+pictogramSvg()+'</div>'+
      '<div class="daily-streak-celebration-kicker"></div>'+
      '<h2 class="daily-streak-celebration-title"></h2>'+
      '<p class="daily-streak-celebration-note"></p>'+
      '<button type="button" class="daily-streak-celebration-close">結果を見る ✓</button></div>';
    overlay.querySelector('.daily-streak-celebration-kicker').textContent=outcome.preview?'🌸 演出のプレビュー':'🌸 今日のレッスン完了！';
    overlay.querySelector('.daily-streak-celebration-title').textContent=outcome.recovered?'1日目から再スタート！':outcome.days===1?'1日目 達成！':outcome.days+'日連続 達成！';
    overlay.querySelector('.daily-streak-celebration-note').textContent=outcome.preview?'これは見本です。連続記録は増えません。':'がんばりました！ 明日も1回続けてみよう。';
    var closing=false;
    function close(){
      if(closing)return;
      closing=true;
      if(celebrationTimer)clearTimeout(celebrationTimer);
      celebrationTimer=null;
      overlay.classList.remove('is-visible');
      global.setTimeout(function(){if(overlay.parentNode)overlay.parentNode.removeChild(overlay);},240);
    }
    overlay.querySelector('.daily-streak-celebration-close').addEventListener('click',close);
    overlay.addEventListener('click',function(e){if(e.target===overlay)close();});
    overlay.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    global.document.body.appendChild(overlay);
    try{overlay.querySelector('.daily-streak-celebration-close').focus({preventScroll:true});}catch(e){}
    global.setTimeout(function(){if(!closing)overlay.classList.add('is-visible');},20);
    celebrationTimer=global.setTimeout(close,4600);
  }
  function renderResult(target,result){
    var host=element(target);if(!host||!global.document)return;
    var state=result||summary();
    var already=!!state.already,days=number(state.days);
    var heading=already?'今日の記録は達成済み！':state.recovered?'今日から再スタート！':days===1?'1日目 達成！':days+'日連続 達成！';
    var message=already?'今日はもう記録済み。何度でも練習できます。':
      '今日のレッスンを完了しました。明日も1回続けると記録が増えます。';
    if(!state.saved)message+='（この端末への保存は確認できませんでした）';
    host.innerHTML='<div class="daily-streak-banner" role="status" aria-live="polite">'+
      '<div class="daily-streak-pictogram" aria-hidden="true">'+pictogramSvg()+'<span class="daily-streak-blossom">🌸</span></div><div class="daily-streak-copy">'+
      '<strong class="daily-streak-heading"></strong><div class="daily-streak-count"></div>'+
      '<p class="daily-streak-message"></p><small class="daily-streak-best"></small></div></div>';
    host.querySelector('.daily-streak-heading').textContent=heading;
    host.querySelector('.daily-streak-count').textContent=days+'日連続';
    host.querySelector('.daily-streak-message').textContent=message;
    host.querySelector('.daily-streak-best').textContent='自己ベスト '+number(state.best)+'日';
  }
  function refreshBadge(){
    if(!global.document)return;
    var badge=global.document.getElementById('dailyStreakHomeBadge');
    if(!badge)return;
    var state=summary();
    badge.textContent=state.completedToday?'🌸 '+state.days+'日連続・今日も達成！':
      state.days?'🌸 '+state.days+'日連続・今日の練習で継続！':'🌸 今日のレッスン完了で1日目';
  }
  function finish(target){var outcome=complete();renderResult(target,outcome);celebrate(outcome);return outcome;}
  function preview(){var state=summary();celebrate({days:state.days||1,already:false,recovered:false,preview:true});}
  function completedDates(){return read().completedDates.slice();}
  function hasCompleted(date){return completedDates().indexOf(date)!==-1;}
  global.KotobaDailyStreak={complete:complete,finish:finish,preview:preview,summary:summary,completedDates:completedDates,hasCompleted:hasCompleted,renderResult:renderResult,refreshBadge:refreshBadge};
  if(global.document){
    if(global.document.readyState==='loading')global.document.addEventListener('DOMContentLoaded',refreshBadge);
    else refreshBadge();
  }
})(window);
