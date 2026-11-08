const $=i=>document.getElementById(i);
const R=document.documentElement;
const isDark=()=>(R.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark';
const SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>';
const paintTheme=()=>{const d=isDark();$('theme').innerHTML=d?SUN:MOON;$('theme').setAttribute('aria-label',d?'Switch to light theme':'Switch to dark theme')};
try{const s=localStorage.getItem('ironforge-theme');if(s)R.dataset.theme=s}catch(e){}
paintTheme();
$('theme').onclick=()=>{const t=isDark()?'light':'dark';R.dataset.theme=t;try{localStorage.setItem('ironforge-theme',t)}catch(e){}paintTheme()};
$('burger').onclick=()=>$('menu').classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>$('menu').classList.remove('open'));

// Equipment: [image file, name, description, focus]
const EQ=[
['dumbbell','Dumbbells','Hex sets from 2 to 50 kg with full racks.','Full body'],
['barbell','Olympic barbells','20 kg bars, bumper plates and four lifting platforms.','Strength'],
['kettlebell','Kettlebells','Cast-iron bells from 4 to 32 kg.','Power'],
['treadmill','Treadmills','Twelve machines with incline up to 15%.','Cardio'],
['bench','Power racks and benches','Safety arms and adjustable benches.','Chest and shoulders'],
['battle-rope','Battle ropes','15 m heavy ropes next to the sled lane.','Conditioning'],
['cable-machine','Cable machines','Dual-stack towers with smooth pulleys.','Isolation work'],
['weight-plates','Weight plates','Calibrated plates from 1.25 to 25 kg.','Progressive load']];
const img=n=>`images/${n}.svg`;
$('eq').innerHTML=EQ.map(([f,n,d,t])=>`<article class="card"><div class="im"><img src="${img(f)}" alt="${n}" width="800" height="600" loading="lazy"></div><div class="tx"><h3>${n}</h3><p>${d}</p><small>${t}</small></div></article>`).join('');

// Hero image slideshow
$('stage').insertAdjacentHTML('afterbegin',EQ.map(([f,n],i)=>`<img src="${img(f)}" alt="${n}"${i?'':' class="on"'}>`).join(''));
let k=0;const im=$('stage').querySelectorAll('img');
const cap=()=>$('cap').textContent=EQ[k][1];cap();
setInterval(()=>{im[k].classList.remove('on');k=(k+1)%im.length;im[k].classList.add('on');cap()},3200);

const CC={Push:'var(--c1)',Pull:'var(--c2)',Legs:'var(--c3)',Core:'var(--c4)',Cardio:'var(--c5)'};
$('chips').innerHTML=['All','Push','Pull','Legs','Core','Cardio'].map((c,i)=>`<button class="chip${i?'':' on'}" type="button" data-c="${c}">${c}</button>`).join('');
$('exs').innerHTML='<div class="ex hd"><span></span><span>Exercise</span><span>Focus</span><span>Level</span><span>Sets and reps</span><span>Form cue</span></div>'+[
['bench','Barbell bench press','Push','Intermediate','4 × 6–8','Shoulder blades back, lower to mid-chest, press in a slight arc.'],
['dumbbell','Dumbbell shoulder press','Push','Beginner','3 × 10–12','Ribs down, press straight up, stop just short of lockout.'],
['barbell','Deadlift','Pull','Advanced','3 × 3–5','Bar close to shins, flat back, push the floor away.'],
['cable-machine','Seated cable row','Pull','Beginner','3 × 12','Chest tall, pull to the belly button, squeeze your shoulder blades.'],
['kettlebell','Kettlebell swing','Legs','Intermediate','4 × 15','Snap the hips and let the bell float to chest height.'],
['treadmill','Treadmill intervals','Cardio','Beginner','8 × 1 min','Run hard for one minute, walk for one minute, and repeat.'],
['battle-rope','Battle rope waves','Cardio','Intermediate','5 × 30 sec','Soft knees, brace your core and make big, fast waves.'],
['weight-plates','Plate Russian twist','Core','Beginner','3 × 20','Lean back, lift your feet, and rotate from the ribs.']
].map(([f,n,c,l,s,t])=>`<article class="ex" data-c="${c}"><img src="${img(f)}" alt="" loading="lazy"><h3>${n}</h3><span class="dt" style="--c:${CC[c]}">${c}</span><span class="lv">${l}</span><span class="lv">${s}</span><p>${t}</p></article>`).join('');
$('chips').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===b));const c=b.dataset.c;document.querySelectorAll('#exs .ex:not(.hd)').forEach(r=>{r.hidden=c!=='All'&&r.dataset.c!==c})};

