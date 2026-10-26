gsap.registerPlugin(ScrollTrigger);

/* ---- Menu data: "Name|Price" ---- */
const M = {
 Snacks:['🍟','#f5b301',`Poha|59,Upma|99,Plain Appe|99,Cheese Appe|129,French Fries|99,Peri Peri French Fries|119,Cheese French Fries|138,Red Sauce Pasta|139,White Sauce Pasta|169,Plain Maggi|89,Veg Maggi|99,Cheese Maggi|119,Tikha Maggi|119,Cheesy Creamy Maggi|179,Veg Hakka Noodles|129,Vegetable Dalia|119,Cheese Momos (Steam)|119,Cheese Momos (Fried)|139`],
 Sandwich:['🥪','#e8731a',`Cheese Chutney Sandwich|139,Bombay Aalu Sandwich|139,Cheese Corn Sandwich|139,Bhukkad Special Pizza Sandwich|179`],
 Paratha:['🫓','#f5b301',`Plain Paratha|19,Aalu Paratha|59,Pyaz Paratha|69,Sattu Paratha|69,Masala Paratha|69`],
 'Tawa Roti':['🥙','#e8731a',`Plain Roti|18,Butter Roti|20`],
 Rice:['🍚','#f5b301',`Plain Rice|99,Jeera Rice|109,Butter Khichdi|159`],
 'Main Course':['🍛','#d8232a',`Jeera Aloo|99,Dal Fry|99,Dal Tadka|119,Kadhi Pakoda (6 pcs)|149,Dum Aloo|149,Sev Tamatar|119,Mix Daal Tadka|139,Malai ki Sabzi|179`],
 Beverages:['☕','#e8731a',`Elaichi Chai|25,Gud Chai|25,Adrak Chai|29,Masala Chai|29,Coffee|39,Cold Coffee|119`],
 Dessert:['🍮','#f5b301',`Sooji Halwa|99,Aata Halwa|99`],
 'Fast Food':['🍔','#4f8a2b',`Sabudana Chilla|99,Dahi Aalu Bharta|89,Fried Peanut|69,Aalu Tikki with Curd|99,Rajgira Laddu (4 pcs)|49,Navratri Thali|199`],
 Combo:['🎁','#d8232a',`Cheese Chutney Sandwich + Cold Coffee|209,White Sauce Pasta + Cold Coffee|219,Cheese Chutney Sandwich + French Fries|209,Poha + Adrak Chai|69,Aalu Paratha + Adrak Chai|69,Aalu Paratha + Curd / Pickle|69,Aalu Sabzi + Poori|129,Cheese Maggi + Cold Coffee|179,Cheese Momos (Steam) + Cold Coffee|179,Cheese Momos (Fried) + Cold Coffee|199`]
};
const FAV=[['🍜','Cheesy Creamy Maggi',179,'#f5b301'],['🥪','Bhukkad Pizza Sandwich',179,'#e8731a'],['🥟','Cheese Momos (Fried)',139,'#d8232a'],
 ['🫓','Aalu Paratha',59,'#f5b301'],['🍛','Dal Tadka',119,'#e8731a'],['☕','Adrak Chai',29,'#4f8a2b'],['🥤','Cold Coffee',119,'#d8232a'],['🍮','Sooji Halwa',99,'#f5b301']];

const $=s=>document.querySelector(s);
$('.track').innerHTML=Array(2).fill(Object.keys(M).map(k=>`<span>${M[k][0]} ${k}</span>`).join('')).join('');
$('#fav').innerHTML=FAV.map(f=>`<div class="col-6 col-md-4 col-lg-3 reveal"><div class="dish"><div class="plate" style="--c:${f[3]}">${f[0]}</div><h3>${f[1]}</h3><span class="price">₹${f[2]}</span></div></div>`).join('');
let t='',p='';
Object.entries(M).forEach(([k,[e,c,d]],i)=>{
 const id='t'+i,a=i?'':' active';
 t+=`<li class="nav-item"><button class="nav-link${a}" data-bs-toggle="pill" data-bs-target="#${id}">${k}</button></li>`;
 p+=`<div class="tab-pane fade${a?' show active':''}" id="${id}"><div class="panel"><div class="plate" style="--c:${c}">${e}</div><ul class="items">${
  d.split(',').map(x=>{const[n,pr]=x.split('|');return `<li>${n}<i></i><b>₹${pr}</b></li>`}).join('')}</ul></div></div>`;
});
$('#tabs').innerHTML=t;$('#panes').innerHTML=p;

