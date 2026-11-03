/* ============================================================
   CASAIPAY — User app screens
   ============================================================ */
var FLOW = {};
var SCREENS = {};

const nairaFig = n => `<span class="naira">₦</span>${Number(n).toLocaleString('en-NG',{minimumFractionDigits:2,maximumFractionDigits:2})}`;

/* ============ ONBOARDING ============ */
SCREENS['onboarding'] = {
  render(){
    return `<div class="ob">
      <div class="row between" style="padding:16px 24px 0">
        <div class="row gap8">
          <div style="width:26px;height:26px;border-radius:8px;background:var(--gold);display:grid;place-items:center">
            ${icon('scan',15,2.2)}</div>
          <span class="t1" style="font-size:18px">CASAIPAY</span>
        </div>
        <button class="btn-ghost" data-act="skip" style="height:auto">Skip</button>
      </div>
      <div class="ob-stage">
        <!-- 1 -->
        <div class="ob-slide on" data-slide="0">
          <div class="ob-art">
            <div class="cardstack" data-stack>
              <div class="cs cs1"><p class="cap" style="color:rgba(254,246,214,.6)">Your balance</p>
                <p class="t1 mt4" style="color:#fff;font-size:22px">₦47,500.00</p>
                <p class="b2 mt8" style="color:rgba(255,255,255,.5)">@chidi</p></div>
              <div class="cs cs2"><p class="cap" style="color:var(--mint-ink)">Verified</p>
                <p class="t2 mt4" style="color:var(--mint-ink)">Chidi Okafor</p>
                <div class="row gap6 mt8" style="color:var(--mint-ink)">${icon('check',14,3)}<span class="b2" style="color:var(--mint-ink)">Face ID active</span></div></div>
              <div class="cs cs3"><p class="cap">Paid to</p><p class="t2 mt4">Mama Ngozi Stores</p>
                <p class="t1 mt8" style="font-size:20px">₦3,500.00</p></div>
            </div>
          </div>
          <h1 class="hero">Your face<br>is your<br><span class="navy">account.</span></h1>
          <p class="b1 mt16">Send, receive and collect cash anywhere in Nigeria. No card. No bank account needed.</p>
        </div>
        <!-- 2 -->
        <div class="ob-slide" data-slide="1">
          <div class="ob-art" data-face2>${faceHTML('Tap below to try it')}</div>
          <h1 class="d2">Pay with your face</h1>
          <p class="b1 mt8">At any shop, just look at the camera. That's the whole payment — no card, no PIN, no cash.</p>
          <button class="btn btn-white mt16" data-act="try-face">${icon('face',18)} Try it</button>
        </div>
        <!-- 3 -->
        <div class="ob-slide" data-slide="2">
          <div class="ob-art">
            <div style="width:100%">
              <div class="support-card">
                <div class="row gap12">
                  <div class="avatar online">NG</div>
                  <div class="grow"><p class="t2">CASAIPAY Support</p>
                    <p class="b2 clock24">${icon('clock',13)} Online now · replies in under a minute</p></div>
                  <span class="pill p-mint">24/7</span>
                </div>
                <div class="chat mt16" data-chat></div>
              </div>
            </div>
          </div>
          <h1 class="d2">Real help, any hour</h1>
          <p class="b1 mt8">A payment stuck at 2am? A real person answers — every day, all day, in English, Hausa, Igbo or Yorùbá.</p>
          <button class="btn btn-white mt16" data-act="ask">${icon('help',18)} Ask something</button>
        </div>
        <!-- 4 -->
        <div class="ob-slide" data-slide="3">
          <div class="ob-art">
            <div style="width:100%">
              <div class="seg-toggle"><button class="on" data-seg="cp">CASAIPAY</button><button data-seg="bank">Any bank</button></div>
              <div class="card mt16" data-seg-card style="min-height:150px"></div>
            </div>
          </div>
          <h1 class="d2">Send anywhere</h1>
          <p class="b1 mt8">Free to any CASAIPAY ID. Seconds to any Nigerian bank account.</p>
        </div>
      </div>
      <div style="padding:20px 24px calc(20px + env(safe-area-inset-bottom))">
        <div class="progress">${[0,1,2,3].map(i=>`<i class="${i===0?'on':''}" data-dot="${i}"></i>`).join('')}</div>
        <button class="btn btn-gold" data-act="next">Get started</button>
        <button class="btn btn-ghost mt8" data-act="signin">I already have an account</button>
      </div>
    </div>`;
  },
  mount(root){
    let i = 0;
    const slides = $$('.ob-slide', root), dots = $$('[data-dot]', root), cta = $('[data-act="next"]', root);
    const paint = () => {
      slides.forEach((s,n)=>s.classList.toggle('on', n===i));
      dots.forEach((d,n)=>d.classList.toggle('on', n<=i));
      cta.textContent = i===3 ? 'Create my account' : 'Get started';
      document.body.classList.toggle('warm', i>0);
    };
    cta.onclick = () => { if(i<3){ i++; paint(); } else go('phone'); };
    dots.forEach((d,n)=>d.onclick=()=>{ i=n; paint(); });
    $('[data-act="skip"]',root).onclick = () => go('welcome');
    $('[data-act="signin"]',root).onclick = () => go('login');

    // swipe
    let x0=null;
    $('.ob-stage',root).addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
    $('.ob-stage',root).addEventListener('touchend',e=>{
      if(x0===null) return; const dx=e.changedTouches[0].clientX-x0; x0=null;
      if(dx<-50 && i<3){ i++; paint(); } if(dx>50 && i>0){ i--; paint(); }
    });

    // slide 1: draggable stack
    const stack = $('[data-stack]',root);
    if(stack){
      let dragging=false;
      const spread=(on)=>{
        const cs=$$('.cs',stack);
        cs[0].style.transform = on?'rotate(-14deg) translate(-26px,10px)':'rotate(-6deg)';
        cs[1].style.transform = on?'rotate(-2deg) translate(0,-16px)':'rotate(-1deg)';
        cs[2].style.transform = on?'rotate(12deg) translate(28px,14px)':'rotate(4deg)';
      };
      const on=()=>{dragging=true;spread(true)}, off=()=>{dragging=false;spread(false)};
      const ac=new AbortController(), sig={signal:ac.signal};
      root._cleanup=()=>ac.abort();
      stack.addEventListener('pointerdown',on,sig); window.addEventListener('pointerup',off,sig);
      stack.addEventListener('touchstart',on,{passive:true,signal:ac.signal}); window.addEventListener('touchend',off,sig);
    }

    // slide 2: face demo
    const f2 = $('[data-face2]',root);
    $('[data-act="try-face"]',root).onclick = async () => {
      await startCamera(f2);
      runScan(f2,{onDone(){ setTimeout(()=>{ i=2; paint(); stopCamera(f2); },700); }});
    };

    // slide 3: live support conversation, replayed on a loop
    const chat = $('[data-chat]',root);
    let chatTimers = [];
    const clearChat = () => { chatTimers.forEach(clearTimeout); chatTimers = []; };
    const at = (ms, fn) => chatTimers.push(setTimeout(fn, ms));
    const bubble = (side, text) => {
      const el = document.createElement('div');
      el.className = 'bub ' + side; el.textContent = text;
      chat.appendChild(el);
      while(chat.children.length > 5) chat.firstElementChild.remove();
    };
    const typing = () => {
      const el = document.createElement('div');
      el.className = 'typing'; el.innerHTML = '<i></i><i></i><i></i>';
      chat.appendChild(el); return el;
    };
    const reply = (delay, text, after) => {
      at(delay, ()=>{ const t = typing();
        at(1100, ()=>{ t.remove(); bubble('them', text); after && at(600, after); });
      });
    };
    function playThread(){
      clearChat(); chat.innerHTML = '';
      at(200,  ()=>bubble('them', 'Good evening. How can I help?'));
      at(1400, ()=>bubble('me',   "I sent ₦8,000 and it hasn't arrived"));
      reply(2100, 'Found it. Releasing it now — give it two minutes.');
      at(6200, ()=>bubble('me',   'Thank you'));
      reply(6900, 'Anytime. We are here all night.');
      at(12000, playThread);
    }
    const askBtn = $('[data-act="ask"]',root);
    if(askBtn) askBtn.onclick = () => {
      clearChat();
      const qs = [
        ['Is my money safe if I lose my phone?', 'Yes. Nobody can pay without your face or your passcode.'],
        ['Can I use this without internet?',     'Yes — at any CASAIPAY agent. Your face is the receipt.'],
        ['How do I raise my limit?',             'Add Face ID and you move to Tier 2 straight away.']
      ];
      const [q,a] = qs[Math.floor(Math.random()*qs.length)];
      bubble('me', q);
      reply(400, a, ()=>at(6000, playThread));
    };
    playThread();
    const prevCleanup = root._cleanup;
    root._cleanup = () => { clearChat(); prevCleanup && prevCleanup(); };

    // slide 4: toggle
    const segCard = $('[data-seg-card]',root);
    const paintSeg = (mode) => {
      segCard.innerHTML = mode==='cp'
        ? `<p class="cap">Send to</p>
           <div class="field-row mt8"><span class="prefix">@</span><span class="val">chidi</span></div>
           <div class="strip s-mint mt16">${icon('check',15,3)} Chidi Okafor · verified</div>
           <p class="b2 mt12">Free · lands instantly</p>`
        : `<p class="cap">Account number</p>
           <p class="val mono mt8">0123456789</p>
           <div class="strip s-mint mt16">${icon('check',15,3)} ADAEZE NKEM OKONKWO · GTBank</div>
           <p class="b2 mt12">Free transfers today: 3</p>`;
    };
    paintSeg('cp');
    $$('[data-seg]',root).forEach(b=>b.onclick=()=>{
      $$('[data-seg]',root).forEach(x=>x.classList.remove('on')); b.classList.add('on'); paintSeg(b.dataset.seg);
    });
    paint();
  }
};