$('week').innerHTML=[['Mon','06:30','Iron HIIT','linear-gradient(135deg,#522B5B,#854F6C)','#FBE4DB'],['Tue','07:00','Yoga flow','linear-gradient(135deg,#854F6C,#B2828F)','#FBE4DB'],['Wed','18:00','Spin burn','linear-gradient(135deg,#DFB6B2,#FBE4DB)','#190019'],['Thu','19:00','Boxing fit','linear-gradient(135deg,#2B124C,#522B5B)','#FBE4DB'],['Fri','08:00','Pilates core','linear-gradient(135deg,#854F6C,#B2828F)','#FBE4DB'],['Sat','09:00','CrossFit WOD','linear-gradient(135deg,#522B5B,#854F6C)','#FBE4DB']].map(([d,t,n,c,x])=>`<div class="day"><p class="dy">${d}</p><div class="cl" style="--c:${c};--t:${x}"><b>${n}</b><small>${t}</small></div></div>`).join('');

$('co').innerHTML=[['RC','Ryan Carter','Strength coach, 10 years','linear-gradient(135deg,#522B5B,#854F6C)','#FBE4DB'],['MC','Mia Chen','Yoga and mobility, 8 years','linear-gradient(135deg,#2B124C,#522B5B)','#FBE4DB'],['LS','Leo Santos','HIIT and boxing, 6 years','linear-gradient(135deg,#DFB6B2,#FBE4DB)','#190019']].map(([a,n,r,c,x])=>`<div class="co"><div class="av" style="--c:${c};--t:${x}">${a}</div><h3>${n}</h3><p>${r}</p></div>`).join('');

const fmt=n=>'Rs '+n.toLocaleString('en-US');
const PR={Basic:[4000,3200],Pro:[7000,5600],Elite:[12000,9600]};let Y=0;
const plans=y=>{Y=y;$('plans').innerHTML=[['Basic',['Gym floor access','Lockers and showers','Two group classes a week']],['Pro',['24/7 access','Unlimited group classes','One personal training session a month'],1],['Elite',['Everything in Pro','Unlimited personal training','Nutrition plan and recovery zone']]].map(([n,f,h])=>`<div class="pl${h?' hot':''}">${h?'<p class="mp">Most popular</p>':''}<h3>${n}</h3><div class="pn">${fmt(PR[n][y])}<small>per month</small></div><ul>${f.map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn${h?'':' line'}" href="#join" data-plan="${n}">Choose ${n}</a></div>`).join('')};
plans(0);
$('plans').onclick=e=>{const a=e.target.closest('[data-plan]');if(a)$('pn').value=a.dataset.plan};
document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.seg button').forEach(x=>x.classList.toggle('on',x===b));plans(+b.dataset.y)});

const bmi=()=>{const h=$('ht').value/100,w=+$('wt').value;if(!(h>0&&w>0)){$('bv').textContent='--';$('bc').textContent='Enter a height and weight';return}const b=w/(h*h);$('bv').textContent=b.toFixed(1);$('bc').textContent=b<18.5?'Underweight':b<25?'Healthy range':b<30?'Overweight':'Obese range';$('mk').style.left=Math.min(100,Math.max(0,(b-15)/25*100))+'%'};
$('calc').onclick=bmi;bmi();


const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,n=+el.dataset.n,st=Math.ceil(n/60);let c=0;const f=()=>{c=Math.min(n,c+st);el.textContent=c.toLocaleString('en-US');if(c<n)requestAnimationFrame(f)};f()}));
document.querySelectorAll('[data-n]').forEach(el=>io.observe(el));

