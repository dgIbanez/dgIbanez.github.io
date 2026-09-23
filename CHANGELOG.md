# Historial de Umbral

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
