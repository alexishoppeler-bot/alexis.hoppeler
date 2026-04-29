const IS_PLAN=location.search.includes('plan');
const COLS=['A','B','C','D','E','F','G'];
const ROWS=['1','2','3','4','5','6','7'];
const GC=7,GR=7,MAX=6;
const DR=[-1,0,1,0],DC=[0,1,0,-1];
const ARR=['▲','▶','▼','◀'],DIR=['Nord','Est','Sud','Ouest'];
const ord=n=>n===1?'1re':n+'e';
const HN=['Av. des Tilleuls','Rue Pasteur','Bd. Victor Hugo','Rue de la Paix','Rue Molière','Av. Gambetta','Rue du Lac'];
const VN=['Rue Voltaire','Av. Foch','Rue Carnot','Bd. Haussmann','Rue Lamartine','Rue Zola','Av. du Parc'];
const BLK=[
  {i:'🏬',n:'Marché'},{i:'🌳',n:'Parc Ravel'},{i:'🏫',n:'École'},{i:'🏛️',n:'Mairie'},
  {i:'🏥',n:'Hôpital'},{i:'🎬',n:'Cinéma'},{i:'📚',n:'Bibliothèque'},{i:'⚽',n:'Stade'},
  {i:'🖼️',n:'Musée'},{i:'📮',n:'Poste'},{i:'💊',n:'Pharmacie'},{i:'🛒',n:'Épicerie'},
  {i:'⛪',n:'Église'},{i:'🅿️',n:'Parking'},{i:'🚉',n:'Gare'},{i:'🏊',n:'Piscine'},
  {i:'🎭',n:'Théâtre'},{i:'🏦',n:'Banque'},{i:'🌿',n:'Jardin'},{i:'🏠',n:'Résidences'},
  {i:'🛍️',n:'Galerie'},{i:'🎓',n:'Lycée'},{i:'🍽️',n:'Restaurant'},{i:'🏨',n:'Hôtel'},
  {i:'🚒',n:'Pompiers'},{i:'🔧',n:'Garage'},{i:'☕',n:'Café'},{i:'🍞',n:'Boulangerie'},
  {i:'🎵',n:'Concert'},{i:'🏋️',n:'Gym'},{i:'🌺',n:'Fleuriste'},{i:'🐟',n:'Poissonnerie'},
  {i:'🎨',n:'Atelier'},{i:'📷',n:'Photo'},{i:'🌙',n:'Mosquée'},{i:'🎪',n:'Cirque'},
];
const PC=['#e05a5a','#5b9cf5','#f5a623','#a05ae0','#3fc87a','#e05ab0','#3ae0d0',
  '#b0c030','#e07a5a','#5a70e0','#d09020','#e05a8a','#5ab0e0','#c0802a','#50b040'];
const BC=['#1e2128','#1c2026','#1a1e24','#1e1c28','#1a1f1c'];
const CT={forward:'aller tout droit',back:'reculer',left:'tourner à gauche',right:'tourner à droite',uturn:'faire demi-tour'};
const CT_ICON={forward:'⬆️',back:'⬇️',left:'⬅️',right:'➡️',uturn:'🔄'};

// STATE
let startPos={r:3,c:0,d:1};
let player={r:3,c:0,d:1,el:null,steps:0,rx:0,ry:0};
let queue=[];
const PAGE_ID='orientation';
const activePart=-1; // solo — pas de participant, garde la compat canvas
let sessionXP=0;
let sessionCorrect=0;
let sessionTyped=0;
let pendingPts=0; // points à valider après exécution
let trav=new Set(),pts=[],aDest=null;
let running=false;
let dEl=null,ROAD,SP,MG,CW,CH;
let trail=[],optimalPath=[];
let stepMode=false,stepResolve=null;
let confettiParticles=[],flashAlpha=0;
let guideStep=1;
let _animTargetX=0,_animTargetY=0,_animStartX=0,_animStartY=0,_animStart=null;
const ANIM_MS=280;
let timerSec=0,timerOn=false,timerIv=null;

// Segment de rue entre deux intersections adjacentes (évite les carrefours)
function drawStreetSeg(ctx,a,b){
  const half=ROAD/2;let x1,y1,x2,y2;
  if(a.r===b.r){const d=b.c>a.c?1:-1;x1=cx(a.c)+d*half;y1=cy(a.r);x2=cx(b.c)-d*half;y2=cy(b.r);}
  else{const d=b.r>a.r?1:-1;x1=cx(a.c);y1=cy(a.r)+d*half;x2=cx(b.c);y2=cy(b.r)-d*half;}
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
}

// BFS path reconstruction
function bfsPath(sr,sc,er,ec,blk){
  if(sr===er&&sc===ec)return[{r:sr,c:sc}];
  const prev=new Map(),v=new Set(),q=[[sr,sc]];v.add(sr+'_'+sc);
  while(q.length){const[r,c]=q.shift();
    for(let d=0;d<4;d++){const nr=r+DR[d],nc=c+DC[d];
      if(nr<0||nr>=GR||nc<0||nc>=GC)continue;
      const k=nr+'_'+nc;if(blk.has(k)||v.has(k))continue;
      prev.set(k,r+'_'+c);v.add(k);
      if(nr===er&&nc===ec){
        const path=[{r:er,c:ec}];let cur=k;
        while(prev.has(cur)){cur=prev.get(cur);const[pr,pc]=cur.split('_').map(Number);path.unshift({r:pr,c:pc});}
        return path;
      }q.push([nr,nc]);}}return[];}

