(()=>{
  const $=selector=>document.querySelector(selector);
  const $$=selector=>[...document.querySelectorAll(selector)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const projects=[
    {title:'LIFE ATLAS',type:'01 / LIFE SYSTEM',visual:'atlas',summary:'把散落在时间与地点里的亲身经历，整理成可搜索、可回望的人生地图。',problem:'生活记录不该只停留在相册和备忘录里，而应该重新连接时间、地点与个人成长。',features:'以地图和时间线作为双入口，把记录、地点、人生领域和未来计划放进同一套结构；AI 只负责辅助整理，关键内容始终由用户确认。',role:'产品设计 · 全栈开发',stack:'MapLibre · D1 / SQLite · R2 · OpenAI-compatible API',result:'Web MVP 已上线，公开源码，可本地运行。',url:'https://github.com/luoyesong888/life-atlas',color:'rgba(116,185,202,.42)',solid:'#9cdee5',window:'LIFE MAP / MEMORY LAYER',demoLabel:'CURRENT VIEW',demoValue:'时间 × 地点 × 领域',demoSub:'让一次经历成为可以被重新发现的人生坐标。',caption:'从记录到人生路径的组织方式',steps:['记录一段经历','定位时间与地点','连接人生领域']},
    {title:'LUCID LOGS',type:'02 / SELF MANAGEMENT',visual:'logs',summary:'将日记、任务、目标与复盘放进一个自托管应用，让长期个人数据留在自己手里。',problem:'日记、任务和目标被拆散在不同工具里，复盘时很难看到它们之间真正的联系。',features:'日记、任务、目标与复盘统一管理；本地数据优先保存，并由 AI 辅助生成周报和月报，让记录形成连续的自我反馈。',role:'产品设计 · 全栈开发',stack:'SvelteKit · Go / Gin · libSQL · PWA',result:'可自托管应用，公开源码。',url:'https://github.com/luoyesong888/lucid-logs',color:'rgba(109,160,137,.42)',solid:'#9ed0b5',window:'LUCID LOGS / WEEKLY LOOP',demoLabel:'REVIEW MODE',demoValue:'本周复盘草稿',demoSub:'日记、任务与目标正在被归拢为一条连续线索。',caption:'从日常记录到周期复盘',steps:['写下当下记录','关联任务与目标','生成周期复盘']},
    {title:'EXPRESSION TRAINER',type:'03 / COMMUNICATION',visual:'voice',summary:'针对口头禅、表达不准确与结构松散，提供实时语音识别和多维 AI 反馈。',problem:'表达问题往往发生在说话的当下，但传统复盘只能依靠模糊记忆，难以定位具体问题。',features:'实时语音识别、词库匹配和表达结构分析同步运行；训练结束后形成分层反馈，帮助用户知道哪里重复、哪里松散、下一次如何改。',role:'产品设计 · 独立开发',stack:'Electron · Sherpa-ONNX · Local AI · Voice',result:'桌面端与网页版原型，公开源码。',url:'https://github.com/luoyesong888/expression-trainer',color:'rgba(204,159,110,.46)',solid:'#f0b887',window:'VOICE SESSION / LIVE FEEDBACK',demoLabel:'LISTENING',demoValue:'正在识别表达结构',demoSub:'口头禅、停顿与逻辑转折会在训练过程中被标记。',caption:'从语音输入到表达反馈',steps:['实时识别语音','标记表达问题','生成训练建议']},
    {title:'KINETIQ',type:'04 / SPORTS REHAB',visual:'kinetiq',summary:'把体态照片转为面向康复师的结构化辅助筛查流程。',problem:'体态观察依赖经验，信息容易散落在照片和口头描述中，缺少统一、可追踪的辅助记录。',features:'把关键点分析、肌肉功能假设、AI 报告与患者档案串成一条工作流；所有输出明确保持辅助筛查边界，不替代医疗诊断。',role:'产品设计 · 独立开发',stack:'MediaPipe · DeepSeek · Streamlit · PDF',result:'公开原型；辅助筛查，不替代医疗诊断。',url:'https://github.com/luoyesong888/pose-assessment',color:'rgba(132,151,211,.42)',solid:'#aab8f2',window:'POSTURE SCREEN / ASSIST MODE',demoLabel:'SCREENING FLOW',demoValue:'关键点已形成结构化记录',demoSub:'观察结果与风险提示被整理到同一份辅助报告中。',caption:'从体态图片到辅助筛查报告',steps:['提取体态关键点','形成结构化假设','输出辅助报告']}
  ];

  const enterScreen=$('#enterScreen');
  function enterSite(){enterScreen.classList.add('hidden');document.body.classList.remove('locked');sessionStorage.setItem('songguo-entered','1')}
  document.body.classList.add('locked');
  $('#enterButton').addEventListener('click',enterSite);
  enterScreen.addEventListener('keydown',event=>{if(event.key==='Enter')enterSite()});
  if(sessionStorage.getItem('songguo-entered')==='1'){enterScreen.classList.add('hidden');document.body.classList.remove('locked')}

  const menu=$('#sceneMenu');
  const setMenu=open=>{menu.classList.toggle('open',open);$('#menuButton').setAttribute('aria-expanded',String(open))};
  $('#menuButton').addEventListener('click',()=>setMenu(true));
  $('#menuClose').addEventListener('click',()=>setMenu(false));
  $$('#sceneMenu a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){setMenu(false);closeModal()}});

  const scenes=$$('[data-scene-id]'),sceneDots=$$('.scene-dots button');
  const sceneLabels={hero:'SCENE 01 / IDLE LOOP',about:'SCENE 02 / PROFILE',field:'SCENE 03 / FIELD EVIDENCE',work:'SCENE 04 / PROJECTS',gallery:'SCENE 05 / GALLERY',contact:'SCENE 06 / CONTACT'};
  sceneDots.forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.jump)?.scrollIntoView({behavior:reduce?'auto':'smooth'})));
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('active')}),{threshold:.18});
  $$('.reveal').forEach(element=>revealObserver.observe(element));
  const sceneObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){const id=entry.target.dataset.sceneId;document.body.dataset.scene=id;$('#sceneCurrent').textContent=String(entry.target.dataset.sceneIndex).padStart(2,'0');$('#sceneStatus').textContent=sceneLabels[id];sceneDots.forEach(button=>button.classList.toggle('active',button.dataset.jump===id))}
  }),{threshold:.5});
  scenes.forEach(scene=>sceneObserver.observe(scene));
  const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--progress',(max?scrollY/max*100:0)+'%')};
  updateProgress();addEventListener('scroll',updateProgress,{passive:true});
  if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce)addEventListener('pointermove',event=>{const x=(event.clientX/innerWidth-.5)*-14,y=(event.clientY/innerHeight-.5)*-10;document.documentElement.style.setProperty('--parallax-x',x+'px');document.documentElement.style.setProperty('--parallax-y',y+'px')},{passive:true});

  const modal=$('#projectModal');let modalTrigger=null,activeProject=0;
  function showProject(index){
    const project=projects[index],next=projects[(index+1)%projects.length];activeProject=index;modalTrigger=modal.classList.contains('open')?modalTrigger:document.activeElement;
    $('#modalIndex').textContent=project.type;$('#modalHeaderStatus').textContent=`CASE ${String(index+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;$('#modalTitle').textContent=project.title;$('#modalSummary').textContent=project.summary;$('#modalProblem').textContent=project.problem;$('#modalFeatures').textContent=project.features;$('#modalRole').textContent=project.role;$('#modalStack').textContent=project.stack;$('#modalResult').textContent=project.result;$('#modalGithub').href=project.url;$('#modalWindowTitle').textContent=project.window;$('#modalDemoLabel').textContent=project.demoLabel;$('#modalDemoValue').textContent=project.demoValue;$('#modalDemoSub').textContent=project.demoSub;$('#modalVisualCaption').textContent=project.caption;$('#modalNextTitle').textContent=next.title;
    $('#modalSignalFeed').innerHTML=project.steps.map((step,stepIndex)=>`<div><span>${String(stepIndex+1).padStart(2,'0')}</span><b>${step}</b><i></i></div>`).join('');
    $('#modalPanel').dataset.visual=project.visual;$('#modalPanel').style.setProperty('--project-color',project.color);$('#modalPanel').style.setProperty('--project-solid',project.solid);$('#modalPanel').scrollTop=0;
    modal.classList.remove('project-switching');void modal.offsetWidth;modal.classList.add('project-switching');modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('locked');$('#modalClose').focus();
  }
  function closeModal(){if(!modal.classList.contains('open'))return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('locked');modalTrigger?.focus({preventScroll:true})}
  $('#projectStack').addEventListener('click',event=>{const card=event.target.closest('[data-project]');if(card)showProject(+card.dataset.project)});
  $('#modalClose').addEventListener('click',closeModal);
  modal.addEventListener('click',event=>{if(event.target===modal)closeModal()});
  $('#modalScroll').addEventListener('click',()=>$('#caseBody').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}));
  $('#modalNext').addEventListener('click',()=>showProject((activeProject+1)%projects.length));

  let audioContext=null,masterGain=null,soundOn=false,oscillators=[];
  const soundButton=$('#soundButton');
  function startSound(){
    const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;
    audioContext ||= new AudioContext();masterGain ||= audioContext.createGain();masterGain.connect(audioContext.destination);masterGain.gain.setValueAtTime(.0001,audioContext.currentTime);masterGain.gain.exponentialRampToValueAtTime(.025,audioContext.currentTime+.8);
    if(!oscillators.length)[55,82.41,110].forEach((frequency,index)=>{const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();oscillator.type=index===0?'sine':'triangle';oscillator.frequency.value=frequency;gain.gain.value=index===0?.38:.08;oscillator.connect(gain).connect(masterGain);oscillator.start();oscillators.push(oscillator)});
    audioContext.resume();soundOn=true;soundButton.setAttribute('aria-pressed','true');soundButton.querySelector('em').textContent='ON';
  }
  function stopSound(){if(masterGain&&audioContext)masterGain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+.35);soundOn=false;soundButton.setAttribute('aria-pressed','false');soundButton.querySelector('em').textContent='OFF'}
  soundButton.addEventListener('click',()=>soundOn?stopSound():startSound());

  const canvas=$('#ambientCanvas'),context=canvas.getContext('2d');let particles=[];
  function resizeCanvas(){const ratio=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*ratio;canvas.height=innerHeight*ratio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';context.setTransform(ratio,0,0,ratio,0,0);const count=innerWidth<700?18:38;particles=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.25,s:Math.random()*.11+.035,a:Math.random()*.45+.08}))}
  function draw(){context.clearRect(0,0,innerWidth,innerHeight);for(const particle of particles){particle.y-=particle.s;if(particle.y<0){particle.y=innerHeight;particle.x=Math.random()*innerWidth}context.beginPath();context.arc(particle.x,particle.y,particle.r,0,Math.PI*2);context.fillStyle=`rgba(220,239,242,${particle.a})`;context.fill()}if(!reduce)requestAnimationFrame(draw)}
  resizeCanvas();addEventListener('resize',resizeCanvas,{passive:true});draw();

  const version=document.documentElement.dataset.editVersion||'scene-scroll-v6';
  const storageKey='songguo-scene-portfolio-edits:'+location.pathname+':'+version;
  const editor=$('.editor'),editToggle=$('#editToggle'),exportButton=$('#exportHtml');let editing=false;
  const editables=()=>$$('[data-edit-id]');
  function stored(){try{return JSON.parse(localStorage.getItem(storageKey)||'{}')}catch{return{}}}
  function loadEdits(){const data=stored();editables().forEach(element=>{if(data[element.dataset.editId]!==undefined)element.innerHTML=data[element.dataset.editId]})}
  function saveEdits(){const data={};editables().forEach(element=>data[element.dataset.editId]=element.innerHTML);localStorage.setItem(storageKey,JSON.stringify(data))}
  function setEdit(value){editing=value;document.body.classList.toggle('editing',value);editor.classList.toggle('active',value);editToggle.textContent=value?'保存':'编辑';editables().forEach(element=>element.contentEditable=value?'true':'false');if(!value)saveEdits()}
  async function exportHtml(){
    if(editing)saveEdits();const clone=document.documentElement.cloneNode(true);clone.dataset.editVersion='export-'+Date.now();clone.querySelector('body')?.classList.remove('editing','locked');clone.querySelector('#enterScreen')?.classList.remove('hidden');clone.querySelector('#sceneMenu')?.classList.remove('open');clone.querySelector('#projectModal')?.classList.remove('open');clone.querySelector('#projectModal')?.setAttribute('aria-hidden','true');clone.querySelector('.editor')?.classList.remove('active');clone.querySelectorAll('[contenteditable]').forEach(element=>element.setAttribute('contenteditable','false'));const button=clone.querySelector('#editToggle');if(button)button.textContent='编辑';
    try{const [css,js]=await Promise.all([fetch('styles.css').then(response=>response.text()),fetch('app.js').then(response=>response.text())]);const style=document.createElement('style');style.textContent=css;clone.querySelector('link[href="styles.css"]')?.replaceWith(style);const script=document.createElement('script');script.textContent=js;clone.querySelector('script[src="app.js"]')?.replaceWith(script)}catch(error){console.warn('Could not inline assets',error)}
    const blob=new Blob(['<!doctype html>\n'+clone.outerHTML],{type:'text/html;charset=utf-8'}),anchor=document.createElement('a');anchor.href=URL.createObjectURL(blob);anchor.download='liu-yangsheng-scene-portfolio.html';anchor.click();setTimeout(()=>URL.revokeObjectURL(anchor.href),1000);
  }
  editToggle.addEventListener('click',()=>setEdit(!editing));exportButton.addEventListener('click',exportHtml);
  document.addEventListener('keydown',event=>{const inside=event.target.closest?.('[contenteditable="true"]');if(event.key.toLowerCase()==='e'&&!inside&&!event.metaKey&&!event.ctrlKey)setEdit(!editing);if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='s'){event.preventDefault();saveEdits()}});
  loadEdits();
})();