/* ---- Animations ---- */
gsap.matchMedia().add('(prefers-reduced-motion:no-preference)',()=>{
 window.heroTl=gsap.timeline({paused:true,defaults:{ease:'power3.out'}})
  .from('.hero-in',{y:50,opacity:0,stagger:.15,duration:.8})
  .from('.hero-logo',{scale:.4,rotate:-25,opacity:0,duration:1.1,ease:'back.out(1.6)'},0.2);
 gsap.to('.hero-logo',{y:-14,rotate:2,duration:2.5,yoyo:true,repeat:-1,ease:'sine.inOut'});
 gsap.utils.toArray('.float').forEach(el=>gsap.to(el,{y:'random(-40,40)',x:'random(-30,30)',rotate:'random(-30,30)',duration:'random(3,5)',yoyo:true,repeat:-1,ease:'sine.inOut'}));
 gsap.to('.hero-logo',{yPercent:12,scrollTrigger:{trigger:'.hero',scrub:true,start:'top top',end:'bottom top'}});
 gsap.to('.track',{xPercent:-50,duration:30,ease:'none',repeat:-1});
 gsap.set('.reveal',{opacity:0});
 gsap.utils.toArray('[data-x]').forEach(el=>gsap.from(el,{x:+el.dataset.x,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}}));
 gsap.utils.toArray('.num').forEach(n=>{const o={v:0},d=n.dataset;gsap.to(o,{v:+d.n,duration:1.8,ease:'power2.out',scrollTrigger:{trigger:n,start:'top 90%',once:true},onUpdate:()=>n.textContent=(d.p||'')+Math.round(o.v)+(d.s||'')})});
 gsap.to('.wa-btn',{scale:1.1,duration:.8,yoyo:true,repeat:-1,ease:'sine.inOut'});
 gsap.to('.sticker',{rotate:8,y:-8,duration:1.6,yoyo:true,repeat:-1,ease:'sine.inOut'});
 ScrollTrigger.batch('.reveal',{start:'top 88%',once:true,
  onEnter:b=>gsap.to(b,{y:0,opacity:1,scale:1,stagger:.1,duration:.7,ease:'back.out(1.4)',startAt:{y:50,scale:.95}})});
 document.addEventListener('shown.bs.tab',e=>{
  const pane=$(e.target.dataset.bsTarget);
  gsap.from(pane.querySelector('.plate'),{scale:0,rotate:-180,duration:.6,ease:'back.out(1.7)'});
  gsap.from(pane.querySelectorAll('li'),{x:-30,opacity:0,stagger:.04,duration:.4});
 });
});
ScrollTrigger.create({start:60,onUpdate:s=>$('#nav').classList.toggle('scrolled',s.scroll()>60)});

// back to top
const up=$('#toTop');
up.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
ScrollTrigger.create({start:400,onUpdate:s=>up.classList.toggle('show',s.scroll()>400)});

// loader
gsap.to('.bar',{width:'85%',duration:1.6,ease:'power1.out'});
const hide=()=>{const L=$('#loader');if(!L)return;
 gsap.timeline().to('.bar',{width:'100%',duration:.3})
  .to(L,{yPercent:-100,duration:.8,ease:'power4.inOut',onComplete:()=>{L.remove();window.heroTl&&heroTl.play()}});};
Promise.all([new Promise(r=>document.readyState==='complete'?r():addEventListener('load',r)),new Promise(r=>setTimeout(r,1600))]).then(hide);
setTimeout(hide,6000);
