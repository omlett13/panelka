'use strict';
/* ---------- GAME STATE ---------- */
const G={state:'menu',page:'main',sel:0,parent:'main',prevState:'play',t:0,time:0,kills:0,killTotal:0,items:0,itemTotal:0,secrets:0,secretTotal:0,msg:'',msgT:0,bark:'',barkT:0,flash:0,hurt:0,bonus:0,deadT:0,zoom:0,power:false,winTime:0,navT:0,hadLock:false,noiseT:0,
  rub:0,god:false,trans:null,loot:false,lootHeld:-1,lootSlot:-1,lootCur:0,statsT:0,rideT:0,rideDing:false,hiT:0,
  shopT:0,shopClosing:false,hand:{x:200,y:150},hover:-1,dolly:null,pokeT:0,shake:0,shopMsg:'',shopMsgT:0,floorN:1,
  level:1,cleared:false,hasKey:false,bossOn:false,healT:0,brawlUsed:false,firstDeadT:-1,clearT:0,drillVol:0};
const P={x:3.5,y:18.5,a:-0.9,hp:100,armor:0,ammo9:8,shells:0,has:[1,1,0],w:1,cool:0,anim:9,punch:0,bob:0,bobAmt:0,camZ:.5,switchT:0,faceHurt:0,faceGrin:0,faceLook:0,faceLookT:0,stepPh:0,vodka:0,throwT:0,kefir:0};
const UP={kastet:0,tt:0,dvust:0,krossy:0,vest:0,bando:0,salo:0,tapok2:0,gvozd:0};
const maxHP=()=>UP.salo?125:100,maxAR=()=>UP.vest?150:100,cap9=()=>UP.bando?150:99,capS=()=>UP.bando?60:40;
/* quick-slots on the bottom screen: 0 fist, 1 pistol, 2 shotgun, 3 vodka, 4 use, 5 slipper */
let SLOTS=[0,1,2,3];
try{const s=JSON.parse(localStorage.getItem('panelka.slots')||'null');if(Array.isArray(s)&&s.length===4&&s.every(v=>v>=0&&v<=5))SLOTS=s;}catch(e){}
function saveSlots(){try{localStorage.setItem('panelka.slots',JSON.stringify(SLOTS));}catch(e){}}