/* ===== join + payment ===== */
const PAYN={easypaisa:'Easypaisa',jazzcash:'JazzCash',cash:'Cash at the gym'},NUM={easypaisa:'0332-3556402',jazzcash:'0315-9262470'},WA='923009260391';
let db=null,member=null,billY=0;
if(window.FIREBASE_CONFIG&&window.firebase){firebase.initializeApp(FIREBASE_CONFIG);db=firebase.firestore()}
const amount=()=>PR[member.plan][billY]*(billY?12:1);
const method=()=>document.querySelector('input[name="pm"]:checked').value;
function payUI(){
  const amt=amount(),m=method(),w=m!=='cash';
  $('pmName').textContent=member.name;$('pmPlan').textContent=member.plan;
  document.querySelectorAll('#bill button').forEach(b=>b.classList.toggle('on',+b.dataset.y===billY));
  $('amtLbl').textContent=billY?'Total for 12 months':'First month';$('amtVal').textContent=fmt(amt);
  $('wallet').hidden=!w;$('cashNote').hidden=w;
  if(w){const q=$('wq');q.style.display='';q.src='images/payment/'+m+'-qr.png';q.onerror=()=>{q.style.display='none'};$('wNum').textContent=NUM[m];$('wAmt').textContent=fmt(amt)}
}
$('form').onsubmit=e=>{e.preventDefault();member={name:$('nm').value.trim(),email:$('em').value.trim(),plan:$('pn').value};billY=Y;$('err').textContent='';$('form').hidden=true;$('pay').hidden=false;payUI();$('join').scrollIntoView({behavior:'smooth'})};
$('bill').onclick=e=>{const b=e.target.closest('button');if(!b)return;billY=+b.dataset.y;payUI()};
document.querySelectorAll('input[name="pm"]').forEach(r=>r.onchange=payUI);
$('back').onclick=()=>{$('pay').hidden=true;$('form').hidden=false};
$('confirm').onclick=async()=>{
  const m=method(),trx=$('trx').value.trim(),err=$('err');err.textContent='';
  if(m!=='cash'&&!trx){err.textContent='Please enter the transaction ID.';return}
  const o={id:'M'+Date.now().toString(36).toUpperCase(),member:{name:member.name,email:member.email},plan:member.plan,billing:billY?'Yearly':'Monthly',amount:amount(),payment:m,trx:m==='cash'?'':trx,status:'Pending'};
  const b=$('confirm');b.disabled=true;
  try{
    if(db)await db.collection('gymMembers').doc(o.id).set({...o,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    else{const l=JSON.parse(localStorage.getItem('if_members')||'[]');l.push(o);localStorage.setItem('if_members',JSON.stringify(l))}
    const t=encodeURIComponent('Hello IRONFORGE, I joined the '+o.plan+' plan ('+o.billing+'), membership '+o.id+'.');
    $('pay').hidden=true;const d=$('done');d.hidden=false;
    d.innerHTML=`<h3>Welcome, ${o.member.name.split(' ')[0]}</h3><p class="ok">Membership ${o.id} received</p><p>${o.plan} plan, ${o.billing.toLowerCase()}. Total <b>${fmt(o.amount)}</b> (${PAYN[m]}). We will email you at ${o.member.email} to confirm.${m==='cash'?' Please pay at the front desk to start.':''}</p>${db?'':'<p class="err">Demo mode: Firebase is not connected yet, so the gym cannot see this membership.</p>'}<a class="btn" href="https://wa.me/${WA}?text=${t}" target="_blank" rel="noopener">Confirm on WhatsApp</a>`;
    $('form').reset();$('trx').value='';
  }catch(x){console.error(x);err.textContent='We could not complete your membership. Please try again.'}
  b.disabled=false};

/* ===== Effects: reveal, progress bar, cursor glow, scroll spy, ripple, card glow ===== */
document.body.insertAdjacentHTML('afterbegin','<div class="pg" id="pg"></div><div class="cg" id="cg"></div>');
document.querySelectorAll('.sh,.card,.day,.co,.pl,.st,.res,.form').forEach(e=>e.classList.add('rv'));
const rvo='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting)return;rvo.unobserve(en.target);
  const i=[...en.target.parentElement.children].indexOf(en.target)%4;
  setTimeout(()=>en.target.classList.add('in'),i*80);
}),{threshold:.1,rootMargin:'0px 0px -40px 0px'}):null;
document.querySelectorAll('.rv').forEach(e=>rvo?rvo.observe(e):e.classList.add('in'));

const pg=$('pg');
addEventListener('scroll',()=>{const h=R,m=h.scrollHeight-h.clientHeight;pg.style.transform='scaleX('+(m>0?scrollY/m:0)+')'},{passive:true});

const cg=$('cg');
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;cg.classList.add('on');cg.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'});
document.addEventListener('pointerleave',()=>cg.classList.remove('on'));

const heroEl=document.querySelector('.hero');
heroEl.addEventListener('pointermove',e=>{const r=heroEl.getBoundingClientRect();heroEl.style.setProperty('--mx',e.clientX-r.left+'px');heroEl.style.setProperty('--my',e.clientY-r.top+'px')});

document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--gx',e.clientX-r.left+'px');c.style.setProperty('--gy',e.clientY-r.top+'px')});

document.addEventListener('pointerdown',e=>{
  const b=e.target.closest('.btn');if(!b)return;
  const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height),s=document.createElement('span');
  s.className='rip';s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
  b.append(s);setTimeout(()=>s.remove(),650);
});

const links=[...document.querySelectorAll('#menu a')],secs=links.map(a=>document.querySelector(a.getAttribute('href')));
if('IntersectionObserver' in window){const spy=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)links.forEach((a,i)=>a.classList.toggle('on',secs[i]===en.target))}),{rootMargin:'-45% 0px -50% 0px'});secs.forEach(s=>s&&spy.observe(s))}
