/* ============================================================
   CASAIPAY — Shared UI components
   ============================================================ */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));

/* ---------------- Icons ---------------- */
const P = {
  back:'M15 19l-7-7 7-7', chev:'M9 5l7 7-7 7',
  bell:'M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 01-3.4 0',
  eye:'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z|M12 15a3 3 0 100-6 3 3 0 000 6z',
  eyeoff:'M17.9 17.9A10.5 10.5 0 0112 19c-6.4 0-10-7-10-7a19 19 0 015.1-5.9m3.2-1.7A10 10 0 0112 5c6.4 0 10 7 10 7a19 19 0 01-2.3 3.3M9.9 9.9a3 3 0 104.2 4.2|M2 2l20 20',
  copy:'M9 9h10v10a2 2 0 01-2 2H9a2 2 0 01-2-2V9z|M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1',
  up:'M7 17L17 7|M9 7h8v8',
  down:'M17 7L7 17|M15 17H7V9',
  plus:'M12 5v14|M5 12h14',
  minus:'M5 12h14',
  home:'M3 10.5L12 3l9 7.5|M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5',
  grid:'M4 5h6v6H4z|M14 5h6v6h-6z|M4 15h6v6H4z|M14 15h6v6h-6z',
  qr:'M4 4h6v6H4z|M14 4h6v6h-6z|M4 14h6v6H4z|M14 14h2v2h-2z|M18 14h2v2h-2z|M14 18h2v2h-2z|M18 18h2v2h-2z',
  zap:'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  user:'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2|M12 11a4 4 0 100-8 4 4 0 000 8z',
  check:'M4 12.5l5.2 5.2L20 7',
  x:'M6 6l12 12|M18 6L6 18',
  search:'M11 19a8 8 0 100-16 8 8 0 000 16z|M21 21l-4.3-4.3',
  shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  scan:'M4 8V5a1 1 0 011-1h3|M16 4h3a1 1 0 011 1v3|M20 16v3a1 1 0 01-1 1h-3|M8 20H5a1 1 0 01-1-1v-3|M4 12h16',
  store:'M4 9h16l-1 11H5L4 9z|M4 9l1.5-5h13L20 9|M9 13v3M15 13v3',
  bank:'M3 10l9-6 9 6|M5 10v9M19 10v9M9 10v9M15 10v9|M3 20h18',
  card:'M2 6h20v12H2z|M2 10h20',
  phone:'M7 2h10v20H7z|M11 18.5h2',
  wallet:'M3 7h16a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z|M3 7l2-3h11l2 3|M17 13h2',
  lock:'M5 11h14v10H5z|M8 11V7a4 4 0 018 0v4',
  bellring:'M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8',
  globe:'M12 21a9 9 0 100-18 9 9 0 000 18z|M3 12h18|M12 3a15 15 0 010 18a15 15 0 010-18z',
  help:'M12 21a9 9 0 100-18 9 9 0 000 18z|M9.5 9.5a2.5 2.5 0 015 .5c0 1.7-2.5 2-2.5 3.5|M12 17.2v.1',
  out:'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4|M16 17l5-5-5-5|M21 12H9',
  pin:'M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z|M12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  share:'M12 3v13|M8 7l4-4 4 4|M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5',
  back2:'M19 12H5|M11 18l-6-6 6-6',
  face:'M4 8V5a1 1 0 011-1h3|M16 4h3a1 1 0 011 1v3|M20 16v3a1 1 0 01-1 1h-3|M8 20H5a1 1 0 01-1-1v-3|M9 10v.5M15 10v.5|M9 14.5a4 4 0 006 0',
  hand:'M8 13V4.5a1.5 1.5 0 013 0V12|M11 12V3.5a1.5 1.5 0 013 0V12|M14 12.5V6a1.5 1.5 0 013 0v8|M5 13.5V10a1.5 1.5 0 013 0v3|M5 13c0 4.5 2.5 8 7 8s7-3.5 7-8',
  arrowr:'M5 12h14|M13 5l7 7-7 7',
  refresh:'M21 12a9 9 0 11-3-6.7|M21 3v6h-6',
  clock:'M12 21a9 9 0 100-18 9 9 0 000 18z|M12 7v5l3 2',
  bag:'M6 8h12l-1 12H7L6 8z|M9 8V6a3 3 0 016 0v2',
  cash:'M2 7h20v10H2z|M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  backspace:'M20 5H9l-6 7 6 7h11a1 1 0 001-1V6a1 1 0 00-1-1z|M17 9l-5 6M12 9l5 6'
};
function icon(n, size=20, sw=1.75){
  const d = P[n]; if(!d) return '';
  const paths = d.split('|').map(p=>`<path d="${p}"/>`).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

/* ---------------- Bits ---------------- */
const appbar = (title='', {back=true, right='', solid=true, onBack=''}={}) => `
  <div class="appbar ${solid?'solid':''}">
    ${back?`<button class="iconbtn" data-act="${onBack||'back'}" aria-label="Back">${icon('back',22)}</button>`:'<div style="width:8px"></div>'}
    <div class="title grow">${title}</div>${right}
  </div>`;

/* Nigerian flag as SVG — the flag emoji renders as bare "NG" letters on Windows
   and many Android builds, and wraps unpredictably next to the dial code. */
const NG_FLAG = `<span class="flag"><svg viewBox="0 0 9 6" preserveAspectRatio="none" aria-hidden="true">
  <rect width="9" height="6" fill="#fff"/><rect width="3" height="6" fill="#008751"/>
  <rect x="6" width="3" height="6" fill="#008751"/></svg></span>`;
const dialPrefix = (code='+234') =>
  `<span class="dial">${NG_FLAG}<span class="code">${code}</span></span>`;

function avatar(who, cls=''){
  const obj = (who && typeof who === 'object') ? who : null;
  const initials = obj ? (obj.initials||'?') : (who||'?');
  const photo = obj ? obj.photo : null;
  return photo
    ? `<div class="avatar ${cls} photo"><img src="${photo}" alt=""></div>`
    : `<div class="avatar ${cls}">${initials}</div>`;
}

const contactRow = (u, right='') => `
  <div class="row gap12">${avatar(u, u.faceEnrolled?'ring':'')}
    <div class="grow"><p class="t2">${u.name}</p><p class="b2">@${u.username}</p></div>${right}</div>`;

const txnRow = t => {
  const ic = t.channel==='merchant' ? 'store' : (t.type==='credit'?'down':'up');
  const tint = t.type==='credit' ? 't-mint' : (t.channel==='merchant'?'t-gold':'t-navy');
  const ch = {casaipay:'CASAIPAY',bank:'Bank transfer',merchant:'Shop',topup:'Top up',agent:'Agent'}[t.channel]||'';
  return `<button class="lrow" data-act="txn" data-id="${t.id}">
    <div class="tile ${tint}">${icon(ic,18)}</div>
    <div class="grow"><p class="t2">${t.party}</p><p class="b2">${timeOf(t.ts)} · ${ch}</p></div>
    <p class="t2 num ${t.type==='credit'?'pos':''}">${t.type==='credit'?'+':'−'}${fmt(t.amount)}</p>
  </button>`;
};

function groupTxns(list){
  if(!list.length) return `<div class="card ctr stack gap8" style="padding:34px 24px">
      <p class="t2">No money has moved yet</p><p class="b2">Add money to get started.</p></div>`;
  const g={}; list.forEach(t=>{ const d=dayOf(t.ts); (g[d]=g[d]||[]).push(t); });
  return Object.entries(g).map(([d,items])=>`
    <p class="cap" style="padding:18px 4px 8px">${d}</p>
    <div class="rows">${items.map(txnRow).join('')}</div>`).join('');
}

/* ---------------- Toast ---------------- */
function toast(msg){
  const el = document.createElement('div');
  el.className='toast'; el.textContent=msg;
  $('#toast-root').appendChild(el);
  setTimeout(()=>{ el.classList.add('out'); setTimeout(()=>el.remove(),200); }, 2200);
}

/* ---------------- Sheet ---------------- */
let sheetStack = [];
function sheet(html, {onMount, dismissible=true, full=false}={}){
  const scrim = document.createElement('div');
  scrim.className='scrim';
  scrim.innerHTML = `<div class="sheet ${full?'full':''}">${dismissible?'<div class="handle"></div>':''}${html}</div>`;
  document.body.appendChild(scrim);
  sheetStack.push(scrim);
  if(dismissible) scrim.addEventListener('click', e=>{ if(e.target===scrim) closeSheet(); });
  scrim.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeSheet()));
  onMount && onMount(scrim);
  return scrim;
}
function closeSheet(all=false){
  const s = sheetStack.pop(); if(!s) return;
  s.classList.add('out'); setTimeout(()=>s.remove(),210);
  if(all) while(sheetStack.length) closeSheet();
}
function closeAllSheets(){ while(sheetStack.length){ const s=sheetStack.pop(); s.remove(); } }

