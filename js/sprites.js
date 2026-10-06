'use strict';
/* ---------- SPRITES ---------- */
const PAL={
  sq:{suit:'#1c1d22',top:'#1c1d22',stripe:'#e6e6e6',skin:'#c99a7a',hair:'#3a2a20',shoe:'#141414',hat:'cap',hatC:'#3b3b3e',cig:1},
  sp:{suit:'#27449b',top:'#27449b',stripe:'#eeeeee',skin:'#d0a283',hair:'#6b4a2a',shoe:'#e2e2e2',hat:'knit',hatC:'#b3262b'},
  br:{suit:'#1c1d22',top:'#18181a',stripe:'#e6e6e6',skin:'#bf8e6e',hair:'#9c7458',shoe:'#141414',hat:'none',hatC:'#222',chain:1,leather:1},
  bt:{suit:'#26262a',top:'#3a2618',stripe:'#26262a',skin:'#b98666',hair:'#5a4535',shoe:'#101010',hat:'cap',hatC:'#262628',chain:1,leather:1,coat:1,stache:1},
  dn:{suit:'#6a6e74',top:'#e8e4d8',stripe:'#6a6e74',skin:'#d0a080',hair:'#4a3a2a',shoe:'#3a5a8a',hat:'none',hatC:'#222',vest:1,hold:'rosette'},
  rm:{suit:'#3a4a7a',top:'#3a4a7a',stripe:'#3a4a7a',skin:'#c4957a',hair:'#5a4535',shoe:'#2a2a2a',hat:'paper',hatC:'#d8d4c8',hold:'drill'},
  kl:{suit:'#1c1d22',top:'#1c1d22',stripe:'#e6e6e6',skin:'#c99a7a',hair:'#2a1c14',shoe:'#141414',hat:'cap',hatC:'#2a2a2c',hold:'rebar',chain:1},
  tl:{suit:'#7a1e22',top:'#7a1e22',stripe:'#f0f0f0',skin:'#d0a283',hair:'#6b4a2a',shoe:'#e2e2e2',hat:'knit',hatC:'#1c1d22',hold:'jar'},
  st:{suit:'#2e3a5a',top:'#2e3a5a',stripe:'#2e3a5a',skin:'#c4957a',hair:'#4a3a2a',shoe:'#1a1a1a',hat:'cap',hatC:'#2a3040',hold:'wrench',stache:1},
  kc:{suit:'#2a2622',top:'#5a3a22',stripe:'#2a2622',skin:'#9a7a60',hair:'#1a1410',shoe:'#101010',hat:'none',hatC:'#222',vest:1,hold:'shovel',stache:1},
  mg:{suit:'#1c1d22',top:'#2e2017',stripe:'#e6e6e6',skin:'#c4957a',hair:'#2a1c14',shoe:'#e2e2e2',hat:'none',hatC:'#222',chain:1,leather:1,shades:1,mullet:1,hold:'boombox'},
  mgB:{suit:'#1c1d22',top:'#2e2017',stripe:'#e6e6e6',skin:'#c4957a',hair:'#2a1c14',shoe:'#e2e2e2',hat:'none',hatC:'#222',chain:1,leather:1,shades:1,mullet:1},
  vr:{suit:'#1e5a32',top:'#1e5a32',stripe:'#f0f0f0',skin:'#d0a283',hair:'#6b4a2a',shoe:'#e2e2e2',hat:'cap',hatC:'#1e3a22',hold:'fuse'},
  dv:{suit:'#3a3e44',top:'#e0701e',stripe:'#e8e070',skin:'#b08a6a',hair:'#8a8680',shoe:'#1a1a1a',hat:'cap',hatC:'#3a3a3e',stache:1,hold:'dvor'},
  dv2:{suit:'#3a3e44',top:'#8a3a1a',stripe:'#c8a040',skin:'#c07a5a',hair:'#8a8680',shoe:'#1a1a1a',hat:'none',hatC:'#222',stache:1,vest:1,hold:'dvor'},
  rk:{suit:'#8a1e1e',top:'#8a1e1e',stripe:'#e8e070',skin:'#c99a7a',hair:'#3a2a20',shoe:'#e2e2e2',hat:'cap',hatC:'#5a1414',cig:1},
  sm:{suit:'#3a1414',top:'#241010',stripe:'#3a1414',skin:'#c99a7a',hair:'#8a3a1a',shoe:'#101010',hat:'none',hatC:'#222',chain:1,leather:1,shades:1,hold:'jar'},
  ls:{suit:'#243a9a',top:'#243a9a',stripe:'#eaeaf2',skin:'#c99a7a',hair:'#3a2a18',shoe:'#121212',hat:'knit',hatC:'#1c2a6a'},
  hk:{suit:'#1a2c7a',top:'#22369a',stripe:'#22369a',skin:'#caa078',hair:'#2a2414',shoe:'#121212',hat:'knit',hatC:'#14206a',fat:1,stache:1},
  oc:{suit:'#2a4ab8',top:'#2a4ab8',stripe:'#d8e4ff',skin:'#c99a7a',hair:'#3a2a18',shoe:'#121212',hat:'cap',hatC:'#16266a',shades:1},
  sy:{suit:'#1c2e86',top:'#2a46a8',stripe:'#cfe0ff',skin:'#c4957a',hair:'#2a2414',shoe:'#101010',hat:'knit',hatC:'#101c5a',fat:1},
  mx:{suit:'#2a3a5a',top:'#2e4066',stripe:'#2e4066',skin:'#c99a7a',hair:'#3a2a20',shoe:'#1a1a1a',hat:'cap',hatC:'#2a2c30',stache:1,hold:'wrench'},
  kd:{suit:'#3a4a6a',top:'#d04a3a',stripe:'#f0e0d0',skin:'#e0b090',hair:'#8a6a3a',shoe:'#5a3a2a',hat:'cap',hatC:'#e0a020',hold:'lolly'},
  sw:{suit:'#141416',top:'#1c1c20',stripe:'#1c1c20',skin:'#d48a72',hair:'#8a8a8a',shoe:'#0a0a0a',hat:'cap',hatC:'#1c1c20',stache:1,fat:1,hold:'bottleH'},
  km:{suit:'#5a5046',top:'#7a6a52',stripe:'#5a5046',skin:'#c99a7a',hair:'#4a3a2a',shoe:'#2a2622',hat:'knit',hatC:'#3a3a3a',hold:'brick'},
  tb:{suit:'#3a3830',top:'#4a4638',stripe:'#3a3830',skin:'#b08a6a',hair:'#3a3028',shoe:'#1a1a1a',hat:'knit',hatC:'#5a2a2a',stache:1},
  sj:{suit:'#2a3a5a',top:'#e07020',stripe:'#e8e070',skin:'#d0a283',hair:'#6b4a2a',shoe:'#2a2622',hat:'helmet',hatC:'#e8c020'},
  bg:{suit:'#2a3a5a',top:'#e07020',stripe:'#e8e070',skin:'#c99a7a',hair:'#3a2a20',shoe:'#1a1a1a',hat:'helmet',hatC:'#f0f0ea',stache:1,hold:'obrezH'},
  kt:{suit:'#1c2a4a',top:'#22335a',stripe:'#1c2a4a',skin:'#c99a7a',hair:'#3a2a20',shoe:'#101010',hat:'cap',hatC:'#1c2a4a',stache:1,hold:'komp'},
  gt:{suit:'#1c1d22',top:'#2a3a6a',stripe:'#e6e6e6',skin:'#d0a283',hair:'#3a2418',shoe:'#e2e2e2',hat:'none',hatC:'#222',mullet:1},
  dz:{suit:'#1c1d22',top:'#3a3e44',stripe:'#e6e6e6',skin:'#c99a7a',hair:'#3a2a20',shoe:'#141414',hat:'cap',hatC:'#3b3b3e',cig:1},
  bm:{suit:'#3a4a3a',top:'#5a6a4a',stripe:'#3a4a3a',skin:'#d0a283',hair:'#4a3a2a',shoe:'#1a1a1a',hat:'knit',hatC:'#2a2a2a',hold:'bottleH'},
  dg:{suit:'#3a4866',top:'#2e2017',stripe:'#3a4866',skin:'#c4957a',hair:'#2a1c14',shoe:'#101010',hat:'none',hatC:'#222',chain:1,leather:1,shades:1,mullet:1}
};
/* бабка у подъезда: headscarf, coat, felt boots, авоська */
function drawGranny(g,pose){
  const SC='#b83a3a',CO='#4a3e56',COD='#3a3044',SK='#d0a488',SKD='#b08868';
  const bag=(x,y)=>{g.strokeStyle='#c9b98a';g.lineWidth=1;g.strokeRect(x,y,9,9);g.beginPath();g.moveTo(x,y+4);g.lineTo(x+9,y+4);g.moveTo(x+4,y);g.lineTo(x+4,y+9);g.stroke();R(g,'#8a6a3a',x+1,y+5,3,3);R(g,'#8a6a3a',x+5,y+2,3,3);R(g,'#c9a24a',x+5,y+6,3,2);R(g,'#c9b98a',x+3,y-4,1,4);R(g,'#c9b98a',x+6,y-4,1,4);};
  const head=(hx,hy,open)=>{R(g,SK,hx+1,hy+2,10,10);R(g,SKD,hx+9,hy+3,2,9);EYE(g,'#241a14',hx+3,hy+6,2,1);EYE(g,'#241a14',hx+7,hy+6,2,1);R(g,SKD,hx+3,hy+4,2,1);R(g,SKD,hx+7,hy+4,2,1);
    if(open)R(g,'#3a0d0d',hx+4,hy+9,4,3);else R(g,'#8a5a4a',hx+4,hy+10,4,1);
    R(g,SC,hx-1,hy-1,14,5);R(g,SC,hx-1,hy,2,12);R(g,SC,hx+11,hy,2,12);poly(g,SC,[[hx+3,hy+12],[hx+9,hy+12],[hx+6,hy+16]]);for(const [a,b] of [[1,1],[6,0],[10,2],[0,7],[11,8]])R(g,'#f0e8d8',hx+a,hy+b,1,1);};
  if(pose==='sit'||pose==='sitQ'){
    R(g,'#7a7872',14,50,5,13);R(g,'#7a7872',45,50,5,13);R(g,'#5c5a55',15,38,3,12);R(g,'#5c5a55',46,38,3,12);R(g,'#2f5b3e',8,39,48,3);R(g,'#2f5b3e',8,43,48,3);R(g,'#2f5b3e',8,47,48,3);R(g,'#3c6e4d',8,47,48,1);R(g,'#243f2e',8,50,48,1);
    R(g,CO,22,34,20,16);R(g,COD,22,46,20,4);R(g,CO,24,48,7,8);R(g,CO,33,48,7,8);R(g,'#6a6a6a',24,56,7,7);R(g,'#6a6a6a',33,56,7,7);R(g,'#4a4a4a',24,62,7,1);R(g,'#4a4a4a',33,62,7,1);
    R(g,CO,19,32,26,10);R(g,COD,31,33,2,17);R(g,CO,18,34,5,12);R(g,CO,41,34,5,12);R(g,SK,20,45,4,3);R(g,SK,41,45,4,3);R(g,'#2a2a2a',26,44,12,4);R(g,'#e8e0c0',28,45,1,1);R(g,'#e8e0c0',32,46,1,1);
    head(26,18,false);bag(44,48);
    if(pose==='sitQ'){g.fillStyle='#ffd040';g.font='bold 14px sans-serif';g.textAlign='center';g.textBaseline='top';g.fillText('?',32,0);}
    return;}
  const up=pose==='shout'||pose==='shoutX',sw=pose==='swing';
  R(g,'#6a6a6a',24,54,7,9);R(g,'#6a6a6a',33,54,7,9);R(g,'#4a4a4a',24,62,7,1);R(g,'#4a4a4a',33,62,7,1);
  R(g,CO,20,26,24,30);R(g,COD,20,52,24,4);R(g,COD,31,28,2,26);R(g,'#5a4e66',22,27,4,24);
  if(up){R(g,CO,12,14,6,16);R(g,CO,46,14,6,16);R(g,SK,12,11,6,4);R(g,SK,46,11,6,4);}
  else if(sw){R(g,CO,42,24,16,5);R(g,SK,56,24,4,5);bag(52,14);R(g,CO,15,27,5,16);R(g,SK,15,42,5,3);}
  else{R(g,CO,15,27,5,17);R(g,CO,44,27,5,17);R(g,SK,15,43,5,3);R(g,SK,44,43,5,3);bag(43,46);}
  head(26,10,up);
  if(pose==='shoutX'){g.fillStyle='#ff3a2a';g.font='bold 16px sans-serif';g.textAlign='center';g.textBaseline='top';g.fillText('!',32,-3);}
}
function drawGop(g,pose,P){
  const AR=P.vest?P.skin:P.top;
  const SKD=shadeHex(P.skin,.78),TOPL=shadeHex(P.top,P.leather?2.2:1.4),TOPD=shadeHex(P.top,.7),SUD=shadeHex(P.suit,.7),ST=P.stripe;
  function head(hx,hy,open){
    R(g,P.skin,hx,hy,12,12);R(g,SKD,hx+10,hy+1,2,11);R(g,SKD,hx,hy+11,12,1);
    R(g,P.hair,hx,hy,12,2);R(g,P.hair,hx,hy,1,5);R(g,P.hair,hx+11,hy,1,5);
    R(g,'#241a14',hx+2,hy+4,3,1);R(g,'#241a14',hx+7,hy+4,3,1);EYE(g,'#0e0e0e',hx+3,hy+5,2,1);EYE(g,'#0e0e0e',hx+7,hy+5,2,1);
    R(g,SKD,hx+5,hy+6,2,3); if(P.stache)R(g,'#3a2a20',hx+3,hy+8,6,1);
    if(P.shades){R(g,'#0a0a0a',hx+1,hy+4,10,3);R(g,'#4a4a52',hx+2,hy+4,2,1);R(g,'#4a4a52',hx+7,hy+4,2,1);}
    if(P.mullet){R(g,P.hair,hx-1,hy+1,2,10);R(g,P.hair,hx+11,hy+1,2,10);}
    if(open)R(g,'#3a0d0d',hx+4,hy+9,4,2);else R(g,'#5a3022',hx+4,hy+9,4,1);
    if(P.hat==='cap'){R(g,P.hatC,hx-1,hy-3,14,4);R(g,shadeHex(P.hatC,.6),hx-2,hy,16,2);R(g,shadeHex(P.hatC,1.35),hx+1,hy-3,10,1);}
    else if(P.hat==='paper'){R(g,'#d8d4c8',hx-1,hy-2,14,3);R(g,'#d8d4c8',hx+1,hy-4,10,2);R(g,'#d8d4c8',hx+3,hy-6,6,2);R(g,'#9a968a',hx+2,hy-1,8,1);R(g,'#9a968a',hx+4,hy-4,4,1);}
    else if(P.hat==='helmet'){R(g,P.hatC,hx-1,hy-4,14,5);R(g,P.hatC,hx+1,hy-6,10,2);R(g,shadeHex(P.hatC,.7),hx-2,hy,16,1);R(g,shadeHex(P.hatC,1.15),hx+2,hy-5,6,1);}
    else if(P.hat==='knit'){R(g,P.hatC,hx,hy-3,12,5);R(g,'#e8e8e8',hx,hy-1,12,1);R(g,P.hatC,hx+2,hy-6,8,3);R(g,'#e8e8e8',hx+2,hy-5,8,1);R(g,P.hatC,hx+4,hy-8,4,2);R(g,'#e8e8e8',hx+4,hy-10,4,2);}
  }
  function chain(y){if(!P.chain)return;R(g,'#e3b94a',27,y,10,1);R(g,'#e3b94a',28,y+1,8,1);R(g,'#e3b94a',30,y+2,4,1);R(g,'#ffd978',31,y+3,2,2);}
  function armStripes(x,y,h){if(P.leather||P.vest||P.bare)return;R(g,ST,x,y,1,h);R(g,ST,x+2,y,1,h);}
  if(pose==='dead'){
    R(g,'#3d0a0a',6,59,52,4);R(g,'#520e0e',12,58,38,1);
    R(g,P.suit,36,55,22,6);R(g,ST,36,55,22,1);R(g,P.shoe,57,54,5,7);
    R(g,P.top,12,53,26,8);R(g,TOPD,12,59,26,2);R(g,AR,18,50,12,3);R(g,P.skin,28,50,4,3);
    R(g,P.skin,1,53,11,9);R(g,P.hair,1,53,2,9);R(g,'#0e0e0e',6,56,2,1);R(g,'#0e0e0e',6,59,2,1);
    if(P.hat==='cap')R(g,P.hatC,44,50,10,3);if(P.hat==='knit'){R(g,P.hatC,46,49,9,4);R(g,'#e8e8e8',46,50,9,1);}
    return;
  }
  if(pose==='squat'){
    R(g,P.shoe,14,60,11,3);R(g,P.shoe,39,60,11,3);
    R(g,P.suit,17,48,7,12);R(g,P.suit,40,48,7,12);R(g,ST,17,48,1,12);R(g,ST,19,48,1,12);R(g,ST,46,48,1,12);R(g,ST,44,48,1,12);
    R(g,P.suit,17,43,12,6);R(g,P.suit,35,43,12,6);R(g,SUD,17,48,7,1);R(g,SUD,40,48,7,1);R(g,P.suit,26,46,12,6);
    R(g,P.top,22,30,20,16);R(g,TOPD,22,42,20,4);R(g,TOPL,32,31,1,13);R(g,TOPL,27,29,10,2);
    R(g,AR,17,32,5,13);R(g,AR,42,32,5,13);armStripes(17,33,11);armStripes(44,33,11);
    R(g,P.skin,17,45,5,4);R(g,P.skin,42,45,5,4);
    if(P.cig)R(g,'#e8e4d8',15,46,4,1);
    chain(30);head(26,17,false);return;
  }
  if(pose==='sit'){R(g,'#6a4a2a',16,50,32,3);R(g,'#4a3218',16,53,32,1);R(g,'#5a3a1a',19,54,3,9);R(g,'#5a3a1a',42,54,3,9);
    R(g,P.suit,19,42,26,9);R(g,SUD,19,49,26,2);R(g,P.suit,21,51,8,9);R(g,P.suit,35,51,8,9);R(g,P.shoe,20,59,10,4);R(g,P.shoe,34,59,10,4);
    R(g,P.top,20,23,24,21);if(P.fat){R(g,P.top,15,29,34,16);R(g,shadeHex(P.top,1.4),17,31,3,12);R(g,'#e8e4dc',30,23,4,12);R(g,'#7a1a1a',31,24,2,11);R(g,shadeHex(P.top,.7),15,43,34,2);}
    R(g,AR,13,26,5,15);R(g,AR,46,26,5,15);R(g,P.skin,13,40,5,4);R(g,P.skin,46,40,5,4);
    if(P.hold==='bottleH'){R(g,'#2c5a33',47,33,5,11);R(g,'#5d9a68',48,35,1,8);R(g,'#2c5a33',48,30,3,4);}
    head(26,10,false);if(P.fat){R(g,'#c86a5a',29,16,6,3);}return;}
  const wl=pose==='walk1'?-3:0,wr=pose==='walk2'?-3:0,hb=(pose==='walk1'||pose==='walk2')?1:0;
  R(g,P.suit,24,40,7,20+wl);R(g,P.shoe,23,60+wl,8,3);R(g,ST,24,40,1,20+wl);R(g,ST,26,40,1,20+wl);
  R(g,P.suit,33,40,7,20+wr);R(g,P.shoe,33,60+wr,8,3);R(g,ST,39,40,1,20+wr);R(g,ST,37,40,1,20+wr);
  R(g,P.suit,28,40,8,4);
  R(g,P.top,21,22+hb,22,19);R(g,TOPD,21,38+hb,22,3);R(g,TOPL,32,23+hb,1,16);R(g,TOPL,27,21+hb,10,2);
  if(P.coat){R(g,P.top,21,40,22,13);R(g,TOPD,31,42,2,11);R(g,TOPD,21,52,22,1);}
  if(P.fat){R(g,P.top,15,26+hb,34,18);R(g,shadeHex(P.top,1.4),17,28+hb,3,14);R(g,'#e8e4dc',30,21+hb,4,14);R(g,'#7a1a1a',31,22+hb,2,12);R(g,shadeHex(P.top,.7),15,42+hb,34,2);R(g,P.suit,22,40,20,4);}
  if(P.leather){R(g,shadeHex(P.top,1.6),23,24+hb,2,13);R(g,TOPL,27,23+hb,2,6);R(g,TOPL,35,23+hb,2,6);}
  const sw=pose==='walk1'?2:pose==='walk2'?-2:0;
  R(g,AR,16,23+hb+sw,5,17);armStripes(16,24+hb+sw,15);R(g,P.skin,16,40+hb+sw,5,4);
  if(pose==='attack'){R(g,AR,34,24,9,9);R(g,P.skin,30,25,12,10);R(g,SKD,30,29,12,1);R(g,SKD,30,32,12,1);R(g,shadeHex(P.skin,1.12),31,25,10,1);}
  else if(pose==='spit'){R(g,AR,43,16,5,11);R(g,AR,38,16,6,4);R(g,P.skin,34,16,5,4);R(g,'#222',35,21,1,1);R(g,'#ddd',36,23,1,1);R(g,'#222',33,25,1,1);}
  else {R(g,AR,43,23+hb-sw,5,17);armStripes(45,24+hb-sw,15);R(g,P.skin,43,40+hb-sw,5,4);}
  if(P.vest){R(g,P.skin,27,21+hb,10,4);R(g,P.skin,21,22+hb,3,3);R(g,P.skin,40,22+hb,3,3);R(g,'#c9b98a',30,32+hb,5,3);R(g,'#b8a878',24,36+hb,3,2);}
  chain(22+hb);head(26,8+hb,pose==='attack'||pose==='spit');
  const at=pose==='attack',th=pose==='spit';
  if(P.hold==='rosette'){if(at){R(g,'#2c5a33',31,20,5,11);R(g,'#9fd0a8',30,19,7,2);R(g,'#9fd0a8',31,17,2,2);R(g,'#9fd0a8',34,17,2,2);}else{R(g,'#2c5a33',44,42+hb,3,8);R(g,'#9fd0a8',43,49+hb,5,2);R(g,'#9fd0a8',43,51+hb,1,2);R(g,'#9fd0a8',47,51+hb,1,2);}}
  if(P.hold==='rebar'){if(at){R(g,'#7a5a44',4,26,56,3);R(g,'#5a4030',4,26,2,3);}else{R(g,'#7a5a44',45,8+hb,2,36);R(g,'#5a4030',45,8+hb,2,2);}}
  if(P.hold==='drill'){if(at){R(g,'#d9b12a',24,24,16,10);R(g,'#b8921e',24,32,16,2);R(g,'#9a9a9a',30,19,4,6);R(g,'#555',31,20,2,2);}else{R(g,'#d9b12a',42,38+hb,12,7);R(g,'#333',44,44+hb,4,5);R(g,'#9a9a9a',54,40+hb,7,2);}}
  if(P.hold==='wrench'){if(at){R(g,'#b0302a',28,22,3,12);R(g,'#8a8a8a',25,18,9,5);R(g,'#5a5a5a',27,20,5,1);}else{R(g,'#b0302a',44,34+hb,3,12);R(g,'#8a8a8a',42,31+hb,8,4);}}
  if(P.hold==='shovel'){if(at){R(g,'#6a4a2e',12,28,38,2);R(g,'#5a5a5e',4,23,11,11);R(g,'#ff7a2a',6,27,3,2);R(g,'#ffb040',10,29,2,2);}else{R(g,'#6a4a2e',45,4+hb,2,40);R(g,'#5a5a5e',41,42+hb,10,9);}}
  if(P.hold==='boombox'){const bx=37,by=4+hb;R(g,'#9a9ca0',bx,by,20,12);R(g,'#c9cbd0',bx,by,20,1);R(g,'#5a5c60',bx,by+11,20,1);R(g,'#1a1a1c',bx+2,by+3,6,6);R(g,'#1a1a1c',bx+12,by+3,6,6);R(g,'#4a4a4e',bx+4,by+5,2,2);R(g,'#4a4a4e',bx+14,by+5,2,2);R(g,'#2a2a2c',bx+8,by+4,4,3);R(g,'#c02020',bx+9,by+8,2,1);R(g,'#6a6c70',bx+4,by-3,12,1);R(g,'#6a6c70',bx+4,by-3,1,3);R(g,'#6a6c70',bx+15,by-3,1,3);}
  if(P.hold==='fuse'){R(g,'#e8e4d8',43,40+hb,5,8);R(g,'#c9a54a',43,39+hb,5,2);R(g,'#c9a54a',43,47+hb,5,2);}
  if(P.hold==='dvor'){if(at){R(g,'#7a5a3a',8,28,48,2);poly(g,'#c9a24a',[[0,22],[12,26],[12,34],[0,38]]);R(g,'#8a6a2a',2,29,10,1);}
    else if(th){R(g,'#5a3a22',44,24,14,5);R(g,'#2a2a2c',20,22,26,3);R(g,'#4a4a4e',20,22,26,1);R(g,'#1a1a1a',18,22,3,3);R(g,'#5a3a22',36,25,6,3);}
    else{R(g,'#7a5a3a',45,2+hb,2,46);poly(g,'#c9a24a',[[41,46+hb],[51,46+hb],[54,62],[38,62]]);R(g,'#8a6a2a',43,50+hb,8,1);}}
  if(P.fat&&pose!=='attack')R(g,'#c86a5a',29,14+hb,6,3);
  if(P.hold==='bottleH'){if(th){R(g,'#2c5a33',37,3,5,13);R(g,'#5d9a68',38,4,1,10);R(g,'#2c5a33',38,0,3,4);}else if(!at){R(g,'#2c5a33',44,36+hb,5,12);R(g,'#5d9a68',45,38+hb,1,9);R(g,'#2c5a33',45,33+hb,3,4);}}
  if(P.hold==='lolly'){if(at||th){R(g,'#e8e0c8',30,10,2,16);R(g,'#e83a2a',27,4,9,8);R(g,'#ffb040',28,5,3,3);R(g,'#c02010',34,6,3,2);R(g,'#ffd060',35,3,2,2);}else{R(g,'#e8e0c8',45,30+hb,2,14);R(g,'#e83a2a',42,23+hb,9,8);R(g,'#ffb040',43,24+hb,3,3);R(g,'#c02010',49,25+hb,3,2);R(g,'#ffd060',50,22+hb,2,2);}}
  if(P.hold==='brick'){if(th){R(g,'#a83a2a',36,4,9,5);R(g,'#c85a4a',36,4,9,1);}else if(!at){R(g,'#a83a2a',43,40+hb,8,5);R(g,'#8a8a8e',15,40+hb,3,6);}}
  if(P.hold==='obrezH'){if(th||at){R(g,'#2a2c30',30,24,24,3);R(g,'#2a2c30',30,27,24,3);R(g,'#44474d',30,24,24,1);R(g,'#6b3f22',24,26,8,6);}else{R(g,'#2a2c30',44,30+hb,3,18);R(g,'#2a2c30',47,30+hb,2,18);R(g,'#6b3f22',43,46+hb,6,8);}}
  if(P.hold==='komp'){if(at){R(g,'#8a8a8e',28,19,11,8);R(g,'#c02020',31,21,4,3);R(g,'#e8e0a8',38,17,6,4);}else{R(g,'#8a8a8e',43,37+hb,8,6);R(g,'#c02020',45,38+hb,3,2);}R(g,'#c9a54a',25,26+hb,3,3);}
  if(P.hold==='jar'){if(th){R(g,'#5a7a3a',37,4,8,9);R(g,'#8aaa5a',38,6,2,6);R(g,'#c9c0a0',37,3,8,2);}else if(!at){R(g,'#5a7a3a',43,38+hb,7,8);R(g,'#8aaa5a',44,40+hb,2,5);R(g,'#c9c0a0',43,37+hb,7,2);}}
}
const POSES=['squat','stand','walk1','walk2','attack','spit','dead','sit'];
function drawGuitar(g,pose){
  if(pose==='chord'){g.save();g.translate(32,6);g.rotate(-.35);R(g,'#3a2414',-2,-4,3,26);g.fillStyle='#a0602a';g.beginPath();g.ellipse(0,26,8,10,0,0,7);g.fill();g.fillStyle='#1a0e08';g.beginPath();g.arc(0,24,2.5,0,7);g.fill();g.restore();return;}
  if(pose==='swing'){g.save();g.translate(12,26);g.rotate(-1.3);R(g,'#3a2414',-2,-18,3,20);g.fillStyle='#a0602a';g.beginPath();g.ellipse(0,8,8,10,0,0,7);g.fill();g.restore();return;}
  g.fillStyle='#5a3014';g.beginPath();g.ellipse(30,40,10,8,-.35,0,7);g.fill();g.fillStyle='#a0602a';g.beginPath();g.ellipse(30,40,9,7,-.35,0,7);g.fill();
  g.fillStyle='#1a0e08';g.beginPath();g.arc(32,39,2.5,0,7);g.fill();g.save();g.translate(37,36);g.rotate(-.55);R(g,'#3a2414',0,-1,20,3);R(g,'#d8d0b8',0,0,20,1);R(g,'#2a1a0e',19,-2,5,5);g.restore();
  const up=pose==='play1';R(g,'#d0a283',up?30:28,up?33:40,5,4);R(g,'#d0a283',46,28,4,4);}
