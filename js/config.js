'use strict';
/* ============================================================
   ПАНЕЛЬКА — browser prototype at native 3DS resolution.
   PORT NOTES (devkitPro / citro2d + citro3d):
   - renderTop()    → top screen 400x240 (internal res set by ПИКСЕЛИ).
   - renderBottom() → bottom screen 320x240, touch rects in BTNS / menuRows().
   - Input: circle pad move/turn, A fire/ok, B use/back, X/Y weapon,
     L/R strafe, START pause, SELECT map zoom.
   - Textures/sprites are generated at boot into 64x64 RGBA arrays.
   ============================================================ */

/* ---------- CONFIG ---------- */
const DEBUG=/[?&#]debug\b/.test(location.search+location.hash);
/* in debug, wrap a state object so reads/writes of undeclared keys warn (catches typos and ad-hoc fields) */
function watchKeys(name,o){if(!DEBUG||typeof Proxy==='undefined')return o;const warned=new Set(),chk=(k,op)=>{if(typeof k!=='string'||k in o||k==='toJSON'||k==='then'||warned.has(k))return;warned.add(k);console.warn(name+'.'+k+' '+op+' but not declared');};
  return new Proxy(o,{get(t,k){chk(k,'read');return t[k];},set(t,k,v){chk(k,'written');t[k]=v;return true;}});}
let FOGD=12.5,CULL2=196,CEILH=1;const W=400,H=240,BW=320,BH=240,PLANE=0.8,SKYW=1024,SKYH=120;
const LABEL='#bdb8aa',VFD='#7df2c9',DIM='#4d5a55',WARN='#f0973c',DANGER='#e8583e';

/* ---------- SETTINGS (per-viewer, localStorage) ---------- */
const SETS=[
  {k:'px',label:'ПИКСЕЛИ',vals:['400x240','200x120','133x80','100x60']},
  {k:'diff',label:'СЛОЖНОСТЬ',vals:['ЛЕГКО','НОРМА','ЖЕСТКО']},
  {k:'bright',label:'ЯРКОСТЬ',vals:['1','2','3','4','5']},
  {k:'sens',label:'МЫШЬ',vals:['1','2','3','4','5','6','7','8','9','10']},
  {k:'bob',label:'КАЧАНИЕ',vals:['ВЫКЛ','ВКЛ']},
  {k:'snd',label:'ЗВУК',vals:['ВЫКЛ','ВКЛ']}
];
const SET={px:0,diff:1,bright:1,sens:4,bob:1,snd:1};
try{const s=JSON.parse(localStorage.getItem('panelka.v2')||'{}');for(const k in SET)if(typeof s[k]==='number')SET[k]=s[k];}catch(e){}
function saveSet(){try{localStorage.setItem('panelka.v2',JSON.stringify(SET));}catch(e){}}
const PXS=[1,2,3,4],BRIGHT=[.75,1,1.25,1.5,1.8];
const DIFF=[{dmg:.6,hp:.8,spd:.9,ammo:1.5},{dmg:1,hp:1,spd:1,ammo:1},{dmg:1.4,hp:1.25,spd:1.12,ammo:.75}];

