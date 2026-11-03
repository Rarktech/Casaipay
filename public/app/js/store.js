/* ============================================================
   CASAIPAY — Store. One localStorage object shared by both apps.
   ============================================================ */
const KEY = 'casaipay_demo_v1';

const now = () => new Date().toISOString();
const ago = m => new Date(Date.now() - m * 60000).toISOString();
const ref = () => 'TXN-' + Array.from({length:6},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join('');

const SEED = {
  session: { app:'user', user:'chidi', signedIn:false, seenOnboarding:false, hideBalance:false, forceFail:false, forceDuressFace:false },
  users: {
    chidi: { username:'chidi', name:'Chidi Okafor', first:'Chidi', phone:'08031234567', nin:'12345678901',
      balance:47500, faceEnrolled:true, passcode:'1234', tier:2, initials:'CO',
      authMode:'either', decoyBalance:null, decoyPasscode:null, decoyFace:false, duressActive:false,
      virtualAcct:'9014772301', virtualBank:'CASAIPAY (Wema)',
      beneficiaries:[{id:'BEN-4KD91X',name:'Ngozi Okafor',phone:'08155512345',relation:'Mother',
        photo:null,faceEnrolled:true,ts:ago(4000)}],
      txns:[
        {id:'TXN-8F2K91',type:'debit',channel:'merchant',party:'Mama Ngozi Stores',detail:'@mamangozi',amount:3500,fee:0,remark:'Provisions',status:'successful',method:'face',ts:ago(38)},
        {id:'TXN-2QW7LP',type:'credit',channel:'casaipay',party:'Musa Ibrahim',detail:'@musa',amount:10000,fee:0,remark:'Balance for the generator',status:'successful',method:'face',ts:ago(65)},
        {id:'TXN-9MZ3TR',type:'debit',channel:'bank',party:'Adaeze Nkem Okonkwo',detail:'GTBank · 0123456789',amount:5000,fee:0,remark:'',status:'successful',method:'passcode',ts:ago(1500)},
        {id:'TXN-5HD8KA',type:'credit',channel:'topup',party:'Bank transfer',detail:'CASAIPAY (Wema)',amount:25000,fee:0,remark:'',status:'successful',method:'',ts:ago(2900)}
      ],
      notifs:[
        {icon:'store',tint:'t-gold',title:'Payment to Mama Ngozi Stores',body:'₦3,500.00 paid with Face ID',ts:ago(38),unread:true},
        {icon:'down',tint:'t-mint',title:'Money in from Musa Ibrahim',body:'₦10,000.00 landed in your CASAIPAY account',ts:ago(65),unread:true},
        {icon:'shield',tint:'t-navy',title:'Face ID is active',body:'You can now pay at any CASAIPAY shop',ts:ago(2800),unread:false}
      ]
    },
    amaka: { username:'amaka', name:'Amaka Eze', first:'Amaka', phone:'08129876543', nin:'23456789012',
      balance:3200, faceEnrolled:false, passcode:'1234', tier:1, initials:'AE',
      authMode:'either', decoyBalance:null, decoyPasscode:null, decoyFace:false, duressActive:false,
      virtualAcct:'9014772302', virtualBank:'CASAIPAY (Wema)', beneficiaries:[], txns:[], notifs:[] },
    musa: { username:'musa', name:'Musa Ibrahim', first:'Musa', phone:'07066554433', nin:'34567890123',
      balance:128900, faceEnrolled:true, passcode:'1234', tier:3, initials:'MI',
      authMode:'either', decoyBalance:null, decoyPasscode:null, decoyFace:false, duressActive:false,
      virtualAcct:'9014772303', virtualBank:'CASAIPAY (Wema)', beneficiaries:[], txns:[], notifs:[] }
  },
  merchant: { id:'mamangozi', name:'Mama Ngozi Stores', owner:'Ngozi Uche', initials:'MN',
    location:'Ariaria Market, Aba', balance:86300, passcode:'1234', agentMode:true,
    bank:{name:'Zenith Bank',acct:'1234567890',holder:'NGOZI UCHE'},
    txns:[
      {id:'TXN-8F2K91',type:'credit',channel:'merchant',party:'Chidi Okafor',detail:'@chidi',amount:3500,remark:'Provisions',status:'successful',method:'face',ts:ago(38)},
      {id:'TXN-4RT6YU',type:'credit',channel:'merchant',party:'Musa Ibrahim',detail:'@musa',amount:12000,remark:'Wholesale bag of rice',status:'successful',method:'face',ts:ago(65)},
      {id:'TXN-7PL2SD',type:'credit',channel:'merchant',party:'Amaka Eze',detail:'@amaka',amount:900,remark:'Recharge card',status:'successful',method:'passcode',ts:ago(140)},
      {id:'TXN-1KJ9NB',type:'credit',channel:'merchant',party:'Chidi Okafor',detail:'@chidi',amount:8100,remark:'',status:'successful',method:'face',ts:ago(300)}
    ]
  },
  agents:[
    {name:'Chuka Provisions',address:'12 Faulks Road, Aba',distance:'220 m',open:true,x:32,y:30},
    {name:'Blessing Cosmetics',address:'Shop 4, Ariaria Market',distance:'600 m',open:true,x:74,y:58},
    {name:'Kelvin Electronics',address:"St Michael's Road, Aba",distance:'1.4 km',open:false,x:22,y:76}
  ],
  claims:[ {code:'7K2M4Q',amount:20000,agent:'Chuka Provisions',kind:'self',from:'chidi',
    beneficiary:null,otp:null,txnId:null,status:'pending',ts:ago(180)} ],
  requests:[
    {id:'REQ-001',from:'amaka',to:'chidi',amount:2500,note:'Groundnut supply',status:'pending',ts:ago(12)}
  ],
  banks:['Access Bank','Ecobank','Fidelity Bank','First Bank','FCMB','GTBank','Kuda MFB','Moniepoint MFB','OPay','PalmPay','Polaris Bank','Providus Bank','Stanbic IBTC','Sterling Bank','UBA','Union Bank','Wema Bank','Zenith Bank'],
  namePool:['ADAEZE NKEM OKONKWO','IBRAHIM SULEIMAN BELLO','FUNKE ADEBAYO OGUNDIMU','EMEKA CHUKWUEMEKA NWOSU','HALIMA YUSUF DANJUMA'],
  freeTransfers:3,
  duressLog:[],
  billers:{
    airtime:{label:'Airtime',icon:'phone',tint:'t-gold',field:'Phone number',ph:'0803 123 4567',kind:'phone',
      options:['MTN','Airtel','Glo','9mobile'],chips:[100,200,500,1000,2000,5000]},
    data:{label:'Data',icon:'globe',tint:'t-navy',field:'Phone number',ph:'0803 123 4567',kind:'phone',
      options:['MTN','Airtel','Glo','9mobile'],
      bundles:[['500MB · 1 day',350],['1.5GB · 7 days',1000],['4.5GB · 30 days',2000],['10GB · 30 days',4000]]},
    power:{label:'Electricity',icon:'zap',tint:'t-blush',field:'Meter number',ph:'04512345678',kind:'meter',
      options:['Ikeja Electric','Eko Electric','Abuja (AEDC)','Port Harcourt (PHED)','Enugu (EEDC)','Kaduna Electric'],
      chips:[1000,2000,5000,10000,20000,50000]},
    tv:{label:'TV',icon:'card',tint:'t-mint',field:'Smartcard number',ph:'1234567890',kind:'meter',
      options:['DStv','GOtv','StarTimes'],
      bundles:[['GOtv Smallie',1900],['GOtv Jinja',3900],['DStv Yanga',6000],['DStv Compact',15700]]},
    water:{label:'Water',icon:'cash',tint:'t-navy',field:'Account number',ph:'LWC0012345',kind:'meter',
      options:['Lagos Water Corporation','Abuja Water Board'],chips:[2000,5000,10000,15000,20000,30000]},
    internet:{label:'Internet',icon:'globe',tint:'t-gold',field:'Account ID',ph:'SPN0012345',kind:'meter',
      options:['Spectranet','Smile','FiberOne'],
      bundles:[['20GB · 30 days',9000],['50GB · 30 days',15000],['Unlimited · 30 days',25000]]},
    betting:{label:'Betting',icon:'zap',tint:'t-blush',field:'User ID',ph:'1234567',kind:'meter',
      options:['Bet9ja','SportyBet','BetKing','1xBet'],chips:[500,1000,2000,5000,10000,20000]},
    school:{label:'School fees',icon:'help',tint:'t-mint',field:'Candidate number',ph:'12345678AB',kind:'meter',
      options:['WAEC','JAMB','NECO'],chips:[3500,5700,18000,27000,45000,60000]}
  },
  flights:[
    {from:'Lagos',to:'Abuja',airline:'Air Peace',time:'07:30 → 08:50',fare:128500},
    {from:'Lagos',to:'Abuja',airline:'Ibom Air',time:'11:15 → 12:35',fare:142000},
    {from:'Lagos',to:'Port Harcourt',airline:'Air Peace',time:'09:00 → 10:05',fare:118000},
    {from:'Abuja',to:'Kano',airline:'United Nigeria',time:'14:20 → 15:25',fare:96500},
    {from:'Lagos',to:'Enugu',airline:'Arik Air',time:'16:40 → 17:50',fare:134000}
  ]
};

const clone = o => JSON.parse(JSON.stringify(o));
let state = null;
const subs = [];

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    state = raw ? JSON.parse(raw) : clone(SEED);
  }catch(e){ state = clone(SEED); }
  return state;
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
  subs.forEach(f=>f(state));
}
function reset(){ state = clone(SEED); save(); }