function drawDancer(g,pose,P){
  const SK=P.skin,SKD=shadeHex(SK,.76),SKL=shadeHex(SK,1.14);
  if(pose==='dead'){R(g,'#3d0a0a',6,59,52,4);R(g,P.suit,36,55,22,6);R(g,P.stripe,36,55,22,1);R(g,P.shoe,57,54,5,7);R(g,SK,12,53,26,8);R(g,SKD,12,59,26,2);R(g,SK,1,53,11,9);R(g,P.hair,1,53,2,9);return;}
  const d2=pose==='dance2',hb=d2?2:0,w1=pose==='walk1',w2=pose==='walk2';
  if(d2){R(g,P.suit,24,40,7,20);R(g,P.shoe,23,60,8,3);R(g,P.suit,33,40,7,9);R(g,P.suit,36,47,11,6);R(g,P.shoe,45,47,6,6);R(g,P.stripe,24,40,1,20);R(g,P.stripe,36,47,11,1);}
  else{const a=w1?-3:0,b=w2?-3:0;R(g,P.suit,23,40,7,20+a);R(g,P.shoe,22,60+a,9,3);R(g,P.suit,34,40,7,20+b);R(g,P.shoe,33,60+b,9,3);R(g,P.stripe,23,40,1,20+a);R(g,P.stripe,40,40,1,20+b);}
  R(g,P.suit,26,40,12,4);
  R(g,SK,21,22+hb,22,19);R(g,SKD,21,38+hb,22,3);R(g,SKL,23,23+hb,6,4);R(g,SKD,24,29+hb,7,1);R(g,SKD,33,29+hb,7,1);R(g,SKD,31,24+hb,2,13);R(g,SKD,27,32+hb,10,1);R(g,SKD,27,35+hb,10,1);R(g,'#8a5a4a',26,26+hb,1,1);R(g,'#8a5a4a',37,26+hb,1,1);
  R(g,'#e3b94a',27,22+hb,10,1);R(g,'#e3b94a',29,23+hb,6,1);R(g,'#ffd978',31,24+hb,2,2);
  if(pose==='dance1'){R(g,SK,14,6,5,19);R(g,SK,45,6,5,19);R(g,SKD,14,20,5,1);R(g,SKL,13,3,7,4);R(g,SKL,44,3,7,4);}
  else if(d2){R(g,SK,5,24,17,5);R(g,SKL,1,23,5,5);R(g,SK,43,12,5,14);R(g,SK,43,10,9,4);R(g,SKL,50,8,4,5);}
  else{const s=w1?2:w2?-2:0;R(g,SK,16,23+s,5,17);R(g,SK,43,23-s,5,17);R(g,SKL,16,40+s,5,4);R(g,SKL,43,40-s,5,4);}
  const hx=26,hy=8+hb;R(g,SK,hx,hy,12,12);R(g,SKD,hx+10,hy+1,2,11);R(g,P.hair,hx,hy,12,2);EYE(g,'#0e0e0e',hx+3,hy+5,2,1);EYE(g,'#0e0e0e',hx+7,hy+5,2,1);R(g,SKD,hx+5,hy+6,2,3);
  R(g,pose==='stand'?'#5a3022':'#3a0d0d',hx+4,hy+9,4,pose==='stand'?1:2);
  if(P.hat==='cap'){R(g,P.hatC,hx-1,hy-3,14,4);R(g,shadeHex(P.hatC,.6),hx-2,hy,16,2);}}
