# TodoMVC Mobile with Material Design



> 1652772  Xiao Rui
>
> Script Language Programming - Course Project
>
> School of Software Engineering
>
> Shanghai Tongji University
>
> 2019 / 06 / 20



## Online Demo

I've deployed the project to my online server.

[TodoMVC - Mobile](http://118.25.99.80)



## Platform

The project is developed with chrome on PC in mobile device mode, and has past the test on Via browser on MEIZU 16th phone and Safari on iPhone 6s Plus.



## Introduction

The project is the final course project for the script language programming. It has realized the fundamental and some of the advanced requirements. And no frameworks or libraries are used.

The primary functions such as creating, removing, editing todo items and local storage are completely supported. You could play with your phone-based browser. There're some advanced requirements that are implemented. They'are shown as following.



## Highlights

### UI Style - Material Design

![1561209569921](README.assets/1561209569921.png)

I've tried to construct the elements with material design style. 



### Transition Animations

All the animations are made using css and js code. You could refer to the todoMVC.css and todoMVC.js.

#### Write Button&Layer

The write new item button bubble would quickly become large and show the write layer. I've used the bezier curve to describe the acceleration.

![1561212389129](README.assets/1561212389129.png)

![1561212348690](README.assets/1561212348690.png)

![1561212368769](README.assets/1561212368769.png)

```css
.rippling {
    animation: .3s rippling 1;
}

@keyframes rippling {
    25% {
        transform: scale(1.5);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.button-wrapper.clicked .button-layer {
    transform: scale(30);
    transition: 1.5s cubic-bezier(.25,.8,.25,1);
}
```

#### Edit Side of Cards - Rotation

Click the text content of the card and it would rotate to show the buttons.

![1561214130389](README.assets/1561214130389.png)

![1561214154198](README.assets/1561214154198.png)

![1561214267317](README.assets/1561214267317.png)

```css
.card-selected{
    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);

    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.card-front{
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    
    transition: all 1s cubic-bezier(.25,.8,.25,1);
}

.card-selected .card-front{
    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
    transition: all 1s cubic-bezier(.25,.8,.25,1);
}

.card-back{
    position: absolute;
    margin-top: -15pt;
    margin-right: -150pt;
    top: 50%;
    right: 50%;
    width: 300pt;
    height: 20pt;

    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    transition: all .9s cubic-bezier(.25,.8,.25,1);
}

.card-selected .card-back{
    transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transition: all .9s cubic-bezier(.25,.8,.25,1);
}
```

#### Slide Down to Fold Navigation Bar

When sliding down, the navigation bar would be folded.

![1561214755628](README.assets/1561214755628.png)

And slide up to unfold it.

![1561214788411](README.assets/1561214788411.png)

```js
// begin touch event, to calculate the slide direction
document.addEventListener("touchstart", function(e){
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
}, false);

// end touch event
document.addEventListener("touchend", function(e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    switch (direction) {
        case 1:
            foldNav();
            break;
        case 2:
            unfoldNav();
            break;
        default:
    }
}, false);
```

### Edit Single Item

Click the edit button ( seem like a pencil ) at the right side of the card and enter the edit page of the todo item.

![1561214998763](README.assets/1561214998763.png)