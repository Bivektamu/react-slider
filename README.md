# React FancySlider

A lightweight and flexible carousel slider that allows you to build fully functional and advanced slider with three slides. This react library is built using react.js, css and adheres to latest ECMAScript specs. This library is intended to be used along with react.js.
Supports IE10+, all major browsers and even mobile.

## Inspiration

Originally, this was a pure vanilla js module which I had developed for one of my client as per their unique requirement. They specifically wanted three slides carousel along with unique transition effect. Now, I have upgraded this library to have more control over carousel such as navigation buttons, transition duration, animation duration, number of slides to be displayed, e.t.c.


## Installation

You can install this package using below command:

```bash
npm install react-fancyslider
```

**Note**: You are to use this library along with react.js, since it is a pure react component under the hood.

## Usage

Import the Slider component in your desired react component using following code:


```javascript

import {Slider} from 'react-fancyslider'

```

Then, simply use it with below code.


```javascript

const images = [img1, img2, ....] //Slider Images

<Slider slideToShow={3} images = {images} auto={true} timer={2000} transitionTime = {500} directionNav = {true} controlNav={true} gap={50} animationEasing = '' />

```


## Props || Options

Below are the options to control Slider component as per requirement:

`__slideToShow {type: integar}__`: number of slides to show between 3 to 1 `Default: 3`

`__images {type:array}__`: images for slider `*Required`

`__auto {type: boolean}__`: sets slider to auto slide `Default: true`

`__timer {type: integar}__`: sets the speed of the slideshow cycling, in milliseconds `Default: 4000 || 4s`

`__transitionTime {type: integar}__`: sets the speed of animation, in milliseconds `Default" 500 || 0.5s`

`__directionNav {type: boolean}__`: sets left and right arrow for navigation `Default: false`

`__controlNav {type: boolean}__`: sets dotted navigation buttons on bottom of slider  `Defult: false`

`__animationEasing {type:string [slide || fade]}__` : sets easing of animation. You can have choose between default, fade or simple slide easing  `Default: null`



## App Info
### Author
Bivek Jang Gurung




