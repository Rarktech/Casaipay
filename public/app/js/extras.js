/* ============================================================
   CASAIPAY — Bills, flights, security & distress unlock

   The bill screens are shared by both apps. Which wallet pays,
   how it is authorised and where "Done" returns to all follow
   from which app is currently open.
   ============================================================ */
const inMerchant = () => location.hash.startsWith('#/m/');
const billNav    = id => inMerchant() ? mgo(id) : go(id);
const billPayer  = () => inMerchant()
  ? { balance:S.merchant.balance, label:S.merchant.name, home:'home' }
  : { balance:S.viewBalance(),    label:S.me.name,       home:'home' };

function billAuthorise(onOk){
  if(!inMerchant()) return authorise({onOk});
  sheet(`<p class="t1 ctr">Enter your merchant passcode</p>
    <div class="dots mt24" data-dots>${'<i></i>'.repeat(4)}</div>
    <p class="helper ctr">Prototype passcode: 1234</p>
    ${keypadHTML({secure:true})}`,
    { onMount(s){ bindPasscode(s,(code,fail)=>{
        if(code!==S.merchant.passcode){ toast('Wrong passcode'); return fail(); }
        closeSheet(); setTimeout(()=>onOk('passcode'),180);
      }); }});
}
function billPay(biller, acct, provider, amount, method, label){
  return inMerchant()
    ? S.merchantPayBill(biller, acct, provider, amount, label)
    : S.payBill(biller, acct, provider, amount, method, label);
}


/* ============ BILLS HUB ============ */
SCREENS['bills'] = {
  render(){
    const B=S.state.billers;
    const cell=(k,b)=>`<button class="qtile lg" data-bill="${k}">
      <div class="tile ${b.tint}">${icon(b.icon,20)}</div><span>${b.label}</span></button>`;
    return `<div class="screen">${appbar('Pay a bill')}
      <div class="scroll">
        <div class="strip s-mint">${icon('zap',16)} ${inMerchant()?'Paid straight from your shop wallet · no service charge':'Instant · no service charge on any bill'}</div>
        <p class="cap mt24">Everyday</p>
        <div class="qgrid mt12">
          ${['airtime','data','power','tv'].map(k=>cell(k,B[k])).join('')}
        </div>
        <p class="cap mt24">Home &amp; more</p>
        <div class="qgrid mt12">
          ${['water','internet','betting','school'].map(k=>cell(k,B[k])).join('')}
        </div>
        <p class="cap mt24">Travel</p>
        <div class="rows mt12">
          <button class="lrow" data-act="flights"><div class="tile t-navy">${icon('zap',18)}</div>
            <div class="grow"><p class="t2">Flights</p><p class="b2">Book domestic flights and pay from your balance</p></div>
            ${icon('chev',18)}</button>
        </div>
      </div></div>`;
  },
  mount(r){
    $$('[data-bill]',r).forEach(b=>b.onclick=()=>{ FLOW={biller:b.dataset.bill}; billNav('bill-form'); });
    $('[data-act="flights"]',r).onclick=()=>billNav('flights');
  }
};

/* ============ BILLER FORM ============ */
SCREENS['bill-form'] = {
  render(){
    const b=S.state.billers[FLOW.biller];
    return `<div class="screen">${appbar(b.label)}
      <div class="scroll">
        <p class="cap">Provider</p>
        <div class="row gap8 mt8" style="flex-wrap:wrap">
          ${b.options.map((o,i)=>`<button class="chip auto ${i===0?'on':''}" data-prov="${o}">${o}</button>`).join('')}
        </div>
        <div class="field mt20"><p class="cap">${b.field}</p>
          <div class="field-row"><input class="val ${b.kind==='meter'?'mono':''}" data-acct
            inputmode="${b.kind==='phone'?'numeric':'text'}" placeholder="${b.ph}"></div></div>
        <div data-res></div>
        ${b.bundles?`<p class="cap mt24">Choose a plan</p>
          <div class="rows mt8">${b.bundles.map(([label,price],i)=>`<button class="lrow" data-bundle="${i}">
            <div class="tile ${b.tint}">${icon(b.icon,18)}</div>
            <div class="grow"><p class="t2">${label}</p></div>
            <p class="t2 num">${fmt(price)}</p></button>`).join('')}</div>`:''}
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="next" disabled>${b.bundles?'Choose a plan':'Next'}</button></div></div>`;
  },
  mount(r){
    const b=S.state.billers[FLOW.biller];
    FLOW.provider=b.options[0];
    const acct=$('[data-acct]',r), res=$('[data-res]',r), next=$('[data-act="next"]',r);
    let bundle=null;

    $$('[data-prov]',r).forEach(p=>p.onclick=()=>{
      $$('[data-prov]',r).forEach(x=>x.classList.remove('on')); p.classList.add('on');
      FLOW.provider=p.dataset.prov; check();
    });

    acct.oninput=()=>{
      if(b.kind==='phone') acct.value=acct.value.replace(/\D/g,'').slice(0,11);
      res.innerHTML=''; check();
      if(valid()){
        setTimeout(()=>{
          if(!valid()) return;
          const nm = b.kind==='phone' ? S.me.name.toUpperCase() : S.state.namePool[acct.value.length % S.state.namePool.length];
          res.innerHTML=`<div class="strip s-mint mt16">${icon('check',15,3)} ${nm}</div>`;
        },600);
      }
    };
    function valid(){ return b.kind==='phone' ? acct.value.length>=10 : acct.value.trim().length>=5; }
    function check(){
      const ok = valid() && (!b.bundles || bundle!=null);
      next.disabled=!ok;
      next.textContent = b.bundles ? (bundle!=null ? 'Pay '+fmt(b.bundles[bundle][1]) : 'Choose a plan') : 'Next';
    }
    $$('[data-bundle]',r).forEach((el,i)=>el.onclick=()=>{
      $$('[data-bundle]',r).forEach(x=>x.classList.remove('sel')); el.classList.add('sel');
      bundle=i; check();
    });
    next.onclick=()=>{
      FLOW.acct=acct.value;
      if(b.bundles){ FLOW.amount=b.bundles[bundle][1]; FLOW.label=b.bundles[bundle][0]; payBillNow(); }
      else billNav('bill-amount');
    };
    check();
  }
};