/* ============ WELCOME / SIGN IN ============ */
SCREENS['welcome'] = {
  render(){ return `<div class="screen">
    <div class="scroll" style="display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:0">
      <div class="ob-art" style="min-height:280px"><div class="cardstack">
        <div class="cs cs1"><p class="cap" style="color:rgba(254,246,214,.6)">Your balance</p>
          <p class="t1 mt4" style="color:#fff;font-size:22px">₦47,500.00</p></div>
        <div class="cs cs2"><p class="cap" style="color:var(--mint-ink)">Verified</p><p class="t2 mt4" style="color:var(--mint-ink)">Chidi Okafor</p></div>
        <div class="cs cs3"><p class="cap">Paid</p><p class="t1 mt4" style="font-size:20px">₦3,500.00</p></div>
      </div></div>
      <h1 class="hero mt24">Your face<br>is your<br><span class="navy">account.</span></h1>
      <p class="b1 mt16">Send, receive and collect cash anywhere in Nigeria.</p>
    </div>
    <div class="footer stack gap8">
      <button class="btn btn-gold" data-act="create">Create account</button>
      <button class="btn btn-ghost" data-act="signin">I already have an account</button>
    </div></div>`; },
  mount(r){ $('[data-act="create"]',r).onclick=()=>go('phone'); $('[data-act="signin"]',r).onclick=()=>go('login'); }
};

/* ============ PHONE ============ */
SCREENS['phone'] = {
  render(){ return `<div class="screen">
    ${appbar('')}
    <div class="scroll">
      <h1 class="d2">What's your number?</h1>
      <p class="b1 mt8">We'll text you a code to confirm it's you.</p>
      <div class="field mt24" data-f>
        <p class="cap">Phone number</p>
        <div class="field-row">${dialPrefix()}
          <input class="val" inputmode="numeric" placeholder="801 234 5678" maxlength="12" data-phone></div>
      </div>
      <p class="helper" data-help>Nigerian mobile numbers only.</p>
      <p class="b2 mt24" style="line-height:1.5">By continuing you agree to CASAIPAY's Terms of Service and Privacy Policy.</p>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Send code</button></div></div>`; },
  mount(r){
    const inp=$('[data-phone]',r), f=$('[data-f]',r), b=$('[data-act="next"]',r);
    inp.onfocus=()=>f.classList.add('focused'); inp.onblur=()=>f.classList.remove('focused');
    inp.oninput=()=>{
      let d=inp.value.replace(/\D/g,'').slice(0,10);
      inp.value=d.replace(/(\d{3})(\d{3})(\d{0,4})/,(m,a,bb,c)=>c?`${a} ${bb} ${c}`:`${a} ${bb}`);
      b.disabled = d.length!==10;
    };
    b.onclick=()=>{ FLOW.phone='+234 '+inp.value; go('otp'); };
    setTimeout(()=>inp.focus(),300);
  }
};

/* ============ OTP ============ */
SCREENS['otp'] = {
  render(){ return `<div class="screen">
    ${appbar('')}
    <div class="scroll">
      <h1 class="d2">Enter the 6-digit code</h1>
      <p class="b1 mt8">Sent to ${FLOW.phone||'your phone'} · <b data-act="back" style="color:var(--navy)">Change</b></p>
      <div class="otp mt24" data-otp>${'<b></b>'.repeat(6)}</div>
      <input style="position:absolute;opacity:0;pointer-events:none" inputmode="numeric" maxlength="6" data-hidden>
      <p class="helper ctr">Prototype — enter any 6 digits</p>
      <p class="b2 ctr mt24" data-resend>Resend code in 0:59</p>
    </div>
    ${keypadHTML()}</div>`; },
  mount(r){
    let code=''; const boxes=$$('[data-otp] b',r);
    const paint=()=>boxes.forEach((b,i)=>{ b.textContent=code[i]||''; b.classList.toggle('on', i===code.length); });
    paint();
    bindKeypad(r,k=>{
      if(k==='back'){ code=code.slice(0,-1); paint(); return; }
      if(k==='.'||code.length>=6) return;
      code+=k; paint();
      if(code.length===6){
        boxes.forEach(b=>b.classList.remove('on'));
        setTimeout(()=>go('details'), 700);
      }
    });
    let s=59; const rs=$('[data-resend]',r);
    const t=setInterval(()=>{ s--; if(s<=0){ clearInterval(t); rs.innerHTML='<b style="color:var(--navy)">Resend code</b>'; }
      else rs.textContent=`Resend code in 0:${String(s).padStart(2,'0')}`; },1000);
  }
};

/* ============ DETAILS + NIN ============ */
SCREENS['details'] = {
  render(){ return `<div class="screen">
    ${appbar('')}
    <div class="scroll">
      <h1 class="d2">Tell us who you are</h1>
      <p class="b1 mt8">This has to match your National Identity record.</p>
      <div class="stack gap12 mt24">
        <div class="field"><p class="cap">First name</p><div class="field-row"><input class="val" data-first placeholder="Chidi"></div></div>
        <div class="field"><p class="cap">Last name</p><div class="field-row"><input class="val" data-last placeholder="Okafor"></div></div>
        <div class="field"><p class="cap">NIN</p><div class="field-row"><input class="val mono" inputmode="numeric" maxlength="11" data-nin placeholder="12345678901"></div></div>
      </div>
      <p class="helper">Your National Identity Number. We use it to verify you — nobody else sees it.</p>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Verify me</button></div></div>`; },
  mount(r){
    const first=$('[data-first]',r), last=$('[data-last]',r), nin=$('[data-nin]',r), b=$('[data-act="next"]',r);
    const check=()=>{ b.disabled = !(first.value.trim() && last.value.trim() && nin.value.replace(/\D/g,'').length===11); };
    [first,last,nin].forEach(i=>{ i.oninput=()=>{ if(i===nin) nin.value=nin.value.replace(/\D/g,''); check(); };
      i.onfocus=()=>i.closest('.field').classList.add('focused'); i.onblur=()=>i.closest('.field').classList.remove('focused'); });
    b.onclick=()=>{
      FLOW.first=first.value.trim(); FLOW.last=last.value.trim(); FLOW.nin=nin.value;
      b.innerHTML='Checking NIN…'; b.disabled=true;
      setTimeout(()=>{ b.innerHTML='Matching your record…'; }, 800);
      setTimeout(()=>{
        sheet(`<div class="ctr stack gap8" style="padding:6px 4px 0">
            <div class="rmark ok" style="margin:0 auto 18px">${icon('check',40,3)}</div>
            <p class="b1">We found you</p>
            <p class="d2">${FLOW.first} ${FLOW.last}</p>
            <span class="pill p-mint" style="margin:10px auto 0">${icon('shield',14)} NIN verified</span>
          </div>
          <button class="btn btn-gold mt24" data-ok>That's me</button>
          <button class="btn btn-ghost" data-close>That's not me</button>`,
          { dismissible:false, onMount(s){ s.querySelector('[data-ok]').onclick=()=>{ closeSheet(); go('username'); }; } });
      }, 1800);
    };
  }
};

/* ============ USERNAME ============ */
SCREENS['username'] = {
  render(){ return `<div class="screen">
    ${appbar('')}
    <div class="scroll">
      <h1 class="d2">Pick your CASAIPAY ID</h1>
      <p class="b1 mt8">This is what you give a shop when you want to pay. Choose something easy to say out loud.</p>
      <div class="field mt24"><p class="cap">CASAIPAY ID</p>
        <div class="field-row"><span class="prefix">@</span><input class="val" data-u placeholder="chidi" maxlength="16" autocapitalize="off"></div></div>
      <p class="helper" data-help>Letters and numbers only.</p>
      <div class="card tint mt20 row gap12">
        <div class="tile t-gold" style="background:#fff">${icon('store',18)}</div>
        <p class="b1" style="color:#7a6000"><i>"What's your CASAIPAY ID?"</i><br><b style="color:var(--ink)">"It's @<span data-echo>chidi</span>."</b></p>
      </div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Continue</button></div></div>`; },
  mount(r){
    const inp=$('[data-u]',r), help=$('[data-help]',r), b=$('[data-act="next"]',r), echo=$('[data-echo]',r);
    let t;
    inp.onfocus=()=>inp.closest('.field').classList.add('focused'); inp.onblur=()=>inp.closest('.field').classList.remove('focused');
    inp.oninput=()=>{
      inp.value=inp.value.toLowerCase().replace(/[^a-z0-9]/g,'');
      echo.textContent = inp.value || 'chidi';
      clearTimeout(t); b.disabled=true; help.className='helper'; help.textContent='Checking…';
      if(inp.value.length<3){ help.textContent='At least 3 characters.'; return; }
      t=setTimeout(()=>{
        if(S.state.users[inp.value]){ help.className='helper err'; help.textContent=`@${inp.value} is taken. Try @${inp.value}1 or @${inp.value}ng.`; }
        else { help.className='helper'; help.innerHTML=`<b style="color:var(--success)">@${inp.value} is available</b>`; b.disabled=false; }
      },420);
    };
    b.onclick=()=>{ FLOW.username=inp.value; go('passcode'); };
  }
};

/* ============ PASSCODE ============ */
SCREENS['passcode'] = {
  render(){ return `<div class="screen">${appbar('')}
    ${passcodePad({title:'Create a 4-digit passcode', sub:"You'll use this to pay when Face ID isn't available."})}</div>`; },
  mount(r){ bindPasscode(r,(code)=>{ FLOW.passcode=code; go('passcode2'); }); }
};
SCREENS['passcode2'] = {
  render(){ return `<div class="screen">${appbar('')}
    ${passcodePad({title:'Enter it again', sub:'Just to be sure.'})}</div>`; },
  mount(r){ bindPasscode(r,(code,fail)=>{
    if(code!==FLOW.passcode){ toast("Those didn't match. Try again."); fail(); return; }
    go('face-intro');
  }); }
};

/* ============ FACE INTRO ============ */
SCREENS['face-intro'] = {
  render(){ return `<div class="screen">${appbar('')}
    <div class="scroll">
      <h1 class="d2">Set up Face ID</h1>
      <p class="b1 mt8">Your face becomes your signature. Pay at any shop without a card, cash or PIN.</p>
      <div class="rows mt24">
        <div class="lrow"><div class="tile t-gold">${icon('store',18)}</div><p class="t2 grow">Pay at any CASAIPAY shop</p></div>
        <div class="lrow"><div class="tile t-mint">${icon('cash',18)}</div><p class="t2 grow">Collect cash from an agent</p></div>
        <div class="lrow"><div class="tile t-navy">${icon('shield',18)}</div><p class="t2 grow">Nobody can spend your money but you</p></div>
      </div>
    </div>
    <div class="footer stack gap8">
      <button class="btn btn-gold" data-act="setup">Set up Face ID</button>
      <button class="btn btn-ghost" data-act="skip">Skip for now</button>
    </div></div>`; },
  mount(r){
    $('[data-act="setup"]',r).onclick=()=>go('face-enrol');
    $('[data-act="skip"]',r).onclick=()=>confirmSheet({
      title:'Skip Face ID?',
      body:"You can still pay with your passcode, and add Face ID later in Settings. But you won't be able to pay at shops that only accept face verification.",
      cancel:'Skip anyway', ok:'Set it up now',
      onOk:()=>go('face-enrol'),
      onCancel:()=>{ FLOW.face=false; finishSignup(); }
    });
  }
};