/* ---------------- Confirm sheet ---------------- */
function confirmSheet({title, body, rows=[], ok='Continue', cancel='Go back', onOk, onCancel}){
  sheet(`
    <p class="t1 ctr">${title}</p>
    <p class="b1 ctr mt8" style="padding:0 6px">${body}</p>
    ${rows.length?`<div class="drows mt20">${rows.map(r=>`<div class="drow"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`).join('')}</div>`:''}
    <div class="btn-row mt20">
      <button class="btn btn-tint" data-close>${cancel}</button>
      <button class="btn btn-gold" data-ok>${ok}</button>
    </div>`,
    { onMount(s){
        s.querySelector('[data-ok]').onclick=()=>{ closeSheet(); setTimeout(()=>onOk&&onOk(),160); };
        if(onCancel) s.querySelector('[data-close]').onclick=()=>{ closeSheet(); setTimeout(()=>onCancel(),160); };
      } });
}

/* ---------------- Numeric keypad ---------------- */
const LETTERS = {2:'ABC',3:'DEF',4:'GHI',5:'JKL',6:'MNO',7:'PQRS',8:'TUV',9:'WXYZ'};
function shuffled(){
  const a=[0,1,2,3,4,5,6,7,8,9];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function keypadHTML({secure=false}={}){
  // The secure keypad reshuffles its digits every time it is drawn, so a shoulder-surfer
  // watching finger positions learns nothing about the passcode.
  const keys = secure ? (()=>{ const s=shuffled(); return [...s.slice(0,9),'blank',s[9],'back']; })()
                      : [1,2,3,4,5,6,7,8,9,'.',0,'back'];
  return `<div class="keytray ${secure?'secure':''}" ${secure?'data-secure':''}>
    ${secure?`<div class="keyhead">${icon('shield',13)} CASAIPAY secure keypad</div>`:''}
    ${keys.map(k=>{
      if(k==='blank') return `<div class="key blank"></div>`;
      if(k==='back') return `<button class="key" data-key="back">${icon('backspace',24)}</button>`;
      return `<button class="key" data-key="${k}"><span class="n">${k}</span>${(!secure&&LETTERS[k])?`<span class="l">${LETTERS[k]}</span>`:''}</button>`;
    }).join('')}
  </div>`;
}
function bindKeypad(root, onKey){
  const bind = () => root.querySelectorAll('[data-key]').forEach(b=>b.onclick=()=>{
    if(navigator.vibrate) navigator.vibrate(6);
    const k = b.dataset.key;
    onKey(k);
    reshuffle();
  });
  function reshuffle(){
    const tray = root.querySelector('[data-secure]');
    if(!tray) return;
    const s = shuffled(), digits = [...s.slice(0,9), null, s[9]];
    let n = 0;
    tray.querySelectorAll('.key, .key.blank').forEach(()=>{});
    Array.from(tray.children).forEach(child=>{
      if(child.classList.contains('keyhead')) return;
      if(child.classList.contains('blank')){ n++; return; }
      if(child.dataset.key==='back'){ n++; return; }
      const d = digits[n]; n++;
      if(d==null) return;
      child.dataset.key = d;
      const span = child.querySelector('.n'); if(span) span.textContent = d;
    });
    bind();
  }
  bind();
}

/* ---------------- Passcode pad ---------------- */
function passcodePad({title, sub='', onDone, onAlt='', altLabel='', forgot=false}){
  return `<div class="stack" style="flex:1">
    <div class="stack gap8 ctr" style="padding:24px 24px 8px">
      <p class="t1">${title}</p>${sub?`<p class="b1">${sub}</p>`:''}
    </div>
    <div class="dots mt16" data-dots>${'<i></i>'.repeat(4)}</div>
    ${altLabel?`<button class="btn btn-ghost mt8" data-act="${onAlt}">${altLabel}</button>`:''}
    ${forgot?`<button class="btn btn-ghost" data-act="forgot">Forgot passcode?</button>`:''}
    <div class="grow"></div>
    ${keypadHTML({secure:true})}
  </div>`;
}
function bindPasscode(root, onComplete){
  let code = '';
  const dots = root.querySelector('[data-dots]');
  const paint = () => dots.querySelectorAll('i').forEach((d,i)=>d.classList.toggle('on', i<code.length));
  bindKeypad(root, k=>{
    if(k==='back'){ code=code.slice(0,-1); paint(); return; }
    if(k==='.'||code.length>=4) return;
    code+=k; paint();
    if(code.length===4){
      setTimeout(()=>{
        onComplete(code, ()=>{ // fail callback
          dots.classList.add('shake');
          setTimeout(()=>{ dots.classList.remove('shake'); code=''; paint(); }, 340);
        });
      }, 140);
    }
  });
}

/* ---------------- Face capture ---------------- */
function faceHTML(status='Position your face in the circle'){
  return `<div class="facewrap">
    <div class="faceoval" data-oval>
      <video playsinline muted autoplay data-video></video>
      <div class="fallback hide" data-fallback>${icon('user',56,1.2)}</div>
      <div class="brackets"><i></i><i></i><i></i><i></i></div>
      <div class="scanline"></div>
      <svg class="ring" viewBox="0 0 230 230"><circle class="track" cx="115" cy="115" r="110"/>
        <circle class="prog" cx="115" cy="115" r="110" data-prog/></svg>
      <div class="badge">${icon('check',24,3)}</div>
    </div>
    <p class="t1 ctr" data-status>${status}</p>
  </div>`;
}
async function startCamera(root){
  const v = root.querySelector('[data-video]'), fb = root.querySelector('[data-fallback]');
  try{
    const stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}});
    v.srcObject = stream; await v.play();
    root._stream = stream;
  }catch(e){
    v.classList.add('hide'); fb.classList.remove('hide');
    const st = root.querySelector('[data-status]');
    if(st) st.insertAdjacentHTML('afterend','<p class="b2 ctr">Camera unavailable — simulating verification.</p>');
  }
}
function stopCamera(root){
  if(root && root._stream){ root._stream.getTracks().forEach(t=>t.stop()); root._stream=null; }
}
function runScan(root, {onDone, fail=false, steps=['Hold still','Checking your identity…']}={}){
  const oval = root.querySelector('[data-oval]');
  const prog = root.querySelector('[data-prog]');
  const st   = root.querySelector('[data-status]');
  oval.classList.add('scanning');
  let t0 = performance.now(), dur = 2200;
  if(st) st.textContent = steps[0];
  setTimeout(()=>{ if(st) st.textContent = steps[1]; }, 1000);
  function tick(t){
    const p = Math.min((t-t0)/dur, 1);
    prog.style.strokeDashoffset = 691*(1-p);
    if(p<1) requestAnimationFrame(tick);
    else{
      oval.classList.remove('scanning');
      if(fail){
        if(st){ st.textContent="That's not a match"; st.classList.add('dang'); }
        prog.style.stroke='var(--danger)';
        setTimeout(()=>onDone&&onDone(false), 500);
      }else{
        oval.classList.add('done');
        if(st) st.textContent = 'Verified';
        if(navigator.vibrate) navigator.vibrate([10,40,20]);
        setTimeout(()=>onDone&&onDone(true), 620);
      }
    }
  }
  requestAnimationFrame(tick);
}

