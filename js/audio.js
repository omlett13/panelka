'use strict';
/* ---------- AUDIO ---------- */
const AU={c:null,m:null,noise:null,hum:null,wind:null};
/* music files; the single-file build swaps these paths for data: URLs */
const AUDIO_SRC={boss:'audio/boss.mp3',crowd:'audio/crowd.mp3'};
function mp3Bytes(src){if(!src.startsWith('data:'))return fetch(src).then(r=>{if(!r.ok)throw new Error(src+' '+r.status);return r.arrayBuffer();});
  const bin=atob(src.slice(src.indexOf(',')+1)),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return Promise.resolve(u.buffer);}
function loadMp3(k,cb){const c=AU.c;if(!c)return;mp3Bytes(AUDIO_SRC[k]).then(b=>c.decodeAudioData(b)).then(cb,err=>console.warn('audio '+k+': '+err));}
function initAudio(){
  if(AU.c){if(AU.c.state==='suspended')AU.c.resume();return;}
  try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=new C();AU.c=c;
    AU.m=c.createGain();AU.m.gain.value=SET.snd?.55:0;AU.m.connect(c.destination);
    const nb=c.createBuffer(1,c.sampleRate*1.5,c.sampleRate),d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;AU.noise=nb;
    const o1=c.createOscillator();o1.type='sawtooth';o1.frequency.value=50;const o2=c.createOscillator();o2.type='sine';o2.frequency.value=100;
    const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=300;const hg=c.createGain();hg.gain.value=0;o1.connect(lp);o2.connect(lp);lp.connect(hg);hg.connect(AU.m);o1.start();o2.start();AU.hum=hg;
    const ns=c.createBufferSource();ns.buffer=nb;ns.loop=true;const wl=c.createBiquadFilter();wl.type='lowpass';wl.frequency.value=420;const wg=c.createGain();wg.gain.value=0;ns.connect(wl);wl.connect(wg);wg.connect(AU.m);ns.start();AU.wind=wg;
    const dO=c.createOscillator();dO.type='sawtooth';dO.frequency.value=112;const dB=c.createBiquadFilter();dB.type='bandpass';dB.frequency.value=900;dB.Q.value=.8;
    const dA=c.createGain();dA.gain.value=.5;const lfo=c.createOscillator();lfo.type='square';lfo.frequency.value=21;const lg2=c.createGain();lg2.gain.value=.5;lfo.connect(lg2);lg2.connect(dA.gain);
    const dOut=c.createGain();dOut.gain.value=0;dO.connect(dB);dB.connect(dA);
    if(c.createStereoPanner){const pn=c.createStereoPanner();dA.connect(pn);pn.connect(dOut);AU.drillPan=pn;}else dA.connect(dOut);
    dOut.connect(AU.m);dO.start();lfo.start();AU.drill=dOut;
    const bLP=c.createBiquadFilter();bLP.type='lowpass';bLP.frequency.value=5000;const bOut=c.createGain();bOut.gain.value=0;AU.boomIn=c.createGain();AU.boomIn.connect(bLP);
    if(c.createStereoPanner){const pn=c.createStereoPanner();bLP.connect(pn);pn.connect(bOut);AU.boomPan=pn;}else bLP.connect(bOut);bOut.connect(AU.m);AU.boom=bOut;AU.boomLP=bLP;AU.boomNext=0;AU.boomStep=0;
  }catch(e){AU.c=null;}
}
function env(g,t,a,peak,dec){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+dec);}
function nz(dur,type,freq,q,peak,dec,t0){const c=AU.c;if(!c)return;const t=c.currentTime+(t0||0);const s=c.createBufferSource();s.buffer=AU.noise;const f=c.createBiquadFilter();f.type=type;f.frequency.value=freq;f.Q.value=q;const g=c.createGain();s.connect(f);f.connect(g);g.connect(AU.m);env(g,t,.004,peak,dec);s.start(t,Math.random()*.5);s.stop(t+dur);}
function tone(type,f0,f1,dur,peak,t0){const c=AU.c;if(!c)return;const t=c.currentTime+(t0||0);const o=c.createOscillator();o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);const g=c.createGain();o.connect(g);g.connect(AU.m);env(g,t,.005,peak,dur);o.start(t);o.stop(t+dur+.05);}
function bTone(type,f0,f1,dur,peak,t){const c=AU.c;const o=c.createOscillator();o.type=type;o.frequency.setValueAtTime(f0,t);if(f1!==f0)o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);const g=c.createGain();o.connect(g);g.connect(AU.boomIn);env(g,t,.004,peak,dur);o.start(t);o.stop(t+dur+.05);}
function bHat(t,peak){const c=AU.c;const s=c.createBufferSource();s.buffer=AU.noise;const f=c.createBiquadFilter();f.type='highpass';f.frequency.value=7000;const g=c.createGain();s.connect(f);f.connect(g);g.connect(AU.boomIn);env(g,t,.002,peak,.04);s.start(t,Math.random()*.5);s.stop(t+.06);}
/* a cheap cassette disco loop: Am F C G, octave bass, offbeat stabs */
const BOOMROOT=[110,87.31,130.81,98],BOOMCH=[[1,1.19,1.5],[1,1.26,1.5],[1,1.26,1.5],[1,1.26,1.5]];
function boomStep(s,t){const bar=(s>>3)%4,st=s&7,r=BOOMROOT[bar];
  bTone('sawtooth',st%2?r*2:r,st%2?r*2:r,.13,.35,t);
  if(st%4===0)bTone('sine',130,42,.16,.9,t);
  if(st%2===1)bHat(t,.25);
  if(st===2||st===6)for(const k of BOOMCH[bar])bTone('square',r*2*k,r*2*k,.1,.07,t);
  if(bar===3&&st===7)bTone('square',r*4,r*3,.12,.08,t);}
