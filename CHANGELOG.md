# Historial de Umbral

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
