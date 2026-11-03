/* ============================================================
   CASAIPAY — Router + demo panel
   ============================================================ */
let CURRENT = null;

function go(id){ location.hash = '#/u/' + id; }
function mgo(id){ location.hash = '#/m/' + id; }
function back(){ history.back(); }

function parseHash(){
  const h = location.hash.replace(/^#\/?/,'').split('/');
  if(h[0]!=='u' && h[0]!=='m') return null;
  return { app:h[0], id:h[1]||'home' };
}

function rerender(){ paint(parseHash(), true); }

function paint(route, silent){
  if(!route) return;
  const root = document.getElementById('app');

  // clean up whatever was mounted
  if(CURRENT){
    stopCamera(CURRENT);
    if(CURRENT._timer) clearInterval(CURRENT._timer);
    if(CURRENT._cleanup) { try{ CURRENT._cleanup(); }catch(_){} }
  }
  closeAllSheets();

  const table = route.app==='m' ? MSCREENS : SCREENS;
  const screen = table[route.id];
  if(!screen){ location.hash = route.app==='m' ? '#/m/home' : '#/u/home'; return; }

  document.body.classList.toggle('warm', ['home','sent','charge-done','signup-done','request'].includes(route.id));

  root.innerHTML = screen.render() || '';
  const el = root.firstElementChild;
  if(!el){ location.hash = route.app==='m' ? '#/m/home' : '#/u/home'; return; }
  CURRENT = el;
  screen.mount && screen.mount(el);

  // global handlers
  el.querySelectorAll('[data-act="back"], [data-act="mback"]').forEach(b=>b.onclick=()=>history.back());
  el.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>go(b.dataset.nav));
  el.querySelectorAll('[data-mnav]').forEach(b=>b.onclick=()=>mgo(b.dataset.mnav));
  el.querySelectorAll('[data-act="txn"]').forEach(b=>b.onclick=()=>{
    const t = S.me.txns.find(x=>x.id===b.dataset.id); if(t) receiptSheet(t); });

  root.scrollTop = 0;
  S.state.session.app = route.app==='m' ? 'merchant' : 'user';
}

window.addEventListener('hashchange', ()=>paint(parseHash()));