SCREENS['face-enrol'] = {
  render(){ return `<div class="screen">${appbar('')}
    <div class="scroll" style="display:flex;flex-direction:column;justify-content:center;gap:8px">
      ${faceHTML('Position your face in the circle')}
      <p class="b1 ctr mt16">Hold your phone at eye level in good light.</p>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="scan">Capture my face</button></div></div>`; },
  async mount(r){
    await startCamera(r);
    $('[data-act="scan"]',r).onclick=(e)=>{
      e.target.disabled=true;
      const shot = () => { FLOW.photo = grabFrame(r); };
      runScan(r,{steps:['Hold still','Saving your face…'],onDone(){ shot(); stopCamera(r); FLOW.face=true; finishSignup(); }});
    };
  }
};

function finishSignup(){
  const st = S.state;
  const uname = FLOW.username || 'newuser';
  st.users[uname] = { username:uname, name:`${FLOW.first} ${FLOW.last}`, first:FLOW.first,
    phone:(FLOW.phone||'').replace(/\D/g,'').slice(-10), nin:FLOW.nin, balance:0,
    faceEnrolled:!!FLOW.face, passcode:FLOW.passcode||'1234', tier:1, initials:(FLOW.first[0]+FLOW.last[0]).toUpperCase(),
    photo: FLOW.photo || portraitURI(uname),
    authMode:'either', decoyBalance:null, decoyPasscode:null, decoyFace:false, duressActive:false,
    virtualAcct:'90147'+Math.floor(10000+Math.random()*89999), virtualBank:'CASAIPAY (Wema)', txns:[], notifs:[] };
  st.session.user = uname; st.session.signedIn = true; st.session.seenOnboarding = true;
  S.save(); go('signup-done');
}

SCREENS['signup-done'] = {
  render(){ const me=S.me; return `<div class="screen">
    <div class="result">
      <div class="rmark ok">${icon('check',44,3)}</div>
      <p class="d2">Welcome, ${me.first}</p>
      <div class="pill p-gold mt12" style="height:34px;font-size:14px">@${me.username}</div>
      <p class="b1 mt12">Your CASAIPAY ID is ready. Add money to get started.</p>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="home">Go to my money</button></div></div>`; },
  mount(r){ $('[data-act="home"]',r).onclick=()=>go('home'); }
};

/* ============ LOGIN ============ */
SCREENS['login'] = {
  render(){ const me=S.me; return `<div class="screen">${appbar('')}
    <div class="stack ctr gap8" style="padding:12px 24px 0">
      ${avatar(me,'lg ring')}
      <p class="t1 mt12">Welcome back, ${me.first}</p>
      <p class="b1">Enter your passcode to continue</p>
    </div>
    <div class="dots mt24" data-dots>${'<i></i>'.repeat(4)}</div>
    ${me.faceEnrolled?`<button class="btn btn-ghost mt8" data-act="face">Use Face ID instead</button>`:''}
    <p class="helper ctr">Prototype passcode: 1234</p>
    <div class="grow"></div>${keypadHTML({secure:true})}</div>`; },
  mount(r){
    bindPasscode(r,(code,fail)=>{
      if(code===S.me.passcode){ S.state.session.signedIn=true; S.save(); go('home'); }
      else { toast('Wrong passcode. Try again.'); fail(); }
    });
    const fb=$('[data-act="face"]',r);
    if(fb) fb.onclick=()=>authorise({title:'Sign in with Face ID', amountLabel:'', onOk(){ S.state.session.signedIn=true; S.save(); go('home'); }});
  }
};

/* ============ HOME ============ */
function navBar(active){
  const it=(id,ic,label)=>`<button class="${active===id?'on':''}" data-nav="${id}">${icon(ic,22)}<span>${label}</span></button>`;
  return `<nav class="nav">
    ${it('home','home','Home')}
    ${it('txns','grid','Money')}
    <button class="center" data-nav="request" aria-label="Request money">
      <div class="glow"></div><div class="circ">${icon('qr',26,2)}</div></button>
    ${it('activity','zap','Activity')}
    ${it('profile','user','Profile')}
  </nav>`;
}

SCREENS['home'] = {
  render(){
    const me=S.me, hide=S.state.session.hideBalance;
    const shown = S.viewBalance(me);
    const reqs=S.incomingRequests();
    const claim=S.state.claims.find(c=>c.status==='pending');
    const unread=me.notifs.filter(n=>n.unread).length;
    const B=S.state.billers;
    const quick=[['airtime','Airtime'],['data','Data'],['power','Electricity'],['flights','Flights']];
    return `<div class="screen">
      <div class="appbar" style="height:64px">
        <button class="row gap12 grow" data-nav="profile" style="text-align:left">
          ${avatar(me, me.faceEnrolled?'ring':'')}
          <div><p class="b2">Welcome back,</p><p class="t2">${me.name}</p></div>
        </button>
        <button class="iconbtn r bell" data-act="notifs">${icon('bell',22)}${unread?'<i class="dot"></i>':''}</button>
      </div>

      <div class="scroll" style="padding-bottom:20px">
        <p class="d2">Account</p>
        <div class="acct-carousel mt16">
          <div class="balance-card">
            <div class="between"><div class="rule"></div>
              <button class="eye" data-act="eye">${icon(hide?'eyeoff':'eye',17)}</button></div>
            <p class="cap mt16">Your balance</p>
            <p class="amt mt4" data-bal>${hide?'₦ •••••••':nairaFig(shown)}</p>
            <div class="grow"></div>
            <div class="between mt16">
              <button class="row gap6" data-act="copyid" style="color:rgba(255,255,255,.75);font-size:13px;font-weight:600">
                @${me.username} ${icon('copy',14)}</button>
              <span class="tierpill">TIER ${me.tier}</span>
            </div>
          </div>
          ${claim?`<div class="claim-card">
            <div class="between">
              ${claim.beneficiary?avatar(claim.beneficiary,'ring'):`<div class="tile t-gold">${icon('cash',18)}</div>`}
              <span class="pill p-warn">Waiting</span></div>
            <div><p class="cap">${claim.kind==='beneficiary'?'Cash pickup for':'Cash to claim'}</p>
            <p class="t1 mt4">${claim.beneficiary?claim.beneficiary.name.split(' ')[0]+' · '+fmt(claim.amount):fmt(claim.amount)}</p>
            <p class="b2 mt8">code <b class="mono">${claim.code}</b></p></div>
          </div>`:`<div class="claim-card">
            <div class="tile t-mint">${icon('store',18)}</div>
            <div><p class="t2">Become an agent</p><p class="b2 mt4">Earn on every cash-out in your area.</p></div>
          </div>`}
        </div>
        <div class="cardots" data-cardots><i class="on"></i><i></i></div>

        <div class="row gap10 mt20">
          <button class="pill-btn" data-nav="request">${icon('down',17)} Request</button>
          <button class="pill-btn" data-act="send">${icon('up',17)} Send</button>
          <div class="grow"></div>
          <button class="fab-add" data-act="addmoney" aria-label="Add money">${icon('plus',22,2.4)}</button>
        </div>

        <div class="between mt24"><p class="t1">Pay a bill</p>
          <button class="b2" data-act="bills" style="color:var(--navy);font-weight:600">See all</button></div>
        <div class="qgrid mt12">
          ${quick.map(([k,label])=>{
            const b = k==='flights' ? {icon:'zap',tint:'t-navy'} : B[k];
            return `<button class="qtile" data-bill="${k}">
              <div class="tile ${b.tint}">${icon(b.icon,19)}</div><span>${label}</span></button>`;
          }).join('')}
        </div>

        ${!me.faceEnrolled?`<button class="card tint mt16 row gap12" style="width:100%;text-align:left" data-act="enrol">
          <div class="tile t-gold" style="background:#fff">${icon('face',18)}</div>
          <p class="t2 grow" style="color:#7a6000">Add Face ID to pay at shops</p>${icon('chev',18)}</button>`:''}

        ${reqs.map(q=>{ const f=S.user(q.from); return `<div class="card tint mt16">
          <div class="row gap12">${avatar(f,'sm')}
            <div class="grow"><p class="t2">${f.name} is asking for ${fmt(q.amount)}</p>
            <p class="b2">${q.note||'No note'}</p></div></div>
          <div class="btn-row mt16">
            <button class="btn btn-white" data-decline="${q.id}">Decline</button>
            <button class="btn btn-gold" style="height:52px" data-pay="${q.id}">Pay</button></div></div>`; }).join('')}

        <div class="card pad0 mt24" style="box-shadow:var(--sh-card)">
          <div style="padding:16px 18px 4px">
            <div class="between"><p class="t1">Transactions</p>
              <button class="b2" data-nav="txns" style="color:var(--navy);font-weight:600">View all</button></div>
          </div>
          <div style="padding:2px 2px 8px">
            ${me.txns.length? me.txns.slice(0,6).map(txnRow).join('')
              : `<p class="b1 ctr" style="padding:26px">No money has moved yet.<br>Tap + to add money.</p>`}
          </div>
        </div>
      </div>
      ${navBar('home')}</div>`;
  },
  mount(r){
    const car=$('.acct-carousel',r), cdots=$$('[data-cardots] i',r);
    if(car) car.onscroll=()=>{
      const i = Math.round(car.scrollLeft / Math.max(1,car.clientWidth));
      cdots.forEach((d,n)=>d.classList.toggle('on', n===i));
    };
    $('[data-act="eye"]',r).onclick=()=>{ S.state.session.hideBalance=!S.state.session.hideBalance; S.save(); rerender(); };
    $('[data-act="copyid"]',r).onclick=()=>{ navigator.clipboard?.writeText('@'+S.me.username); toast('CASAIPAY ID copied'); };
    $('[data-act="send"]',r).onclick=()=>go('send');
    $('[data-act="addmoney"]',r).onclick=()=>go('addmoney');
    $('[data-act="notifs"]',r).onclick=()=>go('notifs');
    $('[data-act="bills"]',r).onclick=()=>go('bills');
    $$('[data-bill]',r).forEach(b=>b.onclick=()=>{
      if(b.dataset.bill==='flights') return go('flights');
      FLOW={biller:b.dataset.bill}; go('bill-form');
    });
    const en=$('[data-act="enrol"]',r); if(en) en.onclick=()=>go('face-enrol-settings');
    $$('[data-pay]',r).forEach(b=>b.onclick=()=>{
      const q=S.state.requests.find(x=>x.id===b.dataset.pay);
      FLOW={to:S.user(q.from).username, amount:q.amount, remark:q.note, kind:'casaipay', reqId:q.id};
      go('pay-sheet');
    });
    $$('[data-decline]',r).forEach(b=>b.onclick=()=>{
      const q=S.state.requests.find(x=>x.id===b.dataset.decline);
      confirmSheet({title:'Decline this request?',body:`${S.user(q.from).name} will be told you declined.`,ok:'Decline',cancel:'Keep it',
        onOk(){ q.status='declined'; S.save(); toast('Request declined'); rerender(); }});
    });
  }
};