// BFS reachability
function bfs(sr,sc,er,ec,blk){
  if(sr===er&&sc===ec)return true;
  const v=new Set(),q=[[sr,sc]];v.add(sr+'_'+sc);
  while(q.length){const[r,c]=q.shift();
    for(let d=0;d<4;d++){const nr=r+DR[d],nc=c+DC[d];
      if(nr<0||nr>=GR||nc<0||nc>=GC)continue;
      const k=nr+'_'+nc;if(blk.has(k)||v.has(k))continue;
      if(nr===er&&nc===ec)return true;
      v.add(k);q.push([nr,nc]);}}return false;
}
// BFS shortest distance
function bfsDist(sr,sc,er,ec,blk){
  if(sr===er&&sc===ec)return 0;
  const v=new Set(),q=[[sr,sc,0]];v.add(sr+'_'+sc);
  while(q.length){const[r,c,d]=q.shift();
    for(let dir=0;dir<4;dir++){const nr=r+DR[dir],nc=c+DC[dir];
      if(nr<0||nr>=GR||nc<0||nc>=GC)continue;
      const k=nr+'_'+nc;if(blk.has(k)||v.has(k))continue;
      if(nr===er&&nc===ec)return d+1;
      v.add(k);q.push([nr,nc,d+1]);}}return Infinity;
}

// DIMS / BUILD
function dims(){
  const a=document.getElementById('map-center');
  const m=Math.min(a.clientWidth-10,a.clientHeight-10);
  SP=Math.max(54,Math.min(130,Math.floor(m/GC)));
  ROAD=Math.max(15,Math.round(SP*.24));
  MG=Math.round(SP*.50);
  CW=MG*2+(GC-1)*SP;CH=MG*2+(GR-1)*SP;
}
const cx=c=>MG+c*SP,cy=r=>MG+r*SP;
function mk(tag,cls,style){const e=document.createElement(tag);if(cls)e.className=cls;if(style)e.style.cssText=style;return e;}

function buildCity(){
  dims();
  document.documentElement.style.setProperty('--sp',SP+'px');
  const canvas=document.getElementById('city-canvas');
  canvas.width=CW;canvas.height=CH;
  player.rx=cx(player.c);player.ry=cy(player.r);
  buildLegend();
}
function onZoom(v){
  v=parseInt(v)/100;
  const sw=Math.round(200-v*150);// 200→50
  const nw=Math.round(290-v*220);// 290→70
  document.documentElement.style.setProperty('--sidebar-w',Math.max(sw,0)+'px');
  document.documentElement.style.setProperty('--nav-w',Math.max(nw,0)+'px');
  clearTimeout(_rt);_rt=setTimeout(buildCity,80);
}

function buildLegend(){
  const p=document.getElementById('legend-panel');p.innerHTML='';
  BLK.slice(0,16).forEach(b=>{
    const item=document.createElement('div');item.className='leg-item';
    item.innerHTML=`<span class="leg-i">${b.i}</span><span>${b.n}</span>`;p.appendChild(item);});
}
function toggleLegend(){document.getElementById('legend-panel').classList.toggle('show');}

function coordLabel(r,c){return COLS[c]+ROWS[r];}

function updateRouteSummary(){
  const start=document.getElementById('route-start');
  const dest=document.getElementById('route-dest');
  const actions=document.getElementById('route-actions');
  if(start)start.textContent=coordLabel(player.r,player.c)+' '+ARR[player.d];
  if(dest){
    if(aDest!==null&&pts[aDest]){
      const p=pts[aDest];
      dest.textContent=coordLabel(p.r,p.c)+' '+getNear(p.r,p.c).n;
    }else{
      dest.textContent='A choisir';
    }
  }
  if(actions)actions.textContent=queue.length;
}

