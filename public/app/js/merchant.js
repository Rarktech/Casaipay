/* ============================================================
   CASAIPAY Merchant — navy-led till app
   ============================================================ */
var MSCREENS = {};

function mNav(active){
  const it=(id,ic,label)=>`<button class="${active===id?'on':''}" data-mnav="${id}">${icon(ic,22)}<span>${label}</span></button>`;
  return `<nav class="nav">
    ${it('home','home','Home')}
    ${it('payments','grid','Payments')}
    <button class="center" data-mnav="charge" aria-label="Charge a customer">
      <div class="glow"></div><div class="circ">${icon('scan',26,2)}</div></button>
    ${it('cashout','cash','Send')}
    ${it('mprofile','user','Profile')}
  </nav>`;
}

/* ============ SIGN IN ============ */
MSCREENS['login'] = {
  render(){ const m=S.merchant; return `<div class="screen">
    <div class="m-header" style="border-radius:0 0 26px 26px;padding-top:26px">
      <div class="row gap10"><div style="width:26px;height:26px;border-radius:8px;background:var(--gold);display:grid;place-items:center;color:var(--navy)">
        ${icon('store',15,2.2)}</div><span class="t1" style="color:#fff;font-size:17px">CASAIPAY Merchant</span></div>
      <p class="d2 mt24" style="color:#fff">${m.name}</p>
      <p class="b2" style="color:rgba(255,255,255,.55)">${m.location}</p>
    </div>
    <div class="stack ctr gap8" style="padding:24px 24px 0">
      <p class="t1">Enter your passcode</p><p class="b1">Prototype passcode: 1234</p></div>
    <div class="dots mt16" data-dots>${'<i></i>'.repeat(4)}</div>
    <div class="grow"></div>${keypadHTML({secure:true})}</div>`; },
  mount(r){ bindPasscode(r,(code,fail)=>{
    if(code===S.merchant.passcode) mgo('home'); else { toast('Wrong passcode'); fail(); }
  }); }
};

/* ============ HOME ============ */
MSCREENS['home'] = {
  render(){
    const m=S.merchant, t=S.todaySales();
    return `<div class="screen">
      <div class="m-header">
        <div class="between">
          <button class="row gap12" data-mnav="mprofile" style="text-align:left">
            ${avatar(m)}
            <div><p class="t2" style="color:#fff">${m.name}</p>
              <p class="b2" style="color:rgba(255,255,255,.5)">${m.location}</p></div>
          </button>
          <button class="iconbtn r" style="color:#fff">${icon('bell',22)}</button>
        </div>
        <p class="cap mt24">Today's sales</p>
        <p class="sales mt4">${nairaFig(t.total)}</p>
        <div class="row gap16 mt8">
          <p class="b2" style="color:rgba(255,255,255,.6)">${t.count} payment${t.count===1?'':'s'}</p>
          <p class="b2" style="color:rgba(255,255,255,.6)">·  Wallet ${fmt(m.balance)}</p>
        </div>
      </div>
      <div class="scroll" style="padding-top:18px">
        <button class="btn btn-gold" style="height:60px;font-size:18px" data-mnav="charge">
          ${icon('scan',22,2.2)} Charge a customer</button>
        <button class="btn btn-white mt12" style="height:54px" data-mnav="redeem">
          ${icon('cash',20)} Redeem a cash pickup code</button>
        <div class="row gap10 mt12">
          <button class="pill-btn grow" data-mnav="cashout" style="justify-content:center">${icon('bank',17)} Send</button>
          <button class="pill-btn grow" data-act="qr" style="justify-content:center">${icon('qr',17)} Shop code</button>
        </div>

        <div class="between mt24"><p class="t1">Pay a bill</p>
          <button class="b2" data-mnav="bills" style="color:var(--navy);font-weight:600">See all</button></div>
        <div class="qgrid mt12">
          ${(()=>{ const B=S.state.billers;
            return [['airtime','Airtime'],['data','Data'],['power','Electricity'],['internet','Internet']]
              .map(([k,label])=>`<button class="qtile" data-mbill="${k}">
                <div class="tile ${B[k].tint}">${icon(B[k].icon,19)}</div><span>${label}</span></button>`).join(''); })()}
        </div>
        <div class="between mt24"><p class="t1">Recent payments</p>
          <button class="b2" data-mnav="payments" style="color:var(--navy);font-weight:600">See all</button></div>
        <div class="rows mt12">${m.txns.slice(0,5).map(t=>`<button class="lrow" data-mtxn="${t.id}">
          <div class="tile t-mint">${icon('down',18)}</div>
          <div class="grow"><p class="t2">${t.party}</p><p class="b2">${timeOf(t.ts)} · ${t.method==='face'?'Face ID':'Passcode'}</p></div>
          <p class="t2 num pos">+${fmt(t.amount)}</p></button>`).join('')}</div>
      </div>
      ${mNav('home')}</div>`;
  },
  mount(r){
    $('[data-act="qr"]',r).onclick=()=>sheet(`<p class="t1 ctr">Your shop code</p>
      <p class="b1 ctr mt8">Customers scan this to pay you.</p>
      <div class="qrcard mt20">${qrSVG('casaipay://shop/'+S.merchant.id)}
        <div class="mid"><div class="avatar sm" style="background:var(--gold);color:var(--navy)">${icon('store',16)}</div></div></div>
      <button class="btn btn-gold mt20" data-close>Done</button>`);
    $$('[data-mbill]',r).forEach(b=>b.onclick=()=>{ FLOW={biller:b.dataset.mbill}; mgo('bill-form'); });
    $$('[data-mtxn]',r).forEach(b=>b.onclick=()=>{
      const t=S.merchant.txns.find(x=>x.id===b.dataset.mtxn); receiptSheet(t); });
  }
};