const KINDS={
  sq:{hp:26,speed:2.2,reach:1.05,dmg:[8,13],wind:.3,rate:.8,sight:8,scale:1,pitch:150,idle:'squat',bark:['Слышь!','Есть чё?','Ты с какого района?','Сюда иди!','Чё, самый умный?','Закурить есть?']},
  sp:{hp:20,speed:1.8,reach:0,dmg:[6,9],wind:.35,rate:1.2,sight:10,scale:1,pitch:190,idle:'stand',ranged:1,bark:['Семки будешь?','Э, ты чё?','Ну-ка стоять!']},
  br:{hp:90,speed:2.4,reach:1.15,dmg:[16,24],wind:.45,rate:1.0,sight:8,scale:1.28,pitch:105,idle:'stand',bark:['Ну всё, ты попал.','Кто тут наших трогает?']},
  bt:{hp:1560,speed:2.3,reach:1.55,dmg:[30,38],wind:.45,rate:.9,sight:14,scale:1.6,pitch:80,idle:'stand',boss:1,kingpin:1,name:'БАТЯ',bark:['Ты кто такой, сынок?','На моей земле?','Сейчас научу уважению.']},
  /* floor 2 */
  dn:{who:'СОСЕД',hp:30,speed:3.1,reach:1.0,dmg:[6,9],wind:.28,rate:.75,sight:8,scale:1,pitch:130,idle:'stand',drunk:1,bark:['Ты кто такой?!','Я тут живу!','Братан… ик… братан!','Чё за шум?!']},
  pes:{hp:14,speed:3.7,reach:.85,dmg:[4,7],wind:.18,rate:.55,sight:9,scale:.9,pitch:0,idle:'stand',dog:1,rad:.22,bark:['Гав! Гав!','Р-р-р… ГАВ!']},
  rm:{who:'РЕМОНТНИК',hp:150,speed:1.15,reach:1.35,dmg:[20,30],wind:1.1,rate:1.4,sight:7,scale:1.35,pitch:95,idle:'attack',worker:1,bark:['Я тут работаю!','Не мешай, сверлю.','Ща как дам!']},
  rat:{hp:4,speed:4.2,reach:.75,dmg:[2,4],wind:.15,rate:.5,sight:7,scale:.55,pitch:0,idle:'stand',rat:1,dog:0,rad:.2,bark:['']},
  st:{who:'САНТЕХНИК',hp:60,speed:2.4,reach:1.2,dmg:[10,15],wind:.32,rate:.6,sight:8,scale:1.05,pitch:120,idle:'stand',combo:1,bark:['Воду перекрыли!','Кто трубу трогал?!','Сейчас подкручу!']},
  spd:{hp:999,speed:3.6,reach:0,dmg:[3,3],wind:.2,rate:1,sight:5,scale:1.05,pitch:0,idle:'stand',spider:1,rad:.38,bark:['']},
  kc:{hp:420,speed:1.9,reach:1.45,dmg:[20,28],wind:.5,rate:1,sight:10,scale:1.45,pitch:78,idle:'stand',boss:1,coal:1,name:'КОЧЕГАР',bark:['Щиток не трожь.','В топку!','Жарко тебе?']},
  /* Дом 11 */
  bb:{who:'БАБКА',hp:999,speed:1,reach:1.4,dmg:[14,16],wind:.6,rate:1.6,sight:6.5,scale:1,pitch:260,idle:'sit',granny:1,rad:.3,bark:['Хулиган!','Совсем стыд потеряли!','Я всё про тебя знаю!']},
  dv:{hp:720,speed:2.6,reach:1.5,dmg:[14,20],wind:.38,rate:1,sight:14,scale:1.3,pitch:100,idle:'stand',boss:1,dvornik:1,name:'ДВОРНИК',bark:['Не мусори!','Понаехали…','Метлой тебя!']},
  rk:{who:'КРАСНЫЕ',hp:26,speed:2.3,reach:1.05,dmg:[9,14],wind:.3,rate:.75,sight:9,scale:1,pitch:135,idle:'squat',bark:['Не наш этаж!','Ты к кому?','Чей будешь?','Смотрящий не звал!']},
  sm:{who:'СМОТРЯЩИЙ',name:'СМОТРЯЩИЙ',hp:520,speed:2.7,reach:1.3,dmg:[16,22],wind:.36,rate:.8,sight:14,scale:1.3,pitch:92,idle:'stand',boss:1,thrower:1,combo:1,smotr:1,bark:['Тут я смотрю.','Пацаны, ко мне!','Ты чьих будешь?','Ключ мой, слышишь?']},
  ls:{who:'ЛУЩИЛЬЩИК',hp:22,speed:1.9,reach:0,dmg:[6,10],wind:.4,rate:1.3,sight:11,scale:1,pitch:195,idle:'stand',ranged:1,seedspit:1,bark:['Семки будешь?','Тьфу!','Щёлк-щёлк…','Налетай!']},
  hk:{who:'ХАРКУН',hp:80,speed:1.7,reach:1.1,dmg:[6,9],wind:.3,rate:1.1,sight:9,scale:1.3,pitch:120,idle:'stand',harkun:1,bark:['Хрр-тьфу!','Подходи ближе!','Полный рот!']},
  oc:{who:'ОЧЕРЕДНИК',hp:34,speed:2.4,reach:0,dmg:[3,5],wind:.3,rate:1.6,sight:12,scale:1,pitch:200,idle:'stand',ochered:1,bark:['Тр-р-р-р!','Очередь держи!','Щёлк-щёлк-щёлк!']},
  sy:{who:'СЕМЯНКА',hp:130,speed:1.3,reach:1.1,dmg:[6,9],wind:.6,rate:2.4,sight:13,scale:1.35,pitch:95,idle:'stand',semyanka:1,bark:['Шляпку лови!','С горкой!','На, подсолнух!']},
  mx:{who:'МЕХАНИК',hp:48,speed:2.3,reach:1.1,dmg:[10,15],wind:.32,rate:.8,sight:9,scale:1.05,pitch:115,idle:'stand',bark:['Ключ на двенадцать!','Не трожь машину!','Ща подкручу тебе!','Карбюратор не дам!']},
  kd:{who:'МАЛОЙ',hp:14,speed:3.6,reach:.9,dmg:[4,7],wind:.22,rate:.6,sight:10,scale:.62,pitch:270,idle:'stand',jumper:1,kid:1,rad:.24,bark:['Дядя, лови!','Петушка хочешь?','Ха-ха, попался!']},
  sw:{who:'СТОРОЖ',name:'СТОРОЖ',hp:1100,speed:1.7,reach:1.45,dmg:[18,26],wind:.45,rate:1,sight:30,scale:1.45,pitch:80,idle:'stand',boss:1,storozh:1,rad:.5,bark:['Стоять! Кооператив закрыт!','Ключи? Через мой труп!','Пропуск есть?']},
  km:{who:'КАМЕНЩИК',hp:60,speed:1.9,reach:1,dmg:[8,12],wind:.35,rate:1,sight:13,scale:1.05,pitch:120,idle:'stand',mason:1,bark:['Кирпич летит!','Посторонись!','Норма — тыща кирпичей!']},
  tb:{who:'ТРУБНЫЙ',hp:44,speed:3.3,reach:1,dmg:[9,14],wind:.25,rate:.7,sight:8,scale:1,pitch:155,idle:'squat',pipe:1,bark:['Моя труба!','Не шуми!','Ку-ку!']},
  sj:{who:'ВЕРХОЛАЗ',hp:36,speed:2.7,reach:1,dmg:[8,12],wind:.3,rate:.8,sight:10,scale:1,pitch:140,idle:'stand',jumper:1,bark:['Поберегись!','Сверху!','Ловите!']},
  bg:{who:'БРИГАДИР',name:'БРИГАДИР',hp:900,speed:2.2,reach:1.3,dmg:[14,20],wind:.4,rate:1,sight:30,scale:1.4,pitch:88,idle:'stand',boss:1,brig:1,bark:['План горит!','Не мешай работать!','Премии лишу!']},
  kt:{who:'КОНТРОЛЁР',name:'КОНТРОЛЁР',hp:760,speed:2.3,reach:1.35,dmg:[15,22],wind:.4,rate:.9,sight:30,scale:1.45,pitch:85,idle:'stand',boss:1,ctrl:1,bark:['Билетик!','Оплачиваем проезд!','Штраф!']},
  gt:{who:'ГИТАРИСТ',name:'ГИТАРИСТ',hp:560,speed:1.35,reach:1.3,dmg:[14,20],wind:.4,rate:1.1,sight:9,scale:1.05,pitch:115,idle:'stand',boss:1,rf:1,bark:['Ещё раз!','Подпевай!','Громче!']},
  dz:{who:'ТАНЦОР',hp:60,speed:2,reach:1,dmg:[4,6],wind:.3,rate:1,sight:5,scale:1,pitch:150,idle:'squat',rf:1,bark:['Эх, давай!','Танцуют все!','Оп-оп!']},
  gg:{who:'БУГАЙ',hp:99999,speed:3,reach:1.2,dmg:[0,0],wind:.3,rate:1,sight:60,scale:2.1,pitch:70,idle:'stand',rf:1,rad:.5,bark:['Щекотно.','Не балуй.','Стоять.']},
  bm:{who:'БУТЫЛОЧНИК',hp:40,speed:1.4,reach:1.0,dmg:[8,12],wind:.35,rate:1.0,sight:40,scale:1.05,pitch:120,idle:'stand',roller:1,ranged:1,bark:['Держи!','Лови подарочек!','Пустая тара!','Катись-катись!']},
  mg:{who:'С МАГНИТОФОНОМ',hp:30,box:28,speed:2.1,reach:1.0,dmg:[6,9],wind:.3,rate:.9,sight:9,scale:1,pitch:140,idle:'stand',boom:1,bark:['Сделай погромче!','Дискотека!','Пацаны, наша песня!','Качает!']},
  vr:{who:'ШУСТРЫЙ',hp:34,speed:3.4,reach:1.0,dmg:[5,8],wind:.3,rate:.8,sight:10,scale:.95,pitch:175,idle:'stand',runner:1,bark:['Не догонишь!','Это моё!','Ха, лови!']},
  kl:{hp:650,speed:2.3,reach:1.6,dmg:[22,30],wind:.42,rate:.9,sight:40,scale:1.5,pitch:88,idle:'stand',bro:1,name:'КОЛЯН',bark:['Толян, держи его!']},
  tl:{hp:420,speed:3.0,reach:1.15,dmg:[10,14],wind:.22,rate:.75,sight:40,scale:1.12,pitch:165,idle:'stand',bro:1,thrower:1,name:'ТОЛЯН',bark:['Колян, мочи!']}
};
const PROPS={crane:{sc:11,block:.9},craneX:{sc:4,block:0},scaff:{sc:3.4,block:.12},pipe:{sc:1.3,block:.55},pipes:{sc:2.3,block:1.05},carP:{sc:1.55,block:.85},carP2:{sc:1.55,block:.85},carW:{sc:1.5,block:.8},tires:{sc:.9,block:.4},husks:{sc:.7,block:0},sack:{sc:1,block:.45},seedpile:{sc:1.1,block:0},conveyor:{sc:1.3,block:.5},flywheel:{sc:1.7,block:.6},motor:{sc:1.15,block:.5},panel:{sc:1.1,block:.4},hlamp:{sc:1.1,block:0},silo:{sc:5.2,block:1},ladder:{sc:1.5,block:0},cabinet:{sc:1.25,block:.45},ibeam:{sc:2.4,block:.35},valve:{sc:.9,block:0},duct:{sc:1.8,block:0},mixer:{sc:1.6,block:.6},bricks:{sc:1,block:.45},rebar:{sc:.9,block:.3},sand:{sc:1.1,block:.5},slab:{sc:1.3,block:.45},kassa:{sc:.95,block:.45},turnstile:{sc:1,block:.35},msign:{sc:2.2,block:.12},tseat:{sc:.9,block:.3},tpole:{sc:1,block:.1},lenin:{sc:4.2,block:.9},fountain:{sc:2.8,block:.9},tramstop:{sc:2.2,block:.4},chess:{sc:.8,block:.3},counter:{sc:1,block:.5},stall:{sc:1.8,block:.7},antenna:{sc:2.2,block:.1},truck:{sc:2.5,block:.95},birch:{sc:3,block:.22},lamp:{sc:2.6,block:.15},bench:{sc:1,block:.42},urn:{sc:1,block:.26},bottle:{sc:.6,block:0},bulb:{sc:1,block:0},dealer:{sc:1.05,block:.32},
  couch:{sc:1,block:.45},table:{sc:1,block:.38},tv:{sc:.9,block:.3},stove:{sc:1,block:.35},chand:{sc:1,block:0},laundry:{sc:1,block:0},rubble:{sc:.8,block:0},rail:{sc:1,block:0},furnace:{sc:1,block:.4},throne:{sc:1.3,block:.5},rug:{sc:1.6,block:0},flamp:{sc:1.5,block:.15},barrel:{sc:1,block:.3},coalpile:{sc:1,block:.4},crate:{sc:1,block:.35},jars:{sc:1,block:0},pump:{sc:1,block:.4},
  leaves:{sc:1,block:0},broom:{sc:1.3,block:0},poplar:{sc:3.8,block:.2},fir:{sc:2.8,block:.35},deadtree:{sc:3,block:.2},appletree:{sc:2.6,block:.3},rocket:{sc:2.6,block:.45},carousel:{sc:1.3,block:.7},sandbox:{sc:1,block:.5}};