// SCENARIO
function shuf(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}}
function gen(){
  const nbP=parseInt(document.getElementById('nb-pts').value);
  const nbT=parseInt(document.getElementById('nb-trav').value);
  document.getElementById('gwarn').style.display='none';
  const all=[];
  for(let r=0;r<GR;r++)for(let c=0;c<GC;c++)if(!(r===startPos.r&&c===startPos.c))all.push([r,c]);
  shuf(all);
  pts=all.slice(0,nbP).map(([r,c],i)=>({r,c,col:PC[i%PC.length],lb:String(i+1),rev:false}));
  const used=new Set(pts.map(p=>p.r+'_'+p.c));used.add(startPos.r+'_'+startPos.c);
  const cands=all.filter(([r,c])=>!used.has(r+'_'+c));shuf(cands);
  trav.clear();let pl=0;
  for(const[r,c]of cands){
    if(pl>=nbT)break;
    const ts=new Set(trav);ts.add(r+'_'+c);
    let ok=true;
    for(const p of pts){if(!bfs(startPos.r,startPos.c,p.r,p.c,ts)){ok=false;break;}}
    if(ok){trav.add(r+'_'+c);pl++;}
  }
  if(pl<nbT){const w=document.getElementById('gwarn');w.textContent=`⚠ ${pl}/${nbT} obstacles seulement.`;w.style.display='block';}
  queue=[];
  renderPts();renderTravChips();updTrav();renderC();updExecBtn();
  // Auto-activate and reveal the first point
  if(pts.length){
    actPt(0);
    setGuide(2,'Destination prête. Avec les boutons du plan, ajoute les actions pour aller jusqu au badge Destination.');
  }else{
    aDest=null;updDest();setGuide(1,'Choisis une destination dans la liste de gauche.');
  }
}
function clearAll(){
  pts=[];trav.clear();aDest=null;queue=[];
  renderPts();renderTravChips();updTrav();updDest();renderC();updExecBtn();
  updateRouteSummary();
  document.getElementById('gwarn').style.display='none';st('🗑 Effacé.','');
}
function getNear(r,c){
  for(const[br,bc]of[[r,c],[r-1,c],[r,c-1],[r-1,c-1]]){
    if(br>=0&&br<GR-1&&bc>=0&&bc<GC-1)return BLK[(br*(GC-1)+bc)%BLK.length];}
  return{i:'?',n:''};
}
function renderPts(){
  const box=document.getElementById('pts-list');box.innerHTML='';
  if(!pts.length){box.innerHTML='<span style="font-size:10px;color:var(--text3)">Appuie sur 🎲.</span>';return;}
  pts.forEach((pt,i)=>{
    const row=document.createElement('div');row.className='pt-row'+(aDest===i?' ap':'');row.onclick=()=>actPt(i);
    const num=mk('div','pt-num','');num.style.background=pt.col;num.textContent=pt.lb;
    const binfo=getNear(pt.r,pt.c);
    const coord=mk('span','pt-coord','');coord.textContent=COLS[pt.c]+ROWS[pt.r];
    const name=mk('span','pt-name','');name.textContent=binfo.i+' '+binfo.n;
    const sts=mk('span','pt-st','');sts.textContent=aDest===i?'🎯':'';
    row.appendChild(num);row.appendChild(coord);row.appendChild(name);row.appendChild(sts);
    box.appendChild(row);});
}
function actPt(i){
  aDest=i;pts[i].rev=true; // always show destination
  renderPts();updDest();
  const p=pts[i];const binfo=getNear(p.r,p.c);
  updateRouteSummary();
  setGuide(2,'Destination choisie. Clique sur les grands boutons du plan pour AJOUTER des actions, puis lance le trajet.');
  st('🎯 Destination : '+COLS[p.c]+ROWS[p.r]+' — '+binfo.i+' '+binfo.n,'ok');
}
function togRev(i){actPt(i);}
function updDest(){
  const badge=document.getElementById('dest-badge');
  if(!badge)return;
  if(aDest===null||!pts[aDest]){badge.classList.remove('show');return;}
  const p=pts[aDest];
  const b=getNear(p.r,p.c);
  document.getElementById('dest-ico').textContent=b.i;
  document.getElementById('dest-name').textContent=b.n;
  badge.style.setProperty('--dest-col',p.col);
  badge.classList.add('show');
}
function addTrav(){
  const c=parseInt(document.getElementById('tc').value);
  const r=parseInt(document.getElementById('tr').value);
  const k=r+'_'+c;const ts=new Set(trav);ts.add(k);
  if(pts.length){for(const p of pts){if(!bfs(startPos.r,startPos.c,p.r,p.c,ts)){st('🚧 Impossible : bloquerait la destination '+p.lb,'err');return;}}}
  if(trav.has(k))trav.delete(k);else trav.add(k);
  renderTravChips();updTrav();st('🚧 Obstacle ajouté.','ok');
}
function remTrav(k){trav.delete(k);renderTravChips();updTrav();}
function renderTravChips(){
  const box=document.getElementById('trav-chips');box.innerHTML='';
  if(!trav.size){box.innerHTML='<span style="font-size:10px;color:var(--text3)">Aucun.</span>';return;}
  for(const k of trav){const[r,c]=k.split('_').map(Number);
    const ch=document.createElement('span');ch.className='tchip';
    ch.innerHTML='🚧 '+COLS[c]+ROWS[r]+' ✕';ch.onclick=()=>remTrav(k);box.appendChild(ch);}
}
function updTrav(){}
function tog(bid,cid){document.getElementById(bid).classList.toggle('hidden');document.getElementById(cid).classList.toggle('open');}

// PLAYER
function updPl(anim){
  if(anim){
    _animStart=performance.now();
    _animStartX=player.rx;_animStartY=player.ry;
    _animTargetX=cx(player.c);_animTargetY=cy(player.r);
  }else{
    player.rx=cx(player.c);player.ry=cy(player.r);_animStart=null;
  }
  const angles=[0,90,180,270];
  document.getElementById('cmp-arrow').style.transform=`rotate(${angles[player.d]}deg)`;
  document.getElementById('pos-dir').textContent=ARR[player.d];
  document.getElementById('pos-coord').textContent=COLS[player.c]+ROWS[player.r];
  updateRouteSummary();
}

// START
function setStart(){
  const c=parseInt(document.getElementById('s0c').value);
  const r=parseInt(document.getElementById('s0r').value);
  startPos={r,c,d:1};
  if(!running){player.r=r;player.c=c;player.d=1;player.steps=0;updPl(false);}
  updStartMarker();
  updateRouteSummary();
}
function randomStart(){
  const all=[];
  for(let r=0;r<GR;r++)for(let c=0;c<GC;c++)all.push([r,c]);
  shuf(all);
  const used=new Set(pts.map(p=>p.r+'_'+p.c));
  const picks=all.filter(([r,c])=>!trav.has(r+'_'+c)&&!used.has(r+'_'+c));
  if(picks.length){
    startPos={r:picks[0][0],c:picks[0][1],d:1};
    document.getElementById('s0c').value=picks[0][1];
    document.getElementById('s0r').value=picks[0][0];
    player.r=picks[0][0];player.c=picks[0][1];player.d=1;player.steps=0;updPl(false);
  }
  updStartMarker();updateRouteSummary();st('🎲 Départ au hasard !','ok');
}
function updStartMarker(){}

// COMMANDS
function aC(t){
  if(IS_PLAN){try{window.opener.aC(t);}catch(e){}return;}
  if(running)return;queue.push({t,tx:CT[t],ic:CT_ICON[t]});renderC();updExecBtn();
  setGuide(2,'Action ajoutée dans la consigne. Ajoute la suite ou clique sur "Lancer le trajet".');
}
function aSteps(){
  if(IS_PLAN){try{window.opener.aSteps();}catch(e){}return;}
  if(running)return;const n=parseInt(document.getElementById('sn').value);
  queue.push({t:'steps',n,tx:'avancer de '+n+' rue'+(n>1?'s':''),ic:'⬆️',icn:n});renderC();updExecBtn();
  setGuide(2,'Action ajoutée dans la consigne. Vérifie la phrase, puis lance le trajet.');
}
function aNth(){
  if(IS_PLAN){try{window.opener.aNth();}catch(e){}return;}
  if(running)return;const n=parseInt(document.getElementById('nn').value);
  const d=document.getElementById('nd').value;
  queue.push({t:'nth',n,d,tx:'a la '+ord(n)+' rue, tourner à '+(d==='left'?'gauche':'droite'),ic:d==='left'?'⬅️':'➡️',icn:n});renderC();updExecBtn();
  setGuide(2,'Action ajoutée dans la consigne. Termine la consigne puis lance le trajet.');
}
function delLast(){
  if(IS_PLAN){try{window.opener.delLast();}catch(e){}return;}
  if(running||!queue.length)return;queue.pop();renderC();updExecBtn();
}