SCREENS['bill-amount'] = {
  render(){
    const b=S.state.billers[FLOW.biller];
    return `<div class="screen">${appbar(b.label)}
      ${amountScreenHTML({
        header:`<div class="card row gap12"><div class="tile ${b.tint}">${icon(b.icon,18)}</div>
          <div class="grow"><p class="t2">${FLOW.provider}</p><p class="b2">${FLOW.acct}</p></div></div>`,
        chips:b.chips||[500,1000,2000,5000,10000,20000], remark:false, note:'No service charge'})}</div>`;
  },
  mount(r){
    bindAmount(r,{max:billPayer().balance, ctaLabel:v=>v?`Pay ${fmt(v)}`:'Confirm',
      onNext(v){ FLOW.amount=v; FLOW.label=''; payBillNow(); }});
    r.addEventListener('click',e=>{ if(e.target.dataset.act==='topup' && !inMerchant()) go('addmoney'); });
  }
};

function payBillNow(){
  const b=S.state.billers[FLOW.biller];
  confirmSheet({
    title:'Check before you pay',
    body:"Confirm the details below. Completed bill payments can't be reversed.",
    rows:[['Bill',b.label],['Provider',FLOW.provider],[b.field,FLOW.acct],
          ...(FLOW.label?[['Plan',FLOW.label]]:[]),['Amount',fmt(FLOW.amount)]],
    ok:'Continue',
    onOk(){
      billAuthorise(method=>{
        const id=billPay(FLOW.biller,FLOW.acct,FLOW.provider,FLOW.amount,method,FLOW.label);
        FLOW.result={id,amount:FLOW.amount,to:FLOW.provider,
          detail:(FLOW.label?FLOW.label+' · ':'')+FLOW.acct,method,token:FLOW.biller==='power'};
        billNav('bill-done');
      });
    }});
}

SCREENS['bill-done'] = {
  render(){
    const f=FLOW.result;
    const token = f.token ? Array.from({length:4},()=>String(Math.floor(1000+Math.random()*8999))).join(' ') : null;
    return `<div class="screen">
      <div class="result">
        <div class="rmark ok">${icon('check',44,3)}</div>
        <p class="d1">${nairaFig(f.amount)}</p>
        <p class="t2 mt8">paid to ${f.to}</p>
        <p class="b2 mt4">${f.detail}</p>
        ${token?`<div class="card tint mt24" style="width:100%">
          <p class="cap ctr">Your electricity token</p>
          <p class="t1 mono ctr mt8" style="letter-spacing:.08em">${token}</p>
          <button class="b2 mt12" data-act="copytoken" style="color:var(--navy);font-weight:600;width:100%">Copy token</button>
        </div>`:''}
        <div class="drows mt20" style="width:100%;text-align:left">
          <div class="drow"><span class="k">Reference</span><span class="v mono">${f.id}</span></div>
          <div class="drow"><span class="k">Balance after</span><span class="v">${fmt(billPayer().balance)}</span></div>
        </div>
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="done">Done</button></div></div>`;
  },
  mount(r){
    $('[data-act="done"]',r).onclick=()=>billNav('home');
    const c=$('[data-act="copytoken"]',r);
    if(c) c.onclick=()=>{ navigator.clipboard?.writeText(c.previousElementSibling.textContent.trim()); toast('Token copied'); };
  }
};