/* ============ CHARGE — STEP 1: WHO ============ */
MSCREENS['charge'] = {
  render(){
    const recents = Object.values(S.state.users);
    return `<div class="screen">${appbar('Charge a customer',{onBack:'mback'})}
      <div class="row gap6 pad" style="flex:none;padding-bottom:12px">
        ${[0,1,2].map(i=>`<i style="height:4px;flex:1;border-radius:99px;background:${i===0?'var(--gold)':'var(--line)'}"></i>`).join('')}
      </div>
      <div class="scroll">
        <h1 class="d2">Who's paying?</h1>
        <p class="b1 mt8">Ask the customer for their CASAIPAY ID.</p>
        <div class="field mt20"><p class="cap">CASAIPAY ID</p>
          <div class="field-row"><span class="prefix">@</span>
            <input class="val" data-u placeholder="chidi" autocapitalize="off">
            <button data-act="scan" style="color:var(--ink-3)">${icon('scan',20)}</button></div></div>
        <div data-res></div>
        <p class="cap mt24">Regulars</p>
        <div class="rows mt8">${recents.map(u=>`<button class="lrow" data-pick="${u.username}">
          ${avatar(u,u.faceEnrolled?'ring':'')}
          <div class="grow"><p class="t2">${u.name}</p><p class="b2">@${u.username}</p></div>
          <span class="pill ${u.faceEnrolled?'p-mint':'p-grey'}">${u.faceEnrolled?'Face ID':'Passcode'}</span></button>`).join('')}</div>
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Next</button></div></div>`;
  },
  mount(r){
    const inp=$('[data-u]',r), res=$('[data-res]',r), b=$('[data-act="next"]',r); let t, found=null;
    const resolve=h=>{ const u=S.find(h);
      if(u){ found=u; res.innerHTML=`<div class="card mt16 row gap12">${avatar(u,u.faceEnrolled?'ring':'')}
        <div class="grow"><p class="t2">${u.name}</p><p class="b2">@${u.username}</p></div>
        <span class="pill ${u.faceEnrolled?'p-mint':'p-grey'}">${u.faceEnrolled?'Face ID':'Passcode only'}</span></div>`;
        b.disabled=false; }
      else { found=null; res.innerHTML=`<p class="helper err">No customer with that ID. Ask them to check it in their CASAIPAY app.</p>`; b.disabled=true; }
    };
    inp.oninput=()=>{ inp.value=inp.value.toLowerCase().replace(/[^a-z0-9]/g,''); clearTimeout(t); b.disabled=true; res.innerHTML='';
      if(inp.value.length>=3) t=setTimeout(()=>resolve(inp.value),400); };
    $$('[data-pick]',r).forEach(p=>p.onclick=()=>{ inp.value=p.dataset.pick; resolve(p.dataset.pick); });
    $('[data-act="scan"]',r).onclick=()=>{ inp.value='chidi'; setTimeout(()=>resolve('chidi'),600); toast('Code scanned'); };
    b.onclick=()=>{ FLOW={charge:found.username}; mgo('charge-amount'); };
  }
};

/* ============ STEP 2: AMOUNT ============ */
MSCREENS['charge-amount'] = {
  render(){ const u=S.find(FLOW.charge);
    return `<div class="screen">${appbar('Charge a customer',{onBack:'mback'})}
      <div class="row gap6 pad" style="flex:none;padding-bottom:12px">
        ${[0,1,2].map(i=>`<i style="height:4px;flex:1;border-radius:99px;background:${i<=1?'var(--gold)':'var(--line)'}"></i>`).join('')}
      </div>
      ${amountScreenHTML({
        header:`<div class="card row gap12">${avatar(u,u.faceEnrolled?'ring':'')}
          <div class="grow"><p class="t2">${u.name}</p><p class="b2">@${u.username}</p></div>
          <button class="pill p-grey" data-act="mback">Change</button></div>`,
        chips:[500,1000,2000,5000,10000,20000], cta:'Charge'})}</div>`; },
  mount(r){
    const u=S.find(FLOW.charge);
    bindAmount(r,{max:null, ctaLabel:v=>v?`Charge ${fmt(v)}`:'Charge',
      onNext(v,note){ FLOW.amount=v; FLOW.note=note; mgo('handover'); }});
    r.querySelectorAll('[data-act="mback"]').forEach(b=>b.onclick=()=>history.back());
    const rf=$('[data-remark-field]',r); if(rf) rf.querySelector('.cap').textContent='What are they buying?';
  }
};

/* ============ STEP 3: HANDOVER ============ */
MSCREENS['handover'] = {
  render(){ const u=S.find(FLOW.charge);
    return `<div class="screen dark">
      <div class="handover">
        <div class="glyph" style="color:var(--gold)">${icon('hand',48,1.6)}</div>
        <p class="d2" style="color:#fff">Hand the phone to ${u.first}</p>
        <p class="b1 mt8" style="color:rgba(255,255,255,.6);max-width:280px">Only they can approve this payment.</p>
        <div class="card mt24" style="background:rgba(255,255,255,.08);box-shadow:none;width:100%;max-width:300px">
          <p class="cap" style="color:rgba(254,246,214,.55)">Charge</p>
          <p class="d1 mt4" style="color:#fff">${nairaFig(FLOW.amount)}</p>
          <p class="b2 mt8" style="color:rgba(255,255,255,.5)">to ${S.merchant.name}${FLOW.note?' · '+FLOW.note:''}</p>
        </div>
      </div>
      <div class="footer" style="background:var(--navy)">
        <button class="btn btn-gold" data-act="go">I'm ${u.first} — continue</button>
        <button class="btn btn-ghost mt8" data-act="cancel" style="color:rgba(255,255,255,.6)">Cancel charge</button>
      </div></div>`; },
  mount(r){
    $('[data-act="go"]',r).onclick=()=>{
      const cust = S.find(FLOW.charge);
      mgo(authModeOf(cust)==='passcode' ? 'charge-fallback' : 'charge-face');
    };
    $('[data-act="cancel"]',r).onclick=()=>{ FLOW={}; mgo('home'); };
  }
};

/* ============ STEP 4: FACE ============ */
MSCREENS['charge-face'] = {
  render(){ const u=S.find(FLOW.charge);
    return `<div class="screen">${appbar('',{onBack:'mback'})}
      <div class="scroll" style="display:flex;flex-direction:column;justify-content:center">
        ${faceHTML('Look at the camera')}
        <p class="b1 ctr mt16">Verifying ${u.name}</p>
        <p class="b2 ctr mt4" data-attempt></p>
      </div></div>`; },
  async mount(r){
    const u=S.find(FLOW.charge);
    if(authModeOf(u)==='passcode'){ return mgo('charge-fallback'); }
    FLOW.tries = FLOW.tries||0;
    await startCamera(r);
    const at=$('[data-attempt]',r);
    if(FLOW.tries>0) at.textContent=`Attempt ${FLOW.tries+1} of 3`;
    setTimeout(()=>runScan(r,{fail:S.state.session.forceFail && FLOW.tries<2, onDone(ok){
      stopCamera(r);
      if(ok){
        if(S.state.session.forceDuressFace && u.decoyFace){ S.enterDuress(u); S.state.session.forceDuressFace=false; S.save(); }
        FLOW.method='face';
        setTimeout(()=>mgo(authModeOf(u)==='face+passcode' ? 'charge-fallback' : 'charge-approve'), 200);
        return;
      }
      FLOW.tries++;
      if(FLOW.tries>=3){ FLOW.failReason='face'; mgo('charge-fallback'); }
      else sheet(`<p class="t1 ctr">That's not a match</p>
        <p class="b1 ctr mt8">Attempt ${FLOW.tries} of 3. Move into better light and hold still.</p>
        <button class="btn btn-gold mt20" data-retry>Try again</button>
        <button class="btn btn-ghost" data-alt>Use passcode instead</button>`,
        { dismissible:false, onMount(s){
            s.querySelector('[data-retry]').onclick=()=>{ closeSheet(); rerender(); };
            s.querySelector('[data-alt]').onclick=()=>{ closeSheet(); mgo('charge-fallback'); };
        }});
    }}),500);
  }
};

