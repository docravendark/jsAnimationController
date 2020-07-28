# jsAnimationController
[![GitHub license](https://img.shields.io/npm/l/jsAnimationController?style=flat-square)](https://github.com/docravendark/jsAnimationController/blob/master/LICENSE)
![Node Version](https://img.shields.io/npm/v/jsAnimationController?style=flat-square)

a lib for controlling timebased animationeffects
## Demo

[simple demo](https://github.com/docravendark/jsAnimationController/blob/master/examples/simpleTest.html) 

![complex script demo](/doc/complexSample.gif)

[complex script demo](https://github.com/docravendark/jsAnimationController/blob/master/examples/complexMovement.html) 

## Table of Contents

-   [Installation](#installation)
-   [Documentation](#documentation)

## Installation

1. Download
2. import script

```html
<script src="../dist/jsAnimationController.js"></script>
```

## HowTo

for the animation to work you need an animation loop. the easiest way is request an animationframe:
```javascript   
function animate() {
  requestAnimationFrame(animate);
  myAnimationController.Animate();
}
animate();
```
to init use the following call:

```javascript
// create instance
let myAnimationController = new symolo.jsAnimation();
// register object for animation
let myAnimationObject = myAnimationController.registerSceneObject(document.getElementById("frst_boxToMove_id"));
// setup your animation
myAnimationController.add(myBox, 0, 1000, new symolo.effects.moveEffect({ X:500, Y: 500 }));
// start your animation
myAnimationController.Start(); 
```

## Documentation

### Datatypes
this project introduce some own datatypes
| Name             | Defintion  | Description                                             
| -                |  -         | -
| `point`          | `{x,y}`    | represents an Point    
| `size`           | `{w,h}`    | represents an Size     
| `rect`           | `{x,y,w,h}`| represents an rectangle
| `vector3`        | `{x,y,z}`  | represents an vector   

### The Animation Object
```js
let myAnimationController = new symolo.jsAnimation();
```
### Methodes
|Name    | Description 
|-       | - 
|add     | adds an effectblock to the animation 
|Start   | start the animation 
|Stop    | stop the animation   
|Restart | reset the animation 
|Animate | runs the animation  

#### `myAnimationController.add(objToSet,startTick,duration,effect)`
this function all to add an effectblock
| Parameter      | Type            |  Description                                              |
| -------------- | --------------- |  -------------------------------------------------------- |
| `objToSet`     | jsBaseAnimationObject  | Animationobject (get it with registerSceneObject ) |
| `startTick`    | Number                 |  startTime in Ticks                                |
| `duration`     | Number                 |  endtime in Ticks                                  |
| `effect`       | iEffect                |  effect to use (see effects)                       |

#### `myAnimationController.Start()`
start the animation

#### `myAnimationController.Stop()`
stop the animation

#### `myAnimationController.Restart()`
reset the animation and start over

#### `myAnimationController.Animate(elapsed)`
runs the animation
| Parameter      | Type            |  Description                                              |
| -------------- | --------------- |  -------------------------------------------------------- |
| `elapsed`     | Number  | elapsedtime in ticks (optional) |

### Effects
```js
new symolo.effects.moveEffect({ X:500, Y: 500 })
```
| Type              | Description            | Parameter   |  Preview                                   |
| --------------    | ---------------        | -           | -                                          |
| `moveEffect`      | Move the Sceneobject   | `vector3`   | ![moveEffect](/doc/complexSample.gif)      |
| `fadeEffect`      | Move the Sceneobject   | `number`    | ![fadeEffect](/doc/complexSample.gif)      |
| `rotationEffect`  | Rotate the Sceneobject | `vector3`   | ![rotationEffect](/doc/complexSample.gif)  |