/* ============ FLIGHTS ============ */
SCREENS['flights'] = {
  render(){
    const routes=[...new Set(S.state.flights.map(f=>f.from+' → '+f.to))];
    const sel=FLOW.route||routes[0];
    const list=S.state.flights.filter(f=>f.from+' → '+f.to===sel);
    return `<div class="screen">${appbar('Flights')}
      <div class="scroll">
        <p class="cap">Route</p>
        <div class="row gap8 mt8" style="flex-wrap:wrap">
          ${routes.map(rt=>`<button class="chip auto ${rt===sel?'on':''}" data-route="${rt}">${rt}</button>`).join('')}
        </div>
        <p class="cap mt24">Departing today</p>
        <div class="stack gap10 mt12">
          ${list.map((f,i)=>`<button class="card row gap12" style="width:100%;text-align:left" data-flight="${i}">
            <div class="tile t-navy">${icon('zap',18)}</div>
            <div class="grow"><p class="t2">${f.airline}</p><p class="b2 mt4">${f.time} · Economy</p></div>
            <div style="text-align:right"><p class="t2 num">${fmt(f.fare)}</p><p class="b2 mt4">1 adult</p></div>
          </button>`).join('')}
        </div>
        <p class="b2 mt20">Fares are one-way and include taxes. Prototype booking — no ticket is issued.</p>
      </div></div>`;
  },
  mount(r){
    $$('[data-route]',r).forEach(b=>b.onclick=()=>{ FLOW.route=b.dataset.route; rerender(); });
    const routes=[...new Set(S.state.flights.map(f=>f.from+' → '+f.to))];
    const sel=FLOW.route||routes[0];
    const list=S.state.flights.filter(f=>f.from+' → '+f.to===sel);
    $$('[data-flight]',r).forEach((b,i)=>b.onclick=()=>{
      const f=list[i];
      const bal = billPayer().balance;
      if(f.fare > bal)
        return confirmSheet({title:'Not enough money',
          body:`This fare is ${fmt(f.fare)} and you have ${fmt(bal)}.`,
          ok: inMerchant()?'Close':'Add money', cancel:'Close',
          onOk:()=>{ if(!inMerchant()) go('addmoney'); }});
      confirmSheet({ title:'Confirm your booking',
        body:'Check the details. Fares are non-refundable once paid.',
        rows:[['Airline',f.airline],['Route',f.from+' → '+f.to],['Departs',f.time],['Passenger',billPayer().label],['Fare',fmt(f.fare)]],
        ok:'Pay '+fmt(f.fare),
        onOk(){ billAuthorise(method=>{
          const id=billPay('flights','1 adult',f.airline,f.fare,method,f.from+' → '+f.to);
          FLOW.result={id,amount:f.fare,to:f.airline,detail:f.from+' → '+f.to+' · '+f.time,method,token:false};
          billNav('bill-done');
        }); }});
    });
  }
};

/* ============ SECURITY & UNLOCK ============ */
SCREENS['security'] = {
  render(){
    const me=S.me, mode=authModeOf(me);
    const opt=(k,title,sub,disabled)=>`<button class="lrow" data-mode="${k}" ${disabled?'style="opacity:.45"':''}>
      <div class="tile ${mode===k?'t-mint':'t-grey'}">${mode===k?icon('check',18,3):icon('shield',18)}</div>
      <div class="grow"><p class="t2">${title}</p><p class="b2 mt4">${sub}</p></div>
      ${mode===k?'<span class="pill p-mint">Selected</span>':''}</button>`;
    return `<div class="screen">${appbar('Security & unlock')}
      <div class="scroll">
        <div class="rows">
          <button class="lrow" data-act="face"><div class="tile t-gold">${icon('face',18)}</div>
            <div class="grow"><p class="t2">Face ID</p><p class="b2 mt4">${me.faceEnrolled?'Enrolled':'Not set up'}</p></div>
            <span class="pill ${me.faceEnrolled?'p-mint':'p-grey'}">${me.faceEnrolled?'On':'Off'}</span></button>
          <div class="lrow" style="opacity:.5"><div class="tile t-blush">${icon('shield',18)}</div>
            <p class="t2 grow">Fingerprint</p><span class="pill p-grey">Coming soon</span></div>
        </div>

        <p class="cap" style="padding:22px 4px 8px">How you approve payments at shops</p>
        <div class="rows">
          ${opt('face','Face ID only','Fastest. Nothing to type or remember.',!me.faceEnrolled)}
          ${opt('face+passcode','Face ID + passcode','Most secure. Both are needed for every payment.',!me.faceEnrolled)}
          ${opt('either','Face ID or passcode','Falls back to your passcode when the camera won’t cooperate.',!me.faceEnrolled)}
        </div>
        ${!me.faceEnrolled?`<p class="helper">Set up Face ID to unlock these options. For now you pay with your passcode.</p>`:''}

        <div class="card tint mt24 row gap12">
          <div class="tile t-gold" style="background:#fff">${icon('shield',18)}</div>
          <p class="b1" style="color:#7a6000">Poor light, a cracked lens or a dusty market stall can all defeat a camera.
            "Face ID or passcode" keeps you paying when that happens.</p>
        </div>
      </div></div>`;
  },
  mount(r){
    const me=S.me;
    $('[data-act="face"]',r).onclick=()=>{
      if(me.faceEnrolled) confirmSheet({title:'Turn off Face ID?',body:"You'll use your passcode at every shop instead.",
        ok:'Turn it off',cancel:'Keep it on',onOk(){ me.faceEnrolled=false; S.save(); toast('Face ID turned off'); rerender(); }});
      else go('face-enrol-settings');
    };
    $$('[data-mode]',r).forEach(b=>b.onclick=()=>{
      if(!me.faceEnrolled) return toast('Set up Face ID first');
      me.authMode=b.dataset.mode; S.save(); toast('Payment unlock updated'); rerender();
    });
  }
};