MSCREENS['charge-fallback'] = {
  render(){ const u=S.find(FLOW.charge);
    const sub = FLOW.method==='face' ? 'One more step — your passcode.'
      : (u.faceEnrolled ? "Face ID didn't match." : `${u.first} hasn't set up Face ID.`);
    return `<div class="screen">${appbar('',{onBack:'mback'})}
      ${passcodePad({title:'Enter your CASAIPAY passcode', sub})}</div>`; },
  mount(r){ let n=0;
    bindPasscode(r,(code,fail)=>{
      const u=S.find(FLOW.charge);
      if(u.decoyPasscode && code===u.decoyPasscode && code!==u.passcode){
        S.enterDuress(u);                     // silent: nothing on screen changes
        FLOW.method = FLOW.method==='face' ? 'face+passcode' : 'passcode';
        return mgo('charge-approve');
      }
      if(code===u.passcode){
        FLOW.method = FLOW.method==='face' ? 'face+passcode' : 'passcode';
        return mgo('charge-approve');
      }
      n++;
      if(n>=3){ FLOW.failReason='passcode'; mgo('charge-failed'); }
      else { toast(`Wrong passcode · ${3-n} left`); fail(); }
    });
  }
};

/* ============ STEP 5: CUSTOMER APPROVAL ============ */
MSCREENS['charge-approve'] = {
  render(){
    const u=S.find(FLOW.charge), m=S.merchant, bal = S.viewBalance(u), short = bal < FLOW.amount;
    if(short) return `<div class="screen">${appbar('',{onBack:'mback'})}
      <div class="result">
        <div class="rmark no">${icon('minus',40,3)}</div>
        <p class="d2">Not enough money</p>
        <p class="b1 mt12">${u.first} has ${fmt(bal)} —<br>${fmt(FLOW.amount-bal)} short of ${fmt(FLOW.amount)}.</p>
      </div>
      <div class="footer stack gap8">
        <button class="btn btn-gold" data-act="lower">Charge ${fmt(bal)} instead</button>
        <button class="btn btn-ghost" data-act="cancel">Cancel charge</button>
      </div></div>`;

    return `<div class="screen">
      <div class="timerbar"><i data-timer></i></div>
      <div class="strip s-gold" style="border-radius:0;justify-content:center">
        ${icon('lock',15)} This is ${u.first}'s private screen</div>
      <div class="scroll" style="padding-top:20px">
        <div class="stack ctr gap8">
          ${avatar(u,'lg ring')}
          <p class="t1 mt8">${u.name}</p>
          <p class="b2">@${u.username} · verified with ${({face:'Face ID','face+passcode':'Face ID + passcode',passcode:'passcode'})[FLOW.method]||'Face ID'}</p>
        </div>
        <div class="card mt20">
          <div class="between"><p class="cap">Available balance</p>
            <button class="b2" data-act="reveal" style="color:var(--navy);font-weight:600">Tap to show</button></div>
          <p class="d1 mt4" data-bal>₦ •••••••</p>
          <p class="b2 mt8" data-after style="visibility:hidden">Balance after: ${fmt(bal-FLOW.amount)}</p>
        </div>
        <div class="card mt12">
          <p class="cap">Paying</p>
          <div class="row gap12 mt8"><div class="tile t-gold">${icon('store',18)}</div>
            <div class="grow"><p class="t2">${m.name}</p><p class="b2">${m.location}</p></div></div>
          ${FLOW.note?`<div class="drows mt16"><div class="drow"><span class="k">For</span><span class="v">${FLOW.note}</span></div></div>`:''}
          <p class="d1 ctr mt20">${nairaFig(FLOW.amount)}</p>
        </div>
      </div>
      <div class="footer stack gap8">
        <div class="slider" data-slider>
          <div class="fill"></div>
          <span class="lbl">Slide to pay ${fmt(FLOW.amount)}</span>
          <div class="knob">${icon('arrowr',22,2.4)}</div>
        </div>
        <button class="btn btn-ghost" data-act="cancel">Cancel</button>
      </div></div>`;
  },
  mount(r){
    const u=S.find(FLOW.charge);
    const cancel=$('[data-act="cancel"]',r); if(cancel) cancel.onclick=()=>{ FLOW={}; mgo('home'); };
    const lower=$('[data-act="lower"]',r);
    if(lower){ lower.onclick=()=>{ FLOW.amount=S.viewBalance(u); if(FLOW.amount<10){ toast('Balance is too low to charge'); mgo('home'); return; } rerender(); }; return; }

    // reveal balance
    $('[data-act="reveal"]',r).onclick=e=>{
      const shown = e.target.textContent.trim()==='Hide';
      $('[data-bal]',r).innerHTML = shown ? '₦ •••••••' : nairaFig(S.viewBalance(u));
      $('[data-after]',r).style.visibility = shown ? 'hidden' : 'visible';
      e.target.textContent = shown ? 'Tap to show' : 'Hide';
    };

    // 60s timer
    const bar=$('[data-timer]',r); let left=60;
    const tick=setInterval(()=>{ left--; bar.style.transform=`scaleX(${left/60})`;
      if(left<=0){ clearInterval(tick); FLOW={}; toast('Charge cancelled — took too long'); mgo('home'); } },1000);
    r._timer=tick;

    // slide to pay
    const sl=$('[data-slider]',r), knob=sl.querySelector('.knob'), fill=sl.querySelector('.fill');
    let dragging=false, startX=0, x=0;
    const max=()=>sl.clientWidth-60;
    const setX=v=>{ x=Math.max(0,Math.min(max(),v)); knob.style.left=(4+x)+'px'; fill.style.width=(60+x)+'px'; };
    const down=e=>{ dragging=true; sl.classList.add('dragging'); startX=(e.touches?e.touches[0].clientX:e.clientX)-x; };
    const move=e=>{ if(!dragging) return; setX((e.touches?e.touches[0].clientX:e.clientX)-startX); };
    const up=()=>{ if(!dragging) return; dragging=false; sl.classList.remove('dragging');
      if(x>max()*0.82){ setX(max()); clearInterval(tick); complete(); } else setX(0); };
    const ac = new AbortController(), sig = {signal:ac.signal};
    r._cleanup = ()=>ac.abort();
    knob.addEventListener('mousedown',down,sig); knob.addEventListener('touchstart',down,{passive:true,signal:ac.signal});
    window.addEventListener('mousemove',move,sig); window.addEventListener('touchmove',move,{passive:true,signal:ac.signal});
    window.addEventListener('mouseup',up,sig); window.addEventListener('touchend',up,sig);
    sl.onclick=e=>{ if(e.target.closest('.knob')) return; setX(max()); setTimeout(()=>{ clearInterval(tick); complete(); },200); };

    function complete(){
      if(navigator.vibrate) navigator.vibrate([12,50,24]);
      const id=S.charge(FLOW.charge,FLOW.amount,FLOW.note||'',FLOW.method||'face');
      FLOW.result={id,amount:FLOW.amount,user:u.name,method:FLOW.method||'face'};
      mgo('charge-done');
    }
  }
};

