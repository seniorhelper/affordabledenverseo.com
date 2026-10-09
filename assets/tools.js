(function(){
'use strict';
var d=document;function $(s,c){return (c||d).querySelector(s)}function $$(s,c){return [].slice.call((c||d).querySelectorAll(s))}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function res(k,t){return '<div class="res '+k+'">'+t+'</div>'}
function money(n){return '$'+Math.round(n).toLocaleString()}
function gap(t){return '<div class="gapbox"><b>Next step:</b> '+t+' <a href="/contact/">Get a free strategy call</a> or call <a href="tel:18004818638">1-800-481-8638</a>.</div>'}
function bar(label,val,max,color,txt){var w=Math.max(2,Math.min(100,val/max*100));return '<div class="b"><span>'+label+'</span><div class="meter"><i style="width:'+w.toFixed(1)+'%;background:'+color+'"></i></div><span>'+txt+'</span></div>'}

/* ---------- 1. SEO quote checker ---------- */
var FLAGS=[
 [/guarantee[ds]?\s+(\w+\s+){0,4}(rank|ranking|rankings|#?1|first|page one|top|position|results|traffic)|(rank|ranking|rankings)\s+(\w+\s+){0,3}guarantee/i,'bad','Ranking guarantees','Google says no one can guarantee a #1 ranking. A guarantee usually means tiny keywords nobody searches, or tactics that get sites penalized.'],
 [/(#\s?1|number one|first position|top spot)\s+(on|in)\s+google/i,'bad','"#1 on Google" promises','Rankings move by location, device and person. Promising a specific position is a sales line, not a plan.'],
 [/\b\d{2,5}\+?\s+(directories|directory submissions|search engines|bookmark|bookmarking|citations in \d+ days)/i,'bad','Bulk directory or search-engine submissions','Mass submissions to hundreds of directories or "search engines" are outdated and can create spammy links you later have to clean up.'],
 [/(\d{2,5}\+?\s+(back ?links|links)\b(?![^.]{0,40}audit))|(back ?links?\s+(per|a|each)\s+month)/i,'bad','Link counts sold by volume','Selling a number of backlinks per month usually means low-quality or paid links, which Google treats as link spam.'],
 [/\b(pbn|private blog network|link wheel|link farm|web 2\.0 links?)\b/i,'bad','Private blog networks or link schemes','These are link schemes under Google\'s spam policies. The short-term bump is rarely worth the penalty risk.'],
 [/(secret|proprietary|special relationship|inside (contact|connection)|partner(ship)? with google)[^.]{0,60}(google|algorithm|formula|method)/i,'bad','"Secret method" or Google connections','Nobody gets special treatment in organic search. Google Partners is an ads program and has nothing to do with organic rankings.'],
 [/(results|rankings|page one|first page)\s+(in|within)\s+(\d{1,2}|seven|ten|fourteen|thirty)\s*(days|weeks)/i,'bad','Instant-results timeline','Real SEO usually takes months to show meaningful movement. Days-or-weeks promises often rely on tactics that do not last.'],
 [/(\d{2}|twelve|eighteen|twenty-four|twenty four)[\s-]*(month|mo)[\s-]*(contract|commitment|minimum|agreement|term)/i,'warn','Long lock-in contract','A long minimum term protects the agency more than you. Ask for month-to-month or a short initial term with clear exit terms.'],
 [/((we (will )?own|remains? (the )?property of|agency owns?|licensed to you)[^.]{0,60}(website|content|google business|profile|account|domain|analytics))|((website|content|google business profile|profile|accounts?|domain)[^.]{0,60}(remains? (the )?property of|owned by|belongs? to) (the )?(agency|us|our (company|agency)))/i,'bad','The agency keeps ownership of your assets','You should own your website, content, domain, analytics and Google Business Profile. Always.'],
 [/\b(\d{2,4})\s+(ai|automated|auto-generated|spun)?\s*(articles|blog posts|posts|pages)\s+(per|a|each)\s+month/i,'warn','High-volume content','Dozens of pages a month often means thin or auto-generated content. Google\'s spam policies target scaled content made to game rankings.'],
 [/unlimited\s+(keywords|pages|backlinks|revisions)/i,'warn','"Unlimited" anything','Unlimited keywords or links is a sign the work is spread too thin to matter.'],
 [/(exact[- ]match anchor|keyword[- ]rich anchor)/i,'warn','Exact-match anchor text strategy','Heavy exact-match anchors are a classic over-optimization pattern that can trigger link spam signals.'],
 [/(set[- ]?up|onboarding|activation) fee[^.]{0,20}\$\s?(\d{1,3}(,\d{3})+|\d{4,})/i,'warn','Large setup fee','A big upfront fee before any work is proven is worth questioning. Ask what it buys, line by line.'],
 [/(ranking report|rankings report)(?![^.]{0,80}(calls|leads|conversions|revenue))/i,'info','Reporting may stop at rankings','Rankings alone do not pay bills. Ask whether reports include calls, form leads and revenue.']
];
var GOOD=[[/(calls|phone calls|leads|conversions|revenue|form (fills|submissions))/i,'Reports on calls, leads or revenue'],[/(month[- ]to[- ]month|cancel any ?time|no long[- ]term contract)/i,'Flexible terms'],[/(technical (seo )?audit|site audit|core web vitals|page speed)/i,'Technical work included'],[/(google business profile|gbp|google my business)/i,'Google Business Profile work'],[/(schema|structured data)/i,'Structured data'],[/(you own|client owns|your accounts?|full access)/i,'You keep ownership and access'],[/(conversion|cro|landing page)/i,'Conversion work included'],[/(ai overviews?|chatgpt|answer engine|ai search|generative engine)/i,'AI search is addressed']];
function initQuote(){var box=$('#qc');if(!box)return;var ta=$('#qc-in',box),out=$('#qc-out',box);
 $('#qc-sample',box).onclick=function(){ta.value='SEO PROPOSAL for Front Range Roofing\nWe GUARANTEE first page rankings in 30 days or your money back!\nOur proprietary method and special relationship with Google gets results fast.\nPackage includes:\n- Submission to 500 directories and 200 search engines\n- 100 backlinks per month from our private blog network\n- 30 AI articles per month\n- Unlimited keywords\n- Weekly ranking report\n12-month contract required. Setup fee $2,500.\nNote: website and content remain the property of the agency.';run()};
 $('#qc-run',box).onclick=run;
 function run(){var t=ta.value.trim();if(t.length<40){out.innerHTML=res('warn','Paste the full proposal, email or sales page text. A sentence or two is not enough to judge.');return}
  var hits=FLAGS.filter(function(f){return f[0].test(t)}),goods=GOOD.filter(function(g){return g[0].test(t)});
  var bad=hits.filter(function(h){return h[1]==='bad'}).length,warn=hits.filter(function(h){return h[1]==='warn'}).length;
  var score=Math.max(0,Math.min(100,70-bad*18-warn*7+goods.length*6));
  var col=score>=70?'#0b6b43':score>=45?'#b7791f':'#b91c1c',verdict=score>=70?'Looks reasonable. Ask good questions anyway.':score>=45?'Proceed with caution.':'Serious red flags. Get a second opinion before signing.';
  var h='<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"><div class="num" style="color:'+col+'">'+score+'<span style="font-size:20px">/100</span></div><div><b style="font-size:20px">'+verdict+'</b><div class="muted" style="font-size:15px">'+bad+' red flag'+(bad!==1?'s':'')+', '+warn+' caution'+(warn!==1?'s':'')+', '+goods.length+' good sign'+(goods.length!==1?'s':'')+'</div></div></div><div class="meter"><i style="width:'+score+'%;background:'+col+'"></i></div>';
  hits.forEach(function(f){h+=res(f[1],'<b>'+f[2]+'.</b> '+f[3])});
  if(!hits.length)h+=res('ok','No classic red-flag phrases found. That is a good start, not a guarantee of quality.');
  goods.forEach(function(g){h+=res('ok','<b>Good sign:</b> '+g[1]+'.')});
  var miss=GOOD.filter(function(g){return !g[0].test(t)}).slice(0,4).map(function(g){return g[1].toLowerCase()});
  if(miss.length)h+=res('info','<b>Ask about:</b> '+miss.join('; ')+'.');
  h+=gap('A scan catches the obvious traps. It cannot tell you whether the strategy fits your market or whether the price is right for the scope. Want a free, straight second opinion on the whole proposal?');
  out.innerHTML=h}}

/* ---------- 2. SEO budget planner ---------- */
var MIX={local:{tech:18,gbp:24,content:22,links:12,ai:10,cro:14},ecom:{tech:26,gbp:4,content:28,links:16,ai:10,cro:16},startup:{tech:20,gbp:6,content:34,links:18,ai:12,cro:10},multi:{tech:18,gbp:26,content:24,links:12,ai:8,cro:12}};
var LBL={tech:['Technical fixes and speed','#1d5fa8'],gbp:['Google Business Profile, reviews, listings','#0b6b43'],content:['Content that answers buyer questions','#a4461a'],links:['Links, PR and mentions','#6d3fb8'],ai:['AI search readiness (schema, answers)','#0f766e'],cro:['Conversion fixes (calls, forms)','#b7791f']};
function initBudget(){var box=$('#bp');if(!box)return;
 function calc(){var b=+$('#bp-b',box).value,type=$('#bp-t',box).value,site=$('#bp-s',box).value,rate=+$('#bp-r',box).value,lv=+$('#bp-v',box).value,wait=+$('#bp-w',box).value,est=+$('#bp-l',box).value;
  $('#bp-bv',box).textContent=money(b);$('#bp-rv',box).textContent=money(rate)+'/hr';$('#bp-vv',box).textContent=money(lv);$('#bp-wv',box).textContent=wait+' month'+(wait!==1?'s':'');$('#bp-lv',box).textContent=est;
  var m=Object.assign({},MIX[type]);if(site==='weak'){m.tech+=10;m.cro+=6;m.content-=8;m.links-=8}if(site==='none'){m.tech+=4;m.cro+=10;m.content-=6;m.links-=8}
  var tot=0;for(var k in m){m[k]=Math.max(2,m[k]);tot+=m[k]}
  var hrs=b/rate,h='<div class="grid g2" style="margin-bottom:6px"><div class="card" style="box-shadow:none"><div class="muted" style="font-size:14px">Expert hours your budget buys each month</div><div class="num">'+hrs.toFixed(1)+'</div></div><div class="card" style="box-shadow:none"><div class="muted" style="font-size:14px">What waiting '+wait+' month'+(wait!==1?'s':'')+' could cost (your estimate)</div><div class="num" style="color:var(--copper)">'+money(est*lv*wait)+'</div></div></div><div class="bars">';
  for(var k2 in m){var pct=m[k2]/tot;h+=bar(LBL[k2][0],pct,0.4,LBL[k2][1],Math.round(pct*100)+'%')}
  h+='</div>';
  if(site==='none')h+=res('warn','<b>No website yet?</b> Most of the first months should go to a fast, findable site. DIY builder plans start at $5.99 a month at <a href="https://buyweburl.com/">BuyWebURL</a>, and qualifying businesses can get a custom site from $99 a month.');
  if(b<500)h+=res('warn','<b>Under $500 a month</b> buys roughly '+hrs.toFixed(0)+' expert hours. Spend it on your Google Business Profile, reviews and a one-time technical cleanup before anything else. Spreading it across everything means nothing moves.');
  else if(b<1200)h+=res('info','<b>Local SEO range.</b> Enough for steady local work: profile, listings, a few strong pages a month and conversion fixes. Our Local Starter plan begins at $597 a month.');
  else if(b<2400)h+=res('info','<b>Growth range.</b> Room for content clusters, PR-driven links and AI search work alongside the basics. Our Denver Growth plan begins at $1,197 a month.');
  else h+=res('info','<b>Market leadership range.</b> Enough to out-publish and out-earn competitors on links. Our Market Domination plan begins at $2,497 a month.');
  h+=res('info','Hours use the rate you set. The waiting figure multiplies your own estimate of monthly SEO leads by customer value and months, so it is only as good as your inputs.');
  h+=gap('The mix above is a sensible starting split. Your real split depends on what is broken today, who you compete with, and what your customers search.');
  $('#bp-out',box).innerHTML=h}
 $$('input,select',box).forEach(function(e){e.addEventListener('input',calc);e.addEventListener('change',calc)});calc()}

/* ---------- 3. Package builder ---------- */
function initBuilder(){var box=$('#pb');if(!box)return;var TIERS=[['Local Starter','from $597/mo','Best for new or small businesses building a real local presence.','/local-seo-packages/'],['Denver Growth','from $1,197/mo','For businesses ready to compete aggressively and own their market.','/monthly-seo-packages/'],['Market Domination','from $2,497/mo','For businesses that want to be the category leader.','/contact/']];
 function calc(){var pts=0,n=0;$$('.pb-f',box).forEach(function(f){if(f.checked){pts+=+f.value;n++}});var pages=+$('#pb-p',box).value;$('#pb-pv',box).textContent=pages;pts+=pages>25?4:pages>10?2:0;var loc=$('#pb-l',box).value;pts+=loc==='multi'?4:loc==='national'?3:0;
  var i=pts<=10?0:pts<=18?1:2,t=TIERS[i];
  var h='<div class="tag best" style="margin-top:4px"><span class="ribbon">Closest fit</span><h3 style="margin:6px 0 4px">'+t[0]+'</h3><div class="price">'+t[1].replace('from ','')+'<small> starting point</small></div><p style="margin:10px 0 0">'+t[2]+'</p></div>';
  h+='<div class="meter" style="margin-top:14px"><i style="width:'+Math.min(100,pts/24*100).toFixed(0)+'%;background:linear-gradient(90deg,#0b6b43,#a4461a)"></i></div><p class="muted" style="font-size:14px;margin:0">Scope score '+pts+' from '+n+' item'+(n!==1?'s':'')+'. Every package is tailored after a call, so the final price reflects your market and goals.</p>';
  if(n===0)h=res('info','Tick what you need and the builder matches you to the closest starting plan.');
  h+=gap('Want the exact scope and price for your business? That takes one short conversation.');
  $('#pb-out',box).innerHTML=h}
 $$('input,select',box).forEach(function(e){e.addEventListener('input',calc);e.addEventListener('change',calc)});calc()}

/* ---------- 4. 90-day SEO plan generator ---------- */
function initPlan(){var box=$('#pg');if(!box)return;
 function gen(){var type=$('#pg-t',box).value,site=$('#pg-s',box).value,goal=$('#pg-g',box).value,who=$('#pg-w',box).value;
  var W=[];
  W.push(['Measure first','Set up Google Search Console, Google Analytics and call tracking so you can see what changes.']);
  W.push([site==='weak'?'Fix the foundation':'Technical check-up',site==='weak'?'Fix speed, mobile issues, broken pages and indexing errors. A leaky site wastes every other dollar.':'Check indexing, speed, titles and broken links. Fix anything that blocks crawling.']);
  W.push(type==='ecom'?['Categories before blogs','Rewrite your top category pages with helpful copy, filters that do not create duplicate URLs, and Product schema.']:['Google Business Profile',type==='startup'?'Claim and complete your profile if you serve a location. Otherwise, set up your brand entity: consistent name, logo and descriptions everywhere.':'Complete every field, pick precise categories, add real photos and services, and start a review request routine.']);
  W.push(['Keyword map','Assign one primary search term per page. No two pages fighting for the same term.']);
  W.push(['Money pages','Rewrite your highest-value service or product pages. Open each with a direct answer to the question the page targets.']);
  W.push(['Structured data','Add Organization or LocalBusiness, Service or Product, FAQ and Breadcrumb schema that matches visible content.']);
  W.push([goal==='calls'?'Make calling easy':goal==='sales'?'Tighten checkout':'Shorten the form',goal==='calls'?'Click-to-call on every mobile page, phone in the header, hours visible.':goal==='sales'?'Remove steps, show shipping costs early, add trust signals near the buy button.':'Cut fields to the minimum, label them properly, and say what happens next.']);
  W.push(['Answer content','Publish two pages that answer the questions buyers ask before they buy: cost, comparison, how long, what to expect.']);
  W.push([type==='local'||type==='multi'?'Listings and citations':'Earn mentions',type==='local'||type==='multi'?'Make your name, address and phone identical across major directories and industry sites.':'Pitch one useful resource or story to industry sites, partners or a press release wire.']);
  W.push(['Internal links','Link related pages with descriptive anchors so authority flows to your money pages.']);
  W.push(['AI search check','Ask ChatGPT, Gemini and Perplexity the questions your buyers ask. Note who gets named and what sources get cited.']);
  W.push(['Review and plan','Compare calls, leads and rankings to week one. Double down on what moved, drop what did not.']);
  var hrs={diy:3,mix:1.5,pro:0.5}[who];
  var h='<div class="plan">'+W.map(function(w,i){return '<div class="wk"><b>Week '+(i+1)+': '+w[0]+'</b>'+w[1]+'</div>'}).join('')+'</div>';
  h+=res('info','Estimated owner time: about '+(hrs*12).toFixed(0)+' hours over 12 weeks '+(who==='diy'?'if you do it all yourself (plus learning time).':who==='mix'?'working alongside a pro.':'with a pro doing the work.'));
  h+=gap('A plan is only as good as its execution. Want us to run it with you, or for you?');
  $('#pg-out',box).innerHTML=h;box.setAttribute('data-plan',W.map(function(w,i){return 'Week '+(i+1)+': '+w[0]+' - '+w[1]}).join('\n'))}
 $('#pg-go',box).onclick=gen;$$('select',box).forEach(function(e){e.addEventListener('change',gen)});
 $('#pg-copy',box).onclick=function(){var t=box.getAttribute('data-plan')||'';var btn=this;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){btn.textContent='Copied';setTimeout(function(){btn.textContent='Copy plan'},1500)}).catch(function(){btn.textContent='Select and copy the plan above'})};
 gen()}

/* ---------- 5. SEO tool stack cost ---------- */
function initStack(){var box=$('#ts');if(!box)return;
 function calc(){var tools=0,names=[];$$('.ts-f',box).forEach(function(f){if(f.checked){tools+=+f.value;names.push(f.getAttribute('data-n'))}});var hw=+$('#ts-h',box).value,rate=+$('#ts-r',box).value;$('#ts-hv',box).textContent=hw+' hr'+(hw!==1?'s':'');$('#ts-rv',box).textContent=money(rate)+'/hr';
  var time=hw*4.33*rate,total=tools+time;
  var h='<div class="grid g4"><div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">Tools per month</div><div class="num" style="font-size:38px">'+money(tools)+'</div></div><div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">Your time per month</div><div class="num" style="font-size:38px">'+money(time)+'</div></div><div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">True DIY cost per month</div><div class="num" style="font-size:38px;color:var(--copper)">'+money(total)+'</div></div></div>';
  h+='<div class="bars" style="margin-top:10px">'+bar('Your DIY cost',total,Math.max(total,2497),'#a4461a',money(total))+bar('Local Starter',597,Math.max(total,2497),'#0b6b43','$597')+bar('Denver Growth',1197,Math.max(total,2497),'#0b6b43','$1,197')+'</div>';
  if(total>=597)h+=res('info','Your do-it-yourself cost already reaches or passes where our plans start, and a plan includes the tools, the experience and the hours.');
  else h+=res('ok','DIY is cheaper in cash at these settings. It works best if you enjoy it and have the hours. Our 90-day plan generator can guide you.');
  h+=res('info','Tool prices are monthly list prices from each vendor as of September 2026 and can change. Annual billing is usually cheaper.');
  h+=gap('Not sure whether to DIY or hire? We will tell you honestly which makes more sense for your stage.');
  $('#ts-out',box).innerHTML=h}
 $$('input',box).forEach(function(e){e.addEventListener('input',calc);e.addEventListener('change',calc)});calc()}


/* ---------- 6. Small business break-even ---------- */
function num(el,lo,hi){var v=parseFloat(el.value);if(!isFinite(v))return null;return Math.min(hi,Math.max(lo,v))}
function stat(label,val,color){return '<div class="card" style="box-shadow:none;padding:16px"><div class="muted" style="font-size:13px">'+label+'</div><div class="num" style="font-size:34px'+(color?';color:'+color:'')+'">'+val+'</div></div>'}
function fmt(x){return x<0.1?'under 0.1':x<10?x.toFixed(1):Math.ceil(x).toLocaleString()}
function initBreakeven(){var box=$('#breakeven');if(!box)return;
 function calc(){var v=num($('#be-v',box),0,1e9),m=num($('#be-m',box),0,1e9),c=num($('#be-c',box),0,1e9),b=num($('#be-b',box),0,1e9),r=num($('#be-r',box),0,1e9),o=$('#breakeven-out',box);
  if(v===null||m===null||c===null||b===null||r===null){o.innerHTML=res('warn','Fill in every box with a number to see your break-even.');return}
  if(m>100||c>100){o.innerHTML=res('warn','Percentages top out at 100. Check the margin and close rate boxes.');return}
  if(r>365){o.innerHTML=res('warn','That is more than one repeat purchase a day. Enter repeat purchases per year.');return}
  if(v<=0||m<=0){o.innerHTML=res('warn','A sale with no value or no profit can never pay back marketing. Check the sale value and margin.');return}
  if(c<=0){o.innerHTML=res('warn','If no leads become customers, no budget can break even. Enter your best guess at a close rate.');return}
  if(b<=0){o.innerHTML=res('ok','With no monthly spend there is nothing to earn back. Enter the budget you are considering.');return}
  var perCustMonthly=v*(m/100)*(1+r);var cust=b/perCustMonthly,leads=cust/(c/100);
  var h='<div class="grid g4">'+stat('New customers a month to break even',fmt(cust))+stat('Leads a month to break even',fmt(leads),'var(--copper)')+stat('Profit per new customer (first year)',money(perCustMonthly))+'</div>';
  if(leads<=3)h+=res('ok','A small number of leads covers this budget. If your market has search demand, this budget has room to pay for itself.');
  else if(leads<=15)h+=res('info','Reachable for many local businesses, but it should be measured. Make sure calls and forms are tracked from day one.');
  else h+=res('warn','That is a lot of leads for this budget. Consider a smaller scope, a one-time fix, or raising the value of each sale before spending more.');
  h+=res('info','Break-even here means profit from new customers equals the monthly spend. SEO usually takes months to build, so judge it over a season, not a single month.');
  h+=gap('Want help reading your numbers?');o.innerHTML=h}
 $$('input',box).forEach(function(e){e.addEventListener('input',calc)});calc()}

/* ---------- 7. DIY or hire ---------- */
function initDiyHire(){var box=$('#diyhire');if(!box)return;
 function calc(){var hw=num($('#dh-h',box),0,20),rate=num($('#dh-r',box),0,1e9),p=num($('#dh-p',box),0,1e9),t=num($('#dh-t',box),0,1e9),o=$('#diyhire-out',box);
  $('#dh-hv',box).textContent=(hw===null?0:hw)+' hr'+(hw===1?'':'s');
  if(rate===null||p===null||t===null||hw===null){o.innerHTML=res('warn','Fill in every box with a number to compare.');return}
  var time=hw*52/12*rate,diy=time+t,mx=Math.max(diy,p,1);
  var h='<div class="grid g4">'+stat('Your DIY cost a month',money(diy),'var(--copper)')+stat('The plan a month',money(p))+stat('Hours you get back a year',Math.round(hw*52))+'</div>';
  h+='<div class="bars" style="margin-top:10px">'+bar('Do it yourself',diy,mx,'#a4461a',money(diy))+bar('Hire the plan',p,mx,'#0b6b43',money(p))+'</div>';
  if(hw===0)h+=res('info','At zero hours, DIY costs only your tools, but nothing gets done either. Be realistic about the hours the work needs.');
  else if(diy>p)h+=res('info','Hiring costs less than your time at these settings, and you get back '+Math.round(hw*52)+' hours a year to spend on customers.');
  else if(diy>p*0.7)h+=res('warn','It is close. The deciding factor is whether you enjoy the work and do it consistently.');
  else h+=res('ok','DIY is cheaper at these settings. Spend money only on one-time fixes you cannot do yourself.');
  h+=gap('Want a straight answer on DIY versus hiring for your business?');o.innerHTML=h}
 $$('input',box).forEach(function(e){e.addEventListener('input',calc)});calc()}

/* ---------- 8. Marketing budget splitter ---------- */
function initMixer(){var box=$('#mixer');if(!box)return;
 var MIX={found:{web:45,seo:35,rev:15,ads:5},chosen:{web:20,seo:50,rev:15,ads:15},grow:{web:10,seo:55,rev:10,ads:25}};
 function calc(){var b=num($('#mx-b',box),0,1e9),st=$('#mx-s',box).value,o=$('#mixer-out',box);
  if(b===null){o.innerHTML=res('warn','Enter a monthly budget as a number.');return}
  var m={};for(var k in MIX[st])m[k]=MIX[st][k];
  if($('#mx-w',box).checked){m.seo+=m.web-5;m.web=5}
  if($('#mx-r',box).checked){m.seo+=m.rev-5;m.rev=5}
  var L={web:['Website','#1d5fa8'],seo:['SEO and local','#0b6b43'],rev:['Reviews and reputation','#f2b705'],ads:['Paid ads tests','#a4461a']};
  var h='<div class="bars">';['web','seo','rev','ads'].forEach(function(k){h+=bar(L[k][0]+' ('+m[k]+'%)',m[k],100,L[k][1],money(b*m[k]/100))});h+='</div>';
  if(b<300)h+=res('warn','Under about $300 a month, focus on one thing: usually your Google Business Profile and website basics. Splitting a tiny budget four ways rarely moves any of them.');
  else if(b<597)h+=res('info','At this budget, a narrow monthly scope or a one-time fix usually beats a full package. Our monthly SEO plans start at $597.');
  else h+=res('ok','This budget can fund a real monthly program. Our SEO plans start at $597 a month and custom websites at $99 a month on a subscribe-to-own plan.');
  h+=res('info','These are starting splits based on stage, not a rule. Seasonal businesses often shift money toward ads in busy months.');
  h+=gap('Want a mix tailored to your market?');o.innerHTML=h}
 $$('input,select',box).forEach(function(e){e.addEventListener('input',calc);e.addEventListener('change',calc)});calc()}

[initQuote,initBudget,initBuilder,initPlan,initStack,initBreakeven,initDiyHire,initMixer].forEach(function(f){try{f()}catch(e){if(window.console)console.error(e)}});
})();