window.addEventListener('storage', e=>{
  if(e.key===KEY && e.newValue){
    try{ state = JSON.parse(e.newValue); subs.forEach(f=>f(state)); }catch(_){}
  }
});

const S = {
  get state(){ return state || load(); },
  load, save, reset,
  sub(f){ subs.push(f); },
  get me(){ return S.state.users[S.state.session.user]; },
  get merchant(){ return S.state.merchant; },
  user(u){ return S.state.users[u]; },
  find(handle){
    const h = String(handle||'').replace(/^@/,'').toLowerCase().trim();
    if(S.state.users[h]) return S.state.users[h];
    return Object.values(S.state.users).find(u=>u.phone===h) || null;
  },
  ref,
  incomingRequests(){ return S.state.requests.filter(r=>r.to===S.state.session.user && r.status==='pending'); },

  /* ---- money movements ---- */
  topup(amount, channel, party){
    const me = S.me; me.balance += amount;
    const t = {id:ref(),type:'credit',channel:channel||'topup',party:party||'Bank transfer',detail:me.virtualBank,
      amount,fee:0,remark:'',status:'successful',method:'',ts:now()};
    me.txns.unshift(t);
    me.notifs.unshift({icon:'down',tint:'t-mint',title:'Money in',body:fmt(amount)+' added to your balance',ts:now(),unread:true});
    save(); return t;
  },
  sendToUser(toHandle, amount, remark, method){
    const me = S.me, to = S.find(toHandle);
    if(S.isDuress(me)){
      const id0 = ref(); me.decoyBalance -= amount;
      me.txns.unshift({id:id0,type:'debit',channel:'casaipay',party:to.name,detail:'@'+to.username,
        amount,fee:0,remark,status:'successful',method,ts:now(),duress:true});
      save(); return id0;
    }
    me.balance -= amount; to.balance += amount;
    const id = ref();
    me.txns.unshift({id,type:'debit',channel:'casaipay',party:to.name,detail:'@'+to.username,amount,fee:0,remark,status:'successful',method,ts:now()});
    to.txns.unshift({id,type:'credit',channel:'casaipay',party:me.name,detail:'@'+me.username,amount,fee:0,remark,status:'successful',method,ts:now()});
    to.notifs.unshift({icon:'down',tint:'t-mint',title:'Money in from '+me.name,body:fmt(amount)+' landed in your CASAIPAY account',ts:now(),unread:true});
    save(); return id;
  },
  sendToBank(acct, bank, name, amount, remark, method, fee){
    const me = S.me; me.balance -= (amount+fee);
    if(S.state.freeTransfers>0 && fee===0) S.state.freeTransfers--;
    const id = ref();
    me.txns.unshift({id,type:'debit',channel:'bank',party:name,detail:bank+' · '+acct,amount,fee,remark,status:'successful',method,ts:now()});
    save(); return id;
  },
  charge(handle, amount, note, method){
    const u = S.find(handle), m = S.merchant, id = ref();
    if(S.isDuress(u)){
      // distress unlock: the payment appears to complete against the decoy ledger only
      u.decoyBalance -= amount;
      u.txns.unshift({id,type:'debit',channel:'merchant',party:m.name,detail:m.location,
        amount,fee:0,remark:note,status:'successful',method,ts:now(),duress:true});
      save(); return id;
    }
    u.balance -= amount; m.balance += amount;
    u.txns.unshift({id,type:'debit',channel:'merchant',party:m.name,detail:m.location,amount,fee:0,remark:note,status:'successful',method,ts:now()});
    m.txns.unshift({id,type:'credit',channel:'merchant',party:u.name,detail:'@'+u.username,amount,remark:note,status:'successful',method,ts:now()});
    u.notifs.unshift({icon:'store',tint:'t-gold',title:'Payment to '+m.name,body:fmt(amount)+' paid with '+(method==='face'?'Face ID':'passcode'),ts:now(),unread:true});
    save(); return id;
  },
  withdrawBank(acct, bank, name, amount){
    const me = S.me; me.balance -= amount; const id = ref();
    me.txns.unshift({id,type:'debit',channel:'bank',party:name,detail:bank+' · '+acct,amount,fee:0,remark:'Withdrawal',status:'successful',method:'face',ts:now()});
    save(); return id;
  },
  withdrawAgent(amount, agent){
    const me = S.me, id = ref();
    if(S.isDuress(me)) me.decoyBalance -= amount; else me.balance -= amount;
    const code = Array.from({length:6},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join('');
    S.state.claims.unshift({code,amount,agent,kind:'self',from:me.username,
      beneficiary:null,otp:null,txnId:id,status:'pending',ts:now()});
    me.txns.unshift({id,type:'debit',channel:'pickup',party:agent||'Cash pickup',
      detail:'Waiting on code '+code,amount,fee:0,remark:'Waiting to be claimed',
      status:'pending',method:'face',ts:now()});
    save(); return code;
  },
  askFor(toHandle, amount, note){
    const to = S.find(toHandle);
    S.state.requests.unshift({id:'REQ-'+Math.floor(Math.random()*9000+1000),from:S.state.session.user,to:to.username,amount,note,status:'pending',ts:now()});
    save();
  },
  /* balance the UI should show — decoy while a distress unlock is active */
  viewBalance(u){ u = u || S.me; return (u.duressActive && u.decoyBalance!=null) ? u.decoyBalance : u.balance; },
  isDuress(u){ u = u || S.me; return !!(u && u.duressActive && u.decoyBalance!=null); },
  enterDuress(u){ u = u || S.me; u.duressActive = true;
    S.state.duressLog.unshift({user:u.username, ts:now()}); save(); },
  clearDuress(u){ u = u || S.me; u.duressActive=false; save(); },

  /* ---- beneficiaries ---- */
  addBeneficiary(name, phone, photo, relation){
    const me = S.me;
    const b = { id:'BEN-'+Array.from({length:6},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join(''),
      name, phone, relation:relation||'', photo:photo||null, faceEnrolled:true, ts:now() };
    me.beneficiaries = me.beneficiaries || [];
    me.beneficiaries.unshift(b);
    save(); return b;
  },
  beneficiariesFor(phone){
    const digits = String(phone||'').replace(/\D/g,'');
    return (S.me.beneficiaries||[]).filter(b=>b.phone.replace(/\D/g,'')===digits);
  },

  /* ---- cash pickup: money leaves the sender now, cash is released later ---- */
  createPickup(ben, amount, otp){
    const me = S.me, id = ref();
    const code = Array.from({length:6},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join('');
    if(S.isDuress(me)) me.decoyBalance -= amount; else me.balance -= amount;
    S.state.claims.unshift({ code, amount, kind:'beneficiary', from:me.username, agent:null,
      beneficiary:ben, otp:otp||null, txnId:id, status:'pending', ts:now() });
    me.txns.unshift({ id, type:'debit', channel:'pickup', party:ben.name,
      detail:'Cash pickup · '+ben.phone, amount, fee:0, remark:'Waiting to be claimed',
      status:'pending', method:'face', ts:now(), duress:S.isDuress(me) });
    save(); return code;
  },

  findClaim(code){
    const c = String(code||'').toUpperCase().trim();
    return S.state.claims.find(x=>x.code===c && x.status==='pending') || null;
  },
  claimant(c){
    return c.beneficiary || S.user(c.from);
  },
  /* the shop hands over physical cash and is credited the same amount in e-money */
  redeemClaim(code, method){
    const c = S.findClaim(code); if(!c) return null;
    const m = S.merchant, id = ref(), who = S.claimant(c);
    c.status='released'; c.releasedBy=m.name; c.releasedAt=now(); c.method=method;
    m.balance += c.amount;
    m.txns.unshift({ id, type:'credit', channel:'pickup', party:who.name,
      detail:'Cash pickup redeemed · '+c.code, amount:c.amount, remark:'Paid out in cash',
      status:'successful', method, ts:now() });
    const sender = S.user(c.from);
    if(sender){
      const t = sender.txns.find(x=>x.id===c.txnId);
      if(t){ t.status='successful'; t.remark='Claimed at '+m.name; t.method=method; }
      sender.notifs.unshift({ icon:'cash', tint:'t-mint', title:who.name+' collected the cash',
        body:fmt(c.amount)+' claimed at '+m.name, ts:now(), unread:true });
    }
    save(); return c;
  },

  payBill(biller, account, provider, amount, method, label){
    const me = S.me, id = ref();
    if(S.isDuress(me)) me.decoyBalance -= amount; else me.balance -= amount;
    me.txns.unshift({id,type:'debit',channel:'bill',party:provider,detail:label||account,
      amount,fee:0,remark:label||'',status:'successful',method,ts:now(),duress:S.isDuress(me)});
    save(); return id;
  },
  merchantPayBill(biller, account, provider, amount, label){
    const m = S.merchant, id = ref(); m.balance -= amount;
    m.txns.unshift({id,type:'debit',channel:'bill',party:provider,detail:label||account,
      amount,remark:label||'',status:'successful',method:'passcode',ts:now()});
    save(); return id;
  },
  merchantSendBank(acct, bank, name, amount){
    const m = S.merchant, id = ref(); m.balance -= amount;
    m.txns.unshift({id,type:'debit',channel:'bank',party:name,detail:bank+' · '+acct,
      amount,remark:'Transfer out',status:'successful',method:'passcode',ts:now()});
    save(); return id;
  },
  merchantSendUser(handle, amount, note){
    const m = S.merchant, u = S.find(handle), id = ref();
    m.balance -= amount; u.balance += amount;
    m.txns.unshift({id,type:'debit',channel:'casaipay',party:u.name,detail:'@'+u.username,
      amount,remark:note||'',status:'successful',method:'passcode',ts:now()});
    u.txns.unshift({id,type:'credit',channel:'casaipay',party:m.name,detail:m.location,
      amount,fee:0,remark:note||'',status:'successful',method:'',ts:now()});
    u.notifs.unshift({icon:'down',tint:'t-mint',title:'Money in from '+m.name,body:fmt(amount)+' landed in your CASAIPAY account',ts:now(),unread:true});
    save(); return id;
  },
  todaySales(){
    const start = new Date(); start.setHours(0,0,0,0);
    const t = S.merchant.txns.filter(x=>new Date(x.ts)>=start);
    return { total:t.reduce((a,b)=>a+b.amount,0), count:t.length };
  }
};

/* ---- formatting ---- */
function fmt(n){
  return '₦' + Number(n).toLocaleString('en-NG',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function fmtRich(n){
  const s = Number(n).toLocaleString('en-NG',{minimumFractionDigits:2,maximumFractionDigits:2});
  return '<span class="naira">₦</span>'+s;
}
function fmtShort(n){
  return '₦' + Number(n).toLocaleString('en-NG',{maximumFractionDigits:0});
}
function timeOf(ts){
  return new Date(ts).toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit',hour12:true});
}
function dayOf(ts){
  const d=new Date(ts), t=new Date(); t.setHours(0,0,0,0);
  const y=new Date(t); y.setDate(y.getDate()-1);
  if(d>=t) return 'Today';
  if(d>=y) return 'Yesterday';
  return d.toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'});
}
function fullDate(ts){
  return new Date(ts).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'})+', '+timeOf(ts);
}
S.load();