function vocal(f0,dur,drop,forms){const c=AU.c;if(!c||!(f0>0))return;const t=c.currentTime;const o=c.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(f0,t);o.frequency.linearRampToValueAtTime(f0*1.25,t+dur*.3);o.frequency.exponentialRampToValueAtTime(f0*drop,t+dur);const g=c.createGain();env(g,t,.01,1.4,dur);for(const fr of forms){const b=c.createBiquadFilter();b.type='bandpass';b.frequency.value=fr;b.Q.value=5;o.connect(b);b.connect(g);}g.connect(AU.m);o.start(t);o.stop(t+dur+.05);}
const sfx={
  pistol(){nz(.25,'lowpass',2600,.7,.9,.18);tone('sine',160,40,.16,.8);},
  shotgun(){nz(.45,'lowpass',1600,.6,1.2,.38);tone('sine',110,30,.3,1);nz(.2,'highpass',3000,.5,.3,.08,.05);},
  punch(){nz(.12,'lowpass',500,.8,.9,.1);tone('sine',90,45,.1,.7);},
  whoosh(){nz(.18,'bandpass',900,1.2,.25,.15);},
  click(){tone('square',1400,1200,.03,.2);},
  tick(){tone('square',620,620,.03,.07);},
  door(){nz(.6,'bandpass',320,2,.35,.5);tone('sawtooth',60,48,.5,.1);},
  pickup(){tone('square',660,660,.06,.16);tone('square',990,990,.08,.16,.07);},
  hurt(){tone('sawtooth',240,110,.22,.35);},
  spit(){nz(.06,'highpass',2500,.7,.4,.05);},
  step(out){nz(.08,out?'bandpass':'lowpass',out?1100:380,1,.1,.07);},
  ding(){tone('sine',880,880,1.2,.4);tone('sine',1320,1320,1,.25,.02);},
  clunk(){nz(.3,'lowpass',700,1,1,.25);tone('square',70,40,.25,.4);tone('sawtooth',50,50,1.2,.15,.1);},
  bark(p){vocal(p,.3,.75,[650,1150,2400]);},
  die(p){vocal(p*.75,.55,.5,[520,900]);},
  swap(){nz(.08,'bandpass',1800,3,.2,.06);},
  latch(){nz(.05,'bandpass',2200,4,.5,.04);nz(.05,'bandpass',1900,4,.5,.04,.09);},
  cash(){tone('square',1320,1320,.05,.14);tone('square',1760,1760,.12,.14,.06);nz(.1,'highpass',4000,1,.2,.08,.02);},
  smash(){nz(.35,'highpass',2800,.6,.9,.3);for(let i=0;i<5;i++)tone('sine',2400+Math.random()*2200,2000,.08,.12,.03+i*.05);},
  throwIt(){nz(.2,'bandpass',700,1.5,.3,.18);},
  ride(){nz(1.5,'lowpass',160,1,.35,1.4);nz(1.5,'lowpass',180,1,.35,1.4,1.4);tone('sawtooth',55,82,3,.07);},
  doorsShut(){nz(.5,'bandpass',260,2,.4,.4);tone('square',90,60,.2,.15,.42);},
  woof(){tone('square',520,210,.1,.16);nz(.1,'bandpass',900,2,.2,.08);tone('square',480,200,.1,.14,.17);nz(.1,'bandpass',850,2,.18,.08,.17);},
  screech(){nz(.7,'highpass',1800,.7,1.4,.6);tone('sawtooth',1400,180,.6,.6);tone('square',900,120,.5,.35,.05);},
  skitter(){for(let i=0;i<6;i++)nz(.03,'highpass',4000,2,.18,.02,i*.05);},
  squish(){nz(.25,'lowpass',700,1,.8,.22);tone('sine',180,50,.2,.5);},
  heart(){tone('sine',60,40,.12,.5);tone('sine',55,38,.12,.4,.16);},
  squeak(){tone('square',2200,3200,.05,.08);tone('square',2600,1800,.08,.07,.06);},
  hiss(){nz(1,'highpass',3000,.6,.25,.9);},
  splash(){nz(.12,'bandpass',1500,1.5,.18,.1);},
  yelp(){tone('square',900,1400,.08,.15);tone('square',1300,500,.25,.13,.08);},
  roar(){vocal(70,.9,.6,[400,800]);nz(.6,'lowpass',500,1,.4,.5);},
  slap(){nz(.07,'bandpass',2400,1.1,1.1,.06);nz(.1,'lowpass',600,1,.5,.08);tone('square',260,90,.06,.12);},
  scratch(){nz(.3,'bandpass',1200,4,.6,.28);tone('sawtooth',600,90,.35,.18);tone('sawtooth',300,40,.3,.12,.1);}
};