function drawGiant(g,pose){
  const SK='#4a3024',SKD='#36221a',SKL='#6a4634',TK='#141416',PN='#1e1f24',BT='#0c0c0c';
  const land=pose==='land',grab=pose==='grab',w1=pose==='walk1',w2=pose==='walk2',dy=land?8:0;
  if(land){R(g,PN,16,46,12,14);R(g,PN,36,46,12,14);R(g,BT,14,59,15,4);R(g,BT,35,59,15,4);}
  else{const a=w1?-3:0,b=w2?-3:0;R(g,PN,19,40,11,20+a);R(g,PN,34,40,11,20+b);R(g,BT,18,59+a,13,4);R(g,BT,33,59+b,13,4);R(g,'#2a2b30',20,52+a,9,1);R(g,'#2a2b30',35,52+b,9,1);}
  R(g,PN,20,38+dy,24,5);R(g,'#3a3a3a',20,38+dy,24,1);R(g,'#8a8a8a',31,38+dy,3,2);
  // V torso
  poly(g,SK,[[12,14+dy],[52,14+dy],[46,40+dy],[18,40+dy]]);poly(g,TK,[[20,16+dy],[44,16+dy],[42,40+dy],[22,40+dy]]);R(g,'#2a2a2e',24,18+dy,1,20);
  R(g,SKL,13,15+dy,6,3);R(g,SKL,45,15+dy,6,3);
  // arms
  if(grab){R(g,SK,8,16+dy,8,10);R(g,SK,48,16+dy,8,10);R(g,SK,14,22+dy,12,9);R(g,SK,38,22+dy,12,9);R(g,SKL,22,24+dy,6,7);R(g,SKL,36,24+dy,6,7);}
  else if(land){R(g,SK,6,16+dy,8,24);R(g,SK,50,16+dy,8,24);R(g,SKD,6,40+dy,8,6);R(g,SKD,50,40+dy,8,6);}
  else{const s=w1?2:w2?-2:0;R(g,SK,5,16+s,9,22);R(g,SK,50,16-s,9,22);R(g,SKD,6,26+s,7,1);R(g,SKD,51,26-s,7,1);R(g,SKD,5,38+s,9,6);R(g,SKD,50,38-s,9,6);}
  // head: bald, shades
  const hx=25,hy=1+dy;R(g,SK,hx,hy,14,14);R(g,SKD,hx+12,hy+1,2,13);R(g,SKL,hx+3,hy,6,2);R(g,SK,hx+2,hy+13,10,3);R(g,'#060606',hx+1,hy+5,12,3);EYE(g,'#3a3a44',hx+2,hy+5,3,1);EYE(g,'#3a3a44',hx+8,hy+5,3,1);R(g,SKD,hx+4,hy+11,6,1);}