/* ============ DISTRESS UNLOCK ============ */
SCREENS['distress'] = {
  render(){
    const me=S.me, on=!!me.decoyPasscode;
    return `<div class="screen">${appbar('Distress unlock')}
      <div class="scroll">
        <div class="card" style="background:var(--navy);color:#fff">
          <div class="rule" style="width:32px;height:3px;border-radius:99px;background:var(--gold)"></div>
          <p class="t1 mt16" style="color:#fff">If you're ever forced to pay</p>
          <p class="b1 mt8" style="color:rgba(255,255,255,.68)">Set a second passcode — or a second face — that opens your
            account showing a smaller balance you choose. Everything looks and behaves normally. Your real money stays untouched.</p>
        </div>

        <p class="cap" style="padding:22px 4px 8px">Set up</p>
        <div class="rows">
          <button class="lrow" data-act="decoybal"><div class="tile t-gold">${icon('wallet',18)}</div>
            <div class="grow"><p class="t2">Balance to show</p>
              <p class="b2 mt4">${me.decoyBalance!=null?fmt(me.decoyBalance):'Not set'}</p></div>${icon('chev',18)}</button>
          <button class="lrow" data-act="decoypass"><div class="tile t-navy">${icon('lock',18)}</div>
            <div class="grow"><p class="t2">Distress passcode</p>
              <p class="b2 mt4">${me.decoyPasscode?'Set — different from your real one':'Not set'}</p></div>
            <span class="pill ${me.decoyPasscode?'p-mint':'p-grey'}">${me.decoyPasscode?'On':'Off'}</span></button>
          <button class="lrow" data-act="decoyface" ${!me.faceEnrolled?'style="opacity:.45"':''}>
            <div class="tile t-blush">${icon('face',18)}</div>
            <div class="grow"><p class="t2">Distress face</p>
              <p class="b2 mt4">${me.decoyFace?'Enrolled — a deliberate blink':'Not set'}</p></div>
            <span class="pill ${me.decoyFace?'p-mint':'p-grey'}">${me.decoyFace?'On':'Off'}</span></button>
        </div>

        ${on?`<div class="rows mt20">
          <button class="lrow" data-act="off"><div class="tile t-dang">${icon('x',18)}</div>
            <p class="t2 grow" style="color:var(--danger)">Turn off distress unlock</p></button>
        </div>`:''}

        <p class="cap" style="padding:22px 4px 8px">What happens</p>
        <div class="rows">
          <div class="lrow"><div class="tile t-gold" style="font-weight:700">1</div>
            <p class="t2 grow">Your balance shows the smaller figure everywhere</p></div>
          <div class="lrow"><div class="tile t-gold" style="font-weight:700">2</div>
            <p class="t2 grow">Payments complete normally — from the decoy balance only</p></div>
          <div class="lrow"><div class="tile t-gold" style="font-weight:700">3</div>
            <p class="t2 grow">CASAIPAY is alerted quietly. Nothing on screen changes</p></div>
        </div>

        <div class="card mt20" style="background:var(--warning-bg)">
          <p class="b1" style="color:var(--warning)"><b>Worth knowing.</b> A decoy balance only helps if it's believable.
            Set it close to what someone would expect you to carry — an empty account can make a situation worse, not better.
            Your safety comes before your money.</p>
        </div>
      </div></div>`;
  },
  mount(r){
    const me=S.me;
    $('[data-act="decoybal"]',r).onclick=()=>{
      sheet(`<p class="t1 ctr">Balance to show</p>
        <p class="b1 ctr mt8">Pick a figure that looks ordinary for you.</p>
        <div class="card mt20" style="box-shadow:none;background:var(--surface-sunk)">
          <div class="amount-wrap" style="padding-top:6px">
            <div class="amount-line"><span class="fig"><span class="naira">₦</span></span><span class="fig" data-fig>0</span></div></div>
        </div>
        <button class="btn btn-gold mt20" data-ok disabled>Save</button>
        ${keypadHTML()}`,
        { onMount(s){
            let raw=''; const fig=s.querySelector('[data-fig]'), ok=s.querySelector('[data-ok]');
            bindKeypad(s,k=>{
              if(k==='back') raw=raw.slice(0,-1);
              else if(k==='.'){ if(!raw.includes('.')) raw=(raw||'0')+'.'; }
              else raw = raw==='0'?k:raw+k;
              fig.textContent = raw===''?'0':Number(raw.split('.')[0]||0).toLocaleString('en-NG')+(raw.includes('.')?'.'+raw.split('.')[1]:'');
              ok.disabled = !(parseFloat(raw)>0);
            });
            ok.onclick=()=>{ me.decoyBalance=parseFloat(raw); S.save(); closeSheet(); toast('Decoy balance saved'); rerender(); };
        }});
    };
    $('[data-act="decoypass"]',r).onclick=()=>go('distress-passcode');
    $('[data-act="decoyface"]',r).onclick=()=>{
      if(!me.faceEnrolled) return toast('Set up Face ID first');
      go('distress-face');
    };
    const off=$('[data-act="off"]',r);
    if(off) off.onclick=()=>confirmSheet({title:'Turn off distress unlock?',
      body:'Your distress passcode and face will stop working.',ok:'Turn it off',
      onOk(){ me.decoyPasscode=null; me.decoyFace=false; me.duressActive=false; S.save(); toast('Distress unlock turned off'); rerender(); }});
  }
};

