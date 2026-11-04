(function(){
  'use strict';
  if(window.__communityBoardInstalled) return;
  window.__communityBoardInstalled=true;

  var POSTS_KEY='kotobaquest_community_v40_posts';
  var PROFILE_KEY='kotobaquest_community_v40_profile';
  var REPORTED_KEY='kotobaquest_community_v40_reports';
  var selectedAvatar='🌱';
  var activeFilter='すべて';
  var openReplyId=null;
  var profile=readJson(PROFILE_KEY,null);
  if(!profile || typeof profile!=='object') profile={id:newId(),name:'ことば練習中',avatar:'🌱'};
  if(!profile.id) profile.id=newId();
  if(!profile.name) profile.name='ことば練習中';
  if(!profile.avatar) profile.avatar='🌱';
  selectedAvatar=profile.avatar;

  function $(id){return document.getElementById(id);}
  function newId(){return 'u-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9);}
  function readJson(key,fallback){try{var v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v);}catch(e){return fallback;}}
  function writeJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch(e){return false;}}
  function getPosts(){var posts=readJson(POSTS_KEY,[]);return Array.isArray(posts)?posts.filter(function(p){return p&&typeof p==='object'&&typeof p.text==='string';}):[];}
  function setPosts(posts){writeJson(POSTS_KEY,posts);}
  function timeLabel(ts){try{return new Intl.DateTimeFormat('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(ts));}catch(e){return '';}}
  function el(tag,className,text){var node=document.createElement(tag);if(className)node.className=className;if(text!==undefined&&text!==null)node.textContent=String(text);return node;}
  function button(label,action,className){var b=el('button',className||'community-action',label);b.type='button';b.dataset.action=action;return b;}

  function saveProfile(showMessage){
    var input=$('communityNickname');
    var name=input ? input.value.trim().slice(0,16) : profile.name;
    if(!name){if(input)input.focus();setStatus('communityProfileStatus','ニックネームを入力してください。');return false;}
    profile.name=name;profile.avatar=selectedAvatar;
    if(!writeJson(PROFILE_KEY,profile)){setStatus('communityProfileStatus','保存できませんでした。端末の空き容量をご確認ください。');return false;}
    if(showMessage)setStatus('communityProfileStatus','プロフィールを保存しました。');
    renderPosts();return true;
  }
  function setStatus(id,message){var n=$(id);if(n)n.textContent=message||'';}
  function setAvatar(avatar){selectedAvatar=avatar;document.querySelectorAll('.community-avatar-choice').forEach(function(b){var on=b.dataset.avatar===avatar;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',on?'true':'false');});}

  function renderPosts(){
    var list=$('communityPostList');if(!list)return;
    list.textContent='';
    var all=getPosts().sort(function(a,b){return Number(b.createdAt||0)-Number(a.createdAt||0);});
    var filtered=activeFilter==='すべて'?all:all.filter(function(p){return p.category===activeFilter;});
    var total=$('communityPostTotal');if(total)total.textContent=all.length+'件';
    if(!filtered.length){
      var empty=el('div','community-empty');
      empty.appendChild(el('div','community-empty-icon','🌱'));
      empty.appendChild(el('strong','',activeFilter==='すべて'?'まだ投稿はありません':'この種類の投稿はまだありません'));
      empty.appendChild(el('p','','最初の投稿をして、共有の場を作りましょう。'));
      list.appendChild(empty);return;
    }
    filtered.forEach(function(post){
      var card=el('article','community-post-card');
      var head=el('div','community-post-head');
      head.appendChild(el('span','community-post-avatar',post.avatar||'🌱'));
      var meta=el('div','community-post-meta');
      meta.appendChild(el('strong','community-post-author',post.authorName||'ことば練習中'));
      meta.appendChild(el('span','community-post-time',timeLabel(post.createdAt||Date.now())));
      head.appendChild(meta);
      head.appendChild(el('span','community-category-tag',post.category||'日常'));
      card.appendChild(head);
      card.appendChild(el('p','community-post-body',post.text));
      var actions=el('div','community-post-actions');
      var liked=Array.isArray(post.likedBy)&&post.likedBy.indexOf(profile.id)!==-1;
      var likeBtn=button((liked?'♥ 共感済み':'♡ 共感')+' '+(Array.isArray(post.likedBy)?post.likedBy.length:0),'like','community-action community-like'+(liked?' liked':''));
      likeBtn.dataset.postId=post.id;actions.appendChild(likeBtn);
      var replies=Array.isArray(post.replies)?post.replies:[];
      var replyBtn=button('返信 '+replies.length,'reply-toggle','community-action');replyBtn.dataset.postId=post.id;actions.appendChild(replyBtn);
      var reportBtn=button('通報','report','community-action community-report');reportBtn.dataset.postId=post.id;actions.appendChild(reportBtn);
      if(post.authorId===profile.id){var deleteBtn=button('削除','delete','community-action community-delete');deleteBtn.dataset.postId=post.id;actions.appendChild(deleteBtn);}
      card.appendChild(actions);
      if(openReplyId===post.id){
        var replyArea=el('div','community-reply-area');
        replies.forEach(function(reply){
          var row=el('div','community-reply');
          row.appendChild(el('span','community-reply-avatar',reply.avatar||'🌱'));
          var body=el('div','community-reply-content');
          body.appendChild(el('strong','',reply.authorName||'ことば練習中'));
          body.appendChild(el('p','',reply.text));
          body.appendChild(el('small','',timeLabel(reply.createdAt||Date.now())));
          row.appendChild(body);replyArea.appendChild(row);
        });
        var form=el('form','community-reply-form');
        var input=el('input','community-text-input');input.type='text';input.maxLength=500;input.placeholder='返信を書く';input.setAttribute('aria-label','返信本文');input.required=true;
        var send=el('button','community-button community-button-primary','返信する');send.type='submit';
        form.appendChild(input);form.appendChild(send);
        form.addEventListener('submit',function(ev){ev.preventDefault();var text=input.value.trim();if(!text)return;var latest=getPosts();var p=latest.find(function(x){return x.id===post.id;});if(!p)return;if(!Array.isArray(p.replies))p.replies=[];p.replies.push({id:newId(),authorId:profile.id,authorName:profile.name,avatar:profile.avatar,text:text,createdAt:Date.now()});setPosts(latest);renderPosts();});
        replyArea.appendChild(form);card.appendChild(replyArea);
      }
      list.appendChild(card);
    });
  }

  function postMessage(){
    if(!saveProfile(false))return;
    var textarea=$('communityPostText'), category=$('communityCategory');
    var text=textarea?textarea.value.trim():'';
    if(!text){setStatus('communityPostStatus','本文を入力してください。');if(textarea)textarea.focus();return;}
    var posts=getPosts();
    posts.push({id:newId(),authorId:profile.id,authorName:profile.name,avatar:profile.avatar,category:category?category.value:'日常',text:text,createdAt:Date.now(),likedBy:[],replies:[],reports:[]});
    if(!writeJson(POSTS_KEY,posts)){setStatus('communityPostStatus','保存できませんでした。端末の空き容量をご確認ください。');return;}
    if(textarea)textarea.value='';updateCharCount();activeFilter='すべて';updateFilters();setStatus('communityPostStatus','投稿を保存しました（この端末内のみ）。');renderPosts();
  }
  function updateCharCount(){var t=$('communityPostText'),n=$('communityCharCount');if(t&&n)n.textContent=t.value.length+' / 1000';}
  function updateFilters(){document.querySelectorAll('.community-filter').forEach(function(b){var on=b.dataset.filter===activeFilter;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');});}
  function onListClick(ev){
    var b=ev.target.closest('button[data-action]');if(!b)return;
    var id=b.dataset.postId, action=b.dataset.action, posts=getPosts(),post=posts.find(function(p){return p.id===id;});if(!post)return;
    if(action==='like'){
      if(!Array.isArray(post.likedBy))post.likedBy=[];var idx=post.likedBy.indexOf(profile.id);if(idx<0)post.likedBy.push(profile.id);else post.likedBy.splice(idx,1);setPosts(posts);renderPosts();
    }else if(action==='reply-toggle'){
      openReplyId=openReplyId===id?null:id;renderPosts();
      if(openReplyId){var input=document.querySelector('.community-reply-form input');if(input)input.focus();}
    }else if(action==='delete'){
      if(post.authorId!==profile.id)return;
      if(window.confirm('この投稿を削除しますか？')){setPosts(posts.filter(function(p){return p.id!==id;}));if(openReplyId===id)openReplyId=null;renderPosts();}
    }else if(action==='report'){
      var reports=readJson(REPORTED_KEY,[]);if(!Array.isArray(reports))reports=[];
      if(reports.some(function(r){return r.postId===id&&r.profileId===profile.id;})){window.alert('この投稿はすでに通報済みです（試作記録）。');return;}
      reports.push({postId:id,profileId:profile.id,createdAt:Date.now()});writeJson(REPORTED_KEY,reports);
      window.alert('通報を試作記録に保存しました。現時点では管理者には送信されません。');
    }
  }
  function setup(){
    var nickname=$('communityNickname');if(nickname)nickname.value=profile.name;
    setAvatar(profile.avatar);
    document.querySelectorAll('.community-avatar-choice').forEach(function(b){b.addEventListener('click',function(){setAvatar(b.dataset.avatar);});});
    var saveBtn=$('communityProfileSaveBtn');if(saveBtn)saveBtn.addEventListener('click',function(){saveProfile(true);});
    var submit=$('communityPostSubmitBtn');if(submit)submit.addEventListener('click',postMessage);
    var textarea=$('communityPostText');if(textarea)textarea.addEventListener('input',updateCharCount);
    var filters=$('communityFilters');if(filters)filters.addEventListener('click',function(ev){var b=ev.target.closest('button[data-filter]');if(!b)return;activeFilter=b.dataset.filter;updateFilters();renderPosts();});
    var list=$('communityPostList');if(list)list.addEventListener('click',onListClick);
    var back=$('communityBackBtn');if(back)back.addEventListener('click',function(){if(typeof window.__closeCommunityBoard==='function')window.__closeCommunityBoard();else if(typeof window.__showTitleScreen==='function')window.__showTitleScreen();});
    updateCharCount();updateFilters();renderPosts();
  }
  window.__communityBoardRefresh=renderPosts;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