const SPR={};
SPR.bb={};for(const p of ['sit','stand','shout','shoutX','swing'])SPR.bb[p]=bakeH(g=>drawGranny(g,p));SPR.bb.sitQ=bakeH(g=>drawGranny(g,'sit'),g=>{g.fillStyle='#ffd040';g.font='bold 14px sans-serif';g.textAlign='center';g.textBaseline='top';g.fillText('?',32,0);});
SPR.bb.shoutX=bakeH(g=>drawGranny(g,'shout'),g=>{g.fillStyle='#ff3a2a';g.font='bold 16px sans-serif';g.textAlign='center';g.textBaseline='top';g.fillText('!',32,-3);});
SPR.mgB={};for(const p of POSES)SPR.mgB[p]=bakeH(g=>drawGop(g,p,PAL.mgB));
for(const k in PAL){if(k==='dg'||k==='mgB')continue;SPR[k]={};for(const p of POSES)SPR[k][p]=bakeH(g=>drawGop(g,p,PAL[k]),(PAL[k].cig&&p==='squat')?g=>R(g,'#ff6a1e',14,46,1,1):null);}
for(const p of ['stand','play1','play2','walk1','walk2','squat'])SPR.gt[p]=bakeH(g=>{drawGop(g,p==='play1'||p==='play2'?'stand':p,PAL.gt);drawGuitar(g,p);});
SPR.gt.chord=bakeH(g=>{drawGop(g,'spit',PAL.gt);drawGuitar(g,'chord');});SPR.gt.swing=bakeH(g=>{drawGop(g,'attack',PAL.gt);drawGuitar(g,'swing');});
SPR.dzB={};for(const p of ['dance1','dance2','stand','walk1','walk2','dead'])SPR.dzB[p]=bakeH(g=>drawDancer(g,p,PAL.dz));
SPR.gg={};for(const p of ['stand','walk1','walk2','land','grab'])SPR.gg[p]=bakeH(g=>drawGiant(g,p));
cityArt();metroArt();siteArt();
/* Барыга: closed case at his side / case held open towards you */
SPR.dealer=bake(g=>{drawGop(g,'stand',PAL.dg);R(g,'#4a2e1a',44,38,15,11);R(g,'#2a1a10',48,36,7,2);R(g,'#c9a54a',46,39,2,1);R(g,'#c9a54a',55,39,2,1);R(g,'#3a2414',44,48,15,1);});
SPR.dealerOpen=bake(g=>{drawGop(g,'stand',PAL.dg);R(g,PAL.dg.top,17,28,6,8);R(g,PAL.dg.top,41,28,6,8);
  R(g,'#4a2e1a',15,20,34,11);R(g,'#3a2414',15,30,34,1);R(g,'#4a2e1a',15,31,34,11);R(g,'#6a1a1a',17,32,30,8);
  R(g,'#c9a54a',19,34,5,3);R(g,'#2b2c30',26,34,8,3);R(g,'#dfe8ea',37,33,3,6);R(g,'#f0f0ec',42,35,4,3);R(g,PAL.dg.skin,14,34,3,4);R(g,PAL.dg.skin,47,34,3,4);});
SPR.vodkaFly=[0,1].map(f=>bake(g=>{g.translate(32,32);g.rotate(f?1.1:-.4);R(g,'#cfe0e4',-4,-10,8,18);R(g,'#cfe0e4',-2,-16,4,6);R(g,'#c02020',-2,-18,4,3);R(g,'#f4f4f0',-4,-4,8,6);R(g,'#ffffff',-3,-9,1,14);}));
SPR.puddle=bake(g=>{R(g,'#4c5a60',14,59,36,4);R(g,'#5f7078',18,58,26,2);R(g,'#e8f0f2',20,60,2,1);R(g,'#e8f0f2',36,59,2,1);R(g,'#cfe0e4',28,57,4,3);R(g,'#c02020',42,60,3,2);});
SPR.shards=bake(g=>{const r=rng(71);for(let i=0;i<18;i++)R(g,r()<.6?'#e8f4f6':'#9fc0c8',16+((r()*32)|0),18+((r()*30)|0),2,2);});
/* dog: low, fast, always drawn in profile */
function drawDog(g,pose){
  const C='#6a4a2a',D='#4a321c',L='#8a6a44';
  if(pose==='dead'){R(g,'#3d0a0a',8,60,48,3);R(g,C,10,55,38,6);R(g,L,12,55,30,1);R(g,C,46,54,11,7);R(g,D,55,56,4,3);R(g,D,14,60,14,2);R(g,D,32,60,12,2);R(g,C,4,56,8,2);return;}
  const w=pose==='walk1'?1:pose==='walk2'?-1:0,at=pose==='attack';
  R(g,C,18,44,30,10);R(g,L,18,44,30,2);R(g,D,20,52,26,2);R(g,D,30,46,6,4);
  R(g,C,6,at?42:38,14,11);R(g,D,1,at?48:43,7,5);R(g,'#111',0,at?48:43,2,2);R(g,D,14,at?38:34,4,6);EYE(g,'#111',9,at?45:41,2,2);
  if(at){R(g,'#3a0d0d',1,53,8,3);R(g,'#eeeeee',2,53,1,1);R(g,'#eeeeee',6,53,1,1);}
  for(const [x,o] of [[20,w],[26,-w],[40,-w],[45,w]]){R(g,D,x+o*2,54,3,9);R(g,'#2a1a10',x+o*2,62,4,1);}
  R(g,C,47,40+(w>0?-2:0),8,3);R(g,C,53,37+(w>0?-2:0),3,4);
}
function drawRat(g,pose){
  const C='#4a4038',D='#2e2822';
  if(pose==='dead'){R(g,'#3d0a0a',18,61,26,2);R(g,C,20,56,16,5);R(g,D,24,53,1,4);R(g,D,30,53,1,4);R(g,'#b88a80',36,59,14,1);return;}
  const w=pose==='walk1'?1:pose==='walk2'?-1:0,at=pose==='attack';
  R(g,C,22,52-(at?2:0),18,8);R(g,'#5a5048',22,52-(at?2:0),18,2);R(g,C,14,at?50:54,10,6);R(g,'#c89090',12,at?52:56,3,2);EYE(g,'#ff2a2a',17,at?51:55,1,1);R(g,D,19,at?48:52,3,3);
  R(g,'#b88a80',40,56+w,14,1);R(g,'#b88a80',53,55+w,4,1);for(const [x,o] of [[24,w],[36,-w]])R(g,D,x+o,60,2,3);
  if(at){R(g,'#eeeeee',13,55,1,2);R(g,'#eeeeee',15,55,1,2);}
}
function drawSpider(g,pose){
  const B='#171110',H='#3a2a22',lift=pose==='leap'?-12:0,w=pose==='walk1'?3:pose==='walk2'?-3:0;
  if(pose==='dead'){R(g,'#3a5a1a',10,58,44,5);R(g,'#5a8a2a',16,57,30,2);R(g,B,22,52,20,8);g.strokeStyle=B;g.lineWidth=2;for(let i=0;i<4;i++)for(const sd of [-1,1]){g.beginPath();g.moveTo(32+sd*6,54);g.lineTo(32+sd*(10+i*3),46+i*2);g.lineTo(32+sd*(12+i*4),50+i);g.stroke();}return;}
  g.strokeStyle=B;g.lineWidth=2;
  for(let i=0;i<4;i++)for(const sd of [-1,1]){const k=(i%2?w:-w)*sd;g.beginPath();g.moveTo(32+sd*5,48+lift);g.lineTo(32+sd*(13+i*4),(pose==='leap'?30:34)+i*4+k+lift);g.lineTo(32+sd*(19+i*5),pose==='leap'?44+i*4+lift:63);g.stroke();}
  R(g,B,22,44+lift,20,15);R(g,B,24,42+lift,16,2);R(g,B,25,38+lift,14,7);
  const r=rng(140);for(let i=0;i<40;i++)R(g,H,22+((r()*20)|0),38+lift+((r()*20)|0),1,1);
  R(g,'#5a1a14',27,50+lift,10,4);R(g,'#8a2a1a',29,51+lift,6,2);
  R(g,'#d8c8b0',28,46+lift,2,4);R(g,'#d8c8b0',34,46+lift,2,4);
}
function spiderEyes(pose){return g=>{if(pose==='dead')return;const lift=pose==='leap'?-12:0;for(const [x,y] of [[27,39],[30,38],[33,38],[36,39],[29,41],[34,41]])R(g,'#ff2a1a',x,y+lift,2,2);};}
SPR.spd={};for(const p of ['stand','walk1','walk2','leap','dead'])SPR.spd[p]=bake(g=>drawSpider(g,p),spiderEyes(p));SPR.spd.squat=SPR.spd.stand;SPR.spd.attack=SPR.spd.leap;SPR.spd.spit=SPR.spd.stand;
PAL.kc2={suit:'#2a2622',top:'#8a6a50',stripe:'#2a2622',skin:'#8a6a50',hair:'#1a1410',shoe:'#101010',hat:'none',hatC:'#222',vest:1,hold:'shovel',stache:1};
SPR.kc2={};for(const p of POSES)SPR.kc2[p]=bakeH(g=>{drawGop(g,p,PAL.kc2);R(g,'#3a2a1a',22,30,20,2);R(g,'#2a1a10',24,36,3,8);R(g,'#2a1a10',36,34,3,10);},
  g=>{if(p==='dead')return;const r=rng(150);for(let i=0;i<22;i++){const x=18+((r()*28)|0),y=14+((r()*16)|0);R(g,r()<.5?'#ff6a1a':'#ffb040',x,y,1+((r()*2)|0),2);}
    if(p==='attack'){R(g,'#ff4a1a',4,23,11,11);R(g,'#ffb040',7,26,5,4);}else if(p!=='squat'){R(g,'#ff4a1a',41,42,10,9);R(g,'#ffb040',43,44,5,4);}R(g,'#ff3a1a',29,13,2,1);R(g,'#ff3a1a',33,13,2,1);});