/* ---------------- QR (deterministic pseudo-matrix) ---------------- */
function qrSVG(text, size=236){
  const N=29, cell=size/N;
  let h=2166136261;
  for(let i=0;i<text.length;i++){ h^=text.charCodeAt(i); h=Math.imul(h,16777619); }
  const rnd=()=>{ h^=h<<13; h^=h>>>17; h^=h<<5; return (h>>>0)/4294967296; };
  const finder=(x,y)=>(x<7&&y<7)||(x>N-8&&y<7)||(x<7&&y>N-8);
  let r='';
  for(let y=0;y<N;y++) for(let x=0;x<N;x++){
    if(finder(x,y)) continue;
    if(Math.abs(x-14)<4 && Math.abs(y-14)<4) continue;
    if(rnd()>0.52) r+=`<rect x="${(x*cell).toFixed(2)}" y="${(y*cell).toFixed(2)}" width="${(cell*.92).toFixed(2)}" height="${(cell*.92).toFixed(2)}" rx="${(cell*.22).toFixed(2)}"/>`;
  }
  const eye=(x,y)=>`<rect x="${x*cell}" y="${y*cell}" width="${7*cell}" height="${7*cell}" rx="${cell*1.6}" fill="none" stroke="#101418" stroke-width="${cell*1.05}"/>
    <rect x="${(x+2.4)*cell}" y="${(y+2.4)*cell}" width="${2.2*cell}" height="${2.2*cell}" rx="${cell*.7}"/>`;
  return `<svg class="qr" viewBox="0 0 ${size} ${size}" fill="#101418" xmlns="http://www.w3.org/2000/svg">
    ${r}${eye(0,0)}${eye(N-7,0)}${eye(0,N-7)}</svg>`;
}

