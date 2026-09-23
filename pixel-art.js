/* Original pixel sprites and frame animations. No external images or fonts. */
(() => {
  'use strict';
  const cache = new Map();
  const ink = '#171e25';
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
    if(e.kind==='burst'){
      const r=5+progress*27;p.disk(0,0,Math.round(r),'#9b263452');
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
  function sword(ctx,x,y,dir,progress) {
    const p=painter(ctx);ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(dir,1);
    const angle=-1.6+progress*3.2,ex=Math.cos(angle)*39,ey=Math.sin(angle)*39;
    p.line(5,0,ex,ey,ink,4);p.line(6,-1,ex,ey,'#e7f3e7',2);p.line(7,1,ex,ey+2,'#8aaeb9');p.line(2,-5,10,5,'#e2bc6a',2);p.line(0,0,8,1,'#805344',3);ctx.restore();
  }
  window.UmbralArt={actor,flame,effect,sword};
})();
