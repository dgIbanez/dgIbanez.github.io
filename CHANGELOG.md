# Historial de Umbral

## 1.3.0 — Un almuerzo pendiente — 2026-09-23

### Pedido del usuario

El usuario compartió una idea completa de campaña: un dragón roba el chorizo del protagonista, que lo persigue a través de regiones progresivamente más oscuras. La referencia está conservada en [docs/IDEA_ORIGINAL.md](./docs/IDEA_ORIGINAL.md); el alcance y lo pendiente están en [docs/DESIGN.md](./docs/DESIGN.md).

Se propuso implementar primero el prólogo, los Campos del Reino, las primeras páginas de Ignis, el Goblin Chief y su cierre rumbo a Valdren. El usuario confirmó:

> Perfecto, vamos con eso. Ese apartado de "dependiendo si derrotas enemigos con melee, te da estamina, o con magia te da maná" de momento dejalo de lado

### Cambios

- Prólogo de tres escenas con pixel art animado del protagonista, el dragón y el chorizo. Avance manual, omisión, repetición desde el menú y combate detenido mientras se muestra.
- Primera región ampliada como Los Campos del Reino, con campamento, casas, torre de madera, baliza y arena al final.
- Páginas persistentes de Ignis e Ignis II. El fuego se aprende en la primera región; la mejora añade daño directo y explosión, mantiene el coste de 20 MP y se refleja en el grimorio y el HUD.
- Goblin Chief de 18 de vida: barrido y ondas de maza con preparación, ataque y recuperación; corona inmune a pisotones, barra de jefe, límites de arena y reintento cercano tras morir.
- Escena de victoria con el dragón escapando, portal bloqueado hasta derrotar al jefe y continuación hacia Las Ruinas de Valdren. Se mantienen las cuatro regiones jugables; las once regiones de la propuesta no están implementadas aún.
- Migración de guardados anteriores, páginas conservadas al morir y estado del jefe reiniciado al repetir una región.
- Sin stamina ni recompensas por tipo de ataque. Las esencias dan los mismos 20 MP para todas las bajas, como antes.

### Validación

- 85 comprobaciones automatizadas en Chrome: 62 del motor anterior, adaptando las expectativas del portal y el plantel inicial, y 23 de escenas, páginas, explosiones, arena, ataques del jefe, muerte y transición a Valdren.
- Recorrido con entradas de movimiento, salto y magia desde el inicio hasta ambas páginas, combate contra el Chief y apertura del portal, sin teletransportar al jugador ni modificar su vida o daño.
- Carga de guardados antiguos, guardados con la mejora y campos inválidos; preservación del progreso y normalización de páginas.
- Revisión visual del prólogo en escritorio y móvil a 390 × 844, de la arena del jefe y del grimorio móvil: sin desbordamiento horizontal y con acceso a los controles mediante desplazamiento. La página principal abre el prólogo y reanuda el juego sin errores en la prueba.
- Herramientas y capturas locales en `.test-artifacts/`, fuera de Git.

Versión local `v1.3.0`; se conservan las etiquetas anteriores.

## 1.2.0 — El peso del acero — 2026-09-23

### Pedido del usuario

> hay forma de mejorar las animaciónes? o es muy complejo?

Ante la propuesta de comenzar por el protagonista y la espada, el usuario confirmó:

> perfecto, realiza eso

### Cambios

- Protagonista articulado en pixel art: brazos y piernas coordinados, capa con movimiento, respiración y parpadeo en reposo. La cadencia de los pasos sigue la distancia recorrida y se detiene contra paredes.
- Poses diferenciadas al subir, caer, aterrizar, impulsarse y lanzar magia; polvo al pisar y aterrizar. El aterrizaje no bloquea el siguiente salto.
- Espada anclada a la mano, con preparación, tajo y recuperación interpolados. La estela sigue la punta de la hoja durante la fase activa.
- Destello y pausa del mundo de aproximadamente 55 ms al confirmar un golpe o cortar un proyectil, una sola vez por ataque. Las pulsaciones recibidas durante esa pausa se conservan hasta reanudar la simulación.
- El dibujo y la ventana de daño comparten los tiempos del ataque: 340 ms de animación, fase activa entre 80 y 260 ms y recarga de 440 ms de simulación. Se conservan daño, alcance, maná, niveles y guardados de la versión anterior.