const ITEMS={pmGround:{sc:1},kvass:{sc:.7},pelmeni:{sc:.7},vatnik:{sc:.8},ammo9:{sc:.7},ammo9s:{sc:.5,spr:'ammo9'},shells:{sc:.7},obrez:{sc:.9},rub:{sc:.45,money:1},rubS:{sc:.6,spr:'rub',money:1},safe:{sc:.8,money:1},vodkaI:{sc:.6},note1:{sc:.5,spr:'note',lore:1},note2:{sc:.5,spr:'note',lore:1},note3:{sc:.5,spr:'note',lore:1},note4:{sc:.5,spr:'note',lore:1},note5:{sc:.5,spr:'note',lore:1},note6:{sc:.5,spr:'note',lore:1},note7:{sc:.5,spr:'note',lore:1},note8:{sc:.5,spr:'note',lore:1},
  note12:{sc:.5,spr:'note',lore:1},flatkey:{sc:.55,spr:'liftkey'},fuse:{sc:.6},liftkey:{sc:.55},tapok:{sc:.8},apple:{sc:.45},gkey:{sc:.55,spr:'liftkey'}};
const NOTES=[
 {id:'note1',title:'ДВОР НА ЛЕНИНА',kind:'ГАЗЕТА «ВЕЧЕРНИЙ ГОРОД»',text:['Жильцы дома 9 снова жалуются','на подростков во дворе.','Лампочки в подъезде бьют,','почтовые ящики жгут.','Милиция приезжала дважды.','Уехала — один раз.']},
 {id:'note2',title:'ЗАПИСКА НА КУХНЕ',kind:'ЗАПИСКА, ПОЧЕРК КРИВОЙ',text:['Колян!','Щиток в подвале не трогать.','Там кочегар, он нервный.','Свет в доме только наш.','Кто врубит — тому хана.','                    — Толян']},
 {id:'note3',title:'СКОРАЯ НЕ ПРОЕХАЛА',kind:'ГАЗЕТА «ВЕЧЕРНИЙ ГОРОД»',text:['Во дворе дома 9 машина скорой','помощи не смогла проехать:','проезд перекрыли «Жигули»','без номеров.','Чьи они — весь район знает.','Вслух не говорит никто.']},
 {id:'note4',title:'ЗАПИСКА БРАТЬЯМ',kind:'ЗАПИСКА, ТЕТРАДНЫЙ ЛИСТ',text:['Батя велел:','кто придёт с ключом от подвала —','не пускать.','Внизу его хата.','Не подведите.','Ключ держите при себе.']},
 {id:'note5',title:'ГОЛОСА ИЗ ПОДВАЛА',kind:'ГАЗЕТА «ВЕЧЕРНИЙ ГОРОД»',text:['По ночам из подвала дома 9','слышна музыка и крики','«Пацаны, сюда!».','В ЖЭКе отвечают:','подвал закрыт, ключа ни у кого нет.','Жильцы не верят.']},
 {id:'note6',title:'СПИСОК ДОЛГОВ',kind:'ЛИСТОК ИЗ-ПОД ТРОНА',text:['Сантехник ........ 50','Кочегар .......... 100','Братья ........... 300','Барыга — не трогать,','он свой.','                    — Б.']},
 {id:'note7',title:'ОБЪЯВЛЕНИЕ ЖЭК',kind:'ОБЪЯВЛЕНИЕ НА ДВЕРИ ПОДЪЕЗДА',text:['Уважаемые жильцы дома 11!','Лифт закрыт на ключ','до особого распоряжения.','Ключ — у дворника.','Предохранители из щитка','«пропали». Вопросов не задавать.']},
 {id:'note8',title:'ДИСКОТЕКА ВО ДВОРЕ',kind:'ГАЗЕТА «ВЕЧЕРНИЙ ГОРОД»',text:['Жители дома 11 жалуются','на ночные «дискотеки»:','магнитофоны орут до утра.','Участковый обещал разобраться.','Участковый переехал','в другой район.']},
 {id:'note9',title:'СПЛЕТНИ: БАТЯ',kind:'СО СЛОВ БАБЫ ЗИНЫ',text:['Батя-то? Да какой он батя.','Васька Хромов, с двенадцатого.','В восьмидесятом сел,','вышел — и весь район под ним.','А сын у него, говорят,','в райкоме сидит. Вот так.']},
 {id:'note10',title:'СПЛЕТНИ: ЗАВОД',kind:'СО СЛОВ БАБЫ ВАЛИ',text:['Все они с завода кормятся.','Ночью грузовики без номеров','с завода туда-сюда.','Директор новый — страшный,','его никто в лицо не видел.','Только машина чёрная.']},
 {id:'note11',title:'СПЛЕТНИ: ДВОРНИК',kind:'СО СЛОВ БАБЫ НЮРЫ',text:['Дворник наш раньше в охране','служил. Ружьё с тех пор.','«Солью заряжено» — всем','так говорит. Я не проверяла.','Ключ от лифта у него,','ЖЭК ему доплачивает.']},
 {id:'note12',title:'ГРАФИК ДЕЖУРСТВА',kind:'ЛИСТОК НА КУХНЕ, КОММУНАЛКА',text:['Кто моет коридор — Люська.','Кто моет плиту — никто.','Телефон: не занимать дольше','трёх минут! Дежурит смотрящий.','Крыша закрыта, код','написан. Ищите сами.']},
 {id:'note13',title:'СПЛЕТНИ: СМОТРЯЩИЙ',kind:'СО СЛОВ БАБЫ ТОМЫ',text:['Смотрящий наш — Гоша Рыжий.','Раньше у Бати на побегушках.','Ключ от квартиры на замке','всегда при нём — говорят,','там у них общак лежит.','А код с крыши — по стенам.']},
 {id:'note14',title:'ПРАВДА: ВЕРТОЛЁТ',kind:'ГАЗЕТА «ПРАВДА»',text:['Над жилым массивом замечен','вертолёт без опознавательных','знаков. Очевидцы сообщают','о двух гражданах крупного','телосложения. Милиция: «учения».','Редакция просит не паниковать.']}
];
let NOTESGOT=[];try{const s=JSON.parse(localStorage.getItem('panelka.notes')||'[]');if(Array.isArray(s))NOTESGOT=s.filter(v=>typeof v==='string');}catch(e){}
function saveNotes(){try{localStorage.setItem('panelka.notes',JSON.stringify(NOTESGOT));}catch(e){}}
const LIGHTS1=[
  {x:4,y:5,c:[1,.6,.26],r:6.5,i:1.25},{x:11,y:10,c:[1,.6,.26],r:6.5,i:1.25},{x:6,y:17,c:[1,.6,.26],r:6,i:1.1},
  {x:14,y:23.2,c:[1,.6,.26],r:6,i:1.15},{x:28,y:29,c:[1,.6,.26],r:6,i:1.1,fl:2},
  {x:19,y:5.5,c:[.75,.95,.9],r:5,i:1,fl:1},{x:26,y:5.5,c:[.75,.95,.9],r:4.5,i:.9},{x:33,y:5.5,c:[.75,.95,.9],r:4.5,i:.9,fl:2},
  {x:36.5,y:11,c:[.75,.95,.9],r:4,i:.6,fl:2},{x:21,y:15.5,c:[.75,.95,.9],r:4.5,i:.9},{x:40,y:15.5,c:[.75,.95,.9],r:4.5,i:.85,fl:1},
  {x:42.5,y:6,c:[.75,.95,.9],r:5,i:.9,fl:2},
  {x:24,y:2,c:[1,.78,.45],r:3.5,i:.9},{x:28.5,y:2,c:[.55,.65,1],r:3.5,i:.8},{x:35,y:2,c:[1,.78,.45],r:3,i:.8},
  {x:24.5,y:9,c:[1,.78,.45],r:3.5,i:.9},{x:31,y:9,c:[.55,.65,1],r:3.5,i:.8},
  {x:20,y:12.5,c:[1,.78,.45],r:3.5,i:.9},{x:26,y:12.5,c:[.55,.65,1],r:3.5,i:.8},{x:32,y:12.5,c:[1,.78,.45],r:3.5,i:.9},
  {x:20.5,y:19,c:[1,.78,.45],r:3.5,i:.9},{x:27.5,y:19,c:[1,.78,.45],r:3.5,i:.9},{x:34,y:19,c:[.55,.65,1],r:3.5,i:.8},{x:42.5,y:19,c:[1,.78,.45],r:3.5,i:.9},
  {x:33.5,y:24.5,c:[1,.8,.5],r:4.5,i:1.05,fl:3},{x:39.5,y:28.5,c:[1,.8,.5],r:4.5,i:1},{x:44.5,y:32.5,c:[1,.8,.5],r:4.5,i:1},
  {x:44.5,y:26.5,c:[1,.45,.15],r:5,i:1.1,fl:3},
  {x:3.5,y:38.5,c:[.9,.97,.95],r:3.2,i:.75,fl:1}
];
const FL=[.75,.95,.9],WARM=[1,.78,.45],TVB=[.55,.65,1],SOD=[1,.6,.26],BOSSL=[1,.92,.78];
const LIGHTS2=[
  {x:3,y:16.5,c:FL,r:4.5,i:.8,fl:1},{x:12,y:16.5,c:FL,r:4.5,i:.8},{x:27,y:16.5,c:FL,r:4.5,i:.75,fl:2},{x:36,y:16.5,c:FL,r:4.5,i:.8},{x:44,y:16.5,c:FL,r:4.5,i:.8,fl:1},
  {x:4,y:11.5,c:WARM,r:3.5,i:.9},{x:9,y:13,c:TVB,r:3,i:.8},{x:15,y:11.5,c:WARM,r:3.5,i:.9},{x:21,y:10,c:WARM,r:3.5,i:.85},{x:22,y:13.5,c:TVB,r:3,i:.8},
  {x:29,y:10,c:WARM,r:3.5,i:.9},{x:33,y:13,c:WARM,r:3,i:.8},{x:38,y:11,c:WARM,r:3.5,i:.9},{x:43,y:12,c:TVB,r:3.5,i:.8},
  {x:6,y:20.5,c:WARM,r:3.5,i:.9},{x:6,y:24.5,c:WARM,r:3.5,i:.8},{x:6,y:31,c:[1,.8,.5],r:3.5,i:.8,fl:3},
  {x:15,y:20.5,c:FL,r:4,i:.65,fl:1},{x:25,y:20.5,c:FL,r:4,i:.65},{x:15,y:25.5,c:WARM,r:3,i:.8},{x:20,y:25.5,c:TVB,r:3,i:.75},{x:24,y:25.5,c:WARM,r:3,i:.8},{x:28.5,y:25.5,c:WARM,r:3,i:.8},
  {x:17,y:31.5,c:[.45,.6,1],r:4,i:.9},{x:26,y:31.5,c:WARM,r:4,i:.8},
  {x:10,y:7.3,c:SOD,r:5,i:.55},{x:25,y:7.3,c:SOD,r:6,i:.55},{x:41,y:7.3,c:SOD,r:5,i:.55},
  {x:36,y:22,c:BOSSL,r:7,i:1.35},{x:43,y:23,c:BOSSL,r:7,i:1.35},{x:39.5,y:27,c:BOSSL,r:7,i:1.3},{x:37,y:31.5,c:BOSSL,r:4.5,i:1.1},{x:44,y:31.5,c:BOSSL,r:4.5,i:1.1},
  {x:3.5,y:38.5,c:[.9,.97,.95],r:3.2,i:.75,fl:1}
];
const EMERG=[1,.15,.1],FURN=[1,.45,.15];
const LIGHTS3=[
  {x:3,y:17,c:[1,.8,.5],r:4.5,i:.85,fl:3},{x:13.5,y:17,c:[1,.8,.5],r:4,i:.6,fl:1},{x:7.5,y:9.5,c:[1,.8,.5],r:3.5,i:.5,fl:2},
  {x:26,y:17,c:EMERG,r:6,i:.95,fl:2},{x:21.5,y:17,c:EMERG,r:4,i:.6,fl:1},
  {x:25,y:5,c:[1,.8,.5],r:5,i:.8,fl:1},{x:28,y:11,c:[.5,.8,1],r:3.5,i:.5},
  {x:26,y:26,c:[.3,.6,.7],r:7,i:.45},
  {x:37,y:10.5,c:FURN,r:7,i:1.3,fl:3},{x:42,y:10.5,c:FURN,r:7,i:1.3,fl:3},{x:37,y:21,c:FURN,r:7,i:1.3,fl:3},{x:42,y:21,c:FURN,r:7,i:1.3,fl:3},{x:40,y:16,c:FURN,r:6,i:.8},
  {x:45.5,y:29.5,c:[1,.8,.5],r:3,i:.9},{x:45.5,y:17,c:[.3,1,.5],r:3,i:.6},{x:40,y:13,c:[1,.8,.45],r:4.5,i:1.1},
  {x:3.5,y:38.5,c:[.9,.97,.95],r:3.2,i:.75,fl:1}
];
const LIGHTS4=(()=>{const L=[];
  for(const [x,y,f] of [[6,4],[17,10,1],[4,19],[7,11.5],[19,27],[28,32,2],[40,26],[52,32],[60,28,1],[20,37],[36,37,2],[50,44],[29,44]])L.push({x,y,c:SOD,r:6.5,i:1.2,fl:f||0});
  L.push({x:25.5,y:18.5,c:FL,r:5,i:.9,fl:1});for(const x of [27,36,45,54])L.push({x,y:12.5,c:FL,r:4.5,i:.85,fl:x===45?2:0});
  L.push({x:32,y:17.5,c:FL,r:4,i:.8,fl:1},{x:48.5,y:18,c:FL,r:5,i:.9});
  for(const x0 of [23,31,39,47,55]){L.push({x:x0+3,y:8.5,c:WARM,r:3.8,i:.9},{x:x0+1.5,y:3.5,c:TVB,r:3,i:.8});}
  L.push({x:38,y:18,c:WARM,r:3.5,i:.9},{x:42,y:20,c:TVB,r:3,i:.8},{x:56,y:16.5,c:WARM,r:3.5,i:.9},{x:58,y:20,c:WARM,r:3.5,i:.85});
  L.push({x:11.5,y:13.5,c:[1,.8,.5],r:3.5,i:.75,fl:3},{x:42,y:42,c:[1,.8,.5],r:4,i:.9,fl:1},{x:3.5,y:38.5,c:[.9,.97,.95],r:3.2,i:.75,fl:1});
  return L;})();