SCREENS['distress-passcode'] = {
  render(){ return `<div class="screen">${appbar('Distress passcode')}
    ${passcodePad({title:'Choose your distress passcode', sub:'It must be different from your real one.'})}</div>`; },
  mount(r){ bindPasscode(r,(code,fail)=>{
    if(code===S.me.passcode){ toast('That\'s your real passcode. Pick another.'); return fail(); }
    FLOW.decoy=code; go('distress-passcode2');
  }); }
};
SCREENS['distress-passcode2'] = {
  render(){ return `<div class="screen">${appbar('Distress passcode')}
    ${passcodePad({title:'Enter it again', sub:'Make sure you\'ll remember it under pressure.'})}</div>`; },
  mount(r){ bindPasscode(r,(code,fail)=>{
    if(code!==FLOW.decoy){ toast("Those didn't match. Try again."); return fail(); }
    S.me.decoyPasscode=code;
    if(S.me.decoyBalance==null) S.me.decoyBalance=Math.max(2000, Math.round(S.me.balance*0.06/500)*500);
    S.save(); toast('Distress passcode saved'); go('distress');
  }); }
};

SCREENS['distress-face'] = {
  render(){ return `<div class="screen">${appbar('Distress face')}
    <div class="scroll" style="display:flex;flex-direction:column;justify-content:center">
      ${faceHTML('Close your left eye, then capture')}
      <div class="card tint mt20 row gap12">
        <div class="tile t-gold" style="background:#fff">${icon('face',18)}</div>
        <p class="b1" style="color:#7a6000">Enrol a deliberate expression you'd never make by accident —
          one eye closed works well. CASAIPAY reads it as a distress signal, not a failed scan.</p>
      </div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="scan">Capture distress face</button></div></div>`; },
  async mount(r){
    await startCamera(r);
    $('[data-act="scan"]',r).onclick=e=>{ e.target.disabled=true;
      runScan(r,{steps:['Hold the expression','Saving your distress face…'],onDone(){
        stopCamera(r); S.me.decoyFace=true;
        if(S.me.decoyBalance==null) S.me.decoyBalance=Math.max(2000, Math.round(S.me.balance*0.06/500)*500);
        S.save(); toast('Distress face enrolled'); go('distress');
      }});
    };
  }
};

/* ============================================================
   Change photo — camera, upload, or an illustrated portrait
   ============================================================ */
function changePhotoSheet(subject, title){
  const seed = subject.username || subject.owner || subject.id || 'casaipay';
  sheet(`<p class="t1 ctr">${title||'Your photo'}</p>
    <div class="ctr mt20">${avatar(subject,'xl '+(subject.photo?'':'ring'))}</div>
    <div class="rows mt24">
      <button class="lrow" data-p="camera"><div class="tile t-gold">${icon('face',18)}</div>
        <div class="grow"><p class="t2">Take a photo</p><p class="b2 mt4">Uses your camera</p></div>${icon('chev',18)}</button>
      <button class="lrow" data-p="upload"><div class="tile t-navy">${icon('share',18)}</div>
        <div class="grow"><p class="t2">Choose from your phone</p><p class="b2 mt4">Cropped and saved on this device</p></div>${icon('chev',18)}</button>
      <button class="lrow" data-p="draw"><div class="tile t-mint">${icon('user',18)}</div>
        <div class="grow"><p class="t2">Pick an illustration</p><p class="b2 mt4">If you'd rather not show your face</p></div>${icon('chev',18)}</button>
    </div>
    <input type="file" accept="image/*" style="position:absolute;left:-9999px" data-file>
    <p class="b2 ctr mt16">Photos stay on this device. Nothing is uploaded.</p>
    <button class="btn btn-ghost mt8" data-close>Close</button>`,
  { onMount(s){
      const file = s.querySelector('[data-file]');
      s.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
        const p = b.dataset.p;
        if(p==='upload') return file.click();
        if(p==='camera'){ closeSheet(); setTimeout(()=>photoCameraSheet(subject),180); }
        if(p==='draw'){ closeSheet(); setTimeout(()=>portraitPickerSheet(subject, seed),180); }
      });
      file.onchange = () => fileToAvatar(file.files[0], uri=>{
        if(!uri) return toast("That file isn't an image");
        savePhoto(subject, uri, 'Photo updated');
      });
  }});
}

function photoCameraSheet(subject){
  sheet(`<p class="t1 ctr">Take a photo</p>
    <div class="mt20">${faceHTML('Look at the camera')}</div>
    <button class="btn btn-gold mt20" data-shot>Capture</button>
    <button class="btn btn-ghost" data-close>Cancel</button>`,
  { onMount(s){
      startCamera(s);
      s.querySelector('[data-shot]').onclick = () => {
        const uri = grabFrame(s);
        stopCamera(s);
        if(!uri) { closeSheet(); return toast('Camera unavailable — pick an illustration instead'); }
        savePhoto(subject, uri, 'Photo saved');
      };
      s.querySelector('[data-close]').addEventListener('click',()=>stopCamera(s));
  }});
}

function portraitPickerSheet(subject, seed){
  const opts = ['afro','braids','gele','locs','twists','bun','hijab','lowcut','fade','shortafro','afro','braids'];
  const uris = opts.map((st,i)=>portraitURI(seed + ':' + i, st));
  sheet(`<p class="t1 ctr">Pick an illustration</p>
    <p class="b1 ctr mt8">None of these are photographs of real people.</p>
    <div class="picker mt20">
      ${uris.map((u,i)=>`<button data-i="${i}"><img src="${u}" alt="Portrait ${i+1}"></button>`).join('')}
    </div>
    <button class="btn btn-ghost mt20" data-close>Cancel</button>`,
  { onMount(s){
      s.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>
        savePhoto(subject, uris[+b.dataset.i], 'Portrait updated'));
  }});
}

