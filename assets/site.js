(function(){
'use strict';
var d=document,b=d.body;
function $(s,c){return (c||d).querySelector(s)}function $$(s,c){return [].slice.call((c||d).querySelectorAll(s))}
var bg=$('.burger');
if(bg){bg.addEventListener('click',function(){var o=b.classList.toggle('menu-open');bg.setAttribute('aria-expanded',o?'true':'false');var h=$('.hdr'),n=$('#nav');if(o&&h&&n){n.style.top=Math.max(0,h.getBoundingClientRect().bottom)+'px'}})}
$$('.nav>li>button').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();var li=btn.parentNode,o=!li.classList.contains('open');$$('.nav>li.open').forEach(function(x){x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded','false')});if(o){li.classList.add('open');btn.setAttribute('aria-expanded','true')}})});
d.addEventListener('click',function(e){if(!e.target.closest('.nav')){$$('.nav>li.open').forEach(function(x){x.classList.remove('open')})}});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){$$('.nav>li.open').forEach(function(x){x.classList.remove('open')});b.classList.remove('menu-open')}});
$$('.nav a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('menu-open')})});
$$('.draw').forEach(function(s){$$('path,line,polyline,circle,rect',s).forEach(function(p){try{var l=Math.ceil(p.getTotalLength?p.getTotalLength():600);p.style.setProperty('--len',l)}catch(e){}})});
var els=$$('.rv,.draw,[data-count]');
function count(el){var t=parseFloat(el.getAttribute('data-count'))||0,dec=(el.getAttribute('data-count').split('.')[1]||'').length,s=performance.now(),pre=el.getAttribute('data-pre')||'',suf=el.getAttribute('data-suf')||'';(function f(n){var p=Math.min(1,(n-s)/1400),v=t*(1-Math.pow(1-p,3));el.textContent=pre+v.toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)})(s)}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');if(x.target.hasAttribute('data-count'))count(x.target);io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add('in')})}
$$('[data-em]').forEach(function(a){var m=a.getAttribute('data-em')+'@'+(a.getAttribute('data-dom')||'eyetoad.com');function set(){a.href='mai'+'lto:'+m}a.addEventListener('click',set);a.addEventListener('mouseenter',set);a.addEventListener('focus',set);if(a.hasAttribute('data-show'))a.textContent=m});
$$('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});
var _k=['aW5m','bw==','ZXll','dG9h','ZC5j','b20='];function _to(){var x=atob(_k[0]+_k[1]),y=atob(_k[2]+_k[3]+_k[4]+_k[5]);return x+String.fromCharCode(64)+y}
$$('form[data-lead]').forEach(function(f){var t0=Date.now(),touched=false,busy=false;
 ['pointerdown','keydown','touchstart','focusin'].forEach(function(ev){f.addEventListener(ev,function(){touched=true},{passive:true})});
 f.addEventListener('submit',function(e){e.preventDefault();var msg=$('.fmsg',f),btn=$('button[type=submit]',f);if(busy)return;
 var hp=$('.hp input',f);if(hp&&hp.value){msg.textContent='Thanks!';f.reset();return}
 if(!touched||Date.now()-t0<3500){msg.textContent='One moment, then try again.';return}
 var fd=new FormData(f),ok=true;fd.forEach(function(v){if(String(v).length>3000)ok=false});
 var ph=String(fd.get('phone')||'').replace(/\D/g,''),nm=String(fd.get('name')||'').trim();
 if(!nm||nm.length>80||ph.length<10||ph.length>15){msg.textContent='Add your name and a 10-digit phone number.';return}
 if(!ok){msg.textContent='That message is a little long. Trim it and try again.';return}
 fd.delete('_honey');fd.append('_subject','AffordableDenverSEO lead: '+(fd.get('topic')||'website'));fd.append('_template','table');fd.append('_captcha','false');fd.append('page',location.pathname);
 busy=true;if(btn)btn.disabled=true;msg.textContent='Sending...';
 fetch('https://formsubmit.co/ajax/'+_to(),{method:'POST',headers:{'Accept':'application/json'},body:fd}).then(function(r){return r.json().catch(function(){return {}}).then(function(j){return {r:r,j:j}})}).then(function(x){
  var s=String(x.j&&x.j.success);
  if(x.r.ok&&s==='true'){f.reset();msg.textContent='Sent. A strategist will reach out shortly. Faster? Call 1-800-481-8638.'}
  else if(x.r.ok){msg.textContent='Your request may not have gone through. To be safe, please call 1-800-481-8638.'}
  else{msg.textContent='Could not send. Please call 1-800-481-8638.'}
 }).catch(function(){msg.textContent='Could not send. Please call 1-800-481-8638.'}).then(function(){busy=false;if(btn)btn.disabled=false})})});
function load(src){var s=d.createElement('script');s.src=src;s.defer=true;d.body.appendChild(s)}
if(b.hasAttribute('data-tools'))load('/assets/tools.js?v=2');
var idle=window.requestIdleCallback||function(f){setTimeout(f,1200)};
idle(function(){load('/assets/penny.js?v=1')},{timeout:3000});
})();
