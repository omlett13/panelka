'use strict';
/* ---------- TEXTURES ---------- */
function tTwoTone(g,r){
  R(g,'#cfcbc0',0,0,64,26); speck(g,r,420,['#c3bfb3','#d9d6cc','#bbb6a8','#cac6ba'],0,0,64,26);
  g.globalAlpha=.16; for(let i=0;i<4;i++) R(g,'#7d6a45',(r()*56)|0,(r()*18)|0,4+((r()*8)|0),3+((r()*6)|0)); g.globalAlpha=1;
  R(g,'#3e6a5c',0,26,64,38); speck(g,r,360,['#39614f','#467567','#35594d','#41705f'],0,27,64,37);
  R(g,'#1f2e28',0,25,64,2); R(g,'#5d8b7c',0,27,64,1);
  for(let i=0;i<6;i++) R(g,'#b0aa9b',(r()*60)|0,30+((r()*28)|0),1+((r()*4)|0),1+((r()*2)|0));
  R(g,'#2a4a3f',0,59,64,5);
}
function tNotice(g,r){ tTwoTone(g,r); R(g,'#6b4a2a',14,8,36,26); R(g,'#8a6a42',15,9,34,24);
  for(const [x,y,w,h] of [[17,11,12,9],[31,10,10,13],[19,22,14,9],[35,24,11,7]]){R(g,'#e6e1d2',x,y,w,h);for(let k=y+2;k<y+h-1;k+=2)R(g,'#8f8a7e',x+1,k,w-2,1);}
  R(g,'#b02a22',22,11,2,2); R(g,'#b02a22',35,10,2,2); }
function tGraf(g,r,v){ v=v||0; tTwoTone(g,r); g.save(); g.textAlign='center'; g.textBaseline='middle';
  const T=(s,x,y,px,col,rot)=>{g.save();g.translate(x,y);g.rotate(rot||0);g.fillStyle=col;g.font='bold '+px+'px sans-serif';g.fillText(s,0,0);g.restore();};
  const drip=(x,y,l,col)=>R(g,col,x,y,1,l);
  const star=(x,y,ro,ri,col)=>{g.fillStyle=col;g.beginPath();for(let i=0;i<10;i++){const rr=i%2?ri:ro,an=-Math.PI/2+i*Math.PI/5;g.lineTo(x+Math.cos(an)*rr,y+Math.sin(an)*rr);}g.closePath();g.fill();};
  if(v===0){T('ЦОЙ',32,22,15,'#121212',-.13);T('ЖИВ',32,39,15,'#121212',-.13);R(g,'#121212',22,40,1,6);R(g,'#121212',40,38,1,5);}
  else if(v===1){T('СПАРТАК',32,20,11,'#b02a22',-.06);g.fillStyle='#b02a22';g.beginPath();g.moveTo(32,30);g.lineTo(44,42);g.lineTo(32,54);g.lineTo(20,42);g.closePath();g.fill();T('C',32,42,11,'#e8e2c8',0);}
  else if(v===2){T('ДМБ',32,22,17,'#1a1a1a',.05);T('89',32,40,15,'#1a1a1a',.05);for(let i=0;i<4;i++)R(g,i%2?'#1a1a1a':'#3a6ab0',8,50+i*3>60?60:50+i*3,48,2);}
  else if(v===3){T('КОЛЯ',32,15,11,'#c02030',-.05);g.fillStyle='#e0303a';g.beginPath();g.moveTo(32,44);g.bezierCurveTo(14,32,20,24,32,32);g.bezierCurveTo(44,24,50,32,32,44);g.fill();T('ЛЕНА',32,54,11,'#c02030',-.05);}
  else if(v===4){T('ЗДЕСЬ',32,17,11,'#1a1a1a',.08);T('БЫЛ',32,31,11,'#1a1a1a',.08);T('ВОВА',32,46,14,'#1a1a1a',.08);drip(20,52,7,'#1a1a1a');drip(44,54,5,'#1a1a1a');}
  else if(v===5){star(32,20,11,4.5,'#c02020');T('СЛАВА',32,40,12,'#c02020',0);T('СССР',32,54,12,'#c02020',0);}
  else if(v===6){T('РЕАЛЬНЫЕ',32,24,10,'#e8e2c8',-.04);T('ПАЦАНЫ',32,40,12,'#e8e2c8',-.04);R(g,'#e8e2c8',10,49,44,2);}
  else{g.fillStyle='#2a2a2a';g.beginPath();g.moveTo(18,30);g.lineTo(21,14);g.lineTo(28,22);g.lineTo(36,22);g.lineTo(43,14);g.lineTo(46,30);g.arc(32,36,14,-.2,Math.PI+.2);g.fill();R(g,'#e8d040',24,30,4,3);R(g,'#e8d040',36,30,4,3);R(g,'#c06070',31,36,3,2);T('МУРКА',32,54,10,'#2a2a2a',0);}
  g.restore(); }
function tWallp(g,r){
  R(g,'#8f8266',0,0,64,64); for(let x=5;x<64;x+=16) R(g,'#998c6f',x,0,6,64);
  for(let gy=0;gy<4;gy++)for(let gx=0;gx<4;gx++){const cx=gx*16+(gy%2?16:8)&63,cy=gy*16+8;R(g,'#6c5d46',cx-1,cy-3,2,2);R(g,'#6c5d46',cx-3,cy-1,2,2);R(g,'#6c5d46',cx+1,cy-1,2,2);R(g,'#6c5d46',cx-1,cy+1,2,2);R(g,'#b59c60',cx-1,cy-1,2,2);}
  speck(g,r,300,['#877a5f','#95886b'],0,0,64,58); R(g,'#76694f',0,0,1,58);
  g.globalAlpha=.2; R(g,'#4a3b25',40,4,14,20); g.globalAlpha=1;
  R(g,'#3e2a1c',0,57,64,7); R(g,'#5a3f2b',0,57,64,1);
}
function tPanel(g,r){
  R(g,'#76787a',0,0,64,64); speck(g,r,500,['#6d6f71','#808283','#737576','#6a6b6c'],0,0,64,64);
  R(g,'#4a4c4e',0,0,64,1); R(g,'#4a4c4e',0,0,1,64); R(g,'#8f9190',0,1,64,1); R(g,'#8f9190',1,0,1,64);
  R(g,'#bcb8ad',18,14,28,32); R(g,'#12161e',20,16,24,28); R(g,'#bcb8ad',31,16,2,28); R(g,'#bcb8ad',20,26,24,2);
  R(g,'#56585a',16,46,32,2); g.globalAlpha=.35; R(g,'#5c5347',22,48,2,12); R(g,'#5c5347',40,48,1,9); g.globalAlpha=1;
}
function panes(g,kind){
  const col=kind===1?'#e3a257':'#5876b8';
  for(const [x,y,w,h] of [[20,16,11,10],[33,16,11,10],[20,28,11,16],[33,28,11,16]]) R(g,col,x,y,w,h);
  if(kind===1){ R(g,'#b8702e',20,16,3,28); R(g,'#b8702e',41,16,3,28); R(g,'#f5c888',26,18,1,5); R(g,'#fff0c8',25,22,3,2); }
  else { R(g,'#8fb0f0',34,32,8,6); R(g,'#2a3a66',20,40,24,4); }
}
function tBrick(g,r,base,mortar){
  R(g,mortar,0,0,64,64);
  for(let row=0;row<8;row++){const off=row%2?8:0;for(let bx=-1;bx<5;bx++){const f=.82+r()*.3;R(g,shadeHex(base,f),bx*16+off+1,row*8+1,14,6);R(g,shadeHex(base,f*1.15),bx*16+off+1,row*8+1,14,1);}}
  speck(g,r,200,['rgba(0,0,0,.25)','rgba(255,255,255,.08)'],0,0,64,64);
}
function tBase(g,r){
  tBrick(g,r,'#4f3a31','#2b2623');
  g.globalAlpha=.45; for(let i=0;i<5;i++) R(g,'#161412',(r()*62)|0,0,2,20+((r()*40)|0)); g.globalAlpha=1;
  speck(g,r,40,['#3c4a2a','#4a5a30'],0,40,64,24,2);
  R(g,'#4b5448',0,10,64,6); R(g,'#6a7466',0,10,64,1); R(g,'#2f352d',0,15,64,1); R(g,'#6b3b20',21,10,5,6); R(g,'#8a4a24',45,11,3,5);
}
function tMail(g,r,v){
  tTwoTone(g,r); R(g,'#3a4750',6,8,52,42);
  const body=['#5a6b76','#6b6a4e','#4f6a5a'][v];
  for(let j=0;j<3;j++)for(let i=0;i<4;i++){const x=8+i*12,y=10+j*13;const open=r()<.16;R(g,open?'#15191c':body,x,y,11,12);
    if(open){ if(r()<.6){R(g,'#e6e1d2',x+2,y+6,7,6);R(g,'#8f8a7e',x+3,y+8,5,1);} continue; }
    R(g,shadeHex(body,1.2),x,y,11,1);R(g,'#1d2429',x+2,y+3,7,1);R(g,'#c9c2a8',x+8,y+8,2,2);
    const m=r(); if(m<.3){R(g,'#ece7d8',x+2,y+1,7,3);R(g,'#b8b2a0',x+2,y+3,7,1);} else if(m<.42){R(g,'#d8d0b8',x+3,y,4,4);R(g,'#8a1f1a',x+3,y+1,4,1);} }
  speck(g,r,30,['#7a4a2a','#6a3e22'],6,8,52,42,1);
}
function tDoor(g,r){
  R(g,'#35241a',0,0,64,64); R(g,'#5b2922',5,3,54,61); R(g,'#6a3129',6,4,52,1);
  g.strokeStyle='#44201a'; g.lineWidth=1;
  for(let k=-64;k<64;k+=10){g.beginPath();g.moveTo(5+k,3);g.lineTo(5+k+61,64);g.stroke();g.beginPath();g.moveTo(59-k,3);g.lineTo(59-k-61,64);g.stroke();}
  R(g,'#35241a',0,0,5,64); R(g,'#35241a',59,0,5,64); R(g,'#35241a',0,0,64,3);
  for(let y=8;y<62;y+=10)for(let x=10;x<56;x+=10){R(g,'#caa556',x+((y/10|0)%2?5:0),y,1,1);}
  R(g,'#b89a4e',26,9,12,6); R(g,'#5a4a22',28,11,2,2); R(g,'#5a4a22',33,11,2,2);
  R(g,'#b8a060',30,19,4,4); R(g,'#111',31,20,2,2);
  R(g,'#d0b87e',48,35,8,2); R(g,'#222',51,39,2,3);
}
function tEntr(g,r){
  R(g,'#2e2a26',0,0,64,64); R(g,'#5a4636',4,2,56,62); speck(g,r,260,['#523f31','#634d3c','#4a3a2e'],4,2,56,62);
  R(g,'#4a392c',4,22,56,3); R(g,'#4a392c',4,44,56,3);
  for(let x=8;x<58;x+=8){R(g,'#7a6452',x,23,1,1);R(g,'#7a6452',x,45,1,1);}
  R(g,'#8a8c88',44,26,12,17); R(g,'#5a5c58',44,26,12,1);
  for(let j=0;j<4;j++)for(let i=0;i<3;i++) R(g,'#3a3b3a',46+i*3,30+j*3,2,2);
  g.globalAlpha=.5; R(g,'#b0a594',10,50,14,1); R(g,'#b0a594',14,53,9,1); g.globalAlpha=1;
}
function tLift(g,r){
  R(g,'#5f605c',0,0,64,64); R(g,'#8d8e89',6,12,52,52);
  for(let i=0;i<60;i++) R(g,r()<.5?'#979893':'#83847f',6+((r()*52)|0),12,1,52);
  R(g,'#2e2f2c',31,12,2,52); R(g,'#1d3f8a',18,2,28,8); g.fillStyle='#e8e6de'; g.font='bold 7px sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('ЛИФТ',32,6.5);
  R(g,'#3a3b38',56,32,6,8); g.globalAlpha=.5; R(g,'#2b2b2b',12,30,10,1); R(g,'#2b2b2b',14,33,6,1); g.globalAlpha=1;
}
function tGarage(g,r,v){
  tBrick(g,r,'#7a3b2c','#554b43');
  const col=['#4a5e4e','#5a4a3a','#4a5468'][v];
  R(g,'#2a2724',3,8,58,56); R(g,col,5,10,54,54);
  for(let x=7;x<59;x+=4) R(g,shadeHex(col,1.18),x,10,1,54);
  for(let i=0;i<14;i++) R(g,['#7a4a2a','#8a5a30','#5a3a22'][(r()*3)|0],5+((r()*50)|0),10+((r()*50)|0),2+((r()*5)|0),1+((r()*3)|0));
  R(g,'#e8e4d6',24,18,16,9); g.fillStyle='#1a1a1a'; g.font='bold 8px sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(String(10+((r()*80)|0)),32,23);
  R(g,'#1a1a1a',30,40,4,4); R(g,'#8a8a82',31,41,2,2);
}
function tSwitch(g,r){
  tBase(g,r); R(g,'#5c615e',12,14,40,44); R(g,'#737875',12,14,40,2); R(g,'#3a3e3c',12,56,40,2);
  poly(g,'#e8c42a',[[26,20],[38,20],[32,30]]); R(g,'#1a1a1a',31,22,2,5);
  R(g,'#2a2d2b',28,34,8,18);
}
function tCeil(g,r){ R(g,'#bdbab0',0,0,64,64); speck(g,r,400,['#b3b0a6','#c7c4ba','#aba89e'],0,0,64,64); g.globalAlpha=.2; R(g,'#6e5a3a',6,30,20,14); g.globalAlpha=1;
  for(let i=0;i<5;i++){const x=10+((r()*44)|0),y=6+((r()*50)|0);R(g,'#1e1c1a',x,y,2,2);R(g,'#8a7a5a',x+1,y+2,1,3);} }
function tTile(g,r){
  R(g,'#3a312b',0,0,64,64); const pal=['#8a4a36','#b5a283'];
  for(let j=0;j<8;j++)for(let i=0;i<8;i++){ const chip=r()<.05; R(g,chip?'#6b6862':pal[(i+j)%2],i*8,j*8,7,7); if(!chip&&(i+j)%2===0) R(g,'#5e3526',i*8+2,j*8+2,3,3); }
  speck(g,r,160,['rgba(0,0,0,.18)','rgba(255,255,255,.07)'],0,0,64,64);
}
function tParq(g,r){
  R(g,'#3b2515',0,0,64,64); const cols=['#6b4527','#7a5230','#5c3a20','#704a2a'];
  for(let col=0;col<8;col++){const off=(col%2)*16;for(let k=-1;k<3;k++){R(g,cols[(r()*4)|0],col*8,k*32+off+1,7,31);}}
  speck(g,r,300,['rgba(0,0,0,.2)','rgba(255,220,160,.06)'],0,0,64,64);
}
function tAsph(g,r){ R(g,'#2d2e30',0,0,64,64); speck(g,r,900,['#3a3b3d','#252628','#333436','#44454a'],0,0,64,64); g.strokeStyle='#1a1a1b'; g.lineWidth=1; g.beginPath(); g.moveTo(3,60); g.lineTo(20,44); g.lineTo(26,48); g.lineTo(44,30); g.stroke(); g.globalAlpha=.4; R(g,'#1b1e24',40,46,16,8); g.globalAlpha=1; }
function tConc(g,r){ R(g,'#3b3a36',0,0,64,64); speck(g,r,700,['#34332f','#43423d','#2e2d2a'],0,0,64,64); g.globalAlpha=.35; R(g,'#1d1f22',8,10,22,12); R(g,'#1d1f22',36,40,18,14); g.globalAlpha=1; R(g,'#2a2927',30,30,6,6); R(g,'#171716',31,31,4,4); }

