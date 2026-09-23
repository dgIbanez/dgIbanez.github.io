# Umbral · El paraíso miente

**Versión 1.2.0 — El peso del acero.** Las entregas anteriores siguen conservadas en las etiquetas `v1.0.0` y `v1.1.0`.

Un plataformas de fantasía oscura isekai en español, con sprites originales animados en pixel art. Despiertas en un bosque soleado y avanzas hacia un mundo cada vez más corrompido: ruinas marchitas, jardines de carne y una catedral infernal. Cuatro regiones, siete especies de enemigos, espada desde el inicio, maná, cristales, balizas y tres habilidades permanentes: doble salto, impulso arcano y bola de fuego.

El juego ocupa toda la ventana. El mapa, el grimorio, el bestiario animado y las opciones están dentro del menú, que pausa el combate. El HUD muestra vida, maná, cristales, poderes, recargas y bajas. También hay un botón de pantalla completa nativa; necesita una interacción del usuario y compatibilidad del navegador.

## Origen y versiones

La versión 1 reunió los pedidos de crear un plataformas isekai con niveles y magia desbloqueable, preparado para GitHub Pages, y llevarlo a pantalla completa con menús internos y un mundo progresivamente más tétrico. La versión 1.1 incorpora el pedido posterior: animaciones y pixel art más detallado, criaturas clásicas de fantasía, espada y magia limitada por maná. Se mantiene el oscurecimiento de las cuatro regiones.

Los pedidos originales, el alcance de la versión y las comprobaciones realizadas están documentados en [CHANGELOG.md](./CHANGELOG.md). El archivo [VERSION](./VERSION) contiene el número de versión actual.

La versión 1.2 desarrolla el pedido de mejorar las animaciones, comenzando por el protagonista y la espada. Los pasos coordinan brazos, piernas y capa según la distancia recorrida; hay poses distintas de ascenso, caída, aterrizaje e impulso. La espada prepara el golpe, traza un tajo y vuelve a reposo. Al acertar aparece un destello y el mundo se detiene unos 55 ms para dar peso al impacto, conservando las pulsaciones recibidas durante esa pausa.

La etiqueta `v1.0.0` conserva la primera entrega como punto de partida. Los prototipos anteriores a la creación del repositorio no tienen commits separados.

Para consultar el historial:

```sh
git log --oneline --decorate
git show v1.0.0
```

Para futuras versiones, guarda los cambios en nuevos commits; cuando cierres una versión, actualiza `VERSION` y `CHANGELOG.md` y crea una etiqueta nueva. Conserva `v1.0.0` apuntando a esta primera entrega.

## Jugar en local