function savePhoto(subject, uri, msg){
  const before = subject.photo;
  subject.photo = uri;
  try{
    S.save();
    if(localStorage.getItem('casaipay_demo_v1') === null) throw new Error('not saved');
  }catch(e){
    subject.photo = before;
    closeAllSheets();
    return toast('No room left on this device for another photo');
  }
  closeAllSheets();
  toast(msg || 'Photo updated');
  rerender();
}

/* ============================================================
   Cash pickup — send money someone collects with their face,
   even if they have no account, no card and no phone of their own.
   ============================================================ */

/* Step 1 — whose phone number is it? */
SCREENS['pickup-phone'] = {
  render(){ return `<div class="screen">${appbar('Cash pickup')}
    <div class="scroll">
      <div class="strip s-mint">${icon('face',16)} They claim it with their face — no account needed</div>
      <h1 class="d2 mt20">Who is collecting?</h1>
      <p class="b1 mt8">Enter their phone number. We use it to find them, or to set them up the first time.</p>
      <div class="field mt20"><p class="cap">Their phone number</p>
        <div class="field-row">${dialPrefix()}
          <input class="val" inputmode="numeric" placeholder="815 551 2345" maxlength="12" data-phone></div></div>
      <p class="helper">They do not need a CASAIPAY account, a smartphone or a bank account.</p>
      ${(S.me.beneficiaries||[]).length?`
        <p class="cap mt24">People you've set up before</p>
        <div class="rows mt8">${S.me.beneficiaries.map(b=>`<button class="lrow" data-ben="${b.id}">
          ${avatar(b,'ring')}
          <div class="grow"><p class="t2">${b.name}</p><p class="b2">${b.relation?b.relation+' · ':''}0${b.phone.slice(1)}</p></div>
          ${icon('chev',18)}</button>`).join('')}</div>`:''}
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Continue</button></div></div>`; },
  mount(r){
    const inp=$('[data-phone]',r), b=$('[data-act="next"]',r);
    inp.oninput=()=>{
      let d=inp.value.replace(/\D/g,'').slice(0,10);
      inp.value=d.replace(/(\d{3})(\d{3})(\d{0,4})/,(m,a,bb,c)=>c?`${a} ${bb} ${c}`:`${a} ${bb}`);
      b.disabled = d.length!==10;
    };
    inp.onfocus=()=>inp.closest('.field').classList.add('focused');
    inp.onblur=()=>inp.closest('.field').classList.remove('focused');
    b.onclick=()=>{ FLOW={pickupPhone:'0'+inp.value.replace(/\D/g,'')}; go('pickup-select'); };
    $$('[data-ben]',r).forEach(x=>x.onclick=()=>{
      const ben=S.me.beneficiaries.find(y=>y.id===x.dataset.ben);
      FLOW={pickupPhone:ben.phone, ben}; go('pickup-amount');
    });
  }
};

/* Step 2 — pick a beneficiary, or enrol one */
SCREENS['pickup-select'] = {
  render(){
    const list=S.beneficiariesFor(FLOW.pickupPhone);
    const pretty='0'+String(FLOW.pickupPhone).replace(/\D/g,'').slice(1);
    return `<div class="screen">${appbar('Cash pickup')}
      <div class="scroll">
        <div class="card row gap12"><div class="tile t-navy">${icon('phone',18)}</div>
          <div class="grow"><p class="t2">${pretty}</p>
            <p class="b2 mt4">${list.length?list.length+' person'+(list.length>1?'s':'')+' registered on this number':'Nobody registered on this number yet'}</p></div></div>

        ${list.length?`
          <p class="cap mt24">Choose who is collecting</p>
          <div class="rows mt8">${list.map(b=>`<button class="lrow" data-ben="${b.id}">
            ${avatar(b,'ring')}
            <div class="grow"><p class="t2">${b.name}</p>
              <p class="b2 mt4">${b.relation?b.relation+' · ':''}Face enrolled</p></div>
            <span class="pill p-mint">${icon('face',13)} Ready</span></button>`).join('')}</div>
          <button class="btn btn-white mt16" data-act="new">${icon('plus',18)} Add someone else on this number</button>
        `:`
          <div class="card tint mt20">
            <div class="row gap12"><div class="tile t-gold" style="background:#fff">${icon('face',18)}</div>
              <div class="grow"><p class="t2">Set them up once</p>
                <p class="b2 mt4" style="color:#7a6000">Enrol their face now and they can collect cash from any CASAIPAY shop — this time and every time after.</p></div></div>
          </div>
          <div class="rows mt20">
            <div class="lrow"><div class="tile t-gold" style="font-weight:700">1</div>
              <p class="t2 grow">Enter their name</p></div>
            <div class="lrow"><div class="tile t-gold" style="font-weight:700">2</div>
              <p class="t2 grow">Capture their face, with them beside you</p></div>
            <div class="lrow"><div class="tile t-gold" style="font-weight:700">3</div>
              <p class="t2 grow">Send the money and share the code</p></div>
          </div>
        `}
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="new">
        ${list.length?'Enrol a new beneficiary':'Enrol their face'}</button></div></div>`;
  },
  mount(r){
    $$('[data-ben]',r).forEach(x=>x.onclick=()=>{
      FLOW.ben=S.me.beneficiaries.find(y=>y.id===x.dataset.ben); go('pickup-amount'); });
    $$('[data-act="new"]',r).forEach(b=>b.onclick=()=>go('pickup-enrol'));
  }
};