/* lift interior */
function tLiftWall(g,r,v){
  R(g,'#6b4a2e',0,0,64,64);
  for(let i=0;i<70;i++) R(g,r()<.5?'#5e3f26':'#77553a',(r()*64)|0,(r()*64)|0,1,3+((r()*10)|0));
  R(g,'#8d8e89',0,0,2,64); R(g,'#5c5d59',2,0,1,64); R(g,'#8d8e89',0,56,64,3); R(g,'#5c5d59',0,59,64,1);
  g.globalAlpha=.55; g.strokeStyle='#c9ac86'; g.lineWidth=1;
  for(let i=0;i<9;i++){const x=6+r()*52,y=6+r()*44;g.beginPath();g.moveTo(x,y);g.lineTo(x+(r()-.5)*14,y+(r()-.5)*8);g.stroke();}
  const T=LIFT_TAGS[v||0];g.fillStyle='#d8c29c';g.textBaseline='top';
  for(const [txt,x,y,sz,rot,al] of T){g.save();g.globalAlpha=al||.55;g.translate(x,y);g.rotate(rot||0);g.font='bold '+(sz||7)+'px sans-serif';g.textAlign='left';g.fillText(txt,0,0);g.restore();}
  if(v===3){g.strokeStyle='#d8c29c';g.globalAlpha=.5;g.beginPath();g.arc(30,40,6,Math.PI,0);g.arc(42,40,6,Math.PI,0);g.lineTo(36,52);g.closePath();g.stroke();}
  g.globalAlpha=1;
  if(v===0||v===4){const bx=v?14:44;R(g,'#1e1812',bx,40,6,5);R(g,'#2e241a',bx-1,41,8,3);}
}
/* scratched lift graffiti — each wall panel gets its own */
const LIFT_TAGS=[
  [['ЛЕХА',12,20],['ДУРАК',22,29]],
  [['ЗДЕСЬ',8,14,7,-.08],['БЫЛ ВАСЯ',10,24,7,-.08]],
  [['КИНО',16,26,11,.05,.6],['89',40,44,7,0,.4]],
  [['С+Н',22,26,8,0,.6]],
  [['ДМБ',30,12,8,.1],['-88',34,22,7,.1]],
  [['НЕ КУРИТЬ!',6,46,7,0,.35]]
];
function tLiftDoor(g,r){
  R(g,'#86877f',0,0,64,64); for(let i=0;i<50;i++) R(g,r()<.5?'#8f9089':'#7c7d76',(r()*64)|0,0,1,64);
  R(g,'#2e2f2c',31,0,2,64); R(g,'#1e1f1d',0,0,64,2); R(g,'#3a3a36',0,62,64,2);
  R(g,'#6e6f69',6,28,20,1); R(g,'#6e6f69',38,28,20,1);
}
function tLiftPanel(g,r){
  tLiftWall(g,r,5); R(g,'#9a9b95',36,4,22,56); R(g,'#6e6f69',36,4,22,1); R(g,'#5a5b56',57,4,1,56);
  R(g,'#1a0c0a',39,7,16,9);
  for(let j=0;j<5;j++)for(let i=0;i<2;i++){const x=41+i*8,y=20+j*7;R(g,'#2b2b2a',x,y,5,5);R(g,'#d6d4cc',x+2,y+1,1,3);}
  R(g,'#111',49,34,6,6); R(g,'#3a2a1a',48,35,2,3);
  R(g,'#2b2b2a',44,55,6,3);
}
function tRubber(g,r){R(g,'#1c1c1e',0,0,64,64);for(let y=2;y<64;y+=6)for(let x=(y/6|0)%2*3;x<64;x+=6)R(g,'#29292c',x,y,2,2);
  R(g,'#d8d2c0',40,44,5,1);R(g,'#b8743a',44,44,1,1);speck(g,r,14,['#2a2a2a','#d8d8d0'],0,0,64,64,1);}
function liftCeil(g){R(g,'#6d6e6a',0,0,64,64);R(g,'#4a4b47',14,8,36,48);}
function liftCeilE(g){R(g,'#e6ede4',16,10,32,44);R(g,'#f8fbf6',20,14,24,36);for(const [x,y] of [[22,18],[36,40],[30,27],[41,22]])R(g,'#3a3a36',x,y,2,1);}

/* floor 2 */
function tFar(g,r){R(g,'#101114',0,0,64,64);speck(g,r,500,['#15171b','#0c0d10','#1a1c21'],0,0,64,64);
  R(g,'#1c1d22',0,30,64,6);for(let x=0;x<64;x+=8)R(g,'#2a2a2e',x,32,4,1);}
function farE(g){for(const [x,y] of [[10,12],[44,50],[52,20]]){R(g,'#5a3a1a',x-2,y-2,5,5);R(g,'#c07a2a',x-1,y-1,3,3);R(g,'#ffd08a',x,y,1,1);}R(g,'#6a6a20',30,8,2,2);R(g,'#7a6a22',22,44,2,2);}
function tBalc(g,r){R(g,'#d6d2c4',0,0,64,64);speck(g,r,160,['#c9c4b4','#e0dccf'],0,0,64,64);
  R(g,'#1a2233',8,6,20,34);R(g,'#1a2233',36,6,20,34);R(g,'#2c3a52',10,8,6,2);R(g,'#2c3a52',38,8,6,2);
  R(g,'#d6d2c4',8,22,20,2);R(g,'#d6d2c4',36,22,20,2);R(g,'#bdb8a8',8,44,48,16);R(g,'#8a8474',30,34,4,8);R(g,'#b8a060',44,36,6,2);}
