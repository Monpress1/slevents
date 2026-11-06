const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const page=document.body.dataset.p;
$('#yr').textContent=new Date().getFullYear();
$$('nav a[data-p]').forEach(a=>a.classList.toggle('on',a.dataset.p===page));
// animated headline
const ht=$('#ht');if(ht)ht.innerHTML=ht.textContent.split(' ').map((w,i)=>`<span style="animation-delay:${.5+i*.12}s">${w}&nbsp;</span>`).join('');
// reveal + counters
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
const co=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){const el=x.target,n=+el.dataset.n;let c=0;const t=setInterval(()=>{c+=Math.ceil(n/50);if(c>=n){c=n;clearInterval(t)}el.textContent=c+(n>=100?'+':'')},30);co.unobserve(el)}}));
$$('.rv').forEach(e=>io.observe(e));$$('[data-n]').forEach(e=>co.observe(e));
// loader (first visit) and curtain (page to page)
const L=$('#loader'),C=$('#curtain'),root=document.documentElement;
if(root.classList.contains('rt')){C.className='out';setTimeout(()=>{root.classList.remove('rt');C.className=''},700)}
else addEventListener('load',()=>setTimeout(()=>{L.classList.add('off');try{sessionStorage.sl=1}catch(e){}},900));
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;
  const h=a.getAttribute('href');if(!/^[\w-]+\.html(#.*)?$/.test(h)||h.split('#')[0]===location.pathname.split('/').pop())return;
  e.preventDefault();C.className='in';setTimeout(()=>location.href=h,560)});
addEventListener('pageshow',e=>{if(e.persisted)C.className=''});
// menu
function closeNav(){$('#nav').classList.remove('open');$('#burger').classList.remove('x');document.body.style.overflow=''}
$('#burger').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#burger').classList.toggle('x',o);document.body.style.overflow=o?'hidden':''};
$$('#nav a').forEach(a=>a.addEventListener('click',closeNav));
// scroll effects
const hc=$('.hc');
addEventListener('scroll',()=>{$('#hd').classList.toggle('sc',scrollY>40);
  $('#pg').style.width=(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100)+'%';
  if(hc&&scrollY<innerHeight){hc.style.transform=`translateY(${scrollY*.25}px)`;hc.style.opacity=Math.max(0,1-scrollY/innerHeight*1.3)}},{passive:true});
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});
// home: showcase
const sh=$('#sh');
if(sh){const SH=[['h4.jpg','Cultural weddings'],['h5.jpg','Elegant details'],['h6.jpg','Guest experience'],['h7.jpg','Ceremony moments'],['h8.jpg','Celebrations'],['h9.jpg','Styled to perfection']];
const cap=$('#cap'),dots=$('#dots'),ims=[];let shi=0,shT;
SH.forEach((s,i)=>{const im=new Image();im.src=s[0];im.alt=s[1]+' by SLEVENTS (SL Events Global)';if(!i)im.className='on';im.loading=i?'lazy':'eager';sh.insertBefore(im,sh.firstChild);ims.push(im);const d=document.createElement('i');d.onclick=()=>show(i);dots.appendChild(d)});
function show(i){if(i===shi)return;const o=ims[shi];o.classList.remove('on');o.classList.add('prev');setTimeout(()=>o.classList.remove('prev'),1200);shi=i;ims[i].classList.add('on');mark();clearInterval(shT);shT=setInterval(()=>show((shi+1)%SH.length),4500)}
function mark(){cap.textContent=SH[shi][1];[...dots.children].forEach((d,k)=>d.classList.toggle('on',k===shi))}
mark();shT=setInterval(()=>show((shi+1)%SH.length),4500)}
// home: testimonials autoplay
const tr=$('#tr');
if(tr){let ti=0;setInterval(()=>{if(!tr.clientWidth)return;const c=tr.children;ti=(ti+1)%c.length;tr.scrollTo({left:c[ti].offsetLeft-(tr.clientWidth-c[ti].clientWidth)/2,behavior:'smooth'})},5000)}
// home: hero slideshow + particles
const sl=$$('.slide');
if(sl.length){let si=0;setInterval(()=>{sl[si].classList.remove('on');si=(si+1)%sl.length;sl[si].classList.add('on')},6000)}
const cv=$('#fx');
if(cv){const cx=cv.getContext('2d');let W,H,P=[];
function rs(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight}rs();addEventListener('resize',rs);
for(let i=0;i<45;i++)P.push({x:Math.random(),y:Math.random(),r:Math.random()*2+.6,s:Math.random()*.0007+.0002,a:Math.random()*6});
(function f(){cx.clearRect(0,0,W,H);P.forEach(p=>{p.y-=p.s;p.a+=.02;if(p.y<0)p.y=1;cx.globalAlpha=.4+Math.sin(p.a)*.4;cx.fillStyle='#f1e2b8';cx.beginPath();cx.arc(p.x*W,p.y*H,p.r,0,7);cx.fill()});requestAnimationFrame(f)})()}
// contact: booking form -> formatted WhatsApp message
const cf=$('#cf');
if(cf){const fmt=n=>'₦'+Number(n).toLocaleString('en-NG');
$$('input[name=b]').forEach(r=>r.onchange=()=>{const c=$('input[name=b]:checked').value==='custom',i=$('#bc');i.hidden=!c;i.required=c;if(c)i.focus()});
cf.onsubmit=e=>{e.preventDefault();const f=e.target,v=n=>f[n].value.trim(),o=(c,x)=>c?x:null;
  const bv=f.b.value,bud=bv==='custom'?fmt(f.bc.value):fmt(bv);
  const dt=v('d')?new Date(v('d')).toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}):'To be confirmed';
  const sv=[...f.querySelectorAll('input[name=s]:checked')].map(x=>x.value).join(', ');
  const line='━━━━━━━━━━━━━━';
  const msg=['Hello SLEVENTS 👋','I would like to book an event with you.','',line,'✨ *EVENT BOOKING REQUEST* ✨',line,'',
    '👤 *Name:* '+v('n'),'📞 *Phone:* '+v('p'),o(v('e'),'📧 *Email:* '+v('e')),'',
    '🎉 *Event:* '+f.t.value,'📅 *Date:* '+dt,'📍 *Location:* '+v('l'),'👥 *Expected guests:* '+v('g'),'💰 *Estimated budget:* '+bud,
    o(sv,''),o(sv,'🛎️ *Services needed:* '+sv),o(v('m'),''),o(v('m'),'📝 *Details:* '+v('m')),'',line,'Thank you! 🙏'].filter(x=>x!==null).join('\n');
  open('https://wa.me/2348142724428?text='+encodeURIComponent(msg),'_blank')}}