PAL.bt2={suit:'#26262a',top:'#e8e4d8',stripe:'#26262a',skin:'#c9786a',hair:'#5a4535',shoe:'#101010',hat:'cap',hatC:'#262628',chain:1,vest:1,stache:1};
SPR.bt2={};for(const p of POSES)SPR.bt2[p]=bakeH(g=>{drawGop(g,p,PAL.bt2);if(p!=='dead'&&p!=='squat'){R(g,'#e3b94a',25,26,14,1);R(g,'#e3b94a',27,28,10,1);R(g,'#ffd978',31,29,3,3);R(g,'#8a2a22',28,30,2,6);}});
SPR.throne=bake(g=>{R(g,'#5a1414',14,20,36,30);R(g,'#7a1e1e',17,23,30,24);R(g,'#c9a54a',14,20,36,2);R(g,'#c9a54a',14,20,2,30);R(g,'#c9a54a',48,20,2,30);
  R(g,'#6a1818',8,38,10,16);R(g,'#6a1818',46,38,10,16);R(g,'#c9a54a',8,38,10,2);R(g,'#c9a54a',46,38,10,2);R(g,'#7a1e1e',14,44,36,10);R(g,'#8a2a22',16,44,32,2);R(g,'#3a2414',14,54,4,9);R(g,'#3a2414',46,54,4,9);R(g,'#c9a54a',29,14,6,6);});
SPR.rug=bake(g=>{R(g,'#6e1818',0,58,64,6);R(g,'#c9a54a',0,58,64,1);R(g,'#c9a54a',0,63,64,1);for(let x=4;x<64;x+=8)R(g,'#1a2a5a',x,60,3,2);});
SPR.flamp=bake(g=>{R(g,'#3a2414',31,20,2,40);R(g,'#2a1a10',26,60,12,3);},g=>{R(g,'#e8b060',24,8,16,12);R(g,'#ffe0a0',27,10,10,8);});
SPR.furnace=bake(g=>{R(g,'#2a2624',16,26,32,37);R(g,'#3a3634',16,26,32,2);R(g,'#1a1614',22,38,20,16);R(g,'#5a5654',20,36,24,2);R(g,'#4a4644',28,6,8,20);},boilerE2);
function boilerE2(g){R(g,'#ff6a1a',24,42,16,10);R(g,'#ffb040',27,45,10,5);R(g,'#fff0a0',30,47,4,2);}
/* ---- Дом 11: trees, playground, new pickups ---- */
SPR.poplar=bake(g=>{const r=rng(141);R(g,'#5a5248',30,40,5,24);R(g,'#433c34',33,40,2,24);
  const lc=['#5a7a34','#6e8e3c','#4a6a2c','#86a04a','#9ab456'];for(let i=0;i<900;i++){const t=r(),y=2+t*44,w=(1-Math.abs(t-.45)*1.6)*11+2;const x=32+(r()*2-1)*w;R(g,lc[(r()*5)|0],x|0,y|0,1+(r()<.3),1);}
  for(let i=0;i<30;i++)R(g,'#e8e4dc',(20+r()*24)|0,(r()*48)|0,1,1);});
SPR.fir=bake(g=>{R(g,'#3a2a1c',30,54,4,10);for(let t=0;t<5;t++){const y=6+t*10,w=6+t*5;poly(g,t%2?'#2e5a3e':'#3a6a4a',[[32,y-6],[32+w,y+8],[32-w,y+8]]);R(g,'#5a9a6e',32-w+3,y+7,w,1);R(g,'#4a8a5e',32-2,y-3,2,8);}
  const r=rng(142);for(let i=0;i<60;i++)R(g,'#20402c',(10+r()*44)|0,(4+r()*50)|0,1,1);});
SPR.deadtree=bake(g=>{R(g,'#5a5048',29,26,6,38);R(g,'#3a3430',33,26,2,38);g.strokeStyle='#5a5048';g.lineCap='round';
  const br=(x,y,a,l,w)=>{if(l<3)return;const x2=x+Math.cos(a)*l,y2=y+Math.sin(a)*l;g.lineWidth=w;g.beginPath();g.moveTo(x,y);g.lineTo(x2,y2);g.stroke();br(x2,y2,a-.45,l*.68,Math.max(1,w*.65));br(x2,y2,a+.4,l*.62,Math.max(1,w*.6));};
  br(32,28,-Math.PI/2-.3,14,3);br(32,30,-Math.PI/2+.35,13,3);br(32,36,-Math.PI+.4,10,2);});
SPR.appletree=bake(g=>{const r=rng(143);R(g,'#4a3626',29,34,6,30);R(g,'#3a2a1c',33,34,2,30);
  const lc=['#4a7a30','#5e8e3a','#3e662a','#78a04a'];for(let i=0;i<1100;i++){const a=r()*6.28,d=Math.sqrt(r())*20;R(g,lc[(r()*4)|0],(32+Math.cos(a)*d*1.2)|0,(20+Math.sin(a)*d*.85)|0,1,1);}
  for(let i=0;i<14;i++){const a=r()*6.28,d=r()*17;R(g,'#c02a1a',(32+Math.cos(a)*d*1.2)|0,(20+Math.sin(a)*d*.85)|0,2,2);}});
SPR.rocket=bake(g=>{for(const x of [22,40])R(g,'#8a8f94',x,20,2,44);for(let y=26;y<62;y+=6){R(g,'#b8bcc0',22,y,20,1);}
  for(let y=18;y<60;y+=8){R(g,y%16?'#c0302a':'#e8e4d8',21,y,22,3);}poly(g,'#c0302a',[[32,0],[44,18],[20,18]]);R(g,'#e8e4d8',30,6,4,3);
  poly(g,'#2a5aa0',[[20,48],[12,63],[20,63]]);poly(g,'#2a5aa0',[[44,48],[52,63],[44,63]]);poly(g,'#c9ccd0',[[44,30],[62,62],[58,63],[44,36]]);});
SPR.carousel=bake(g=>{R(g,'#3a3d40',30,40,4,20);R(g,'#c0302a',6,50,52,4);R(g,'#8a1e1a',6,54,52,2);R(g,'#2a2a2c',12,56,40,4);
  for(const x of [10,22,42,54]){R(g,'#d8b030',x,36,2,14);}R(g,'#d8b030',10,36,46,2);R(g,'#e8c850',10,36,46,1);});
