(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas = $('game'), ctx = canvas.getContext('2d');
  const SAVE_KEY = 'umbral-adventure-v1';
  const abilities = [
    { id: 'double', name: 'Doble salto', symbol: '↟', key: 'ESPACIO × 2', text: 'El viento te sostiene. ¡Salta otra vez en el aire!' },
    { id: 'dash', name: 'Impulso arcano', symbol: '⇢', key: 'SHIFT / X', text: 'Cruza el vacío. Pulsa Shift o X para impulsarte.' },
    { id: 'fire', name: 'Bola de fuego', symbol: '✦', key: 'E / J', text: 'La llama responde a ti. Pulsa E o J para atacar.' }
  ];
  const themes = [
    { name: 'Bosque del despertar', subtitle: 'El sol todavía recuerda tu nombre', corruption: 0, sky: ['#79c1c1','#d9e8af'], ground:'#705b3b', grass:'#9aca60', foliage:['#3e7851','#5f9a59','#88b55e'], hills:['#8ebc91','#70a278','#548764'], blood:'#799b55' },
    { name: 'Ruinas marchitas', subtitle: 'Los pájaros han dejado de cantar', corruption: 32, sky:['#555e63','#a3a181'], ground:'#514b40', grass:'#8d9162', foliage:['#404f43','#5c6850','#7c7d56'], hills:['#7a8877','#657363','#4b5c4e'], blood:'#934139' },
    { name: 'Jardines de la carne', subtitle: 'Lo que crece aquí ya no está vivo', corruption: 68, sky:['#301e2b','#9d4e3c'], ground:'#493331', grass:'#ae5143', foliage:['#302328','#4c2d30','#73352e'], hills:['#744537','#55342e','#3d2a28'], blood:'#aa252d' },
    { name: 'Catedral del abismo', subtitle: 'El paraíso nunca estuvo al otro lado', corruption: 100, sky:['#140f18','#54212c'], ground:'#33252a', grass:'#8f373b', foliage:['#21161f','#351d28','#562832'], hills:['#48232f','#321e29','#241a22'], blood:'#c12836' }
  ];
  const enemyTypes = { walker:{w:30,h:30,hp:1,speed:42}, hound:{w:42,h:28,hp:2,speed:66}, brute:{w:44,h:58,hp:4,speed:27} };
  const levels = [
    { name: 'Bosque del despertar', sub: 'El primer salto', subtitle: 'Donde todo comienza', icon: '♧', rune: 'double', runeX: 830, runeY: 315, width: 3000, end: 2860, color: '#a48bdd', sky: ['#211d43', '#514b76'], ground: '#38314f', grass: '#99b994', spawn: [85, 390],
      platforms: [[0,450,540,110],[650,450,400,110],[1160,450,340,110],[1630,450,440,110],[2210,450,790,110],[340,365,115,24],[700,360,100,24],[880,285,120,24],[1190,345,110,24],[1430,265,120,24],[1720,340,150,24],[1980,285,130,24],[2270,345,140,24],[2510,285,160,24]],
      gems: [[220,412],[390,330],[750,325],[930,250],[1260,307],[1490,229],[1790,302],[2040,246],[2350,307],[2590,247],[2720,412]], enemies: [[1310,420,1190,1460],[1800,420,1660,2020],[2490,420,2290,2650]], checkpoints: [[1690,450]] },
    { name: 'Ruinas del viento', sub: 'Un eco entre las piedras', subtitle: 'Las piedras recuerdan', icon: '◈', rune: 'dash', runeX: 850, runeY: 226, width: 3260, end: 3120, color: '#8dc7d7', sky: ['#182b43', '#455f7c'], ground: '#2c3d52', grass: '#8fbdbd', spawn: [85,390],
      platforms: [[0,450,430,110],[530,405,180,150],[760,305,230,26],[1040,450,300,110],[1530,410,280,150],[2030,450,410,110],[2630,450,630,110],[320,345,115,26],[1130,315,140,26],[1590,275,140,26],[1900,310,110,26],[2200,330,140,26],[2460,275,130,26],[2780,340,150,26]],
      gems: [[205,411],[375,306],[610,367],[810,267],[1190,279],[1230,412],[1660,236],[1730,372],[1950,274],[2260,291],[2520,236],[2850,300],[2950,410]], enemies: [[1170,420,1060,1300],[1630,380,1550,1770],[2200,420,2050,2400],[2850,420,2660,2980]], checkpoints: [[1600,410]] },
    { name: 'Jardines de la brasa', sub: 'Despierta la llama', subtitle: 'Una luz bajo las cenizas', icon: '♨', rune: 'fire', runeX: 720, runeY: 300, width: 3340, end: 3200, color: '#eead94', sky: ['#35213f', '#82566b'], ground: '#4b3047', grass: '#da9b91', spawn: [85,390],
      platforms: [[0,450,440,110],[570,450,460,110],[1190,420,280,140],[1700,450,380,110],[2280,420,300,140],[2780,450,560,110],[350,345,100,26],[660,350,130,26],[940,280,130,26],[1300,295,130,26],[1570,295,110,26],[1840,325,130,26],[2170,290,110,26],[2450,290,120,26],[2850,335,150,26]],
      gems: [[220,410],[395,307],[1000,242],[1260,382],[1360,257],[1620,257],[1900,287],[1990,411],[2220,252],[2500,252],[2910,297],[3070,410]], enemies: [[830,420,800,1000],[1310,390,1220,1430],[1870,420,1720,2040],[2390,390,2300,2540],[2970,420,2800,3120]], checkpoints: [[1790,450]] },
    { name: 'Santuario estelar', sub: 'El camino de regreso', subtitle: 'Todos los caminos llevan a ti', icon: '✧', width: 3620, end: 3480, color: '#d1a8ef', sky: ['#181a38', '#454367'], ground: '#36334e', grass: '#baa0d5', spawn: [85,390],
      platforms: [[0,450,410,110],[550,390,210,160],[930,330,220,26],[1370,420,250,140],[1840,350,260,26],[2350,440,360,120],[2960,450,660,110],[320,330,110,26],[650,265,110,26],[1180,235,110,26],[1470,290,110,26],[1700,245,110,26],[2150,245,110,26],[2450,315,140,26],[2790,330,110,26],[3090,320,140,26]],
      gems: [[210,412],[370,292],[700,227],[1010,290],[1230,197],[1520,252],[1750,207],[1970,312],[2200,207],[2520,277],[2840,292],[3150,282],[3310,410]], enemies: [[620,360,570,720],[1460,390,1390,1580],[1930,320,1860,2060],[2490,410,2370,2670],[3210,420,2990,3360]], checkpoints: [[1450,420],[2450,440]] }
  ];
  levels.forEach((entry,i)=>Object.assign(entry,themes[i]));
  // Coordinates specify the old creature's feet, keeping each patrol on its platform.
  levels[1].enemies[1].push('hound'); levels[1].enemies[3].push('hound');
  levels[2].enemies[1].push('hound'); levels[2].enemies[2].push('brute'); levels[2].enemies[3].push('hound'); levels[2].enemies[4].push('brute');
  levels[3].enemies.forEach((e,i)=>e.push(i%2?'hound':'brute'));
  levels[3].enemies.push([2530,410,2370,2640,'hound'],[3330,420,3200,3380,'brute']);
  let save = { unlocked: 0, completed: [], abilities: [], best: {} };
  let storageAvailable = true;
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (raw && typeof raw === 'object') {
      save.completed = [...new Set((Array.isArray(raw.completed) ? raw.completed : []).filter(n => Number.isInteger(n) && n >= 0 && n < 4))];
      // Derive unlocks from completed chapters so incomplete/corrupt saves stay playable.
      while (save.unlocked < 3 && save.completed.includes(save.unlocked)) save.unlocked++;
      save.abilities = abilities.filter((a, i) => i < save.unlocked || (Array.isArray(raw.abilities) && raw.abilities.includes(a.id))).map(a => a.id);
      if (raw.best && typeof raw.best === 'object') for (let i = 0; i < 4; i++) save.best[i] = Math.max(0, Math.min(levels[i].gems.length, Number(raw.best[i]) || 0));
    }
  } catch { storageAvailable = false; }
  let levelIndex = save.unlocked, level, player, enemies, gems, shots = [], particles = [], checkpoint, checkpointIndex = -1;
  let mode = 'title', camera = 0, time = 0, lastTime = 0, accumulator = 0, toastTimer = 0, shake = 0;
  let audioContext, sound = false, helpWasPlaying = false;
  let viewWidth = 960, blood = [], hostileShots = [], kills = 0, encounterTypes = new Set();
  const keys = new Set(), pressed = new Set();
  const controls = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', Space: 'jump', ArrowUp: 'jump', KeyW: 'jump', ShiftLeft: 'dash', ShiftRight: 'dash', KeyX: 'dash', KeyE: 'magic', KeyJ: 'magic' };
  const has = id => save.abilities.includes(id);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  function persist() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); storageAvailable = true; }
    catch { storageAvailable = false; }
    $('save-status').textContent = storageAvailable ? 'Progreso guardado en este navegador' : 'Guardado no disponible · progreso solo en esta sesión';
  }
  function tone(freq, length = .12, type = 'sine', volume = .035) {
    if (!sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
      oscillator.type = type; oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(freq * .65, audioContext.currentTime + length);
      gain.gain.setValueAtTime(volume, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + length);
      oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + length);
    } catch { sound = false; }
  }
  function toast(message) { $('toast').textContent = message; $('toast').classList.add('visible'); toastTimer = 5; }
  function updateUI() {
    $('location-name').textContent = level.name;
    document.body.dataset.region = levelIndex;
    $('corruption-label').textContent = `CORRUPCIÓN ${level.corruption}%`;
    $('corruption-bar').style.width = `${level.corruption}%`;
    $('chapter-number').textContent = `CAPÍTULO 0${levelIndex + 1} / 04`;
    $('scene-label').innerHTML = `<span>REGIÓN ${['I','II','III','IV'][levelIndex]}</span><strong>${level.subtitle}</strong>`;
    $('progress-count').textContent = `${save.completed.length} / 4`;
    $('level-list').innerHTML = levels.map((l, i) => `<button class="level-button ${i === levelIndex ? 'active' : ''}" data-level="${i}" ${i > save.unlocked ? 'disabled' : ''} ${i === levelIndex ? 'aria-current="step"' : ''}><span class="level-icon">${l.icon}</span><span class="level-copy"><strong>${l.name}</strong><small>${i > save.unlocked ? 'Región por descubrir' : save.completed.includes(i) ? `Completado · ${save.best[i] || 0}/${l.gems.length} ◆` : i === levelIndex ? 'Tu aventura empieza aquí' : l.sub}</small></span><span class="level-end">${save.completed.includes(i) ? '✓' : i > save.unlocked ? '·' : '›'}</span></button>`).join('');
    $('ability-count').textContent = `${save.abilities.length} DE 3 HABILIDADES`;
    $('ability-list').innerHTML = abilities.map(a => `<div class="ability ${has(a.id) ? 'unlocked' : ''}" title="${has(a.id) ? a.text : 'Descubre la runa en la región ' + (abilities.indexOf(a) + 1)}"><span class="ability-symbol">${a.symbol}</span><div><strong>${a.name}</strong><small>${has(a.id) ? a.key : 'Por descubrir'}</small></div></div>`).join('');
    $('quick-abilities').innerHTML = abilities.map(a=>`<span class="quick-ability ${has(a.id)?'ready':''}" title="${a.name}: ${has(a.id)?a.key:'bloqueado'}">${a.symbol}<i id="cooldown-${a.id}"></i></span>`).join('');
    const needsRune = level.rune && !has(level.rune);
    $('objective-label').textContent = needsRune ? 'BUSCA LA RUNA' : 'ALCANZA EL PORTAL';
    $('objective-copy').textContent = needsRune ? abilities.find(a=>a.id===level.rune).name : 'Sigue avanzando. Aún hay salida.';
    document.querySelector('[data-control="dash"]').disabled = !has('dash');
    document.querySelector('[data-control="magic"]').disabled = !has('fire');
    updateStats();
  }
  function updateStats() {
    $('hearts').textContent = Array.from({ length: 3 }, (_, i) => i < player.hp ? '♥' : '♡').join(' ');
    $('hearts').setAttribute('aria-label', `${player.hp} de 3 corazones`);
    $('gem-count').textContent = `${gems.filter(g => g.taken).length} / ${gems.length}`;
    $('kill-count').textContent = String(kills).padStart(2,'0');
  }
  function loadLevel(index) {
    levelIndex = index; level = levels[index]; checkpoint = [...level.spawn]; checkpointIndex = -1;
    player = { x: checkpoint[0], y: checkpoint[1], w: 24, h: 38, vx: 0, vy: 0, facing: 1, grounded: false, jumps: 0, coyote: 0, buffer: 0, hp: 3, invulnerable: 0, dashTime: 0, dashCooldown: 0, fireCooldown: 0 };
    enemies = level.enemies.map(([x,y,min,max,type='walker'],i) => ({ x,y:y+30-enemyTypes[type].h,min,max,...enemyTypes[type],maxHp:enemyTypes[type].hp,type,dir:-1,alive:true,hitTime:0,attackCooldown:1+i*.21,attackTime:0,state:'patrol' }));
    gems = level.gems.map(([x,y]) => ({x,y,taken:false})); shots = []; particles = []; blood = []; hostileShots = []; kills = 0; encounterTypes = new Set(); camera = 0; shake = 0;
    clearControls(); updateUI();
  }
  function clearControls() { keys.clear(); pressed.clear(); document.querySelectorAll('.pressed').forEach(el => el.classList.remove('pressed')); }
  function showOverlay(kind) {
    mode = kind; clearControls(); $('overlay').hidden = false; document.body.classList.add('menu-open'); setTab('journey');
    const content = {
      title: [save.completed.length ? 'EL DESCENSO CONTINÚA' : 'HAS CRUZADO EL UMBRAL', save.completed.length ? 'Todavía queda<br>algo de ti.' : 'Todo parece<br>un nuevo comienzo.', save.completed.length ? 'Tus poderes siguen contigo.<br>El mundo que conociste ya no es el mismo.' : 'El sol acaricia los árboles. El viento huele a flores.<br>Por primera vez, otro mundo parece un buen lugar.', save.completed.length || save.abilities.length ? 'CONTINUAR' : 'COMENZAR', 'NO TODOS LOS PARAÍSOS QUIEREN QUE TE QUEDES.'],
      paused: ['EL TIEMPO SE HA DETENIDO', 'Aún respiras.', `${level.name}.<br>Consulta el mapa, prepara tus poderes y sigue adelante.`, 'VOLVER AL JUEGO', 'ESC PARA CONTINUAR · M PARA EL MAPA'],
      complete: ['OTRO UMBRAL SE ABRE', ['Algo cambia<br>en el viento.','La tierra<br>empieza a sangrar.','Ya no queda<br>ningún cielo.'][levelIndex] || 'Sigue adelante.', `${gems.filter(g=>g.taken).length} / ${gems.length} cristales · ${kills} criaturas derrotadas.<br>${['Detrás del portal, no se oyen pájaros.','Un olor a hierro llega desde el otro lado.','Las campanas llaman desde debajo de la tierra.'][levelIndex] || ''}`, 'CRUZAR EL PORTAL', 'LO QUE HAS APRENDIDO ES LO ÚNICO QUE TE QUEDA'],
      victory: ['EL ABISMO SE HA CERRADO', 'El amanecer<br>te pertenece.', 'Has atravesado la catedral y sobrevivido al descenso.<br>Al otro lado, por fin, vuelves a oír los pájaros.', 'VOLVER AL BOSQUE', 'EL PARAÍSO MENTÍA. TÚ SOBREVIVISTE.']
    }[kind];
    $('overlay-eyebrow').textContent = content[0]; $('overlay-title').innerHTML = content[1]; $('overlay-copy').innerHTML = content[2];
    $('primary-action').innerHTML = `${content[3]} <span>→</span>`; $('overlay-hint').textContent = content[4];
    $('pause-button').innerHTML = '× <span>CERRAR</span>'; $('pause-button').setAttribute('aria-label','Cerrar menú y continuar');
  }
  function setTab(tab) { document.querySelectorAll('[data-tab]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.tab===tab))); document.querySelectorAll('.menu-panel').forEach(panel=>panel.hidden=panel.id!==`panel-${tab}`); }
  function resume() { mode = 'playing'; $('overlay').hidden = true; document.body.classList.remove('menu-open'); $('pause-button').innerHTML = '☰ <span>MENÚ</span>'; $('pause-button').setAttribute('aria-label','Abrir menú y pausar'); clearControls(); canvas.focus({preventScroll:true}); }
  async function toggleFullscreen() {
    try { if(document.fullscreenElement) await document.exitFullscreen(); else if(document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); else toast('Este navegador no admite el modo inmersivo. El juego ya ocupa toda la ventana.'); }
    catch { toast('No se pudo activar el modo inmersivo. El juego sigue ocupando toda la ventana.'); }
  }
  function primaryAction() {
    const previous = mode;
    if (mode === 'complete') loadLevel(levelIndex + 1);
    else if (mode === 'victory') loadLevel(0);
    resume(); tone(520,.2);
    if (previous === 'title') toast(matchMedia('(pointer: coarse)').matches ? 'Usa las flechas para moverte, ↑ para saltar y busca la gran runa ✧' : 'Muévete con A / D, salta con Espacio y busca la gran runa ✧');
  }
  function pause() { if (mode === 'playing') showOverlay('paused'); else if (mode === 'paused' && !$('help-dialog').open) resume(); }
  function burst(x,y,color,count=14) { for(let i=0;i<count;i++) particles.push({x,y,vx:(Math.random()-.5)*180,vy:(Math.random()-.7)*180,life:.5+Math.random()*.5,max:1,color,size:2+Math.random()*3}); }
  function overlaps(a,b) { return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y; }
  function hurt(fall = false) {
    if (player.invulnerable > 0 && !fall) return;
    player.hp--; shake = .22; tone(140,.22,'triangle'); burst(player.x+12,player.y+18,levelIndex?'#ba303a':'#e9cc99');
    if(levelIndex) splatter(player.x+12,player.y+25,12);
    if (player.hp <= 0) { loadLevel(levelIndex); toast('Cada caída enseña algo. Inténtalo de nuevo.'); }
    else {
      player.x = checkpoint[0]; player.y = checkpoint[1]; player.vx = 0; player.vy = 0; player.jumps = 0; player.dashTime = 0; player.grounded = false; player.coyote = 0; player.buffer = 0;
    }
    player.invulnerable = 1.8; updateStats();
  }
  function finishLevel() {
    if (level.rune && !has(level.rune)) { toast('La runa de esta región aún te espera. Busca el símbolo ✧.'); player.x -= 65; return; }
    if (!save.completed.includes(levelIndex)) save.completed.push(levelIndex);
    save.unlocked = Math.max(save.unlocked, Math.min(3,levelIndex+1)); save.best[levelIndex] = Math.max(save.best[levelIndex] || 0,gems.filter(g=>g.taken).length);
    persist(); updateUI(); tone(880,.5); showOverlay(levelIndex === 3 ? 'victory' : 'complete');
  }
  function splatter(x,y,count=24) {
    for(let i=0;i<count;i++) particles.push({x,y,vx:(Math.random()-.5)*250,vy:-Math.random()*230,life:.7+Math.random()*.8,color:i%4?'#a42632':'#d35b56',size:2+Math.random()*5,gore:true});
    const floor=level.platforms.filter(([px,py,w])=>x>=px&&x<=px+w&&py>=y-6).sort((a,b)=>a[1]-b[1])[0];
    if(floor){blood.push({x:x-15-Math.random()*10,y:floor[1]-2,w:24+Math.random()*22});if(blood.length>100)blood.shift();}
  }
  function damageEnemy(e) {
    if(e.hitTime>0||!e.alive)return;
    e.hp--;e.hitTime=.18;burst(e.x+e.w/2,e.y+e.h/2,levelIndex?level.blood:'#c1df88',9);tone(e.type==='brute'?100:210,.13,'triangle');
    if(levelIndex)splatter(e.x+e.w/2,e.y+e.h/2,e.hp<=0?32:8);
    if(e.hp<=0){e.alive=false;kills++;shake=e.type==='brute'?.18:.07;updateStats();}
  }
  function updateEnemies(dt,beforeY) {
    const p=player;
    for(const e of enemies) if(e.alive) {
      e.hitTime=Math.max(0,e.hitTime-dt);e.attackCooldown-=dt;
      const dx=p.x+p.w/2-e.x-e.w/2,dy=p.y+p.h/2-e.y-e.h/2;
      if(e.type!=='walker'&&!encounterTypes.has(e.type)&&Math.abs(dx)<viewWidth*.65){encounterTypes.add(e.type);toast(e.type==='hound'?'Sabueso de sangre · espera su embestida y salta sobre él.':'Verdugo de ceniza · su casco tiene púas. Usa fuego y esquiva sus brasas.');}
      let speed=e.speed+levelIndex*5;
      if(e.type==='hound') {
        if(e.state==='patrol'&&Math.abs(dx)<280&&Math.abs(dy)<65&&e.attackCooldown<=0){e.state='windup';e.attackTime=.5;e.dir=dx<0?-1:1;}
        if(e.state==='windup'){speed=0;e.attackTime-=dt;if(e.attackTime<=0){e.state='charge';e.attackTime=.65;tone(110,.12,'sawtooth',.012);}}
        else if(e.state==='charge'){speed=280+levelIndex*15;e.attackTime-=dt;if(e.attackTime<=0){e.state='patrol';e.attackCooldown=1.5;}}
      }
      if(e.type==='brute'&&Math.abs(dx)<500&&Math.abs(dy)<190){
        e.dir=dx<0?-1:1;
        if(e.state==='patrol'&&e.attackCooldown<=0){e.state='windup';e.attackTime=.75;}
        if(e.state==='windup'){speed=0;e.attackTime-=dt;if(e.attackTime<=0){const x=e.x+e.w/2+e.dir*28,y=e.y+27;hostileShots.push({x,y,w:12,h:12,vx:e.dir*(185+levelIndex*15),life:3});e.state='patrol';e.attackCooldown=levelIndex===3?1.6:2.2;tone(90,.2,'sawtooth',.02);}}
      }
      e.x+=e.dir*speed*dt;
      if(e.x<e.min||e.x>e.max){e.x=clamp(e.x,e.min,e.max);e.dir*=-1;if(e.state==='charge'){e.state='patrol';e.attackCooldown=1.5;}}
      if(overlaps(p,e)){
        if(p.vy>80&&beforeY+p.h<e.y+14&&e.type!=='brute'){damageEnemy(e);p.vy=-465;p.y=e.y-p.h;}
        else if(p.dashTime<=0&&p.invulnerable<=0){hurt();return false;}
      }
    }
    for(const s of hostileShots){s.x+=s.vx*dt;s.life-=dt;for(const [x,y,w,h] of level.platforms)if(overlaps(s,{x,y,w,h}))s.life=0;if(s.life>0&&overlaps(s,p)){s.life=0;if(p.dashTime<=0&&p.invulnerable<=0){hurt();return false;}}}
    hostileShots=hostileShots.filter(s=>s.life>0);
    return true;
  }
  function update(dt) {
    time += dt; toastTimer -= dt; if (toastTimer <= 0) $('toast').classList.remove('visible');
    if (mode !== 'playing') { pressed.clear(); return; }
    particles = particles.filter(p => p.life > 0); for(const p of particles) { p.life -= dt; p.x += p.vx*dt; p.y += p.vy*dt; p.vy += (p.gore?600:110)*dt; }
    const p = player; shake = Math.max(0,shake-dt); p.invulnerable -= dt; p.dashCooldown -= dt; p.fireCooldown -= dt; p.buffer -= dt;
    if(p.grounded) p.coyote = .11; else p.coyote -= dt;
    if (pressed.has('jump')) p.buffer = .13;
    if(p.buffer > 0 && (p.grounded || p.coyote > 0 || (has('double') && p.jumps < 2))) {
      const airborne = !p.grounded && p.coyote <= 0; p.jumps = airborne ? 2 : 1; p.vy = -630; p.grounded = false; p.coyote = 0; p.buffer = 0; p.dashTime = 0;
      burst(p.x+12,p.y+38,airborne ? '#d3b1ff' : '#bacbb6',7); tone(airborne ? 600 : 410,.12,'triangle');
    }
    const dir = (keys.has('right') ? 1 : 0) - (keys.has('left') ? 1 : 0); if(dir) p.facing = dir;
    if(pressed.has('dash') && has('dash') && p.dashCooldown <= 0) { p.dashTime = .22; p.dashCooldown = .85; p.vy = 0; tone(300,.2,'sawtooth',.016); }
    if(pressed.has('magic') && has('fire') && p.fireCooldown <= 0) { shots.push({x:p.x+12+p.facing*16,y:p.y+17,vx:p.facing*540,w:14,h:10,life:1.2}); p.fireCooldown = .32; tone(240,.16,'triangle'); }
    if(p.dashTime > 0) { p.dashTime -= dt; p.vx = p.facing*690; p.vy = 0; if(Math.random()<.7) burst(p.x+12,p.y+20,'#b2c9ff',1); }
    else { p.vx += (dir*255-p.vx)*Math.min(1,dt*(p.grounded?17:10)); p.vy = Math.min(860,p.vy+1650*dt); }
    const beforeX = p.x; p.x = clamp(p.x+p.vx*dt,0,level.width-p.w);
    for(const [x,y,w,h] of level.platforms) if(overlaps(p,{x,y,w,h})) { if(beforeX+p.w<=x+.5) p.x=x-p.w; else if(beforeX>=x+w-.5) p.x=x+w; }
    const beforeY = p.y; p.y += p.vy*dt; p.grounded = false;
    for(const [x,y,w,h] of level.platforms) if(overlaps(p,{x,y,w,h})) {
      if(p.vy>=0 && beforeY+p.h<=y+1) { p.y=y-p.h; p.vy=0; p.grounded=true; p.jumps=0; }
      else if(p.vy<0 && beforeY>=y+h-1) { p.y=y+h; p.vy=0; }
    }
    if(!p.grounded && p.jumps===0 && p.coyote<=0) p.jumps=1;
    if(p.y>620) { hurt(true); pressed.clear(); return; }
    for(const g of gems) if(!g.taken && Math.hypot(p.x+12-g.x,p.y+18-g.y)<29) { g.taken=true; burst(g.x,g.y,'#a1edce',9); tone(820,.09); updateStats(); }
    if(level.rune && !has(level.rune) && Math.hypot(p.x+12-level.runeX,p.y+18-level.runeY)<43) {
      save.abilities.push(level.rune); persist(); updateUI(); const a=abilities.find(a=>a.id===level.rune); toast(`${a.name} desbloqueado · ${a.text}`); burst(level.runeX,level.runeY,'#e7c3ff',35); tone(1040,.4);
    }
    level.checkpoints.forEach(([x,y],i)=> { if(i>checkpointIndex && Math.abs(p.x-x)<38 && Math.abs(p.y+p.h-y)<60) { checkpointIndex=i; checkpoint=[x,y-42]; p.hp=3; updateStats(); toast('Baliza activada · corazones recuperados'); burst(x,y-35,'#9ce4ed',18); tone(700,.2); } });
    if(!updateEnemies(dt,beforeY)){pressed.clear();return;}
    for(const s of shots) {
      s.x+=s.vx*dt; s.life-=dt;
      for(const e of enemies) if(e.alive && s.life>0 && overlaps(s,e)) {damageEnemy(e);s.life=0;}
      for(const [x,y,w,h] of level.platforms) if(overlaps(s,{x,y,w,h})) s.life=0;
    }
    shots=shots.filter(s=>s.life>0);
    camera += (clamp(p.x-viewWidth*.35,0,Math.max(0,level.width-viewWidth))-camera)*Math.min(1,dt*6);
    $('cooldown-dash').style.height=`${clamp(p.dashCooldown/.85,0,1)*100}%`;
    $('cooldown-fire').style.height=`${clamp(p.fireCooldown/.32,0,1)*100}%`;
    if(p.x>level.end-13 && p.x<level.end+65 && p.y+p.h>360) finishLevel();
    pressed.clear();
  }

  // All art is drawn locally on the canvas. Seeded details stay stable as the camera moves.
  function random(seed) { const n=Math.sin(seed*127.1+311.7)*43758.5453; return n-Math.floor(n); }
  function rect(x,y,w,h,color) {if(w<=0||h<=0)return;ctx.fillStyle=color;ctx.fillRect(Math.round(x/2)*2,Math.round(y/2)*2,Math.ceil(w/2)*2,Math.ceil(h/2)*2);}
  function ellipse(x,y,rx,ry,color) {ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill();}
  function polygon(points,color) {ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();}
  function glow(x,y,r,color) {const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}
  function tree(x,y,scale,shade,seed) {
    const trunk=levelIndex===0?'#665537':levelIndex===1?'#494334':'#302126';
    rect(x-9*scale,y-215*scale,19*scale,220*scale,trunk);rect(x-3*scale,y-210*scale,3*scale,213*scale,'#ba91b00c');
    polygon([[x,y-95*scale],[x-63*scale,y-158*scale],[x-56*scale,y-166*scale],[x+7*scale,y-112*scale]],trunk);
    polygon([[x+3*scale,y-145*scale],[x+61*scale,y-200*scale],[x+68*scale,y-197*scale],[x+10*scale,y-125*scale]],trunk);
    if(levelIndex<2)for(let j=0;j<18;j++){const dx=(random(seed+j)-.5)*135*scale,dy=random(seed+j+55)*85*scale;pixelCircle(x+dx,y-245*scale+dy,(25+random(seed+j+88)*22)*scale,level.foliage[j%3]);}
    else {
      polygon([[x-4,y-185*scale],[x-48*scale,y-245*scale],[x-30*scale,y-229*scale],[x+5,y-195*scale]],trunk);
      polygon([[x+2,y-160*scale],[x+54*scale,y-236*scale],[x+48*scale,y-208*scale],[x+10,y-155*scale]],trunk);
      if(seed%3===0){rect(x+45*scale,y-209*scale,2,70*scale,'#847566');rect(x+40*scale,y-150*scale,12*scale,19*scale,'#8f413f');rect(x+43*scale,y-159*scale,7*scale,9*scale,'#c6ab8c');rect(x+40*scale,y-131*scale,4*scale,17*scale,'#572c30');rect(x+48*scale,y-131*scale,4*scale,17*scale,'#572c30');}
    }
  }
  function pixelCircle(x,y,r,color){for(let yy=-r;yy<r;yy+=4){const half=Math.floor(Math.sqrt(Math.max(0,r*r-yy*yy))/4)*4;rect(x-half,y+yy,half*2,4,color);}}
  function background() {
    const width=viewWidth, gradient=ctx.createLinearGradient(0,0,0,540);gradient.addColorStop(0,level.sky[0]);gradient.addColorStop(1,level.sky[1]);ctx.fillStyle=gradient;ctx.fillRect(0,0,width,540);
    const sunX=width*.76-camera*.035;
    if(levelIndex===0){pixelCircle(sunX,106,43,'#efdda766');pixelCircle(sunX,106,31,'#f6e5a5');pixelCircle(sunX,106,24,'#fff0bc');}
    else {pixelCircle(sunX,106,35,levelIndex===1?'#c4c3a8':'#ac4e46');pixelCircle(sunX-9,99,31,level.sky[0]);}
    for(let i=0;i<7;i++){
      const x=((i*215-camera*.12+time*(levelIndex?1:3))%(width+300)+width+300)%(width+300)-130,y=45+random(i+77)*155;
      const color=levelIndex===0?'#eef1d499':levelIndex===1?'#b2b29755':'#34212b99';
      rect(x,y,100,12,color);rect(x+16,y-12,66,14,color);rect(x+36,y-23,30,12,color);rect(x-12,y+12,126,8,color);
    }
    if(levelIndex===0)for(let i=0;i<6;i++){const x=(i*140+time*11-camera*.1)%(width+40),y=92+Math.sin(i*2)*29;rect(x,y,4,2,'#516e56');rect(x-4,y-2-Math.round(Math.sin(time*5+i))*2,4,2,'#516e56');rect(x+4,y-2-Math.round(Math.sin(time*5+i))*2,4,2,'#516e56');}
    for(let layer=0;layer<3;layer++) {
      const parallax=.12+layer*.13,base=340+layer*42,points=[[-100,540]];
      for(let x=-160;x<width+200;x+=12){const y=Math.floor((base-45-Math.sin((x+camera*parallax)*.005+layer)*55-Math.sin((x+camera*parallax)*.012)*12)/6)*6;points.push([x,y],[x+12,y]);}
      points.push([width+200,540]);polygon(points,level.hills[layer]);
    }
    ctx.globalAlpha=.48;for(let i=0;i<22;i++){const x=i*210-camera*.25-150;if(x>-200&&x<width+200)tree(x,425,.73+(i%3)*.1,0,i*30);}ctx.globalAlpha=1;
    for(let i=0;i<20;i++){const x=i*295-camera*.5-70;if(x>-220&&x<width+220)tree(x,465,1.1+random(i)*.35,1,i*19+3);}
    if(levelIndex>0)for(let i=0;i<12;i++){
      const x=i*310-camera*.6+170;if(x<-180||x>width+180)continue;
      if(levelIndex===3){rect(x-42,160,128,290,'#281c27');rect(x-56,127,28,330,'#38252f');rect(x+72,127,28,330,'#38252f');polygon([[x-62,128],[x-42,70],[x-23,128]],'#281a25');polygon([[x+66,128],[x+87,70],[x+106,128]],'#281a25');rect(x-6,206,32,88,'#0e1116');polygon([[x-6,206],[x+10,176],[x+26,206]],'#0e1116');rect(x+6,207,6,81,'#873d37');rect(x-6,232,32,6,'#873d37');for(let yy=170;yy<440;yy+=25)rect(x-36,yy,110,2,'#6b3d3933');}
      else {rect(x,242,33,232,levelIndex===1?'#52594c':'#50312e');rect(x-9,235,51,15,'#8f88715a');rect(x+7,258,5,202,'#ab96792a');rect(x-10,451,55,24,'#413a32');}
    }
    const fog=ctx.createLinearGradient(0,330,0,500);fog.addColorStop(0,'transparent');fog.addColorStop(1,levelIndex<2?'#e8e6bc18':'#9f342722');ctx.fillStyle=fog;ctx.fillRect(0,330,width,170);
    for(let i=0;i<25;i++){const x=((random(i+900)*width-camera*.17+Math.sin(time*.3+i)*13)%width+width)%width,y=170+random(i+950)*290+Math.sin(time*.7+i)*8;rect(x,y,2,2,levelIndex<2?'#fff0b27a':'#ef97598a');if(levelIndex===0&&i%5===0){rect(x-2,y-2,2,5,'#ffda99');rect(x+2,y-2,2,5,'#ffda99');}}
    if(levelIndex>=2){rect(0,515,width,25,'#4d1b29');for(let x=0;x<width;x+=14)rect(x,518+Math.sin(time+x*.09)*3,10,3,'#b34937');}
  }
  function drawPlatform([x,y,w,h],index) {
    if(x+w<camera-50||x>camera+viewWidth+50)return;
    rect(x,y,w,h,level.ground);rect(x,y,w,7,level.grass);rect(x,y+7,w,5,'#6b657358');rect(x+3,y+12,w-6,4,'#1a142829');
    if(h<40){rect(x+9,y+h,w-18,6,'#262139');rect(x+19,y+h+6,w-38,4,'#26213988');}
    for(let j=0;j<w/16;j++){const xx=x+j*16;const height=3+random(index*40+j)*8;rect(xx,y-height,2,height,level.grass);if(j%3===0)rect(xx+4,y-4,3,5,level.grass);}
    for(let j=0;j<w/22;j++){const xx=x+random(j+index*51)*w,yy=y+20+random(j+index*31+90)*(h-20);rect(xx,yy,5+random(j)*15,3,'#a299b016');}
    for(let j=0;j<Math.floor(w/120);j++){
      const xx=x+45+j*113,sy=y-3;
      if(levelIndex<2){rect(xx,sy-9,3,10,'#4a7339');rect(xx-5,sy-12,13,5,index%2?'#fff1b2':'#f2bfbe');rect(xx-2,sy-15,7,4,index%2?'#efc164':'#e78c9a');rect(xx-2,sy-11,2,2,'#fff9d0');rect(xx+24,sy-7,2,8,'#728847');rect(xx+21,sy-9,7,4,'#e4e8a4');}
      else {rect(xx,sy-10,14,10,'#c1ac8f');rect(xx-2,sy-8,18,6,'#b39c84');rect(xx+2,sy-7,4,4,'#30212a');rect(xx+9,sy-7,4,4,'#30212a');rect(xx+4,sy+1,7,2,'#c9b296');rect(xx+21,sy,22,3,'#bea58a');rect(xx+20,sy-2,4,7,'#bea58a');rect(xx+39,sy-2,4,7,'#bea58a');rect(xx-8,y+2,29,3,'#822f35');rect(xx+6,y+5,4,13+random(j+index)*16,'#7e2931');}
    }
    if(levelIndex>=2)for(let j=0;j<w/65;j++){rect(x+j*65+21,y+14,3,Math.min(h-16,15+random(j+index)*35),'#8f323433');}
  }
  function diamond(x,y,size,color) { polygon([[x,y-size],[x+size*.65,y],[x,y+size],[x-size*.65,y]],color);polygon([[x,y-size],[x,y+size],[x-size*.65,y]],'#ffffff36'); }
  function drawPortal() {
    const x=level.end+25,y=390;glow(x,y-13,100,levelIndex===3?'#edd0ff38':'#b595f038');
    rect(x-42,443,84,9,'#82758c');rect(x-34,436,68,7,'#b3a0c1');
    ctx.lineWidth=10;ctx.strokeStyle='#756582';ctx.beginPath();ctx.ellipse(x,y,34,54,0,Math.PI,Math.PI*2);ctx.stroke();rect(x-39,y,10,45,'#766582');rect(x+29,y,10,45,'#766582');
    ctx.lineWidth=3;ctx.strokeStyle='#dbc0ff';ctx.beginPath();ctx.ellipse(x,y,28,48,0,0,Math.PI*2);ctx.stroke();
    const g=ctx.createRadialGradient(x,y,2,x,y,48);g.addColorStop(0,'#e8d4ff77');g.addColorStop(.7,'#b18ee28a');g.addColorStop(1,'#6b458a44');ellipse(x,y,26,47,g);
    for(let i=0;i<9;i++){const a=time*.8+i*.7;rect(x+Math.sin(a)*20,y+Math.cos(a*1.2)*36,2,3,'#f0deff');}
    ctx.textAlign='center';ctx.font='10px monospace';ctx.fillStyle='#e3d2f5';ctx.fillText(levelIndex===3?'EL CAMINO A CASA':'AL OTRO LADO',x,y-77);
  }
  function drawPlayer() {
    const p=player;if(p.invulnerable>0&&Math.floor(time*12)%2)return;
    const x=Math.round(p.x),y=Math.round(p.y),bob=p.grounded&&Math.abs(p.vx)>20?Math.sin(time*17)*2:0;
    ellipse(x+12,y+39,15,4,'#15102035');
    ctx.save();ctx.translate(x+12,y+bob);ctx.scale(p.facing,1);
    // A lost traveler: moss-green armor, linen hood and a weathered red scarf.
    polygon([[-4,18],[-15-Math.sin(time*9)*4,17],[-21,27],[-7,24]],'#ad5548');
    rect(-8,18,17,16,'#465439');rect(-9,29,19,5,'#5e6b43');rect(-4,20,10,11,'#8c9c68');rect(-6,33,6,5,'#302c26');rect(4,33,6,5,'#302c26');rect(-9,20,5,7,'#bac19a');rect(7,20,5,7,'#a8b08b');rect(-7,31,16,3,'#514333');
    if(p.grounded&&Math.abs(p.vx)>20){rect(-7,35+Math.sin(time*17)*2,7,4,'#49364e');rect(4,35-Math.sin(time*17)*2,7,4,'#49364e');}
    rect(-6,4,17,15,'#d5b58a');rect(-9,2,19,7,'#c9c8a3');rect(-8,0,14,5,'#e0dbb8');rect(-9,7,5,9,'#a6ab88');rect(7,10,3,3,'#343a29');rect(-4,18,15,4,'#b65f4d');rect(9,24,4,6,'#d2b58c');
    if(has('fire')){glow(15,27,12,'#ffb66a44');rect(13,25,4,4,'#f4b585');}ctx.restore();
  }
  function drawEnemy(e) {
    const x=Math.round(e.x),y=Math.round(e.y),bob=Math.round(Math.sin(time*6+e.x)*2);
    rect(x+3,y+e.h-1,e.w-4,4,'#171a1544');
    if(e.type==='walker'){
      const body=levelIndex?'#965e55':'#789b4d',light=levelIndex?'#b68264':'#adc274';
      rect(x+3,y+11+bob,25,18-bob,body);rect(x+7,y+5+bob,17,8,light);rect(x,y+18,30,8,body);rect(x+7,y+16+bob,4,4,'#ece2bb');rect(x+20,y+16+bob,4,4,'#ece2bb');rect(x+8,y+17+bob,2,2,'#222e20');rect(x+21,y+17+bob,2,2,'#222e20');rect(x+11,y+25,7,2,'#425735');
    }else if(e.type==='hound'){
      ctx.save();ctx.translate(x+(e.dir===1?0:e.w),y);ctx.scale(e.dir,1);
      const charge=e.state==='charge',body=e.state==='windup'?'#be6651':'#844438';
      rect(3,8,27,15,body);rect(5,4,18,8,'#a5634a');rect(26,8,16,13,body);rect(34,14,11,7,'#c0a080');rect(33,19,11,3,'#33242a');rect(35,19,3,5,'#efdfb0');rect(29,4,4,7,'#b28c63');rect(36,3,4,8,'#b28c63');rect(30,11,4,3,'#ffd07b');
      for(let j=0;j<3;j++){rect(9+j*5,9,2,11,'#d0a085');}rect(5,22,5,6+(charge?bob:0),'#592d2d');rect(25,22,5,6-(charge?bob:0),'#592d2d');polygon([[4,11],[-7,3],[-3,16],[5,19]],'#6b3831');ctx.restore();
    }else{
      rect(x+5,y+19,34,27,'#6b5048');rect(x+10,y+24,24,20,'#965e50');rect(x+1,y+19,11,13,'#969078');rect(x+32,y+19,11,13,'#969078');rect(x+14,y+4,18,17,'#cab69b');rect(x+11,y+3,23,8,'#767868');
      polygon([[x+11,y+6],[x+8,y-7],[x+19,y+5]],'#c5bea0');polygon([[x+27,y+5],[x+36,y-7],[x+34,y+9]],'#c5bea0');rect(x+15,y+12,6,4,'#ec7151');rect(x+26,y+12,6,4,'#ec7151');rect(x+18,y+19,10,3,'#3e2628');rect(x+5,y+45,12,13,'#444439');rect(x+28,y+45,12,13,'#444439');rect(x+3,y+53,16,5,'#777465');rect(x+27,y+53,16,5,'#777465');rect(x+17,y+33,12,6,'#312526');rect(x+20,y+29,6,14,'#beb397');
      if(e.state==='windup'){const xx=e.dir<0?x-4:x+e.w+4;glow(xx,y+29,27,'#ff86367a');pixelCircle(xx,y+29,8,'#efad6c');}
    }
    if(e.hitTime>0){ctx.globalAlpha=.5;rect(x,y,e.w,e.h,'#ffcdac');ctx.globalAlpha=1;}
    if(e.maxHp>1){rect(x,y-15,e.w,3,'#241b20');rect(x,y-15,e.w*e.hp/e.maxHp,3,e.type==='brute'?'#e69364':'#db6960');}
    if(e.state==='windup'&&e.type==='hound'){ctx.fillStyle='#ffe4a0';ctx.font='bold 16px monospace';ctx.textAlign='center';ctx.fillText('!',x+e.w/2,y-21);}
  }
  function render() {
    ctx.clearRect(0,0,viewWidth,540);background();ctx.save();ctx.translate(-Math.round(camera)+(shake?Math.sin(time*100)*3:0),0);
    for(let i=0;i<level.platforms.length;i++)drawPlatform(level.platforms[i],i);
    for(const b of blood){rect(b.x,b.y,b.w,4,'#8d2632');rect(b.x+5,b.y+3,b.w/3,3,'#671f2b');rect(b.x+b.w-9,b.y+4,3,10,'#8d2632');}
    level.checkpoints.forEach(([x,y],i)=>{rect(x-3,y-41,6,41,'#82728e');rect(x-8,y-5,16,5,'#9e8aaa');glow(x,y-45,30,i<=checkpointIndex?'#98e7ed66':'#a2a0c22a');diamond(x,y-45,9,i<=checkpointIndex?'#a6eff0':'#8c829e');});
    for(const g of gems)if(!g.taken&&g.x>camera-25&&g.x<camera+viewWidth+25){const y=g.y+Math.sin(time*2+g.x)*4;glow(g.x,y,20,'#9bead027');diamond(g.x,y,8,'#a5ddc7');rect(g.x-1,y-5,2,3,'#e1fff1');}
    if(level.rune&&!has(level.rune)){const x=level.runeX,y=level.runeY+Math.sin(time*2)*6;glow(x,y,55,'#d1a0ff55');ctx.strokeStyle='#d5b0f390';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,27,0,Math.PI*2);ctx.stroke();diamond(x,y,19,'#cda6f4');ctx.textAlign='center';ctx.fillStyle='#f7e7ff';ctx.font='20px serif';ctx.fillText('✧',x,y+7);ctx.font='9px monospace';ctx.fillStyle='#e6cff9';ctx.fillText('DESPIERTA TU MAGIA',x,y-39);}
    drawPortal();
    for(const e of enemies)if(e.alive&&e.x>camera-55&&e.x<camera+viewWidth+55)drawEnemy(e);
    for(const s of hostileShots){glow(s.x+6,s.y+6,22,'#fa563f55');pixelCircle(s.x+6,s.y+6,8,'#dc5345');rect(s.x+3,s.y+3,6,6,'#ffce81');}
    for(const s of shots){glow(s.x,s.y,22,'#ffab6266');ellipse(s.x,s.y,10,6,'#efa168');ellipse(s.x+Math.sign(s.vx)*3,s.y,5,4,'#ffedb6');}
    drawPlayer();
    for(const p of particles){ctx.globalAlpha=clamp(p.life,0,1);rect(p.x,p.y,p.size,p.size,p.color);}ctx.globalAlpha=1;
    ctx.restore();
    const shade=ctx.createLinearGradient(0,465,0,540);shade.addColorStop(0,'transparent');shade.addColorStop(1,levelIndex<2?'#20261b77':'#180e1a99');ctx.fillStyle=shade;ctx.fillRect(0,465,viewWidth,75);
  }
  function frame(stamp) {
    accumulator+=Math.min((stamp-lastTime)/1000 || 0,.05);lastTime=stamp;
    while(accumulator>=1/120){update(1/120);accumulator-=1/120;}
    render();requestAnimationFrame(frame);
  }
  function resize(){const box=$('game-stage').getBoundingClientRect();canvas.width=Math.max(1,Math.round(270*box.width/Math.max(1,box.height)));canvas.height=270;viewWidth=canvas.width*2;ctx.setTransform(.5,0,0,.5,0,0);ctx.imageSmoothingEnabled=false;camera=clamp(camera,0,Math.max(0,(level?.width||3000)-viewWidth));}
  window.addEventListener('resize',resize);
  window.addEventListener('keydown',e=>{
    if($('help-dialog').open)return;
    if(e.code==='KeyF'){if(!e.repeat)toggleFullscreen();e.preventDefault();return;}
    if(e.code==='KeyM'){if(!e.repeat){if(mode==='playing')showOverlay('paused');setTab('map');}e.preventDefault();return;}
    if(e.code==='Escape'||e.code==='KeyP'){if(!e.repeat)pause();e.preventDefault();return;}
    const action=controls[e.code];if(!action||mode!=='playing')return;
    if(e.target instanceof HTMLButtonElement && e.code==='Space')return;
    e.preventDefault();if(!keys.has(action)&&!e.repeat)pressed.add(action);keys.add(action);
  });
  window.addEventListener('keyup',e=>{const action=controls[e.code];if(action)keys.delete(action);});
  window.addEventListener('blur',()=>{clearControls();if(mode==='playing')showOverlay('paused');});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){clearControls();if(mode==='playing')showOverlay('paused');}});
  document.querySelectorAll('[data-control]').forEach(button=>{
    button.addEventListener('pointerdown',e=>{if(mode!=='playing')return;e.preventDefault();button.setPointerCapture(e.pointerId);const a=button.dataset.control;keys.add(a);pressed.add(a);button.classList.add('pressed');});
    for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,()=>{keys.delete(button.dataset.control);button.classList.remove('pressed');});
  });
  $('primary-action').addEventListener('click',primaryAction);
  document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>setTab(button.dataset.tab)));
  $('fullscreen-button').addEventListener('click',toggleFullscreen);
  document.addEventListener('fullscreenchange',()=>{resize();$('fullscreen-button').setAttribute('aria-label',document.fullscreenElement?'Salir de pantalla completa':'Pantalla completa');});
  $('pause-button').addEventListener('click',()=>{if(mode==='playing'||mode==='paused')pause();else primaryAction();});
  $('restart-button').addEventListener('click',()=>{loadLevel(levelIndex);resume();toast('Un nuevo comienzo. Tus habilidades siguen contigo.');});
  $('level-list').addEventListener('click',e=>{const button=e.target.closest('[data-level]');if(!button||button.disabled)return;loadLevel(Number(button.dataset.level));resume();toast(level.subtitle);});
  $('sound-button').addEventListener('click',()=>{sound=!sound;$('sound-button').setAttribute('aria-pressed',String(sound));$('sound-button').setAttribute('aria-label',sound?'Silenciar sonido':'Activar sonido');$('sound-button').textContent=sound?'♫ SONIDO: SÍ':'♪ SONIDO: NO';tone(620,.15);});
  $('help-button').addEventListener('click',()=>{helpWasPlaying=mode==='playing';if(helpWasPlaying)showOverlay('paused');$('help-dialog').showModal();});
  $('close-help').addEventListener('click',()=>$('help-dialog').close());
  $('help-dialog').addEventListener('close',()=>{if(helpWasPlaying)resume();});
  loadLevel(levelIndex);resize();showOverlay('title');
  if(!storageAvailable)$('save-status').textContent='Guardado no disponible · progreso solo en esta sesión';
  requestAnimationFrame(frame);
})();
