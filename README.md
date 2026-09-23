# Umbral · El paraíso miente

**Versión 1.0.0** · primera versión del juego registrada en Git, identificada por la etiqueta `v1.0.0`.

Un plataformas de fantasía oscura isekai en español, con pixel art dibujado a baja resolución. Despiertas en un bosque soleado y avanzas hacia un mundo cada vez más corrompido: ruinas marchitas, jardines de carne y una catedral infernal. Cuatro regiones, cristales opcionales, tres especies de enemigos, balizas y tres habilidades permanentes: doble salto, impulso arcano y bola de fuego.

El juego ocupa toda la ventana. El mapa, el grimorio, el bestiario y las opciones están dentro del menú, que pausa el combate. El HUD muestra vida, cristales, poderes, recargas y bajas. También hay un botón de pantalla completa nativa; necesita una interacción del usuario y compatibilidad del navegador.

## Origen y versiones

Esta versión reúne los dos pedidos de diseño realizados hasta ahora: crear un plataformas isekai con niveles y magia desbloqueable, preparado para GitHub Pages; y convertirlo en un juego a pantalla completa, con menús internos, pixel art y una ambientación inspirada en el tono sangriento y tétrico de Doom. El recorrido empieza en un lugar feliz y se oscurece progresivamente, incorporando dos tipos nuevos de enemigos más fuertes.

Los pedidos originales, el alcance de la versión y las comprobaciones realizadas están documentados en [CHANGELOG.md](./CHANGELOG.md). El archivo [VERSION](./VERSION) contiene el número de versión actual.

La etiqueta `v1.0.0` conserva este estado como punto de partida. Los prototipos anteriores a la creación del repositorio no tienen commits separados.

Para consultar el historial:

```sh
git log --oneline --decorate
git show v1.0.0
```

Para futuras versiones, guarda los cambios en nuevos commits; cuando cierres una versión, actualiza `VERSION` y `CHANGELOG.md` y crea una etiqueta nueva. Conserva `v1.0.0` apuntando a esta primera entrega.

## Jugar en local

Abre `index.html` en un navegador moderno. No necesita instalar dependencias ni compilar. También puedes servir esta carpeta con cualquier servidor HTTP estático.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube `index.html`, `styles.css`, `game.js` y `favicon.svg` a su raíz.
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
| Impulso arcano | Shift o X |
| Bola de fuego | E o J |
| Menú / pausa | Esc o P |
| Mapa de regiones | M |
| Pantalla completa | F |

En pantallas táctiles aparecen botones sobre el juego. Pulsa de nuevo para hacer el segundo salto. El sonido se activa con el botón musical.

## Progresión

- **Bosque del despertar (0% de corrupción):** sol, flores, aves y pequeños errantes. Encuentra el doble salto.
- **Ruinas marchitas (32%):** vegetación apagada, los primeros rastros de sangre y sabuesos que embisten. Encuentra el impulso arcano.
- **Jardines de la carne (68%):** árboles muertos, restos, sangre y verdugos blindados. Encuentra la bola de fuego antes de enfrentarte al primero.
- **Catedral del abismo (100%):** arquitectura infernal, cielo rojo y siete enemigos avanzados. Combina tus habilidades para volver a casa.

## Enemigos

| Enemigo | Vida | Comportamiento |
| --- | --- | --- |
| Errante | 1 | Patrulla; vulnerable a saltos y fuego. |
| Sabueso de sangre | 2 | Detecta al jugador, avisa durante medio segundo y embiste; vulnerable a saltos y fuego. |
| Verdugo de ceniza | 4 | Dispara brasas tras una animación de aviso; casco con púas inmune a los saltos, vulnerable al fuego. |

La velocidad y la frecuencia de ataque aumentan en regiones posteriores. Los impactos producen partículas y las derrotas dejan manchas de sangre a partir de las ruinas. El bosque conserva una estética amable. Los proyectiles enemigos chocan con el escenario; se pueden saltar o atravesar con el impulso.

Las runas son necesarias para abandonar su región. Los cristales son opcionales. Salta sobre los guardianes o usa magia; el impulso protege del contacto mientras dura. Las balizas recuperan los corazones y fijan el punto de reaparición del intento actual. Al perder los tres corazones se reinicia el nivel, conservando las habilidades.

El navegador guarda regiones completadas, habilidades y el mejor número de cristales por región en `localStorage` (clave `umbral-adventure-v1`). La posición y los cristales de un intento en curso no se guardan al cerrar. Si el almacenamiento no está disponible, se puede jugar durante la sesión. El mapa permite repetir regiones desbloqueadas.

## Archivos

- `index.html`: interfaz y ayuda accesible.
- `styles.css`: diseño adaptable, controles táctiles y tipografía.
- `game.js`: física, niveles, dibujo Canvas, sonidos sintetizados y guardado.
- `favicon.svg`: icono original.

El arte se dibuja mediante código en un Canvas de 270 píxeles de alto, escalado sin suavizado. Los efectos de sonido se sintetizan con Web Audio y la interfaz usa una tipografía local monoespaciada. No hay imágenes, fuentes remotas, librerías, servicios de juego ni claves externas. Funciona sin conexión. Los datos de los niveles y sus paletas están al inicio de `game.js`. El guardado de la primera versión sigue siendo compatible.
