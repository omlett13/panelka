'use strict';
/* ---------- RENDER: TOP SCREEN ---------- */
const tg=topC.getContext('2d'),bg=botC.getContext('2d');
let RZ=null,RZON=false,LOWD=null,LOWY=null,BIN=null,BYA=null,BEX=null,ZT=null,LOWN=0;const LOWC=new Int32Array(12),LOWP=new Int32Array(12),LOWT=new Int16Array(12);
let RW=W,RH=H,RHOR=H/2,RPROJ=(W/2)/PLANE,PX=1,IMG,FB,ZB,SKYCOL,TCOL,TROW,TORCH=0;
const [LC,lg]=cv(W,H);
function setRes(){PX=PXS[SET.px];RW=Math.round(W/PX);RH=Math.round(H/PX);RHOR=RH/2;RPROJ=(RW/2)/PLANE;LC.width=RW;LC.height=RH;lg.imageSmoothingEnabled=false;IMG=lg.createImageData(RW,RH);FB=new Uint32Array(IMG.data.buffer);ZB=new Float32Array(RW);LOWD=new Float32Array(RW);RZ=new Float32Array(RW*RH);LOWY=new Int16Array(RW);BIN=new Float32Array(RW);BYA=new Float32Array(RW);BEX=new Float32Array(RW);ZT=new Int16Array(RW);SKYCOL=new Int32Array(RW);TCOL=new Float32Array(RW);TROW=new Float32Array(RH);
  for(let x=0;x<RW;x++)TCOL[x]=Math.pow(Math.max(0,1-Math.abs(x-RW/2)/(RW*.36)),1.5);for(let y=0;y<RH;y++)TROW[y]=Math.max(0,1-Math.abs(y-RH*.52)/(RH*.62));}
