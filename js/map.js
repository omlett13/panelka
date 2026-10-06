'use strict';
const MW=128,MH=96,N=MW*MH;let MWL=64,MHL=48;
const Z_OUT=0,Z_HALL=1,Z_APT=2,Z_BASE=3,Z_LIFT=4,Z_VOID=5,Z_BOSS=6,Z_WATER=7,Z_BOIL=8;
const FLCH=new Uint8Array(N);const RF={heli:null,spot:false,rain:[],cvs:{}};const TILE=new Uint8Array(N), ZONE=new Int8Array(N).fill(-1);
const ISD=[0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1];ISD[62]=1;   /* door-like tiles: D E X W O N */
const TMAP={'#':1,'B':2,'M':3,'G':4,'L':5,'D':6,'E':7,'S':8,'R':9,'X':10,'Y':11,'Z':12,'P':13,'W':14,'K':15,'F':16,'C':17,'O':18,'J':20,'N':21,'I':22,'Q':23,'H':24,'V':25,'U':26,'1':27,'2':28,'3':29,'a':30,'4':31,'5':32,'6':33,'7':34,'9':35,'h':36,'d':37,'l':38,'k':39,'n':40,'z':41,'f':42,'g':43,'c':44,'u':45,'b':46,'i':47,'=':48,'@':50,'-':51,'|':52,'+':53,'%':54,'&':55,'$':56,'!':57,'A':60,'T':61,'s':62,'0':63,'8':64,'>':65,'(':66,')':67,'<':68,'?':69,'{':70};
const ZMAP={'/':Z_OUT,';':Z_HALL,'[':Z_HALL,'m':Z_HALL,'r':Z_HALL,'e':Z_HALL,'y':Z_OUT,'q':Z_OUT,'x':Z_OUT,'j':Z_OUT,'o':Z_VOID,'t':Z_OUT,'p':Z_OUT,',':Z_OUT,'.':Z_HALL,':':Z_APT,'_':Z_BASE,'~':Z_LIFT,'v':Z_VOID,'^':Z_BOSS,'w':Z_WATER,'*':Z_BOIL};
const LIFT_SPAWN={x:3.5,y:39.35,a:-Math.PI/2};
const doorOpen=new Float32Array(N), doorTarget=new Float32Array(N), doorTimer=new Float32Array(N);
let DOORS=[];let BDOOR=-1;
const RAILM=new Uint8Array(N),WH12=new Uint8Array(N),CEILW=new Uint8Array(N),SEEN=new Uint8Array(N),TALLOK=new Uint8Array(N),ROOM=new Int16Array(N),BROOM=new Uint8Array(N);
function inB(x,y){return x>=0&&y>=0&&x<MW&&y<MH;}
function parseMap(src){
  BDOOR=-1;
  for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){
    const ch=src[y][x], i=y*MW+x;ZONE[i]=-1;FLCH[i]=ch.charCodeAt(0);
    if(ch in ZMAP){TILE[i]=0;ZONE[i]=ZMAP[ch];}
    else {TILE[i]=TMAP[ch]||1; if(ch==='D'||ch==='E'||ch==='@'||ch==='O'||ch==='d'||ch==='f'||ch==='g')ZONE[i]=Z_HALL;if(ch==='N')ZONE[i]=Z_BASE; if(ch==='X'||ch==='W'||ch==='a')ZONE[i]=Z_APT;if(ch==='U')ZONE[i]=G.level===6?Z_HALL:Z_OUT; if(ch==='O')BDOOR=i;}
  }
  DOORS=[];for(let i=0;i<N;i++){if(ISD[TILE[i]])DOORS.push(i);BROOM[i]=ZONE[i]===Z_BOSS?1:0;}
  TALLOK.fill(0);
  for(let i=0;i<N;i++){const t=TILE[i];if(t===1||t===4)TALLOK[i]=1;else if(t===7||t===14){for(const o of [1,-1,MW,-MW]){const j=i+o;if(j>=0&&j<N&&TILE[j]===1)TALLOK[i]=1;}}}
  ROOM.fill(-1);let id=0;
  for(let s=0;s<N;s++){ if(TILE[s]!==0||ROOM[s]>=0) continue; const q=[s]; ROOM[s]=id;
    while(q.length){ const c=q.pop(), cx=c%MW, cy=(c/MW)|0; for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){ const nx=cx+dx,ny=cy+dy; if(!inB(nx,ny)) continue; const n=ny*MW+nx; if(TILE[n]===0&&ROOM[n]<0){ROOM[n]=id;q.push(n);} } } id++; }
}
let VOIDOK=false;function solidCell(cx,cy){ if(!inB(cx,cy)) return true; const i=cy*MW+cx,t=TILE[i]; if(t===0) return ZONE[i]===Z_VOID&&!(VOIDOK&&FLCH[i]===111); if(ISD[t]) return doorOpen[i]<0.85; return true; }
function sightBlock(cx,cy){ if(!inB(cx,cy)) return true; const i=cy*MW+cx,t=TILE[i]; if(t===0||(t>=51&&t<=55)||t===57) return false; if(ISD[t]) return doorOpen[i]<0.5; return true; }