/* ============ FAILED ============ */
MSCREENS['charge-failed'] = {
  render(){ return `<div class="screen">
    <div class="result"><div class="rmark no">${icon('x',40,3)}</div>
      <p class="d2">Charge cancelled</p>
      <p class="b1 mt12">Too many wrong passcode attempts. Cancelled for the customer's security.</p></div>
    <div class="footer stack gap8">
      <button class="btn btn-gold" data-act="retry">Try again</button>
      <button class="btn btn-ghost" data-act="home">Back to home</button></div></div>`; },
  mount(r){
    $('[data-act="retry"]',r).onclick=()=>{ FLOW.tries=0; mgo('charge'); };
    $('[data-act="home"]',r).onclick=()=>{ FLOW={}; mgo('home'); };
  }
};

/* ============ SUCCESS ============ */
MSCREENS['charge-done'] = {
  render(){ const f=FLOW.result; return `<div class="screen">
    <div class="result">
      <div class="rmark ok">${icon('check',44,3)}</div>
      <p class="d1">${nairaFig(f.amount)} paid</p>
      <p class="t2 mt8">${f.user} → ${S.merchant.name}</p>
      <p class="b2 mt4">${f.id} · ${({face:'Face ID','face+passcode':'Face ID + passcode',passcode:'Passcode'})[f.method]||'Face ID'}</p>
      <div class="card tint mt24" style="width:100%">
        <p class="b1 ctr" style="color:#7a6000">Hand the phone back to the shop</p></div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="done">Done <span data-count>(5)</span></button></div></div>`; },
  mount(r){
    let n=5; const c=$('[data-count]',r);
    const t=setInterval(()=>{ n--; if(c) c.textContent=`(${n})`; if(n<=0){ clearInterval(t); FLOW={}; mgo('home'); } },1000);
    r._timer=t;
    $('[data-act="done"]',r).onclick=()=>{ clearInterval(t); FLOW={}; mgo('home'); };
  }
};

/* ============ PAYMENTS ============ */
MSCREENS['payments'] = {
  render(){
    const m=S.merchant;
    const days=[...Array(7)].map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-(6-i)); d.setHours(0,0,0,0);
      const e=new Date(d); e.setDate(e.getDate()+1);
      const sum=m.txns.filter(t=>new Date(t.ts)>=d&&new Date(t.ts)<e).reduce((a,b)=>a+b.amount,0);
      return {label:d.toLocaleDateString('en-NG',{weekday:'short'})[0], sum}; });
    const peak=Math.max(...days.map(d=>d.sum),1);
    return `<div class="screen">${appbar('Payments',{back:false})}
      <div class="scroll">
        <div class="card">
          <p class="cap">Last 7 days</p>
          <p class="d2 mt4">${fmt(days.reduce((a,b)=>a+b.sum,0))}</p>
          <div class="row gap8 mt20" style="align-items:flex-end;height:90px">
            ${days.map(d=>`<div class="grow stack gap6" style="align-items:center">
              <div style="width:100%;height:${Math.max(4,(d.sum/peak)*72)}px;background:${d.sum?'var(--gold)':'var(--line)'};border-radius:6px"></div>
              <span class="b2" style="font-size:11px">${d.label}</span></div>`).join('')}
          </div>
        </div>
        ${(()=>{ const g={}; m.txns.forEach(t=>{const d=dayOf(t.ts);(g[d]=g[d]||[]).push(t);});
          return Object.entries(g).map(([d,items])=>`<p class="cap" style="padding:18px 4px 8px">${d}</p>
            <div class="rows">${items.map(t=>`<button class="lrow" data-mtxn="${t.id}">
              <div class="tile t-mint">${icon('down',18)}</div>
              <div class="grow"><p class="t2">${t.party}</p><p class="b2">${timeOf(t.ts)} · ${t.remark||'No note'}</p></div>
              <p class="t2 num pos">+${fmt(t.amount)}</p></button>`).join('')}</div>`).join(''); })()}
      </div>${mNav('payments')}</div>`;
  },
  mount(r){ $$('[data-mtxn]',r).forEach(b=>b.onclick=()=>receiptSheet(S.merchant.txns.find(x=>x.id===b.dataset.mtxn))); }
};