/* Step 3 — enrol the beneficiary */
SCREENS['pickup-enrol'] = {
  render(){ const pretty='0'+String(FLOW.pickupPhone).replace(/\D/g,'').slice(1);
    return `<div class="screen">${appbar('New beneficiary')}
    <div class="scroll">
      <h1 class="d2">Who are they?</h1>
      <p class="b1 mt8">The name on their ID, so a shop can check it against their face.</p>
      <div class="stack gap12 mt20">
        <div class="field"><p class="cap">Full name</p>
          <div class="field-row"><input class="val" data-name placeholder="Ngozi Okafor"></div></div>
        <div class="field"><p class="cap">Phone number</p>
          <div class="field-row"><span class="val ink3">${pretty}</span></div></div>
        <div class="field"><p class="cap">Relationship (optional)</p>
          <div class="field-row"><input class="val" data-rel placeholder="Mother, brother, supplier…"></div></div>
      </div>
      <p class="helper">Only you can send to this beneficiary. Their face is stored on this device for this prototype.</p>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Capture their face</button></div></div>`; },
  mount(r){
    const nm=$('[data-name]',r), rel=$('[data-rel]',r), b=$('[data-act="next"]',r);
    [nm,rel].forEach(i=>{ if(!i) return;
      i.onfocus=()=>i.closest('.field').classList.add('focused');
      i.onblur=()=>i.closest('.field').classList.remove('focused'); });
    nm.oninput=()=>{ b.disabled = nm.value.trim().split(/\s+/).length<2; };
    b.onclick=()=>{ FLOW.benName=nm.value.trim(); FLOW.benRel=(rel&&rel.value.trim())||''; go('pickup-face'); };
  }
};

SCREENS['pickup-face'] = {
  render(){ return `<div class="screen">${appbar('Enrol their face')}
    <div class="scroll" style="display:flex;flex-direction:column;justify-content:center">
      ${faceHTML('Point the camera at ' + (FLOW.benName||'them').split(' ')[0])}
      <div class="card tint mt20 row gap12">
        <div class="tile t-gold" style="background:#fff">${icon('shield',18)}</div>
        <p class="b1" style="color:#7a6000">They need to be beside you for this. Good light, phone at eye level.
          This face is what releases the cash — nobody else can collect it.</p>
      </div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="scan">Capture face</button></div></div>`; },
  async mount(r){
    await startCamera(r);
    $('[data-act="scan"]',r).onclick=e=>{
      e.target.disabled=true;
      runScan(r,{steps:['Hold still','Saving their face…'],onDone(){
        const shot=grabFrame(r); stopCamera(r);
        const ben=S.addBeneficiary(FLOW.benName, FLOW.pickupPhone,
          shot || portraitURI(FLOW.benName), FLOW.benRel);
        FLOW.ben=ben; toast(ben.name.split(' ')[0]+' is enrolled');
        go('pickup-amount');
      }});
    };
  }
};

/* Step 4 — amount */
SCREENS['pickup-amount'] = {
  render(){ const b=FLOW.ben;
    return `<div class="screen">${appbar('Cash pickup')}
      ${amountScreenHTML({
        header:`<div class="card row gap12">${avatar(b,'ring')}
          <div class="grow"><p class="t2">${b.name}</p>
            <p class="b2 mt4">${b.relation?b.relation+' · ':''}0${b.phone.slice(1)}</p></div>
          <span class="pill p-mint">${icon('face',13)} Face</span></div>`,
        remark:false, note:'No fee'})}</div>`; },
  mount(r){
    bindAmount(r,{max:S.viewBalance(), ctaLabel:v=>v?`Send ${fmt(v)}`:'Confirm',
      onNext(v){ FLOW.amount=v; go('pickup-otp'); }});
    r.addEventListener('click',e=>{ if(e.target.dataset.act==='topup') go('addmoney'); });
  }
};

/* Step 5 — optional one-time passcode for the beneficiary */
SCREENS['pickup-otp'] = {
  render(){ const b=FLOW.ben;
    return `<div class="screen">${appbar('Backup passcode')}
    <div class="scroll">
      <h1 class="d2">Give them a backup?</h1>
      <p class="b1 mt8">${b.name.split(' ')[0]} will normally collect with their face. A one-time passcode covers the day the camera won't cooperate.</p>
      <div class="card mt20">
        <p class="cap ctr">One-time passcode</p>
        <div class="dots mt16" data-dots>${'<i></i>'.repeat(4)}</div>
        <p class="b2 ctr mt12">Tell it to them yourself. It works once, then it's dead.</p>
      </div>
      <div class="card tint mt16 row gap12">
        <div class="tile t-gold" style="background:#fff">${icon('shield',18)}</div>
        <p class="b1" style="color:#7a6000">Anyone holding both the code and this passcode can collect the cash. Face alone is safer.</p>
      </div>
    </div>
    <div class="footer stack gap8">
      <button class="btn btn-gold" data-act="save" disabled>Set passcode &amp; send</button>
      <button class="btn btn-ghost" data-act="skip">Skip — face only</button>
    </div>
    ${keypadHTML({secure:true})}</div>`; },
  mount(r){
    let code='';
    const dots=$('[data-dots]',r), save=$('[data-act="save"]',r);
    const paint=()=>{ dots.querySelectorAll('i').forEach((d,i)=>d.classList.toggle('on', i<code.length));
      save.disabled = code.length!==4; };
    bindKeypad(r,k=>{
      if(k==='back'){ code=code.slice(0,-1); return paint(); }
      if(k==='.'||code.length>=4) return;
      code+=k; paint();
    });
    const finish = otp => authorise({onOk(){
      const c=S.createPickup(FLOW.ben, FLOW.amount, otp);
      FLOW.result={code:c, amount:FLOW.amount, ben:FLOW.ben, otp};
      go('pickup-done');
    }});
    save.onclick=()=>finish(code);
    $('[data-act="skip"]',r).onclick=()=>finish(null);
  }
};