/* ============ NOTIFICATIONS ============ */
SCREENS['notifs'] = {
  render(){
    const ns=S.me.notifs;
    if(!ns.length) return `<div class="screen">${appbar('Notifications')}
      <div class="result"><div class="tile t-gold" style="width:56px;height:56px;border-radius:20px">${icon('bell',24)}</div>
      <p class="t1 mt16">Nothing yet</p><p class="b1 mt8">Payments and requests will show up here.</p></div></div>`;
    const g={}; ns.forEach(n=>{ const d=dayOf(n.ts); (g[d]=g[d]||[]).push(n); });
    return `<div class="screen">
      ${appbar('Notifications',{right:`<button class="iconbtn r" data-act="readall">${icon('check',22)}</button>`})}
      <div class="scroll">
        ${Object.entries(g).map(([d,items])=>`<p class="cap" style="padding:14px 4px 8px">${d}</p>
          <div class="stack gap10">${items.map(n=>`<div class="card flat row gap12" style="padding:14px 16px;position:relative">
            <div class="tile ${n.tint}">${icon(n.icon,18)}</div>
            <div class="grow"><p class="t2">${n.title}</p><p class="b2 mt4">${n.body}</p></div>
            ${n.unread?'<i style="position:absolute;top:12px;right:12px;width:6px;height:6px;border-radius:50%;background:var(--gold)"></i>':''}
          </div>`).join('')}</div>`).join('')}
      </div></div>`;
  },
  mount(r){ const b=$('[data-act="readall"]',r); if(b) b.onclick=()=>{ S.me.notifs.forEach(n=>n.unread=false); S.save(); toast('All marked as read'); rerender(); }; }
};

/* ============ REQUEST MONEY (centre nav) ============ */
SCREENS['request'] = {
  render(){
    const me=S.me, amt=FLOW.reqAmount, tab=FLOW.reqTab||'show';
    return `<div class="screen">
      ${appbar('Request money',{back:false})}
      <div class="pad" style="flex:none">
        <div class="seg-toggle">
          <button class="${tab==='show'?'on':''}" data-tab="show">Show my code</button>
          <button class="${tab==='scan'?'on':''}" data-tab="scan">Scan to pay</button>
        </div>
      </div>
      ${tab==='show'?`
      <div class="scroll" style="display:flex;flex-direction:column;align-items:center;padding-top:16px">
        <p class="t1 ctr">Show this code to get paid</p>
        <p class="b1 ctr mt8">Any CASAIPAY user can scan it.</p>
        <div class="qrcard mt20" style="width:100%">
          ${qrSVG('casaipay://pay/'+me.username+(amt?'?amount='+amt:''))}
          <div class="mid">${avatar(me,'sm ring')}</div>
        </div>
        ${amt?`<div class="pill p-gold mt16" style="height:34px;font-size:14px">${fmt(amt)} requested</div>`:''}
        <p class="d2 mt16">@${me.username}</p>
        <button class="b2 row gap6 mt8" data-act="copy" style="color:var(--navy);font-weight:600">Copy CASAIPAY ID ${icon('copy',14)}</button>
        <div class="stack gap8 mt24" style="width:100%">
          <button class="btn btn-gold" data-act="share">${icon('share',18)} Share link</button>
          <button class="btn btn-ghost" data-act="specific">${amt?'Change the amount':'Request a specific amount'}</button>
          <button class="btn btn-ghost" data-act="from">Ask a specific person</button>
        </div>
      </div>`:`
      <div class="scroll" style="display:flex;flex-direction:column;align-items:center;padding-top:16px">
        <p class="t1 ctr">Point at the shop's code</p>
        <p class="b1 ctr mt8">The code sits above the counter or on the shop's phone.</p>
        <div class="scanbox mt20">
          <video playsinline muted autoplay data-video></video>
          <div class="fallback hide" data-fallback>${icon('qr',54,1.4)}</div>
          <div class="scanframe"><i></i><i></i><i></i><i></i></div>
          <div class="scanbeam"></div>
        </div>
        <p class="b2 ctr mt16">Hold steady — it detects automatically.</p>
        <div class="stack gap8 mt24" style="width:100%">
          <button class="btn btn-gold" data-act="simscan">Simulate a successful scan</button>
          <button class="btn btn-ghost" data-act="manual">Enter the shop's ID instead</button>
        </div>
      </div>`}
      ${navBar('request')}</div>`;
  },
  mount(r){
    $$('[data-tab]',r).forEach(b=>b.onclick=()=>{ FLOW.reqTab=b.dataset.tab; rerender(); });

    if((FLOW.reqTab||'show')==='scan'){
      startCamera(r);
      const done = () => {
        stopCamera(r);
        const m=S.merchant;
        sheet(`<div class="ctr stack gap8" style="padding-top:4px">
            <div class="tile t-gold" style="width:56px;height:56px;border-radius:20px;margin:0 auto">${icon('store',26)}</div>
            <p class="t1 mt12">${m.name}</p><p class="b2">${m.location}</p></div>
          <p class="b1 ctr mt16">How much are you paying?</p>
          <div class="card mt16" style="box-shadow:none;background:var(--surface-sunk)">
            <div class="amount-wrap" style="padding-top:6px">
              <div class="amount-line"><span class="fig"><span class="naira">₦</span></span><span class="fig" data-fig>0</span></div></div>
          </div>
          <button class="btn btn-gold mt20" data-ok disabled>Pay</button>
          ${keypadHTML()}`,
          { onMount(s){
              let raw=''; const fig=s.querySelector('[data-fig]'), ok=s.querySelector('[data-ok]');
              bindKeypad(s,k=>{
                if(k==='back') raw=raw.slice(0,-1);
                else if(k==='.'){ if(!raw.includes('.')) raw=(raw||'0')+'.'; }
                else raw = raw==='0'?k:raw+k;
                const v=parseFloat(raw)||0;
                fig.textContent = raw===''?'0':Number(raw.split('.')[0]||0).toLocaleString('en-NG')+(raw.includes('.')?'.'+raw.split('.')[1]:'');
                ok.disabled = !(v>=10 && v<=S.viewBalance());
                ok.textContent = v>=10 ? 'Pay '+fmt(v) : 'Pay';
              });
              ok.onclick=()=>{ const v=parseFloat(raw);
                closeSheet();
                authorise({onOk(method){
                  const id=S.charge(S.me.username,v,'Scanned at counter',method);
                  FLOW.result={id,amount:v,to:m.name,detail:m.location,method};
                  go('sent');
                }});
              };
          }});
      };
      const sim=$('[data-act="simscan"]',r); if(sim) sim.onclick=done;
      const man=$('[data-act="manual"]',r); if(man) man.onclick=()=>{ stopCamera(r); toast('Shop ID entry is stubbed'); };
      r._autoscan = setTimeout(done, 6000);   // auto-detect, like a real scanner
      r._cleanup = ()=>clearTimeout(r._autoscan);
      return;
    }

    $('[data-act="copy"]',r).onclick=()=>{ navigator.clipboard?.writeText('@'+S.me.username); toast('CASAIPAY ID copied'); };
    $('[data-act="share"]',r).onclick=()=>{
      const url='https://casaipay.app/@'+S.me.username;
      if(navigator.share) navigator.share({title:'Pay me on CASAIPAY',text:'My CASAIPAY ID is @'+S.me.username,url}).catch(()=>{});
      else { navigator.clipboard?.writeText(url); toast('Payment link copied'); }
    };
    $('[data-act="specific"]',r).onclick=()=>{
      sheet(`<p class="t1 ctr">How much are you asking for?</p>
        <div class="card mt20" style="box-shadow:none;background:var(--surface-sunk)">
          <div class="amount-wrap" style="padding-top:6px">
            <div class="amount-line"><span class="fig"><span class="naira">₦</span></span><span class="fig" data-fig>0</span></div></div>
        </div>
        <button class="btn btn-gold mt20" data-ok disabled>Show the code</button>
        ${keypadHTML()}`,
        { onMount(s){
            let raw=''; const fig=s.querySelector('[data-fig]'), ok=s.querySelector('[data-ok]');
            bindKeypad(s,k=>{
              if(k==='back') raw=raw.slice(0,-1);
              else if(k==='.'){ if(!raw.includes('.')) raw=(raw||'0')+'.'; }
              else raw = raw==='0'?k:raw+k;
              fig.textContent = raw===''?'0':Number(raw.split('.')[0]||0).toLocaleString('en-NG')+(raw.includes('.')?'.'+raw.split('.')[1]:'');
              ok.disabled = !(parseFloat(raw)>=10);
            });
            ok.onclick=()=>{ FLOW.reqAmount=parseFloat(raw); closeSheet(); rerender(); };
        }});
    };
    $('[data-act="from"]',r).onclick=()=>go('request-who');
  }
};

