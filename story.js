/* Short, skippable scenes. No timers advance dialogue or alter saved progress. */
(() => {
  'use strict';
  const scenes={
    intro:[
      {tag:'PRÓLOGO · UN HÉROE POR ACCIDENTE',title:'Otro mundo. La misma hambre.',speaker:'TÚ',line:'«Bosques encantados, dos lunas… Después averiguo. Primero, el chorizo.»',art:'camp'},
      {tag:'PRÓLOGO · UN ROBO MUY PERSONAL',title:'Ni siquiera esperó al pan.',speaker:'UN DRAGÓN DEMASIADO PEQUEÑO',line:'Baja entre los árboles, se lleva tu almuerzo y abre un portal con las garras.',art:'theft'},
      {tag:'PRÓLOGO · LA GRAN MISIÓN',title:'Devolveme el chorizo.',speaker:'TÚ',line:'«No sé dónde estoy. No sé hacer magia. Pero ese chorizo es mío.» Seguí al dragón por los Campos del Reino.',art:'portal'}
    ],
    chief:[
      {tag:'CAMPOS DEL REINO · EL PEAJE TERMINÓ',title:'El rey perdió la corona.',speaker:'TÚ',line:'«No vine por tu reino. ¿Viste un dragón con mi almuerzo?» Entre las ramas, algo rojo vuelve a moverse.',art:'chief'},
      {tag:'RUMBO A VALDREN',title:'Todavía lo lleva consigo.',speaker:'EL RASTRO',line:'El dragón cruza un arco derrumbado. Detrás, las flores se apagan. Alcanzá el portal: las Ruinas de Valdren te esperan.',art:'ruins'}
    ]
  };
  const dialog=document.getElementById('story-dialog'),canvas=document.getElementById('story-art'),ctx=canvas.getContext('2d');
  const title=document.getElementById('story-title'),copy=document.getElementById('story-copy'),next=document.getElementById('story-next');
  let sequence=[],index=0,elapsed=0,done=null;
  function show(){const s=sequence[index];elapsed=0;document.getElementById('story-tag').textContent=s.tag;title.textContent=s.title;copy.textContent=s.line;document.getElementById('story-speaker').textContent=s.speaker;document.getElementById('story-count').textContent=`${index+1} / ${sequence.length}`;next.textContent=index===sequence.length-1?'A JUGAR →':'SEGUIR →';draw();}
  function finish(){if(!done)return;const callback=done;done=null;dialog.close();document.body.classList.remove('story-open');callback();}
  function advance(){if(index+1<sequence.length){index++;show();}else finish();}
  next.addEventListener('click',advance);
  document.getElementById('story-skip').addEventListener('click',finish);
  dialog.addEventListener('cancel',e=>{e.preventDefault();finish();});
  window.addEventListener('keydown',e=>{if(!dialog.open)return;if((e.code==='Enter'||e.code==='Space')&&!(e.target instanceof HTMLButtonElement)){e.preventDefault();if(!e.repeat)advance();}});
  function draw(){
    if(!sequence.length)return;
    const s=sequence[index],dark=s.art==='ruins',t=elapsed;
    ctx.imageSmoothingEnabled=false;
    ctx.fillStyle=dark?'#555e63':'#a4d5c3';ctx.fillRect(0,0,640,240);
    const box=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
    box(470,22,42,42,dark?'#c1bda4':'#fff0ba');
    for(let i=0;i<9;i++){const x=i*85;box(x,95+(i%3)*12,70,110,dark?'#667264':'#8bb575');box(x+28,72,20,144,dark?'#444e45':'#648c59');box(x+12,65,53,55,dark?'#586550':'#78a65d');}
    box(0,208,640,32,'#665539');box(0,204,640,6,dark?'#909162':'#b4cd78');
    if(dark){for(const x of [420,530]){box(x,65,22,139,'#373d3b');box(x-6,55,34,13,'#8b8971');}box(418,50,135,10,'#656958');}
    else {for(let i=0;i<12;i++){box(i*57+13,198,2,6,'#597745');box(i*57+10,196,8,3,i%2?'#fff0b2':'#e9a59b');}}
    const portal=s.art==='portal'||s.art==='theft';
    if(portal){for(let i=0;i<24;i++){const a=i*Math.PI/12;box(517+Math.cos(a)*30,132+Math.sin(a)*58,6,6,i%2?'#b083cd':'#efe3b6');}box(501,102,34,61,'#735387');}
    ctx.save();ctx.translate(200,204);ctx.scale(2,2);UmbralArt.hero(ctx,0,0,1,{state:s.art==='camp'?'idle':'run',time:t,cycle:s.art==='camp'?0:t*7});ctx.restore();
    if(s.art==='camp'){
      box(255,195,35,6,'#4a3f32');UmbralArt.flame(ctx,273,187,t,.7,1);box(248,159,53,3,'#514331');UmbralArt.chorizo(ctx,274,154,1.6);
    }else if(s.art==='chief'){
      box(310,198,30,6,'#aa783f');box(313,189,5,11,'#e6bb62');box(325,185,5,15,'#e6bb62');box(337,189,5,11,'#e6bb62');
      UmbralArt.dragon(ctx,480+Math.sin(t)*25,72+Math.sin(t*3)*5,t,1,1.7,true);
    }else {const x=s.art==='theft'?310+Math.min(1,t/3)*180:dark?470+Math.sin(t*.8)*40:467;UmbralArt.dragon(ctx,x,110+Math.sin(t*4)*7,t,1,1.9,true);}
  }
  window.ChorizoStory={
    get open(){return dialog.open;},
    play(kind,onDone){sequence=scenes[kind];index=0;done=onDone;document.body.classList.add('story-open');dialog.showModal();show();next.focus();},
    update(dt){if(dialog.open&&!document.hidden)elapsed+=dt;},draw
  };
})();
