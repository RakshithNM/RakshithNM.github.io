---
layout: post
title: "Vertical centering"
date: 2017-04-22
---

The post will explain methods in which a div of smaller width and height can be vertically and horizontally centered within a div of larger width and height. This might have been the most googled topic by web developers as there was no straight forward [non-hack] solution that served the purpose.

Trick 1 : Format larger div as a table cell.
---------
This trick is a CSS2 trick, the idea is to format the outer div as a table cell which allows us to vertically center the content because the contents of a table cell can be vertically aligned.
Check the implementation [here](http://codepen.io/RakshithNM/pen/YWaXRq).

Trick 2 : Using the transform property.
---------
This trick is a CSS3 trick, which is based on the idea of positioning the larger (outer) div relatively and the smaller ( inner ) div absolutely.
Check the implementation [here](http://codepen.io/RakshithNM/pen/amLWrQ).
The inner element (div) is positioned 50% from top top: 50%; positioned 50% from the left left: 50%; (and then using the transform property transform: translate(-50%, -50%); it is moved up 50% its height and moved left 50% its width.

All the above seem to fullfill our requirrement of placing the smaller div exactly in the center of the larger one, both the methods is the best way to do it. With the new Flexbox, there is an easy straight foward method to do it.

Trick3: Flexbox
---------
This trick sets the display property of the larger div to be flex which allows us to use the other properties that flexbox provides. Then use the align-items: center property to vertically align it. The property justify-content: center align the child div within this div to be horizontally centered.
Check the implementation [here](http://codepen.io/RakshithNM/pen/PmzwOP)

Happy learning :)