const LIGHTS5=[{x:11.5,y:30.5,c:[1,.8,.5],r:5.5,i:.9,fl:1},{x:21,y:26,c:[1,.8,.5],r:5.5,i:.9,fl:2},{x:16,y:20.2,c:[.75,.95,.9],r:5.5,i:.8},{x:11.5,y:21,c:[1,.5,.2],r:6,i:1,fl:3},{x:21,y:30.5,c:[.5,.6,1],r:5,i:.4}];
const LIGHTS6=(()=>{const L=[];for(const x of [8,20,32,44,56])L.push({x,y:23.5,c:FL,r:5,i:.85,fl:x===32?2:x===44?1:0});
  for(const [a,b] of [[2,9],[11,18],[20,27],[29,36],[38,45],[47,54],[56,61]])L.push({x:(a+b)/2,y:16,c:(a+b)%3?WARM:TVB,r:5,i:.85});
  for(const [a,b] of [[2,9],[11,20],[35,43],[45,52],[54,61]])L.push({x:(a+b)/2,y:31.5,c:(a+b)%3?WARM:TVB,r:5,i:.8});
  L.push({x:28,y:32,c:[1,.8,.5],r:7,i:1.1,fl:3},{x:24,y:29,c:[1,.55,.3],r:4,i:.8},{x:32,y:29,c:[1,.55,.3],r:4,i:.8},{x:60,y:23.5,c:[1,.3,.2],r:3,i:.5,fl:2});return L;})();