/* ---------------- Demo panel ---------------- */
function demoPanel(){
  const st=S.state;
  sheet(`<p class="t1 ctr">Demo controls</p>
    <p class="b2 ctr mt8">Presenter tools — not part of the product.</p>
    <p class="cap mt24">Open</p>
    <div class="rows mt8">
      <button class="lrow" data-d="user"><div class="tile t-gold">${icon('phone',18)}</div>
        <p class="t2 grow">Customer app</p>${icon('chev',18)}</button>
      <button class="lrow" data-d="merchant"><div class="tile t-navy">${icon('store',18)}</div>
        <p class="t2 grow">Merchant app</p>${icon('chev',18)}</button>
      <button class="lrow" data-d="onboarding"><div class="tile t-mint">${icon('zap',18)}</div>
        <p class="t2 grow">Onboarding from the start</p>${icon('chev',18)}</button>
    </div>
    <p class="cap mt20">Signed in as</p>
    <div class="rows mt8">${Object.values(st.users).map(u=>`<button class="lrow" data-u="${u.username}">
      ${avatar(u.initials,u.faceEnrolled?'ring':'')}
      <div class="grow"><p class="t2">${u.name}</p><p class="b2">@${u.username} · ${fmt(u.balance)}</p></div>
      ${u.username===st.session.user?`<span style="color:var(--success)">${icon('check',20,3)}</span>`:''}</button>`).join('')}</div>
    <p class="cap mt20">Tools</p>
    <div class="rows mt8">
      <button class="lrow" data-d="topup"><div class="tile t-mint">${icon('plus',18)}</div>
        <p class="t2 grow">Add ₦25,000 to this account</p></button>
      <button class="lrow" data-d="duressface"><div class="tile ${st.session.forceDuressFace?'t-dang':'t-grey'}"
        ${!st.session.forceDuressFace?'style="background:var(--surface-sunk);color:var(--ink-3)"':''}>${icon('face',18)}</div>
        <div class="grow"><p class="t2">Next face scan = distress face</p>
          <p class="b2">Opens the decoy balance instead</p></div>
        <span class="pill ${st.session.forceDuressFace?'p-dang':'p-grey'}">${st.session.forceDuressFace?'Armed':'Off'}</span></button>
      ${S.isDuress()?`<button class="lrow" data-d="cleardur"><div class="tile t-dang">${icon('refresh',18)}</div>
        <div class="grow"><p class="t2" style="color:var(--danger)">Distress unlock is active</p>
          <p class="b2">Showing ${fmt(S.me.decoyBalance)} · real balance ${fmt(S.me.balance)}</p></div></button>`:''}
      <button class="lrow" data-d="fail"><div class="tile ${st.session.forceFail?'t-dang':'t-grey'}"
        ${!st.session.forceFail?'style="background:var(--surface-sunk);color:var(--ink-3)"':''}>${icon('x',18)}</div>
        <div class="grow"><p class="t2">Force face verification to fail</p>
          <p class="b2">Shows the fallback paths</p></div>
        <span class="pill ${st.session.forceFail?'p-dang':'p-grey'}">${st.session.forceFail?'On':'Off'}</span></button>
      <button class="lrow" data-d="reset"><div class="tile t-dang">${icon('refresh',18)}</div>
        <p class="t2 grow" style="color:var(--danger)">Reset all demo data</p></button>
    </div>
    <button class="btn btn-ghost mt16" data-close>Close</button>`,
  { onMount(s){
      s.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{
        st.session.user=b.dataset.u; S.save(); closeSheet(); go('home'); });
      s.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{
        const d=b.dataset.d;
        if(d==='user'){ closeSheet(); go('home'); }
        if(d==='merchant'){ closeSheet(); mgo('home'); }
        if(d==='onboarding'){ closeSheet(); go('onboarding'); }
        if(d==='topup'){ S.topup(25000,'topup','Demo top-up'); closeSheet(); toast('₦25,000 added'); rerender(); }
        if(d==='fail'){ st.session.forceFail=!st.session.forceFail; S.save(); closeSheet(); demoPanel(); }
        if(d==='duressface'){ st.session.forceDuressFace=!st.session.forceDuressFace; S.save(); closeSheet(); demoPanel(); }
        if(d==='cleardur'){ S.clearDuress(); closeSheet(); toast('Distress unlock cleared'); rerender(); }
        if(d==='reset'){ S.reset(); closeSheet(); toast('Demo data reset'); location.hash='#/u/onboarding'; setTimeout(()=>location.reload(),400); }
      });
  }});
}

/* ---------------- Boot ---------------- */
(function boot(){
  document.getElementById('demo-fab').onclick = demoPanel;

  if(new URLSearchParams(location.search).get('reset')==='1'){ S.reset(); }

  // Give every account a portrait on first run and persist it to localStorage.
  // Camera stills and uploads replace these later.
  (function seedPortraits(){
    let changed = false;
    Object.values(S.state.users).forEach(u=>{
      if(!u.photo){ u.photo = portraitURI(u.username); changed = true; }
      (u.beneficiaries||[]).forEach(b=>{
        if(!b.photo){ b.photo = portraitURI(b.name); changed = true; }
      });
    });
    const m = S.merchant;
    if(!m.photo){ m.photo = portraitURI(m.owner, 'gele'); changed = true; }
    if(changed) S.save();
  })();

  if(!location.hash || !parseHash()){
    const st=S.state;
    if(st.session.app==='merchant') location.hash='#/m/home';
    else if(!st.session.seenOnboarding) location.hash='#/u/onboarding';
    else if(!st.session.signedIn) location.hash='#/u/login';
    else location.hash='#/u/home';
  }
  paint(parseHash());

  // keep both apps in sync across tabs
  S.sub(()=>{ /* store already re-saved; screens re-read on next paint */ });
  window.addEventListener('storage', ()=>{
    const r=parseHash();
    if(r && ['home','txns','activity','profile'].includes(r.id)) rerender();
    if(r && r.app==='m' && ['home','payments'].includes(r.id)) rerender();
  });
})();