SCREENS['request-who'] = {
  render(){ return `<div class="screen">${appbar('Ask someone')}
    <div class="scroll">
      <p class="b1">Who should pay you?</p>
      <div class="field mt16"><p class="cap">CASAIPAY ID</p>
        <div class="field-row"><span class="prefix">@</span><input class="val" data-u placeholder="amaka" autocapitalize="off"></div></div>
      <div data-res></div>
      <p class="cap mt24">Recents</p>
      <div class="rows mt8">${Object.values(S.state.users).filter(u=>u.username!==S.me.username)
        .map(u=>`<button class="lrow" data-pick="${u.username}">${avatar(u,u.faceEnrolled?'ring':'')}
          <div class="grow"><p class="t2">${u.name}</p><p class="b2">@${u.username}</p></div>${icon('chev',18)}</button>`).join('')}</div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Next</button></div></div>`; },
  mount(r){
    const inp=$('[data-u]',r), res=$('[data-res]',r), b=$('[data-act="next"]',r); let t, found=null;
    const resolve=(h)=>{ const u=S.find(h);
      if(u && u.username!==S.me.username){ found=u; res.innerHTML=`<div class="strip s-mint mt16">${icon('check',15,3)} ${u.name}</div>`; b.disabled=false; }
      else { found=null; res.innerHTML=`<p class="helper err">No CASAIPAY account with that ID.</p>`; b.disabled=true; }
    };
    inp.oninput=()=>{ inp.value=inp.value.toLowerCase().replace(/[^a-z0-9]/g,''); clearTimeout(t); b.disabled=true; res.innerHTML='';
      if(inp.value.length>=3) t=setTimeout(()=>resolve(inp.value),400); };
    $$('[data-pick]',r).forEach(p=>p.onclick=()=>{ inp.value=p.dataset.pick; resolve(p.dataset.pick); });
    b.onclick=()=>{ FLOW.askTo=found.username; go('request-amount'); };
  }
};

SCREENS['request-amount'] = {
  render(){ const u=S.user(FLOW.askTo);
    return `<div class="screen">${appbar('Ask '+u.first)}
      ${amountScreenHTML({header:`<div class="card">${contactRow(u)}</div>`, cta:'Send request', note:'They can pay with one tap'})}</div>`; },
  mount(r){ bindAmount(r,{max:null, ctaLabel:v=>v?`Ask for ${fmt(v)}`:'Send request',
    onNext(v,remark){ S.askFor(FLOW.askTo,v,remark); FLOW.result={kind:'request',amount:v,to:S.user(FLOW.askTo)}; go('request-sent'); }}); }
};

SCREENS['request-sent'] = {
  render(){ const f=FLOW.result; return `<div class="screen">
    <div class="result"><div class="rmark ok">${icon('check',44,3)}</div>
      <p class="d2">Request sent</p>
      <p class="b1 mt8">${f.to.name} has been asked for ${fmt(f.amount)}.<br>You'll be notified when they pay.</p></div>
    <div class="footer"><button class="btn btn-gold" data-act="home">Done</button></div></div>`; },
  mount(r){ $('[data-act="home"]',r).onclick=()=>go('home'); }
};

/* ============ SEND ============ */
SCREENS['send'] = {
  render(){ return `<div class="screen">${appbar('Send money')}
    <div class="scroll">
      <div class="strip s-mint">${icon('zap',16)} Instant · no fees between CASAIPAY accounts</div>
      <div class="rows mt16">
        <button class="lrow" data-go="send-user"><div class="tile t-gold">${icon('scan',18)}</div>
          <div class="grow"><p class="t2">To a CASAIPAY ID</p><p class="b2">Free and instant</p></div>${icon('chev',18)}</button>
        <button class="lrow" data-go="bank-acct"><div class="tile t-navy">${icon('bank',18)}</div>
          <div class="grow"><p class="t2">To a bank account</p><p class="b2">Any Nigerian bank</p></div>${icon('chev',18)}</button>
        <button class="lrow" data-go="pickup-phone"><div class="tile t-mint">${icon('face',18)}</div>
          <div class="grow"><p class="t2">Cash pickup — they claim with their face</p>
            <p class="b2 mt4">No account, no card, no phone needed</p></div>${icon('chev',18)}</button>
      </div>
    </div></div>`; },
  mount(r){ $$('[data-go]',r).forEach(b=>b.onclick=()=>go(b.dataset.go)); }
};

SCREENS['send-user'] = {
  render(){
    const recents = S.me.txns.filter(t=>t.channel==='casaipay').map(t=>t.detail.replace('@','')).filter((v,i,a)=>a.indexOf(v)===i);
    const list = Object.values(S.state.users).filter(u=>u.username!==S.me.username);
    return `<div class="screen">${appbar('To a CASAIPAY ID')}
      <div class="scroll">
        <div class="strip s-mint">${icon('zap',16)} Instant · zero fees · always free</div>
        <div class="field mt16"><p class="cap">CASAIPAY ID or phone number</p>
          <div class="field-row"><span class="prefix">@</span><input class="val" data-u placeholder="chidi" autocapitalize="off">
            <button data-act="scan" style="color:var(--ink-3)">${icon('scan',20)}</button></div></div>
        <div data-res></div>
        <p class="cap mt24">Recents</p>
        <div class="rows mt8">${list.map(u=>`<button class="lrow" data-pick="${u.username}">
          ${avatar(u,u.faceEnrolled?'ring':'')}
          <div class="grow"><p class="t2">${u.name}</p><p class="b2">@${u.username}</p></div>${icon('chev',18)}</button>`).join('')}</div>
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Next</button></div></div>`;
  },
  mount(r){
    const inp=$('[data-u]',r), res=$('[data-res]',r), b=$('[data-act="next"]',r); let t, found=null;
    const resolve=h=>{ const u=S.find(h);
      if(u && u.username!==S.me.username){ found=u; res.innerHTML=`<div class="strip s-mint mt16">${icon('check',15,3)} ${u.name} · verified</div>`; b.disabled=false; }
      else { found=null; res.innerHTML=`<p class="helper err">No CASAIPAY account with that ID. Check the spelling.</p>`; b.disabled=true; }
    };
    inp.oninput=()=>{ inp.value=inp.value.toLowerCase().replace(/[^a-z0-9]/g,''); clearTimeout(t); b.disabled=true; res.innerHTML='';
      if(inp.value.length>=3) t=setTimeout(()=>resolve(inp.value),400); };
    $$('[data-pick]',r).forEach(p=>p.onclick=()=>{ FLOW={to:p.dataset.pick,kind:'casaipay'}; go('send-amount'); });
    $('[data-act="scan"]',r).onclick=()=>toast('Scanner is stubbed in this prototype');
    b.onclick=()=>{ FLOW={to:found.username,kind:'casaipay'}; go('send-amount'); };
  }
};

SCREENS['send-amount'] = {
  render(){ const u=S.user(FLOW.to);
    return `<div class="screen">${appbar('Send money')}
      ${amountScreenHTML({header:`<div class="card">${contactRow(u)}</div>`, note:'No fee'})}</div>`; },
  mount(r){ bindAmount(r,{max:S.viewBalance(), ctaLabel:v=>v?`Send ${fmt(v)}`:'Confirm',
    onNext(v,remark){ FLOW.amount=v; FLOW.remark=remark; reminderSheet(); }}); 
    r.addEventListener('click',e=>{ if(e.target.dataset.act==='topup') go('addmoney'); });
  }
};

function reminderSheet(){
  const rows = FLOW.kind==='casaipay'
    ? [['Name',S.user(FLOW.to).name],['CASAIPAY ID','@'+FLOW.to],['Amount',fmt(FLOW.amount)]]
    : [['Name',FLOW.bankName],['Account no.',FLOW.acct],['Bank',FLOW.bank],['Amount',fmt(FLOW.amount)]];
  confirmSheet({ title:'Check before you send',
    body:"Confirm the details below. Completed transfers can't be reversed.",
    rows, ok:'Continue', cancel:'Go back', onOk:()=>go('pay-sheet') });
}

/* payment sheet screen */
SCREENS['pay-sheet'] = {
  render(){
    const me=S.me, isCp=FLOW.kind==='casaipay';
    const fee = isCp?0:(S.state.freeTransfers>0?0:10);
    FLOW.fee=fee;
    const rows = isCp
      ? [['CASAIPAY ID','@'+FLOW.to],['Name',S.user(FLOW.to).name],['Amount',fmt(FLOW.amount)],['Fee',fmt(0)]]
      : [['Bank',FLOW.bank],['Account no.',FLOW.acct],['Name',FLOW.bankName],['Amount',fmt(FLOW.amount)],['Fee',fmt(fee)]];
    return `<div class="screen">
      ${appbar('',{right:''})}
      <div class="scroll">
        <p class="d1 ctr">${nairaFig(FLOW.amount)}</p>
        <div class="drows mt24">${rows.map(x=>`<div class="drow"><span class="k">${x[0]}</span><span class="v">${x[1]}</span></div>`).join('')}</div>
        <div class="between mt24"><p class="cap">Payment method</p><span class="b2">All ›</span></div>
        <div class="rows mt8">
          <div class="lrow"><div class="tile t-gold">${icon('wallet',18)}</div>
            <div class="grow"><p class="t2">Available balance</p><p class="b2">${fmt(S.viewBalance(me))}</p></div>
            <div style="color:var(--success)">${icon('check',20,3)}</div></div>
          <div class="lrow" style="opacity:.45"><div class="tile t-grey" style="background:var(--surface-sunk)">${icon('card',18)}</div>
            <div class="grow"><p class="t2">Debit card</p><p class="b2">Not linked</p></div></div>
        </div>
      </div>
      <div class="footer"><button class="btn btn-gold" data-act="pay">Pay</button></div></div>`;
  },
  mount(r){
    $('[data-act="pay"]',r).onclick=()=>authorise({
      title:'Confirm it\'s you', onOk(method){
        let id;
        if(FLOW.kind==='casaipay') id=S.sendToUser(FLOW.to,FLOW.amount,FLOW.remark||'',method);
        else id=S.sendToBank(FLOW.acct,FLOW.bank,FLOW.bankName,FLOW.amount,FLOW.remark||'',method,FLOW.fee||0);
        if(FLOW.reqId){ const q=S.state.requests.find(x=>x.id===FLOW.reqId); if(q){ q.status='paid'; S.save(); } }
        FLOW.result={id,amount:FLOW.amount,
          to:FLOW.kind==='casaipay'?S.user(FLOW.to).name:FLOW.bankName,
          detail:FLOW.kind==='casaipay'?'@'+FLOW.to:FLOW.bank+' · '+FLOW.acct, method};
        go('sent');
      }});
  }
};

/* shared authorise sheet — respects the user's chosen unlock mode */
function authModeOf(u){ u = u || S.me; return u.faceEnrolled ? (u.authMode||'either') : 'passcode'; }