const LIGHTS9=(function(){const L=[],W=[1,.85,.6],C=[.85,.9,1];L.push({x:8,y:8,c:W,r:6,i:1},{x:16,y:8,c:W,r:6,i:1},{x:11.5,y:15,c:W,r:4,i:.9},{x:11.5,y:20,c:W,r:4,i:.9});
  for(let x=8;x<=56;x+=8)L.push({x,y:26,c:W,r:6,i:1.1},{x,y:34,c:W,r:6,i:1.1});
  for(let x=6;x<=122;x+=4){if(x%12===4)continue;L.push({x:x+.5,y:39.5,c:C,r:4,i:.9,fl:(x%9===0)?1:0});}
  L.push({x:67,y:45,c:[.5,.9,.6],r:6,i:.6,fl:1},{x:75,y:45,c:[.5,.9,.6],r:6,i:.6,fl:2},{x:118,y:39,c:[1,.45,.35],r:6,i:.7,fl:1},
    {x:110,y:44.5,c:[1,.8,.55],r:7,i:1.1,fl:1},{x:119,y:44.5,c:[1,.8,.55],r:7,i:1.1},{x:101.5,y:49.5,c:[1,.8,.55],r:6,i:1},{x:101.5,y:59.5,c:[1,.8,.55],r:6,i:1,fl:2},{x:111.5,y:59.5,c:[1,.8,.55],r:6,i:1},{x:111.5,y:53.5,c:[1,.8,.55],r:6,i:1});return L;})();
const LIGHTS8=[{x:72,y:38,c:[1,.9,.75],r:6,i:1},{x:82,y:38,c:[1,.9,.75],r:5,i:1},{x:91,y:38,c:[.85,1,.9],r:5,i:1},{x:70,y:53,c:[1,.85,.6],r:5,i:.9,fl:1},{x:98,y:38,c:[1,.3,.2],r:3,i:.6,fl:2}];
const LIGHTS7=[{x:5,y:7.5,c:[1,.75,.45],r:4,i:.8,fl:1},{x:33,y:7,c:[1,.8,.5],r:4.5,i:.9,fl:2},{x:20,y:36,c:[1,.75,.45],r:5,i:.7},{x:44,y:36,c:[1,.75,.45],r:5,i:.7}];
const LIGHTS12=[{x:44,y:11,c:[1,.9,.7],r:6,i:.7},{x:30,y:30,c:[1,.86,.6],r:6,i:.5},{x:58,y:30,c:[1,.86,.6],r:6,i:.5},{x:44,y:48,c:[1,.9,.7],r:6,i:.6}];
const LIGHTS11=[{x:24,y:9.5,c:[1,.85,.6],r:5,i:1}];
const LIGHTS10=[{x:77.5,y:77,c:[1,.85,.6],r:5,i:1},{x:48,y:42,c:[1,.92,.8],r:7,i:.8},{x:60,y:40,c:[1,.92,.8],r:7,i:.8},{x:72,y:42,c:[1,.92,.8],r:7,i:.8},{x:55,y:45,c:[1,.92,.8],r:6,i:.6},{x:66,y:45,c:[1,.92,.8],r:6,i:.6}];
/* per-level config. Render: fog (FOGD), cull (CULL2), ceilH (CEILH), hz (HZ), oob (OOBF), sky() (SKY); defaults in LVDEF0.
   Hooks: cells() floor/ceiling/zone overrides after parseMap · init() end of resetLevel · update(dt) each play tick, return true to end the tick */