/* ============ CASH OUT ============ */
MSCREENS['cashout'] = {
  render(){ const m=S.merchant; return `<div class="screen">${appbar('Send money',{back:false})}
    <div class="scroll">
      <div class="balance-card" style="min-height:auto">
        <div class="rule"></div><p class="cap mt16">Wallet balance</p>
        <p class="amt mt4">${nairaFig(m.balance)}</p>
        <p class="b2 mt8" style="color:rgba(255,255,255,.55)">Move it to your bank, pay a supplier, or send to any CASAIPAY ID</p>
      </div>

      <p class="cap" style="padding:22px 4px 8px">Where's it going?</p>
      <div class="rows">
        <button class="lrow" data-act="settle"><div class="tile t-mint">${icon('bank',18)}</div>
          <div class="grow"><p class="t2">Cash out to ${m.bank.name}</p>
            <p class="b2 mt4">${m.bank.acct} · ${m.bank.holder}</p></div>
          <span class="pill p-mint">Default</span></button>
        <button class="lrow" data-act="tobank"><div class="tile t-navy">${icon('up',18)}</div>
          <div class="grow"><p class="t2">Send to another bank account</p>
            <p class="b2 mt4">Suppliers, staff, anyone with an account</p></div>${icon('chev',18)}</button>
        <button class="lrow" data-act="touser"><div class="tile t-gold">${icon('scan',18)}</div>
          <div class="grow"><p class="t2">Send to a CASAIPAY ID</p>
            <p class="b2 mt4">Free and instant</p></div>${icon('chev',18)}</button>
      </div>

      <p class="cap" style="padding:22px 4px 8px">Recent transfers out</p>
      <div class="rows">${(()=>{ const outs=m.txns.filter(t=>t.type==='debit').slice(0,4);
        return outs.length? outs.map(t=>`<button class="lrow" data-mtxn="${t.id}">
          <div class="tile t-navy">${icon('up',18)}</div>
          <div class="grow"><p class="t2">${t.party}</p><p class="b2">${timeOf(t.ts)} · ${t.remark||'Transfer'}</p></div>
          <p class="t2 num">−${fmt(t.amount)}</p></button>`).join('')
        : '<p class="b1" style="padding:18px">Nothing has left this wallet yet.</p>'; })()}</div>
    </div>
    ${mNav('cashout')}</div>`; },
  mount(r){
    const m=S.merchant;
    $('[data-act="settle"]',r).onclick=()=>{
      if(m.balance<=0) return toast('Nothing to cash out');
      confirmSheet({title:'Cash out to your bank?',
        body:'Money lands in your '+m.bank.name+' account in about 10 minutes.',
        rows:[['Amount',fmt(m.balance)],['To',m.bank.name+' · '+m.bank.acct],['Fee',fmt(0)]],
        ok:'Cash out',
        onOk(){ const amt=m.balance; S.merchantSendBank(m.bank.acct,m.bank.name,m.bank.holder,amt);
          FLOW.result={amount:amt,to:m.bank.holder,detail:m.bank.name+' · '+m.bank.acct};
          mgo('msent'); }});
    };
    $('[data-act="tobank"]',r).onclick=()=>mgo('msend-bank');
    $('[data-act="touser"]',r).onclick=()=>mgo('msend-user');
    $$('[data-mtxn]',r).forEach(b=>b.onclick=()=>receiptSheet(m.txns.find(x=>x.id===b.dataset.mtxn)));
  }
};

MSCREENS['msend-bank'] = {
  render(){ return `<div class="screen">${appbar('Send to a bank',{onBack:'mback'})}
    <div class="scroll">
      <div class="field"><p class="cap">Account number</p>
        <div class="field-row"><input class="val mono" inputmode="numeric" maxlength="10" placeholder="0123456789" data-acct></div></div>
      <button class="field mt12" style="width:100%;text-align:left" data-act="bank">
        <p class="cap">Bank</p><div class="field-row"><span class="val ink3" data-bankname>Select bank</span>
        <div class="grow"></div>${icon('chev',18)}</div></button>
      <div data-res></div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Next</button></div></div>`; },
  mount(r){
    const acct=$('[data-acct]',r), bn=$('[data-bankname]',r), res=$('[data-res]',r), b=$('[data-act="next"]',r);
    let bank=null, name=null;
    const tryResolve=()=>{
      if(acct.value.length===10 && bank){
        res.innerHTML='<p class="helper">Checking account…</p>';
        setTimeout(()=>{ name=S.state.namePool[acct.value.charCodeAt(9)%S.state.namePool.length];
          res.innerHTML=`<div class="strip s-mint mt16">${icon('check',15,3)} ${name}</div>`; b.disabled=false; },900);
      } else { res.innerHTML=''; b.disabled=true; }
    };
    acct.oninput=()=>{ acct.value=acct.value.replace(/\D/g,'').slice(0,10); tryResolve(); };
    $('[data-act="bank"]',r).onclick=()=>bankPicker(x=>{ bank=x; bn.textContent=x; bn.classList.remove('ink3'); tryResolve(); });
    b.onclick=()=>{ FLOW={mkind:'bank',acct:acct.value,bank,bankName:name}; mgo('msend-amount'); };
  }
};

MSCREENS['msend-user'] = {
  render(){ return `<div class="screen">${appbar('Send to a CASAIPAY ID',{onBack:'mback'})}
    <div class="scroll">
      <div class="strip s-mint">${icon('zap',16)} Instant · zero fees</div>
      <div class="field mt16"><p class="cap">CASAIPAY ID</p>
        <div class="field-row"><span class="prefix">@</span><input class="val" data-u placeholder="chidi" autocapitalize="off"></div></div>
      <div data-res></div>
      <p class="cap mt24">Recent customers</p>
      <div class="rows mt8">${Object.values(S.state.users).map(u=>`<button class="lrow" data-pick="${u.username}">
        ${avatar(u,u.faceEnrolled?'ring':'')}
        <div class="grow"><p class="t2">${u.name}</p><p class="b2">@${u.username}</p></div>${icon('chev',18)}</button>`).join('')}</div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Next</button></div></div>`; },
  mount(r){
    const inp=$('[data-u]',r), res=$('[data-res]',r), b=$('[data-act="next"]',r); let t, found=null;
    const resolve=h=>{ const u=S.find(h);
      if(u){ found=u; res.innerHTML=`<div class="strip s-mint mt16">${icon('check',15,3)} ${u.name} · verified</div>`; b.disabled=false; }
      else { found=null; res.innerHTML='<p class="helper err">No CASAIPAY account with that ID.</p>'; b.disabled=true; } };
    inp.oninput=()=>{ inp.value=inp.value.toLowerCase().replace(/[^a-z0-9]/g,''); clearTimeout(t); b.disabled=true; res.innerHTML='';
      if(inp.value.length>=3) t=setTimeout(()=>resolve(inp.value),400); };
    $$('[data-pick]',r).forEach(p=>p.onclick=()=>{ FLOW={mkind:'user',to:p.dataset.pick}; mgo('msend-amount'); });
    b.onclick=()=>{ FLOW={mkind:'user',to:found.username}; mgo('msend-amount'); };
  }
};

