(function(){
  'use strict';
  if(window.__readingMemoryModeInstalled) return;
  window.__readingMemoryModeInstalled = true;

  function returnToMain(){
    try{
      window.location.replace('index.html#title');
    }catch(e){
      window.location.href='index.html#title';
    }
  }

  function openMode(storyId){
    storyId = storyId || '1';
    try{
      window.location.href = 'reading-memory.html?story=' + encodeURIComponent(storyId) + '&v=104';
    }catch(e){}
  }

  function bind(){
    var e=document.getElementById('readingMemoryModeBtn');
    if(e) e.addEventListener('click', openMode);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  window.__readingMemoryMode={open:openMode, returnToMain:returnToMain};
})();
