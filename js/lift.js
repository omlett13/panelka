'use strict';
/* ---------- ELEVATOR ---------- */
function transition(mid,dur){G.trans={t:0,dur:dur||.45,mid,fired:false};}
function enterLift(){
  G.winTime=G.time;keys.clear();mouseFire=false;sfx.ding();sfx.doorsShut();
  transition(()=>{Object.assign(P,{x:LIFT_SPAWN.x,y:LIFT_SPAWN.y,a:LIFT_SPAWN.a,camZ:.5,bobAmt:0});G.state='lift';G.statsT=4.5;G.hiT=1.1;G.rideDing=false;G.bark='';G.barkT=0;G.msgT=0;lure=null;
    ents=ents.filter(e=>e.kind==='prop'||e.kind==='enemy'||e.kind==='item');exitLock();},.5);
}
function dealerSay(s){G.bark='БАРЫГА: «'+s+'»';G.barkT=2.8;sfx.bark(125);}
function liftBroken(){if(G.liftBreak>0)return;G.liftBreak=4.4;sfx.clunk();sfx.hiss();G.shake=.3;msg('ЛИФТ СЛОМАН');dealerSay('Второй этаж? Лифт до второго не ходит. Пешком давай, по лестнице.');}
function floorLabel(l){return l===3?'-1':l===4?'1':String(l);}
function rideTo(){const T=G.rideTarget;return T===3?'-1':T===2?'2':G.level===4?'2':'1';}
function startRide(target){if(G.state!=='lift')return;G.rideTarget=target;G.state='ride';G.rideT=0;G.rideDing=false;keys.clear();sfx.latch();sfx.ride();}
function openShop(){G.state='shop';G.shopT=0;G.shopClosing=false;G.dolly=null;G.hover=-1;G.hand={x:200,y:170};keys.clear();exitLock();sfx.latch();dealerSay(['Смотри, выбирай.','Всё есть. Не всё дёшево.','Для своих — скидок нет.'][(Math.random()*3)|0]);}
function closeShop(){if(G.shopClosing)return;G.shopClosing=true;G.dolly=null;sfx.latch();}
function shopOwned(it){return it.multi?it.count()>=it.cap():!!UP[it.id];}
function buy(it){
  if(shopOwned(it)){sfx.click();G.shopMsg=it.multi?'БОЛЬШЕ НЕ УНЕСЕШЬ':'УЖЕ ЕСТЬ';G.shopMsgT=1.6;return;}
  if(G.rub<it.price){sfx.click();G.shake=.35;G.shopMsg='НЕ ХВАТАЕТ РУБЛЕЙ';G.shopMsgT=1.6;dealerSay('Денег нет — иди работай.');return;}
  if(it.id==='tapok2'&&!P.has[3]){sfx.click();G.shopMsg='СНАЧАЛА НАЙДИ ТАПОК';G.shopMsgT=1.6;dealerSay('Тапок сначала найди, умник.');return;}
  G.rub-=it.price;sfx.cash();G.shopMsg='КУПЛЕНО: '+it.name;G.shopMsgT=1.6;
  if(it.multi)it.add();else UP[it.id]=1;
  if(it.id==='dvust'){P.has[2]=1;P.shells=Math.max(P.shells,8);}
  if(it.id==='vest')P.armor=Math.max(P.armor,50);
  if(it.id==='salo')P.hp=Math.min(maxHP(),P.hp+25);
  dealerSay(['Носи на здоровье.','Хороший выбор.','Бери, пока дают.'][(Math.random()*3)|0]);
}
/* Дом 9 sells the original 8; Дом 11 adds ammo packs, second slipper and kefir */
const BAR8=['ammo9p','shellsp','kefir'];
function SH(){return G.level===8?SHOP.filter(i=>BAR8.includes(i.id)):G.level===4?SHOP:SHOP.filter(i=>!i.h2);}
function PER(){return SH().length>8?6:4;}
function slotRect(i){if(PER()===4)return i<4?{x:46+i*80,y:20,w:68,h:84}:{x:46+(i-4)*80,y:134,w:68,h:84};return i<6?{x:40+i*54,y:20,w:50,h:84}:{x:40+(i-6)*54,y:134,w:50,h:84};}
const CARD={x:212,y:26,w:172,h:190},BUYB={x:224,y:158,w:148,h:22},BACKB={x:224,y:186,w:148,h:20};
function inR(p,r){return p.x>=r.x&&p.x<r.x+r.w&&p.y>=r.y&&p.y<r.y+r.h;}
function shopClick(){
  if(G.shopT<1||G.shopClosing)return;G.pokeT=.14;
  const d=G.dolly;
  if(d){if(d.t<1||d.out)return;if(inR(G.hand,BUYB)){buy(SH()[d.slot]);return;}if(inR(G.hand,BACKB)||!inR(G.hand,CARD)){d.out=true;sfx.tick();}return;}
  if(G.hover>=0){G.dolly={slot:G.hover,t:0,out:false};sfx.tick();return;}
  if(G.hand.x<30||G.hand.x>370||G.hand.y<6)closeShop();
}
function shopBack(){if(G.dolly&&!G.dolly.out){G.dolly.out=true;sfx.tick();}else if(!G.dolly)closeShop();}
function hurtPlayer(d){if(G.state!=='play'||G.god)return;d=(d*DIFF[SET.diff].dmg)|0;const save=Math.min(P.armor,(d*.4)|0);P.armor-=save;P.hp-=d-save;G.hurt=Math.min(1,G.hurt+.5);P.faceHurt=.4;sfx.hurt();
  if(P.hp>0&&P.hp<30&&P.kefir>0){P.kefir--;P.hp=Math.min(maxHP(),P.hp+35);msg('КЕФИР!  +35');sfx.pickup();G.bonus=1;}
  if(P.hp<=0){P.hp=0;endGame('dead');}}