const LVDEF0={fog:12.5,cull:196,ceilH:1,hz:0,oob:0xff000000,sky:()=>SKYN};
const LEVELDEF={
  12:{lights:LIGHTS12,start:{x:44,y:51,a:-Math.PI/2},obj:'ВЕРХ',amb:1.5,fog:60,cull:900,ceilH:5,oob:0xffb88a5a,sky:()=>SKYD1,
    cells(){WH12.fill(0);RAILM.fill(0);for(let i=MW;i<N-MW;i++){const t=TILE[i];if(t!==68&&t!==69)continue;const r=j=>TILE[j]===68||TILE[j]===69;RAILM[i]=(r(i-MW)?1:0)|(r(i+MW)?2:0)|(r(i-1)?4:0)|(r(i+1)?8:0);}for(let i=0;i<N;i++){const c=FLCH[i],t=TILE[i];if(c===47){FLOORTEX[i]=TX.siloF;ZONE[i]=Z_OUT;continue;}if(c===46||t===68||t===69){FLOORTEX[i]=TX.siloF;ZONE[i]=Z_HALL;}CEILTEX[i]=TX.siloC;if(t===66||t===70)TALLOK[i]=1;if(t===70){const x=i%MW,y=(i/MW)|0;WH12[i]=3+((hash2(((x/2)|0)*7+y*13,((y/2)|0)*5+x*3)*4)|0);}}},
    update(dt){updateSilo(dt);}},
  11:{lights:LIGHTS11,start:{x:22.6,y:54.5,a:0},obj:'КЛЮЧ',amb:1.3,fog:40,cull:1600,hz:1,oob:0xff8a8e92,sky:()=>SKYDAY,secrets:1,
    cells(){for(let i=0;i<N;i++){const c=FLCH[i],t=TILE[i];if(c===44)FLOORTEX[i]=TX.lane;else if(c===91){FLOORTEX[i]=TX.goil;CEILTEX[i]=TX.rawc;}else if(c===46||c===59){FLOORTEX[i]=TX.rawf;CEILTEX[i]=TX.rawc;}if(t===1)FLOORTEX[i]=TX.tar;if(t>=51&&t<=55){FLOORTEX[i]=TX.lane;ZONE[i]=Z_OUT;}if(t===62){FLOORTEX[i]=TX.goil;CEILTEX[i]=TX.rawc;ZONE[i]=Z_HALL;}else if(t>=60&&t<=65){FLOORTEX[i]=TX.lane;CEILTEX[i]=TX.rawc;ZONE[i]=Z_OUT;}}
      for(let i=MW;i<N-MW;i++){const t=TILE[i];if(t>=60&&t<=64&&(ZONE[i-1]===Z_HALL||ZONE[i+1]===Z_HALL||ZONE[i-MW]===Z_HALL||ZONE[i+MW]===Z_HALL))CEILW[i]=1;}},
    init(){garInit();},update(dt){updateGar(dt);}},
  10:{lights:LIGHTS10,start:{x:60,y:80.5,a:-Math.PI/2},obj:'БРИГАДИР',amb:1.3,fog:42,cull:4000,oob:0xff8a8e92,sky:()=>SKYDAY,
    cells(){for(let i=0;i<N;i++){const c=FLCH[i];if(c===44)FLOORTEX[i]=TX.dirt;else if(c===121)FLOORTEX[i]=TX.rawf;else if(c===46||c===59){FLOORTEX[i]=TX.rawf;CEILTEX[i]=TX.rawc;}if(TILE[i]===48||TILE[i]===56||TILE[i]===50)TALLOK[i]=1;if(TILE[i]===1)FLOORTEX[i]=TX.tar;const t=TILE[i];if((t>=51&&t<=55)||t===57){FLOORTEX[i]=TX.dirt;ZONE[i]=Z_OUT;}if(t===56)FLOORTEX[i]=TX.rawf;if(t===50){FLOORTEX[i]=TX.rawf;CEILTEX[i]=TX.rawc;doorOpen[i]=1;doorTarget[i]=1;}}},
    init(){siteInit();},
    update(dt){updateSite(dt);if(G.duel){updateDuel(dt);updateProj(dt);updateFx(dt);for(const f of ents)if(f.kind==='fire')f.life-=dt;return true;}}},
  9:{lights:LIGHTS9,start:{x:6.5,y:8.5,a:0},obj:'КОНТРОЛЁР',amb:1.1,fog:22,sky:()=>SKYSITE,
    cells(){for(let i=0;i<N;i++){const c=FLCH[i];if(c===109){FLOORTEX[i]=TX.mfloor;CEILTEX[i]=TX.mceil;}else if(c===114){FLOORTEX[i]=TX.tfloor;CEILTEX[i]=TX.tceil;}else if(c===101){FLOORTEX[i]=TX.escal;CEILTEX[i]=TX.eceil;}else if(c===95){FLOORTEX[i]=TX.rawf;CEILTEX[i]=TX.rawc;}}},
    init(){metroInit();},update(dt){updateMetro(dt);}},
  8:{lights:LIGHTS8,start:{x:41.5,y:55.5,a:-Math.PI/2},obj:'ГОРОД',amb:1.6,fog:46,cull:900,hz:1,sky:()=>SKYDAY,
    cells(){for(let i=0;i<N;i++){const c=FLCH[i];if(c===119){ZONE[i]=Z_OUT;FLOORTEX[i]=TX.fwater;continue;}const t=TILE[i];if(t===1||t===2||(t>=31&&t<=39))TALLOK[i]=1;if(ZONE[i]===Z_OUT)FLOORTEX[i]=c===121?TX.walk:c===113?TX.grass:c===120?TX.parq:c===106?TX.rails:TX.road;else if(ZONE[i]===Z_WATER)FLOORTEX[i]=TX.fwater;}},
    update(dt){updateNPCs(dt);}},
  7:{lights:LIGHTS7,start:{x:5.5,y:7.5,a:0},obj:'ГИТАРИСТ',amb:1.35,fog:24,oob:0xff201a1c,sky:()=>SKYMIX,
    cells(){for(let i=0;i<N;i++){if(FLCH[i]===116)FLOORTEX[i]=TX.tar;else if(FLCH[i]===112)FLOORTEX[i]=TX.plank;}streetTex(false);},
    init(){roofInit();},
    update(dt){updateRoof(dt);if(G.drop){updateFx(dt);return true;}if(G.rc&&G.rc.lock){for(const e of ents)if(e.kind==='enemy'&&e.k==='dz')updateDancer(e,dt);updateFx(dt);return true;}}},
  5:{lights:LIGHTS5,start:{x:11.5,y:30.5,a:0},obj:'ВЕРХ',amb:.45,torch:1},
  6:{lights:LIGHTS6,start:{x:3.5,y:23.5,a:0},obj:'ЗАДАЧИ',amb:.6,torch:1,init(){makeTags(G.code,true);}},
  4:{lights:LIGHTS4,start:{x:3.5,y:33.5,a:-Math.PI/2},obj:'ЛИФТ',init(){makeTags(G.code,false);},
    update(){if(G.codeOK&&!G.dvOn&&!G.cut&&!G.dvDown&&P.x>=10&&P.x<14&&P.y>=11.5&&P.y<16.9){const dv=ents.find(o=>o.k==='dv'&&!o.dead);if(dv){startCut(dv);return true;}}}},
  1:{lights:LIGHTS1,start:{x:3.5,y:18.5,a:-0.9},obj:'ТОК'},
  3:{lights:LIGHTS3,start:{x:1.5,y:17.5,a:0},obj:'СЕЙФ',amb:.45,torch:1},
  2:{lights:LIGHTS2,start:{x:1.5,y:16.9,a:0},obj:'КЛЮЧ',heal:[[35,20.5],[45,23.5],[34.2,28],[45,32.5],[39,32.5],[41,21.2],[38,27.5]],
    update(dt){if(G.cleared)return;
      const pc=(P.y|0)*MW+(P.x|0);
      if(!G.bossOn&&BROOM[pc])bossStart();
      if(G.bossOn){if(BDOOR>=0)doorTarget[BDOOR]=0;
        G.healT-=dt;if(G.healT<=0){G.healT=13+Math.random()*4;
          const live=ents.filter(e=>e.kind==='item'&&e.heal&&!e.taken).length;
          if(live<2){const pts=LEVELDEF[2].heal.filter(p=>Math.hypot(p[0]-P.x,p[1]-P.y)>2.5);const p=pts[(Math.random()*pts.length)|0];
            if(p){{const r=Math.random();ents.push({kind:'item',t:r<.45?'kvass':r<.75?'pelmeni':'shells',x:p[0],y:p[1],drop:1,heal:1});}spawnFx('puff',p[0],p[1],.5);sfx.pickup();}}}}}}
};
let LIGHTS=[];
const AMB=[[.16,.17,.27],[.2,.22,.2],[.19,.16,.12],[.06,.06,.06],[.34,.33,.3],[.12,.13,.2],[.36,.32,.28],[.05,.07,.08],[.12,.06,.03]];
const BR_=new Float32Array(N),BG_=new Float32Array(N),BB_=new Float32Array(N),LR=new Float32Array(N),LG=new Float32Array(N),LB=new Float32Array(N);
function initLights(){
  BR_.fill(0);BG_.fill(0);BB_.fill(0);
  const am=(LEVELDEF[G.level]&&LEVELDEF[G.level].amb)||1;
  for(let i=0;i<N;i++){const z=ZONE[i];if(TILE[i]===0&&z>=0&&z!==Z_LIFT){BR_[i]=AMB[z][0]*256*am;BG_[i]=AMB[z][1]*256*am;BB_[i]=AMB[z][2]*256*am;}else if(TILE[i]===0&&z===Z_LIFT){BR_[i]=AMB[z][0]*256;BG_[i]=AMB[z][1]*256;BB_[i]=AMB[z][2]*256;}}
  for(const l of LIGHTS){l.cells=[];l.w=[];const room=ROOM[(l.y|0)*MW+(l.x|0)];
    for(let i=0;i<N;i++){if(ROOM[i]!==room||room<0)continue;const cx=i%MW+.5,cy=((i/MW)|0)+.5,d=Math.hypot(cx-l.x,cy-l.y);if(d>=l.r)continue;l.cells.push(i);l.w.push(Math.pow(1-d/l.r,2)*l.i*256);}}
}
function loadLevel(n){
  G.level=n;if(!G.menuLoad){try{localStorage.setItem('panelka.last',n);}catch(e){}}MWL=n>=8?MW:64;MHL=n>=8?MH:48;unlock(n);parseMap(LEVEL_SRC[n].map);
  for(let i=0;i<N;i++){const z=ZONE[i];FLOORTEX[i]=z===Z_OUT?TX.asph:(z===Z_APT||z===Z_BOSS)?TX.parq:z===Z_BASE?TX.conc:z===Z_LIFT?TX.rubber:z===Z_VOID?TX.far:z===Z_WATER?TX.water:z===Z_BOIL?TX.coalf:TX.tile;CEILTEX[i]=z===Z_LIFT?TX.liftCeil:(z===Z_BASE||z===Z_WATER||z===Z_BOIL)?TX.ceilB:TX.ceil;}
  const L=Object.assign({},LVDEF0,LEVELDEF[n]);CEILW.fill(0);if(L.cells)L.cells();
  FOGD=L.fog;CULL2=L.cull;CEILH=L.ceilH;HZ=L.hz;OOBF=L.oob;SKY=L.sky();
  LIGHTS=L.lights.map(l=>Object.assign({},l));initLights();
  G.secretTotal=0;for(let i=0;i<N;i++)if(TILE[i]===10)G.secretTotal++;if(L.secrets!=null)G.secretTotal=L.secrets;
}
SKY=SKYN;
/* dawn over the district: k=0 before sunrise, k=1 sun on the horizon. Sun ENE, chimneys to its left, the white house far southwest */
const SUNC=983;
function dawnSky(k){const [c,g]=cv(SKYW,SKYH),r=rng(301);
  const gr=g.createLinearGradient(0,0,0,SKYH);
  if(k>=2){gr.addColorStop(0,'#3a6ab8');gr.addColorStop(.6,'#7aa4d8');gr.addColorStop(1,'#b8cadc');}
  else if(k){gr.addColorStop(0,'#35568e');gr.addColorStop(.45,'#8a7aa8');gr.addColorStop(.78,'#e0909a');gr.addColorStop(1,'#f6b070');}
  else{gr.addColorStop(0,'#070b22');gr.addColorStop(.55,'#18204a');gr.addColorStop(.88,'#4a3050');gr.addColorStop(1,'#a0503a');}
  g.fillStyle=gr;g.fillRect(0,0,SKYW,SKYH);
  if(!k)for(let i=0;i<180;i++){g.fillStyle=r()<.8?'#7a7a98':'#d8d8e8';g.fillRect((r()*SKYW)|0,(r()*70)|0,1,1);}
  const glow=(cx,rad,col)=>{for(const dx of [-SKYW,0,SKYW]){const rg=g.createRadialGradient(cx+dx,SKYH-4,2,cx+dx,SKYH-4,rad);rg.addColorStop(0,col);rg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=rg;g.fillRect(cx+dx-rad,SKYH-4-rad,rad*2,rad*2);}};
  if(k>=2){for(let i=0;i<14;i++){const cx=(r()*SKYW)|0,cy=10+((r()*40)|0);g.fillStyle='rgba(255,255,255,.75)';for(let j=0;j<5;j++){g.beginPath();g.ellipse(cx+j*9,cy+(j%2)*3,12,5,0,0,7);g.fill();}}g.fillStyle='#fffbe8';g.beginPath();g.arc(700,22,8,0,7);g.fill();}
  else glow(SUNC,k?170:120,k?'rgba(255,200,120,.75)':'rgba(220,110,60,.45)');
  if(k===1){for(const dx of [-SKYW,0,SKYW]){g.fillStyle='#fff2c0';g.beginPath();g.arc(SUNC+dx,SKYH-9,11,0,7);g.fill();g.fillStyle='#ffe090';g.beginPath();g.arc(SUNC+dx,SKYH-9,13,Math.PI*1.05,Math.PI*1.95);g.fill();}
    g.fillStyle='rgba(255,230,200,.5)';for(let i=0;i<7;i++){const x=(r()*SKYW)|0,y=18+((r()*40)|0);g.fillRect(x,y,30+((r()*60)|0),2);}}
  const sil=k>=2?'#8890a8':k?'#3a2a40':'#0a0b14',sil2=k>=2?'#a0a8bc':k?'#4a3448':'#0f1020',win=k>=2?0:k?.05:.2;
  const wrap=(x,y,w,h,col)=>{for(const dx of [-SKYW,0,SKYW])R(g,col,x+dx,y,w,h);};
  // far row of panelki
  let x=0;while(x<SKYW){const w=24+((r()*40)|0),h=8+((r()*14)|0);wrap(x,SKYH-h,w,h,sil2);x+=w+((r()*10)|0);}
  // factory chimneys with red lamps and smoke
  for(const [cx,h] of [[895,58],[912,66],[926,52]]){wrap(cx,SKYH-h,5,h,sil);wrap(cx-1,SKYH-h,7,2,sil);
    for(let j=0;j<9;j++){g.fillStyle=k?'rgba(200,180,190,'+(.35-j*.03)+')':'rgba(70,70,90,'+(.4-j*.035)+')';const px=cx+2-j*5,py=SKYH-h-3-j*3;for(const dx of [-SKYW,0,SKYW]){g.beginPath();g.arc(px+dx,py,3+j*.9,0,7);g.fill();}}}
  // the white house, far away
  {const cx=320,col=k?'#c8c0c4':'#4a4a5e',cd=k?'#9a90a0':'#35354a';wrap(cx,SKYH-22,70,22,col);wrap(cx+28,SKYH-40,14,18,col);wrap(cx+32,SKYH-47,6,7,col);wrap(cx+34,SKYH-54,1,7,'#303030');wrap(cx+35,SKYH-54,5,3,'#c02020');
    for(let yy=SKYH-19;yy<SKYH-2;yy+=4)for(let xx=cx+3;xx<cx+68;xx+=4)wrap(xx,yy,2,2,cd);}
  // near row of panelki with lit windows
  x=0;while(x<SKYW){const w=40+((r()*60)|0),h=14+((r()*26)|0);wrap(x,SKYH-h,w,h,sil);
    for(let yy=SKYH-h+3;yy<SKYH-2;yy+=4)for(let xx=x+3;xx<x+w-3;xx+=5)if(r()<win)wrap(xx,yy,2,2,r()<.8?'#d8904a':'#7088c8');
    x+=w+((r()*30)|0);if(x>860&&x<940)x=945;}
  if(k===3){const C='#4a5068',S='#5a6078';
    // half-built block: bare frame, floors and columns
    R(g,S,190,SKYH-70,120,70);for(let y=SKYH-70;y<SKYH;y+=10)R(g,'#8a92a8',192,y+2,116,6);for(let x=194;x<308;x+=12)R(g,S,x,SKYH-70,3,70);R(g,'#8a92a8',250,SKYH-70,58,30);
    // two tower cranes
    for(const [cx,h,j] of [[230,108,1],[300,96,-1]]){for(let y=SKYH-h;y<SKYH;y+=6){R(g,C,cx,y,5,1);R(g,C,cx,y,1,6);R(g,C,cx+4,y,1,6);}R(g,C,cx,SKYH-h,5,h);
      const jy=SKYH-h;R(g,C,j>0?cx-18:cx-70,jy,88,3);for(let x=0;x<86;x+=6)R(g,C,(j>0?cx-18:cx-70)+x,jy-3,1,3);R(g,C,cx-2,jy-10,9,10);R(g,'#c02020',cx+1,jy-12,3,2);
      const hx=cx+j*48;R(g,'#3a3a44',hx,jy+3,1,30);R(g,C,hx-3,jy+33,7,4);R(g,C,j>0?cx-18:cx+10,jy+3,10,8);}}
  return new Uint32Array(g.getImageData(0,0,SKYW,SKYH).data.buffer.slice(0));}