function authorise({title='Confirm it\'s you', onOk}){
  const me = S.me, mode = authModeOf(me);
  if(mode==='passcode') return passcodeSheet(onOk);

  const s = sheet(`<p class="t1 ctr">${title}</p>
    <div class="mt20">${faceHTML('Look at the camera')}</div>
    ${mode==='face+passcode'?'<p class="b2 ctr mt12">Then enter your passcode</p>':''}
    ${mode==='either'?'<button class="btn btn-ghost mt16" data-alt>Use passcode instead</button>':''}`,
    { dismissible:true, onMount(sc){
        startCamera(sc);
        setTimeout(()=>runScan(sc,{fail:S.state.session.forceFail,onDone(ok){
          stopCamera(sc);
          closeSheet();
          if(!ok){ setTimeout(()=>passcodeSheet(onOk,true),200); return; }
          if(S.state.session.forceDuressFace && me.decoyFace){ S.enterDuress(me); S.state.session.forceDuressFace=false; S.save(); }
          if(mode==='face+passcode') setTimeout(()=>passcodeSheet(m=>onOk('face+passcode')),200);
          else setTimeout(()=>onOk('face'),180);
        }}),450);
        const alt = sc.querySelector('[data-alt]');
        if(alt) alt.onclick=()=>{ stopCamera(sc); closeSheet(); setTimeout(()=>passcodeSheet(onOk),180); };
    }});
  return s;
}

function passcodeSheet(onOk, afterFail=false){
  sheet(`<p class="t1 ctr">Enter payment passcode</p>
    ${afterFail?'<p class="b1 ctr mt8">Face didn\'t match. Use your passcode.</p>':''}
    <div class="dots mt24" data-dots>${'<i></i>'.repeat(4)}</div>
    <p class="helper ctr">Prototype passcode: 1234</p>
    ${keypadHTML({secure:true})}`,
    { onMount(s){ bindPasscode(s,(code,fail)=>{
        const me = S.me;
        if(me.decoyPasscode && code===me.decoyPasscode && code!==me.passcode){
          S.enterDuress(me);                       // silent — the screen behaves normally
          closeSheet(); setTimeout(()=>onOk('passcode'),180); return;
        }
        if(code===me.passcode){ closeSheet(); setTimeout(()=>onOk('passcode'),180); }
        else { toast('Wrong passcode'); fail(); }
      }); }});
}

SCREENS['sent'] = {
  render(){ const f=FLOW.result; return `<div class="screen">
    <div class="result">
      <div class="rmark ok">${icon('check',44,3)}</div>
      <p class="d1">${nairaFig(f.amount)}</p>
      <p class="t2 mt8">sent to ${f.to}</p>
      <p class="b2 mt4">${f.detail}</p>
      <div class="drows mt24" style="width:100%;text-align:left">
        <div class="drow"><span class="k">Reference</span><span class="v mono">${f.id}</span></div>
        <div class="drow"><span class="k">Method</span><span class="v">${f.method==='face'?'Face ID':'Passcode'}</span></div>
        <div class="drow"><span class="k">Balance after</span><span class="v">${fmt(S.viewBalance())}</span></div>
      </div>
    </div>
    <div class="footer stack gap8">
      <button class="btn btn-gold" data-act="done">Done</button>
      <button class="btn btn-ghost" data-act="share">Share receipt</button>
    </div></div>`; },
  mount(r){
    $('[data-act="done"]',r).onclick=()=>go('home');
    $('[data-act="share"]',r).onclick=()=>{ navigator.clipboard?.writeText(`CASAIPAY receipt ${FLOW.result.id} — ${fmt(FLOW.result.amount)} to ${FLOW.result.to}`); toast('Receipt copied'); };
  }
};

/* ============ BANK TRANSFER ============ */
SCREENS['bank-acct'] = {
  render(){ const free=S.state.freeTransfers;
    return `<div class="screen">${appbar('To a bank account')}
    <div class="scroll">
      <div class="strip s-gold">${icon('zap',16)} Free transfers today: ${free}</div>
      <div class="field mt16"><p class="cap">Account number</p>
        <div class="field-row"><input class="val mono" inputmode="numeric" maxlength="10" placeholder="0123456789" data-acct></div></div>
      <button class="field mt12" style="width:100%;text-align:left" data-act="bank">
        <p class="cap">Bank</p><div class="field-row"><span class="val ink3" data-bankname>Select bank</span>
        <div class="grow"></div>${icon('chev',18)}</div></button>
      <div data-res></div>
      <p class="cap mt24">Recents</p>
      <div class="rows mt8">
        <button class="lrow" data-recent><div class="tile t-navy" style="font-weight:700;font-size:14px">G</div>
          <div class="grow"><p class="t2">ADAEZE NKEM OKONKWO</p><p class="b2">0123456789 · GTBank</p></div>${icon('chev',18)}</button>
      </div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="next" disabled>Next</button></div></div>`; },
  mount(r){
    const acct=$('[data-acct]',r), bn=$('[data-bankname]',r), res=$('[data-res]',r), b=$('[data-act="next"]',r);
    let bank=null, name=null;
    const tryResolve=()=>{
      if(acct.value.length===10 && bank){
        res.innerHTML='<p class="helper">Checking account…</p>';
        setTimeout(()=>{
          name=S.state.namePool[acct.value.charCodeAt(9)%S.state.namePool.length];
          res.innerHTML=`<div class="strip s-mint mt16">${icon('check',15,3)} ${name}</div>`; b.disabled=false;
        },900);
      } else { res.innerHTML=''; b.disabled=true; }
    };
    acct.oninput=()=>{ acct.value=acct.value.replace(/\D/g,'').slice(0,10); tryResolve(); };
    $('[data-act="bank"]',r).onclick=()=>bankPicker(x=>{ bank=x; bn.textContent=x; bn.classList.remove('ink3'); tryResolve(); });
    $('[data-recent]',r).onclick=()=>{ FLOW={kind:'bank',acct:'0123456789',bank:'GTBank',bankName:'ADAEZE NKEM OKONKWO'}; go('bank-amount'); };
    b.onclick=()=>{ FLOW={kind:'bank',acct:acct.value,bank,bankName:name}; go('bank-amount'); };
  }
};

SCREENS['bank-amount'] = {
  render(){ return `<div class="screen">${appbar('Send money')}
    ${amountScreenHTML({header:`<div class="card"><p class="t2">${FLOW.bankName}</p><p class="b2 mt4">${FLOW.acct} · ${FLOW.bank}</p></div>`,
      note: S.state.freeTransfers>0?'Free':''})}</div>`; },
  mount(r){ bindAmount(r,{max:S.viewBalance(), ctaLabel:v=>v?`Send ${fmt(v)}`:'Confirm',
    onNext(v,remark){ FLOW.amount=v; FLOW.remark=remark; reminderSheet(); }});
    r.addEventListener('click',e=>{ if(e.target.dataset.act==='topup') go('addmoney'); });
  }
};

/* ============ ADD MONEY ============ */
SCREENS['addmoney'] = {
  render(){ return `<div class="screen">${appbar('Add money')}
    <div class="scroll"><div class="rows">
      <button class="lrow" data-go="add-transfer"><div class="tile t-navy">${icon('bank',18)}</div>
        <div class="grow"><p class="t2">Bank transfer</p><p class="b2">Send to your CASAIPAY account number</p></div>${icon('chev',18)}</button>
      <button class="lrow" data-go="add-card"><div class="tile t-gold">${icon('card',18)}</div>
        <div class="grow"><p class="t2">Debit card</p><p class="b2">Top up with any Nigerian card</p></div>${icon('chev',18)}</button>
      <button class="lrow" data-go="add-agent"><div class="tile t-mint">${icon('cash',18)}</div>
        <div class="grow"><p class="t2">Cash at an agent</p><p class="b2">Hand cash to a CASAIPAY agent nearby</p></div>${icon('chev',18)}</button>
    </div></div></div>`; },
  mount(r){ $$('[data-go]',r).forEach(b=>b.onclick=()=>go(b.dataset.go)); }
};

SCREENS['add-transfer'] = {
  render(){ const me=S.me; return `<div class="screen">${appbar('Bank transfer')}
    <div class="scroll">
      <div class="balance-card" style="min-height:auto">
        <p class="cap">Your CASAIPAY account number</p>
        <p class="amt mono mt8" style="font-size:29px">${me.virtualAcct}</p>
        <p class="b2 mt8" style="color:rgba(255,255,255,.6)">${me.virtualBank} · ${me.name.toUpperCase()}</p>
        <button class="btn btn-gold mt16" style="height:46px" data-act="copy">${icon('copy',17)} Copy account number</button>
      </div>
      <p class="cap mt24">How it works</p>
      <div class="rows mt8">
        <div class="lrow"><div class="tile t-gold" style="font-weight:700">1</div><p class="t2 grow">Open your bank app</p></div>
        <div class="lrow"><div class="tile t-gold" style="font-weight:700">2</div><p class="t2 grow">Send to the number above</p></div>
        <div class="lrow"><div class="tile t-gold" style="font-weight:700">3</div><p class="t2 grow">It lands in under a minute</p></div>
      </div>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="sim">I've sent ₦10,000</button></div></div>`; },
  mount(r){
    $('[data-act="copy"]',r).onclick=()=>{ navigator.clipboard?.writeText(S.me.virtualAcct); toast('Account number copied'); };
    $('[data-act="sim"]',r).onclick=(e)=>{ e.target.textContent='Waiting for your bank…'; e.target.disabled=true;
      setTimeout(()=>{ S.topup(10000,'topup','Bank transfer'); FLOW.result={amount:10000}; go('added'); },1800); };
  }
};

SCREENS['add-card'] = {
  render(){ return `<div class="screen">${appbar('Debit card')}
    <div class="scroll">
      <div class="field"><p class="cap">Card number</p><div class="field-row">
        <input class="val mono" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" data-cn></div></div>
      <div class="row gap12 mt12">
        <div class="field grow"><p class="cap">Expiry</p><div class="field-row"><input class="val mono" placeholder="05/28" maxlength="5" data-ex></div></div>
        <div class="field grow"><p class="cap">CVV</p><div class="field-row"><input class="val mono" inputmode="numeric" placeholder="123" maxlength="3" data-cv></div></div>
      </div>
      <div class="field mt12"><p class="cap">Amount</p><div class="field-row"><span class="prefix">₦</span>
        <input class="val" inputmode="numeric" placeholder="5,000" data-am></div></div>
      <p class="helper">Prototype — any card details will work.</p>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="pay" disabled>Add money</button></div></div>`; },
  mount(r){
    const cn=$('[data-cn]',r), am=$('[data-am]',r), b=$('[data-act="pay"]',r);
    cn.oninput=()=>{ cn.value=cn.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim(); check(); };
    am.oninput=()=>{ const d=am.value.replace(/\D/g,''); am.value=d?Number(d).toLocaleString('en-NG'):''; check(); };
    $('[data-ex]',r).oninput=e=>{ e.target.value=e.target.value.replace(/[^\d/]/g,'').slice(0,5); };
    function check(){ const v=Number(am.value.replace(/\D/g,'')); b.disabled=!(cn.value.replace(/\s/g,'').length>=12 && v>=100);
      b.textContent = v>=100 ? 'Add '+fmt(v) : 'Add money'; }
    b.onclick=()=>{ const v=Number(am.value.replace(/\D/g,''));
      b.textContent='Contacting your bank…'; b.disabled=true;
      setTimeout(()=>{ S.topup(v,'topup','Debit card'); FLOW.result={amount:v}; go('added'); },1500); };
  }
};