function take(e){
  const am=DIFF[SET.diff].ammo;
  switch(e.t){
    case 'kvass':if(P.hp>=maxHP()&&!(P.bleed>0))return false;P.bleed=0;P.hp=Math.min(maxHP(),P.hp+8);msg('КВАС  +8');break;
    case 'pelmeni':if(P.hp>=maxHP()&&!(P.bleed>0))return false;P.bleed=0;P.hp=Math.min(maxHP(),P.hp+20);msg('ПЕЛЬМЕНИ  +20');break;
    case 'vatnikS':P.seedproof=true;P.armor=Math.max(P.armor,maxAR());msg('ВАТНИК СЕМЁНА — СЕМКИ НЕ БЕРУТ');sfx.ding();G.semWinT=2.6;break;
    case 'vatnik':if(P.armor>=maxAR())return false;P.armor=Math.min(maxAR(),P.armor+50);msg('ВАТНИК  +50 БРОНИ');break;
    case 'ammo9':{if(P.ammo9>=cap9())return false;const n=Math.round(8*am);P.ammo9=Math.min(cap9(),P.ammo9+n);msg('ПАТРОНЫ 9ММ  +'+n);break;}
    case 'ammo9s':{if(P.ammo9>=cap9())return false;const n=Math.round(4*am);P.ammo9=Math.min(cap9(),P.ammo9+n);msg('ПАТРОНЫ 9ММ  +'+n);break;}
    case 'pmGround':{P.has[1]=1;P.w=1;P.ammo9=Math.max(P.ammo9,8);msg('ПМ. ХОТЬ ЧТО-ТО');if(G.rc)G.rc.endT=2.6;break;}
    case 'shells':{if(P.shells>=capS())return false;const n=Math.round(4*am);P.shells=Math.min(capS(),P.shells+n);msg('ДРОБЬ  +'+n);break;}
    case 'obrez':P.has[2]=1;P.shells=Math.min(capS(),P.shells+4);msg(UP.dvust?'ДРОБЬ  +4':'ОБРЕЗ!');if(!UP.dvust){P.w=2;P.switchT=.25;}break;
    case 'vodkaI':if(P.vodka>=3)return false;P.vodka++;msg('ВОДКА  +1');break;
    case 'safe':G.rub+=e.v;G.safeFound=true;msg('СЕЙФ!  +'+e.v+' РУБ');break;
    case 'note1':case 'note2':case 'note3':case 'note4':case 'note5':case 'note6':if(!NOTESGOT.includes(e.t)){NOTESGOT.push(e.t);saveNotes();}msg('НОВАЯ ЗАМЕТКА');break;
    case 'flatkey':G.flatKey=true;msg('КЛЮЧ ОТ КВАРТИРЫ');break;
    case 'fuse':G.fuses++;msg('ПРЕДОХРАНИТЕЛЬ  '+G.fuses+'/3');break;
    case 'liftkey':G.liftKey=true;msg('КЛЮЧ ОТ ЛИФТА');break;
    case 'gkey':G.gkey=true;msg('КЛЮЧ ОТ ВОРОТ — ВОРОТА В КОНЦЕ НИЖНЕГО РЯДА');break;
    case 'apple':if(P.hp>=maxHP())return false;P.hp=Math.min(maxHP(),P.hp+5);msg('ЯБЛОКО  +5');break;
    case 'tapok':P.has[3]=1;P.w=3;P.switchT=.25;msg('МАМИН ТАПОК!  [5]');break;
    case 'note7':case 'note8':case 'note12':if(!NOTESGOT.includes(e.t)){NOTESGOT.push(e.t);saveNotes();}msg('НОВАЯ ЗАМЕТКА');break;
    case 'rub':case 'rubS':G.rub+=e.v||5;msg('РУБЛИ  +'+(e.v||5));break;
  }
  return true;
}