/* ---------- RNG / HELPERS ---------- */
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function hash2(x,y){let h=(Math.imul(x,374761393)+Math.imul(y,668265263))|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296;}
function cv(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.imageSmoothingEnabled=false;return [c,g];}
function R(g,c,x,y,w,h){g.fillStyle=c;g.fillRect(x,y,w,h);}
function speck(g,r,n,cols,x0,y0,w,h,s){s=s||1;for(let i=0;i<n;i++){g.fillStyle=cols[(r()*cols.length)|0];g.fillRect(x0+((r()*w)|0),y0+((r()*h)|0),s,s);}}
function shadeHex(hex,f){const n=parseInt(hex.slice(1),16);const r=Math.min(255,((n>>16)&255)*f|0),g=Math.min(255,((n>>8)&255)*f|0),b=Math.min(255,(n&255)*f|0);return 'rgb('+r+','+g+','+b+')';}
function poly(g,c,pts){g.fillStyle=c;g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.closePath();g.fill();}
function star(g,cx,cy,r1,r2,n,col,rot){g.fillStyle=col;g.beginPath();for(let i=0;i<n*2;i++){const r=i%2?r2:r1,a=rot+i*Math.PI/n;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();g.fill();}
let EYEPTS=null;const HARD=new Map();
function EYE(g,c,x,y,w,h){R(g,c,x,y,w,h);if(EYEPTS)EYEPTS.push([x,y,w,h]);}
function bakeH(draw,emis){EYEPTS=[];const n=bake(draw,emis);const pts=EYEPTS;EYEPTS=null;
  if(pts.length){const h=bake(draw,g=>{if(emis)emis(g);for(const q of pts){R(g,'#ff2a12',q[0],q[1],q[2],q[3]+1);R(g,'#ff9070',q[0],q[1],1,1);}});HARD.set(n,h);}return n;}
function bake(draw,emis,w,h){w=w||64;h=h||64;const [,g]=cv(w,h);draw(g);if(emis)emis(g);
  const d=new Uint32Array(g.getImageData(0,0,w,h).data.buffer.slice(0));let m=null;
  if(emis){const [,g2]=cv(w,h);emis(g2);m=g2.getImageData(0,0,w,h).data;}
  for(let i=0;i<d.length;i++){const a=d[i]>>>24;if(a<128){d[i]=0;continue;}const v=d[i]&0x00ffffff;d[i]=(((m&&m[i*4+3]>128)?254:255)<<24|v)>>>0;}
  return d;}
function sh(c,lr,lg,lb){let r=((c&255)*lr)>>8,g=(((c>>>8)&255)*lg)>>8,b=(((c>>>16)&255)*lb)>>8;if(r>255)r=255;if(g>255)g=255;if(b>255)b=255;if(r<0)r=0;if(g<0)g=0;if(b<0)b=0;return (0xff000000|(b<<16)|(g<<8)|r)>>>0;}