Abre `index.html` en un navegador moderno. No necesita instalar dependencias ni compilar. También puedes servir esta carpeta con cualquier servidor HTTP estático.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube `index.html`, `styles.css`, `pixel-art.js`, `game.js` y `favicon.svg` a su raíz.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**.
4. Selecciona la rama que contiene los archivos (normalmente `main`), carpeta **/ (root)**, y guarda.
5. GitHub mostrará la dirección de la web cuando termine la publicación: `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

El archivo `.nojekyll` permite publicar los archivos directamente. Todas las rutas son relativas para funcionar también dentro de un repositorio de proyecto.

## Controles

| Acción | Tecla |
| --- | --- |
| Mover | A / D o ← / → |
| Saltar / doble salto | Espacio, W o ↑ |
| Espada | C, K o clic izquierdo; mantener para repetir |
| Impulso arcano | Shift o X |
| Bola de fuego (20 MP) | E o J |
| Menú / pausa | Esc o P |
| Mapa de regiones | M |
| Pantalla completa | F |

En pantallas táctiles aparecen botones sobre el juego. Pulsa de nuevo para hacer el segundo salto. El sonido se activa con el botón musical.

## Espada y maná

La espada está disponible desde el inicio y no consume maná. Causa 1 de daño por enemigo y tajo, empuja a la criatura y puede golpear a varios enemigos cercanos o destruir proyectiles. Tiene alcance frontal y no atraviesa terreno sólido. Un ataque dura 0,34 segundos y puede repetirse cada 0,44 segundos.

La bola de fuego causa 2 de daño y cuesta **20 MP**, con un máximo de **100 MP**. Si no alcanza el maná, el hechizo no se lanza. Las fuentes de recuperación son:

- Regeneración: 5 MP/s, después de 1,2 segundos sin lanzar fuego.
- Cristales: 12 MP.
- Esencias azules que dejan los enemigos: 20 MP; se acercan al jugador y desaparecen a los 15 segundos si no las recoge.
- Balizas y reinicio de región: restauración completa.

La pausa detiene la regeneración, los ataques y los proyectiles. El doble salto y el impulso son habilidades de movimiento que no consumen maná, para mantener practicables los saltos entre plataformas. La salud y el maná del intento actual no se guardan al cerrar la página.

## Progresión

- **Bosque del despertar (0% de corrupción):** sol, flores y aves; slimes, goblins y un murciélago. Encuentra el doble salto.
- **Ruinas marchitas (32%):** vegetación apagada y los primeros rastros de sangre; aparecen esqueletos arqueros, hobgoblins y sabuesos. Encuentra el impulso arcano.
- **Jardines de la carne (68%):** árboles muertos, restos, sangre y verdugos blindados. Encuentra la bola de fuego antes de enfrentarte al primero.
- **Catedral del abismo (100%):** arquitectura infernal, cielo rojo, siete enemigos terrestres avanzados y un murciélago. Combina tus habilidades para volver a casa.

## Enemigos

| Enemigo | Vida | Comportamiento |
| --- | --- | --- |
| Slime del bosque | 1 | Patrulla con animación elástica; vulnerable a saltos, espada y fuego. |
| Goblin saqueador | 2 | Persigue y anuncia una puñalada; vulnerable a saltos, espada y fuego. |
| Hobgoblin de hierro | 4 | Prepara un barrido de maza y queda expuesto durante su recuperación. Casco inmune a pisotones. |
| Murciélago umbrío | 1 | Aletea, flota y se lanza en picada; vulnerable al combate aéreo. |
| Esqueleto arquero | 2 | Tensa su arco y dispara flechas que pueden cortarse con la espada. |
| Sabueso de sangre | 2 | Detecta al jugador, avisa durante medio segundo y embiste. |
| Verdugo de ceniza | 4 | Dispara brasas; casco con púas inmune a saltos. Vulnerable a espada y fuego. |

La velocidad y la frecuencia de ataque aumentan en regiones posteriores. Los impactos producen partículas y las derrotas dejan manchas de sangre a partir de las ruinas. El bosque conserva una estética amable. Los proyectiles enemigos chocan con el escenario; se pueden saltar o atravesar con el impulso.

Las runas son necesarias para abandonar su región. Los cristales son opcionales. Usa espada, saltos o magia según la criatura; el impulso protege del contacto mientras dura. Las balizas recuperan corazones y maná y fijan el punto de reaparición del intento actual. Al perder los tres corazones se reinicia el nivel, conservando las habilidades.

El navegador guarda regiones completadas, habilidades y el mejor número de cristales por región en `localStorage` (clave `umbral-adventure-v1`). La posición y los cristales de un intento en curso no se guardan al cerrar. Si el almacenamiento no está disponible, se puede jugar durante la sesión. El mapa permite repetir regiones desbloqueadas.

## Archivos

- `index.html`: interfaz y ayuda accesible.
- `styles.css`: diseño adaptable, controles táctiles y tipografía.
- `game.js`: física, niveles, dibujo Canvas, sonidos sintetizados y guardado.
- `pixel-art.js`: sprites originales por fotogramas, poses y efectos animados de fuego, viento, impacto y recuperación.
- `favicon.svg`: icono original.

El escenario se dibuja mediante código en un Canvas de 540 píxeles de alto, escalado sin suavizado. Los enemigos usan sprites de 48 × 48 píxeles, generados y almacenados en caché por pose y fotograma. El protagonista se dibuja con extremidades articuladas sobre una base de 48 píxeles, un ciclo de 12 pasos y poses interpoladas de ataque. Su espada permanece unida a la mano y su estela sigue el recorrido de la hoja. El fuego tiene seis fases, núcleo, contorno y estela; hay ráfagas turquesas de viento, destellos de maná, recuperación rosada, polvo de pisadas e impactos. La imagen aportada por el usuario orientó el estilo de los efectos; no se usa como textura del juego.

Los efectos de sonido se sintetizan con Web Audio y la interfaz usa una tipografía local monoespaciada. No hay imágenes, fuentes remotas, librerías, servicios de juego ni claves externas. Funciona sin conexión. Los datos de los niveles y sus paletas están al inicio de `game.js`. El guardado de la primera versión sigue siendo compatible.