SPR.sandbox=bake(g=>{R(g,'#6a4a2a',4,52,56,10);R(g,'#8a6a42',4,52,56,2);R(g,'#c9b27a',8,54,48,5);R(g,'#b09a62',20,55,10,2);R(g,'#d02a1a',40,51,6,4);R(g,'#2a6ac0',14,53,5,3);});
SPR.apple=bake(g=>{R(g,'#b02418',28,54,9,8);R(g,'#d8402a',29,55,3,3);R(g,'#8a1a12',28,61,9,1);R(g,'#4a3020',32,51,1,3);R(g,'#4a7a2a',33,51,3,2);});
SPR.fuse=bake(g=>{R(g,'#e8e4d8',26,50,12,11);R(g,'#c9c5b8',26,59,12,2);R(g,'#c9a54a',25,48,14,3);R(g,'#c9a54a',25,60,14,3);R(g,'#f0d890',25,48,14,1);R(g,'#2a2a2a',30,53,4,4);},g=>R(g,'#ff4a2a',31,54,2,2));
SPR.liftkey=bake(g=>{R(g,'#c9a54a',22,54,8,8);R(g,'#1a1a1a',24,56,4,4);R(g,'#c9a54a',30,57,16,2);R(g,'#c9a54a',40,59,2,3);R(g,'#c9a54a',44,59,2,4);R(g,'#f0d890',30,57,16,1);R(g,'#d02a1a',14,52,8,6);R(g,'#e8e4d8',16,54,4,2);});
SPR.tapok=bake(g=>{poly(g,'#4a2a18',[[14,62],[18,54],[40,52],[52,55],[52,62]]);R(g,'#7a1e22',20,54,22,5);for(let x=21;x<41;x+=4)R(g,'#a83028',x,55,2,2);R(g,'#2a1a10',14,61,38,2);});
SPR.slipFly=[0,1].map(f=>bake(g=>{g.translate(32,32);g.rotate(f?.9:-.7);poly(g,'#4a2a18',[[-14,4],[-10,-4],[10,-5],[16,0],[14,5]]);R(g,'#7a1e22',-8,-4,16,5);R(g,'#a83028',-4,-3,2,2);R(g,'#a83028',2,-3,2,2);}));
SPR.fluff=bake(()=>{},g=>{R(g,'#f4f2ea',31,30,2,2);R(g,'#ffffff',32,29,1,1);R(g,'#e8e6de',30,31,1,1);});
SPR.leafFx=bake(g=>{R(g,'#a8742a',30,30,4,2);R(g,'#c08a3a',31,29,2,1);R(g,'#6a5a24',32,32,2,1);});
SPR.salt=bake(()=>{},g=>{R(g,'#f4f4f0',30,30,3,3);R(g,'#d8e0e4',33,32,2,2);R(g,'#ffffff',29,33,2,2);});
SPR.leaves=bake(g=>{const r=rng(151);const c=['#8a6a2a','#a8742a','#6a5a24','#c08a3a','#5a4a1a'];for(let i=0;i<260;i++){const x=10+r()*44,h=(1-Math.abs(x-32)/22)*12;R(g,c[(r()*5)|0],x|0,(63-r()*h)|0,2,1);}});
SPR.broom=bake(g=>{g.save();g.translate(32,40);g.rotate(.35);R(g,'#7a5a3a',-1,-36,2,40);poly(g,'#c9a24a',[[-5,2],[5,2],[8,20],[-8,20]]);R(g,'#8a6a2a',-5,6,10,1);g.restore();});
SPR.noteFx=bake(()=>{},g=>{R(g,'#ffd040',30,34,5,4);R(g,'#ffd040',34,22,1,13);R(g,'#ffd040',34,22,5,2);R(g,'#fff0a0',31,35,2,1);});
SPR.boomBits=bake(g=>{const r=rng(144);for(let i=0;i<16;i++)R(g,r()<.5?'#9a9ca0':'#1a1a1c',16+((r()*32)|0),20+((r()*30)|0),3,2);R(g,'#8a4a2a',30,40,10,1);R(g,'#8a4a2a',26,44,12,1);});
SPR.note=bake(g=>{R(g,'#bdb6a4',20,55,26,8);R(g,'#e6e1d2',18,54,26,8);for(let y=56;y<61;y+=2)R(g,'#6a6458',20,y,14,1);R(g,'#4a4438',36,56,6,4);});
SPR.rat={};for(const p of ['stand','walk1','walk2','attack','dead'])SPR.rat[p]=bakeH(g=>drawRat(g,p));SPR.rat.squat=SPR.rat.stand;SPR.rat.spit=SPR.rat.attack;
SPR.coal=bake(()=>{},g=>{R(g,'#ff6a1a',27,28,10,8);R(g,'#ffb040',29,30,5,3);R(g,'#3a2010',33,33,3,2);});
SPR.fire=[0,1].map(f=>bake(g=>{R(g,'#2a1a10',16,60,32,3);},g=>{const r=rng(120+f);for(let i=0;i<26;i++){const x=18+((r()*28)|0),h=4+((r()*(18-Math.abs(x-32)*.6))|0);R(g,r()<.5?'#ff6a1a':'#ffb040',x,60-h,2,h);}R(g,'#fff0a0',30,54-f*2,3,4);}));
SPR.steam=bake(g=>{const r=rng(130);for(let i=0;i<340;i++){const y=(r()*60)|0,sp=4+y*.35,x=32+((r()-.5)*2*sp)|0;R(g,r()<.5?'#d8dcd8':'#b8bcb8',x,63-y,2,2);}});
SPR.vent=bake(g=>{R(g,'#2a2a28',20,58,24,5);for(let x=22;x<44;x+=4)R(g,'#111',x,59,2,3);R(g,'#4a4a46',20,58,24,1);});
SPR.barrel=bake(g=>{R(g,'#3a4a3a',20,34,24,29);R(g,'#2a3a2a',20,40,24,2);R(g,'#2a3a2a',20,54,24,2);R(g,'#4a5a4a',22,34,3,29);R(g,'#6a3a1a',30,44,6,5);R(g,'#1a1a18',22,33,20,2);});
SPR.coalpile=bake(g=>{const r=rng(131);for(let i=0;i<160;i++){const x=10+((r()*44)|0),top=56-Math.max(0,10-Math.abs(x-32)*.45);R(g,['#141210','#26221e','#0a0908'][(r()*3)|0],x,top+((r()*(63-top))|0),2,2);}R(g,'#6a4a2e',40,40,2,20);R(g,'#5a5a5e',37,56,8,6);});
SPR.crate=bake(g=>{R(g,'#6a5236',16,38,32,25);R(g,'#7a6044',16,38,32,2);R(g,'#4a3a26',16,50,32,2);R(g,'#4a3a26',30,38,2,25);g.fillStyle='#2a2218';g.font='bold 6px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('ОВОЩИ',32,45);});
SPR.jars=bake(g=>{R(g,'#4a3a28',4,30,56,3);R(g,'#4a3a28',4,48,56,3);R(g,'#3a2e20',4,30,3,33);R(g,'#3a2e20',57,30,3,33);
  for(let i=0;i<6;i++){R(g,['#5a7a3a','#a83a2a','#c9a040'][i%3],8+i*8,38,6,10);R(g,'#c9c0a0',8+i*8,37,6,2);}for(let i=0;i<5;i++){R(g,['#a83a2a','#5a7a3a','#8a4a8a'][i%3],10+i*9,54,7,9);R(g,'#c9c0a0',10+i*9,53,7,2);}});
SPR.pump=bake(g=>{R(g,'#3a5a8a',16,40,32,18);R(g,'#4a6a9a',16,40,32,2);R(g,'#2a2a2a',14,58,36,5);R(g,'#5a5a5e',46,44,14,5);R(g,'#5a5a5e',6,44,10,5);R(g,'#b0302a',28,34,8,6);},g=>{R(g,'#4dff8a',40,44,2,2);});
SPR.safe=bake(g=>{R(g,'#3a3e3c',16,34,32,29);R(g,'#4a4e4c',16,34,32,2);R(g,'#2a2e2c',18,37,28,23);R(g,'#8a8a86',28,44,8,8);R(g,'#1a1a1a',31,47,2,2);R(g,'#c9a54a',38,47,4,2);});
SPR.vodkaI=bake(g=>{R(g,'#cfe0e4',28,40,8,23);R(g,'#cfe0e4',30,33,4,7);R(g,'#c02020',30,31,4,3);R(g,'#f4f4f0',28,48,8,8);R(g,'#c02020',28,50,8,1);R(g,'#ffffff',29,41,1,20);});
SPR.pes={};for(const p of ['stand','walk1','walk2','attack','dead'])SPR.pes[p]=bakeH(g=>drawDog(g,p));SPR.pes.squat=SPR.pes.stand;SPR.pes.spit=SPR.pes.attack;
SPR.couch=bake(g=>{R(g,'#5a2e22',4,36,56,12);R(g,'#6a3a2a',4,46,56,12);R(g,'#7a4a34',4,46,56,2);R(g,'#4a2418',2,40,6,18);R(g,'#4a2418',56,40,6,18);R(g,'#2a1a10',8,58,4,5);R(g,'#2a1a10',52,58,4,5);R(g,'#8a5a3a',14,40,14,6);});
SPR.table=bake(g=>{R(g,'#5a3a22',8,42,48,4);R(g,'#6a4a2e',8,42,48,1);R(g,'#3e2616',12,46,3,17);R(g,'#3e2616',49,46,3,17);R(g,'#2c5a33',16,34,4,8);R(g,'#cfe0e4',26,33,4,9);R(g,'#5a7a3a',36,36,7,6);R(g,'#e8e4d8',46,38,6,4);});
SPR.tv=bake(g=>{R(g,'#3a2a1a',14,26,36,28);R(g,'#2a1a10',14,52,36,2);R(g,'#2a1a10',18,54,3,9);R(g,'#2a1a10',43,54,3,9);R(g,'#1a1a1a',42,30,5,16);R(g,'#c9a54a',43,32,3,3);R(g,'#c9a54a',43,38,3,3);
  R(g,'#555',30,14,1,12);R(g,'#555',36,12,1,14);},g=>{R(g,'#6a8ad0',17,29,23,20);R(g,'#9ab4f0',19,31,8,4);R(g,'#4a6ab0',17,42,23,7);});
SPR.stove=bake(g=>{R(g,'#d8d4c8',16,32,32,31);R(g,'#bdb8aa',16,32,32,3);R(g,'#2a2a2a',20,44,24,14);R(g,'#8a8a86',22,46,20,1);for(const x of [20,28,36])R(g,'#1a1a1a',x+2,37,4,2);},
  g=>{for(const x of [22,30,38]){R(g,'#3a6aff',x-1,35,6,2);R(g,'#8ab0ff',x+1,34,2,1);}});
SPR.chand=bake(g=>{R(g,'#8a7a4a',31,0,2,7);R(g,'#c9a54a',20,7,24,4);R(g,'#8a7a4a',18,10,28,2);},g=>{for(const x of [19,24,29,34,39,44])R(g,'#fff4d0',x,12,2,5);R(g,'#fffae8',26,8,12,2);});
SPR.antenna=bake(g=>{R(g,'#5a5a56',31,8,2,56);R(g,'#7a7a74',31,8,1,56);R(g,'#6a6a64',12,11,40,1);R(g,'#6a6a64',17,19,30,1);R(g,'#6a6a64',21,27,22,1);g.save();g.translate(32,35);g.rotate(.25);R(g,'#6a6a64',-9,0,18,1);g.restore();R(g,'#4a4a46',27,60,10,4);R(g,'#8a8a80',12,10,2,2);R(g,'#8a8a80',50,10,2,2);});
SPR.truck=bake(g=>{R(g,'#141414',6,52,56,4);
  // hay mound in the bed
  poly(g,'#caa640',[[22,46],[24,30],[30,22],[40,19],[52,21],[60,28],[62,46]]);for(let i=0;i<60;i++){const x=24+((i*37)%38),y=24+((i*23)%21);R(g,i%3?'#e8cc6a':'#a88a2e',x,y,((i%2)+1),3);}
  R(g,'#7a5a36',22,44,40,8);R(g,'#8e6c44',22,44,40,1);for(let x=26;x<62;x+=8)R(g,'#5a4026',x,45,1,7);
  // cab
  R(g,'#3a6a5a',4,30,19,22);R(g,'#4a8070',4,30,19,2);R(g,'#2a4a40',4,48,19,4);R(g,'#9ab4ba',8,33,11,9);R(g,'#c8dadc',8,33,11,1);
  R(g,'#c99a7a',11,36,6,6);R(g,'#3b3b3e',10,34,8,3);R(g,'#241a14',12,38,1,1);R(g,'#241a14',15,38,1,1);R(g,'#5a3022',13,40,3,1);
  R(g,'#e8e0a8',3,44,3,3);R(g,'#1a1a1a',2,48,3,4);
  for(const cx of [13,50]){g.fillStyle='#161616';g.beginPath();g.arc(cx,55,6,0,7);g.fill();R(g,'#5a5a5a',cx-2,53,4,4);}});
SPR.pmGround=bake(g=>{R(g,'#2b2c30',22,58,16,4);R(g,'#44474d',22,58,16,1);R(g,'#1a1a1c',34,58,6,5);R(g,'#3a2a1a',36,59,4,4);},g=>{R(g,'#ffffff',27,57,2,1);R(g,'#fff4c0',28,56,1,3);});
SPR.hay=bake(()=>{},g=>{R(g,'#e8cc6a',30,30,4,1);R(g,'#caa640',31,31,1,3);R(g,'#f0d878',33,29,1,2);});
SPR.heli=[0,1].map(f=>bake(g=>{
  R(g,'#2a2c2a',20,12,2,6);
  if(f){R(g,'rgba(30,30,30,.8)',0,10,64,2);R(g,'rgba(60,60,60,.5)',4,9,56,1);}else{g.save();g.translate(21,11);g.rotate(.18);R(g,'rgba(30,30,30,.85)',-24,-1,48,2);g.restore();g.save();g.translate(21,11);g.rotate(-.5);R(g,'rgba(40,40,40,.6)',-20,0,40,1);g.restore();}
  poly(g,'#3e4a3a',[[6,26],[12,18],[34,18],[40,24],[40,36],[10,38],[6,34]]);R(g,'#4e5c48',12,18,22,2);
  R(g,'#3e4a3a',38,24,22,5);R(g,'#2e382c',38,28,22,1);R(g,'#3e4a3a',56,17,4,10);R(g,'#2e382c',f?54:58,16,f?8:2,1);
  poly(g,'#7a9aa8',[[7,27],[12,20],[18,20],[18,30],[8,31]]);R(g,'#a8c4cc',12,21,4,1);
  R(g,'#2e382c',24,24,6,6);R(g,'#c02020',31,27,4,4);R(g,'#e04040',32,28,2,2);
  R(g,'#222',10,40,26,2);R(g,'#222',14,37,1,4);R(g,'#222',32,37,1,4);R(g,'#2e382c',16,30,14,2);},g=>{R(g,'#fffbe0',9,36,4,2);R(g,'#ff4030',59,15,2,2);}));
SPR.laundry=bake(g=>{R(g,'#9a9a96',0,3,64,1);R(g,'#d8d4c8',4,4,22,34);R(g,'#c8c4b8',4,34,22,4);R(g,'#b8c8d8',32,4,24,26);R(g,'#8a3a3a',40,4,6,40);R(g,'#c9a54a',8,3,2,3);R(g,'#c9a54a',22,3,2,3);R(g,'#c9a54a',36,3,2,3);R(g,'#c9a54a',52,3,2,3);});
SPR.rubble=bake(g=>{const r=rng(91);for(let i=0;i<14;i++)R(g,['#7a3b2c','#8a8a82','#b8b0a0','#5a4a3a'][(r()*4)|0],8+((r()*48)|0),52+((r()*10)|0),3+((r()*6)|0),2+((r()*3)|0));R(g,'#b8b0a0',20,58,24,5);});
SPR.rail=bake(g=>{R(g,'#4a4d4e',0,38,64,3);R(g,'#5c6060',0,38,64,1);R(g,'#3a3d3e',0,61,64,2);for(let x=2;x<64;x+=7)R(g,'#3a3d3e',x,41,2,20);R(g,'#8a6a3a',40,46,8,15);R(g,'#5a7a3a',12,50,6,11);});
SPR.jar=bake(g=>{R(g,'#5a7a3a',27,26,10,12);R(g,'#8aaa5a',28,28,3,8);R(g,'#c9c0a0',26,25,12,2);});
SPR.stool=bake(g=>{R(g,'#6a4a2e',20,24,24,4);R(g,'#4a321e',22,28,3,14);R(g,'#4a321e',39,28,3,14);R(g,'#4a321e',30,28,3,12);});
SPR.bottleG=bake(g=>{g.translate(32,32);g.rotate(.8);R(g,'#2c5a33',-3,-8,6,14);R(g,'#2c5a33',-1,-13,2,5);R(g,'#5d9a68',-2,-7,1,10);});
SPR.rub=bake(g=>{R(g,'#5b8a4a',22,54,18,8);R(g,'#7aa866',23,55,6,6);R(g,'#8a3a3a',30,52,16,8);R(g,'#b35a50',31,53,5,6);R(g,'#3a2a1a',28,58,6,1);});
SPR.birch=bake(g=>{const r=rng(21);R(g,'#e2ded3',29,0,6,64);R(g,'#c9c4b6',33,0,2,64);for(let i=0;i<18;i++)R(g,'#1b1b1b',29+((r()*3)|0),(r()*64)|0,2+((r()*3)|0),1);
  g.strokeStyle='#3a3530';g.lineWidth=1.2;for(let i=0;i<7;i++){const y=4+r()*22,d=r()<.5?-1:1;g.beginPath();g.moveTo(32,y+8);g.lineTo(32+d*(8+r()*14),y);g.stroke();}
  const lc=['#8a8a2a','#b0922c','#6e7a2a','#c9a13a'];for(let i=0;i<260;i++){const a=r()*6.28,d=r()*19;R(g,lc[(r()*4)|0],(32+Math.cos(a)*d*1.25)|0,(13+Math.sin(a)*d*.8)|0,1,1);}});
SPR.lamp=bake(g=>{R(g,'#4f5354',31,10,3,54);R(g,'#3a3d3e',30,58,5,6);R(g,'#4f5354',31,8,14,2);R(g,'#2b2d2e',38,6,10,4);},g=>{R(g,'#ffc56a',39,10,8,2);R(g,'#ffe3a6',41,10,4,1);});
SPR.bench=bake(g=>{R(g,'#7a7872',14,50,5,13);R(g,'#7a7872',45,50,5,13);R(g,'#5c5a55',15,38,3,12);R(g,'#5c5a55',46,38,3,12);R(g,'#2f5b3e',8,39,48,3);R(g,'#2f5b3e',8,43,48,3);R(g,'#2f5b3e',8,47,48,3);R(g,'#3c6e4d',8,47,48,1);R(g,'#243f2e',8,50,48,1);R(g,'#1a1a1a',20,40,6,1);});
SPR.urn=bake(g=>{R(g,'#7c7a74',24,46,16,17);R(g,'#8e8c85',22,44,20,3);R(g,'#1a1a1a',25,45,14,1);R(g,'#65635e',24,58,16,5);R(g,'#6f6d67',37,47,3,16);R(g,'#c9c5b0',27,43,4,2);});
SPR.bottle=bake(g=>{R(g,'#2c5a33',30,50,5,13);R(g,'#2c5a33',31,45,3,5);R(g,'#5d9a68',31,51,1,10);R(g,'#c9b27a',30,55,5,3);});
/* ceiling bulb: short cord, hangs near the ceiling */
SPR.bulb=bake(g=>{R(g,'#111',32,0,1,8);R(g,'#333',31,7,3,3);},g=>{R(g,'#ffd68a',30,10,5,6);R(g,'#fff0c8',31,11,3,3);});
SPR.kvass=bake(g=>{R(g,'#4a2a10',27,40,10,23);R(g,'#6b3c16',28,41,3,20);R(g,'#4a2a10',30,33,4,7);R(g,'#c9a032',27,48,10,7);R(g,'#7a1a14',29,50,6,3);R(g,'#e8e0c8',30,31,4,2);});
SPR.pelmeni=bake(g=>{R(g,'#e6e2d6',18,50,28,13);R(g,'#2a4b9c',18,54,28,4);R(g,'#c9c3b2',18,50,28,1);R(g,'#d23a2a',38,51,6,2);R(g,'#f5f1e4',22,58,6,3);R(g,'#f5f1e4',30,58,6,3);});
SPR.vatnik=bake(g=>{R(g,'#3d4536',14,44,36,19);for(let y=46;y<63;y+=3)R(g,'#2c3327',14,y,36,1);R(g,'#2c3327',32,44,1,19);R(g,'#3d4536',8,46,6,14);R(g,'#3d4536',50,46,6,14);R(g,'#2c3327',24,44,16,3);});
SPR.ammo9=bake(g=>{R(g,'#48542c',20,50,24,13);R(g,'#5b6a38',20,50,24,2);for(let i=0;i<4;i++)R(g,'#c2a44a',23+i*5,46,3,5);R(g,'#e8e4d6',26,55,12,4);R(g,'#222',28,56,8,2);});
SPR.shells=bake(g=>{for(let i=0;i<4;i++){const x=21+i*6;R(g,'#a82626',x,48,5,12);R(g,'#d24a3a',x,48,1,12);R(g,'#c9a54a',x,58,5,4);}});
SPR.obrez=bake(g=>{R(g,'#2a2c30',6,52,34,3);R(g,'#2a2c30',6,55,34,3);R(g,'#44474d',6,52,34,1);R(g,'#6b3f22',38,51,20,8);R(g,'#4e2d17',50,55,10,6);R(g,'#111',6,52,1,6);});
SPR.semki=bake(g=>{const r=rng(31);for(let i=0;i<7;i++){const x=24+((r()*14)|0),y=26+((r()*10)|0);R(g,'#1a1a1a',x,y,3,2);R(g,'#d8d8d0',x+1,y,1,2);}});
SPR.puff=bake(g=>{R(g,'#8a8780',28,28,8,8);R(g,'#a19d94',24,31,6,5);R(g,'#77746d',34,24,6,6);R(g,'#bdb9ae',30,26,3,3);});
SPR.blood=bake(g=>{R(g,'#8a0f0f',28,28,7,7);R(g,'#b01818',24,31,5,4);R(g,'#6a0a0a',34,25,5,5);R(g,'#c02020',31,36,2,4);});

/* weapon HUD canvases (native 160x120) */
const SKN='#c8987a',SKND='#a47a60',SKNL='#dcb094',SKNK='#b58a70',SLV='#3d4536',SLVD='#2c3327',SLVL='#4c5643';
function fistArt(g,ox,oy,s){
  const Q=(c,x,y,w,h)=>R(g,c,Math.round(ox+x*s),Math.round(oy+y*s),Math.ceil(w*s),Math.ceil(h*s));
  Q(SKND,14,30,22,12);Q(SKN,15,30,18,12);
  Q(SKN,4,4,36,2);Q(SKN,2,6,40,26);Q(SKN,4,32,34,2);
  for(let i=0;i<4;i++){Q(SKNL,4+i*9,4,7,3);Q(SKND,11+i*9,6,2,2);}
  for(let i=1;i<4;i++)Q(SKND,3+i*9,9,1,14);
  Q(SKND,2,15,40,1);Q(SKNK,2,22,40,2);
  for(let i=0;i<4;i++)Q(SKNL,5+i*9,17,5,1);
  Q(SKN,0,22,26,9);Q(SKNL,0,22,26,2);Q('#e2bfa6',2,24,7,4);Q(SKND,0,30,26,2);
  Q(SKND,40,6,3,26);
}
function sleeve(g,pts){poly(g,SLV,pts);g.save();g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))g.lineTo(p[0],p[1]);g.closePath();g.clip();for(let y=0;y<120;y+=6)R(g,SLVD,0,y,160,1);g.restore();}
const HUD={};
(function hud(){
  let [c,g]=cv(160,120);
  sleeve(g,[[106,120],[154,120],[146,90],[110,86]]);poly(g,SLVL,[[108,90],[148,94],[146,86],[110,82]]);
  fistArt(g,94,34,1.25);HUD.fist=c;
  [c,g]=cv(160,120);
  sleeve(g,[[78,120],[136,120],[114,74],[68,74]]);poly(g,SLVL,[[68,78],[116,78],[114,70],[70,70]]);
  fistArt(g,44,2,1.75);HUD.punch=c;
  [c,g]=cv(160,120); poly(g,SLV,[[60,120],[116,120],[108,96],[68,96]]); poly(g,SKN,[[66,112],[110,112],[104,78],[72,78]]);R(g,SKND,72,78,32,3);
  R(g,'#2c2e33',72,42,32,38);R(g,'#565a63',72,42,32,3);R(g,'#454850',72,42,3,38);R(g,'#16171a',72,76,32,4);R(g,'#101113',75,37,7,6);R(g,'#101113',94,37,7,6);R(g,'#6a6e78',75,37,7,1);R(g,'#6a6e78',94,37,7,1);R(g,'#3a3d44',84,78,10,6);R(g,'#1b1c1f',99,46,5,30);
  R(g,SKN,62,82,16,11);R(g,SKND,62,91,16,2);R(g,SKND,68,96,36,1);R(g,SKND,70,102,34,1);R(g,SKNL,72,82,30,2);
  HUD.pm=c;
  [c,g]=cv(160,120);
  poly(g,'#2a2c30',[[60,120],[80,120],[79,26],[71,26]]);poly(g,'#2a2c30',[[82,120],[102,120],[91,26],[83,26]]);
  poly(g,'#4a4d55',[[62,120],[65,120],[73,26],[72,26]]);poly(g,'#4a4d55',[[84,120],[87,120],[85,26],[84,26]]);
  R(g,'#070708',72,23,6,4);R(g,'#070708',84,23,6,4);R(g,'#3a3d43',71,22,8,1);R(g,'#3a3d43',83,22,8,1);
  poly(g,'#6a3f22',[[54,120],[108,120],[100,82],[62,82]]);R(g,'#4e2d17',66,90,1,30);R(g,'#4e2d17',80,86,1,34);R(g,'#4e2d17',93,92,1,28);
  poly(g,SKN,[[36,120],[64,120],[70,98],[46,92]]);R(g,SKND,46,92,20,2);
  HUD.obrez=c;
  [c,g]=cv(160,120);sleeve(g,[[100,120],[150,120],[140,92],[106,88]]);
  fistArt(g,94,50,1.1);
  g.save();g.translate(106,40);g.rotate(-1.05);poly(g,'#5a3420',[[-26,10],[-22,-5],[18,-9],[34,0],[32,13]]);R(g,'#8a2226',-17,-7,36,10);for(let x=-15;x<19;x+=6)R(g,'#b83a30',x,-5,3,3);R(g,'#2a1a10',-26,11,58,3);R(g,'#a86a4a',-24,6,54,2);g.restore();HUD.tapok=c;
  [c,g]=cv(80,60); star(g,40,30,26,9,8,'#ff8a2a',0); star(g,40,30,17,6,8,'#ffd27a',.3); star(g,40,30,8,3,6,'#fff4d0',.1); HUD.flashS=c;
  [c,g]=cv(120,80); star(g,60,40,40,12,9,'#ff7a1a',0); star(g,60,40,28,9,9,'#ffc868',.25); star(g,60,40,14,5,7,'#fff4d0',.1); HUD.flashL=c;
})();