function renderTop(){
  const a=P.a,dirX=Math.cos(a),dirY=Math.sin(a),plX=-dirY*PLANE,plY=dirX*PLANE,px=P.x,py=P.y,camZ=P.camZ,flash=G.flash;
  TORCH=(LEVELDEF[G.level].torch&&(G.state==='play'||G.state==='dead'||G.state==='pause'))?1:0;
  for(let x=0;x<RW;x++){const cx=2*x/RW-1;const ang=Math.atan2(dirY+plY*cx,dirX+plX*cx);SKYCOL[x]=((((ang/(2*Math.PI))%1)+1)%1*SKYW)|0;}
  const PIN=G.level===11&&ZONE[(py|0)*MW+(px|0)]===Z_HALL;
  RHOR=Math.round(RH/2+(P.pitch||0)*RH);const rdx0=dirX-plX,rdy0=dirY-plY,rdx1=dirX+plX,rdy1=dirY+plY,skyK=SKYH*2/RH;
  for(let y=0;y<RH;y++){
    const isF=y>=RHOR,p=isF?(y-RHOR+.5):(RHOR-y-.5),rowD=(isF?camZ:(CEILH-camZ))*RPROJ/p;
    let fx=px+rowD*rdx0,fy=py+rowD*rdy0;const sx=rowD*(rdx1-rdx0)/RW,sy=rowD*(rdy1-rdy0)/RW;
    let fog=1-rowD/FOGD;if(fog<0)fog=0;const fogI=fog*256;const fI=flash>0?flash*Math.max(0,1-rowD/7)*190:0;const feF=Math.min(256,fogI*1.5+40)|0;const tR=TORCH?230*TROW[y]*Math.max(0,1-rowD/10):0;const hk=HZ?1-fog:0,hr=hk*178,hg=hk*196,hb=hk*214;
    const o=y*RW,skyRow=Math.max(0,Math.min(SKYH-1,(SKYH-1-(RHOR-y)*skyK)|0))*SKYW;if(!isF&&camZ>1){for(let x=0;x<RW;x++)FB[o+x]=SKY[skyRow+SKYCOL[x]];continue;}
    for(let x=0;x<RW;x++,fx+=sx,fy+=sy){
      if(fx<0||fy<0||fx>=MWL||fy>=MHL){if(isF&&G.level===7){const u=((fx/6)%1+1)%1,v=((fy/6)%1+1)%1,c=TX.cityTop[(((v*64)|0)<<6)|((u*64)|0)],L=(70+(G.dawn||0)*120)*Math.max(.45,fog);FB[o+x]=sh(c,L|0,(L*.9)|0,(L*.88)|0);continue;}FB[o+x]=isF?OOBF:SKY[skyRow+SKYCOL[x]];continue;}
      const cx=fx|0,cy=fy|0,cell=cy*MW+cx;let tex;
      if(isF)tex=FLOORTEX[cell];else{const zc=ZONE[cell];if((zc===Z_OUT||zc===Z_VOID)&&!(PIN&&TILE[cell]!==0)&&!CEILW[cell]){FB[o+x]=SKY[skyRow+SKYCOL[x]];continue;}tex=CEILTEX[cell];}
      const c=tex[((((fy-cy)*64)|0)<<6)|(((fx-cx)*64)|0)];
      const tq=tR?tR*TCOL[x]:0;FB[o+x]=(c>>>24)===254?sh(c,feF,feF,feF):sh(c,((LR[cell]*fogI)>>8)+fI+tq,((LG[cell]*fogI)>>8)+fI*.85+tq*.95,((LB[cell]*fogI)>>8)+fI*.6+tq*.8);if(hk)FB[o+x]=hzA(FB[o+x],hr,hg,hb);
    }
  }
  const bm=BRIGHT[SET.bright],ar=AMB[0][0]*300*bm,ag=AMB[0][1]*300*bm,ab=AMB[0][2]*300*bm;
  RZON=G.level===12;const L12R=G.level===12,L11R=G.level===11,L10R=G.level===10||L11R,OUTP=(L10R||L12R)&&ZONE[(py|0)*MW+(px|0)]===Z_OUT,IND=L10R&&!OUTP&&!G.duel;
  for(let x=0;x<RW;x++){
    const cx=2*x/RW-1,rdx=dirX+plX*cx,rdy=dirY+plY*cx;let mx=px|0,my=py|0;
    const ddx=rdx===0?1e30:Math.abs(1/rdx),ddy=rdy===0?1e30:Math.abs(1/rdy);let stx,sty,sdx,sdy;
    if(rdx<0){stx=-1;sdx=(px-mx)*ddx;}else{stx=1;sdx=(mx+1-px)*ddx;}
    if(rdy<0){sty=-1;sdy=(py-my)*ddy;}else{sty=1;sdy=(my+1-py)*ddy;}
    let prev=my*MW+mx,side=0,hitT=0,hitI=-1,dOff=0,railD=0,railW=0,ovD=0,ovI=-1,ovTx=0,ovSide=0;SEEN[prev]=1;LOWN=0;if(RZON)for(let y=0,q=x;y<RH;y++,q+=RW)RZ[q]=1e9;LOWD[x]=1e9;LOWY[x]=RH;BIN[x]=IND?0:1e9;BYA[x]=IND?-1e9:0;BEX[x]=1e9;ZT[x]=0;let lowFull=0;
    for(let i=0;i<120;i++){
      if(sdx<sdy){sdx+=ddx;mx+=stx;side=0;}else{sdy+=ddy;my+=sty;side=1;}
      if(mx<0||my<0||mx>=MWL||my>=MHL)break;
      const ci=my*MW+mx,t=TILE[ci];
      if(L10R&&camZ<1){const z=ZONE[ci];if(BIN[x]>1e8){if(z===Z_HALL&&ZONE[prev]!==Z_HALL){const dd=side===0?sdx-ddx:sdy-ddy;BIN[x]=dd;BYA[x]=RHOR-(1-camZ)*RPROJ/dd;}}else if(BEX[x]>1e8&&z===Z_OUT)BEX[x]=side===0?sdx-ddx:sdy-ddy;}
      if(t===0&&OUTP&&FLCH[ci]===59&&LOWN<12){LOWC[LOWN]=ci;LOWP[LOWN]=prev;LOWT[LOWN]=99;LOWN++;}
      if(t===0){if(!railD&&ZONE[ci]===Z_VOID&&ZONE[prev]!==Z_VOID&&FLCH[ci]!==111){railD=side===0?sdx-ddx:sdy-ddy;let w=side===0?py+railD*rdy:px+railD*rdx;railW=w-Math.floor(w);}SEEN[ci]=1;prev=ci;continue;}
      if((t>=51&&t<=55)||t===57||(L10R&&(t===49||(t===2&&OUTP)))||(L11R&&(t===62||t===63||t===64||((t===60||t===61||t===65)&&(OUTP||BEX[x]<1e8))))||(L12R&&t>=68&&t<=70)){const hh=t===70?WH12[ci]*.5:(LOWB[t]?LOWB[t][4]:9);if(LOWN<12&&!(lowFull>camZ&&hh<=lowFull)){if(t===68||t===69){const m=RAILM[ci];if((m&3)||!(m&12)){LOWC[LOWN]=ci;LOWP[LOWN]=prev;LOWT[LOWN]=68;LOWN++;}if((m&12)&&LOWN<12){LOWC[LOWN]=ci;LOWP[LOWN]=prev;LOWT[LOWN]=69;LOWN++;}}else{LOWC[LOWN]=ci;LOWP[LOWN]=prev;LOWT[LOWN]=t;LOWN++;}const B2=LOWB[t];if(B2&&t!==62&&B2[0]===0&&B2[1]===1&&B2[2]===0&&B2[3]===1&&!(B2[6]>0)&&hh>lowFull)lowFull=hh;}SEEN[ci]=1;prev=ci;continue;}
      if(ISD[t]&&!(L11R&&t===62)){const o=doorOpen[ci];if(o>0){const pd=side===0?sdx-ddx:sdy-ddy;let w=side===0?py+pd*rdy:px+pd*rdx;w-=Math.floor(w);if(w<o){
        /* open doorway in a tall facade: remember it so the wall above the door still gets drawn */
        if(ovI<0&&TALLOK[ci]&&(ZONE[prev]===Z_OUT||ZONE[prev]===Z_VOID)){ovD=pd;ovI=ci;ovSide=side;let q=(w*64)|0;if(q>63)q=63;if((side===0&&rdx<0)||(side===1&&rdy>0))q=63-q;ovTx=q;}
        SEEN[ci]=1;prev=ci;continue;}}dOff=o;}
      SEEN[ci]=1;hitT=t;hitI=ci;break;
    }
    if(hitI<0){ZB[x]=1e9;if(railD)drawRail(x,railD,railW,camZ);if(LOWN)drawLow(x,px,py,rdx,rdy,camZ);continue;}
    let perp=side===0?sdx-ddx:sdy-ddy;if(perp<.01)perp=.01;ZB[x]=perp;
    let wx=side===0?py+perp*rdy:px+perp*rdx;wx-=Math.floor(wx);let txU=(wx*64)|0;if(ISD[hitT])wx-=dOff;
    let tx=(wx*64)|0;if(tx<0)tx=0;if(tx>63)tx=63;if(txU>63)txU=63;if((side===0&&rdx<0)||(side===1&&rdy>0)){tx=63-tx;txU=63-txU;}
    const pz=ZONE[prev];let base=null;const tall=(pz===Z_OUT||pz===Z_VOID)&&TALLOK[hitI]===1;
    const zoneWall=G.level===9&&pz===Z_BASE?TX.rawc:pz===Z_BOSS?TX.wallpB:pz===Z_APT?TX.wallp:(pz===Z_BASE||pz===Z_WATER||pz===Z_BOIL)?TX.baseb:TX.two[WALLV[hitI]];
    switch(hitT){
      case 1:base=tall?null:zoneWall;break;
      case 2:base=(pz===Z_BASE||pz===Z_WATER||pz===Z_BOIL)?TX.baseb:TX.brick;break;
      case 3:base=TX.mail[MAILV[hitI]];break;
      case 4:base=tall?null:TX.graf[GRAFV[hitI]];break;
      case 5:base=G.power?TX.liftOn:TX.lift;break;
      case 6:base=TX.door;break;
      case 7:base=TX.entr;break;
      case 8:base=G.power?TX.swOn:TX.swOff;break;
      case 9:base=TX.garage[MAILV[hitI]];break;
      case 10:base=zoneWall;break;
      case 11:base=TX.liftWall[((hitI%MW)*2+((hitI/MW)|0)*3+side)%TX.liftWall.length];break;
      case 12:base=TX.liftDoor;break;
      case 13:base=TX.liftPanel[G.state==='ride'&&G.rideDing||G.state==='win'?rideTo():floorLabel(G.level)];break;
      case 14:base=TX.balc;break;
      case 15:base=TX.barric;break;
      case 16:base=TX.furn[FURNV[hitI]];break;
      case 17:base=(pz===Z_BOSS||pz===Z_APT)?TX.carpet:zoneWall;break;
      case 18:base=TX.door2;break;
      case 20:base=TX.slat;break;
      case 21:base=TX.slatDoor;break;
      case 22:base=TX.pipes;break;
      case 23:base=TX.boiler;break;
      case 24:base=G.level===9?TX.cabDoor:TX.hatch;break;
      case 25:base=TX.boarded;break;
      case 26:base=G.level>=6?(G.codeOK?TX.roofOpen:TX.roof):(G.codeOK?TX.shedOpen:TX.shed);break;
      case 30:base=TX.flatDoor;break;
      case 31:case 32:case 33:case 34:base=pz===Z_HALL?TX.shopIn:TX.sign[hitT-31];break;case 35:base=G.level===8?TX.deco[DECOV[hitI]]:TX.sign[4];break;
      case 36:base=pz===Z_HALL?TX.shelf:tall?null:TX.brick;break;
      case 39:base=TX.metroIn;break;case 40:base=FLCH[prev]===114?(G.ghostOn?TX.twinGhost:G.trainMove?TX.twin[(G.t*14|0)&3]:TX.twinStop):TX.tcarOut;break;
      case 41:base=TX.tend;break;case 42:base=TX.tdoor;break;case 43:base=TX.tgdoor;break;case 44:base=TX.marble;break;case 45:base=TX.mosaic;break;case 46:base=TX.eswall;break;case 47:base=TX.fence;break;case 48:base=TX.column;break;case 49:base=TX.fbrick;break;case 50:base=TX.skelIn;break;case 58:base=TX.fbrick;break;case 66:base=TX.siloW;break;case 68:base=TX.siloW;break;case 60:base=pz===Z_HALL?TX.gint:TX.gwall;break;case 61:case 62:base=pz===Z_HALL?TX.gint:TX.gdoor[((((hitI%MW)/3)|0)*7+(((hitI/MW)|0))*3)%5];break;case 63:base=TX.ggate;break;case 64:base=TX.plita;break;case 65:base=TX.gdoorS;break;case 67:base=TX.siloBin;break;case 56:base=tall?TX.skelG:TX.skelIn;break;case 37:base=TX.glassDoor;break;case 38:base=TX.bdoor;break;
      case 27:case 28:case 29:base=TX.tag[hitT-27];break;
    }
    const lineH=RPROJ/perp,fl=RHOR+camZ*lineH,st=(G.level===12&&hitT===66)?CEILH:(tall?5:(CEILH>1&&pz!==Z_OUT&&pz!==Z_VOID?CEILH:1)),top=fl-st*lineH;
    const y0=Math.max(0,Math.ceil(top)),y1=Math.min(RH-1,Math.floor(fl));if(OUTP&&!IND&&BIN[x]>1e8)ZT[x]=Math.max(0,Math.ceil(top));
    let hA=1e9,hB=-1e9;if(perp>BIN[x]+.01){hA=BYA[x];hB=RHOR-(1-camZ)*RPROJ/Math.min(perp,BEX[x]);}
    let fog=1-perp/FOGD;if(fog<0)fog=0;const fogI=fog*256,sd=side===1?.78:1;const hk=HZ?1-fog:0,hr=hk*178,hg=hk*196,hb=hk*214;
    const fI=flash>0?flash*Math.max(0,1-perp/7)*190:0;
    const lr0=(((LR[prev]*fogI)>>8)+fI)*sd,lg0=(((LG[prev]*fogI)>>8)+fI*.85)*sd,lb0=(((LB[prev]*fogI)>>8)+fI*.6)*sd;
    const ur=(ar*fogI/256)*sd,ug=(ag*fogI/256)*sd,ub=(ab*fogI/256)*sd;
    const L10D=G.level===10||G.level===11,fe=Math.min(256,fogI*1.5+40)|0,inv=1/lineH,tW=TORCH?230*TCOL[x]*Math.max(0,1-perp/10):0;
    for(let y=y0;y<=y1;y++){if(y>=hA&&y<hB)continue;
      const v=(fl-y)*inv;let s=v|0;if(s>=st)s=st-1;let ty=63-(((v-s)*64)|0);if(ty<0)ty=0;
      let tex=base,lr=lr0,lg=lg0,lb=lb0;
      let cx2=tx;if(G.level===12&&hitT===66){tex=TX.siloW;cx2=tx;}else if(tall&&(s>0||!base)&&hitT!==48){if(hitT===56||hitT===50||hitT===58){tex=s===4?TX.skelTop:TX.skelF[WINV[hitI*5+s]&1];cx2=txU;}else{tex=TX.panel[WINV[hitI*5+s]];cx2=txU;if(s>0&&!L10D){lr=ur;lg=ug;lb=ub;}}}
      const c=tex[(ty<<6)|cx2];if(c===0)continue;
      const tw=tW?tW*TROW[y]:0;FB[y*RW+x]=(c>>>24)===254?sh(c,fe,fe,fe):sh(c,(lr+tw)|0,(lg+tw*.95)|0,(lb+tw*.8)|0);if(hk)FB[y*RW+x]=hzA(FB[y*RW+x],hr,hg,hb);
    }
    if(ovI>=0&&ovD<perp){const d=Math.max(.05,ovD),lh=RPROJ/d,f2=RHOR+camZ*lh,ya=Math.max(0,Math.ceil(f2-5*lh)),yb=Math.min(RH-1,Math.floor(f2-lh));
      let fg=1-d/FOGD;if(fg<0)fg=0;const s2=ovSide===1?.78:1,sk=TILE[ovI]===50,r2=(sk?LR[ovI]*fg:ar*fg)*s2,g2=(sk?LG[ovI]*fg:ag*fg)*s2,b2=(sk?LB[ovI]*fg:ab*fg)*s2,fe2=Math.min(256,fg*256*1.5+40)|0;
      for(let y=ya;y<=yb;y++){const v=(f2-y)/lh;let s=v|0;if(s<1)s=1;if(s>4)s=4;let ty=63-(((v-s)*64)|0);if(ty<0)ty=0;const c=(TILE[ovI]===50?(s===4?TX.skelTop:TX.skelF[WINV[ovI*5+s]&1]):TX.panel[WINV[ovI*5+s]])[(ty<<6)|ovTx];if(c===0)continue;
        FB[y*RW+x]=(c>>>24)===254?sh(c,fe2,fe2,fe2):sh(c,r2|0,g2|0,b2|0);}}
    if(railD&&railD<perp)drawRail(x,railD,railW,camZ);
    if(LOWN)drawLow(x,px,py,rdx,rdy,camZ);
  }
  const invDet=1/(plX*dirY-dirX*plY),list=[];
  for(const e of ents){if(G.level===7&&(e.y>31)!==(py>31))continue;const fr=frameOf(e);if(!fr)continue;const rx=e.x-px,ry=e.y-py;if(rx*rx+ry*ry>(e.kind==='item'?196:CULL2))continue;const tY=invDet*(-plY*rx+plX*ry);if(tY<.12)continue;list.push({e,fr,tX:invDet*(dirY*rx-dirX*ry),tY});}
  if(G.duel&&!G.duel.boom){const p=duelPos(),rx=p.ex-px,ry=p.ey-py,tY=invDet*(-plY*rx+plX*ry);if(tY>.3)list.push({e:{x:p.ex,y:p.ey},fr:{d:SPR.cabE[(G.duel.eflash>.3)?1:0],sc:5,lift:Math.max(0,(G.duel.end?G.duel.fz||6.6:6.6)-2),tint:false},tX:invDet*(dirY*rx-dirX*ry),tY});}
  if(RF.heli){const h=RF.heli,rx=h.x-px,ry=h.y-py,tY=invDet*(-plY*rx+plX*ry);if(tY>.3)list.push({e:h,fr:{d:SPR.heli[(G.t*22|0)%2],sc:4.4,lift:h.z,nofog:1},tX:invDet*(dirY*rx-dirX*ry),tY});}
  list.sort((a,b)=>b.tY-a.tY);
  for(const s of list)drawSprite(s,camZ,flash);
  lg.putImageData(IMG,0,0);
  const inShop=G.state==='shop';
  if(inShop)drawCase();else drawWeapon();
  tg.imageSmoothingEnabled=false;{const k=(G.state==='play'&&G.shake>0&&!REDUCED)?G.shake*9:0;const jx=k?(Math.random()-.5)*k:0,jy=k?(Math.random()-.5)*k:0;if(G.roll){tg.fillStyle='#000';tg.fillRect(0,0,W,H);tg.save();tg.translate(W/2+jx,H/2+jy);tg.rotate(G.roll);tg.drawImage(LC,-W*.62,-H*.62,W*1.24,H*1.24);tg.restore();}else{if(k){tg.fillStyle='#000';tg.fillRect(0,0,W,H);}tg.drawImage(LC,jx,jy,W,H);}}
  if(inShop)drawShopUI();
  drawTopOverlay();
}
/* balcony railing: a see-through, waist-high strip drawn where the ray leaves the balcony */
function drawRail(x,d,w,camZ){
  if(d<.05)d=.05;const lineH=RPROJ/d,fl=RHOR+camZ*lineH,top=fl-.48*lineH,y0=Math.max(0,Math.ceil(top)),y1=Math.min(RH-1,Math.floor(fl));
  const tx=((w*64)|0)&63,cell=(P.y|0)*MW+(P.x|0);let fog=1-d/FOGD;if(fog<0)fog=0;const f=fog*256;
  const lr=(LR[cell]*f)>>8,lgc=(LG[cell]*f)>>8,lb=(LB[cell]*f)>>8,inv=1/(fl-top);
  for(let y=y0;y<=y1;y++){const ty=(((y-top)*inv*64)|0);const c=(G.level===7?TX.parapet:TX.rail)[(Math.min(63,ty)<<6)|tx];if(c===0)continue;FB[y*RW+x]=sh(c,lr+18,lgc+18,lb+22);}
}
function frameOf(e){const fr=frameOf0(e);if(fr&&SET.diff===2&&e.kind==='enemy'&&!e.dead){const h=HARD.get(fr.d);if(h)return Object.assign({},fr,{d:h});}return fr;}
function frameOf0(e){
  if(e.kind==='prop'&&e.t==='fountain')return {d:SPR.fountain[(G.t*6|0)%2],sc:e.sc};
  if(e.kind==='prop'){if(e.t==='dealer')return {d:(G.state==='shop'&&!G.shopClosing)?SPR.dealerOpen:SPR.dealer,sc:e.sc};if(e.t==='hlamp')return {d:SPR.hlamp,sc:e.sc,lift:CEILH-1.1};return {d:SPR[e.t],sc:e.sc};}
  if(e.kind==='item')return {d:SPR[ITEMS[e.t].spr||e.t],sc:ITEMS[e.t].sc};
  if(e.kind==='proj'&&e.big)return {d:SPR.sunhead,sc:1.4,lift:(e.z||0)};
  if(e.kind==='proj')return e.spr?{d:SPR[e.spr],sc:e.spr==='tracer'?.9:.5,lift:e.z!=null?e.z:.3}:{d:SPR.semki,sc:.35,lift:.45};
  if(e.kind==='fx')return {d:SPR[e.t],sc:.45,lift:.3};
  if(e.kind==='bottle')return {d:SPR.vodkaFly[(e.spin|0)%2],sc:.4,lift:Math.max(0,e.z-.2)};
  if(e.kind==='slipper')return {d:SPR.slipFly[(e.spin|0)%2],sc:.45,lift:.3};
  if(e.kind==='roll')return {d:SPR.vodkaFly[(e.spin|0)%2],sc:.4,lift:0};
  if(e.kind==='fluff')return {d:SPR.fluff,sc:.3,lift:e.z};
  if(e.kind==='puddle')return {d:SPR.puddle,sc:.7};
  if(e.kind==='fire')return {d:SPR.fire[(G.t*8+e.x*3|0)%2],sc:.7};
  if(e.kind==='vent')return e.on?{d:SPR.steam,sc:1.1}:{d:SPR.vent,sc:1,tint:e.temp&&(G.t*10|0)%2===0};
  if(e.kind==='hay')return {d:SPR.hay,sc:.35,lift:e.z};
  if(e.kind==='beacon'){if(!G.brig||G.brig.phase!=='crane'||((G.time*3)|0)%2)return null;return {d:SPR.beacon,sc:1.3,lift:2.2};}
  if(e.kind==='drop'){if(e.t<e.T)return {d:SPR.shadow,sc:.8+.9*(e.t/e.T)};return {d:SPR.slab,sc:1.3,lift:Math.max(0,9*(1-(e.t-e.T)/.3))};}
  if(e.kind==='car'){if(e.dead)return null;return {d:(e.st==='warn'&&((G.time*8)|0)%2===0)||e.st==='go'?SPR.carL[e.c]:SPR.carF[e.c],sc:1.5};}
  if(e.kind==='boomfx')return {d:SPR.boom[((e.f||0)+(G.t*10|0))%2],sc:e.sc,lift:e.z||0};
  if(e.kind==='npc'&&e.talk==='bar')return {d:(G.state==='shop'&&!G.shopClosing)?SPR.dealerOpen:SPR.dealer,sc:e.sc};
  if(e.kind==='npc')return {d:e.walk&&e.moving?SPR[e.spr+(((e.wk|0)%2)?'walk1':'walk2')]:SPR[e.spr],sc:e.sc};
  if(e.kind==='enemy'&&KINDS[e.k].rf)return rfFrame(e);
  if(e.kind==='enemy'&&e.k==='bb'){const g=e.gs,p=g==='sit'?(e.sus>0&&!e.bribed?'sitQ':'sit'):g==='swingWind'?'swing':g==='up'?((G.t*3|0)%2?'shoutX':'shout'):(e.lectT>0?'shout':'stand');return {d:SPR.bb[p],sc:1,tint:g==='swingWind'};}
  if(e.kind==='enemy'){if(e.hidden)return null;const K=KINDS[e.k],S=(e.k==='mg'&&!(e.box>0))?SPR.mgB:(e.k==='dv'&&e.phase2)?SPR.dv2:(e.k==='kc'&&e.phase2)?SPR.kc2:(e.k==='bt'&&e.phase2)?SPR.bt2:SPR[e.k];let p;
    if(e.dead)p='dead';else if(e.stumble>0)p='squat';else if(e.state==='eat'||e.griefT>0)p='stand';else if(e.state==='leap')p='leap';else if(G.cut&&e.k==='dv'&&G.cut.t<1.25)p='spit';else if(e.state==='poundWind'||e.state==='grabHold'||e.state==='sweepWind'||e.state==='spinWind')p='attack';else if(e.state==='sprayWind'||e.state==='callWind'||e.state==='aimWind'||e.state==='reload'||e.state==='stream'||e.state==='lobWind')p='spit';else if(e.state==='spin')p=((G.t*20|0)%2)?'walk1':'walk2';else if(e.state==='grabLunge')p=((G.t*14|0)%2)?'walk1':'walk2';else if(e.state==='chargeWind')p='attack';else if(e.state==='charge')p=((G.t*14|0)%2)?'walk1':'walk2';else if(e.state==='brawl')p=e.swing?'attack':((e.walk|0)%2?'walk1':'walk2');else if(e.state==='lure'&&e.atLure)p=(e.k==='sq'||e.k==='dn')?'squat':'stand';else if(!e.alert)p=e.k==='sp'?((G.t*.7+e.id)%2<1?'stand':'spit'):K.idle;
    else if(e.state==='wake')p=e.k==='sq'&&e.t>.2?'squat':'stand';else if(e.state==='attack')p=(K.ranged||(K.thrower&&!e.rage))?'spit':'attack';
    else p=((e.walk|0)%2)?'walk1':'walk2';
    if(e.k==='sw'&&!e.dead)p=e.seated?'sit':(e.state==='cWind'||e.state==='attack'||e.state==='stompUp')?'attack':(e.state==='throwWind'||e.state==='swig'||e.state==='whistle')?'spit':e.state==='dizzy'?'squat':e.state==='charge'?(((G.t*14)|0)%2?'walk1':'walk2'):p;
    return {d:S[p]||S.stand,sc:K.scale,lift:e.z||0,tint:(e.pain>0||e.state==='chargeWind'||e.state==='cWind'||e.state==='aimWind'||e.state==='sweepWind'||e.state==='spinWind'||e.state==='poundWind'||e.state==='sprayWind'||(e.rage&&(G.t*6|0)%2===0))&&!e.dead};}
  return null;
}
/* low see-over geometry (стройка pipes, joints, slab stacks, pallets): boxes inside a cell, painted far→near over the column */
const LOWB={68:[.44,.56,0,1,.45,2],69:[0,1,.44,.56,.45,1],70:[0,1,0,1,2,0],51:[0,1,.28,.72,.46,1],52:[.28,.72,0,1,.46,2],53:[0,1,0,1,.58,0],54:[.02,.98,.02,.98,.42,0],55:[.08,.92,.08,.92,.5,0],57:[0,1,0,1,1,0],49:[0,1,0,1,1,0],2:[0,1,0,1,1.4,0],99:[0,1,0,1,1.4,0,1],60:[0,1,0,1,1.3,0],61:[0,1,0,1,1.3,0],65:[0,1,0,1,1.3,0],62:[0,1,0,1,1.3,0,0],63:[0,1,0,1,1.6,0],64:[0,1,0,1,1.4,0]};
function lowTex(t,top,end,ci){if(t===70)return top?TX.siloC:TX.siloW;if(t===68||t===69)return TX.railing;if(t===60)return top?TX.groof:TX.gwall;if(t===65)return top?TX.groof:TX.gdoorS;if(t===61||t===62)return top?TX.groof:TX.gdoor[((((ci%MW)/3)|0)*7+(((ci/MW)|0))*3)%5];if(t===63)return TX.ggate;if(t===64)return TX.plita;if(t===57)return TX.fence;if(t===49)return TX.fbrick;if(t===2||t===99)return TX.brick;if(t===51||t===52)return top?TX.pipeT:end?TX.pipeE:TX.pipeS;if(t===53)return top?TX.jointT:TX.jointS;if(t===54)return top?TX.slabT:TX.slabS;return top?TX.palT:TX.palS;}
function drawLow(x,px,py,rdx,rdy,camZ){
  for(let k=LOWN-1;k>=0;k--){const ci=LOWC[k],t=LOWT[k],B=LOWB[t];if(!B)continue;const cx=ci%MW,cy=(ci/MW)|0,rm=(t===68||t===69)?RAILM[ci]:-1,bx0=cx+(t===69&&!(rm&4)?.44:B[0]),bx1=cx+(t===69&&!(rm&8)?.56:B[1]),by0=cy+(t===68&&!(rm&1)&&rm>0?.44:B[2]),by1=cy+(t===68&&!(rm&2)&&rm>0?.56:B[3]),h=t===70?WH12[ci]*.5:B[4],ax=B[5],z0=t===62?Math.min(1,doorOpen[ci]*1.15):(B[6]||0);if(z0>=h-.01)continue;
    let tx0,tx1,ty0,ty1;
    if(rdx!==0){const a=(bx0-px)/rdx,b=(bx1-px)/rdx;tx0=a<b?a:b;tx1=a<b?b:a;}else{if(px<bx0||px>bx1)continue;tx0=-1e9;tx1=1e9;}
    if(rdy!==0){const a=(by0-py)/rdy,b=(by1-py)/rdy;ty0=a<b?a:b;ty1=a<b?b:a;}else{if(py<by0||py>by1)continue;ty0=-1e9;ty1=1e9;}
    const tn=tx0>ty0?tx0:ty0,tf=tx1<ty1?tx1:ty1;if(tn>=tf||tn<.03)continue;
    const face=tx0>ty0?0:1,endF=(ax===1&&face===0)||(ax===2&&face===1);
    let front=true;if(endF){const pt=TILE[LOWP[k]];if(pt>=51&&pt<=53)front=false;if(t>=68&&t<=69&&(pt===68||pt===69))front=false;}
    let fog=1-tn/FOGD;if(fog<0)fog=0;const fogI=fog*256,sd=face===1?.78:1,inner=(t===60||t===61)&&ZONE[LOWP[k]]===Z_HALL,lc=inner?LOWP[k]:ci;
    const lr=((LR[lc]*fogI)>>8),lg=((LG[lc]*fogI)>>8),lb=((LB[lc]*fogI)>>8);
    const ls=RPROJ/tn,yb=RHOR+(camZ-z0)*ls,yt=RHOR+(camZ-h)*ls;let topY=RH;let hA=1e9,hB=-1e9;if(tn>BIN[x]+.01){hA=BYA[x];hB=RHOR-(1-camZ)*RPROJ/Math.min(tn,BEX[x]);}
    if(front){const tex=inner?TX.gint:lowTex(t,false,endF,ci),w=face===0?py+tn*rdy:px+tn*rdx;let u;
      if(t>=68&&t<=69&&!endF)u=w-Math.floor(w);else if(endF||t>=53)u=face===0?(w-by0)/(by1-by0):(w-bx0)/(bx1-bx0);else u=w-Math.floor(w);
      let tu=(u*64)|0;if(tu<0)tu=0;if(tu>63)tu=63;
      const y0=t===70?Math.max(0,Math.ceil(RHOR+(camZ-h+hash2(((w*4)|0)+ci*13,ci)*.4)*ls)):Math.max(0,Math.ceil(yt)),y1=Math.min(RH-1,Math.floor(yb)),inv=1/(yb-yt),r0=(lr*sd)|0,g0=(lg*sd)|0,b0=(lb*sd)|0;
      const tile=t===70,isR=t===68||t===69;for(let y=y0;y<=y1;y++){if(y>=hA&&y<hB)continue;let ty;if(tile){const zz=(yb-y)/ls;ty=63-(((zz-Math.floor(zz))*64)|0);if(ty<0)ty=0;}else{ty=(((y-yt)*inv)*64)|0;}if(ty>63)ty=63;const c=tex[(ty<<6)|tu];if(c===0)continue;FB[y*RW+x]=sh(c,r0,g0,b0);if(isR&&tn<RZ[y*RW+x])RZ[y*RW+x]=tn;}
      if(y0<topY)topY=y0;}
    if(camZ>h){const tex=lowTex(t,true,false,ci),yf=RHOR+(camZ-h)*RPROJ/tf,y0=Math.max(0,Math.ceil(yf)),y1=Math.min(RH-1,Math.floor(yt)),kz=(camZ-h)*RPROJ;
      const r0=Math.min(400,lr*1.12)|0,g0=Math.min(400,lg*1.12)|0,b0=Math.min(400,lb*1.12)|0;
      for(let y=y0;y<=y1;y++){if(y>=hA&&y<hB)continue;const dy=y-RHOR;if(dy<=0)continue;const tt=kz/dy,wx=px+tt*rdx,wy=py+tt*rdy;let u,v;
        if(ax===2){u=wy-Math.floor(wy);v=(wx-bx0)/(bx1-bx0);}else if(ax===1){u=wx-Math.floor(wx);v=(wy-by0)/(by1-by0);}else{u=(wx-bx0)/(bx1-bx0);v=(wy-by0)/(by1-by0);}
        let tu=(u*64)|0,tv=(v*64)|0;if(tu<0)tu=0;if(tu>63)tu=63;if(tv<0)tv=0;if(tv>63)tv=63;const c=tex[(tv<<6)|tu];if(c===0)continue;FB[y*RW+x]=sh(c,r0,g0,b0);}
      if(y0<topY)topY=y0;}
    if(t===99||(t===62&&z0>.05)){if(BIN[x]<1e8&&topY<BYA[x])BYA[x]=topY;if(t===99)continue;if(z0>=.95)continue;}
    if(t===68||t===69)continue;if(tn<LOWD[x])LOWD[x]=tn;if(topY<LOWY[x])LOWY[x]=topY;}
}
function drawSprite(s,camZ,flash){
  if(!s.fr||!s.fr.d)return;const fr=s.fr,tY=s.tY,sc=fr.sc,lift=fr.lift||0,e=s.e;
  const scrX=(RW/2)*(1+s.tX/tY),size=RPROJ/tY*sc,fl=RHOR+camZ*RPROJ/tY-lift*RPROJ/tY,top=fl-size,left=scrX-size/2;
  const x0=Math.max(0,Math.ceil(left)),x1=Math.min(RW-1,Math.floor(left+size)),y0=Math.max(0,Math.ceil(top)),y1=Math.min(RH-1,Math.floor(fl));
  if(x0>x1||y0>y1)return;
  const cell=Math.max(0,Math.min(N-1,(e.y|0)*MW+(e.x|0)));
  let fog=fr.nofog?1:1-tY/FOGD;if(fog<0)fog=0;const fogI=fog*256,fI=flash>0?flash*Math.max(0,1-tY/7)*190:0;
  let lr=((LR[cell]*fogI)>>8)+fI,lgc=((LG[cell]*fogI)>>8)+fI*.85,lb=((LB[cell]*fogI)>>8)+fI*.6;
  if(TORCH){const ts=230*TCOL[Math.max(0,Math.min(RW-1,scrX|0))]*Math.max(0,1-tY/10)*.9;lr+=ts;lgc+=ts*.95;lb+=ts*.8;}
  if(fr.nofog){const L=90+(G.dawn||0)*140;lr=L;lgc=L*.9;lb=L*.92;}
  if(fr.tint){lr=lr*1.7+70;lgc*=.45;lb*=.45;}
  const shk=HZ&&!fr.nofog?1-fog:0,shr=shk*178,shg=shk*196,shb=shk*214;lr|=0;lgc|=0;lb|=0;const fe=Math.min(256,fogI*1.6+30)|0,d=fr.d,inv=64/size;
  for(let x=x0;x<=x1;x++){let yL=tY>LOWD[x]?Math.min(y1,LOWY[x]-1):y1;if(tY>=ZB[x]){if(ZT[x]<=y0)continue;yL=Math.min(yL,ZT[x]-1);}const tx=((x-left)*inv)|0;if(tx<0||tx>63)continue;let hA=1e9,hB=-1e9;if(tY>BIN[x]){hA=BYA[x];hB=RHOR-(1-camZ)*RPROJ/Math.min(tY,BEX[x]);}
    for(let y=y0;y<=yL;y++){if(y>=hA&&y<hB)continue;const ty=((y-top)*inv)|0;if(ty<0||ty>63)continue;const c=d[(ty<<6)|tx];if(c===0)continue;if(RZON&&RZ[y*RW+x]<tY)continue;FB[y*RW+x]=(c>>>24)===254?sh(c,fe,fe,fe):sh(c,lr,lgc,lb);if(shk)FB[y*RW+x]=hzA(FB[y*RW+x],shr,shg,shb);}}
}
function drawWeapon(){
  if(G.state==='menu'||G.state==='dead'||G.cut||(G.rc&&G.rc.lock)||G.duel)return;
  const cell=(P.y|0)*MW+(P.x|0);const br=Math.max(.35,Math.min(1.4,(LR[cell]+LG[cell]+LB[cell])/(3*256)*1.25+G.flash*.5));
  let img,mx=0,my=0,fl=null,fy=0;
  if(P.w===0){img=(P.punch&&P.anim<.2)?HUD.punch:HUD.fist;}
  else if(P.w===1){img=HUD.pm;if(P.anim<.07){fy=6;fl=HUD.flashS;mx=88;my=34;}}
  else if(P.w===3){const out=ents.some(s=>s.kind==='slipper'&&!s.dead)&&!(UP.tapok2&&ents.filter(s=>s.kind==='slipper'&&!s.dead).length<2);img=out?HUD.fist:HUD.tapok;}
  else{img=HUD.obrez;if(P.anim<.1){fy=10;fl=HUD.flashL;mx=81;my=18;}else if(P.anim>.3&&P.anim<.85)fy=Math.sin((P.anim-.3)/.55*Math.PI)*34;}
  const bx=W/2-80+Math.sin(P.bob)*7*P.bobAmt,by=H-120+Math.abs(Math.cos(P.bob))*6*P.bobAmt+P.switchT*220+P.throwT*160+fy;
  lg.filter='brightness('+br.toFixed(2)+')';lg.drawImage(img,Math.round(bx/PX),Math.round(by/PX),Math.round(160/PX),Math.round(120/PX));lg.filter='none';
  if(fl)lg.drawImage(fl,Math.round((bx+mx-fl.width/2)/PX),Math.round((by+my-fl.height/2)/PX),Math.round(fl.width/PX),Math.round(fl.height/PX));
}
/* ---------- SHOP RENDER (case art pixelated with the scene, UI crisp on top) ---------- */
const [SC,scg]=cv(W,H);let shakeX=0;
function eggCrate(g,x0,y0,w,h,c){for(let y=y0+2;y<y0+h-2;y+=5)for(let x=x0+2+((y/5|0)%2)*2;x<x0+w-2;x+=5)R(g,c,x,y,2,2);}
function drawSlot(g,i){
  const r=slotRect(i),it=SH()[i];
  R(g,'#0d0c0e',r.x,r.y,r.w,r.h);R(g,'#060507',r.x,r.y,r.w,3);R(g,'#26222a',r.x,r.y+r.h-1,r.w,1);
  if(PER()===4)g.drawImage(ART[it.id],r.x+2,r.y+6);else g.drawImage(ART[it.id],r.x+1,r.y+10,48,48);
  if(shopOwned(it)&&!it.multi){g.fillStyle='rgba(0,0,0,.5)';g.fillRect(r.x,r.y,r.w,r.h);}
  R(g,'#8a8272',r.x+r.w-18,r.y+r.h-21,1,7);R(g,'#e8e1cf',r.x+r.w-32,r.y+r.h-15,30,12);R(g,'#b8ae98',r.x+r.w-32,r.y+r.h-4,30,1);
  if(G.hover===i&&!G.dolly){g.strokeStyle=WARN;g.lineWidth=2;g.strokeRect(r.x-2,r.y-2,r.w+4,r.h+4);}
}
function drawCase(){
  const g=scg;g.clearRect(0,0,W,H);
  const e=Math.max(0,Math.min(1,G.shopT)),ease=1-Math.pow(1-e,3);
  shakeX=G.shake>0?Math.sin(G.t*70)*G.shake*10:0;
  g.save();g.translate(shakeX,(1-ease)*70);
  const d=G.dolly;
  if(d){const t=d.t*d.t*(3-2*d.t),r=slotRect(d.slot),sx=r.x+r.w/2,sy=r.y+r.h/2,s=1+t*1.5;
    g.translate(200+(110-200)*t,120);g.scale(s,s);g.translate(-(200+(sx-200)*t),-(120+(sy-120)*t));}
  /* base */
  R(g,'#3e2616',26,112,348,126);R(g,'#4a2e1a',30,114,340,120);
  for(let x=34;x<366;x+=6){R(g,'#8a6a42',x,118,3,1);R(g,'#8a6a42',x,229,3,1);}
  R(g,'#1b191c',40,124,320,100);eggCrate(g,40,124,320,100,'#231f25');
  R(g,'#c9a54a',96,228,22,8);R(g,'#8a6a2a',96,234,22,2);R(g,'#c9a54a',282,228,22,8);R(g,'#8a6a2a',282,234,22,2);
  for(let i=PER();i<SH().length;i++)drawSlot(g,i);
  /* lid unfolds from the hinge */
  g.save();g.translate(0,116);g.scale(1,Math.max(.04,ease));g.translate(0,-116);
  R(g,'#3e2616',26,2,348,114);R(g,'#4a2e1a',30,6,340,108);
  for(let x=34;x<366;x+=6){R(g,'#8a6a42',x,10,3,1);R(g,'#8a6a42',x,110,3,1);}
  R(g,'#211e22',40,14,320,96);eggCrate(g,40,14,320,96,'#2a262c');
  for(let i=0;i<Math.min(PER(),SH().length);i++)drawSlot(g,i);
  g.restore();
  R(g,'#2a1a10',26,111,348,6);R(g,'#c9a54a',78,110,16,8);R(g,'#c9a54a',306,110,16,8);R(g,'#f0d890',78,110,16,1);R(g,'#f0d890',306,110,16,1);
  g.restore();
  lg.fillStyle='rgba(0,0,0,'+(.6*ease).toFixed(3)+')';lg.fillRect(0,0,RW,RH);
  lg.imageSmoothingEnabled=false;lg.drawImage(SC,0,0,RW,RH);
}
function drawShopUI(){
  const g=tg,d=G.dolly,ready=G.shopT>=1&&!G.shopClosing;
  stxt(g,'РУБ '+G.rub,10,8,VFD);
  if(G.shopMsgT>0)stxt(g,G.shopMsg,390,8,WARN,'right');
  else if(ready&&!d&&G.hover>=0)stxt(g,SH()[G.hover].name,390,8,'#e8e2d2','right');
  if(ready&&!d){for(let i=0;i<SH().length;i++){const r=slotRect(i),it=SH()[i],own=shopOwned(it);
      const lab=own?(it.multi?'МАКС':'ЕСТЬ'):String(it.price);
      txt(g,lab,r.x+r.w-17+shakeX,r.y+r.h-13,own?'#5a2a22':(G.rub<it.price?'#b0301e':'#2a2218'),'center');
      if(it.multi)stxt(g,'x'+it.count(),r.x+3,r.y+4,'#e8e2d2','left',6);}}
  if(d&&d.t>=1&&!d.out){
    const it=SH()[d.slot],own=shopOwned(it),poor=G.rub<it.price;
    R(g,'#b8ae98',CARD.x+3,CARD.y+3,CARD.w,CARD.h);R(g,'#e8e1cf',CARD.x,CARD.y,CARD.w,CARD.h);R(g,'#d6ceb8',CARD.x,CARD.y,CARD.w,4);
    R(g,'#8a8272',CARD.x+CARD.w/2-2,CARD.y+8,4,4);
    txt(g,it.name,CARD.x+10,CARD.y+18,'#2a2218');R(g,'#b8ae98',CARD.x+10,CARD.y+30,CARD.w-20,1);
    it.desc.forEach((l,i)=>txt(g,l,CARD.x+10,CARD.y+38+i*12,'#4a4030'));
    txt(g,it.price+' РУБ',CARD.x+10,CARD.y+84,poor&&!own?'#b0301e':'#2a2218','left',16);
    if(it.multi)txt(g,'В КАРМАНЕ: '+it.count()+'/'+it.cap(),CARD.x+10,CARD.y+108,'#4a4030');
    if(own&&!it.multi){g.save();g.translate(CARD.x+CARD.w/2,CARD.y+112);g.rotate(-.18);g.strokeStyle='#b0301e';g.lineWidth=2;g.strokeRect(-34,-10,68,20);txt(g,'ЕСТЬ',0,-4,'#b0301e','center');g.restore();}
    const hb=inR(G.hand,BUYB),hk=inR(G.hand,BACKB);
    R(g,own?'#3a3a36':hb?'#2a4a3e':'#1e2e29',BUYB.x,BUYB.y,BUYB.w,BUYB.h);txt(g,own?(it.multi?'МАКС':'ЕСТЬ'):'КУПИТЬ',BUYB.x+BUYB.w/2,BUYB.y+7,own?'#8a8a80':VFD,'center');
    R(g,hk?'#5a4e3a':'#3a342a',BACKB.x,BACKB.y,BACKB.w,BACKB.h);txt(g,'НАЗАД',BACKB.x+BACKB.w/2,BACKB.y+6,'#e8e1cf','center');
  }
  /* the hand: arm reaches in from the bottom-right, finger is the cursor */
  const hx=G.hand.x|0,hy=(G.hand.y-(G.pokeT>0?6:0))|0;
  poly(g,SLV,[[hx-2,hy+60],[hx+27,hy+60],[hx+140,H+60],[hx+40,H+60]]);poly(g,SLVD,[[hx+22,hy+60],[hx+27,hy+60],[hx+140,H+60],[hx+128,H+60]]);
  g.drawImage(ART.hand,hx-16,hy-1);
}
function txt(g,s,x,y,c,al,sz){g.font=(sz||8)+'px "Press Start 2P", monospace';g.textAlign=al||'left';g.textBaseline='top';g.fillStyle=c;g.fillText(s,x,y);}
function stxt(g,s,x,y,c,al,sz){txt(g,s,x+1,y+1,'rgba(0,0,0,.8)',al,sz);txt(g,s,x,y,c,al,sz);}
function drawTopOverlay(){
  const g=tg;
  if(G.hurt>0){g.fillStyle='rgba(160,18,8,'+(G.hurt*.45).toFixed(3)+')';g.fillRect(0,0,W,H);}
  if(G.face&&G.state==='play')drawFaceSpider(g,G.face);
  if(G.goo>0){g.save();g.globalAlpha=Math.min(1,G.goo);const r=rng(7);for(let i=0;i<14;i++){g.fillStyle=i%2?'#4a7a1a':'#6a9a2a';g.beginPath();g.arc(r()*W,r()*H,8+r()*26,0,7);g.fill();}g.restore();}
  if(P.bleed>0&&G.state==='play'){g.fillStyle='rgba(150,10,6,.35)';g.fillRect(0,0,10,H);g.fillRect(W-10,0,10,H);}
  if(G.bonus>0){g.fillStyle='rgba(240,190,80,'+(G.bonus*.22).toFixed(3)+')';g.fillRect(0,0,W,H);}
  if(G.state==='play'||G.state==='lift'){
    if(!G.cut&&!(G.rc&&G.rc.lock)){g.fillStyle='rgba(235,230,215,.55)';g.fillRect(199,119,2,2);}
    if(G.msgT>0)stxt(g,G.msg,6,6,G.msgT<.5?'rgba(232,226,210,.5)':'#e8e2d2');
    if(G.state==='play'&&G.bossOn){let i=0;for(const e of ents)if(e.kind==='enemy'&&KINDS[e.k].bro){const x=i?214:56,K=KINDS[e.k];
        stxt(g,K.name+(e.rage?' !':''),x+65,8,e.dead?DIM:(e.rage?DANGER:WARN),'center');R(g,'#1a0a08',x,20,130,5);if(!e.dead)R(g,e.rage?DANGER:'#d86a3a',x,20,Math.max(0,e.hp/e.max)*130|0,5);i++;}}
    if(G.clearT>0){g.save();g.globalAlpha=Math.min(1,G.clearT);R(g,'rgba(6,8,10,.75)',70,78,260,58);stxt(g,'ПОДЪЕЗД ЗАЧИЩЕН',200,88,VFD,'center',16);stxt(g,'КЛЮЧ ОТ ПОДВАЛА',200,114,WARN,'center');g.restore();}
    if(G.state==='play')for(const e of ents)if(e.kind==='enemy'&&KINDS[e.k].boss&&e.alert&&!e.dead){stxt(g,e.phase2?(KINDS[e.k].name+' В ЯРОСТИ'):(KINDS[e.k].name||'БАТЯ'),200,10,e.phase2?'#ff7a2a':DANGER,'center');R(g,'#1a0a08',130,22,140,5);R(g,DANGER,130,22,Math.max(0,e.hp/e.max)*140|0,5);}
  }
  if(G.state==='lift'&&G.statsT>0){
    g.save();g.globalAlpha=Math.min(1,G.statsT);R(g,'rgba(6,8,10,.72)',112,34,176,92);
    stxt(g,'ЭТАЖ ПРОЙДЕН',200,42,VFD,'center');
    stxt(g,'ГОПНИКИ  '+G.kills+'/'+G.killTotal,200,62,'#d8d4c8','center');stxt(g,'НАХОДКИ  '+G.items+'/'+G.itemTotal,200,76,'#d8d4c8','center');
    stxt(g,'ТАЙНИКИ  '+G.secrets+'/'+G.secretTotal,200,90,'#d8d4c8','center');stxt(g,'ВРЕМЯ    '+fmtTime(G.winTime),200,104,'#d8d4c8','center');g.restore();}
  if(G.state==='menu'){
    g.fillStyle='rgba(6,8,10,'+(G.page==='settings'?.15:.45)+')';g.fillRect(0,0,W,H);
    if(G.page==='settings'){stxt(g,'ПРЕДПРОСМОТР · '+SETS[0].vals[SET.px],200,10,'#d8d4c8','center');}
    else{g.font='44px "Russo One", "Arial Black", sans-serif';g.textAlign='center';g.textBaseline='middle';
      g.fillStyle='rgba(0,0,0,.7)';g.fillText('ПАНЕЛЬКА',203,93);g.fillStyle=WARN;g.fillText('ПАНЕЛЬКА',200,90);
      stxt(g,LNAME[G.menuLvl||1]||'ДОМ 9 · ЭТАЖ 1',200,124,'#d8d4c8','center');}
  }
  if(G.state==='pause'){g.fillStyle='rgba(6,8,10,'+(G.page==='settings'?.15:.6)+')';g.fillRect(0,0,W,H);if(G.page!=='settings')stxt(g,'ПАУЗА',200,108,WARN,'center',16);}
  if(G.state==='dead'){g.fillStyle='rgba(90,6,4,'+Math.min(.6,G.deadT*.5).toFixed(3)+')';g.fillRect(0,0,W,H);if(G.deadT>.6)stxt(g,G.dropDead?'СОРВАЛСЯ':'ТЕБЯ УЛОЖИЛИ',200,104,DANGER,'center',16);}
  if(G.state==='win'){g.fillStyle='rgba(6,8,10,.82)';g.fillRect(0,0,W,H);
    if(G.level===11){stxt(g,'ГАРАЖИ ПРОЙДЕНЫ',200,60,VFD,'center',16);stxt(g,'КООПЕРАТИВ ЗАКРЫТ',200,92,WARN,'center',16);stxt(g,'СЕКРЕТЫ: '+G.secrets+'/1',200,112,G.secrets?VFD:'#d8d4c8','center');stxt(g,'ДАЛЬШЕ — СКОРО',200,130,'#d8d4c8','center');stxt(g,'ДАЛЬШЕ — СНОВА ДОМ 9',200,146,'#d8d4c8','center');}
    else if(G.level===10){stxt(g,'СТРОЙКА СДАНА',200,60,VFD,'center',16);stxt(g,'ОБРЕЗ ВЕРНУЛСЯ',200,92,WARN,'center',16);stxt(g,'ДАЛЬШЕ — СКОРО',200,126,'#d8d4c8','center');stxt(g,'ДАЛЬШЕ — СНОВА ДОМ 9',200,146,'#d8d4c8','center');}
    else if(G.level===9){stxt(g,'СТРОЙКА',200,60,VFD,'center',16);stxt(g,'СКОРО',200,92,WARN,'center',16);stxt(g,'КРАНЫ СТОЯТ. БРИГАДИР ЖДЁТ.',200,126,'#d8d4c8','center');stxt(g,'ДАЛЬШЕ — СНОВА ДОМ 9',200,146,'#d8d4c8','center');}
    else if(G.level===7){stxt(g,'ДОМ 11 ПРОЙДЕН',200,64,VFD,'center',16);stxt(g,'С КРЫШИ — В СЕНО. ОСТАЛСЯ ПМ',200,98,WARN,'center');stxt(g,'УЛИЦА — СКОРО',200,126,'#d8d4c8','center');stxt(g,'ДАЛЬШЕ — СНОВА ДОМ 9',200,146,'#d8d4c8','center');}
    else if(G.level>=4){stxt(g,'ДОМ 11 · ЭТАЖ 2',200,70,VFD,'center',16);stxt(g,'КРЫША — СКОРО',200,104,WARN,'center');
      stxt(g,'ДАЛЬШЕ — СНОВА ДОМ 9,',200,138,'#d8d4c8','center');stxt(g,'С РУБЛЯМИ И АПГРЕЙДАМИ',200,152,'#d8d4c8','center');}
    else{stxt(g,G.level===3?'ПОДВАЛ ПРОЙДЕН':'ДОМ 9 ЗАЧИЩЕН',200,70,VFD,'center',16);stxt(g,'ДАЛЬШЕ — ДОМ 11',200,104,WARN,'center');
      stxt(g,'РУБЛИ, АПГРЕЙДЫ И ПАТРОНЫ',200,138,'#d8d4c8','center');stxt(g,'ОСТАЮТСЯ С ТОБОЙ',200,152,'#d8d4c8','center');}}
  if(G.cut){const k=Math.min(1,G.cut.t*3);R(g,'#000',0,0,W,26*k);R(g,'#000',0,H-26*k,W,26*k);}
  if(G.duel&&(G.state==='play'||G.state==='pause'))drawDuelGun(g);
  if(G.level===10&&G.brig&&G.brig.phase==='crane'&&!G.duel&&G.state==='play')drawCraneHint(g);
  if(G.level===10&&G.breach&&!G.duel&&G.state==='play')drawCraneHint(g,BREACH.x+.5,13.5,'ПРОЛОМ');
  if(G.level===7&&(G.state==='play'||G.state==='pause')){for(const r of RF.rain){if(r.t<0)continue;const c=sprCv(r.k),s=56*r.s;g.save();g.translate(r.x,r.y);g.rotate(r.rot);g.drawImage(c,-s/2,-s*.85,s,s);g.restore();}
    const rc=G.rc;if(rc&&rc.ph==='land'){const k=Math.min(1,rc.t*2.5),r=rng(55),HC=['#e8cc6a','#caa640','#f0d878','#a88a2e'];
      for(let i=0;i<26;i++){const x=((i*53+rc.t*18*(i%3+1))%W),y=((rc.t*38*(1+i%4)+i*37)%H);R(g,HC[i%4],x|0,y|0,3,1);R(g,HC[(i+1)%4],(x+1)|0,(y+1)|0,1,2);}
      g.fillStyle='#9a7a24';g.beginPath();g.moveTo(0,H);for(let x=0;x<=W;x+=16)g.lineTo(x,H-(46+r()*26)*k);g.lineTo(W,H);g.closePath();g.fill();
      g.lineWidth=2;for(let i=0;i<110;i++){const x=r()*W,side=i<16,h2=(30+r()*70)*k;g.strokeStyle=HC[(r()*4)|0];g.beginPath();if(side){const sx=i%2?0:W;g.moveTo(sx,H*.3+r()*H*.7);g.lineTo(sx+(i%2?1:-1)*(20+r()*50)*k,H*.2+r()*H*.6);}else{g.moveTo(x,H);g.lineTo(x+(r()-.5)*40,H-h2);}g.stroke();}}
    if(rc&&rc.lock){R(g,'#000',0,0,W,22);R(g,'#000',0,H-22,W,22);if(G.barkT>0)stxt(g,G.bark,200,H-17,'#e8e2d2','center');}
    if(rc&&rc.fade>0){g.fillStyle='rgba(0,0,0,'+Math.min(1,rc.fade).toFixed(3)+')';g.fillRect(0,0,W,H);}}
  if(G.state==='breaker'&&G.brk)drawBreakerTop(g);
  if(G.state==='keypad'&&G.kp)drawKeypadTop(g);
  if(G.page==='note')drawNote(g,NOTES[G.noteI]);
  if(G.trans){const T=G.trans,a=T.t<T.dur?T.t/T.dur:Math.max(0,2-T.t/T.dur);g.fillStyle='rgba(0,0,0,'+Math.min(1,a).toFixed(3)+')';g.fillRect(0,0,W,H);}
}
/* the spider on your face: big, twitching, eyes, fangs. Three shots and it's off. */
function drawFaceSpider(g,f){
  const t=f.t,cx=200+Math.sin(t*23)*4,cy=150+Math.cos(t*19)*3,s=1+Math.sin(t*12)*.03+(f.hitT>0?.06:0);
  g.fillStyle='rgba(0,0,0,.45)';g.fillRect(0,0,W,H);
  g.strokeStyle='#120c0a';g.lineCap='round';
  for(let i=0;i<4;i++)for(const sd of [-1,1]){const a=(-.9+i*.55)+Math.sin(t*9+i)*.08,kx=cx+sd*Math.cos(a)*150*s,ky=cy+Math.sin(a)*120*s-40;
    g.lineWidth=16-i*2;g.beginPath();g.moveTo(cx+sd*30,cy);g.lineTo(kx,ky);g.lineTo(kx+sd*60,ky+160);g.stroke();
    g.strokeStyle='#2a1c16';g.lineWidth=3;g.beginPath();g.moveTo(cx+sd*30,cy);g.lineTo(kx,ky);g.stroke();g.strokeStyle='#120c0a';}
  g.fillStyle='#140e0c';g.beginPath();g.ellipse(cx,cy+40,125*s,95*s,0,0,7);g.fill();
  g.fillStyle='#1c1412';g.beginPath();g.ellipse(cx,cy-20,80*s,60*s,0,0,7);g.fill();
  const r=rng(9);g.fillStyle='#3a2a22';for(let i=0;i<260;i++){const a=r()*7,d=r()*110;g.fillRect(cx+Math.cos(a)*d*s,cy+20+Math.sin(a)*d*.8*s,2,3);}
  for(const [ex,ey,er] of [[-38,-40,11],[-14,-50,14],[14,-50,14],[38,-40,11],[-26,-18,7],[26,-18,7],[-8,-28,6],[8,-28,6]]){
    g.fillStyle='#8a0a06';g.beginPath();g.arc(cx+ex*s,cy+ey*s,er,0,7);g.fill();g.fillStyle='#ff2a1a';g.beginPath();g.arc(cx+ex*s,cy+ey*s,er*.7,0,7);g.fill();
    g.fillStyle='#ffd0c0';g.fillRect(cx+ex*s-er*.4,cy+ey*s-er*.5,er*.35,er*.35);}
  g.fillStyle='#d8c8b0';for(const sd of [-1,1]){g.beginPath();g.moveTo(cx+sd*14,cy+4);g.lineTo(cx+sd*30,cy+10);g.lineTo(cx+sd*8,cy+62+Math.sin(t*20)*6);g.closePath();g.fill();}
  g.fillStyle='rgba(120,200,60,.8)';for(let i=0;i<f.hits;i++){g.beginPath();g.arc(cx-60+i*60,cy+60,18,0,7);g.fill();}
  stxt(g,'СТРЕЛЯЙ!  '+(3-f.hits),200,222,'#ff5a3a','center');
}
function fmtTime(t){t=t|0;return String((t/60)|0).padStart(2,'0')+':'+String(t%60).padStart(2,'0');}

