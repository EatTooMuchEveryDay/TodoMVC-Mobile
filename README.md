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

#### Edit Side of Cards - Rotation

Click the text content of the card and it would rotate to show the buttons.

![1561214130389](README.assets/1561214130389.png)

![1561214154198](README.assets/1561214154198.png)

![1561214267317](README.assets/1561214267317.png)

#### Slide Down to Fold Navigation Bar

When sliding down, the navigation bar would be folded.

![1561214755628](README.assets/1561214755628.png)

And slide up to unfold it.

![1561214788411](README.assets/1561214788411.png)

### Edit Single Item

Click the edit button ( seem like a pencil ) at the right side of the card and enter the edit page of the todo item.

![1561214998763](README.assets/1561214998763.png)