function renderC(){
  const box=document.getElementById('cb0');
  const ph=box.querySelector('.cph');
  let cur=box.querySelector('.cur-blink');
  const iconsBox=document.getElementById('ci0');
  Array.from(box.querySelectorAll('.w,.sep')).forEach(e=>e.remove());
  if(!cur){cur=mk('span','cur-blink','');box.appendChild(cur);}
  iconsBox.innerHTML='';
  if(!queue.length){
    if(ph)ph.style.display='';cur.style.display='none';
    iconsBox.innerHTML='<span style="font-size:10px;color:var(--text3);font-style:italic">Appuie sur les flèches…</span>';
    updateRouteSummary();
    return;
  }
  if(ph)ph.style.display='none';cur.style.display='inline-block';
  queue.forEach((cmd,i)=>{
    if(i>0){const sep=document.createElement('span');sep.className='ci-sep';sep.textContent='→';iconsBox.appendChild(sep);}
    if(cmd.icn&&cmd.icn>1){const num=document.createElement('span');num.className='ci num';num.textContent=cmd.icn+'×';iconsBox.appendChild(num);}
    const ic=document.createElement('span');ic.className='ci';ic.textContent=cmd.ic||'?';iconsBox.appendChild(ic);
  });
  queue.forEach((cmd,i)=>{
    if(i>0){const s=mk('span','sep','');s.textContent=', ensuite ';box.insertBefore(s,cur);}
    const sp=mk('span','w p','');let tx=cmd.tx;if(i===0)tx=tx.charAt(0).toUpperCase()+tx.slice(1);
    sp.textContent=tx;box.insertBefore(sp,cur);
  });
  const spans=box.querySelectorAll('.w');
  if(spans.length){const l=spans[spans.length-1];if(!l.textContent.endsWith('.'))l.textContent+='.';}
  updateRouteSummary();
}
function updHL(idx,state){
  document.querySelectorAll('#cb0 .w').forEach((s,i)=>{s.className='w '+(i===idx?state:i<idx?'do':'p');});
}
function updExecBtn(){
  const btn=document.getElementById('exec0');
  btn.disabled=running||!queue.length;
  btn.textContent=queue.length
    ? '▶ Lancer le trajet ('+queue.length+' action'+(queue.length>1?'s':'')+')'
    : '▶ Lancer le trajet';
}

// EXECUTION
const vld=(r,c)=>r>=0&&r<GR&&c>=0&&c<GC;
const isTv=(r,c)=>trav.has(r+'_'+c);
const isBlk=(r,c)=>!vld(r,c)||isTv(r,c);
const tL=d=>(d+3)%4,tR=d=>(d+1)%4;
const slp=ms=>new Promise(r=>setTimeout(r,ms));
const hasInter=(r,c,fd)=>vld(r+DR[tL(fd)],c+DC[tL(fd)])||vld(r+DR[tR(fd)],c+DC[tR(fd)]);

async function mvP(fwd){
  const nr=player.r+DR[player.d]*fwd,nc=player.c+DC[player.d]*fwd;
  if(isBlk(nr,nc)){st('🚧 Bloqué !'+(isTv(nr,nc)?' Obstacle sur la route.':' Bord de la carte.'),'err');return false;}
  player.r=nr;player.c=nc;player.steps++;trail.push({r:player.r,c:player.c});updPl(true);await slp(340);return true;
}

async function runQueue(){
  const q=queue;
  let stats={steps:player.steps,cmds:q.length,reached:false,optimalSteps:undefined};
  if(aDest!==null&&pts[aDest])
    stats.optimalSteps=bfsDist(startPos.r,startPos.c,pts[aDest].r,pts[aDest].c,trav);
  for(let i=0;i<q.length;i++){
    updHL(i,'c');const cmd=q[i];let ok=true;
    document.getElementById('exec-cmd').textContent=(cmd.tx.charAt(0).toUpperCase()+cmd.tx.slice(1))+'…';
    if(cmd.t==='forward'){while(true){const m=await mvP(1);if(!m)break;if(checkWin()){stats.reached=true;stats.steps=player.steps-stats.steps;return stats;}}}
    else if(cmd.t==='back'){ok=await mvP(-1);}
    else if(cmd.t==='left'){player.d=tL(player.d);updPl(false);await slp(300);}
    else if(cmd.t==='right'){player.d=tR(player.d);updPl(false);await slp(300);}
    else if(cmd.t==='uturn'){player.d=(player.d+2)%4;updPl(false);await slp(300);}
    else if(cmd.t==='steps'){for(let s=0;s<cmd.n;s++){if(!await mvP(1)){ok=false;break;}if(checkWin()){stats.reached=true;stats.steps=player.steps-stats.steps;return stats;}}}
    else if(cmd.t==='nth'){
      let cnt=0,safe=80;
      while(cnt<cmd.n&&safe-- >0){
        const nr=player.r+DR[player.d],nc=player.c+DC[player.d];
        if(isBlk(nr,nc)){ok=false;break;}
        player.r=nr;player.c=nc;player.steps++;trail.push({r:player.r,c:player.c});updPl(true);await slp(330);
        if(hasInter(player.r,player.c,player.d)){cnt++;if(cnt===cmd.n){player.d=cmd.d==='left'?tL(player.d):tR(player.d);updPl(false);await slp(300);}}
      }
      if(checkWin()){stats.reached=true;stats.steps=player.steps-stats.steps;return stats;}
    }
    if(!ok){const ss=document.querySelectorAll('#cb0 .w');if(ss[i])ss[i].className='w bl';break;}
    updHL(i,'do');if(checkWin()){stats.reached=true;stats.steps=player.steps-stats.steps;return stats;}
    await waitForStep();
  }
  stats.steps=player.steps-stats.steps;return stats;
}

