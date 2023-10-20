# React FancySlider

A lightweight and flexible carousel slider that allows you to build fully functional and advanced slider with three slides. This react library is built using react.js, css and adheres to latest ECMAScript specs. This library is intended to be used along with react.js.

Latest, update supports touch based devices and responsive layouts for mobiles. Supports IE10+ and all major browsers. You can view live demo [here](https://fancysliderdemo.netlify.app/). If you have any issues, please follow this [link](https://github.com/Bivektamu/react-slider/issues).

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

<Slider className='customClass' touch={true} slideToShow={3} images = {images} auto={true} timer={2000} transitionTime = {500} directionNav = {true} controlNav={true} gap={50} animationEasing = '' />

```


## Props || Options

Below are the options to control Slider component as per requirement:

**`slideToShow {type: integar}`**: number of slides to show between 3 to 1 **`Default: 3`**

**`className {type: string}`**: custom class name passed to slider for better control

**`touch {type: boolean}`**: support for touch based and mobile devices. **`Default: true`**

**`images {type:array}`**: images for slider **`*Required`**

**`auto {type: boolean}`**: sets slider to auto slide **`Default: true`**

**`timer {type: integar}`**: sets the speed of the slideshow cycling, in milliseconds **`Default: 4000 || 4s`**

**`transitionTime {type: integar}`**: sets the speed of animation, in milliseconds **`Default" 500 || 0.5s`**

**`directionNav {type: boolean}`**: sets left and right arrow for navigation **`Default: false`**

**`controlNav {type: boolean}`**: sets dotted navigation buttons on bottom of slider  **`Default: false`**

**`animationEasing {type:string [slide || fade]}`** : sets easing of animation. You can have choose between default, fade or simple slide easing  **`Default: null`**



## App Info
### Author
Bivek Jang Gurung