/* ---------------- Bank picker ---------------- */
function bankPicker(onPick){
  const banks = S.state.banks;
  sheet(`<p class="t1 ctr">Select bank</p>
    <div class="search mt16">${icon('search',18)}<input placeholder="Search banks" data-q></div>
    <div class="rows mt16" data-list style="max-height:52dvh;overflow-y:auto">
      ${banks.map(b=>`<button class="lrow" data-b="${b}">
        <div class="tile t-navy" style="font-weight:700;font-size:14px">${b[0]}</div>
        <p class="t2 grow">${b}</p></button>`).join('')}
    </div>`,
    { onMount(s){
        const list=s.querySelector('[data-list]');
        const bind=()=>list.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{ closeSheet(); onPick(b.dataset.b); });
        bind();
        s.querySelector('[data-q]').oninput=e=>{
          const q=e.target.value.toLowerCase();
          list.innerHTML = banks.filter(b=>b.toLowerCase().includes(q)).map(b=>`<button class="lrow" data-b="${b}">
            <div class="tile t-navy" style="font-weight:700;font-size:14px">${b[0]}</div>
            <p class="t2 grow">${b}</p></button>`).join('') || `<div style="padding:20px" class="b1 ctr">No bank matches that.</div>`;
          bind();
        };
      }});
}

