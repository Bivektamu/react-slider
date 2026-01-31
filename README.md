# React FancySlider (v3.1)

A lightweight and flexible carousel slider that allows you to build fully functional and advanced slider which supports up to 3 slides at once. This react library is built using react.js, css and adheres to latest ECMAScript specs. This library is intended to be used along with react.js.

The latest version supports **touch-based swipe gestures** and **responsive layouts for mobile devices**.
You can view live demo [here](https://fancysliderdemo.netlify.app/). If you have any issues, please follow this [link](https://github.com/Bivektamu/react-slider/issues).

## Inspiration

Originally, this was a pure vanilla js module which I had developed for one of my client as per their unique requirement. They specifically wanted 3 slides carousel along with unique transition effect. Now, I have upgraded this library to have more control over carousel such as navigation buttons, transition duration, animation duration, number of slides to be displayed, e.t.c.

## ⚠️ v3 Rewrite Notes

Version 3 is a major rewrite of React FancySlider with a simplified API and improved performance.

### Breaking changes:

- Some props have been renamed or removed
- Internal architecture rewritten using modern React patterns
- IE10 support has been dropped
- Styling and layout logic has been simplified
- Dot navigation has been removed (may return in a future version)

### ✨ New in v3.1

- Touch & swipe support (mobile-friendly)
- Configurable aspect ratio for slides
- Gap control between slides

## Installation

You can still install this package and use it using below command:

```bash
npm install react-fancyslider
```

**Note**: You are to use this library along with react.js, since it is a pure react component under the hood.

## Usage

Import the Slider component in your desired react component using following code:

```javascript
import { Slider } from "react-fancyslider";
```

Then, simply use it with below code.

```javascript

const images = [imgUrl1, imgUrl2, imgUrl3] //Slider Images

<Slider
    customCss='customClass'
    slideToShow={3}
    images = {images}
    auto={true}
    timer={2000}
    transitionTime = {500}
    directionNav = {true}
    animationEasing='fancy'
    aspectRatio='3/4'
    gap={20}
/>

```

## Props || Options

Below are the options to control Slider component as per requirement:

**`slideToShow {type: number}`**: number of slides to show. Max is 3. **`Default: 1`**

**`customCss {type: string}`**: custom class name passed to slider for better control

**`images {type:[string]}`**: image links/urls for slider **`*Required`**

**`auto {type: boolean}`**: sets slider to auto slide **`Default: true`**

**`timer {type: number}`**: sets the speed of the slideshow cycling, in milliseconds **`Default: 4000 || 4s`**

**`transitionTime {type: number}`**: sets the speed of animation, in milliseconds **`Default" 500 || 0.5s`**

**`directionNav {type: boolean}`**: sets left and right arrow for navigation **`Default: false`**

**`animationEasing {type:enum [fancy | slide | fade]}`** : sets easing of animation. You can have choose between default (fancy), fade or simple slide easing **`Default: fancy`**

**`aspectRatio {type: string}`**: sets aspect ratio for slides (e.g. `"16/9"`, `"4/3"`, `"1/1"`) **`Default: "3/4"`**

**`gap {type: number}`**: sets spacing between slides in pixels **`Default: 0`**

## App Info

### Author

Bivek Jang Gurung