const SKYSITE=dawnSky(3),SKYDAY=dawnSky(2),SKYD0=dawnSky(0),SKYD1=dawnSky(1),SKYMIX=new Uint32Array(SKYW*SKYH);let skyMixK=-1;
function setDawn(k){k=Math.max(0,Math.min(1,k));if(Math.abs(k-skyMixK)<.012)return;skyMixK=k;const a=SKYD0,b=SKYD1,q=(k*256)|0,p=256-q;
  for(let i=0;i<a.length;i++){const u=a[i],v=b[i];SKYMIX[i]=(0xff000000|((((u>>>16&255)*p+(v>>>16&255)*q)>>8)<<16)|((((u>>>8&255)*p+(v>>>8&255)*q)>>8)<<8)|(((u&255)*p+(v&255)*q)>>8))>>>0;}}
setDawn(0);
function flick(l,t){if(!l.fl)return 1;if(l.fl===3)return .8+.2*Math.sin(t*2.3);const h=hash2(Math.floor(t*(l.fl===1?9:7)),l.fl*97+(l.x|0));return h<.08?.12:h<.14?.55:1;}
function updateLights(t){
  LR.set(BR_);LG.set(BG_);LB.set(BB_);
  for(const l of LIGHTS){const f=flick(l,t);for(let k=0;k<l.cells.length;k++){const c=l.cells[k],w=l.w[k]*f;LR[c]+=w*l.c[0];LG[c]+=w*l.c[1];LB[c]+=w*l.c[2];}}
  for(const i of DOORS){let r=0,g=0,b=0,n=0;for(const o of [1,-1,MW,-MW]){const j=i+o;if(j>=0&&j<N&&TILE[j]===0){r+=LR[j];g+=LG[j];b+=LB[j];n++;}}if(n){LR[i]=r/n;LG[i]=g/n;LB[i]=b/n;}}
  if(G.level===8||G.level===9||G.level===10||G.level===11){const L10=G.level===10||G.level===11;for(let i=0;i<N;i++){const z=ZONE[i];if(z===Z_OUT||z===Z_WATER||(L10&&TILE[i]!==0&&TILE[i]!==62)){LR[i]+=178;LG[i]+=172;LB[i]+=156;}else if(L10&&z===Z_HALL){const q=G.level===11?48:70;LR[i]+=q;LG[i]+=q*.97;LB[i]+=q*.9;}}}
  if(G.level===12){const DX=-.94,DY=-.34;for(let i=0;i<N;i++){const x=i%MW,y=(i/MW)|0;if(ZONE[i]===Z_OUT){LR[i]+=300;LG[i]+=200;LB[i]+=110;continue;}let sun=0;if(TILE[i]===0||TILE[i]===68||TILE[i]===69){let fx=x+.5,fy=y+.5;for(let d=.5;d<20;d+=.5){fx+=DX*.5;fy+=DY*.5;const cx=fx|0,cy=fy|0;if(cx<0||cy<0||cx>=MW||cy>=MH)break;const c=cy*MW+cx,tt=TILE[c];if(ZONE[c]===Z_OUT||tt===70){sun=Math.max(0,1-d/22);break;}if(tt===66||tt===67)break;}}
    const f=Math.max(0,Math.min(1,(60-x)/50))*.35+.15;if(TILE[i]!==0&&TILE[i]!==68&&TILE[i]!==69){LR[i]+=150;LG[i]+=124;LB[i]+=104;continue;}LR[i]+=sun*300+f*90+44;LG[i]+=sun*190+f*70+44;LB[i]+=sun*80+f*50+60;}}
  if(G.level===7){const d=G.dawn||0,ar=d*125,ag=d*88,ab=d*78;for(let i=0;i<N;i++)if(ZONE[i]===Z_OUT||ZONE[i]===Z_VOID){LR[i]+=ar;LG[i]+=ag;LB[i]+=ab;}
    const h=RF.heli;if(h&&RF.spot){const cx=h.x,cy=h.y,rr=2.8;for(let y=Math.max(0,(cy-rr)|0);y<=Math.min(MH-1,(cy+rr)|0);y++)for(let x=Math.max(0,(cx-rr)|0);x<=Math.min(MW-1,(cx+rr)|0);x++){const dd=Math.hypot(x+.5-cx,y+.5-cy);if(dd<rr){const w=Math.pow(1-dd/rr,1.3)*230;const i=y*MW+x;LR[i]+=w;LG[i]+=w;LB[i]+=w*.95;}}}}
  const bm=BRIGHT[SET.bright];if(bm!==1)for(let i=0;i<N;i++){LR[i]*=bm;LG[i]*=bm;LB[i]*=bm;}
}

