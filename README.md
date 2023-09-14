#React FancySlider

A lightweight and flexible carousel slider that allows you to build fully functional and advanced slider with three slides. This react library is built using react.js, css and adheres to latest ECMAScript specs. This library is intended to be used along with react.js.
Supports IE10+, all major browsers and even mobile.

##Inspiration

Originally, this is a pure vanilla js module which I had created for one of my client as per their unique requirement. They specifically wanted three slides carousel along with unique transition effect. Furthermore, I have upgraded this library to have more control over carousel such as navigation buttons, transition duration, animation duration, number of slides to be displayed, e.t.c.


##Installation

**Note**: You are to use this library along with react.js, since it is a pure react component under the hood.

You can install this package using below command:

```bash
npm install react-fancyslider
```

##Usage

Import the Slider component in your desired react component using following code:


```javascript

import {Slider} from 'react-fancyslider'

```

Then, simply use it with below code.


```javascript

const images = [img1, img2, ....] //Slider Images

<Slider slideToShow={3} images = {images} auto={true} timer={2000} transitionTime = {500} directionNav = {true} controlNav={true} gap={50} />

```


### Options

Below are the options to control Slider component as per your requirement:

`slideToShow`: sets state of Growl component to show or hide. 
`message {type:string}`: sets message of Growl component to display. 