/* ---------------- Amount screen helper ---------------- */
function magnitude(v){
  const n = Math.floor(Number(v)||0);
  if(n>=1e9) return 'Billions'; if(n>=1e6) return 'Millions';
  if(n>=1e3) return 'Thousands'; if(n>=100) return 'Hundreds'; return '';
}
function amountScreenHTML({header='', chips=[500,1000,2000,5000,9999,10000], remark=true, cta='Confirm', note=''}){
  return `<div class="stack" style="flex:1;min-height:0">
    <div class="scroll" style="padding-top:4px">
      ${header}
      <div class="card mt16">
        <div class="between"><p class="cap">Amount</p>${note?`<span class="pill p-mint">${note}</span>`:''}</div>
        <div class="amount-wrap">
          <div class="mag" data-mag></div>
          <div class="amount-line" data-line>
            <span class="fig"><span class="naira">₦</span></span>
            <span class="fig" data-fig>0</span>
          </div>
        </div>
        <p class="helper" data-help>Minimum ₦10.00</p>
      </div>
      <div class="chips mt16">${chips.map(c=>`<button class="chip" data-chip="${c}">₦${c.toLocaleString()}</button>`).join('')}</div>
      ${remark?`<div class="field mt16" data-remark-field>
        <p class="cap">What's this for?</p>
        <div class="field-row"><input class="val" placeholder="Optional" data-remark maxlength="40"></div>
      </div>`:''}
      <div style="height:12px"></div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>${cta}</button></div>
    ${keypadHTML()}
  </div>`;
}
function bindAmount(root, {max, onNext, ctaLabel}){
  let raw = '';
  const fig=root.querySelector('[data-fig]'), mag=root.querySelector('[data-mag]'),
        line=root.querySelector('[data-line]'), help=root.querySelector('[data-help]'),
        btn=root.querySelector('[data-act="next"]');
  const val = () => parseFloat(raw||'0')||0;
  function paint(){
    const v = val();
    fig.textContent = raw==='' ? '0' : (raw.includes('.') ? raw.replace(/\B(?=(\d{3})+(?!\d))/g,'') : Number(raw).toLocaleString('en-NG'));
    if(raw.includes('.')){
      const [a,b]=raw.split('.');
      fig.textContent = Number(a||0).toLocaleString('en-NG')+'.'+b;
    }
    const m = magnitude(v);
    mag.textContent = m; mag.classList.toggle('on', !!m);
    const over = max!=null && v>max;
    line.classList.toggle('over', over);
    if(over){ help.className='helper err'; help.innerHTML=`You only have ${fmt(max)}. <b data-act="topup" style="color:var(--navy)">Add money</b>`; }
    else if(v>0 && v<10){ help.className='helper err'; help.textContent='Minimum is ₦10.00'; }
    else { help.className='helper'; help.textContent='Minimum ₦10.00'; }
    btn.disabled = !(v>=10 && !over);
    if(ctaLabel) btn.textContent = v>=10 ? ctaLabel(v) : ctaLabel(0);
  }
  bindKeypad(root, k=>{
    if(k==='back') raw=raw.slice(0,-1);
    else if(k==='.'){ if(!raw.includes('.')) raw=(raw||'0')+'.'; }
    else { if(raw.includes('.') && raw.split('.')[1].length>=2) return; if(raw==='0') raw=k; else raw+=k; }
    paint();
  });
  root.querySelectorAll('[data-chip]').forEach(c=>c.onclick=()=>{ raw=c.dataset.chip; paint(); });
  btn.onclick=()=>onNext(val(), (root.querySelector('[data-remark]')||{}).value||'');
  paint();
}