SCREENS['add-agent'] = {
  render(){ return `<div class="screen">${appbar('Cash at an agent')}
    <div class="scroll">
      <p class="b1">Hand your cash to any agent below. They'll credit your CASAIPAY account on the spot.</p>
      <div class="rows mt16">${S.state.agents.map(a=>`<div class="lrow">
        <div class="tile ${a.open?'t-gold':'t-grey'}" ${!a.open?'style="background:var(--surface-sunk);color:var(--ink-3)"':''}>${icon('store',18)}</div>
        <div class="grow"><p class="t2">${a.name}</p><p class="b2">${a.address} · ${a.distance}</p></div>
        <span class="pill ${a.open?'p-mint':'p-grey'}">${a.open?'Open':'Closed'}</span></div>`).join('')}</div>
      <div class="card tint mt20 row gap12"><div class="tile t-gold" style="background:#fff">${icon('shield',18)}</div>
        <p class="b1" style="color:#7a6000">Agents verify your face before crediting you. Nobody else can claim your money.</p></div>
    </div></div>`; }
};

SCREENS['added'] = {
  render(){ return `<div class="screen">
    <div class="result"><div class="rmark ok">${icon('check',44,3)}</div>
      <p class="d1">${nairaFig(FLOW.result.amount)}</p>
      <p class="t2 mt8">added to your balance</p>
      <p class="b1 mt12">New balance: ${fmt(S.viewBalance())}</p></div>
    <div class="footer"><button class="btn btn-gold" data-act="home">Done</button></div></div>`; },
  mount(r){ $('[data-act="home"]',r).onclick=()=>go('home'); }
};

/* ============ WITHDRAW ============ */
SCREENS['withdraw'] = {
  render(){ return `<div class="screen">${appbar('Withdraw')}
    <div class="scroll"><div class="rows">
      <button class="lrow" data-go="withdraw-bank"><div class="tile t-navy">${icon('bank',18)}</div>
        <div class="grow"><p class="t2">To a bank account</p><p class="b2">Lands in minutes</p></div>${icon('chev',18)}</button>
      <button class="lrow" data-go="withdraw-agent"><div class="tile t-mint">${icon('cash',18)}</div>
        <div class="grow"><p class="t2">Cash from an agent</p><p class="b2">Verify with your face, collect cash</p></div>${icon('chev',18)}</button>
    </div></div></div>`; },
  mount(r){ $$('[data-go]',r).forEach(b=>b.onclick=()=>go(b.dataset.go)); }
};

SCREENS['withdraw-bank'] = { render(){ return SCREENS['bank-acct'].render(); },
  mount(r){ SCREENS['bank-acct'].mount(r); } };

SCREENS['withdraw-agent'] = {
  render(){ return `<div class="screen">${appbar('Cash from an agent')}
    <div class="scroll">
      <p class="b1">Pick where you'll collect the cash.</p>
      <div class="rows mt16">${S.state.agents.filter(a=>a.open).map(a=>`<button class="lrow" data-agent="${a.name}">
        <div class="tile t-gold">${icon('store',18)}</div>
        <div class="grow"><p class="t2">${a.name}</p><p class="b2">${a.address} · ${a.distance}</p></div>${icon('chev',18)}</button>`).join('')}</div>
    </div></div>`; },
  mount(r){ $$('[data-agent]',r).forEach(b=>b.onclick=()=>{ FLOW.agent=b.dataset.agent; go('withdraw-amount'); }); }
};

SCREENS['withdraw-amount'] = {
  render(){ return `<div class="screen">${appbar('Cash from '+FLOW.agent)}
    ${amountScreenHTML({header:`<div class="card row gap12"><div class="tile t-gold">${icon('store',18)}</div>
      <div class="grow"><p class="t2">${FLOW.agent}</p><p class="b2">Collect in cash</p></div></div>`, remark:false, note:'No fee'})}</div>`; },
  mount(r){ bindAmount(r,{max:S.viewBalance(), ctaLabel:v=>v?`Withdraw ${fmt(v)}`:'Confirm',
    onNext(v){ FLOW.amount=v; authorise({onOk(){ const code=S.withdrawAgent(v,FLOW.agent);
      FLOW.result={code,amount:v,agent:FLOW.agent}; go('claim-code'); }}); }}); }
};

SCREENS['claim-code'] = {
  render(){ const f=FLOW.result; return `<div class="screen">
    <div class="result">
      <div class="rmark ok">${icon('cash',40,2)}</div>
      <p class="d2">Cash is waiting</p>
      <p class="b1 mt8">Show this code and your face at<br><b class="ink">${f.agent}</b></p>
      <div class="card tint mt24" style="width:100%">
        <p class="cap ctr">Claim code</p>
        <p class="d1 mono ctr mt8" style="letter-spacing:.16em">${f.code}</p>
      </div>
      <p class="t1 mt20">${fmt(f.amount)}</p>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="home">Done</button></div></div>`; },
  mount(r){ $('[data-act="home"]',r).onclick=()=>go('home'); }
};

/* ============ TRANSACTIONS ============ */
SCREENS['txns'] = {
  render(){
    const f=FLOW.filter||'all', txns=S.me.txns.filter(t=>
      f==='all'||(f==='in'&&t.type==='credit')||(f==='out'&&t.type==='debit')||(f==='shop'&&t.channel==='merchant'));
    const chip=(k,l)=>`<button class="pill ${f===k?'p-gold':'p-grey'}" data-f="${k}" style="height:34px">${l}</button>`;
    return `<div class="screen">${appbar('Money',{back:false})}
      <div class="row gap8 pad" style="flex:none;overflow-x:auto;padding-bottom:6px">
        ${chip('all','All')}${chip('in','Money in')}${chip('out','Money out')}${chip('shop','Shops')}</div>
      <div class="scroll">${groupTxns(txns)}</div>
      ${navBar('txns')}</div>`;
  },
  mount(r){ $$('[data-f]',r).forEach(b=>b.onclick=()=>{ FLOW.filter=b.dataset.f; rerender(); }); }
};

function receiptSheet(t){
  sheet(`<div class="ctr stack gap6" style="padding-top:4px">
      <div class="tile ${t.type==='credit'?'t-mint':'t-navy'}" style="width:52px;height:52px;border-radius:18px;margin:0 auto">
        ${icon(t.channel==='merchant'?'store':(t.type==='credit'?'down':'up'),24)}</div>
      <p class="d1 mt12">${t.type==='credit'?'+':'−'}${nairaFig(t.amount)}</p>
      <span class="pill p-mint" style="margin:8px auto 0">${icon('check',13,3)} Successful</span>
    </div>
    <div class="drows mt20">
      <div class="drow"><span class="k">${t.type==='credit'?'From':'To'}</span><span class="v">${t.party}</span></div>
      <div class="drow"><span class="k">Detail</span><span class="v">${t.detail||'—'}</span></div>
      <div class="drow"><span class="k">Date</span><span class="v">${fullDate(t.ts)}</span></div>
      <div class="drow"><span class="k">Reference</span><span class="v mono">${t.id}</span></div>
      ${t.method?`<div class="drow"><span class="k">Method</span><span class="v">${t.method==='face'?'Face ID':'Passcode'}</span></div>`:''}
      <div class="drow"><span class="k">Fee</span><span class="v">${fmt(t.fee||0)}</span></div>
      ${t.remark?`<div class="drow"><span class="k">Note</span><span class="v">${t.remark}</span></div>`:''}
    </div>
    <button class="btn btn-gold mt20" data-share>${icon('share',18)} Share receipt</button>
    <button class="btn btn-ghost" data-close>Close</button>`,
  { onMount(s){ s.querySelector('[data-share]').onclick=()=>{ navigator.clipboard?.writeText(`CASAIPAY ${t.id} — ${fmt(t.amount)} · ${t.party}`); toast('Receipt copied'); }; }});
}

/* ============ ACTIVITY (requests) ============ */
SCREENS['activity'] = {
  render(){
    const me=S.state.session.user;
    const rec=S.state.requests.filter(r=>r.to===me), sent=S.state.requests.filter(r=>r.from===me);
    const claims=S.state.claims;
    const pill=s=>({pending:'p-warn',paid:'p-mint',declined:'p-dang'})[s]||'p-grey';
    const card=(q,dir)=>{ const other=S.user(dir==='in'?q.from:q.to); return `<div class="card flat mt10">
      <div class="row gap12">${avatar(other,'sm')}
        <div class="grow"><p class="t2">${dir==='in'?other.name+' asked you for':'You asked '+other.first+' for'} ${fmt(q.amount)}</p>
        <p class="b2 mt4">${q.note||'No note'} · ${timeOf(q.ts)}</p></div>
        <span class="pill ${pill(q.status)}">${q.status}</span></div>
      ${dir==='in'&&q.status==='pending'?`<div class="btn-row mt12">
        <button class="btn btn-white" data-decline="${q.id}">Decline</button>
        <button class="btn btn-gold" style="height:52px" data-pay="${q.id}">Pay</button></div>`:''}</div>`; };
    return `<div class="screen">${appbar('Activity',{back:false})}
      <div class="scroll">
        ${claims.filter(c=>c.status==='pending').length?`<p class="cap" style="padding:6px 4px 8px">Cash waiting to be collected</p>
          <div class="stack gap10">${claims.filter(c=>c.status==='pending').map(c=>`<div class="card tint">
            <div class="row gap12">
              ${c.beneficiary?avatar(c.beneficiary,'ring'):`<div class="tile t-gold" style="background:#fff">${icon('cash',18)}</div>`}
              <div class="grow"><p class="t2">${fmt(c.amount)} for ${c.beneficiary?c.beneficiary.name:'you'}</p>
                <p class="b2 mt4">Code <b class="mono">${c.code}</b>${c.otp?' · passcode <b class="mono">'+c.otp+'</b>':''}</p></div>
              <span class="pill p-warn">Waiting</span></div>
            <p class="b2 mt12">${c.beneficiary?'Claimable at any CASAIPAY shop with their face.':'Show this code and your face at '+(c.agent||'any CASAIPAY shop')+'.'}</p>
          </div>`).join('')}</div>`:''}
        <p class="cap" style="padding:18px 4px 0">Requests for you</p>
        ${rec.length?rec.map(q=>card(q,'in')).join(''):'<p class="b1 mt12">Nobody has asked you for money.</p>'}
        <p class="cap" style="padding:22px 4px 0">Requests you sent</p>
        ${sent.length?sent.map(q=>card(q,'out')).join(''):'<p class="b1 mt12">You haven\'t asked anyone for money yet.</p>'}
      </div>${navBar('activity')}</div>`;
  },
  mount(r){
    $$('[data-pay]',r).forEach(b=>b.onclick=()=>{ const q=S.state.requests.find(x=>x.id===b.dataset.pay);
      FLOW={to:S.user(q.from).username,amount:q.amount,remark:q.note,kind:'casaipay',reqId:q.id}; go('pay-sheet'); });
    $$('[data-decline]',r).forEach(b=>b.onclick=()=>{ const q=S.state.requests.find(x=>x.id===b.dataset.decline);
      q.status='declined'; S.save(); toast('Request declined'); rerender(); });
  }
};