### Validación

- 62 comprobaciones en Chrome: las 49 anteriores y 13 nuevas sobre fases del tajo, pausa de impacto, entrada durante la pausa, cadencia, aterrizaje, reinicio, poses y reflejo horizontal.
- Revisión visual de poses ampliadas, combate en escritorio y móvil a 390 × 844, sin desbordamiento horizontal; pulsación y liberación del ataque táctil verificadas. La página principal inicia y dibuja sin errores durante la comprobación.
- Las herramientas y capturas de prueba permanecen fuera de Git en `.test-artifacts/`.

Se registra por separado como `v1.2.0`, conservando las etiquetas anteriores.

## 1.1.0 — Acero y magia — 2026-09-23

### Pedido del usuario

> Es posible agregar animaciones y pixelart mas elaborado como esta imagen?
>
> Esta perfecto como van siendo mas oscuros los niveles. Pero los enemigos pueden mejorar.
>
> Agregar los clasicos, Goblins, Hobgoblins, y tipicas criaturas de un mundo de magia.
>
> Agregar melee con una espada y que la magia sea limitada por maná

Se adjuntó una lámina de efectos elementales en pixel art como referencia visual. Se mantiene la progresión de ambientes de la versión 1.

### Cambios

- Nuevo módulo `pixel-art.js`: sprites originales de 48 × 48 píxeles, paletas con contornos y luces, ocho fotogramas y poses de movimiento, reposo, ataque, lanzamiento y daño; animación de desaparición al morir.
- Canvas de 540 píxeles de alto para conservar el detalle de los sprites, escalado sin suavizado.
- Fuego animado en seis fases con núcleo, estela e impacto; remolinos turquesas para movimientos arcanos, destellos de maná y efectos de recuperación.
- Goblins con daga, hobgoblins con maza, esqueletos arqueros y murciélagos con picada. El errante se rediseña como slime y se detallan el sabueso y el verdugo: siete especies con comportamientos y bestiario propios.
- Espada disponible desde el inicio con `C`, `K`, clic izquierdo o botón táctil. Golpe frontal de 1 de daño, retroceso, alcance limitado por paredes y destrucción de proyectiles. Mantener pulsado permite repetir.
- Maná máximo de 100 MP; cada bola de fuego cuesta 20 MP y causa 2 de daño. Regeneración de 5 MP/s tras 1,2 segundos sin lanzar fuego, cristales de 12 MP, esencias de enemigos de 20 MP y restauración completa en balizas.
- HUD de maná, recarga de espada, controles, grimorio y ayuda actualizados. El movimiento no consume maná. La pausa congela el combate y la regeneración.
- Compatibilidad con partidas guardadas de `v1.0.0` y sin cambios en la oscuridad progresiva de las regiones.

La etiqueta `v1.0.0` conserva intacta la primera entrega. Esta actualización se registra por separado como `v1.1.0`.

### Validación

- 49 comprobaciones del motor: 14 de plataformas y progreso, 12 de combate previo y menús, y 23 de espada, maná, enemigos nuevos y renderizado de sprites y efectos.
- Ataque mantenido y liberación comprobados con eventos de ratón y táctiles en Chrome.
- Revisión visual del bestiario, el combate y el HUD en escritorio y móvil; sin desbordamiento horizontal a 390 × 844.
- Las herramientas y capturas de prueba permanecen fuera de Git en `.test-artifacts/`.

## 1.0.0 — 2026-09-23

Primera versión registrada en Git. La etiqueta `v1.0.0` identifica el juego tal como quedó después de los siguientes pedidos. Los textos del usuario se conservan literalmente, incluidos sus errores de escritura.

