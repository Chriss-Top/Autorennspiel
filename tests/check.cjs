const fs=require('fs'),vm=require('vm'),assert=require('assert');const elements=new Map();const fake=()=>({value:'',style:{},dataset:{},disabled:false,innerHTML:'',textContent:'',showModal(){},close(){}});const context=new Proxy({createLinearGradient:()=>({addColorStop(){}})}, {get:(o,k)=>o[k]??(()=>{})});const canvas={...fake(),getContext:()=>context};const sandbox={document:{createElement:()=>({...canvas}),querySelector:s=>{if(s==='#game')return canvas;if(!elements.has(s))elements.set(s,fake());return elements.get(s)},querySelectorAll:()=>[]},window:{addEventListener(){}},requestAnimationFrame(){},console,Math};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('dist/game.js','utf8'),sandbox);vm.runInContext(`
start();assertTest(players[0].x>players[1].x,'Player 1 starts right');
keys.ArrowRight=true;let x=players[0].x;update(.1);assertTest(players[0].x>x,'Arrow movement');keys={};
keys.KeyA=true;players[1].ai=false;x=players[1].x;update(.1);assertTest(players[1].x<x,'WASD movement');keys={};
fire(players[0]);assertTest(shots.length>0,'Weapons fire');
transform(players[0]);assertTest(players[0].form==='Drache','Alex transforms');
players[0].hp=0;objects=[{type:'heal',x:players[1].x,y:players[1].y-20,speed:0,age:0}];update(.01);assertTest(players[0].hp===35,'Team repair revives');
pause();assertTest(state==='paused','Pause');pause();assertTest(state==='running','Resume');
distance=2999;update(.1);assertTest(state==='ended','Finish reached');
for(let w=0;w<4;w++){world=w;start();players.forEach(p=>p.ai=true);for(let t=0;t<1500&&state==='running';t++)update(.04);draw();assertTest(Number.isFinite(distance),'Simulation remains finite');}
start();let alex=players[0];
objects=[{type:'enemy',x:300,y:100,hp:65},{type:'enemy',x:600,y:200,hp:65},{type:'rock',x:400,y:100,hp:65},{type:'bullet',x:500,y:50}];
superWeapon(alex,'blast');assertTest(objects.filter(o=>o.type==='enemy').every(o=>o.dead),'Fire blast instantly clears every enemy');assertTest(!objects.find(o=>o.type==='rock').dead,'Fire blast preserves rocks');assertTest(alex.blastCD===8,'Fire blast cooldown');
let before=effects.length;superWeapon(alex,'blast');assertTest(effects.length===before,'Cooldown blocks repeated blast');
objects=[{type:'rock',x:alex.x,y:alex.y-65,hp:999,age:0,speed:0}];superWeapon(alex,'bomb');assertTest(shots.some(s=>s.type==='stonebomb'),'Stone bomb launched');update(.01);assertTest(!objects.some(o=>o.type==='rock'),'Stone bomb instantly destroys high-health rock');
let originalRandom=Math.random;Math.random=()=>0;objects=[];let rock={type:'rock',x:300,y:200};destroyRock(rock);assertTest(objects.some(o=>o.type==='enemy'),'Destroyed rock can spawn enemy');Math.random=()=>.99;objects=[];destroyRock({type:'rock',x:300,y:200});assertTest(objects.length===0,'Enemy spawn is not guaranteed');Math.random=originalRandom;
for(const form of ['Drache','Flugzeug','Raumschiff','Panzer','Roboter','Geist','Banane','Zauberobjekt'])drawCar(400,400,'#aaff88',false,form);
start();players.forEach(p=>p.ai=false);chooseForm(0,4);assertTest(players[0].form==='Panzer','Click selects tank');for(let i=0;i<400;i++){objects=[];update(.04);}assertTest(players[0].form==='Panzer','Form persists beyond old time limit');chooseForm(0,5);assertTest(players[0].form==='Roboter','Explicit form change');
start();let types=[];for(let i=0;i<forms.length;i++){chooseForm(0,i);players[0].cd=0;shots=[];fire(players[0]);types.push(shots[0].type);}assertTest(new Set(types).size===forms.length,'Every form has distinct projectile');
start();players.forEach(p=>p.ai=false);let p=players[0];objects=[{type:'rocket',x:p.x,y:p.y-2,age:0,speed:0}];update(.001);assertTest(p.rockets===1,'Rocket pickup collision');shots=[];useItem(p,'rocket');assertTest(p.rockets===0&&shots[0].type==='rocket','Rocket consumes inventory');useItem(p,'rocket');assertTest(shots.length===1,'No free rockets');
collect(p,{type:'barrel'});useItem(p,'oil');let slick=objects.find(o=>o.type==='oil');assertTest(slick&&p.oil===0,'Oil placed from inventory');players[1].x=slick.x;players[1].y=slick.y+1;update(.001);assertTest(players[1].slip>0,'Oil slips other player');
objects.push({type:'enemy',x:slick.x,y:slick.y,hp:65,age:0,cd:5,speed:0,seed:0});update(.001);assertTest(objects.find(o=>o.type==='enemy').slip>0,'Oil slips enemy');
collect(p,{type:'boost'});assertTest(p.boost===6,'Boost card activates immediately');let d=distance;update(.1);let boosted=distance-d;p.boost=0;d=distance;update(.1);assertTest(boosted>1.5*(distance-d),'Turbo increases track speed');
for(let w=0;w<4;w++){world=w;assertTest(Math.abs(roadOffset(0)-roadOffset(500))>1,'Curved road in each world');}
console.log('PASS: permanent form selection, seven unique weapons, rocket inventory, oil collisions, boost and four curved worlds');
console.log('PASS: super weapons, cooldowns, instant rock destruction, random enemy emergence and distinct form drawing');
console.log('PASS: controls, weapons, transformation, repair, pause, finish and four-world simulation');
`,vm.createContext?Object.assign(sandbox,{assertTest:(v,m)=>assert(v,m)}):sandbox);