/* ============ PROFILE ============ */
SCREENS['profile'] = {
  render(){ const me=S.me; return `<div class="screen">${appbar('My profile',{back:false})}
    <div class="scroll">
      <div class="card row gap12">
        <button data-act="photo" style="position:relative">
          ${avatar(me,'lg '+(me.faceEnrolled?'ring':''))}
          <span style="position:absolute;right:-2px;bottom:-2px;width:24px;height:24px;border-radius:50%;
            background:var(--gold);display:grid;place-items:center;box-shadow:0 0 0 2px var(--surface)">
            ${icon('plus',13,3)}</span>
        </button>
        <div class="grow"><p class="t1">${me.name}</p><p class="b2 mt4">@${me.username} · +234 ${me.phone.slice(1)}</p></div>
        <button class="pill p-mint" data-act="photo">Photo</button>
      </div>
      <p class="cap" style="padding:20px 4px 8px">Security</p>
      <div class="rows">
        <button class="lrow" data-act="security"><div class="tile t-gold">${icon('shield',18)}</div>
          <div class="grow"><p class="t2">Security &amp; unlock</p>
            <p class="b2">${({face:'Face ID only','face+passcode':'Face ID + passcode',either:'Face ID or passcode',passcode:'Passcode only'})[authModeOf(me)]}</p></div>
          ${icon('chev',18)}</button>
        <button class="lrow" data-act="pass"><div class="tile t-navy">${icon('lock',18)}</div>
          <p class="t2 grow">Change passcode</p>${icon('chev',18)}</button>
        <button class="lrow" data-act="distress"><div class="tile t-dang">${icon('shield',18)}</div>
          <div class="grow"><p class="t2">Distress unlock</p>
            <p class="b2">${me.decoyPasscode?'Set up':'Not set up'}</p></div>
          <span class="pill ${me.decoyPasscode?'p-mint':'p-grey'}">${me.decoyPasscode?'On':'Off'}</span></button>
      </div>
      <p class="cap" style="padding:20px 4px 8px">Account</p>
      <div class="rows">
        <button class="lrow" data-act="limits"><div class="tile t-mint">${icon('zap',18)}</div>
          <div class="grow"><p class="t2">Limits &amp; tier</p><p class="b2">Tier ${me.tier}</p></div>${icon('chev',18)}</button>
        <button class="lrow" data-nav="request"><div class="tile t-gold">${icon('qr',18)}</div>
          <p class="t2 grow">My CASAIPAY ID &amp; QR</p>${icon('chev',18)}</button>
        <button class="lrow" data-act="withdraw"><div class="tile t-navy">${icon('cash',18)}</div>
          <p class="t2 grow">Withdraw money</p>${icon('chev',18)}</button>
        <button class="lrow" data-act="bills"><div class="tile t-blush">${icon('zap',18)}</div>
          <p class="t2 grow">Bills, airtime &amp; flights</p>${icon('chev',18)}</button>
        <button class="lrow" data-act="bens"><div class="tile t-mint">${icon('face',18)}</div>
          <div class="grow"><p class="t2">Beneficiaries</p>
            <p class="b2 mt4">${(me.beneficiaries||[]).length} enrolled for cash pickup</p></div>${icon('chev',18)}</button>
      </div>
      <p class="cap" style="padding:20px 4px 8px">Preferences</p>
      <div class="rows">
        <div class="lrow"><div class="tile t-gold">${icon('bellring',18)}</div><p class="t2 grow">Notifications</p>
          <span class="pill p-mint">On</span></div>
        <button class="lrow" data-act="lang"><div class="tile t-blush">${icon('globe',18)}</div>
          <div class="grow"><p class="t2">Language</p><p class="b2">English</p></div>${icon('chev',18)}</button>
        <button class="lrow" data-act="help"><div class="tile t-navy">${icon('help',18)}</div>
          <p class="t2 grow">Help &amp; support</p>${icon('chev',18)}</button>
      </div>
      <div class="rows mt20">
        <button class="lrow" data-act="merchant"><div class="tile t-gold">${icon('store',18)}</div>
          <p class="t2 grow">Open the merchant app</p>${icon('chev',18)}</button>
      </div>
      <button class="btn btn-ghost mt16 dang" data-act="out" style="color:var(--danger)">Sign out</button>
      <div style="height:20px"></div>
    </div>${navBar('profile')}</div>`; },
  mount(r){
    const me=S.me;
    $('[data-act="security"]',r).onclick=()=>go('security');
    $('[data-act="distress"]',r).onclick=()=>go('distress');
    $('[data-act="pass"]',r).onclick=()=>go('change-passcode');
    $('[data-act="limits"]',r).onclick=()=>go('limits');
    $('[data-act="withdraw"]',r).onclick=()=>go('withdraw');
    $('[data-act="bills"]',r).onclick=()=>go('bills');
    $('[data-act="bens"]',r).onclick=()=>go('beneficiaries');
    $('[data-act="merchant"]',r).onclick=()=>{ S.state.session.app='merchant'; S.save(); location.hash='#/m/home'; };
    $$('[data-act="photo"]',r).forEach(b=>b.onclick=()=>changePhotoSheet(S.me));
    $('[data-act="lang"]',r).onclick=()=>sheet(`<p class="t1 ctr">Language</p><div class="rows mt16">
      ${['English','Hausa','Igbo','Yorùbá'].map((l,i)=>`<button class="lrow" data-close><p class="t2 grow">${l}</p>
        ${i===0?`<span style="color:var(--success)">${icon('check',20,3)}</span>`:''}</button>`).join('')}</div>`);
    $('[data-act="help"]',r).onclick=()=>toast('Support is stubbed in this prototype');
    $('[data-act="out"]',r).onclick=()=>confirmSheet({title:'Sign out?',body:'You can sign back in with your passcode.',ok:'Sign out',
      onOk(){ S.state.session.signedIn=false; S.save(); go('login'); }});
  }
};

SCREENS['face-enrol-settings'] = {
  render(){ return `<div class="screen">${appbar('Set up Face ID')}
    <div class="scroll" style="display:flex;flex-direction:column;justify-content:center">
      ${faceHTML('Position your face in the circle')}
      <p class="b1 ctr mt16">Hold your phone at eye level in good light.</p>
    </div>
    <div class="footer"><button class="btn btn-gold" data-act="scan">Capture my face</button></div></div>`; },
  async mount(r){ await startCamera(r);
    $('[data-act="scan"]',r).onclick=e=>{ e.target.disabled=true;
      const frame = () => grabFrame(r);
      runScan(r,{steps:['Hold still','Saving your face…'],onDone(){
        const shot = frame(); stopCamera(r);
        S.me.faceEnrolled=true;
        if(shot) S.me.photo = shot;                 // the enrolment still becomes the profile photo
        S.save(); toast('Face ID is active'); go('profile'); }}); }; }
};

SCREENS['change-passcode'] = {
  render(){ return `<div class="screen">${appbar('Change passcode')}
    ${passcodePad({title:'Enter your current passcode'})}</div>`; },
  mount(r){ bindPasscode(r,(code,fail)=>{ if(code===S.me.passcode) go('new-passcode'); else { toast('Wrong passcode'); fail(); } }); }
};
SCREENS['new-passcode'] = {
  render(){ return `<div class="screen">${appbar('New passcode')}
    ${passcodePad({title:'Choose a new passcode'})}</div>`; },
  mount(r){ bindPasscode(r,code=>{ S.me.passcode=code; S.save(); toast('Passcode updated'); go('profile'); }); }
};

SCREENS['limits'] = {
  render(){ const me=S.me; const tiers=[
    {n:1,limit:'₦50,000 daily',need:'Phone number + NIN'},
    {n:2,limit:'₦200,000 daily',need:'Face ID enrolled'},
    {n:3,limit:'₦5,000,000 daily',need:'Address verification'}];
    return `<div class="screen">${appbar('Limits & tier')}
    <div class="scroll">
      <div class="card tint"><p class="cap">Your tier</p><p class="d2 mt4">Tier ${me.tier}</p>
        <p class="b1 mt8">You can move up to ${tiers[me.tier-1].limit}.</p></div>
      <p class="cap" style="padding:20px 4px 8px">All tiers</p>
      <div class="rows">${tiers.map(t=>`<div class="lrow">
        <div class="tile ${t.n<=me.tier?'t-mint':'t-grey'}" ${t.n>me.tier?'style="background:var(--surface-sunk);color:var(--ink-3)"':''}>
          ${t.n<=me.tier?icon('check',18,3):`<span style="font-weight:700">${t.n}</span>`}</div>
        <div class="grow"><p class="t2">Tier ${t.n} · ${t.limit}</p><p class="b2 mt4">${t.need}</p></div>
        ${t.n===me.tier?'<span class="pill p-mint">Current</span>':''}</div>`).join('')}</div>
    </div></div>`; }
};