### Pedido inicial

> Haz un juego plataformer para publicar en github pages, algo básico con niveles o mapa, la idea es que sea un isekai o mundo con magia. desbloqueando habilidades o magia.

Resultado: un plataformas de fantasía isekai en español, con cuatro regiones, mapa de progreso, doble salto, impulso arcano y bola de fuego desbloqueables. Implementado como una web estática en HTML, CSS y JavaScript, preparada para GitHub Pages, sin dependencias ni compilación.

También se incorporaron cristales opcionales, enemigos, puntos de reaparición, guardado local, sonido sintetizado y controles de teclado y táctiles.

### Pedido de ambientación e interfaz

> Bien, para emepzar esta perfecto.
>
> Ahora, la pantalla que sea pantalla completa y los menus y niveles que sea un menu o apartado dentro del juevo.
>
> Que sea estilo pixel art, y mas orientado a la estetica que tiene doom en cuanto a lo sanguinario y tetrico que es.
>
> Que inicie en un lugar lindo y feliz, a medida que vas avanzado que vaya empeorando y aparezcan enemigos mas fuertes (agrega unos 2 enemigos mas)

Resultado:

- El juego ocupa toda la ventana y permite activar pantalla completa nativa con `F` o su botón.
- El menú interno pausa el combate y reúne el mapa, el grimorio, el bestiario, el sonido, la ayuda y el reinicio. Se abre con `Esc` o `P`; `M` abre el mapa.
- El arte se dibuja en Canvas a 270 píxeles de alto y se escala sin suavizado. La interfaz adopta un aspecto retro, con un HUD de vitalidad, cristales, poderes y bajas.
- La ambientación pasa del Bosque del despertar, soleado y con flores y aves, a las Ruinas marchitas, los Jardines de la carne y la Catedral del abismo.
- Las regiones posteriores incorporan sangre, restos, árboles muertos y arquitectura infernal. La referencia a Doom orienta el tono; los gráficos se dibujan mediante código propio.
- Se añadieron dos tipos de enemigos: el Sabueso de sangre, con dos vidas y una embestida anunciada; y el Verdugo de ceniza, con cuatro vidas, casco con púas y proyectiles de brasa.
- Los enemigos avanzados aparecen progresivamente y la última región aumenta su presencia y peligrosidad.
- Se conserva la compatibilidad con el guardado del prototipo previo.

### Pedido de registro de versiones

> Genera un repo para guardar las versiones. Quiero que este sea la version 1 del juego. Y registra en el readme o en el commit (o donde veas mejor) que fue lo que pedí para llegar a este resultado

Resultado: repositorio Git local con una primera entrega `1.0.0`, commit inicial y etiqueta anotada `v1.0.0`. Se añadieron este historial, una referencia en el README y el archivo `VERSION`. El perfil temporal del navegador y los artefactos locales de prueba se excluyen mediante `.gitignore`.

Este registro no reconstruye versiones anteriores: el primer commit contiene el estado final acordado para la versión 1. Crear el repositorio local no publica el juego ni crea automáticamente un repositorio remoto en GitHub.

### Validación realizada durante el desarrollo

- 14 comprobaciones del motor: movimiento, colisiones, saltos, impulso, magia, runas, portales, progreso, reaparición y pausa.
- 12 comprobaciones adicionales: progresión de enemigos, ataques anunciados, resistencia, protección del casco, proyectiles, invulnerabilidad durante el impulso, pausa de combate, paneles del menú y limpieza de estado al reiniciar.
- Revisión visual en Chrome de escritorio y tamaños móviles, en vertical y horizontal.
- Comprobación de entrada y salida del modo nativo de pantalla completa.

Estas comprobaciones se ejecutaron con herramientas locales de desarrollo. Sus archivos temporales no forman parte de la entrega ni son necesarios para jugar. No se afirma compatibilidad probada con todos los navegadores.