MSCREENS['msend-amount'] = {
  render(){
    const head = FLOW.mkind==='user'
      ? `<div class="card">${contactRow(S.find(FLOW.to))}</div>`
      : `<div class="card"><p class="t2">${FLOW.bankName}</p><p class="b2 mt4">${FLOW.acct} · ${FLOW.bank}</p></div>`;
    return `<div class="screen">${appbar('Send money',{onBack:'mback'})}
      ${amountScreenHTML({header:head, chips:[1000,5000,10000,20000,50000,100000], note:'No fee'})}</div>`;
  },
  mount(r){
    bindAmount(r,{max:S.merchant.balance, ctaLabel:v=>v?`Send ${fmt(v)}`:'Confirm',
      onNext(v,remark){
        FLOW.amount=v; FLOW.remark=remark;
        const rows = FLOW.mkind==='user'
          ? [['Name',S.find(FLOW.to).name],['CASAIPAY ID','@'+FLOW.to],['Amount',fmt(v)],['Fee',fmt(0)]]
          : [['Name',FLOW.bankName],['Account no.',FLOW.acct],['Bank',FLOW.bank],['Amount',fmt(v)],['Fee',fmt(0)]];
        confirmSheet({title:'Check before you send',
          body:"Confirm the details below. Completed transfers can't be reversed.",
          rows, ok:'Continue',
          onOk(){
            sheet(`<p class="t1 ctr">Enter your merchant passcode</p>
              <div class="dots mt24" data-dots>${'<i></i>'.repeat(4)}</div>
              <p class="helper ctr">Prototype passcode: 1234</p>
              ${keypadHTML({secure:true})}`,
              { onMount(s){ bindPasscode(s,(code,fail)=>{
                  if(code!==S.merchant.passcode){ toast('Wrong passcode'); return fail(); }
                  closeSheet();
                  setTimeout(()=>{
                    if(FLOW.mkind==='user'){ S.merchantSendUser(FLOW.to,FLOW.amount,FLOW.remark);
                      FLOW.result={amount:FLOW.amount,to:S.find(FLOW.to).name,detail:'@'+FLOW.to}; }
                    else { S.merchantSendBank(FLOW.acct,FLOW.bank,FLOW.bankName,FLOW.amount);
                      FLOW.result={amount:FLOW.amount,to:FLOW.bankName,detail:FLOW.bank+' · '+FLOW.acct}; }
                    mgo('msent');
                  },180);
                }); }});
          }});
      }});
  }
};

MSCREENS['msent'] = {
  render(){ const f=FLOW.result; return `<div class="screen">
    <div class="result">
      <div class="rmark ok">${icon('check',44,3)}</div>
      <p class="d1">${nairaFig(f.amount)}</p>
      <p class="t2 mt8">sent to ${f.to}</p>
      <p class="b2 mt4">${f.detail}</p>
      <div class="drows mt24" style="width:100%;text-align:left">
        <div class="drow"><span class="k">Wallet balance</span><span class="v">${fmt(S.merchant.balance)}</span></div>
      </div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="done">Done</button></div></div>`; },
  mount(r){ $('[data-act="done"]',r).onclick=()=>{ FLOW={}; mgo('home'); }; }
};

/* ============ MERCHANT PROFILE ============ */
MSCREENS['mprofile'] = {
  render(){ const m=S.merchant; return `<div class="screen">${appbar('Profile',{back:false})}
    <div class="scroll">
      <div class="card row gap12">
        <button data-act="photo" style="position:relative">
          ${m.photo?avatar(m,'lg ring'):`<div class="avatar lg" style="background:var(--gold);color:var(--navy)">${icon('store',24)}</div>`}
          <span style="position:absolute;right:-2px;bottom:-2px;width:24px;height:24px;border-radius:50%;
            background:var(--gold);display:grid;place-items:center;box-shadow:0 0 0 2px var(--surface)">
            ${icon('plus',13,3)}</span>
        </button>
        <div class="grow"><p class="t1">${m.name}</p><p class="b2 mt4">${m.owner} · ${m.location}</p></div>
      </div>
      <p class="cap" style="padding:20px 4px 8px">Shop</p>
      <div class="rows">
        <button class="lrow" data-act="qr"><div class="tile t-gold">${icon('qr',18)}</div>
          <p class="t2 grow">My shop code</p>${icon('chev',18)}</button>
        <div class="lrow"><div class="tile t-mint">${icon('cash',18)}</div>
          <div class="grow"><p class="t2">Agent mode</p><p class="b2">Accept cash claims from CASAIPAY users</p></div>
          <span class="pill ${m.agentMode?'p-mint':'p-grey'}">${m.agentMode?'On':'Off'}</span></div>
        <button class="lrow" data-act="bills"><div class="tile t-blush">${icon('zap',18)}</div>
          <div class="grow"><p class="t2">Bills, airtime &amp; flights</p>
            <p class="b2 mt4">Paid from your shop wallet</p></div>${icon('chev',18)}</button>
        <button class="lrow" data-act="claims"><div class="tile t-navy">${icon('cash',18)}</div>
          <div class="grow"><p class="t2">Redeem a cash pickup</p>
            <p class="b2 mt4">${S.state.claims.filter(c=>c.status==='pending').length} code(s) waiting</p></div>${icon('chev',18)}</button>
      </div>
      <p class="cap" style="padding:20px 4px 8px">Business</p>
      <div class="rows">
        <div class="lrow"><div class="tile t-blush">${icon('user',18)}</div><p class="t2 grow">Staff</p>
          <span class="pill p-grey">Coming soon</span></div>
        <button class="lrow" data-act="help"><div class="tile t-navy">${icon('help',18)}</div>
          <p class="t2 grow">Help &amp; support</p>${icon('chev',18)}</button>
      </div>
      <p class="cap" style="padding:20px 4px 8px">Payouts</p>
      <div class="rows">
        <div class="lrow"><div class="tile t-mint">${icon('bank',18)}</div>
          <div class="grow"><p class="t2">${m.bank.name}</p><p class="b2 mt4">${m.bank.acct} · ${m.bank.holder}</p></div>
          <span class="pill p-mint">Default</span></div>
      </div>
      <div class="rows mt20">
        <button class="lrow" data-act="user"><div class="tile t-gold">${icon('phone',18)}</div>
          <p class="t2 grow">Open the customer app</p>${icon('chev',18)}</button>
      </div>
      <button class="btn btn-ghost mt16" data-act="out" style="color:var(--danger)">Sign out</button>
      <div style="height:20px"></div>
    </div>${mNav('mprofile')}</div>`; },
  mount(r){
    $('[data-act="photo"]',r).onclick=()=>changePhotoSheet(S.merchant, 'Shop photo');
    $('[data-act="qr"]',r).onclick=()=>sheet(`<p class="t1 ctr">Your shop code</p>
      <div class="qrcard mt20">${qrSVG('casaipay://shop/'+S.merchant.id)}</div>
      <button class="btn btn-gold mt20" data-close>Done</button>`);
    $('[data-act="claims"]',r).onclick=()=>mgo('redeem');
    $('[data-act="bills"]',r).onclick=()=>mgo('bills');
    $('[data-act="user"]',r).onclick=()=>{ S.state.session.app='user'; S.save(); location.hash='#/u/home'; };
    $('[data-act="help"]',r).onclick=()=>toast('Support is stubbed in this prototype');
    $('[data-act="out"]',r).onclick=()=>confirmSheet({title:'Sign out?',body:'You can sign back in with your passcode.',ok:'Sign out',
      onOk(){ mgo('login'); }});
  }
};