function checkWin(){
  if(aDest===null)return false;
  const p=pts[aDest];if(!p)return false;
  return player.r===p.r&&player.c===p.c;
}

function calcPts(stats){
  if(!stats.reached)return 0;
  let p=3;
  if(stats.optimalSteps!==undefined&&isFinite(stats.optimalSteps)){
    const extra=stats.steps-stats.optimalSteps;
    if(extra===0)p+=2;
    else if(extra<=2)p+=1;
  }
  return p;
}

async function execPlayer(){
  if(IS_PLAN){try{window.opener.execPlayer();}catch(e){}return;}
  if(running||!queue.length)return;
  running=true;updExecBtn();
  document.getElementById('map-area').classList.add('exec-running');
  player.steps=0;
  trail=[{r:player.r,c:player.c}];optimalPath=[];
  document.getElementById('exec-who').textContent='VOUS';
  document.getElementById('exec-overlay').classList.add('show');
  setGuide(3,'Observe le trajet. A la fin, valide les XP puis recommence.');
  st('▶ Exécution en cours…','');
  const stats=await runQueue();
  running=false;
  document.getElementById('map-area').classList.remove('exec-running');
  document.getElementById('exec-overlay').classList.remove('show');
  pendingPts=calcPts(stats);
  showResult(stats);
  updExecBtn();
}

function showResult(stats){
  const reached=stats.reached;
  const pts_=pendingPts;
  const p=aDest!==null?pts[aDest]:null;
  if(p&&reached){p.rev=true;renderPts();updDest();triggerConfetti();}
  if(p)optimalPath=bfsPath(startPos.r,startPos.c,p.r,p.c,trav);

  document.getElementById('re').textContent=reached?'🎉':'😕';
  document.getElementById('rt').style.color=reached?'var(--green)':'var(--red)';
  document.getElementById('rt').textContent=reached?'Arrivé !':'Pas encore arrivé...';

  const pe=document.getElementById('pts-earned');
  pe.textContent=pts_>0?'+'+pts_+' XP':'0 XP';
  pe.style.color=pts_>=5?'#ffd700':pts_>=3?'var(--green)':'var(--text3)';

  let detail='';
  if(reached){
    detail+='✅ Arrivé à destination : +3 XP\n';
    if(stats.optimalSteps!==undefined&&isFinite(stats.optimalSteps)){
      const extra=stats.steps-stats.optimalSteps;
      if(extra===0)detail+='⚡ Chemin parfait : +2 XP\n';
      else if(extra<=2)detail+='👍 Bon chemin (+'+extra+' pas) : +1 XP\n';
      else detail+='📍 '+stats.steps+' pas (chemin le plus court : '+stats.optimalSteps+')\n';
    }
  }else{
    detail+='❌ Pas encore arrivé\n';
    detail+='Position actuelle : '+COLS[player.c]+ROWS[player.r];
  }
  document.getElementById('pts-detail').textContent=detail.trim();
  document.getElementById('rs').textContent=reached?'Session en cours — continuez !':'Réessayez un autre itinéraire.';
  setGuide(1,reached?'Bien joue. Choisis une nouvelle destination pour continuer.':'Essaie une nouvelle consigne plus simple.');

  const btn=document.getElementById('rcl');
  if(pts_>0){
    btn.textContent='✅ +'+pts_+' XP — Valider';
    btn.style.display='';
  }else{
    btn.style.display='none';
  }
  document.getElementById('ov').classList.add('show');
}

function awardAndClose(){
  if(pendingPts>0){
    sessionXP+=pendingPts;
    sessionCorrect+=1;
    sessionTyped+=1;
    if(typeof recordExerciseProgress==='function'){
      recordExerciseProgress(PAGE_ID,{correct:1,typed:1,errors:0,xp:pendingPts});
    }
    updSoloHud();
    st('🏅 +'+pendingPts+' XP gagnés !','ok');
  }
  pendingPts=0;
  closeOv();
}
function closeOv(){document.getElementById('ov').classList.remove('show');pendingPts=0;}

function arriveManuel(){
  if(running)return;
  document.getElementById('re').textContent='🏁';
  document.getElementById('rt').style.color='var(--green)';
  document.getElementById('rt').textContent='Arrivé !';
  pendingPts=3;
  document.getElementById('pts-earned').textContent='+3 XP';
  document.getElementById('pts-earned').style.color='var(--green)';
  document.getElementById('pts-detail').textContent='🏁 Arrivée validée : +3 XP';
  document.getElementById('rs').textContent='Session en cours — continuez !';
  const btn=document.getElementById('rcl');
  btn.textContent='✅ +3 XP — Valider';
  btn.style.display='';
  document.getElementById('ov').classList.add('show');
}

function triggerConfetti(){
  flashAlpha=0.3;
  confettiParticles=[];
  for(let i=0;i<120;i++){
    confettiParticles.push({
      x:Math.random()*CW, y:-10-Math.random()*60,
      vx:(Math.random()-.5)*5, vy:2+Math.random()*4,
      rot:Math.random()*Math.PI*2, vrot:(Math.random()-.5)*.18,
      w:7+Math.random()*9, h:4+Math.random()*5,
      col:PC[Math.floor(Math.random()*PC.length)],
      life:1, decay:.006+Math.random()*.006
    });
  }
}

function toggleBigMap(){
  document.getElementById('root').classList.toggle('bigmap');
  document.getElementById('bigmap-btn').classList.toggle('on');
  setTimeout(()=>buildCity(),50);
}

