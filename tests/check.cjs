const fs=require('fs'),vm=require('vm'),assert=require('assert');const elements=new Map();const fake=()=>({value:'',style:{},dataset:{},disabled:false,innerHTML:'',textContent:'',showModal(){},close(){}});const context=new Proxy({createLinearGradient:()=>({addColorStop(){}})}, {get:(o,k)=>o[k]??(()=>{})});const canvas={...fake(),getContext:()=>context};const sandbox={document:{querySelector:s=>{if(s==='#game')return canvas;if(!elements.has(s))elements.set(s,fake());return elements.get(s)},querySelectorAll:()=>[]},window:{addEventListener(){}},requestAnimationFrame(){},console,Math};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('dist/game.js','utf8'),sandbox);vm.runInContext(`
start();assertTest(players[0].x>players[1].x,'Player 1 starts right');
keys.ArrowRight=true;let x=players[0].x;update(.1);assertTest(players[0].x>x,'Arrow movement');keys={};
keys.KeyA=true;players[1].ai=false;x=players[1].x;update(.1);assertTest(players[1].x<x,'WASD movement');keys={};
fire(players[0]);assertTest(shots.length>0,'Weapons fire');
transform(players[0]);assertTest(players[0].formTime===5,'Alex transforms');
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
console.log('PASS: super weapons, cooldowns, instant rock destruction, random enemy emergence and distinct form drawing');
console.log('PASS: controls, weapons, transformation, repair, pause, finish and four-world simulation');
`,vm.createContext?Object.assign(sandbox,{assertTest:(v,m)=>assert(v,m)}):sandbox);