/* ============ REDEEM A CASH PICKUP CODE ============ */
MSCREENS['redeem'] = {
  render(){
    const pending = S.state.claims.filter(c=>c.status==='pending');
    return `<div class="screen">${appbar('Redeem a code',{onBack:'mback'})}
      <div class="scroll">
        <div class="strip s-gold">${icon('cash',16)} Pay out the cash and your wallet is credited the same amount</div>
        <div class="field mt16"><p class="cap">Claim code</p>
          <div class="field-row"><input class="val mono" data-code placeholder="7K2M4Q" maxlength="6"
            autocapitalize="characters" style="letter-spacing:.18em;text-transform:uppercase"></div></div>
        <div data-res></div>
        ${pending.length?`<p class="cap mt24">Codes waiting nearby</p>
          <div class="rows mt8">${pending.map(c=>{ const who=S.claimant(c); return `<button class="lrow" data-pick="${c.code}">
            ${who&&who.photo?avatar(who,'ring'):`<div class="tile t-gold">${icon('cash',18)}</div>`}
            <div class="grow"><p class="t2">${fmt(c.amount)}</p>
              <p class="b2 mt4">${who?who.name:'Cash pickup'} · <b class="mono">${c.code}</b></p></div>
            ${icon('chev',18)}</button>`; }).join('')}</div>
          <p class="b2 mt12">Listed here for the demo. In the real app a shop only sees a code once a customer reads it out.</p>`:''}
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Look up code</button></div></div>`;
  },
  mount(r){
    const inp=$('[data-code]',r), res=$('[data-res]',r), b=$('[data-act="next"]',r);
    let found=null;
    const resolve=code=>{
      found=S.findClaim(code);
      if(found){
        const who=S.claimant(found);
        res.innerHTML=`<div class="strip s-mint mt16">${icon('check',15,3)} ${fmt(found.amount)} for ${who?who.name:'this code'}</div>`;
        b.disabled=false;
      } else {
        res.innerHTML='<p class="helper err">No cash waiting on that code. Check it and try again.</p>';
        b.disabled=true;
      }
    };
    inp.oninput=()=>{ inp.value=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);
      res.innerHTML=''; b.disabled=true;
      if(inp.value.length===6) resolve(inp.value); };
    $$('[data-pick]',r).forEach(x=>x.onclick=()=>{ inp.value=x.dataset.pick; resolve(x.dataset.pick); });
    b.onclick=()=>{ FLOW={redeem:found.code}; mgo('redeem-details'); };
  }
};

MSCREENS['redeem-details'] = {
  render(){
    const c=S.findClaim(FLOW.redeem);
    if(!c) return `<div class="screen">${appbar('Redeem a code',{onBack:'mback'})}
      <div class="result"><div class="rmark no">${icon('x',40,3)}</div>
      <p class="d2">Code already used</p><p class="b1 mt12">This cash has been collected.</p></div>
      <div class="footer"><button class="btn btn-gold" data-act="home">Back</button></div></div>`;
    const who=S.claimant(c), sender=S.user(c.from);
    return `<div class="screen">${appbar('Cash pickup',{onBack:'mback'})}
      <div class="scroll">
        <div class="card ctr">
          <p class="cap">Pay out in cash</p>
          <p class="d1 mt8">${nairaFig(c.amount)}</p>
          <span class="pill p-gold mt12" style="height:32px">code <b class="mono">&nbsp;${c.code}</b></span>
        </div>

        <p class="cap" style="padding:22px 4px 8px">Collecting</p>
        <div class="card row gap12">${avatar(who,'lg ring')}
          <div class="grow"><p class="t1">${who.name}</p>
            <p class="b2 mt4">0${String(who.phone||'').slice(1)}</p>
            <span class="pill ${who.faceEnrolled?'p-mint':'p-grey'} mt8">
              ${who.faceEnrolled?icon('face',13)+' Face enrolled':'Passcode only'}</span></div></div>

        <p class="cap" style="padding:22px 4px 8px">Sent by</p>
        <div class="rows">
          <div class="lrow">${sender?avatar(sender):`<div class="tile t-navy">${icon('user',18)}</div>`}
            <div class="grow"><p class="t2">${sender?sender.name:'CASAIPAY user'}</p>
              <p class="b2 mt4">${fullDate(c.ts)}</p></div></div>
          <div class="lrow"><div class="tile t-gold">${icon('shield',18)}</div>
            <div class="grow"><p class="t2">Backup passcode</p>
              <p class="b2 mt4">${c.otp?'Set by the sender':'Not set — face only'}</p></div></div>
        </div>

        <div class="card tint mt20 row gap12">
          <div class="tile t-gold" style="background:#fff">${icon('cash',18)}</div>
          <p class="b1" style="color:#7a6000">Hand over ${fmt(c.amount)} in cash. The same amount is credited
            to your wallet the moment their face is verified.</p>
        </div>
      </div>
      <div class="footer stack gap8">
        <button class="btn btn-gold" data-act="verify">Verify ${who.name.split(' ')[0]}</button>
        <button class="btn btn-ghost" data-act="cancel">Cancel</button>
      </div></div>`;
  },
  mount(r){
    const v=$('[data-act="verify"]',r); if(v) v.onclick=()=>mgo('redeem-handover');
    const c=$('[data-act="cancel"]',r); if(c) c.onclick=()=>{ FLOW={}; mgo('home'); };
    const h=$('[data-act="home"]',r); if(h) h.onclick=()=>{ FLOW={}; mgo('redeem'); };
  }
};

MSCREENS['redeem-handover'] = {
  render(){
    const c=S.findClaim(FLOW.redeem); if(!c) return '';
    const who=S.claimant(c), first=who.name.split(' ')[0];
    return `<div class="screen dark">
      <div class="handover">
        <div class="glyph" style="color:var(--gold)">${icon('hand',48,1.6)}</div>
        <p class="d2" style="color:#fff">Hand the phone to ${first}</p>
        <p class="b1 mt8" style="color:rgba(255,255,255,.6);max-width:280px">Only their face can release this cash.</p>
        <div class="card mt24" style="background:rgba(255,255,255,.08);box-shadow:none;width:100%;max-width:300px">
          <p class="cap" style="color:rgba(254,246,214,.55)">Collecting</p>
          <p class="d1 mt4" style="color:#fff">${nairaFig(c.amount)}</p>
          <p class="b2 mt8" style="color:rgba(255,255,255,.5)">${who.name} · code ${c.code}</p>
        </div>
      </div>
      <div class="footer" style="background:var(--navy)">
        <button class="btn btn-gold" data-act="go">I'm ${first} — continue</button>
        <button class="btn btn-ghost mt8" data-act="cancel" style="color:rgba(255,255,255,.6)">Cancel</button>
      </div></div>`;
  },
  mount(r){
    const c=S.findClaim(FLOW.redeem);
    $('[data-act="go"]',r).onclick=()=>mgo(S.claimant(c).faceEnrolled ? 'redeem-face' : 'redeem-otp');
    $('[data-act="cancel"]',r).onclick=()=>{ FLOW={}; mgo('home'); };
  }
};