let ents=[], eid=0;
const FOUND=new Set();
/* keep=true carries rubles, upgrades, weapons, ammo and vodka into the next run */
function resetLevel(keep){
  FOUND.clear();lure=null;G.face=null;G.goo=0;G.grab=null;
  const D=DIFF[SET.diff];
  G.grannyN=0;ents=[];G.kills=0;G.items=0;G.killTotal=0;G.itemTotal=0;G.secrets=0;G.time=0;G.msg='';G.bark='';G.barkT=0;G.msgT=0;G.hurt=0;G.bonus=0;G.flash=0;G.power=false;G.loot=false;G.trans=null;
  doorOpen.fill(0);doorTarget.fill(0);doorTimer.fill(0);SEEN.fill(0);
  if(!keep){G.rub=0;for(const k in UP)UP[k]=0;Object.assign(P,{ammo9:8,shells:0,has:[1,1,0,0],w:1,vodka:0,kefir:0});G.floorN=1;}
  else{P.ammo9=Math.max(P.ammo9,8);}
  const ST=LEVELDEF[G.level].start;G.cleared=false;G.hasKey=G.hasKey&&keep;G.bossOn=false;G.healT=6;G.brawlUsed=false;G.firstDeadT=-1;G.clearT=0;G.safeFound=false;
  G.fuses=0;G.liftKey=false;G.dvOn=false;G.dvDown=false;G.cut=null;G.flatKey=false;G.liftBreak=0;G.codeOK=false;G.brk=null;G.kp=null;G.boardHP={};G.code=[1,2,3].map(()=>1+((Math.random()*9)|0));
  Object.assign(P,{x:ST.x,y:ST.y,a:ST.a,bleed:0,hp:maxHP(),armor:UP.vest?50:0,cool:0,anim:9,punch:0,bob:0,bobAmt:0,camZ:.5,switchT:0,faceHurt:0,faceGrin:0,throwT:0});
  if(!P.has[P.w])P.w=1;
  for(const [t,x0,y0] of LEVEL_SRC[G.level].ents){const x=x0,y=y0;
    if(NPCS[t]){const D2=NPCS[t];ents.push({kind:'npc',t,x,y,spr:D2.spr,sc:D2.sc||1,block:D2.block||0,talk:D2.talk,walk:D2.walk?1:0,dir:hash2(x*10|0,y*10|0)<.5?1:-1,x0:x-6,x1:x+6,shout:D2.shout,wk:0});continue;}
    if(t==='car'){ents.push({kind:'car',x,y});continue;}
    if(t==='vent'){ents.push({kind:'vent',x,y,ph:hash2(x*10|0,y*10|0)*3.6,was:false});continue;}
    if(PROPS[t]) ents.push({kind:'prop',t,x,y,sc:PROPS[t].sc,block:PROPS[t].block});
    else if(ITEMS[t]){if(ITEMS[t].lore&&NOTESGOT.includes(t))continue;ents.push({kind:'item',t,x,y,v:G.level===8&&t==='rub'?5+((hash2(x*10|0,y*10|0)*10)|0):t==='rubS'?(G.level===3?60:40):t==='safe'?250:0});if(!ITEMS[t].money&&!ITEMS[t].lore)G.itemTotal++;}
    else if(KINDS[t]){const K=KINDS[t];let x=x0,y=y0;const rr=K.rad||.32*K.scale;if(solidR(x,y,rr)){x=(x|0)+.5;y=(y|0)+.5;}ents.push({kind:'enemy',k:t,x,y,hp:K.hp*D.hp,max:K.hp*D.hp,state:'idle',t:0,cool:0,alert:!!K.roller,pain:0,walk:0,id:eid++,rad:K.rad||.32*K.scale,stT:2+Math.random()*3,stun:0,rage:false,rageT:0,losT:0,see:false,sdir:Math.random()<.5?1:-1,box:K.box||0});if(K.granny){const b=ents[ents.length-1];b.gs='sit';b.sus=0;b.sx=x;b.sy=y;b.note=G.level===6?'note13':G.level===1?'note9':G.grannyN++?'note11':'note10';}else G.killTotal++;}
  }
  G.duel=null;G.rc=null;G.drop=null;G.dropDead=false;G.roll=0;P.pitch=0;RF.heli=null;RF.spot=false;RF.rain=[];
  const LD=LEVELDEF[G.level];if(LD.init)LD.init();
  computeFlow();
}