function exportScenario(){
  const data={v:1,startPos,pts:pts.map(p=>({r:p.r,c:p.c,col:p.col,lb:p.lb})),trav:[...trav]};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='nowhereland_scenario.json';a.click();
  URL.revokeObjectURL(url);st('💾 Parcours sauvegardé !','ok');
}
function importScenario(){
  const inp=document.createElement('input');inp.type='file';inp.accept='.json,application/json';
  inp.onchange=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const d=JSON.parse(ev.target.result);
        startPos=d.startPos;pts=d.pts.map(p=>({...p,rev:true}));trav=new Set(d.trav);
        aDest=pts.length?0:null;queue=[];trail=[];optimalPath=[];
        document.getElementById('s0c').value=startPos.c;document.getElementById('s0r').value=startPos.r;
        buildCity();renderC();updExecBtn();renderPts();if(pts.length)actPt(0);
        st('📂 Parcours chargé !','ok');
      }catch(err){st('❌ Fichier non valide','err');}
    };reader.readAsText(file);
  };inp.click();
}

function toggleStepMode(){
  if(IS_PLAN){try{window.opener.toggleStepMode();}catch(e){}return;}
  stepMode=!stepMode;
  const btn=document.getElementById('step-btn');
  btn.textContent='👣 Etape par etape : '+(stepMode?'ON':'OFF');
  btn.classList.toggle('on',stepMode);
}
function nextStep(){
  if(IS_PLAN){try{window.opener.nextStep();}catch(e){}return;}
  if(stepResolve){stepResolve();stepResolve=null;}
}
async function waitForStep(){
  if(!stepMode)return;
  document.getElementById('step-next').style.display='';
  await new Promise(r=>stepResolve=r);
  document.getElementById('step-next').style.display='none';
}

function resetAll(){
  if(IS_PLAN){try{window.opener.resetAll();}catch(e){}return;}
  if(running)return;
  player.r=startPos.r;player.c=startPos.c;player.d=startPos.d||1;player.steps=0;
  trail=[];optimalPath=[];
  queue=[];updPl(false);renderC();updExecBtn();st('↺ Recommencé.','');
  updateRouteSummary();
  setGuide(1,'Choisis une destination puis ajoute les actions.');
}

function st(m,type){
  const el=document.getElementById('top-status');
  el.textContent=m;el.className='';if(type)el.classList.add(type);
}

function setGuide(step, text){
  guideStep=step;
  [1,2,3].forEach((n)=>{
    const el=document.getElementById('guide-step-'+n);
    if(el)el.classList.toggle('active',n===step);
  });
  const gt=document.getElementById('guide-text');
  if(gt&&text)gt.textContent=text;
}

// SOLO — Mise à jour de l'affichage progression
function updSoloHud(){
  const el=document.getElementById('solo-xp');
  const elC=document.getElementById('solo-correct');
  const elT=document.getElementById('solo-total-xp');
  const elHud=document.getElementById('ah-score');
  if(el)el.textContent=sessionXP;
  if(elC)elC.textContent=sessionCorrect;
  if(elHud)elHud.textContent=sessionXP+' XP';
  if(elT&&typeof ScoreManager!=='undefined'){
    const g=ScoreManager.getGlobalSummary(
      window.EXERCISE_CONFIG?window.EXERCISE_CONFIG.orderedPages:[]
    );
    elT.textContent=g.totalXp;
  }
}

// Terminer la session : enregistre dans l'historique global
function endSession(){
  if(typeof endExerciseSession==='function'){
    endExerciseSession(PAGE_ID);
  }
  st('✅ Session terminée — '+sessionXP+' XP gagnés !','ok');
  if(typeof showToast==='function')showToast('Session terminée : +'+sessionXP+' XP', 'success');
  sessionXP=0;sessionCorrect=0;sessionTyped=0;
  updSoloHud();
}

// TIMER
function timerToggle(){
  timerOn=!timerOn;
  document.getElementById('tbtn-start').textContent=timerOn?'⏸':'▶';
  document.getElementById('timer-val').classList.toggle('run',timerOn);
  if(timerOn){timerIv=setInterval(()=>{timerSec++;updTimerDisplay();},1000);}
  else clearInterval(timerIv);
}
function timerReset(){
  clearInterval(timerIv);timerOn=false;timerSec=0;
  document.getElementById('tbtn-start').textContent='▶';
  document.getElementById('timer-val').classList.remove('run');updTimerDisplay();
}
function updTimerDisplay(){
  const m=Math.floor(timerSec/60).toString().padStart(2,'0');
  const s=(timerSec%60).toString().padStart(2,'0');
  document.getElementById('timer-val').textContent=m+':'+s;
}

function isTypingControl(el){
  return el&&['INPUT','SELECT','TEXTAREA','BUTTON'].includes(el.tagName);
}

function bindKeyboardShortcuts(){
  document.addEventListener('keydown',e=>{
    if(IS_PLAN||running||isTypingControl(document.activeElement))return;
    if(e.key==='ArrowUp'){e.preventDefault();aC('forward');}
    else if(e.key==='ArrowLeft'){e.preventDefault();aC('left');}
    else if(e.key==='ArrowRight'){e.preventDefault();aC('right');}
    else if(e.key==='ArrowDown'){e.preventDefault();aC('back');}
    else if(e.key==='Backspace'&&queue.length){e.preventDefault();delLast();}
    else if(e.key==='Enter'&&queue.length&&!document.getElementById('exec0').disabled){e.preventDefault();execPlayer();}
  });
}