/* Step 6 — the claim code */
SCREENS['pickup-done'] = {
  render(){ const f=FLOW.result;
    return `<div class="screen">
      <div class="scroll" style="display:flex;flex-direction:column;align-items:center;padding-top:20px">
        <div class="rmark ok" style="margin-bottom:18px">${icon('check',44,3)}</div>
        <p class="d1">${nairaFig(f.amount)}</p>
        <p class="t2 mt8">waiting for ${f.ben.name}</p>

        <div class="card tint mt24" style="width:100%">
          <p class="cap ctr">Claim code</p>
          <p class="d1 mono ctr mt8" style="letter-spacing:.18em">${f.code}</p>
          ${f.otp?`<div class="drows mt16"><div class="drow">
            <span class="k">Backup passcode</span><span class="v mono">${f.otp}</span></div></div>`:''}
        </div>

        <div class="card mt16" style="width:100%">
          <div class="row gap12">${avatar(f.ben,'ring')}
            <div class="grow"><p class="t2">${f.ben.name}</p>
              <p class="b2 mt4">0${f.ben.phone.slice(1)}</p></div></div>
          <div class="rows plain mt12">
            <div class="lrow" style="padding-left:0"><div class="tile t-gold" style="font-weight:700">1</div>
              <p class="t2 grow">Give them this code</p></div>
            <div class="lrow" style="padding-left:0"><div class="tile t-gold" style="font-weight:700">2</div>
              <p class="t2 grow">They walk into any CASAIPAY shop</p></div>
            <div class="lrow" style="padding-left:0"><div class="tile t-gold" style="font-weight:700">3</div>
              <p class="t2 grow">Their face releases the cash</p></div>
          </div>
        </div>
        <p class="b2 ctr mt16">You'll be notified the moment it's collected.</p>
      </div>
      <div class="footer stack gap8">
        <button class="btn btn-gold" data-act="share">${icon('share',18)} Share the code</button>
        <button class="btn btn-ghost" data-act="done">Done</button>
      </div></div>`; },
  mount(r){
    const f=FLOW.result;
    $('[data-act="done"]',r).onclick=()=>go('home');
    $('[data-act="share"]',r).onclick=()=>{
      const msg=`CASAIPAY: ${fmt(f.amount)} is waiting for you. Claim code ${f.code}`
        + (f.otp?` · backup passcode ${f.otp}`:'')
        + `. Show it at any CASAIPAY shop and look at the camera.`;
      if(navigator.share) navigator.share({title:'CASAIPAY cash pickup',text:msg}).catch(()=>{});
      else { navigator.clipboard?.writeText(msg); toast('Message copied'); }
    };
  }
};

/* Manage beneficiaries from Profile */
SCREENS['beneficiaries'] = {
  render(){
    const list=S.me.beneficiaries||[];
    return `<div class="screen">${appbar('Beneficiaries')}
      <div class="scroll">
        <p class="b1">People you've enrolled to collect cash on your behalf.</p>
        ${list.length?`<div class="rows mt16">${list.map(b=>`<div class="lrow">
          ${avatar(b,'ring')}
          <div class="grow"><p class="t2">${b.name}</p>
            <p class="b2 mt4">${b.relation?b.relation+' · ':''}0${b.phone.slice(1)}</p></div>
          <button class="pill p-dang" data-del="${b.id}">Remove</button></div>`).join('')}</div>`
        :`<div class="card ctr mt16" style="padding:32px">
            <div class="tile t-gold" style="width:52px;height:52px;border-radius:18px;margin:0 auto">${icon('face',24)}</div>
            <p class="t2 mt16">Nobody enrolled yet</p>
            <p class="b1 mt8">Enrol someone's face and you can send them cash they collect at any shop.</p></div>`}
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="add">${icon('plus',18)} Send a cash pickup</button></div></div>`;
  },
  mount(r){
    $('[data-act="add"]',r).onclick=()=>go('pickup-phone');
    $$('[data-del]',r).forEach(b=>b.onclick=()=>confirmSheet({
      title:'Remove this beneficiary?',
      body:'Their enrolled face will be deleted. Any cash already waiting stays claimable.',
      ok:'Remove', cancel:'Keep',
      onOk(){ S.me.beneficiaries=S.me.beneficiaries.filter(x=>x.id!==b.dataset.del);
        S.save(); toast('Beneficiary removed'); rerender(); }}));
  }
};