/* ============================================================
   Avatars — illustrated portraits, camera stills, uploads
   Everything is stored as a data URI in localStorage, so photos
   survive a reload and need no network.
   ============================================================ */
const SKIN  = ['#7B4A2B','#6A3D22','#5A331C','#8A5A34','#4A2A15','#93643D','#5E3A20','#452715'];
const HAIRC = ['#1B1210','#241713','#0F0B0A','#2E1D16'];
const CLOTH = ['#0A1F44','#F5C518','#1B7F4C','#B4562A','#2B4C86','#8A6D00','#14315F','#C2410C'];
const BGT   = ['#FEF6D6','#DCF2E3','#E8EDFA','#FDEDE6','#F1EEE7','#FBE9D7'];
const STYLES = ['afro','braids','gele','lowcut','locs','bun','hijab','fade','twists','shortafro'];

function hashOf(str){
  let h = 2166138261;
  for(let i=0;i<String(str).length;i++){ h ^= String(str).charCodeAt(i); h = Math.imul(h,16777619); }
  return Math.abs(h);
}

/* Original illustrated portrait. Deterministic from the seed, so the same
   person always gets the same face. Not a photograph of any real individual. */
function portraitSVG(seed, override){
  const h = hashOf(seed);
  const pick = (arr,n) => arr[(h >> n) % arr.length];
  const skin  = pick(SKIN,2), hair = pick(HAIRC,5),
        cloth = pick(CLOTH,8), bg = pick(BGT,11),
        style = override || STYLES[(h >> 14) % STYLES.length];
  const shade = c => c.replace(/^#(..)(..)(..)$/,(m,r,g,b)=>
    '#'+[r,g,b].map(x=>Math.max(0,parseInt(x,16)-26).toString(16).padStart(2,'0')).join(''));

  let back = '', front = '';
  if(style==='afro'){
    back  = `<circle cx="60" cy="36" r="32" fill="${hair}"/>`;
    front = `<path d="M32 46c2-17 13-25 28-25s26 8 28 25c-6-9-16-13-28-13S38 37 32 46z" fill="${hair}"/>`;
  } else if(style==='shortafro'){
    back  = `<ellipse cx="60" cy="34" rx="28" ry="22" fill="${hair}"/>`;
    front = `<path d="M34 44c2-14 12-21 26-21s24 7 26 21c-6-8-15-11-26-11s-20 3-26 11z" fill="${hair}"/>`;
  } else if(style==='braids'){
    back  = `<ellipse cx="60" cy="34" rx="27" ry="21" fill="${hair}"/>
             <rect x="30" y="46" width="7" height="34" rx="3.5" fill="${hair}"/>
             <rect x="83" y="46" width="7" height="34" rx="3.5" fill="${hair}"/>`;
    front = `<path d="M34 43c2-13 12-20 26-20s24 7 26 20c-6-7-15-10-26-10s-20 3-26 10z" fill="${hair}"/>
             ${[42,50,58,66,74].map(x=>`<rect x="${x}" y="23" width="2.6" height="18" rx="1.3" fill="${shade(hair)}"/>`).join('')}`;
  } else if(style==='twists'){
    back  = `<ellipse cx="60" cy="33" rx="29" ry="23" fill="${hair}"/>`;
    front = `<path d="M33 44c2-14 12-22 27-22s25 8 27 22c-6-8-16-12-27-12s-21 4-27 12z" fill="${hair}"/>
             ${[38,48,58,68,78].map((x,i)=>`<circle cx="${x}" cy="${20+(i%2)*5}" r="5.5" fill="${hair}"/>`).join('')}`;
  } else if(style==='gele'){
    back  = `<ellipse cx="60" cy="30" rx="34" ry="24" fill="${cloth}"/>`;
    front = `<path d="M28 40c0-16 14-26 32-26s32 10 32 26c-8-8-19-12-32-12s-24 4-32 12z" fill="${cloth}"/>
             <ellipse cx="60" cy="22" rx="30" ry="12" fill="${shade(cloth)}" opacity=".45"/>
             <path d="M30 30c14-9 46-9 60 0" stroke="${shade(cloth)}" stroke-width="2.5" fill="none" opacity=".6"/>`;
  } else if(style==='hijab'){
    back  = `<path d="M60 8c-22 0-32 16-32 34 0 14 4 24 8 32H84c4-8 8-18 8-32C92 24 82 8 60 8z" fill="${cloth}"/>`;
    front = `<path d="M32 42c0-19 11-30 28-30s28 11 28 30c-7-9-16-13-28-13s-21 4-28 13z" fill="${cloth}"/>
             <path d="M36 36c12-9 36-9 48 0" stroke="${shade(cloth)}" stroke-width="2" fill="none" opacity=".5"/>`;
  } else if(style==='locs'){
    back  = `<ellipse cx="60" cy="34" rx="28" ry="22" fill="${hair}"/>
             ${[27,34,86,93].map((x,i)=>`<rect x="${x}" y="${42+(i%2)*4}" width="6" height="${28+(i%2)*8}" rx="3" fill="${hair}"/>`).join('')}`;
    front = `<path d="M34 43c2-13 12-20 26-20s24 7 26 20c-6-7-15-10-26-10s-20 3-26 10z" fill="${hair}"/>`;
  } else if(style==='bun'){
    back  = `<circle cx="60" cy="16" r="12" fill="${hair}"/><ellipse cx="60" cy="35" rx="27" ry="21" fill="${hair}"/>`;
    front = `<path d="M34 44c2-13 12-21 26-21s24 8 26 21c-6-8-15-11-26-11s-20 3-26 11z" fill="${hair}"/>`;
  } else if(style==='fade'){
    back  = `<ellipse cx="60" cy="36" rx="26" ry="19" fill="${hair}"/>`;
    front = `<path d="M36 42c2-11 11-17 24-17s22 6 24 17c-6-6-14-9-24-9s-18 3-24 9z" fill="${hair}"/>`;
  } else { /* lowcut */
    back  = '';
    front = `<path d="M35 42c2-12 11-19 25-19s23 7 25 19c-6-7-14-10-25-10s-19 3-25 10z" fill="${hair}"/>`;
  }

  const earring = (h>>17)%3===0
    ? `<circle cx="31" cy="60" r="3" fill="#F5C518"/><circle cx="89" cy="60" r="3" fill="#F5C518"/>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
    <rect width="120" height="120" fill="${bg}"/>
    <path d="M60 78c-20 0-34 12-38 30-1 5 0 12 0 12h76s1-7 0-12c-4-18-18-30-38-30z" fill="${cloth}"/>
    <rect x="52" y="66" width="16" height="18" rx="7" fill="${shade(skin)}"/>
    ${back}
    <ellipse cx="60" cy="52" rx="25" ry="29" fill="${skin}"/>
    <ellipse cx="34" cy="55" rx="4.5" ry="6" fill="${skin}"/>
    <ellipse cx="86" cy="55" rx="4.5" ry="6" fill="${skin}"/>
    ${earring}
    ${front}
    <path d="M45 48c3-2 7-2 10 0M65 48c3-2 7-2 10 0" stroke="${shade(hair)}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    <ellipse cx="50" cy="56" rx="3.1" ry="3.6" fill="#181008"/>
    <ellipse cx="70" cy="56" rx="3.1" ry="3.6" fill="#181008"/>
    <circle cx="51.1" cy="54.8" r="1" fill="#fff" opacity=".85"/>
    <circle cx="71.1" cy="54.8" r="1" fill="#fff" opacity=".85"/>
    <path d="M60 58v6c0 1.6-1.4 2.4-2.8 2.4" stroke="${shade(skin)}" stroke-width="2" stroke-linecap="round" fill="none"/>
    <path d="M53 71c3.6 3.4 10.4 3.4 14 0" stroke="${shade(skin)}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
  </svg>`;
}

function portraitURI(seed, style){
  const svg = portraitSVG(seed, style);
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/* Crop any image file to a square data URI small enough for localStorage */
function fileToAvatar(file, cb){
  if(!file || !/^image\//.test(file.type)) return cb(null);
  const fr = new FileReader();
  fr.onload = () => {
    const img = new Image();
    img.onload = () => {
      const size = 320, c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      const s = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width-s)/2, (img.height-s)/2, s, s, 0, 0, size, size);
      cb(c.toDataURL('image/jpeg', 0.78));
    };
    img.onerror = () => cb(null);
    img.src = fr.result;
  };
  fr.onerror = () => cb(null);
  fr.readAsDataURL(file);
}

/* Still frame from the live face-capture video */
function grabFrame(root){
  const v = root && root.querySelector('[data-video]');
  if(!v || !v.videoWidth) return null;
  try{
    const size = 320, c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const s = Math.min(v.videoWidth, v.videoHeight);
    ctx.drawImage(v, (v.videoWidth-s)/2, (v.videoHeight-s)/2, s, s, 0, 0, size, size);
    return c.toDataURL('image/jpeg', 0.78);
  }catch(e){ return null; }
}