MSCREENS['redeem-face'] = {
  render(){
    const c=S.findClaim(FLOW.redeem); if(!c) return '';
    const who=S.claimant(c);
    return `<div class="screen">${appbar('',{onBack:'mback'})}
      <div class="scroll" style="display:flex;flex-direction:column;justify-content:center">
        ${faceHTML('Look at the camera')}
        <p class="b1 ctr mt16">Verifying ${who.name}</p>
        <p class="b2 ctr mt4" data-attempt></p>
      </div>
      ${c.otp?`<div class="footer"><button class="btn btn-ghost" data-act="otp">Use the backup passcode instead</button></div>`:''}
      </div>`;
  },
  async mount(r){
    const c=S.findClaim(FLOW.redeem); if(!c) return mgo('redeem');
    FLOW.tries=FLOW.tries||0;
    await startCamera(r);
    const at=$('[data-attempt]',r);
    if(FLOW.tries>0 && at) at.textContent=`Attempt ${FLOW.tries+1} of 3`;
    const alt=$('[data-act="otp"]',r);
    if(alt) alt.onclick=()=>{ stopCamera(r); mgo('redeem-otp'); };
    setTimeout(()=>runScan(r,{fail:S.state.session.forceFail && FLOW.tries<2, onDone(ok){
      stopCamera(r);
      if(ok){ FLOW.method='face'; return mgo('redeem-done'); }
      FLOW.tries++;
      if(FLOW.tries>=3 || !c.otp){
        if(c.otp) return mgo('redeem-otp');
        FLOW.failReason='face'; return mgo('redeem-failed');
      }
      sheet(`<p class="t1 ctr">That's not a match</p>
        <p class="b1 ctr mt8">Attempt ${FLOW.tries} of 3. Move into better light and hold still.</p>
        <button class="btn btn-gold mt20" data-retry>Try again</button>
        ${c.otp?'<button class="btn btn-ghost" data-alt>Use the backup passcode</button>':''}`,
        { dismissible:false, onMount(s){
            s.querySelector('[data-retry]').onclick=()=>{ closeSheet(); rerender(); };
            const a=s.querySelector('[data-alt]'); if(a) a.onclick=()=>{ closeSheet(); mgo('redeem-otp'); };
        }});
    }}),500);
  }
};

MSCREENS['redeem-otp'] = {
  render(){
    const c=S.findClaim(FLOW.redeem); if(!c) return '';
    const who=S.claimant(c);
    return `<div class="screen">${appbar('',{onBack:'mback'})}
      ${passcodePad({title:'Enter the one-time passcode',
        sub:`The sender gave this to ${who.name.split(' ')[0]}. It works once.`})}</div>`;
  },
  mount(r){
    const c=S.findClaim(FLOW.redeem); if(!c) return mgo('redeem');
    let n=0;
    bindPasscode(r,(code,fail)=>{
      if(!c.otp){ toast('No backup passcode was set'); return fail(); }
      if(code===c.otp){ FLOW.method='passcode'; return mgo('redeem-done'); }
      n++;
      if(n>=3){ FLOW.failReason='passcode'; return mgo('redeem-failed'); }
      toast(`Wrong passcode · ${3-n} left`); fail();
    });
  }
};

MSCREENS['redeem-done'] = {
  render(){
    if(!FLOW.done){
      const c=S.redeemClaim(FLOW.redeem, FLOW.method||'face');
      if(!c) return `<div class="screen">${appbar('',{back:false})}
        <div class="result"><div class="rmark no">${icon('x',40,3)}</div>
        <p class="d2">Code already used</p></div>
        <div class="footer"><button class="btn btn-gold" data-act="done">Back</button></div></div>`;
      FLOW.done={amount:c.amount, who:S.claimant(c), code:c.code, method:c.method};
    }
    const f=FLOW.done;
    return `<div class="screen">
      <div class="result">
        <div class="rmark ok">${icon('check',44,3)}</div>
        <p class="d1">${nairaFig(f.amount)}</p>
        <p class="t2 mt8">verified for ${f.who.name}</p>
        <p class="b2 mt4">code ${f.code} · ${f.method==='face'?'Face ID':'One-time passcode'}</p>
        <div class="card tint mt24" style="width:100%">
          <p class="t2 ctr" style="color:#7a6000">Hand over ${fmt(f.amount)} in cash</p>
          <p class="b2 ctr mt8">Your wallet has been credited the same amount.</p>
        </div>
        <div class="drows mt16" style="width:100%;text-align:left">
          <div class="drow"><span class="k">Wallet balance</span><span class="v">${fmt(S.merchant.balance)}</span></div>
        </div>
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="done">Done</button></div></div>`;
  },
  mount(r){ $('[data-act="done"]',r).onclick=()=>{ FLOW={}; mgo('home'); }; }
};

MSCREENS['redeem-failed'] = {
  render(){ return `<div class="screen">
    <div class="result"><div class="rmark no">${icon('x',40,3)}</div>
      <p class="d2">Cannot release the cash</p>
      <p class="b1 mt12">${FLOW.failReason==='passcode'
        ? 'Too many wrong passcode attempts.'
        : "The face didn't match and no backup passcode was set."}
        <br>The money stays with the sender.</p></div>
    <div class="footer stack gap8">
      <button class="btn btn-gold" data-act="retry">Try another code</button>
      <button class="btn btn-ghost" data-act="home">Back to home</button></div></div>`; },
  mount(r){
    $('[data-act="retry"]',r).onclick=()=>{ FLOW={}; mgo('redeem'); };
    $('[data-act="home"]',r).onclick=()=>{ FLOW={}; mgo('home'); };
  }
};

MSCREENS['claims'] = MSCREENS['redeem'];

/* ============ Shared bill screens, reused by the merchant app ============
   Same objects as the customer app. They read `inMerchant()` at runtime to
   decide which wallet pays, how it's authorised and where Done returns to. */
['bills','bill-form','bill-amount','bill-done','flights'].forEach(id=>{ MSCREENS[id] = SCREENS[id]; });