/* ---------- БАРЫГА'S SUITCASE ---------- */
const SHOP=[
  {id:'kastet',name:'КАСТЕТ',price:80,desc:['УДАР КУЛАКОМ','ВДВОЕ СИЛЬНЕЕ']},
  {id:'tt',name:'ТТ',price:150,desc:['ПИСТОЛЕТ ТОКАРЕВА','УРОН +40%']},
  {id:'dvust',name:'ДРОБОВИК',price:200,desc:['9 ДРОБИН ЗА ВЫСТРЕЛ','БЫСТРЕЕ ПЕРЕЗАРЯДКА']},
  {id:'krossy',name:'КРОССОВКИ',price:120,desc:['ЛЕГКИЕ, ДЕРЖАТ ШАГ','СКОРОСТЬ +20%']},
  {id:'vest',name:'БРОНЕЖИЛЕТ',price:180,desc:['БРОНЯ ДО 150','+50 НА КАЖДОМ ЭТАЖЕ']},
  {id:'bando',name:'ПАТРОНТАШ',price:100,desc:['БОЛЬШЕ ПАТРОНОВ','9ММ 150 · ДРОБЬ 60']},
  {id:'salo',name:'САЛО',price:160,desc:['ЗДОРОВЬЕ ДО 125','СИЛЫ НА ВЕСЬ ДЕНЬ']},
  {id:'vodka',name:'ВОДКА',price:40,desc:['БРОСЬ — ГОПНИКИ','ПОБЕГУТ К НЕЙ'],multi:1,count:()=>P.vodka,cap:()=>3,add:()=>{P.vodka++;}},
  {id:'ammo9p',h2:1,name:'ПАТРОНЫ 9ММ',price:30,desc:['20 ПАТРОНОВ','БЕРИ СКОЛЬКО УНЕСЕШЬ'],multi:1,count:()=>P.ammo9,cap:()=>cap9(),add:()=>{P.ammo9=Math.min(cap9(),P.ammo9+20);}},
  {id:'shellsp',h2:1,name:'ДРОБЬ',price:40,desc:['8 ПАТРОНОВ','ДЛЯ ОБРЕЗА'],multi:1,count:()=>P.shells,cap:()=>capS(),add:()=>{P.shells=Math.min(capS(),P.shells+8);}},
  {id:'tapok2',h2:1,name:'ВТОРОЙ ТАПОК',price:90,desc:['КИДАЕШЬ ДВА СРАЗУ','МАМА НЕ УЗНАЕТ']},
  {id:'kefir',h2:1,name:'КЕФИР',price:50,desc:['ВЫПЬЕШЬ САМ, КОГДА','ЗДОРОВЬЯ МАЛО: +35'],multi:1,count:()=>P.kefir,cap:()=>2,add:()=>{P.kefir++;}}
];
const ART={};
(function shopArt(){
  const mk=f=>{const [c,g]=cv(64,64);g.imageSmoothingEnabled=false;f(g);return c;};
  ART.kastet=mk(g=>{for(let i=0;i<4;i++){R(g,'#c9a54a',9+i*12,18,11,11);R(g,'#1b191c',12+i*12,21,5,5);R(g,'#f0d890',9+i*12,18,11,1);}R(g,'#c9a54a',8,28,48,6);R(g,'#b08a3a',14,34,34,8);R(g,'#f0d890',8,28,48,1);R(g,'#8a6a2a',14,41,34,1);});
  ART.tt=mk(g=>{R(g,'#2b2c30',6,20,48,9);R(g,'#45474d',6,20,48,2);R(g,'#1a1b1e',6,24,4,2);for(let x=34;x<52;x+=3)R(g,'#1a1b1e',x,22,1,5);
    poly(g,'#2b2c30',[[32,29],[50,29],[54,52],[40,52]]);poly(g,'#5a3a22',[[36,31],[48,31],[51,49],[41,49]]);star(g,45,39,4,1.7,5,'#c02020',-Math.PI/2);R(g,'#2b2c30',26,29,8,8);R(g,'#1b191c',28,31,4,4);});
  ART.dvust=mk(g=>{R(g,'#2a2c30',2,24,42,4);R(g,'#2a2c30',2,28,42,4);R(g,'#4a4d55',2,24,42,1);R(g,'#5a3420',12,32,22,5);R(g,'#3a3c40',42,22,9,12);poly(g,'#6b3f22',[[50,23],[63,26],[63,42],[50,34]]);R(g,'#4e2d17',54,30,8,1);R(g,'#1b191c',44,34,4,5);});
  ART.krossy=mk(g=>{poly(g,'#efefe9',[[8,44],[8,32],[24,26],[38,28],[54,36],[58,44]]);R(g,'#dcdcd4',8,44,50,6);R(g,'#2a4a9c',8,48,50,2);
    g.strokeStyle='#1a1a1a';g.lineWidth=2;for(const o of [0,6]){g.beginPath();g.moveTo(26+o,42);g.lineTo(34+o,30);g.stroke();}R(g,'#9a9a94',18,30,2,2);R(g,'#9a9a94',22,28,2,2);R(g,'#2a4a9c',8,33,4,10);});
  ART.vest=mk(g=>{R(g,'#4d5a2e',16,12,32,44);R(g,'#1b191c',26,12,12,9);R(g,'#3a4420',16,26,32,3);R(g,'#3f4a24',19,36,11,11);R(g,'#3f4a24',34,36,11,11);R(g,'#5c6a38',19,36,11,1);R(g,'#5c6a38',34,36,11,1);R(g,'#2e3618',16,54,32,2);});
  ART.bando=mk(g=>{poly(g,'#6a4a2a',[[2,38],[60,20],[62,30],[4,48]]);for(let i=0;i<6;i++){const x=8+i*9,y=34-i*3;R(g,'#a82626',x,y-9,5,10);R(g,'#d24a3a',x,y-9,1,10);R(g,'#c9a54a',x,y,5,3);}R(g,'#c9a54a',44,24,6,5);});
  ART.salo=mk(g=>{R(g,'#d9d2bd',6,26,52,28);R(g,'#c9c0a8',6,52,52,2);R(g,'#f2ece0',11,28,42,21);R(g,'#e0a0a0',11,38,42,3);R(g,'#e6b0b0',11,44,42,1);R(g,'#8a5a3a',11,26,42,3);R(g,'#f8f6ee',46,46,6,5);R(g,'#e4e0d0',47,45,4,1);});
  ART.ammo9p=mk(g=>{R(g,'#6a5a2a',10,24,44,28);R(g,'#8a7a3a',10,24,44,3);R(g,'#4a3e1a',10,50,44,2);for(let i=0;i<6;i++){R(g,'#c9a54a',14+i*7,14,4,11);R(g,'#8a6a2a',14+i*7,14,4,3);}g.fillStyle='#1a1a1a';g.font='bold 9px sans-serif';g.textAlign='center';g.fillText('9x18',32,42);});
  ART.shellsp=mk(g=>{R(g,'#2a4a2a',8,30,48,24);R(g,'#3a6a3a',8,30,48,3);for(let i=0;i<5;i++){R(g,'#b02a1a',12+i*9,12,7,20);R(g,'#d24a3a',12+i*9,12,2,20);R(g,'#c9a54a',12+i*9,28,7,4);}g.fillStyle='#e8e4d8';g.font='bold 8px sans-serif';g.textAlign='center';g.fillText('ДРОБЬ',32,46);});
  ART.tapok2=mk(g=>{for(const [x,y,a] of [[22,34,-.3],[40,40,.25]]){g.save();g.translate(x,y);g.rotate(a);poly(g,'#4a2a18',[[-16,8],[-13,-3],[11,-6],[20,0],[18,9]]);R(g,'#7a1e22',-10,-5,22,7);for(let k=-8;k<12;k+=5)R(g,'#a83028',k,-3,2,2);g.restore();}});
  ART.kefir=mk(g=>{R(g,'#e8ecec',24,18,16,40);R(g,'#e8ecec',27,10,10,8);R(g,'#2a8a3a',26,6,12,5);R(g,'#48a858',27,6,4,2);R(g,'#ffffff',25,20,2,34);R(g,'#c9d0d0',37,20,2,36);R(g,'#2a8a3a',24,30,16,12);g.fillStyle='#e8ecec';g.font='bold 6px sans-serif';g.textAlign='center';g.fillText('КЕФИР',32,38);});
  ART.vodka=mk(g=>{R(g,'#cfe0e4',25,20,14,36);R(g,'#cfe0e4',29,10,6,10);R(g,'#c02020',29,6,6,5);R(g,'#f4f4f0',25,32,14,13);R(g,'#c02020',25,34,14,2);R(g,'#2a2a2a',28,39,8,1);R(g,'#2a2a2a',29,41,6,1);R(g,'#ffffff',26,21,2,30);R(g,'#a8bcc2',37,21,2,34);});
  /* pointing hand used as the cursor (fingertip at 16,1) */
  const [hc,h]=cv(56,64);
  R(h,SKN,12,0,9,26);R(h,'#e2bfa6',13,1,7,5);R(h,SKND,19,4,2,22);
  R(h,SKN,10,22,30,22);R(h,SKNL,10,22,30,2);R(h,SKND,38,24,2,20);
  for(let i=0;i<3;i++){R(h,SKN,21+i*6,34,6,12);R(h,SKND,26+i*6,36,1,9);}R(h,SKNK,21,44,18,2);
  R(h,SKN,4,28,10,12);R(h,SKND,4,38,10,2);
  R(h,SLV,14,46,28,18);R(h,SLVL,14,46,28,3);for(let y=52;y<64;y+=5)R(h,SLVD,14,y,28,1);
  ART.hand=hc;
})();

