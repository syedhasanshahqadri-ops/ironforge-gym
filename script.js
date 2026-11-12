const $=i=>document.getElementById(i);
const R=document.documentElement;
const isDark=()=>(R.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark';
const paintTheme=()=>{const d=isDark();$('theme').textContent=d?'☀':'☾';$('theme').setAttribute('aria-label',d?'Switch to light theme':'Switch to dark theme')};
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

const CC={Push:'var(--red)',Pull:'var(--blue)',Legs:'var(--grn)',Core:'var(--yel)',Cardio:'var(--pur)'};
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

$('week').innerHTML=[['Mon','06:30','Iron HIIT','var(--red)','#fff'],['Tue','07:00','Yoga flow','var(--grn)','#fff'],['Wed','18:00','Spin burn','var(--blue)','#fff'],['Thu','19:00','Boxing fit','var(--yel)','#0E0F12'],['Fri','08:00','Pilates core','var(--grn)','#fff'],['Sat','09:00','CrossFit WOD','var(--red)','#fff']].map(([d,t,n,c,x])=>`<div class="day"><p class="dy">${d}</p><div class="cl" style="--c:${c};--t:${x}"><b>${n}</b><small>${t}</small></div></div>`).join('');

$('co').innerHTML=[['RC','Ryan Carter','Strength coach, 10 years','var(--red)','#fff'],['MC','Mia Chen','Yoga and mobility, 8 years','var(--grn)','#fff'],['LS','Leo Santos','HIIT and boxing, 6 years','var(--yel)','#0E0F12']].map(([a,n,r,c,x])=>`<div class="co"><div class="av" style="--c:${c};--t:${x}">${a}</div><h3>${n}</h3><p>${r}</p></div>`).join('');

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
