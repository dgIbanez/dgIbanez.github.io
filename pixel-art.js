/* Original pixel sprites and frame animations. No external images or fonts. */
(() => {
  'use strict';
  const cache = new Map();
  const ink = '#171e25';
  // Shared timing keeps the visible swing and its damage window in sync.
  const swordTiming = Object.freeze({duration:.34,windup:.08,activeEnd:.26,cooldown:.44,hitstop:.055});
  function painter(context) {
    return {
      box(x,y,w,h,c) { context.fillStyle=c;context.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h)); },
      poly(points,c) { context.fillStyle=c;context.beginPath();points.forEach(([x,y],i)=>i?context.lineTo(x,y):context.moveTo(x,y));context.closePath();context.fill(); },
      disk(x,y,r,c) { for(let yy=-r;yy<=r;yy++){const half=Math.floor(Math.sqrt(r*r-yy*yy));this.box(x-half,y+yy,half*2+1,1,c);} },
      line(x,y,xx,yy,c,width=1) { const n=Math.max(Math.abs(xx-x),Math.abs(yy-y));for(let i=0;i<=n;i++)this.box(x+(xx-x)*i/Math.max(1,n),y+(yy-y)*i/Math.max(1,n),width,width,c); }
    };
  }
  function humanoid(p,type,frame,state) {
    const hero=type==='hero',goblin=type==='goblin',hob=type==='hobgoblin',bone=type==='skeleton';
    const step=state==='jump'?3:state==='walk'?[0,2,3,1,-1,-3,-2,-1][frame]:0;
    const bob=state==='walk'?[0,0,-1,-1,0,0,-1,-1][frame]:frame>4?-1:0;
    const striking=state==='attack',cast=state==='cast',hurt=state==='hurt';
    const skin=hero?['#966749','#c99b71','#f0cc99']:goblin?['#345443','#628d49','#aacb68']:hob?['#6e4739','#a86743','#d19458']:['#797b6d','#c4c6ad','#f3efd1'];
    const armor=hero?['#283b3a','#46605a','#8ca08a']:goblin?['#423326','#74553a','#a57a49']:hob?['#34313a','#575467','#969199']:['#463d4b','#645464','#8b7082'];
    const y=6+bob;
    // Separate boots and leg poses produce eight readable walking frames.
    p.box(12+step,37,7,9,ink);p.box(24-step,37,7,9,ink);
    p.box(13+step,38,5,5,armor[1]);p.box(25-step,38,5,5,armor[1]);
    p.box(11+step,44,9,3,'#564536');p.box(24-step,44,10,3,'#564536');
    if(hero){p.poly([[12,y+17],[6,y+22],[3+(frame%3),42],[17,39],[20,y+22]],'#492b35');p.poly([[11,y+20],[7,y+26],[5,39],[13,36],[16,25]],'#a04345');p.line(9,29,7,37,'#d1745b');}
    p.box(11,y+17,22,20,ink);p.box(13,y+19,18,15,armor[0]);p.box(16,y+20,13,12,armor[1]);
    p.box(17,y+20,3,10,armor[2]);p.box(25,y+22,3,7,armor[2]);
    p.box(12,y+32,21,4,'#372d26');p.box(23,y+32,4,4,'#c5a059');p.box(24,y+33,2,2,'#f1d78a');
    // Head silhouette, ears and face features remain distinct at game scale.
    p.box(13,y,18,19,ink);p.box(15,y+2,15,15,skin[0]);p.box(16,y+3,13,11,skin[1]);p.box(19,y+4,10,5,skin[2]);
    if(goblin||hob){p.poly([[15,y+5],[5,y+1],[7,y+10],[16,y+13]],ink);p.poly([[14,y+6],[7,y+4],[9,y+9],[15,y+10]],skin[1]);p.poly([[29,y+5],[37,y+2],[34,y+11],[29,y+12]],ink);p.poly([[30,y+6],[35,y+5],[32,y+10]],skin[2]);p.box(26,y+10,8,5,skin[1]);p.box(29,y+11,5,2,skin[2]);}
    p.box(19,y+9,4,3,ink);p.box(27,y+9,4,3,ink);p.box(21,y+9,2,2,bone?'#79e5b8':'#fbe48e');p.box(29,y+9,2,2,bone?'#79e5b8':'#fbe48e');
    p.box(24,y+14,7,2,'#50302e');p.box(27,y+14,2,3,'#f4e7ba');
    if(hero){p.poly([[12,y+4],[15,y-3],[28,y-4],[33,y+2],[31,y+6],[26,y+2],[17,y+4],[16,y+15],[12,y+13]],ink);p.poly([[14,y+3],[17,y-1],[27,y-2],[30,y+2],[24,y+1],[17,y+6],[15,y+12],[14,y+10]],'#a6b5ab');p.line(17,y,26,y-1,'#e3e0c3');p.box(15,y+17,17,4,'#a44744');p.box(18,y+18,9,1,'#e68c68');}
    if(hob){p.box(11,y-2,21,7,ink);p.box(12,y-1,19,4,'#737182');p.box(16,y-3,10,2,'#a8a3a8');p.box(13,y+1,17,1,'#b4a787');p.poly([[12,y+2],[8,y-6],[16,y-1]],'#d2c2a0');p.poly([[28,y-1],[34,y-5],[31,y+4]],'#d2c2a0');p.box(8,y+18,11,7,ink);p.box(9,y+19,9,4,'#96909c');p.box(28,y+18,9,7,ink);p.box(29,y+19,7,4,'#96909c');}
    if(bone){p.box(15,y+4,13,7,'#e3dfc7');p.box(18,y+8,4,4,ink);p.box(26,y+8,4,4,ink);p.box(25,y+13,2,2,ink);for(let i=0;i<3;i++)p.box(20+i*3,y+16,2,3,'#ece9cf');for(let i=0;i<3;i++){p.box(15,y+21+i*4,13,2,'#c9cab1');p.box(20,y+20,3,12,'#ebead0');}}
    const handX=(striking||cast)?34:31,handY=(striking||cast)?y+20:y+28;
    p.box(8,y+22,6,11,ink);p.box(9,y+23,4,8,armor[1]);p.box(9,y+30,4,4,skin[1]);
    p.box(29,y+22,striking||cast?10:5,striking||cast?5:9,ink);p.box(30,y+23,striking||cast?8:3,striking||cast?3:7,armor[2]);p.box(handX,handY,5,5,skin[1]);p.box(handX+1,handY,3,2,skin[2]);
    if(goblin){const tip=striking?47:39;p.line(handX+3,handY+2,tip,handY-(striking?1:13),ink,3);p.line(handX+4,handY+2,tip,handY-(striking?1:13),'#d8e4da',1);p.box(handX,handY+2,8,2,'#bc965e');}
    if(hob){const mx=striking?44:39;p.box(mx,handY-15,3,22,'#50372e');p.box(mx+1,handY-15,1,20,'#ba8854');p.box(mx-5,handY-18,13,9,ink);p.box(mx-4,handY-17,11,6,'#73717c');p.box(mx-3,handY-17,8,2,'#c0b8ad');for(let i=0;i<3;i++)p.box(mx-3+i*4,handY-20,2,3,'#b0a69a');}
    if(bone){p.line(37,y+8,42,y+15,'#bb915d');p.line(42,y+15,43,y+27,'#bb915d');p.line(43,y+27,38,y+36,'#bb915d');p.line(37,y+8,38,y+36,'#dfd9b0');if(striking)p.line(31,y+21,47,y+21,'#d7c8a2');}
    if(hero&&!striking&&!cast){p.line(33,32,39,17,ink,3);p.line(34,31,40,17,'#a3bec1');p.line(35,29,40,16,'#e1efdf');p.box(30,32,8,2,'#d7b46a');}
    if(hurt){p.box(14,y+11,3,3,'#c84952');p.box(18,y+25,3,2,'#c84952');}
  }
  function creature(p,type,frame,state) {
    if(type==='chief'){
      humanoid(p,'goblin',frame,state);
      p.poly([[10,12],[8,4],[17,8],[23,0],[28,8],[36,4],[33,14]],ink);
      p.poly([[12,11],[11,7],[18,10],[23,4],[27,10],[33,7],[31,12]],'#ddae50');p.box(21,9,4,3,'#d95840');
      p.box(6,21,10,7,ink);p.box(7,22,8,4,'#c89b53');p.box(28,22,10,6,'#c89b53');
      const my=state==='cast'?4:state==='attack'?26:15;
      p.line(36,36,40,my+7,'#674730',3);p.box(34,my,13,11,ink);p.box(35,my+1,11,8,'#8b8590');p.box(35,my+1,10,2,'#c9c4b2');
      return;
    }
    if(['hero','goblin','hobgoblin','skeleton'].includes(type)){humanoid(p,type,frame,state);return;}
    if(type==='walker'){
      const squash=[0,1,2,1,0,-1,-2,-1][frame];
      p.poly([[7,43],[5,34+squash],[9,25+squash],[16,20+squash],[29,20+squash],[37,27+squash],[41,37],[37,44]],ink);
      p.poly([[8,41],[8,33+squash],[13,25+squash],[21,23+squash],[30,25+squash],[36,32+squash],[38,40],[34,43],[13,43]],'#477d58');
      p.poly([[10,33+squash],[15,25+squash],[25,24+squash],[32,28+squash],[33,34+squash],[27,38],[15,38]],'#77b675');p.box(16,26+squash,8,3,'#c3e5a0');p.box(13,30+squash,3,3,'#a6d999');p.box(23,33+squash,3,4,ink);p.box(32,33+squash,3,4,ink);p.box(26,39+squash,5,1,'#2b543e');p.box(11,42,7,1,'#92c67c');return;
    }
    if(type==='bat'){
      const flap=[0,-4,-8,-4,0,5,8,5][frame];
      for(const side of [-1,1]){p.poly([[24,29],[24+side*9,16+flap],[24+side*23,12+flap],[24+side*19,26+flap],[24+side*13,24+flap],[24+side*8,32]],ink);p.poly([[24,28],[24+side*9,19+flap],[24+side*20,15+flap],[24+side*16,24+flap],[24+side*9,25+flap]],'#775776');p.line(24,28,24+side*15,19+flap,'#b68b9d');}
      p.box(19,21,11,14,ink);p.box(20,21,9,11,'#5c4864');p.poly([[20,23],[18,15],[24,22]],'#9a7795');p.poly([[26,22],[30,15],[29,25]],'#9a7795');p.box(20,25,3,2,'#f5cd6c');p.box(26,25,3,2,'#f5cd6c');p.box(23,31,1,3,'#eee0c2');p.box(26,31,1,3,'#eee0c2');return;
    }
    if(type==='hound'){
      const step=[0,2,4,2,0,-2,-4,-2][frame];
      p.poly([[2,32],[1,23],[9,30],[16,25],[29,25],[34,19],[42,20],[45,29],[48,31],[46,38],[34,39],[28,36],[11,38]],ink);
      p.poly([[8,32],[16,27],[28,27],[35,23],[42,23],[43,30],[46,32],[45,36],[34,37],[27,33],[13,36]],'#85483e');p.box(17,27,12,4,'#c37b54');p.box(34,28,10,5,'#ae6b4b');p.box(38,26,3,2,'#fff09c');p.box(39,34,8,2,'#3a2830');p.box(41,35,2,3,'#e8d9b1');p.poly([[33,23],[32,14],[38,22]],'#c7b28e');p.poly([[39,23],[42,15],[43,25]],'#c7b28e');for(let i=0;i<3;i++)p.line(16+i*4,30,17+i*4,35,'#d1b78e');p.box(10+step,36,4,9,'#60362f');p.box(29-step,36,4,9,'#60362f');p.box(9+step,43,7,2,'#ba9471');p.box(29-step,43,7,2,'#ba9471');return;
    }
    // The executioner's original silhouette gains segmented armor and a pulsing core.
    const step=state==='walk'?[0,1,2,1,0,-1,-2,-1][frame]:0;
    p.box(9+step,34,10,13,ink);p.box(27-step,34,10,13,ink);p.box(10+step,35,8,9,'#777173');p.box(28-step,35,8,9,'#777173');p.box(8+step,44,13,3,'#ada490');p.box(26-step,44,13,3,'#ada490');p.box(9,17,29,22,ink);p.box(11,19,25,16,'#6a5558');p.box(14,21,19,12,'#9f6a59');p.box(5,17,12,8,ink);p.box(6,18,10,5,'#a6a299');p.box(31,17,12,8,ink);p.box(32,18,10,5,'#a6a299');p.box(7,25,6,12,'#706c70');p.box(35,25,6,12,'#706c70');p.box(17,4,16,15,ink);p.box(18,6,14,11,'#b9a991');p.box(16,3,18,6,'#64626a');p.box(18,3,13,2,'#aca8a0');p.poly([[17,7],[10,0],[14,12]],'#d6c7a2');p.poly([[31,6],[38,0],[35,12]],'#d6c7a2');p.box(19,10,4,3,'#ff895e');p.box(28,10,4,3,'#ff895e');p.box(23,16,6,2,'#463038');p.box(21,24,9,10,ink);p.box(23,25,5,7,frame%4<2?'#ef7048':'#d24445');p.box(24,26,3,4,'#ffd788');p.box(13,34,22,3,'#40343b');
  }
  function makeSprite(type,state,frame) {
    const sheet=document.createElement('canvas');sheet.width=48;sheet.height=48;
    creature(painter(sheet.getContext('2d')),type,frame,state);return sheet;
  }
  function actor(ctx,type,x,feet,width,height,direction,time,state='idle',phase=0) {
    const frame=Math.floor((time+phase)*(state==='walk'?12:state==='attack'?20:8))%8;
    const key=`${type}:${state}:${frame}`;
    if(!cache.has(key))cache.set(key,makeSprite(type,state,frame));
    ctx.save();ctx.translate(Math.round(x),Math.round(feet));ctx.scale(direction,1);ctx.imageSmoothingEnabled=false;
    ctx.drawImage(cache.get(key),-Math.round(width/2),-height,width,height);ctx.restore();
  }
  function flame(ctx,x,y,time,size=1,direction=1) {
    const p=painter(ctx),f=Math.floor(time*14)%6;
    ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(direction*size,size);
    p.poly([[-22,6],[-26,0],[-19,1],[-24,-9],[-14,-5],[-17,-16+f],[-7,-9],[-3,-13],[6,-9],[13,-2],[12,7],[5,12],[-9,12]],'#9a203e');
    p.poly([[-20,5],[-18,-2],[-13,0],[-14,-11+f],[-6,-6],[0,-10],[7,-6],[11,0],[9,7],[3,10],[-8,9]],'#f25135');
    p.poly([[-13,4],[-9,-2],[-5,1],[-3,-7+f],[3,-4],[7,1],[5,7],[-3,8]],'#ffa936');p.poly([[-5,4],[-2,-1],[2,0],[4,4],[0,7]],'#fff0a1');
    p.box(-27-f*2,2-f,3,3,'#ffc34b');p.box(-18-f*3,-9,2,2,'#ed6d3c');ctx.restore();
  }
  function effect(ctx,e) {
    const p=painter(ctx),progress=1-e.life/e.max,f=Math.floor(progress*6);
    ctx.save();ctx.translate(Math.round(e.x),Math.round(e.y));
    if(e.kind==='impact'){
      const r=3+progress*16;
      for(let i=0;i<8;i++){const a=i*Math.PI/4+.25;const x=Math.cos(a)*r,y=Math.sin(a)*r;p.line(x*.4,y*.4,x,y,i%2?'#edb466':'#f7f5dc',progress<.4?2:1);}
      if(progress<.4)p.disk(0,0,3,'#fff8d6');
    }else if(e.kind==='dust'){
      for(let i=0;i<6;i++){const x=(i-2.5)*(3+progress*6),y=-Math.sin(progress*Math.PI)*(2+i%3);p.box(x,y,Math.max(1,4-progress*4),2,progress>.65?'#bab09055':'#c2bb9288');}
    }else if(e.kind==='burst'){
      const r=5+progress*(e.radius||27);p.disk(0,0,Math.round(r),'#9b263452');
      for(let i=0;i<9;i++){const a=i*Math.PI*2/9+f*.13,rr=r*(.5+(i%3)*.2);const x=Math.round(Math.cos(a)*rr),y=Math.round(Math.sin(a)*rr);p.disk(x,y,Math.max(1,6-f),'#ef6535');p.box(x-1,y-2,3,4,'#ffd25b');p.box(x,y-1,1,2,'#fff5c4');}
    }else if(e.kind==='wind'){
      for(let layer=0;layer<4;layer++){const y=layer*7-14,r=8+layer*3;for(let a=0;a<Math.PI*2;a+=.17){const x=Math.round(Math.cos(a+progress*8)*r),yy=Math.round(y+Math.sin(a+progress*8)*3);p.box(x,yy,3,2,a<Math.PI?'#b0f4d7':'#379c99');}}p.box(0,-23+f*3,2,3,'#edfff1');
    }else if(e.kind==='mana'||e.kind==='heal'){
      const color=e.kind==='mana'?'#79ccee':'#e7b4d3';
      for(let i=0;i<6;i++){const x=(i-2.5)*8,y=-progress*35+Math.sin(i*3)*10;p.box(x-3,y,7,1,color);p.box(x,y-3,1,7,color);p.box(x,y,2,2,'#f4fbeb');}
      for(let x=-20;x<22;x+=4)p.box(x,9+Math.sin(x+f)*2,3,2,color);
    }else if(e.kind==='slash'){
      const dir=e.dir||1;for(let i=0;i<18;i++){const a=-1.35+i*.12+progress*.3,r=26+progress*14;const x=dir*Math.cos(a)*r,y=Math.sin(a)*r;p.box(x,y,5,3,i<9?'#f4e8b2':'#95ced2');p.box(x-dir*4,y,3,2,'#536c8155');}
    }ctx.restore();
  }
  const lerp=(a,b,t)=>a+(b-a)*t;
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
  function swingPose(elapsed) {
    const keys=[
      [0,33,32,-.95,0,0], [.045,20,18,-2.2,-2,1],
      [.08,27,18,-1.28,0,0], [.16,37,25,.1,3,1],
      [.26,34,29,.42,2,2], [.34,33,32,-.95,0,0]
    ];
    elapsed=Math.max(0,Math.min(swordTiming.duration,elapsed));
    let i=1;while(i<keys.length-1&&elapsed>keys[i][0])i++;
    const a=keys[i-1],b=keys[i],t=smooth((elapsed-a[0])/(b[0]-a[0]));
    return {hand:[lerp(a[1],b[1],t),lerp(a[2],b[2],t)],angle:lerp(a[3],b[3],t),lean:lerp(a[4],b[4],t),bob:lerp(a[5],b[5],t),active:elapsed>=swordTiming.windup&&elapsed<swordTiming.activeEnd};
  }
  function heroPose(motion={}) {
    const {state='idle',time=0,cycle=0,elapsed=0,speed=0}=motion;
    const phase=Math.round(cycle/(Math.PI*2)*12)/12*Math.PI*2;
    const gait=Math.sin(phase),stride=state==='run'?8:5;
    const walking=state==='walk'||state==='run'||(state==='attack'&&speed>25);
    const bob=walking?Math.round(Math.cos(phase*2)):Math.sin(time*2.4)>.4?-1:0;
    const pose={state,lean:state==='run'?2:0,bob,hand:[33,31],rear:[11,32],feet:[[14,46],[28,46]],knees:[[15,39],[27,39]],angle:-.95,blade:true,cape:Math.sin(time*7)*2,active:false};
    if(walking){
      pose.feet=[[14+gait*stride,46-Math.max(0,Math.cos(phase))*5],[28-gait*stride,46-Math.max(0,-Math.cos(phase))*5]];
      pose.knees=[[16+gait*3,38-Math.max(0,Math.cos(phase))*3],[27-gait*3,38-Math.max(0,-Math.cos(phase))*3]];
      pose.hand=[33-gait*3,30+gait*2];pose.rear=[11+gait*4,30-gait*2];pose.angle=-.85-gait*.12;pose.cape=-5+Math.sin(phase-1)*3;
    }
    if(state==='rise'||state==='jump'){
      pose.lean=1;pose.bob=-1;pose.feet=[[12,40],[31,43]];pose.knees=[[14,34],[28,37]];pose.hand=[34,25];pose.rear=[9,26];pose.angle=-.65;pose.cape=3;
    }else if(state==='fall'){
      pose.feet=[[14,45],[31,44]];pose.knees=[[14,37],[29,38]];pose.hand=[36,24];pose.rear=[7,25];pose.angle=.3;pose.cape=-7;
    }else if(state==='land'){
      const compression=Math.sin(Math.PI*Math.min(1,elapsed/.14))*4;
      pose.bob=compression;pose.lean=1;pose.feet=[[11,46],[31,46]];pose.knees=[[12,39+compression*.5],[30,39+compression*.5]];pose.hand=[34,32+compression];pose.rear=[9,33];pose.cape=3;
    }else if(state==='dash'){
      pose.bob=4;pose.lean=6;pose.feet=[[8,43],[27,45]];pose.knees=[[12,36],[27,38]];pose.hand=[37,30];pose.rear=[10,28];pose.angle=.15;pose.cape=-10;
    }else if(state==='attack'){
      Object.assign(pose,swingPose(elapsed));pose.rear=[10-pose.lean,28];pose.cape=-4-pose.lean*1.5;
      if(!walking){pose.feet=[[11,46],[32,46]];pose.knees=[[13,39],[30,39]];}
    }else if(state==='cast'){
      const extension=smooth(elapsed/.12);pose.hand=[lerp(28,39,extension),lerp(27,24,extension)];pose.rear=[11,29];pose.lean=extension*2;pose.blade=false;pose.cape=-3;
    }
    return pose;
  }
  function limb(p,a,b,c,width,color,highlight) {
    p.line(a[0],a[1],b[0],b[1],ink,width+2);p.line(b[0],b[1],c[0],c[1],ink,width+2);
    p.line(a[0]+1,a[1],b[0]+1,b[1],color,width);p.line(b[0]+1,b[1],c[0]+1,c[1],color,width);
    p.line(b[0]+1,b[1],c[0]+1,c[1],highlight,1);
  }
  function blade(p,hand,angle,bright=true) {
    const [x,y]=hand,dx=Math.cos(angle),dy=Math.sin(angle),nx=-dy,ny=dx;
    const point=(along,across)=>[x+dx*along+nx*across,y+dy*along+ny*across];
    p.poly([point(5,-3),point(34,-2),point(40,0),point(34,3),point(5,3)],ink);
    p.poly([point(6,-2),point(33,-1),point(38,0),point(33,1),point(6,1)],bright?'#eef6e2':'#a6bfc0');
    p.poly([point(6,1),point(35,1),point(32,2),point(6,2)],'#7eabb8');
    p.line(...point(3,-6),...point(3,6),'#d0a557',2);p.line(...point(-4,0),...point(4,0),'#754735',3);
    p.box(x-2,y-2,4,4,'#dbb286');p.box(x-1,y-2,3,1,'#f5d8a2');
  }
  function hero(ctx,x,feet,dir,motion={}) {
    const pose=heroPose(motion),p=painter(ctx),{hand,lean,bob}=pose;
    ctx.save();ctx.translate(Math.round(x)-dir*24,Math.round(feet)-48);ctx.scale(dir,1);
    const chestX=22+lean,chestY=25+bob,headX=22+lean,headY=12+bob;
    const capeX=7+pose.cape;
    p.poly([[chestX-8,chestY-7],[capeX,29+bob],[capeX-2,41],[15,40],[chestX-2,30]],ink);
    p.poly([[chestX-9,chestY-5],[capeX+2,30+bob],[capeX,39],[13,37],[chestX-4,29]],'#8d3a45');
    p.line(capeX+3,30,capeX+2,36,'#d46b58',2);p.line(capeX+7,30,13,36,'#ad4a46',2);
    limb(p,[19,33+bob],pose.knees[0],pose.feet[0],4,'#42504a','#7e9681');
    p.box(pose.feet[0][0]-2,pose.feet[0][1]-2,9,3,'#302b2a');p.box(pose.feet[0][0],pose.feet[0][1]-2,6,1,'#a38564');
    limb(p,[chestX-8,chestY],[(chestX-8+pose.rear[0])/2-2,chestY+4],pose.rear,3,'#536c60','#879c7c');p.box(pose.rear[0],pose.rear[1],4,4,'#a57e58');
    p.poly([[chestX-10,chestY-7],[chestX+7,chestY-6],[chestX+10,chestY+10],[chestX-9,chestY+10]],ink);
    p.poly([[chestX-8,chestY-5],[chestX+5,chestY-4],[chestX+7,chestY+8],[chestX-7,chestY+8]],'#3e5953');
    p.box(chestX-5,chestY-4,10,9,'#668071');p.line(chestX-5,chestY-4,chestX-4,chestY+5,'#b0b598',2);p.box(chestX+3,chestY-2,3,6,'#92a88b');
    p.box(chestX-8,chestY+8,18,3,'#49352b');p.box(chestX+2,chestY+8,4,3,'#d3b26a');p.box(chestX+3,chestY+9,2,1,'#f2dea0');
    limb(p,[26,34+bob],pose.knees[1],pose.feet[1],4,'#546858','#b4bea0');
    p.box(pose.feet[1][0]-1,pose.feet[1][1]-2,9,3,'#302b2a');p.box(pose.feet[1][0],pose.feet[1][1]-2,7,1,'#b79a75');
    p.poly([[headX-9,headY-8],[headX-4,headY-12],[headX+7,headY-11],[headX+11,headY-5],[headX+9,headY+8],[headX-8,headY+8]],ink);
    p.poly([[headX-7,headY-7],[headX-3,headY-10],[headX+6,headY-9],[headX+8,headY-5],[headX+3,headY-6],[headX-3,headY-4],[headX-5,headY+5],[headX-7,headY+4]],'#a1b1a6');
    p.line(headX-3,headY-9,headX+5,headY-8,'#ebe6c7',2);
    p.box(headX-3,headY-3,11,10,'#b1825d');p.box(headX-1,headY-3,9,7,'#e0b989');p.box(headX+2,headY-3,5,2,'#f7dba8');
    const blink=motion.state==='idle'&&Math.floor((motion.time||0)*2)%9===8;
    p.box(headX+5,headY,3,blink?1:2,ink);p.box(headX+8,headY+2,3,2,'#d1a173');p.box(headX+4,headY+6,5,1,'#885c48');
    p.box(chestX-6,chestY-9,16,4,'#9d4446');p.box(chestX-3,chestY-9,10,1,'#e98c6a');
    limb(p,[chestX+7,chestY-1],[(chestX+7+hand[0])/2+1,(chestY+hand[1])/2+2],hand,4,'#587467','#b8c4a4');
    p.box(chestX+5,chestY-3,7,4,'#aebca2');
    if(pose.active){
      // A short trail follows the blade's actual path, never an unrelated full circle.
      for(let j=3;j>=1;j--){const prior=swingPose(Math.max(swordTiming.windup,(motion.elapsed||0)-j*.012));const tip=[prior.hand[0]+Math.cos(prior.angle)*37,prior.hand[1]+Math.sin(prior.angle)*37];const now=[hand[0]+Math.cos(pose.angle)*37,hand[1]+Math.sin(pose.angle)*37];p.line(...tip,...now,j===1?'#e3eac4':'#8ec5cd55',j===1?2:4);}
    }
    if(pose.blade)blade(p,hand,pose.angle);
    else {p.box(hand[0]-1,hand[1]-1,5,4,'#e4be8d');flame(ctx,hand[0]+6,hand[1],motion.time||0,.35+Math.sin(Math.min(1,(motion.elapsed||0)/.28)*Math.PI)*.22,1);}
    ctx.restore();
    return pose;
  }
  function chorizo(ctx,x,y,scale=1){
    ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(scale,scale);const p=painter(ctx);
    p.line(-11,-2,-7,2,'#e2bd80',2);p.line(8,2,12,-2,'#e2bd80',2);
    p.poly([[-9,-4],[-4,-6],[4,-6],[10,-3],[9,2],[4,5],[-4,5],[-10,1]],ink);
    p.poly([[-8,-3],[-3,-4],[4,-4],[8,-2],[7,1],[3,3],[-4,3],[-8,0]],'#ad4d32');p.line(-5,-3,4,-3,'#f29959',2);p.box(-2,-2,2,4,'#713a2e');p.box(4,-1,2,3,'#713a2e');ctx.restore();
  }
  function dragon(ctx,x,y,t,dir=1,scale=1,food=false){
    ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(dir*scale,scale);const p=painter(ctx),flap=Math.round(Math.sin(t*9)*9);
    p.poly([[-5,3],[-28,-19+flap],[-13,-13+flap],[-3,-27+flap],[7,-9]],ink);p.poly([[-5,0],[-23,-16+flap],[-12,-10+flap],[-4,-21+flap],[4,-8]],'#d88b65');
    p.poly([[-7,6],[-26,13],[-37,5],[-30,18],[-13,17],[5,11],[13,0]],ink);p.poly([[-6,7],[-25,15],[-31,10],[-28,16],[-12,14],[7,9],[10,1]],'#a84b43');
    p.poly([[-10,-6],[3,-12],[13,-7],[19,-12],[29,-8],[30,0],[37,3],[33,9],[18,10],[10,16],[-2,16],[-13,8]],ink);
    p.poly([[-8,-4],[3,-9],[12,-4],[20,-9],[27,-6],[27,2],[33,4],[31,7],[17,7],[9,13],[-1,13],[-10,7]],'#bf6151');p.poly([[-3,5],[9,3],[17,7],[8,12],[-1,11]],'#e4b875');
    p.poly([[16,-8],[14,-18],[22,-10]],'#e8d0a0');p.box(23,-5,4,3,'#fff0ad');p.box(25,-5,2,3,ink);p.line(25,6,32,5,'#773b38');p.line(4,12,7,20,ink,3);p.line(13,10,18,16,ink,3);
    if(food)chorizo(ctx,23,18,.9);ctx.restore();
  }
  window.UmbralArt={actor,flame,effect,hero,heroPose,swingPose,swordTiming,chorizo,dragon};
})();