// ── CANVAS RENDER ────────────────────────────────────────────────
function drawCanvas(){
  const canvas=document.getElementById('city-canvas');
  if(!canvas||!canvas.getContext)return;
  const ctx=canvas.getContext('2d');
  if(!CW||!CH)return;

  // 1. Background
  ctx.fillStyle='#070a10';
  ctx.fillRect(0,0,CW,CH);

  // 2. Blocks (6×6 grid)
  const bw=SP-ROAD,bh=SP-ROAD;
  for(let r=0;r<GR-1;r++){for(let c=0;c<GC-1;c++){
    const x=cx(c)+ROAD/2,y=cy(r)+ROAD/2;
    ctx.fillStyle=BC[(r*3+c)%BC.length];
    ctx.beginPath();ctx.roundRect(x,y,bw,bh,5);ctx.fill();
  }}

  // 3. Horizontal roads
  for(let r=0;r<GR;r++){for(let c=0;c<GC-1;c++){
    const x=cx(c)+ROAD/2,y=cy(r)-ROAD/2,rw=SP-ROAD;
    ctx.fillStyle='#111825';ctx.fillRect(x,y,rw,ROAD);
    ctx.save();ctx.strokeStyle='rgba(255,255,255,.04)';ctx.lineWidth=1;ctx.setLineDash([4,6]);
    ctx.beginPath();ctx.moveTo(x,cy(r));ctx.lineTo(x+rw,cy(r));ctx.stroke();ctx.restore();
  }}

  // 4. Vertical roads
  for(let c=0;c<GC;c++){for(let r=0;r<GR-1;r++){
    const x=cx(c)-ROAD/2,y=cy(r)+ROAD/2,rh=SP-ROAD;
    ctx.fillStyle='#111825';ctx.fillRect(x,y,ROAD,rh);
    ctx.save();ctx.strokeStyle='rgba(255,255,255,.04)';ctx.lineWidth=1;ctx.setLineDash([4,6]);
    ctx.beginPath();ctx.moveTo(cx(c),y);ctx.lineTo(cx(c),y+rh);ctx.stroke();ctx.restore();
  }}

  // 5. Street names — horizontal
  ctx.font=`500 7px 'DM Mono',monospace`;ctx.fillStyle='rgba(255,255,255,.09)';
  ctx.textAlign='left';ctx.textBaseline='middle';
  for(let r=0;r<GR;r++)ctx.fillText(HN[r],cx(0)+ROAD/2+3,cy(r)-10);
  // vertical (rotated)
  for(let c=0;c<GC;c++){
    ctx.save();ctx.translate(cx(c)+ROAD/2+10,cy(0)+ROAD/2+3);ctx.rotate(-Math.PI/2);
    ctx.font=`500 7px 'DM Mono',monospace`;ctx.fillStyle='rgba(255,255,255,.09)';
    ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(VN[c],0,0);ctx.restore();
  }

  // 6. Intersections — même couleur que la route (rue continue)
  for(let r=0;r<GR;r++){for(let c=0;c<GC;c++){
    const x=cx(c)-ROAD/2,y=cy(r)-ROAD/2;
    ctx.fillStyle='#111825';ctx.fillRect(x,y,ROAD,ROAD);
  }}



  // 7b. Chemin optimal (pointillés verts)
  if(optimalPath.length>1){
    ctx.save();ctx.strokeStyle='rgba(0,255,136,.6)';ctx.lineWidth=4;
    ctx.setLineDash([7,5]);ctx.lineCap='round';
    for(let i=1;i<optimalPath.length;i++)drawStreetSeg(ctx,optimalPath[i-1],optimalPath[i]);
    ctx.restore();
  }

  // 7c. Chemin parcouru (trait orange)
  if(trail.length>1){
    ctx.save();ctx.strokeStyle='rgba(255,149,0,.75)';ctx.lineWidth=4;ctx.lineCap='round';
    for(let i=1;i<trail.length;i++)drawStreetSeg(ctx,trail[i-1],trail[i]);
    ctx.restore();
  }

  // 8. Travaux
  for(const k of trav){
    const[tr,tc]=k.split('_').map(Number);
    const x=cx(tc)-ROAD/2,y=cy(tr)-ROAD/2;
    ctx.save();ctx.beginPath();ctx.roundRect(x,y,ROAD,ROAD,3);ctx.clip();
    ctx.fillStyle='rgba(220,40,40,.88)';ctx.fillRect(x,y,ROAD,ROAD);
    ctx.strokeStyle='rgba(0,0,0,.5)';ctx.lineWidth=2.5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(x+2,y+2);ctx.lineTo(x+ROAD-2,y+ROAD-2);
    ctx.moveTo(x+ROAD-2,y+2);ctx.lineTo(x+2,y+ROAD-2);ctx.stroke();
    ctx.restore();
  }

  // 9. Start marker
  {const sx=cx(startPos.c),sy=cy(startPos.r);
  ctx.save();ctx.beginPath();ctx.arc(sx,sy,11,0,Math.PI*2);
  ctx.fillStyle='#ff9500';ctx.shadowColor='rgba(255,149,0,.4)';ctx.shadowBlur=8;ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=2;ctx.stroke();ctx.restore();
  ctx.font=`700 9px 'DM Sans',sans-serif`;ctx.fillStyle='#000';
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('▶',sx,sy);}

  // 10. Destination — D: spectaculaire, icône + nom + halo
  if(aDest!==null&&pts[aDest]&&pts[aDest].rev){
    const p=pts[aDest],dx=cx(p.c),dy=cy(p.r);
    const pulse=Math.sin(Date.now()/400);
    const r1=Math.round(SP*.28),r2=Math.round(SP*.2);
    ctx.save();
    // halo externe animé
    ctx.beginPath();ctx.arc(dx,dy,r1+pulse*5,0,Math.PI*2);
    ctx.strokeStyle=`rgba(255,255,255,${.18+pulse*.1})`;ctx.lineWidth=3;ctx.stroke();
    // halo couleur
    ctx.beginPath();ctx.arc(dx,dy,r2+4,0,Math.PI*2);
    ctx.fillStyle=p.col+'55';ctx.fill();
    // disque principal
    ctx.beginPath();ctx.arc(dx,dy,r2,0,Math.PI*2);
    ctx.fillStyle=p.col;ctx.shadowColor=p.col;ctx.shadowBlur=22;ctx.fill();
    ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.stroke();
    ctx.restore();
    // icône du lieu
    const icoFs=Math.round(r2*.9);
    ctx.font=`${icoFs}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(getNear(p.r,p.c).i,dx,dy-2);
  }

  // 11. Player — F: plus grand, plus visible de loin
  {const px=player.rx,py=player.ry;
  const pname='';
  const pr=Math.max(22,Math.round(SP*.26));
  ctx.save();
  // halo externe pulsant
  ctx.beginPath();ctx.arc(px,py,pr+8,0,Math.PI*2);
  ctx.fillStyle='rgba(255,149,0,.15)';ctx.fill();
  // disque principal
  ctx.beginPath();ctx.arc(px,py,pr,0,Math.PI*2);
  ctx.fillStyle='#ff9500';ctx.shadowColor='rgba(255,149,0,.8)';ctx.shadowBlur=28;ctx.fill();
  ctx.strokeStyle='#fff';ctx.lineWidth=3.5;ctx.stroke();ctx.restore();
  // flèche direction
  const arrFs=Math.round(pr*.9);
  ctx.font=`bold ${arrFs}px 'DM Sans',sans-serif`;ctx.fillStyle='#fff';
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(ARR[player.d],px,py);
  // badge nom
  if(pname){
    const nmFs=Math.max(10,Math.round(SP*.11));
    ctx.font=`700 ${nmFs}px 'DM Mono',monospace`;
    const lw=Math.min(ctx.measureText(pname).width+14,SP*.9);
    const bh=nmFs+8,by=py-pr-bh-4;
    ctx.fillStyle='#0d1018';ctx.strokeStyle='rgba(255,149,0,.6)';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.roundRect(px-lw/2,by,lw,bh,5);ctx.fill();ctx.stroke();
    ctx.fillStyle='#ff9500';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(pname,px,by+bh/2,lw-4);
  }}

  // 12. Flash vert à l'arrivée
  if(flashAlpha>0){
    ctx.fillStyle=`rgba(0,255,136,${flashAlpha.toFixed(2)})`;
    ctx.fillRect(0,0,CW,CH);
    flashAlpha=Math.max(0,flashAlpha-.025);
  }

  // 13. Confettis
  confettiParticles=confettiParticles.filter(p=>p.life>0);
  for(const p of confettiParticles){
    ctx.save();ctx.globalAlpha=p.life;
    ctx.translate(p.x,p.y);ctx.rotate(p.rot);
    ctx.fillStyle=p.col;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
    ctx.restore();
    p.x+=p.vx;p.y+=p.vy;p.vy+=0.12;p.rot+=p.vrot;p.vx*=0.99;p.life-=p.decay;
  }
}

function _tick(ts){
  if(IS_PLAN)syncFromOpener();
  if(_animStart!==null){
    const t=Math.min(1,(ts-_animStart)/ANIM_MS);
    // ease-in-out cubic (matches cubic-bezier(.4,0,.2,1) perceptually)
    const e=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1;
    player.rx=_animStartX+(_animTargetX-_animStartX)*e;
    player.ry=_animStartY+(_animTargetY-_animStartY)*e;
    if(t>=1){player.rx=_animTargetX;player.ry=_animTargetY;_animStart=null;}
  }
  drawCanvas();
  requestAnimationFrame(_tick);
}

// INIT
function initSels(){
  for(let i=1;i<=MAX;i++)document.getElementById('sn').add(new Option(i,i));
  document.getElementById('sn').value=2;
  for(let i=1;i<=MAX;i++)document.getElementById('nn').add(new Option(ord(i),i));
  document.getElementById('nn').value=2;
  COLS.forEach((l,i)=>document.getElementById('tc').add(new Option(l,i)));
  ROWS.forEach((l,i)=>document.getElementById('tr').add(new Option(l,i)));
  COLS.forEach((l,i)=>document.getElementById('s0c').add(new Option(l,i)));
  ROWS.forEach((l,i)=>document.getElementById('s0r').add(new Option(l,i)));
  document.getElementById('s0c').value=startPos.c;
  document.getElementById('s0r').value=startPos.r;
}
// ── VUE PLAN ──────────────────────────────────────────────
function openPlanWindow(){
  const url=location.href.split('?')[0]+'?plan';
  window.open(url,'nowhereland-plan','width=1100,height=750,menubar=no,toolbar=no,location=no');
}
let _lastQStr='';
function syncFromOpener(){
  if(!window.opener||window.opener.closed)return;
  try{
    const o=window.opener;
    // état joueur
    Object.assign(player,o.player);
    _animTargetX=o._animTargetX||player.rx;
    _animTargetY=o._animTargetY||player.ry;
    _animStartX=o._animStartX||player.rx;
    _animStartY=o._animStartY||player.ry;
    _animStart=o._animStart;
    trail=o.trail||[];
    optimalPath=o.optimalPath||[];
    if(o.pts)pts=o.pts;
    if(o.trav)trav=o.trav;
    if(o.startPos)Object.assign(startPos,o.startPos);
    aDest=o.aDest;
    running=o.running;
    stepMode=o.stepMode;
    flashAlpha=o.flashAlpha||0;
    confettiParticles=o.confettiParticles||[];
    // dimensions canvas
    if(o.SP&&(SP!==o.SP||CW!==o.CW)){
      SP=o.SP;MG=o.MG;CW=o.CW;CH=o.CH;ROAD=o.ROAD;
      document.documentElement.style.setProperty('--sp',SP+'px');
      const c=document.getElementById('city-canvas');
      c.width=CW;c.height=CH;
    }
    // consigne
    const qs=JSON.stringify(o.queue);
    if(qs!==_lastQStr){
      queue=o.queue||[];_lastQStr=qs;renderC();updExecBtn();
    }
  }catch(e){}
}
if(IS_PLAN){
  document.getElementById('root').classList.add('plan-mode');
  // Masquer les overlays résultat et classement inutiles dans la vue plan
  const ov=document.getElementById('ov');
  const rv=document.getElementById('rv');
  if(ov)ov.remove();
  if(rv)rv.remove();
  setTimeout(buildCity,80);
}
// ──────────────────────────────────────────────────────────
initSels();buildCity();requestAnimationFrame(_tick);
bindKeyboardShortcuts();
gen();
// Démarrer la session solo
if(typeof startExerciseSession==='function')startExerciseSession(PAGE_ID);
updSoloHud();
let _rt;window.addEventListener('resize',()=>{clearTimeout(_rt);_rt=setTimeout(()=>{buildCity();},100);});