function tBarric(g,r){R(g,'#3a3530',0,0,64,64);
  for(let row=0;row<6;row++)for(let i=0;i<3;i++){const x=(row%2?-10:0)+i*24,y=64-(row+1)*11;R(g,'#b8b0a0',x+1,y,22,10);R(g,'#d0c8b8',x+1,y,22,2);R(g,'#8a8474',x+1,y+9,22,1);
    g.fillStyle='#4a4238';g.font='bold 5px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('ЦЕМЕНТ',x+12,y+6);}
  R(g,'#d8d4c8',44,0,18,40);R(g,'#b8b4a8',44,0,2,40);R(g,'#7a5a3a',4,2,4,40);R(g,'#7a5a3a',2,4,36,3);}
function tBoarded(g,r){tDoor(g,r);for(const [y,a] of [[12,-.18],[30,.12],[47,-.08]]){g.save();g.translate(32,y);g.rotate(a);R(g,'#6a4a2a',-34,-5,68,10);R(g,'#8a6a42',-34,-5,68,2);R(g,'#4a3018',-34,4,68,1);R(g,'#2a2a2a',-26,-1,2,2);R(g,'#2a2a2a',24,-1,2,2);g.restore();}
  g.fillStyle='#d8d4c8';g.font='bold 6px sans-serif';g.textAlign='center';g.fillText('НЕ ВХОДИТЬ',32,40);}
function tShed(g,r,lbl){tBrick(g,r,'#6e3a2c','#4d4540');R(g,'#3a4a3a',10,4,44,60);R(g,'#4a5c4a',10,4,44,2);for(let x=14;x<52;x+=8)R(g,'#2e3c2e',x,6,1,58);
  R(g,'#2a2a2a',40,26,12,16);R(g,'#1a1a1a',41,27,10,14);for(let y=0;y<3;y++)for(let x=0;x<3;x++)R(g,'#8a8a86',42+x*3,32+y*3,2,2);R(g,'#c9a54a',16,30,3,6);
  g.fillStyle='#d8d4c8';g.font='bold 5px sans-serif';g.textAlign='center';g.fillText(lbl||'ДВОРНИК',32,14);}
function tFlatDoor(g,r){tDoor2(g,r);R(g,'#c9a54a',46,30,7,9);R(g,'#1a1a1a',48,32,3,4);R(g,'#f0d890',46,30,7,1);}
function makeTags(code,indoor){const cols=indoor?['#c02020','#2060c0','#c8a010']:['#e04a2a','#5ab0ff','#e8c830'];TX.tag=code.map((d,i)=>bake(g=>{if(indoor)tWallp(g,rng(140+i));else tBrick(g,rng(130+i),'#7a3b2c','#554b43');
  g.save();g.translate(32,34);g.rotate([-.12,.08,-.05][i]);g.fillStyle=cols[i];g.font='bold 40px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(d),2,2);
  g.globalAlpha=.6;for(let k=0;k<5;k++)R(g,cols[i],-8+k*5,18+(k%2)*3,1,6+(k*3%5));g.globalAlpha=1;
  g.fillStyle='#e8e4d8';g.font='bold 9px sans-serif';g.fillText('№'+(i+1),-18,-20);g.restore();}));}
function tFurn(g,r,v){
  if(v===0){R(g,'#4a2e1a',0,0,64,64);R(g,'#5a3a22',2,2,60,60);R(g,'#1a1618',6,6,52,30);for(const y of [15,25])R(g,'#6a4a2a',6,y,52,2);
    for(let i=0;i<14;i++)R(g,r()<.5?'#e8f0f2':'#b8c8cc',8+((r()*48)|0),7+((r()*27)|0),2,3);R(g,'#5a3a22',31,6,2,30);
    R(g,'#4a2e1a',6,40,24,20);R(g,'#4a2e1a',34,40,24,20);R(g,'#c9a54a',28,48,2,4);R(g,'#c9a54a',34,48,2,4);}
  else if(v===1){R(g,'#6a4a2e',0,0,64,64);for(let i=0;i<40;i++)R(g,'#5e3f26',(r()*64)|0,(r()*64)|0,1,6);R(g,'#4a321e',31,2,2,60);
    R(g,'#8a9aa8',36,6,22,50);R(g,'#b8c8d4',38,8,4,40);R(g,'#c9a54a',27,30,2,6);R(g,'#c9a54a',35,30,2,6);R(g,'#3e2a1c',0,58,64,6);}
  else if(v===2){R(g,'#dcd8cc',0,0,64,64);R(g,'#eeeae0',4,2,56,60);R(g,'#c8c4b8',4,20,56,2);R(g,'#b8b8b4',50,24,3,18);R(g,'#e6e6e2',50,24,1,18);
    R(g,'#a8a8a4',24,8,16,5);g.fillStyle='#6a6a66';g.font='bold 5px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('ЗИЛ',32,10.5);R(g,'#b8b4a8',4,58,56,4);}
  else {R(g,'#2a1a12',0,0,64,64);R(g,'#3a2418',2,2,60,30);R(g,'#1a0e0a',2,32,60,4);R(g,'#e8e4d8',4,36,56,7);for(let x=4;x<60;x+=4)R(g,'#8a8478',x,36,1,7);
    for(const x of [6,10,18,22,26,34,38,46,50,54])R(g,'#111',x,36,2,4);R(g,'#2a1a12',4,44,56,20);R(g,'#c9a54a',8,8,3,8);R(g,'#c9a54a',52,8,3,8);R(g,'#d8d0b8',22,10,20,14);}
}
function tCarpet(g,r){R(g,'#7a6a52',0,0,64,64);R(g,'#6e1818',2,3,60,58);R(g,'#8a2222',4,5,56,54);
  R(g,'#c9a54a',4,5,56,2);R(g,'#c9a54a',4,57,56,2);R(g,'#1a2a5a',6,8,52,2);R(g,'#1a2a5a',6,54,52,2);
  for(const [cx,cy] of [[32,32],[16,20],[48,20],[16,44],[48,44]]){const s=cx===32?12:6;for(let k=0;k<s;k++){R(g,'#c9a54a',cx-k,cy-s+k,1,1);R(g,'#c9a54a',cx+k,cy-s+k,1,1);R(g,'#c9a54a',cx-k,cy+s-k,1,1);R(g,'#c9a54a',cx+k,cy+s-k,1,1);}R(g,'#1a2a5a',cx-2,cy-2,4,4);}
  speck(g,r,120,['#6a1a1a','#9a2a2a'],4,5,56,54);}
function tDoor2(g,r){tDoor(g,r);R(g,'#7a1e18',5,3,54,61);g.strokeStyle='#5a1410';g.lineWidth=1;for(let k=-64;k<64;k+=10){g.beginPath();g.moveTo(5+k,3);g.lineTo(5+k+61,64);g.stroke();g.beginPath();g.moveTo(59-k,3);g.lineTo(59-k-61,64);g.stroke();}
  R(g,'#35241a',0,0,5,64);R(g,'#35241a',59,0,5,64);R(g,'#35241a',0,0,64,3);for(let y=8;y<62;y+=10)for(let x=10;x<56;x+=10)R(g,'#e0c060',x+((y/10|0)%2?5:0),y,1,1);
  R(g,'#c9a54a',24,8,16,8);g.fillStyle='#3a2a10';g.font='bold 7px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('13',32,12.5);R(g,'#d0b87e',48,35,8,2);}
function tWallpB(g,r){R(g,'#6a2a22',0,0,64,64);for(let x=4;x<64;x+=12)R(g,'#7a3428',x,0,5,64);
  for(let gy=0;gy<4;gy++)for(let gx=0;gx<4;gx++){const cx=gx*16+(gy%2?16:8)&63,cy=gy*16+8;R(g,'#c9a54a',cx-1,cy-2,2,4);R(g,'#c9a54a',cx-2,cy-1,4,2);}
  speck(g,r,200,['#5e241e','#743024'],0,0,64,58);R(g,'#3e2a1c',0,57,64,7);R(g,'#5a3f2b',0,57,64,1);}

/* basement */
function tSlat(g,r){R(g,'#1a1612',0,0,64,64);for(let x=0;x<64;x+=8){const f=.8+r()*.3;R(g,shadeHex('#6a5238',f),x+1,0,6,64);R(g,shadeHex('#7a6044',f),x+1,0,1,64);}
  R(g,'#4a3a28',0,14,64,4);R(g,'#4a3a28',0,46,64,4);speck(g,r,90,['#2a2218','#5a4630'],0,0,64,64);}
function tSlatDoor(g,r){tSlat(g,r);R(g,'#3a2e20',0,0,2,64);R(g,'#3a2e20',62,0,2,64);R(g,'#8a8a86',40,28,8,10);R(g,'#5a5a56',41,24,6,5);R(g,'#1a1a1a',43,32,2,3);
  g.fillStyle='#d8d0b0';g.font='bold 7px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(String(10+((r()*70)|0)),24,8);}
function tPipes(g,r){tBase(g,r);for(const [y,h,c] of [[20,8,'#5a6a60'],[32,6,'#8a8474'],[44,9,'#4a4a4e']]){R(g,c,0,y,64,h);R(g,shadeHex(c,1.3),0,y,64,1);R(g,shadeHex(c,.6),0,y+h-1,64,1);}
  R(g,'#c9c0a8',8,32,14,6);R(g,'#a8a090',8,34,14,1);R(g,'#b0302a',46,15,8,4);R(g,'#8a8a86',49,19,2,4);R(g,'#6a3a1a',30,44,5,9);for(let i=0;i<6;i++)R(g,'#6a3a1a',(r()*64)|0,21+((r()*30)|0),2,2);}
function tBoiler(g,r){R(g,'#3a3634',0,0,64,64);R(g,'#4a4644',2,2,60,60);for(let x=6;x<60;x+=10)for(let y=6;y<60;y+=10)R(g,'#2a2624',x,y,2,2);
  R(g,'#1a1614',20,34,24,20);R(g,'#5a5654',18,32,28,2);R(g,'#8a8680',8,8,10,10);R(g,'#e8e4d8',9,9,8,8);R(g,'#b0302a',12,12,4,1);R(g,'#8a8680',46,8,10,10);R(g,'#e8e4d8',47,9,8,8);R(g,'#111',50,10,1,4);
  R(g,'#6a3a1a',30,2,6,14);R(g,'#5a5a5e',0,24,64,4);}
function boilerE(g){R(g,'#ff6a1a',22,40,20,12);R(g,'#ffb040',26,44,12,6);R(g,'#fff0a0',30,47,4,2);for(let x=22;x<42;x+=4)R(g,'#2a1a10',x,36,2,4);}
function tHatch(g,r){tBase(g,r);R(g,'#4a4e4c',8,10,48,54);R(g,'#5c605e',8,10,48,2);for(let y=14;y<62;y+=8)R(g,'#3a3e3c',10,y,44,1);R(g,'#8a8a86',44,34,6,4);R(g,'#1a4a2a',16,0,32,9);}
function hatchE(g){R(g,'#4dff8a',17,1,30,7);g.fillStyle='#0a2a14';g.font='bold 6px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('ВЫХОД',32,4.6);}
function tWater(g,r){R(g,'#0e1618',0,0,64,64);speck(g,r,300,['#122024','#0a1214','#16282c'],0,0,64,64);for(let i=0;i<7;i++)R(g,'#2a4248',(r()*58)|0,(r()*62)|0,4+((r()*6)|0),1);R(g,'#3a3024',40,20,6,2);}
function tCoalF(g,r){R(g,'#2a2724',0,0,64,64);speck(g,r,700,['#1a1816','#33302c','#0e0d0c','#3a3632'],0,0,64,64);R(g,'#141210',8,40,20,10);R(g,'#141210',36,8,14,8);}
function tCeilB(g,r){R(g,'#3a3834',0,0,64,64);speck(g,r,400,['#33312d','#403e3a','#2c2a27'],0,0,64,64);R(g,'#4a4a46',0,28,64,5);R(g,'#5a5a56',0,28,64,1);R(g,'#2a2a28',0,32,64,1);R(g,'#1a1a18',20,0,2,64);}

const TX={};
/* ---------- СТРОЙКА: textures & sprites ---------- */
function siteTextures(){
  TX.column=bake(g=>{const r=rng(450);R(g,'#9a968e',0,0,64,64);R(g,'#a8a49c',8,0,48,64);R(g,'#8a867e',8,0,2,64);R(g,'#8a867e',54,0,2,64);for(let y=10;y<64;y+=18)R(g,'#8a867e',8,y,48,1);for(let i=0;i<14;i++)R(g,'#8a867e',10+((r()*44)|0),(r()*64)|0,2,1);R(g,'#6a4a3a',20,0,2,6);R(g,'#6a4a3a',42,0,2,6);});
  TX.fbrick=bake(g=>{R(g,'#c8c0b0',0,0,64,64);for(let y=0;y<64;y+=8){const o=(y/8)%2?0:8;for(let x=-8;x<64;x+=16){R(g,'#a83a2a',x+o+1,y+1,14,6);R(g,'#c04a34',x+o+1,y+1,14,1);}}R(g,'#e0d8c8',10,15,5,3);R(g,'#e0d8c8',40,31,4,4);R(g,'#e0d8c8',24,47,6,3);});
  /* railing (see-through), ragged silo wall already TX.siloW */
  {TX.railing=bake(g=>{g.clearRect(0,0,64,64);R(g,'#c8a81e',0,6,64,4);R(g,'#e0c030',0,6,64,1);R(g,'#1a1a1a',0,22,64,3);
     for(let x=2;x<64;x+=15){R(g,'#2a2a2a',x,6,4,58);R(g,'#4a4a4a',x,6,1,58);R(g,'#c8a81e',x-1,6,6,2);R(g,'#1e1e1e',x-1,62,6,2);}R(g,'#5a5a52',0,54,64,8);R(g,'#6c6c62',0,54,64,1);for(let x=0;x<64;x+=8)R(g,'#3a3a34',x,55,1,7);
     R(g,'#3a3a3a',0,50,64,3);});}
  /* ЭЛЕВАТОР floor 1: silo metal, seed-dust floor, girder ceiling, grain-bin tube */
  {
   TX.siloW=bake(g=>{const r=rng(661);R(g,'#8a8276',0,0,64,64);for(let x=0;x<64;x+=6){R(g,'#9a9286',x,0,4,64);R(g,'#6e665a',x+4,0,2,64);R(g,'#aaa296',x+1,0,1,64);}
     for(let y=0;y<64;y+=16)R(g,'#6a6256',0,y,64,1);for(let i=0;i<10;i++){const x=(r()*62)|0,y=(r()*58)|0;R(g,'rgba(120,70,30,.5)',x,y,2,4+(r()*10|0));}});
   TX.siloF=bake(g=>{const r=rng(662);R(g,'#9a8f74',0,0,64,64);for(let i=0;i<70;i++)R(g,r()<.5?'#908568':'#a69a7c',(r()*64)|0,(r()*64)|0,2,2);
     for(let i=0;i<120;i++){const x=(r()*64)|0,y=(r()*64)|0;R(g,r()<.5?'#3a2c16':'#6a4a22',x,y,2,1);}
     for(let i=0;i<30;i++){g.fillStyle='rgba(50,36,16,.3)';g.beginPath();g.ellipse(r()*64,r()*64,3+r()*5,2+r()*3,r()*3,0,7);g.fill();}});
   TX.siloC=bake(g=>{const r=rng(663);R(g,'#4a443a',0,0,64,64);for(let x=8;x<64;x+=20)R(g,'#5a5246',x,0,4,64);for(let y=10;y<64;y+=22)R(g,'#5a5246',0,y,64,4);
     for(let i=0;i<40;i++)R(g,'#3e382e',(r()*64)|0,(r()*64)|0,2,1);R(g,'#2a251e',30,30,5,5);});
   TX.siloBin=bake(g=>{const r=rng(664);for(let x=0;x<64;x++){const k=Math.abs(x-32)/32,sh=1-k*k*.7;const c=[158*sh,150*sh,132*sh].map(v=>v|0);g.fillStyle='rgb('+c+')';g.fillRect(x,0,1,64);}
     for(let y=0;y<64;y+=9)R(g,'rgba(60,54,44,.7)',0,y,64,2);for(let i=0;i<8;i++)R(g,'rgba(120,70,30,.45)',(r()*60)|0,(r()*60)|0,3,8+(r()*12|0));
     R(g,'rgba(255,240,200,.25)',22,0,4,64);});
   /* stairwell: checker-plate steps with rusty nosing; lift panel gone to rust, screen dead */
   TX.siloStep=bake(g=>{const r=rng(666);R(g,'#5c5850',0,0,64,64);for(let y=0;y<64;y+=4)for(let x=(y/4)%2*4;x<64;x+=8)R(g,'#6c675e',x,y,3,1);
     for(let y=0;y<64;y+=16){R(g,'#2a2620',0,y+13,64,3);R(g,'#8a5a2a',0,y,64,2);R(g,'#a87040',0,y,64,1);}for(let i=0;i<40;i++)R(g,r()<.5?'#6a3e1e':'#4a2a14',(r()*64)|0,(r()*64)|0,2,1);});
   TX.siloStairs=bake(g=>{const r=rng(668);R(g,'#8a8276',0,0,64,64);for(let x=0;x<64;x+=6){R(g,'#9a9286',x,0,4,64);R(g,'#6e665a',x+4,0,2,64);}R(g,'#5e584e',0,0,64,3);
     R(g,'#121110',8,12,48,52);for(let i=0;i<9;i++){const y=60-i*5,w=46-i*3,x=9+i*1.5;R(g,'#4a4238',x,y,w,3);R(g,'#8a5a2a',x,y,w,1);}
     R(g,'#a09a8a',8,12,3,52);R(g,'#a09a8a',53,12,3,52);R(g,'#c8b070',16,3,32,8);poly(g,'#2a2620',[[32,4],[36,8],[34,8],[34,10],[30,10],[30,8],[28,8]]);
     for(let i=0;i<6;i++){const x=(r()*62)|0;R(g,'rgba(120,64,24,.45)',x,(r()*10)|0,1,4+((r()*8)|0));}});
   TX.siloShaft=bake(g=>{const r=rng(669);R(g,'#5e6466',0,0,64,64);for(let x=0;x<64;x+=16){R(g,'#4a5052',x,0,2,64);R(g,'#727a7c',x+2,0,1,64);}R(g,'#4a5052',0,31,64,2);R(g,'#727a7c',0,33,64,1);
     for(let x=6;x<64;x+=16)for(let y=4;y<64;y+=28){R(g,'#3a3e40',x,y,2,2);R(g,'#8a9294',x,y,1,1);R(g,'#3a3e40',x+4,y,2,2);R(g,'#8a9294',x+4,y,1,1);}
     for(let i=0;i<8;i++){const x=(r()*62)|0,y=(r()*40)|0;R(g,'rgba(120,64,24,.5)',x,y,1+((r()*2)|0),6+((r()*16)|0));}for(let i=0;i<50;i++)R(g,'rgba(30,30,30,.25)',(r()*64)|0,(r()*64)|0,2,1);});
   TX.liftPanelR=bake(g=>{const r=rng(667);tLiftPanel(g,rng(62));R(g,'#0c0807',39,7,16,9);R(g,'#1e1612',40,8,5,1);
     for(let j=0;j<5;j++)for(let i=0;i<2;i++){const x=41+i*8,y=20+j*7;R(g,'#5a3418',x,y,5,5);R(g,r()<.5?'#8a4a1e':'#7a5030',x+1+((r()*3)|0),y+1+((r()*3)|0),2,2);R(g,'#3a200e',x,y+4,5,1);if(r()<.6)R(g,'rgba(110,60,25,.6)',x+2,y+5,1,2+((r()*4)|0));}
     for(let i=0;i<30;i++)R(g,r()<.5?'rgba(120,64,24,.55)':'rgba(70,40,18,.5)',36+((r()*22)|0),4+((r()*56)|0),1+((r()*2)|0),1+((r()*3)|0));});
   /* floor 2 grain hole: floor 1 far below, nearly black */
   TX.siloHole=bake(g=>{const r=rng(665);R(g,'#0b0906',0,0,64,64);for(let i=0;i<90;i++)R(g,r()<.6?'#1a140c':'#241c12',(r()*64)|0,(r()*64)|0,1,1);for(let i=0;i<10;i++)R(g,'#050403',(r()*60)|0,(r()*60)|0,4,3);});}
  /* ГАРАЖИ textures */
  {const rnd=rng(611);
   const roofBand=g=>{R(g,'#2a2624',0,0,64,6);R(g,'#3a3430',0,0,64,1);R(g,'#1a1614',0,5,64,1);for(let x=0;x<64;x+=9)R(g,'#46403a',x,1,4,1);};
   TX.gwall=bake(g=>{const r=rng(612);R(g,'#a8a294',0,0,64,64);for(let y=6;y<64;y+=6){const o=(y/6)%2?0:8;for(let x=-8;x<64;x+=16){R(g,'#b4ae9e',x+o+1,y+1,14,4);}}
     for(let i=0;i<5;i++){const x=(r()*60)|0;R(g,'rgba(60,50,40,.35)',x,6,2,14+(r()*30|0));}roofBand(g);R(g,'rgba(40,36,30,.4)',0,58,64,6);});
   TX.groof=bake(g=>{R(g,'#2e2a28',0,0,64,64);const r=rng(613);for(let i=0;i<90;i++)R(g,r()<.5?'#3a3532':'#262220',(r()*64)|0,(r()*64)|0,3,1);for(let y=0;y<64;y+=16)R(g,'#1e1a18',0,y,64,1);});
   TX.gint=bake(g=>{const r=rng(614);R(g,'#4a4640',0,0,64,64);for(let i=0;i<60;i++)R(g,r()<.5?'#423e38':'#544e46',(r()*64)|0,(r()*64)|0,2,1);
     R(g,'#5a3a22',4,20,56,2);R(g,'#5a3a22',4,38,56,2);for(let x=8;x<56;x+=7){R(g,'#7a7a7e',x,13,2,7);R(g,'#8a3020',x+3,31,3,7);}R(g,'#1e1e1e',10,44,14,18);R(g,'#2a2a2a',12,46,10,14);R(g,'#1e1e1e',40,46,14,16);R(g,'#2a2a2a',42,48,10,12);R(g,'#c8a030',30,24,5,8);});
   const DC=[['#3e6a3e','#2e522e'],['#3a5a86','#2a4466'],['#8a4a2a','#6a3420'],['#6a6e70','#4e5254'],['#7a7a3a','#5a5a2a']];
   TX.gdoor=DC.map(([c,d],k)=>bake(g=>{const r=rng(620+k);R(g,c,0,6,64,58);R(g,d,0,6,2,58);R(g,d,62,6,2,58);R(g,d,0,62,64,2);
     for(let y=10;y<62;y+=10)R(g,shadeHex(c,1.12),3,y,58,1);
     R(g,'#1e1e1e',3,8,1,52);R(g,'#1e1e1e',60,8,1,52);for(const y of [14,48]){R(g,'#2a2a2a',0,y,6,3);R(g,'#8a8a8a',1,y,2,1);}
     R(g,'#b8a060',54,32,4,6);R(g,'#7a6a3a',55,37,2,3);
     for(let i=0;i<4;i++){const x=(r()*56)|0;R(g,'rgba(110,60,30,.55)',x,8+(r()*20|0),2,10+(r()*24|0));}
     g.fillStyle='#e8e2d2';g.font='bold 9px monospace';g.fillText(String(10+((r()*89)|0)),18,26);roofBand(g);}));
   TX.gdoorS=bake(g=>{const r=rng(640);R(g,'#b8642a',0,6,64,58);R(g,'#8a4a1e',0,6,2,58);R(g,'#8a4a1e',62,6,2,58);for(let y=10;y<62;y+=10)R(g,'#c87436',3,y,58,1);
     for(let i=0;i<9;i++){const x=(r()*58)|0;R(g,'rgba(90,40,16,.6)',x,8+(r()*20|0),2+(r()*2|0),12+(r()*26|0));}
     g.fillStyle='#e8c020';for(let a=0;a<6.28;a+=.52){g.beginPath();g.ellipse(32+Math.cos(a)*9,26+Math.sin(a)*9,5,3,a,0,7);g.fill();}g.fillStyle='#3a2410';g.beginPath();g.arc(32,26,6,0,7);g.fill();g.fillStyle='#5a3a1a';for(let i=0;i<10;i++)g.fillRect(28+((r()*8)|0),22+((r()*8)|0),1,1);
     g.fillStyle='#f0ead8';g.font='bold 8px monospace';g.fillText('СЕМКИ',10,48);R(g,'#1a1210',0,56,64,8);for(let i=0;i<40;i++)R(g,r()<.5?'#2a1a10':'#e8e0c8',(r()*64)|0,56+((r()*7)|0),2,1);
     R(g,'#2a2624',0,0,64,6);R(g,'#3a3430',0,0,64,1);R(g,'#1a1614',0,5,64,1);});
   TX.ggate=bake(g=>{R(g,'#2e522e',0,0,64,64);for(let x=4;x<64;x+=8)R(g,'#3e6a3e',x,2,4,60);R(g,'#1e3a1e',0,30,64,4);R(g,'#1e3a1e',0,0,64,3);R(g,'#1e3a1e',0,61,64,3);
     g.strokeStyle='#9a9a9e';g.lineWidth=2;for(let i=0;i<8;i++){g.beginPath();g.ellipse(14+i*5,34+(i%2)*2,3,2,0,0,7);g.stroke();}R(g,'#c8a030',50,30,7,9);R(g,'#8a6a1a',52,27,3,4);});
   TX.plita=bake(g=>{R(g,'#a8a49a',0,0,64,64);R(g,'#bab6ac',0,0,64,3);R(g,'#86827a',0,61,64,3);
     for(let ry=0;ry<2;ry++)for(let rx=0;rx<2;rx++){const cx=16+rx*32,cy=18+ry*28;g.fillStyle='#96928a';g.beginPath();g.moveTo(cx,cy-11);g.lineTo(cx+13,cy);g.lineTo(cx,cy+11);g.lineTo(cx-13,cy);g.fill();g.fillStyle='#b4b0a6';g.beginPath();g.moveTo(cx,cy-7);g.lineTo(cx+8,cy);g.lineTo(cx,cy+7);g.lineTo(cx-8,cy);g.fill();}
     for(let i=0;i<40;i++)R(g,'#9a968c',(rnd()*64)|0,(rnd()*64)|0,2,1);});
   TX.goil=bake(g=>{const r=rng(615);R(g,'#5e5a54',0,0,64,64);for(let i=0;i<70;i++)R(g,r()<.5?'#56524c':'#66625a',(r()*64)|0,(r()*64)|0,2,2);g.fillStyle='rgba(20,18,16,.6)';g.beginPath();g.ellipse(30,34,16,9,.3,0,7);g.fill();g.fillStyle='rgba(30,40,60,.25)';g.beginPath();g.ellipse(34,32,7,3,.2,0,7);g.fill();});
   TX.lane=bake(g=>{const r=rng(616);R(g,'#6a665e',0,0,64,64);for(let i=0;i<120;i++)R(g,r()<.5?'#625e56':'#747068',(r()*64)|0,(r()*64)|0,2,1);
     for(let i=0;i<4;i++){g.fillStyle='rgba(120,100,70,.35)';g.beginPath();g.ellipse(r()*64,r()*64,6+r()*8,3+r()*4,r()*3,0,7);g.fill();}g.fillStyle='rgba(20,18,16,.3)';g.beginPath();g.ellipse(20,44,8,4,0,0,7);g.fill();});}
  /* стройка v2: pipes, joints, slab stacks, brick pallets, unfinished-block panels */
  {const rgb=(r,g2,b)=>'rgb('+(r|0)+','+(g2|0)+','+(b|0)+')',cl=v=>Math.max(0,Math.min(255,v));
   const pc=[112,110,104];
   TX.pipeS=bake(g=>{const r=rng(501);for(let y=0;y<64;y++){const k=y/63,s=.42+.78*Math.max(0,Math.cos((k-.28)*Math.PI*.95));g.fillStyle=rgb(cl(pc[0]*s),cl(pc[1]*s),cl(pc[2]*s));g.fillRect(0,y,64,1);}
     for(let i=0;i<9;i++){const x=(r()*60)|0,y=(r()*30+18)|0;g.fillStyle='rgba(120,62,30,.55)';g.fillRect(x,y,2+(r()*3|0),6+(r()*18|0));}
     for(let i=0;i<30;i++){g.fillStyle='rgba(40,38,34,.35)';g.fillRect((r()*64)|0,(r()*60)|0,1,1);}
     for(const x0 of [0,62]){g.fillStyle='rgba(30,30,30,.55)';g.fillRect(x0,0,2,64);}g.fillStyle='rgba(210,206,196,.5)';g.fillRect(2,4,1,30);
     g.fillStyle='rgba(20,18,16,.6)';g.fillRect(0,60,64,4);});
   TX.pipeT=bake(g=>{const r=rng(502);for(let y=0;y<64;y++){const k=y/63,s=.5+.72*Math.pow(Math.sin(k*Math.PI),.8)+(k>.3&&k<.45?.15:0);g.fillStyle=rgb(cl(pc[0]*s),cl(pc[1]*s),cl(pc[2]*s));g.fillRect(0,y,64,1);}
     for(let i=0;i<7;i++){g.fillStyle='rgba(120,62,30,.5)';g.fillRect((r()*60)|0,(r()*40+12)|0,3+(r()*6|0),2);}
     g.fillStyle='rgba(30,30,30,.5)';g.fillRect(0,0,3,64);g.fillStyle='rgba(220,216,206,.5)';g.fillRect(3,0,1,64);});
   TX.pipeE=bake(g=>{for(let y=0;y<64;y++)for(let x=0;x<64;x++){const dx=x-31.5,dy=y-31.5,d=Math.hypot(dx,dy);if(d>31.5)continue;
       if(d>24){const s=.6+.5*(-dy/31)*.6+.2;g.fillStyle=rgb(cl(pc[0]*s),cl(pc[1]*s),cl(pc[2]*s));}else{const s=.25+d/24*.35;g.fillStyle=rgb(22*s*2,20*s*2,18*s*2);}
       g.fillRect(x,y,1,1);}
     g.fillStyle='rgba(0,0,0,.5)';for(let a=0;a<6.3;a+=.03){const x=31.5+Math.cos(a)*24,y=31.5+Math.sin(a)*24;g.fillRect(x|0,y|0,1,1);}});
   TX.jointS=bake(g=>{R(g,'#5e6260',0,0,64,64);R(g,'#6e7270',0,0,64,10);R(g,'#4a4e4c',0,54,64,10);R(g,'#3a3e3c',0,0,2,64);R(g,'#3a3e3c',62,0,2,64);
     for(let x=6;x<64;x+=10){R(g,'#2a2c2a',x,4,3,3);R(g,'#8a8e8c',x,4,1,1);R(g,'#2a2c2a',x,57,3,3);}
     g.strokeStyle='#a83028';g.lineWidth=3;g.beginPath();g.arc(32,32,14,0,7);g.stroke();g.beginPath();g.moveTo(18,32);g.lineTo(46,32);g.moveTo(32,18);g.lineTo(32,46);g.stroke();R(g,'#c84a3a',29,29,6,6);
     R(g,'#e8d020',4,16,10,3);R(g,'#1a1a1a',6,16,2,3);R(g,'#1a1a1a',10,16,2,3);});
   TX.jointT=bake(g=>{R(g,'#686c6a',0,0,64,64);R(g,'#747876',4,4,56,56);for(let a=0;a<6.28;a+=.785){R(g,'#2a2c2a',(32+Math.cos(a)*24)|0,(32+Math.sin(a)*24)|0,3,3);}
     g.strokeStyle='#a83028';g.lineWidth=3;g.beginPath();g.arc(32,32,12,0,7);g.stroke();R(g,'#c84a3a',29,29,6,6);});
   TX.slabS=bake(g=>{const r=rng(503);for(let i=0;i<4;i++){const y=i*16;R(g,'#a4a098',0,y,64,13);R(g,'#b8b4ac',0,y,64,2);R(g,'#86827a',0,y+11,64,2);R(g,'#2a2622',0,y+13,64,3);R(g,'#7a5a36',8,y+13,8,3);R(g,'#7a5a36',48,y+13,8,3);}
     for(let i=0;i<40;i++){R(g,'#8a867e',(r()*64)|0,(r()*64)|0,2,1);}});
   TX.slabT=bake(g=>{const r=rng(504);R(g,'#aeaaa2',0,0,64,64);for(let i=0;i<60;i++)R(g,'#9a968e',(r()*64)|0,(r()*64)|0,2,2);
     for(const [x,y] of [[10,12],[50,12],[10,50],[50,50]]){R(g,'#5a4a3a',x,y,5,1);R(g,'#5a4a3a',x,y,1,4);R(g,'#5a4a3a',x+4,y,1,4);}R(g,'#8a8278',20,30,20,6);});
   TX.palS=bake(g=>{R(g,'#c8c0b0',0,0,64,50);for(let y=0;y<50;y+=8){const o=(y/8)%2?0:8;for(let x=-8;x<64;x+=16){R(g,'#a83a2a',x+o+1,y+1,14,6);R(g,'#c04a34',x+o+1,y+1,14,1);}}
     R(g,'#6a4a2a',0,50,64,14);R(g,'#8a6a3a',0,50,64,3);R(g,'#8a6a3a',0,58,64,2);for(const x of [0,28,56])R(g,'#5a3a1a',x,53,8,11);R(g,'#1a1410',0,61,64,3);});
   TX.palT=bake(g=>{R(g,'#c8c0b0',0,0,64,64);for(let y=0;y<64;y+=8){const o=(y/8)%2?0:8;for(let x=-8;x<64;x+=16){R(g,'#b04232',x+o+1,y+1,14,6);R(g,'#c85a44',x+o+1,y+1,14,1);}}});
   const panel=(g,r,win)=>{R(g,'#a09c94',0,0,64,64);for(let i=0;i<70;i++)R(g,r()<.5?'#948f87':'#aca8a0',(r()*64)|0,(r()*64)|0,2,1);R(g,'#6e6a62',0,0,64,2);R(g,'#6e6a62',0,0,2,64);R(g,'#bcb8b0',2,2,62,1);
     for(let i=0;i<3;i++){const x=(r()*56)|0;R(g,'rgba(70,60,50,.35)',x,2,2,20+(r()*30|0));}
     if(win===1){R(g,'#161412',16,14,32,30);R(g,'#26221e',16,14,32,4);R(g,'#3a3630',16,40,32,4);R(g,'#7a5a3a',16,44,32,2);}
     else if(win===2){R(g,'#161412',6,10,52,44);R(g,'#26221e',6,10,52,4);R(g,'#6a4a3a',12,54,1,10);R(g,'#6a4a3a',30,54,1,10);R(g,'#6a4a3a',48,54,1,10);}};
   TX.skelF=[bake(g=>panel(g,rng(511),1)),bake(g=>panel(g,rng(512),2))];
   TX.skelG=bake(g=>{panel(g,rng(513),1);R(g,'rgba(40,36,30,.35)',0,56,64,8);});
   TX.skelTop=bake(g=>{const r=rng(514);g.fillStyle='#a09c94';g.fillRect(0,40,64,24);R(g,'#bcb8b0',0,40,64,2);R(g,'#6e6a62',0,62,64,2);
     for(let x=3;x<64;x+=7+((r()*5)|0)){const h=6+((r()*26)|0);R(g,'#6a4a3a',x,40-h,1,h);R(g,'#8a6a4a',x,40-h,1,1);}R(g,'#9a968e',0,24,6,16);R(g,'#9a968e',58,28,6,12);});
   TX.skelIn=bake(g=>{const r=rng(515);R(g,'#8a867e',0,0,64,64);for(let i=0;i<60;i++)R(g,r()<.5?'#7e7a72':'#96928a',(r()*64)|0,(r()*64)|0,2,1);R(g,'#6a665e',0,0,64,2);R(g,'#6a665e',0,0,2,64);},
     g=>{R(g,'#c8dcf0',16,14,32,30);R(g,'#e0ecf8',16,14,32,8);R(g,'#a8b8a0',16,38,32,6);});}
  TX.dirt=bake(g=>{R(g,'#7a6a52',0,0,64,64);R(g,'#7e6e56',0,0,32,32);R(g,'#7e6e56',32,32,32,32);R(g,'#6a5a44',10,20,14,3);R(g,'#6a5a44',40,48,12,3);R(g,'#8a7a62',44,10,6,2);});
}
function siteArt(){
  const Y='#d8a020',YD='#a87810',DK='#3a3a3a';
  SPR.crane=bake(g=>{for(let y=12;y<64;y+=4){R(g,Y,29,y,6,1);R(g,YD,29,y+2,6,1);}R(g,Y,29,12,1,52);R(g,Y,34,12,1,52);
    R(g,Y,2,11,60,2);for(let x=2;x<60;x+=4)R(g,YD,x,9,1,2);R(g,Y,2,9,40,1);R(g,DK,48,13,12,6);R(g,Y,28,13,8,6);R(g,'#8ab0c0',30,14,4,3);
    R(g,'#3a3a44',10,13,1,18);R(g,DK,8,31,5,3);R(g,'#1a1a1a',29,62,6,2);});
  SPR.craneX=bake(g=>{g.save();g.translate(32,50);g.rotate(-.35);R(g,Y,-28,-2,56,4);for(let x=-28;x<28;x+=5)R(g,YD,x,-4,1,2);g.restore();g.save();g.translate(24,54);g.rotate(.6);R(g,Y,-14,-2,28,4);g.restore();R(g,'#2a2a2a',10,58,44,6);R(g,DK,40,50,14,8);R(g,'#4a3020',18,56,10,4);});
  SPR.cabE=[0,1].map(f=>bake(g=>{R(g,Y,6,20,52,30);R(g,YD,6,46,52,4);R(g,Y,0,16,64,4);R(g,'#8ab0c0',12,24,24,14);
      R(g,'#c89070',20,29,8,8);R(g,'#f0f0ea',19,26,10,4);R(g,'#e07020',18,36,12,2);
      R(g,'#2a2c30',38,30,22,8);for(let i=0;i<3;i++)R(g,'#1a1a1c',56,30+i*3,6,2);R(g,DK,26,50,12,10);},
    g=>{if(f){g.fillStyle='#fff0a0';g.beginPath();g.arc(62,34,6,0,7);g.fill();g.fillStyle='#ffb040';g.beginPath();g.arc(62,34,3,0,7);g.fill();}}));
  SPR.scaff=bake(g=>{const S='#8a8a86',W='#7a5a36';for(const x of [6,30,56])R(g,S,x,0,2,64);for(const y of [2,22,42]){R(g,W,4,y,56,3);R(g,'#5a4026',4,y+3,56,1);}g.strokeStyle=S;g.lineWidth=1;for(const [a,b] of [[6,30],[30,56]])for(const y of [5,25,45]){g.beginPath();g.moveTo(a+1,y);g.lineTo(b,y+17);g.stroke();}});
  SPR.pipe=bake(g=>{g.fillStyle='#8a867e';g.beginPath();g.arc(32,40,23,0,7);g.fill();g.fillStyle='#a09c94';g.beginPath();g.arc(32,40,23,Math.PI*1.1,Math.PI*1.7);g.lineTo(32,40);g.fill();g.fillStyle='#1a1816';g.beginPath();g.arc(32,40,15,0,7);g.fill();g.fillStyle='#2a2622';g.beginPath();g.arc(32,42,11,0,7);g.fill();R(g,'#6a665e',9,62,46,2);});
  SPR.mixer=bake(g=>{R(g,'#3a3a3a',12,50,40,4);g.fillStyle='#1a1a1a';g.beginPath();g.arc(18,58,5,0,7);g.fill();g.beginPath();g.arc(46,58,5,0,7);g.fill();g.save();g.translate(32,34);g.rotate(-.4);g.fillStyle='#e07020';g.beginPath();g.ellipse(0,0,18,13,0,0,7);g.fill();R(g,'#c05a18',-16,-2,32,3);R(g,'#2a1a10',14,-6,6,12);g.restore();R(g,'#5a5a5a',30,44,4,8);});
  SPR.bricks=bake(g=>{R(g,'#7a5a36',8,58,48,5);for(let y=34;y<58;y+=6){const o=(y/6)%2?0:5;for(let x=10+o;x<52;x+=10){R(g,'#a83a2a',x,y,9,5);R(g,'#c04a34',x,y,9,1);}}});
  SPR.rebar=bake(g=>{for(let i=0;i<9;i++){R(g,i%2?'#7a4a2a':'#8a5a32',4,50+i%4,56,1);}R(g,'#5a3a2a',4,49,56,1);R(g,'#8a8a86',20,48,3,8);R(g,'#8a8a86',44,48,3,8);});
  SPR.sand=bake(g=>{g.fillStyle='#c8b080';g.beginPath();g.moveTo(2,63);g.quadraticCurveTo(32,20,62,63);g.fill();g.fillStyle='#d8c090';g.beginPath();g.moveTo(14,63);g.quadraticCurveTo(28,34,40,58);g.fill();R(g,'#8a7a5a',40,40,2,10);});
  SPR.shadow=bake(g=>{g.fillStyle='#141210';g.beginPath();g.ellipse(32,61,28,3,0,0,7);g.fill();});
  /* ГАРАЖИ sprites: cars (front view), wreck, car on bricks, tyres */
  {const CC=['#a83a2a','#c8b88a','#3a5a8a','#d8d8d0','#4a6a3a'];
   const car=(g,c,hood,lights,wreck)=>{const d=shadeHex(c,.72),l=shadeHex(c,1.2);
     R(g,'#141414',4,58,56,4);
     if(!hood&&!wreck){R(g,'#1a1a1a',7,52,9,8);R(g,'#1a1a1a',48,52,9,8);}
     R(g,c,4,36,56,18);R(g,l,4,36,56,2);R(g,d,4,50,56,4);
     R(g,c,12,22,40,15);R(g,d,12,22,2,15);R(g,d,50,22,2,15);R(g,l,14,22,36,1);
     R(g,wreck?'#2a3036':'#3a4a5a',15,24,34,11);if(!wreck){R(g,'#6a7e90',17,25,8,4);}else{g.strokeStyle='#c8d0d8';g.lineWidth=1;g.beginPath();g.moveTo(22,24);g.lineTo(30,30);g.lineTo(26,35);g.moveTo(30,30);g.lineTo(44,26);g.stroke();}
     R(g,'#8a8a8e',20,42,24,7);for(let x=21;x<44;x+=3)R(g,'#3a3a3e',x,43,1,5);
     for(const x of [7,13,45,51]){R(g,'#d8d8d0',x,41,6,6);R(g,lights?'#fff6c0':'#9a9a92',x+1,42,4,4);}
     R(g,'#b8b8b0',4,50,56,2);R(g,'#e8e2d2',27,51,10,3);R(g,'#1a1a1a',28,52,8,1);
     if(hood){R(g,c,10,14,44,8);R(g,d,10,20,44,2);R(g,'#2a2a2a',14,34,36,3);for(const x of [8,48]){R(g,'#a83a2a',x,54,9,5);R(g,'#c85a4a',x,54,9,1);R(g,'#a83a2a',x+1,59,7,3);}}
     if(wreck){R(g,'#1a1614',4,34,20,8);R(g,d,30,38,30,6);R(g,'#141210',8,44,22,8);}};
   SPR.carF=CC.map(c=>bake(g=>car(g,c,false,false,false)));
   SPR.carL=CC.map(c=>bake(g=>car(g,c,false,false,false),g=>{for(const x of [7,13,45,51]){g.fillStyle='#fff8d0';g.fillRect(x,41,6,6);}g.fillStyle='rgba(255,240,180,.55)';g.fillRect(4,40,56,8);}));
   SPR.carP=bake(g=>car(g,CC[1],true,false,false));
   SPR.carP2=bake(g=>car(g,CC[2],true,false,false));
   SPR.carW=bake(g=>car(g,'#4a3a34',false,false,true),g=>{g.fillStyle='#ff7a20';g.fillRect(10,30,6,6);g.fillStyle='#ffc040';g.fillRect(11,28,3,4);});
   SPR.husks=bake(g=>{const r=rng(641);for(let i=0;i<60;i++){const x=6+((r()*52)|0),y=50+((r()*12)|0);R(g,r()<.6?'#1e1610':'#d8d0b8',x,y,2,1);}});
  SPR.tires=bake(g=>{for(let i=0;i<4;i++){const y=48-i*9;R(g,'#141414',12,y,40,10);R(g,'#2a2a2a',12,y,40,2);R(g,'#0a0a0a',28,y+3,8,4);R(g,'#3a3a3a',14,y+4,10,1);}});}
  /* seed projectile + husk, seed sacks, conveyor, seed pile */
  /* grain-elevator machinery: flywheel (mesh-guard wheel + motor), electric motor, control panel */
  {SPR.flywheel=bake(g=>{R(g,'#3a3632',8,54,48,10);R(g,'#2a2622',8,54,48,2);
     g.fillStyle='#c86a28';g.beginPath();g.arc(38,36,20,0,7);g.fill();g.fillStyle='#a8541c';g.beginPath();g.arc(38,36,20,Math.PI*.9,Math.PI*1.6);g.lineTo(38,36);g.fill();
     g.strokeStyle='#5a3414';g.lineWidth=1;for(let a=0;a<6.28;a+=.32){g.beginPath();g.moveTo(38,36);g.lineTo(38+Math.cos(a)*19,36+Math.sin(a)*19);g.stroke();}
     g.strokeStyle='#e0a050';g.beginPath();g.arc(38,36,20,0,7);g.stroke();g.fillStyle='#1a1614';g.beginPath();g.arc(38,36,5,0,7);g.fill();
     R(g,'#8a6a2a',6,30,16,14);R(g,'#6a4a1a',6,30,16,2);R(g,'#2a2a2e',9,34,3,6);R(g,'#1a1a1a',4,40,20,4);});
   SPR.motor=bake(g=>{R(g,'#2a2a2e',14,52,36,12);R(g,'#1a1a1e',14,52,36,2);R(g,'#5a6a7a',18,34,28,20);R(g,'#6a7a8a',18,34,28,3);R(g,'#3a4654',18,51,28,3);
     for(let x=20;x<44;x+=4)R(g,'#44525e',x,37,2,14);R(g,'#2a2a2e',28,30,8,6);R(g,'#8a3020',30,32,4,3);R(g,'#1a1a1a',10,46,6,10);R(g,'#1a1a1a',46,46,6,10);});
   SPR.panel=bake(g=>{R(g,'#3a4a3e',16,20,32,40);R(g,'#4a5a4e',16,20,32,3);R(g,'#2a362e',16,57,32,3);R(g,'#2a362e',16,20,2,40);
     for(const [x,y,c] of [[22,28,'#c02020'],[30,28,'#e0b020'],[38,28,'#20a040']]){g.fillStyle=c;g.beginPath();g.arc(x,y,3,0,7);g.fill();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(x-1,y-1,1,0,7);g.fill();}
     for(let i=0;i<3;i++)R(g,'#1a1a1a',22+i*8,38,5,8);R(g,'#8a8a8a',24,40,1,4);R(g,'#8a8a8a',34,42,1,4);R(g,'#2a2a2a',20,50,24,5);});}
  SPR.hlamp=bake(g=>{R(g,'#2a2a2e',31,0,2,20);R(g,'#4a4a4e',28,18,8,3);
     g.fillStyle='#3a3a3e';g.beginPath();g.moveTo(16,22);g.lineTo(48,22);g.lineTo(42,34);g.lineTo(22,34);g.closePath();g.fill();
     g.fillStyle='#55555a';g.beginPath();g.moveTo(16,22);g.lineTo(48,22);g.lineTo(46,25);g.lineTo(18,25);g.closePath();g.fill();
     R(g,'#1a1a1e',22,34,20,2);for(let x=24;x<42;x+=4)R(g,'#2a2a2e',x,34,1,4);},
     g=>{g.fillStyle='#ffe8a0';g.beginPath();g.ellipse(32,34,8,5,0,0,7);g.fill();g.fillStyle='#fff6d8';g.beginPath();g.arc(32,33,3,0,7);g.fill();});
  SPR.sunhead=bake(g=>{g.fillStyle='#e8c020';for(let a=0;a<6.28;a+=.4){g.save();g.translate(32,32);g.rotate(a);g.beginPath();g.ellipse(0,-18,5,10,0,0,7);g.fill();g.restore();}g.fillStyle='#caa21a';g.beginPath();g.arc(32,32,13,0,7);g.fill();g.fillStyle='#4a3414';g.beginPath();g.arc(32,32,11,0,7);g.fill();g.fillStyle='#2a1e0c';for(let i=0;i<26;i++){const a=i*2.4,r=1+i*.4;g.fillRect(32+Math.cos(a)*r|0,32+Math.sin(a)*r|0,2,2);}});
  /* round grain silo (cylinder + cone hopper + legs), ladders, cabinet, I-beam, valve wheel, duct run */
  {const cyl=(g,x0,x1,y0,y1,base)=>{for(let x=x0;x<=x1;x++){const k=(x-x0)/(x1-x0),sh=.42+.95*Math.sin(k*Math.PI),c=[base[0]*sh,base[1]*sh,base[2]*sh].map(v=>Math.max(0,Math.min(255,v|0)));g.fillStyle='rgb('+c+')';g.fillRect(x,y0,1,y1-y0);}};
   SPR.silo=bake(g=>{const bc=[176,170,156];
     cyl(g,16,48,8,50,bc);                       // body
     for(let y=12;y<50;y+=8){g.fillStyle='rgba(50,46,38,.6)';g.fillRect(16,y,32,1);}      // seam bands
     for(let y=10;y<50;y+=8)for(let x=19;x<48;x+=7){g.fillStyle='rgba(30,26,20,.5)';g.fillRect(x,y,1,1);}// rivets
     g.fillStyle='#b4ae9c';g.beginPath();g.moveTo(16,8);g.quadraticCurveTo(32,0,48,8);g.lineTo(48,10);g.lineTo(16,10);g.fill(); // dome top
     g.fillStyle='#8a8578';g.beginPath();g.moveTo(16,50);g.lineTo(48,50);g.lineTo(37,62);g.lineTo(27,62);g.fill();              // cone hopper
     g.fillStyle='#6a665a';g.fillRect(29,62,6,2);
     for(const lx of [16,48]){g.fillStyle='#3a362e';g.fillRect(lx-1,50,2,13);}             // legs
     g.fillStyle='rgba(255,240,200,.3)';g.fillRect(22,9,3,41);                              // highlight
     g.fillStyle='#4a4640';g.fillRect(45,16,3,30);g.fillStyle='#6a665e';for(let y=18;y<46;y+=4)g.fillRect(44,y,5,1);}); // side ladder
   SPR.ladder=bake(g=>{g.clearRect(0,0,64,64);R(g,'#5a5a5e',24,2,3,60);R(g,'#5a5a5e',37,2,3,60);R(g,'#7a7a7e',24,2,1,60);for(let y=6;y<62;y+=6)R(g,'#6a6a6e',24,y,16,2);});
   SPR.cabinet=bake(g=>{R(g,'#3a4a56',14,18,36,44);R(g,'#4a5a66',14,18,36,3);R(g,'#2a363e',14,58,36,4);R(g,'#2a363e',31,20,2,40);
     for(const [x,y,c] of [[20,26,'#c02020'],[27,26,'#e0b020'],[38,26,'#20a040'],[44,26,'#2060c0']]){g.fillStyle=c;g.beginPath();g.arc(x,y,2,0,7);g.fill();}
     R(g,'#1a1a1a',18,34,12,16);R(g,'#2a2a2a',20,36,8,12);R(g,'#1a1a1a',36,34,10,16);R(g,'#8a8a8a',22,44,1,4);R(g,'#8a8a8a',39,42,1,6);});
   SPR.ibeam=bake(g=>{R(g,'#6a6056',26,0,12,64);R(g,'#7a7066',22,0,20,4);R(g,'#7a7066',22,60,20,4);R(g,'#565049',28,4,2,56);R(g,'#8a8076',28,0,2,64);
     for(let y=8;y<60;y+=14){R(g,'#2a2620',29,y,6,2);R(g,'#1a1612',30,y,1,2);}});
   SPR.valve=bake(g=>{R(g,'#5a5a5e',28,30,8,34);R(g,'#6a6a6e',28,30,8,2);g.strokeStyle='#b02020';g.lineWidth=3;g.beginPath();g.arc(32,22,14,0,7);g.stroke();
     g.strokeStyle='#d03030';for(let a=0;a<6.28;a+=1.57){g.beginPath();g.moveTo(32,22);g.lineTo(32+Math.cos(a)*14,22+Math.sin(a)*14);g.stroke();}g.fillStyle='#3a3a3e';g.beginPath();g.arc(32,22,4,0,7);g.fill();});
   SPR.duct=bake(g=>{for(let x=0;x<64;x++){const k=Math.abs(x-32)/32,sh=1-k*k*.6,c=[150*sh,146*sh,136*sh].map(v=>v|0);g.fillStyle='rgb('+c+')';g.fillRect(x,18,1,28);}
     for(let x=4;x<64;x+=12)R(g,'rgba(40,36,30,.6)',x,18,3,28);R(g,'#3a362e',0,18,64,2);R(g,'#2a2620',0,44,64,2);
     R(g,'#4a463e',28,44,8,18);R(g,'#2a2620',28,60,8,3);});}
  {SPR.seed=bake(g=>{g.save();g.translate(32,32);g.rotate(.4);R(g,'#2a2012',-4,-7,8,14);R(g,'#1a140a',-4,-7,3,14);R(g,'#4a3a22',-1,-6,2,10);R(g,'#d8cba8',-3,-7,2,2);g.restore();});
   SPR.sack=bake(g=>{const r=rng(670);R(g,'#b8a878',14,24,36,40);R(g,'#c8b888',14,24,36,3);R(g,'#9a8a5a',14,60,36,4);R(g,'#8a7a4a',14,24,3,40);R(g,'#d0c098',44,26,4,34);
     R(g,'#7a6a3a',22,18,20,8);R(g,'#5a4a28',24,16,16,4);R(g,'#3a2c14',27,14,10,3);
     g.fillStyle='#5a4a28';g.font='bold 7px monospace';g.fillText('СЕМЯ',18,46);for(let i=0;i<10;i++)R(g,'#3a2c16',20+((r()*28)|0),54+((r()*8)|0),2,1);});
   SPR.seedpile=bake(g=>{const r=rng(671);g.fillStyle='#4a3818';g.beginPath();g.ellipse(32,54,26,10,0,0,7);g.fill();g.fillStyle='#5a4420';g.beginPath();g.ellipse(32,50,22,10,0,0,7);g.fill();
     for(let i=0;i<120;i++){const a=r()*6.3,rad=r()*22;R(g,r()<.5?'#2a2012':'#6a4a22',32+Math.cos(a)*rad|0,50+Math.sin(a)*rad*.4|0,2,1);}});
   SPR.conveyor=bake(g=>{R(g,'#3a3a3e',4,40,56,16);R(g,'#2a2a2e',4,40,56,3);R(g,'#1a1a1e',4,53,56,3);for(let x=6;x<60;x+=6)R(g,'#4a4a4e',x,43,3,8);
     R(g,'#5a5a5e',2,38,6,24);R(g,'#5a5a5e',56,38,6,24);for(let i=0;i<14;i++)R(g,'#3a2c16',8+((i*53)%50),44+((i*7)%8),2,1);});}
  SPR.pipes=bake(g=>{const lay=[[2,62,44,18],[8,56,27,18],[15,49,10,18]];
    for(const [x0,x1,y0,h] of lay){for(let k=0;k<h;k++){const v=k/(h-1),sh=.5+.75*Math.max(0,Math.cos((v-.3)*Math.PI*.95)),c=[146*sh,141*sh,132*sh].map(q=>Math.max(0,Math.min(255,q|0)));g.fillStyle='rgb('+c+')';g.fillRect(x0,y0+k,x1-x0,1);}
      const bh=h+2;for(let k=0;k<bh;k++){const v=k/(bh-1),sh=.5+.75*Math.max(0,Math.cos((v-.3)*Math.PI*.95)),c=[156*sh,150*sh,140*sh].map(q=>Math.max(0,Math.min(255,q|0)));g.fillStyle='rgb('+c+')';g.fillRect(x1-7,y0-1+k,7,1);}
      g.fillStyle='rgba(40,36,32,.6)';g.fillRect(x1-8,y0,1,h);g.fillRect(x0,y0+h-2,x1-x0,2);
      g.fillStyle='rgba(90,80,70,.35)';for(let q=0;q<5;q++)g.fillRect(x0+4+((q*13+y0*7)%(x1-x0-12)),y0+5+(q%3)*3,3,1);}
    g.fillStyle='#6a4a2a';g.fillRect(6,61,6,3);g.fillRect(52,61,6,3);g.fillStyle='#4a3218';g.fillRect(6,63,6,1);g.fillRect(52,63,6,1);});
  SPR.beacon=bake(g=>{g.fillStyle='#2a2a2a';g.fillRect(29,50,6,14);g.fillStyle='#4a4a4a';g.fillRect(26,48,12,3);},g=>{g.fillStyle='#ff2a18';g.beginPath();g.arc(32,40,9,0,7);g.fill();g.fillStyle='#ffd8a0';g.beginPath();g.arc(32,39,3,0,7);g.fill();});
  SPR.slab=bake(g=>{R(g,'#9a968e',4,30,56,20);R(g,'#b0aca4',4,30,56,3);R(g,'#7a766e',4,47,56,3);R(g,'#6a4a3a',12,28,2,4);R(g,'#6a4a3a',50,28,2,4);R(g,'#3a3a3a',30,0,2,30);});
  SPR.bottleP=bake(g=>{g.save();g.translate(32,32);g.rotate(.9);R(g,'#2c5a33',-3,-8,6,13);R(g,'#5d9a68',-2,-6,1,9);R(g,'#2c5a33',-2,-12,4,5);g.restore();});
  SPR.brickP=bake(g=>{g.save();g.translate(32,32);g.rotate(.5);R(g,'#a83a2a',-7,-4,14,8);R(g,'#c85a4a',-7,-4,14,2);g.restore();});
  SPR.pellet=bake(()=>{},g=>{R(g,'#ffe070',30,30,4,4);R(g,'#fff8d0',31,31,2,2);});
  SPR.tracer=bake(()=>{},g=>{R(g,'#ffd040',24,30,16,4);R(g,'#fff8e0',28,31,8,2);});
  SPR.boom=[0,1].map(f=>bake(()=>{},g=>{const cs=f?['#ff4a10','#ffa020','#fff0a0']:['#e02a08','#ff8a18','#ffe080'];for(let i=0;i<3;i++){g.fillStyle=cs[i];g.beginPath();g.arc(32+(f?3:-3)*(2-i),40-i*4,22-i*7,0,7);g.fill();}}));
}

/* ---------- МЕТРО: textures & sprites ---------- */
function metroTextures(){
  const redM=(g,x,y,s)=>{g.fillStyle='#d82020';g.font='bold '+s+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('М',x,y);};
  TX.metroIn=bake(g=>{R(g,'#8a8378',0,0,64,64);R(g,'#6a645a',0,0,64,3);R(g,'#1a1a1c',8,12,48,52);for(let i=0;i<8;i++){R(g,'#3a3a3e',10+i,30+i*4,44-i*2,2);R(g,'#58585c',10+i,30+i*4,44-i*2,1);}R(g,'#e8e0c8',16,3,32,8);R(g,'#a09a8a',8,12,3,52);R(g,'#a09a8a',53,12,3,52);},
    g=>{redM(g,32,7.5,9);R(g,'#ffe8a0',22,14,20,2);});
  TX.tcarOut=bake(g=>{R(g,'#3a5a8a',0,0,64,64);R(g,'#4a6a9a',0,0,64,3);R(g,'#2a3a5a',0,58,64,6);R(g,'#c02020',0,44,64,4);R(g,'#1a2030',4,10,24,26);R(g,'#1a2030',36,10,24,26);R(g,'#8a9aaa',4,10,24,1);R(g,'#8a9aaa',36,10,24,1);},
    g=>{R(g,'#e8e4c8',6,12,20,22);R(g,'#e8e4c8',38,12,20,22);R(g,'#c8c4a8',6,26,20,8);R(g,'#c8c4a8',38,26,20,8);});
  const panel=(g)=>{R(g,'#c8c0a8',0,0,64,64);R(g,'#d8d0b8',0,0,64,2);R(g,'#a89e86',0,40,64,2);R(g,'#8a8270',0,60,64,4);R(g,'#b0a890',0,44,64,14);};
  TX.twin=[0,1,2,3].map(f=>bake(g=>{panel(g);R(g,'#08080a',4,8,56,28);R(g,'#5a5448',4,8,56,1);R(g,'#5a5448',4,35,56,1);R(g,'#5a5448',31,8,2,28);
      for(let i=0;i<5;i++){const x=((i*23+f*16)%72)-8;R(g,'#2a2a30',x,20,14,2);}R(g,'#3a3a44',0,30,64,1);},
    g=>{for(let i=0;i<3;i++){const x=((i*29+f*16)%72)-8;R(g,'#ffe8b0',x,15,10,1);R(g,'#c8b070',x+10,15,6,1);}}));
  TX.twinStop=bake(g=>{panel(g);R(g,'#b8b4a8',4,8,56,28);for(let x=8;x<60;x+=14)R(g,'#e8e4dc',x,8,5,28);R(g,'#5a5448',4,8,56,1);R(g,'#5a5448',31,8,2,28);},g=>{R(g,'#fff4d0',14,10,4,2);R(g,'#fff4d0',42,10,4,2);});
  TX.twinGhost=bake(g=>{panel(g);R(g,'#1a2a20',4,8,56,28);for(let x=8;x<60;x+=14)R(g,'#2a3a30',x,8,5,28);R(g,'#5a5448',4,8,56,1);R(g,'#5a5448',31,8,2,28);},g=>{R(g,'#6aa06a',20,11,3,2);});
  TX.tend=bake(g=>{panel(g);R(g,'#e8e0c8',14,10,36,24);R(g,'#c02020',18,20,28,2);R(g,'#2a5aa0',18,26,28,2);for(let x=19;x<46;x+=6){R(g,'#1a1a1a',x,19,2,4);R(g,'#1a1a1a',x+3,25,2,4);}g.fillStyle='#1a1a1a';g.font='bold 5px sans-serif';g.textAlign='center';g.fillText('СХЕМА ЛИНИЙ',32,15);});
  TX.tdoor=bake(g=>{R(g,'#a8a090',0,0,64,64);R(g,'#8a8270',31,0,2,64);for(const x of [6,36]){R(g,'#08080a',x,8,22,26);R(g,'#5a5448',x,8,22,1);}R(g,'#e8e0c8',8,40,48,8);g.fillStyle='#8a1a1a';g.font='bold 5px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('НЕ ПРИСЛОНЯТЬСЯ',32,44);R(g,'#2a2a2a',0,60,64,4);});
  TX.tgdoor=bake(g=>{R(g,'#8a8270',0,0,64,64);R(g,'#a8a090',14,2,36,62);R(g,'#08080a',20,8,24,20);R(g,'#5a5448',20,8,24,1);R(g,'#c0c0b8',42,34,4,8);g.fillStyle='#8a1a1a';g.font='bold 5px sans-serif';g.textAlign='center';g.fillText('ПЕРЕХОД',32,48);g.fillText('ЗАПРЕЩЁН',32,54);});
  TX.marble=bake(g=>{const r=rng(430);R(g,'#e8e4dc',0,0,64,64);for(let i=0;i<9;i++){g.strokeStyle='rgba(150,140,130,.35)';g.lineWidth=1;g.beginPath();let x=r()*64,y=0;g.moveTo(x,y);while(y<64){x+=(r()-.5)*10;y+=6+r()*6;g.lineTo(x,y);}g.stroke();}R(g,'#c9a54a',0,56,64,3);R(g,'#8a6a2a',0,59,64,5);R(g,'#c9a54a',0,2,64,2);});
  TX.mosaic=bake(g=>{R(g,'#e8e4dc',0,0,64,64);R(g,'#2a4a8a',4,4,56,56);R(g,'#c9a54a',4,4,56,2);R(g,'#c9a54a',4,58,56,2);
    g.fillStyle='#d8b040';g.beginPath();for(let i=0;i<10;i++){const rr=i%2?5:12,an=-Math.PI/2+i*Math.PI/5;g.lineTo(32+Math.cos(an)*rr,22+Math.sin(an)*rr);}g.closePath();g.fill();
    for(let i=0;i<6;i++){R(g,'#d8b040',14+i,40-i*3,2,6);R(g,'#d8b040',48-i,40-i*3,2,6);}R(g,'#c02020',24,46,16,6);});
  TX.eswall=bake(g=>{R(g,'#c8c0a8',0,0,64,64);R(g,'#8a6a2a',0,54,64,10);R(g,'#c9a54a',0,54,64,2);R(g,'#8a6a2a',30,14,4,40);R(g,'#c9a54a',26,6,12,10);},g=>{R(g,'#fff4c8',28,8,8,6);});
  TX.mfloor=bake(g=>{R(g,'#8a8680',0,0,64,64);R(g,'#7a3a32',0,0,32,32);R(g,'#7a3a32',32,32,32,32);R(g,'#6a6660',0,31,64,2);R(g,'#6a6660',31,0,2,64);});
  TX.escal=bake(g=>{R(g,'#5a5a5e',0,0,64,64);for(let y=0;y<64;y+=8){R(g,'#3a3a3e',0,y,64,2);R(g,'#d8b040',0,y+2,64,1);}for(let x=0;x<64;x+=4)R(g,'#4a4a4e',x,0,1,64);});
  TX.tfloor=bake(g=>{R(g,'#3a3a3e',0,0,64,64);for(let y=0;y<64;y+=6)R(g,'#2e2e32',0,y,64,2);R(g,'#4a4a4e',0,0,64,1);});
  TX.mceil=bake(g=>{R(g,'#e8e0d0',0,0,64,64);R(g,'#d0c8b8',0,30,64,4);R(g,'#d0c8b8',30,0,4,64);R(g,'#c9a54a',28,28,8,8);});
  TX.tceil=bake(g=>{R(g,'#d8d0b8',0,0,64,64);R(g,'#b8b098',0,0,64,4);R(g,'#b8b098',0,60,64,4);},g=>{R(g,'#fffff0',26,0,12,64);});
  TX.eceil=bake(g=>{R(g,'#d0c8b8',0,0,64,64);for(let y=0;y<64;y+=16)R(g,'#b8b098',0,y,64,3);});
  TX.rawc=bake(g=>{R(g,'#a8a49c',0,0,64,64);R(g,'#b4b0a8',0,0,64,31);for(let y=15;y<64;y+=16)R(g,'#8a867e',0,y,64,1);for(let x=0;x<64;x+=21)R(g,'#8a867e',x,0,1,64);R(g,'#7a766e',40,20,2,2);R(g,'#7a766e',12,44,2,2);R(g,'#6a5a4a',50,50,6,9);});
  TX.rawf=bake(g=>{R(g,'#8a8680',0,0,64,64);R(g,'#94908a',0,0,32,32);R(g,'#94908a',32,32,32,32);R(g,'#6a6660',8,40,14,2);});
  TX.fence=bake(g=>{R(g,'#2a5a8a',0,0,64,64);for(let x=0;x<64;x+=4)R(g,'#3a6a9a',x,0,2,64);R(g,'#1a3a5a',0,0,64,2);R(g,'#1a3a5a',0,62,64,2);R(g,'#6a6a6a',0,0,2,64);
    R(g,'#e8e0c8',6,12,52,26);R(g,'#c02020',6,12,52,6);g.fillStyle='#f4f0e0';g.font='bold 5px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('СТРОЙКА',32,15);g.fillStyle='#1a1a1a';g.fillText('ВХОД',32,25);g.fillText('ВОСПРЕЩЁН',32,32);
    for(let x=0;x<64;x+=8){R(g,'#d8b020',x,48,4,6);R(g,'#1a1a1a',x+4,48,4,6);}});
  TX.cabDoor=bake(g=>{R(g,'#3a5a8a',0,0,64,64);R(g,'#4a6a9a',10,4,44,60);R(g,'#08080a',18,10,28,18);R(g,'#c0c0b8',46,34,4,8);R(g,'#e8e0c8',14,40,36,10);g.fillStyle='#8a1a1a';g.font='bold 5px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('КАБИНА',32,43);g.fillText('МАШИНИСТА',32,48);});
}
function metroArt(){
  SPR.kassa=bake(g=>{R(g,'#7a5a36',8,28,48,34);R(g,'#8e6c44',8,28,48,2);R(g,'rgba(180,210,220,.7)',12,10,40,18);R(g,'#5a4026',8,8,48,3);R(g,'#e8e0c8',16,34,32,8);g.fillStyle='#1a1a1a';g.font='bold 7px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('КАССА',32,38);drawWoman(g,{dress:'#3a5a8a',skin:'#d0a080',hair:'#8a5a3a'},.45,18,5);});
  SPR.turnstile=bake(g=>{R(g,'#8a8a86',20,26,24,36);R(g,'#b0b0aa',20,26,24,3);R(g,'#3a3a3a',24,34,16,8);R(g,'#c0c0c0',44,36,14,3);R(g,'#c0c0c0',44,42,14,3);},g=>{R(g,'#40ff60',28,30,3,3);});
  SPR.msign=bake(g=>{R(g,'#5a5a5e',30,20,4,44);R(g,'#e8e0c8',16,2,32,20);R(g,'#c8c0a8',16,20,32,2);},g=>{g.fillStyle='#e02020';g.font='bold 18px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('М',32,12);});
  SPR.tseat=bake(g=>{R(g,'#2a4a8a',6,40,52,10);R(g,'#3a5a9a',6,40,52,2);R(g,'#2a4a8a',6,26,52,14);R(g,'#1a3a6a',6,38,52,2);R(g,'#8a8a86',8,50,3,12);R(g,'#8a8a86',53,50,3,12);});
  SPR.tpole=bake(g=>{R(g,'#c8c8c4',30,0,4,64);R(g,'#f0f0ec',30,0,1,64);R(g,'#8a8a86',33,0,1,64);});
  SPR.ticket=bake(g=>{g.save();g.translate(32,32);g.rotate(.4);R(g,'#e8e0a8',-7,-4,14,8);R(g,'#c02020',-7,-4,14,2);R(g,'#1a1a1a',-4,0,8,1);g.restore();});
}

/* ---------- ГОРОД: textures and sprites ---------- */
function tSign(g,r,board,word,word2,win){R(g,'#8a8378',0,0,64,64);R(g,board,0,2,64,20);R(g,shadeHex(board,1.25),0,2,64,1);R(g,shadeHex(board,.7),0,21,64,1);
  g.fillStyle='#f4f0e0';g.textAlign='center';g.textBaseline='middle';g.font='bold '+(word2?8:(word.length>6?8:12))+'px sans-serif';if(word2){g.fillText(word,32,8);g.fillText(word2,32,17);}else g.fillText(word,32,12);
  R(g,'#3a3f44',3,25,58,31);R(g,'#5a6a74',4,26,56,29);win(g);R(g,'rgba(210,230,240,.28)',8,26,6,29);R(g,'rgba(210,230,240,.18)',18,26,3,29);R(g,'#6a645a',0,56,64,8);R(g,'#58524a',0,56,64,1);}
function cityTextures(){
  TX.sign=[
    bake(g=>tSign(g,rng(401),'#2a5aa0','ГАСТРОНОМ',null,g=>{for(let y=30;y<52;y+=7){R(g,'#8a6a3a',6,y+5,52,1);for(let x=8;x<56;x+=5)R(g,['#c02020','#d8c040','#e8e0d0','#3a8a3a'][(x+y)%4],x,y,4,5);}})),
    bake(g=>tSign(g,rng(402),'#b8802a','ХЛЕБ',null,g=>{for(let y=32;y<52;y+=9)for(let x=8;x<54;x+=11){g.fillStyle='#b8782e';g.beginPath();g.ellipse(x+4,y+3,5,3,0,0,7);g.fill();R(g,'#d8a050',x+1,y+1,5,1);}})),
    bake(g=>tSign(g,rng(403),'#2a8a5a','АПТЕКА',null,g=>{R(g,'#e8e8e0',24,30,16,16);R(g,'#c02020',30,32,4,12);R(g,'#c02020',26,36,12,4);for(let x=8;x<20;x+=4)R(g,'#8ab0c0',x,44,3,8);for(let x=44;x<58;x+=4)R(g,'#c0a060',x,44,3,8);})),
    bake(g=>tSign(g,rng(404),'#6a3a2a','РЕМОНТ','ОБУВИ',g=>{for(let x=8;x<56;x+=12){R(g,'#2a1a10',x,40,8,12);R(g,'#2a1a10',x,50,11,3);R(g,'#4a3020',x+1,41,2,9);}})),
    bake(g=>tSign(g,rng(405),'#e8e8e0','МОЛОКО',null,g=>{for(let x=8;x<56;x+=7){R(g,'#f0f0ea',x,36,5,14);R(g,'#2a5aa0',x,40,5,4);}}))];
  TX.deco=[
    ['#3a7a2a','ОВОЩИ',null,g=>{for(let x=6;x<58;x+=10){R(g,'#8a6a3a',x,40,9,12);for(let i=0;i<4;i++){g.fillStyle=['#e07a20','#c02020','#3a8a2a','#e8c040'][(x+i)%4];g.beginPath();g.arc(x+2+(i%2)*4,40-(i>>1)*3,2.2,0,7);g.fill();}}}],
    ['#2a5aa0','МОЛОКО',null,g=>{for(let x=7;x<57;x+=6){R(g,'#f4f4ee',x,34,5,16);R(g,'#2a5aa0',x,40,5,4);R(g,'#d8d8d0',x+1,31,3,3);}}],
    ['#c04a7a','ПАРИК-','МАХЕРСКАЯ',g=>{R(g,'#c8d8e0',10,28,16,20);R(g,'#8a3a3a',36,38,14,6);R(g,'#5a3a2a',40,44,3,10);R(g,'#3a2a20',38,30,8,7);R(g,'#d8a888',39,31,6,5);}],
    ['#1a2a5a','ЧАСЫ',null,g=>{for(let i=0;i<4;i++){const x=12+i*13,y=36+(i%2)*6;g.fillStyle='#e8e0c8';g.beginPath();g.arc(x,y,5,0,7);g.fill();R(g,'#1a1a1a',x,y-4,1,4);R(g,'#1a1a1a',x,y,3,1);}}],
    ['#6a3a1a','ОБУВЬ',null,g=>{for(let x=8;x<56;x+=10){R(g,['#2a1a10','#8a2a2a','#c8a060'][x%3],x,44,8,6);R(g,['#2a1a10','#8a2a2a','#c8a060'][x%3],x,38,4,6);R(g,'#8a6a3a',x-1,50,11,1);}}],
    ['#5a2a7a','ТКАНИ',null,g=>{for(let x=6;x<58;x+=8)R(g,['#c02020','#3a6ac0','#e8c040','#3a8a3a','#c060a0','#e8e0d0'][(x>>3)%6],x,30,6,24);}],
    ['#e07a20','ИГРУШКИ',null,g=>{g.fillStyle='#8a5a2a';g.beginPath();g.arc(20,42,7,0,7);g.fill();g.beginPath();g.arc(20,32,5,0,7);g.fill();R(g,'#8a5a2a',14,27,3,3);R(g,'#8a5a2a',23,27,3,3);R(g,'#c02020',34,36,10,14);R(g,'#e8c040',46,40,8,10);R(g,'#3a6ac0',36,30,6,6);}],
    ['#7a1a1a','КНИГИ',null,g=>{for(let y=32;y<52;y+=10)for(let x=6;x<58;x+=4)R(g,['#2a4a8a','#8a2a2a','#3a6a3a','#c8a040','#5a3a6a'][((x*3+y)>>2)%5],x,y,3,8);}],
    ['#2a8a8a','СОКИ-ВОДЫ',null,g=>{for(let x=8;x<56;x+=8){R(g,'#d8e0e0',x,32,6,18);R(g,['#e8a030','#c02030','#e8d040','#7ac040'][(x>>3)%4],x+1,38,4,11);}}],
    ['#3a8a4a','ЦВЕТЫ',null,g=>{for(let x=8;x<56;x+=9){R(g,'#3a6a2a',x+3,38,2,12);R(g,'#6a4a2a',x,48,8,5);g.fillStyle=['#e02040','#f0e040','#e060c0','#ffffff'][(x/9|0)%4];g.beginPath();g.arc(x+4,35,4,0,7);g.fill();}}],
    ['#b8602a','КУЛИНАРИЯ',null,g=>{for(let y=34;y<52;y+=9)for(let x=8;x<54;x+=11){g.fillStyle='#c8883a';g.beginPath();g.ellipse(x+4,y+3,5,3,0,0,7);g.fill();R(g,'#e8b060',x+1,y+1,5,1);}}],
    ['#1a1a1a','ФОТО',null,g=>{for(let i=0;i<5;i++){const x=6+i*11,y=32+(i%2)*8;R(g,'#e8e0c8',x,y,9,11);R(g,['#8a7a6a','#6a6a7a','#9a8a6a'][i%3],x+1,y+1,7,9);}}]
  ].map((d,i)=>bake(g=>tSign(g,rng(420+i),d[0],d[1],d[2],d[3])));
  TX.shopIn=bake(g=>{R(g,'#8a8070',0,0,64,64);R(g,'#6a6458',0,0,64,4);R(g,'#b8d8e8',4,8,56,44);R(g,'#d8ecf4',8,12,20,36);R(g,'#4a4640',30,8,4,44);R(g,'#6a6458',0,52,64,12);R(g,'#5a5448',0,52,64,1);},g=>{R(g,'#cfe6f2',6,10,22,40);R(g,'#bcd8e8',36,10,22,40);});
  TX.shelf=bake(g=>{R(g,'#8a8070',0,0,64,64);for(let y=6;y<60;y+=13){R(g,'#6a4a2a',0,y+9,64,3);for(let x=2;x<62;x+=6)R(g,['#c02020','#d8c040','#e8e0d0','#3a8a3a','#8a5a2a','#2a5aa0'][((x*7+y)>>2)%6],x,y,5,9);}});
  TX.glassDoor=bake(g=>{R(g,'#4a4640',0,0,64,64);R(g,'#6a8a96',6,4,52,56);R(g,'#8aaab4',8,6,22,52);R(g,'#8aaab4',34,6,22,52);R(g,'#4a4640',30,4,4,56);R(g,'#c0c0b8',24,30,4,6);R(g,'#c0c0b8',36,30,4,6);R(g,'rgba(255,255,255,.35)',12,8,3,48);R(g,'#e8e0c0',16,40,32,8);g.fillStyle='#a02020';g.font='bold 6px sans-serif';g.textAlign='center';g.fillText('ОТКРЫТО',32,46);});
  TX.bdoor=bake(g=>{R(g,'#4a4a48',0,0,64,64);R(g,'#5a5e5a',8,4,48,60);R(g,'#6a6e6a',8,4,48,2);R(g,'#2a2c2a',24,20,16,4);R(g,'#8a3a2a',44,34,4,6);R(g,'#3a3c3a',12,50,40,1);for(let i=0;i<30;i++)R(g,'#6a4a3a',10+((i*17)%44),8+((i*29)%50),2,1);g.fillStyle='#c8c0a0';g.font='bold 7px sans-serif';g.textAlign='center';g.fillText('НЕ СТУЧАТЬ',32,15);});
  TX.grass=bake(g=>{R(g,'#4a7a32',0,0,64,64);R(g,'#4e7e36',0,0,32,32);R(g,'#4e7e36',32,32,32,32);});
  TX.rails=bake(g=>{R(g,'#4c4d52',0,0,64,64);R(g,'#5a4a3a',0,8,64,6);R(g,'#5a4a3a',0,40,64,6);R(g,'#8a8a8e',0,20,64,3);R(g,'#8a8a8e',0,52,64,3);R(g,'#b8b8bc',0,20,64,1);R(g,'#b8b8bc',0,52,64,1);});
  TX.fwater=bake(g=>{R(g,'#3a78a8',0,0,64,64);R(g,'#4a88b8',0,0,64,32);R(g,'#6aa8d0',10,14,20,2);R(g,'#6aa8d0',36,44,18,2);});
}
function drawWoman(g,P,sc,ox,oy){g.save();g.translate(ox||0,oy||0);if(sc)g.scale(sc,sc);const SKD=shadeHex(P.skin,.8);
  R(g,'#6a6a6a',25,56,5,7);R(g,'#6a6a6a',34,56,5,7);R(g,'#2a2a2a',24,62,7,2);R(g,'#2a2a2a',33,62,7,2);
  poly(g,P.dress,[[22,26],[42,26],[46,57],[18,57]]);if(P.apron)R(g,P.apron,24,32,16,24);
  R(g,P.dress,16,27,6,17);R(g,P.dress,42,27,6,17);R(g,P.skin,16,43,6,4);R(g,P.skin,42,43,6,4);
  R(g,P.skin,26,11,12,13);R(g,SKD,36,12,2,12);R(g,'#241a14',28,17,2,1);R(g,'#241a14',33,17,2,1);R(g,'#a04a4a',30,21,4,1);
  R(g,P.hair,25,8,14,5);R(g,P.hair,25,8,2,10);R(g,P.hair,37,8,2,10);R(g,P.hair,29,4,6,5);
  if(P.cap){R(g,'#f4f4ee',25,5,14,5);R(g,'#dadad2',25,9,14,1);}
  if(P.bag){R(g,P.bag,44,44,8,9);R(g,shadeHex(P.bag,.7),45,41,6,3);}
  g.restore();}
function cityArt(){
  const W1={dress:'#f0f0ea',apron:'#e0e0d8',skin:'#d8a888',hair:'#8a5a3a',cap:1},W2={dress:'#f0f0ea',skin:'#d0a080',hair:'#3a2a20',cap:1},
        W3={dress:'#a83a4a',skin:'#d8a888',hair:'#c8a060',bag:'#6a4a2a'},W4={dress:'#3a6a9a',skin:'#d0a080',hair:'#2a1a10'},W5={dress:'#6a8a4a',apron:'#e8e0c8',skin:'#c89878',hair:'#6a6060'};
  SPR.Wseller=bake(g=>drawWoman(g,W1));SPR.Wpharm=bake(g=>drawWoman(g,W2));SPR.Wciv1=bake(g=>drawWoman(g,W3));SPR.Wciv2=bake(g=>drawWoman(g,W4));SPR.Wqueue=bake(g=>drawWoman(g,W5));
  const civ=(suit,top,hat,hatC,skin,hair,extra)=>Object.assign({suit,top,stripe:suit,skin:skin||'#d0a283',hair:hair||'#5a4535',shoe:'#1a1a1a',hat:hat||'none',hatC:hatC||'#222'},extra||{});
  const PC={man1:civ('#3a3a44','#8a7a5a','cap','#5a5a60'),man2:civ('#2a3a5a','#c8c0a8'),man3:civ('#5a4a3a','#4a5a3a','cap','#2a2a2a','#c89878','#9a9a9a',{stache:1}),
    mil:civ('#3a4a6a','#4a5a7a','cap','#2a3a5a','#d0a283','#4a3a2a'),sapog:civ('#3a3530','#6a4a2a','none','#222','#c89070','#8a8680',{vest:1,stache:1}),
    kid:civ('#2a4a8a','#c03030','knit','#e8d040','#e0b090','#8a5a2a'),chess1:civ('#4a4a50','#6a6a70','cap','#3a3a40','#c89878','#c0c0c0'),chess2:civ('#5a4a3a','#7a6a52','none','#222','#d0a080','#e0e0e0',{stache:1})};
  for(const k of ['man1','man2','man3','mil','sapog'])SPR['C'+k]=bake(g=>drawGop(g,'stand',PC[k]));
  SPR.Ckid=bake(g=>{drawGop(g,'stand',PC.kid);R(g,'#7a1e22',44,44,8,4);R(g,'#4a2a18',44,47,8,2);});
  SPR.Cchess1=bake(g=>drawGop(g,'squat',PC.chess1));SPR.Cchess2=bake(g=>drawGop(g,'squat',PC.chess2));
  for(const k of ['man1','man2','man3'])for(const p of ['walk1','walk2'])SPR['C'+k+p]=bake(g=>drawGop(g,p,PC[k]));
  const stallBase=(g,aw)=>{for(let x=4;x<60;x+=8)R(g,x%16?'#e8e0d0':aw,x,4,8,8);R(g,'#5a4a3a',6,12,2,34);R(g,'#5a4a3a',56,12,2,34);R(g,'#7a5a3a',4,44,56,4);R(g,'#5a4026',6,48,3,14);R(g,'#5a4026',55,48,3,14);};
  SPR.stall1=bake(g=>{stallBase(g,'#c04a7a');R(g,'#3a3a3a',10,14,44,1);for(let x=12;x<52;x+=8){R(g,['#c02020','#3a6ac0','#e8c040','#3a8a3a','#e8e0d0'][(x>>3)%5],x,15,6,16);}drawWoman(g,{dress:'#6a4a8a',skin:'#d0a080',hair:'#3a2a20'},.55,22,26);});
  SPR.stall2=bake(g=>{stallBase(g,'#3a8a3a');for(let x=8;x<56;x+=6){R(g,['#c8a040','#8a2a2a','#e8e0d0'][(x/6|0)%3],x,34,5,9);R(g,'#d8d0b8',x,33,5,2);}drawGop(g,'squat',{suit:'#2a2a30',top:'#5a4a3a',stripe:'#2a2a30',skin:'#c89070',hair:'#1a1a1a',shoe:'#1a1a1a',hat:'cap',hatC:'#3a3a3a',stache:1});});
  SPR.stall3=bake(g=>{stallBase(g,'#e8c040');for(let x=8;x<56;x+=7){R(g,'#3a6a2a',x+2,30,2,12);g.fillStyle=['#e02040','#f0e040','#e060c0','#ffffff'][(x/7|0)%4];g.beginPath();g.arc(x+3,29,3.5,0,7);g.fill();}drawWoman(g,{dress:'#c04040',apron:'#e8e0c8',skin:'#d8a888',hair:'#a06a3a'},.55,24,26);});
  SPR.kvas=bake(g=>{g.fillStyle='#d8a830';g.beginPath();g.ellipse(22,38,20,12,0,0,7);g.fill();R(g,'#b8881a',4,44,36,2);g.fillStyle='#8a1e14';g.font='bold 9px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('КВАС',22,37);
    R(g,'#3a3a3a',8,49,4,8);R(g,'#3a3a3a',32,49,4,8);g.fillStyle='#1a1a1a';g.beginPath();g.arc(22,57,6,0,7);g.fill();R(g,'#8a8a8a',40,40,5,2);R(g,'#8a8a8a',43,40,2,6);drawWoman(g,W5,.62,26,24);});
  SPR.pechat=bake(g=>{R(g,'#2a4a8a',6,10,52,50);R(g,'#3a5aa0',6,10,52,3);R(g,'#1a2a5a',4,6,56,6);g.fillStyle='#f0e8c0';g.font='bold 6px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('СОЮЗПЕЧАТЬ',32,9);
    R(g,'#8aa8b4',10,16,44,26);for(let i=0;i<8;i++)R(g,['#c02020','#e8e0d0','#d8c040','#3a8a3a'][i%4],12+i*5,34,4,7);R(g,'#d0a080',28,20,8,8);R(g,'#8a5a3a',27,18,10,3);R(g,'#241a14',30,23,1,1);R(g,'#241a14',33,23,1,1);R(g,'#1a2a5a',6,44,52,3);R(g,'#1a1a1a',8,60,48,4);});
  SPR.soda=bake(g=>{R(g,'#b82020',18,8,28,54);R(g,'#d84040',18,8,28,2);R(g,'#e8e8e0',20,12,24,10);g.fillStyle='#b82020';g.font='bold 5px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('ГАЗ.',32,15);g.fillText('ВОДА',32,20);
    R(g,'#3a3a3a',24,30,16,14);R(g,'#8ab0c0',29,35,5,7);R(g,'#c8c8c0',40,26,3,4);R(g,'#1a1a1a',18,60,28,4);},g=>{R(g,'#ffe080',40,26,2,2);});
  SPR.fruit=bake(g=>{for(let x=4;x<60;x+=8)R(g,x%16?'#e8e0d0':'#c02020',x,6,8,8);R(g,'#5a4a3a',6,14,2,32);R(g,'#5a4a3a',56,14,2,32);drawWoman(g,W4,.6,20,14);R(g,'#7a5a3a',4,44,56,4);R(g,'#5a4026',6,48,3,14);R(g,'#5a4026',55,48,3,14);
    for(let i=0;i<16;i++){g.fillStyle=i%3?'#c02a20':'#3a8a2a';g.beginPath();g.arc(8+(i%8)*6,41-((i/8)|0)*4,3,0,7);g.fill();}});
  SPR.melon=bake(g=>{for(let i=0;i<9;i++){const x=10+(i%4)*11+((i/4|0)%2)*5,y=58-((i/4)|0)*8;g.fillStyle='#2a6a2a';g.beginPath();g.ellipse(x,y,7,5,0,0,7);g.fill();R(g,'#1a4a1a',x-4,y-1,8,1);R(g,'#1a4a1a',x-3,y+2,6,1);}
    drawGop(g,'squat',{suit:'#3a3a44',top:'#e8e0c8',stripe:'#3a3a44',skin:'#c89070',hair:'#2a1a10',shoe:'#1a1a1a',hat:'cap',hatC:'#2a2a2a',stache:1});});
  SPR.stall=bake(g=>{for(let x=4;x<60;x+=8)R(g,x%16?'#e8e0d0':'#2a5aa0',x,8,8,8);R(g,'#5a4a3a',6,16,2,32);R(g,'#5a4a3a',56,16,2,32);R(g,'#7a5a3a',4,44,56,4);R(g,'#5a4026',6,48,3,14);R(g,'#5a4026',55,48,3,14);R(g,'#8a6a3a',14,38,12,6);R(g,'#8a6a3a',34,38,14,6);});
  SPR.tramstop=bake(g=>{R(g,'#3a4a5a',4,6,56,4);R(g,'#6a8a9a',6,10,2,50);R(g,'#6a8a9a',56,10,2,50);R(g,'rgba(160,190,210,.55)',8,10,48,30);R(g,'#7a5a3a',10,44,44,3);R(g,'#5a4026',12,47,2,13);R(g,'#5a4026',50,47,2,13);
    R(g,'#e8e0c0',44,14,10,10);g.fillStyle='#c02020';g.font='bold 9px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('Т',49,19);});
  SPR.lenin=bake(g=>{R(g,'#8a8a86',16,40,32,24);R(g,'#9a9a96',14,38,36,4);R(g,'#6a6a66',16,62,32,2);R(g,'#b89a5a',18,46,28,10);R(g,'#d8bc7a',18,46,28,1);g.fillStyle='#2a2418';g.font='bold 8px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('ЛЕМИН',32,51.5);
    const B='#3a4038',BL='#4e5648';poly(g,B,[[24,38],[40,38],[38,20],[26,20]]);R(g,BL,26,20,4,18);R(g,B,27,11,10,10);R(g,BL,28,12,3,6);R(g,B,24,20,4,12);poly(g,B,[[38,21],[42,21],[50,6],[47,4]]);R(g,B,46,2,5,4);R(g,B,28,38,3,2);R(g,B,33,38,3,2);});
  SPR.fountain=[0,1].map(f=>bake(g=>{g.fillStyle='#8a8680';g.beginPath();g.ellipse(32,56,30,7,0,0,7);g.fill();g.fillStyle='#4a88b8';g.beginPath();g.ellipse(32,55,26,5,0,0,7);g.fill();R(g,'#a09a92',2,56,60,4);R(g,'#7a766e',2,60,60,2);
    R(g,'#9a968e',29,30,6,26);R(g,'#b0aca4',29,30,2,26);g.fillStyle='#a8a49c';g.beginPath();g.ellipse(32,30,12,4,0,0,7);g.fill();g.fillStyle='#5a98c8';g.beginPath();g.ellipse(32,29,9,2,0,0,7);g.fill();R(g,'#9a968e',30,18,4,11);},
    g=>{g.strokeStyle='#d8f0ff';g.lineWidth=2;for(const s2 of [-1,1]){g.beginPath();g.moveTo(32,16);g.quadraticCurveTo(32+s2*(10+f*2),4+f,32+s2*(16+f),30);g.stroke();g.beginPath();g.moveTo(32+s2*12,30);g.quadraticCurveTo(32+s2*(18+f),34,32+s2*(22+f),52);g.stroke();}R(g,'#f0faff',31,4+f*2,2,13);for(let i=0;i<7;i++)R(g,'#e0f4ff',8+i*8+f*3,52+(i%2),2,1);}));
  SPR.chess=bake(g=>{R(g,'#6a4a2a',22,40,20,3);R(g,'#5a4026',30,43,4,19);R(g,'#4a3420',26,61,12,2);for(let i=0;i<4;i++)for(let j=0;j<2;j++)R(g,(i+j)%2?'#e8e0d0':'#2a2a2a',23+i*4+j*2,38-j*1,2,2);R(g,'#f0f0e8',28,34,2,4);R(g,'#1a1a1a',34,33,2,5);});
  SPR.counter=bake(g=>{R(g,'#7a5a36',8,40,48,22);R(g,'#8e6c44',8,40,48,2);R(g,'#5a4026',8,60,48,2);R(g,'rgba(180,210,220,.6)',10,32,44,8);R(g,'#c0c0b8',38,26,10,4);R(g,'#8a8a86',42,30,2,6);R(g,'#d8b040',14,35,8,4);R(g,'#c02020',26,35,6,4);});
}

(function buildTextures(){
  TX.two=[bake(g=>tTwoTone(g,rng(1))),bake(g=>tTwoTone(g,rng(17))),bake(g=>tNotice(g,rng(18)))];
  TX.graf=[0,1,2,3,4,5,6,7].map(v=>bake(g=>tGraf(g,rng(2+v),v))); TX.wallp=bake(g=>tWallp(g,rng(3)));
  TX.panel=[bake(g=>tPanel(g,rng(4))), bake(g=>tPanel(g,rng(4)),g=>panes(g,1)), bake(g=>tPanel(g,rng(4)),g=>panes(g,2))];
  TX.brick=bake(g=>tBrick(g,rng(5),'#7a3b2c','#554b43')); TX.baseb=bake(g=>tBase(g,rng(6)));
  TX.mail=[bake(g=>tMail(g,rng(7),0)),bake(g=>tMail(g,rng(27),1)),bake(g=>tMail(g,rng(37),2))];
  TX.door=bake(g=>tDoor(g,rng(8)));
  TX.entr=bake(g=>tEntr(g,rng(9)),g=>R(g,'#ff3a22',49,28,2,1));
  TX.lift=bake(g=>tLift(g,rng(10)),g=>R(g,'#ff3a1e',58,35,2,2));
  TX.liftOn=bake(g=>tLift(g,rng(10)),g=>{R(g,'#5dff9a',58,35,2,2);R(g,'#ffe7a0',19,3,26,1);});
  TX.garage=[bake(g=>tGarage(g,rng(40),0)),bake(g=>tGarage(g,rng(41),1)),bake(g=>tGarage(g,rng(42),2))];
  TX.swOff=bake(g=>{tSwitch(g,rng(50));R(g,'#8a8f8c',30,44,4,10);R(g,'#c9ccc8',29,52,6,3);},g=>{R(g,'#ff2a1a',16,18,4,4);});
  TX.swOn=bake(g=>{tSwitch(g,rng(50));R(g,'#8a8f8c',30,34,4,10);R(g,'#c9ccc8',29,33,6,3);},g=>{R(g,'#4dff8a',16,18,4,4);R(g,'#4dff8a',44,18,4,4);});
  TX.liftWall=LIFT_TAGS.map((_,v)=>bake(g=>tLiftWall(g,rng(60+v*5),v))); TX.liftDoor=bake(g=>tLiftDoor(g,rng(61)));
  TX.liftPanel={};['1','2','-1'].forEach(n=>TX.liftPanel[n]=bake(g=>tLiftPanel(g,rng(62)),g=>{g.fillStyle='#ff3a1e';g.font='bold 8px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(n,47,12);R(g,'#ffd070',45,56,4,1);}));
  TX.rubber=bake(g=>tRubber(g,rng(63))); TX.liftCeil=bake(liftCeil,liftCeilE);
  TX.tar=bake(g=>{const r=rng(310);R(g,'#3a3735',0,0,64,64);speck(g,r,600,['#33302e','#423e3b','#2a2826','#4a4541'],0,0,64,64);R(g,'#1c1a19',0,31,64,2);R(g,'#3e3a36',0,33,64,1);for(let i=0;i<6;i++){const x=(r()*56)|0,y=(r()*56)|0;R(g,'#3a3632',x,y,4,3);R(g,'#1a1817',x,y+3,4,1);}R(g,'#46423c',40,10,9,5);R(g,'#2a3240',12,46,10,4);});
  TX.plank=bake(g=>{R(g,'#0c0c0e',0,0,64,64);for(const x0 of [2,22,42]){R(g,'#7a5a36',x0,0,18,64);R(g,'#8e6c44',x0,0,2,64);R(g,'#5a4026',x0+16,0,2,64);R(g,'#4a3420',x0+6,20,3,2);R(g,'#4a3420',x0+10,48,3,2);}});
  TX.road=bake(g=>{R(g,'#4c4d52',0,0,64,64);R(g,'#505156',0,0,64,32);});
  TX.roadL=bake(g=>{R(g,'#4c4d52',0,0,64,64);R(g,'#505156',0,0,64,32);R(g,'#d8d4c0',6,29,24,5);R(g,'#d8d4c0',38,29,20,5);});
  TX.walk=bake(g=>{R(g,'#6e6c66',0,0,64,64);R(g,'#5a5852',0,31,64,2);R(g,'#5a5852',31,0,2,64);R(g,'#7a7870',0,0,64,1);R(g,'#7a7870',0,33,64,1);});
  TX.cityTop=bake(g=>{R(g,'#4c4d52',0,0,64,64);R(g,'#6e6c66',0,0,64,3);R(g,'#6e6c66',0,0,3,64);
    R(g,'#3a3735',6,6,24,52);R(g,'#46423e',6,6,24,2);R(g,'#2a2826',28,6,2,52);R(g,'#55524c',12,14,4,3);R(g,'#55524c',20,40,4,3);
    R(g,'#3e3a38',36,6,22,20);R(g,'#4a4640',36,6,22,2);R(g,'#2a2826',56,6,2,20);R(g,'#3a5a36',36,32,22,26);R(g,'#466a40',40,36,6,6);R(g,'#466a40',50,46,5,5);});
  cityTextures();metroTextures();siteTextures();
  TX.parapet=bake(g=>{const r=rng(311);R(g,'#6c6962',0,0,64,64);speck(g,r,300,['#62605a','#76726a','#5a5852'],0,0,64,64);R(g,'#8a867c',0,0,64,6);R(g,'#9a968c',0,0,64,1);R(g,'#4a4842',0,6,64,2);for(let x=0;x<64;x+=16)R(g,'#55534c',x,8,1,56);R(g,'#4a4a44',0,58,64,6);R(g,'#5a4a3a',22,20,3,14);R(g,'#5a4a3a',46,30,2,10);});
  TX.far=bake(g=>tFar(g,rng(80)),farE);TX.balc=bake(g=>tBalc(g,rng(81)));TX.barric=bake(g=>tBarric(g,rng(82)));
  TX.rail=bake(g=>{R(g,'#35423d',0,0,64,5);R(g,'#4c5c55',0,0,64,1);R(g,'#2a3430',0,58,64,6);for(let x=3;x<64;x+=9){R(g,'#35423d',x,5,3,53);R(g,'#4c5c55',x,5,1,53);}R(g,'#6a3a22',20,1,6,2);R(g,'#6a3a22',44,60,5,2);});
  TX.boarded=bake(g=>tBoarded(g,rng(120)));TX.shed=bake(g=>tShed(g,rng(121)),g=>R(g,'#ff3a1e',47,30,2,2));TX.shedOpen=bake(g=>tShed(g,rng(121)),g=>R(g,'#4dff8a',47,30,2,2));TX.roof=bake(g=>tShed(g,rng(125),'КРЫША'),g=>R(g,'#ff3a1e',47,30,2,2));TX.roofOpen=bake(g=>tShed(g,rng(125),'КРЫША'),g=>R(g,'#4dff8a',47,30,2,2));TX.flatDoor=bake(g=>tFlatDoor(g,rng(126)),g=>R(g,'#ff3a1e',52,28,2,2));makeTags([0,0,0]);
  TX.furn=[0,1,2,3].map(v=>bake(g=>tFurn(g,rng(83+v),v)));TX.carpet=bake(g=>tCarpet(g,rng(88)));TX.door2=bake(g=>tDoor2(g,rng(89)));TX.wallpB=bake(g=>tWallpB(g,rng(90)));
  TX.slat=bake(g=>tSlat(g,rng(95)));TX.slatDoor=bake(g=>tSlatDoor(g,rng(96)));TX.pipes=bake(g=>tPipes(g,rng(97)));TX.boiler=bake(g=>tBoiler(g,rng(98)),boilerE);
  TX.hatch=bake(g=>tHatch(g,rng(99)),hatchE);TX.water=bake(g=>tWater(g,rng(100)));TX.coalf=bake(g=>tCoalF(g,rng(101)));TX.ceilB=bake(g=>tCeilB(g,rng(102)));
  TX.tile=bake(g=>tTile(g,rng(11))); TX.parq=bake(g=>tParq(g,rng(12))); TX.asph=bake(g=>tAsph(g,rng(13))); TX.conc=bake(g=>tConc(g,rng(14))); TX.ceil=bake(g=>tCeil(g,rng(15)));
})();
const FLOORTEX=new Array(N),CEILTEX=new Array(N);
const WINV=new Uint8Array(N*5); for(let i=0;i<N;i++)for(let s=0;s<5;s++){const h=hash2(i*3+s*17,s*31+i*7);WINV[i*5+s]=h<.24?1:h<.31?2:0;}
const WALLV=new Uint8Array(N); for(let i=0;i<N;i++){const h=hash2(i,911);WALLV[i]=h<.6?0:h<.86?1:2;}
const FURNV=new Uint8Array(N);for(let i=0;i<N;i++)FURNV[i]=(hash2(i,313)*4)|0;
const DECOV=new Uint8Array(N); for(let i=0;i<N;i++){const x=i%MW,y=(i/MW)|0;DECOV[i]=((x>>2)*5+(y>>2)*7+((hash2(y>>2,x>>4)*3)|0))%12;}
const GRAFV=new Uint8Array(N); for(let i=0;i<N;i++)GRAFV[i]=(hash2(i,91)*8)|0;
const MAILV=new Uint8Array(N); for(let i=0;i<N;i++)MAILV[i]=(hash2(i,77)*3)|0;

let SKY,OOBF=0xff000000;const SKYN=(function(){const [,g]=cv(SKYW,SKYH);const gr=g.createLinearGradient(0,0,0,SKYH);gr.addColorStop(0,'#05060c');gr.addColorStop(.7,'#141421');gr.addColorStop(1,'#3a2a2a');g.fillStyle=gr;g.fillRect(0,0,SKYW,SKYH);
  const r=rng(99); for(let i=0;i<260;i++){g.fillStyle=r()<.8?'#8a8aa0':'#d8d8e8';g.fillRect((r()*SKYW)|0,(r()*80)|0,1,1);}
  g.fillStyle='rgba(216,212,196,.12)';g.beginPath();g.arc(300,26,12,0,7);g.fill();g.fillStyle='#d8d4c4';g.beginPath();g.arc(300,26,6,0,7);g.fill();
  let x=0; while(x<SKYW){const w=40+((r()*70)|0),h=18+((r()*44)|0);R(g,'#0a0b10',x,SKYH-h,w,h);for(let yy=SKYH-h+3;yy<SKYH-2;yy+=4)for(let xx=x+3;xx<x+w-3;xx+=5){if(r()<.13)R(g,r()<.8?'#c98a44':'#6f86c2',xx,yy,2,2);}x+=w+((r()*18)|0);}
  const hz=g.createLinearGradient(0,SKYH-26,0,SKYH);hz.addColorStop(0,'rgba(240,140,60,0)');hz.addColorStop(1,'rgba(240,140,60,.18)');g.fillStyle=hz;g.fillRect(0,SKYH-26,SKYW,26);
  const d=new Uint32Array(g.getImageData(0,0,SKYW,SKYH).data.buffer.slice(0));for(let i=0;i<d.length;i++)d[i]=(d[i]|0xff000000)>>>0;return d;})();

