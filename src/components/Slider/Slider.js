import "./Slider.css";

import React, { useEffect, useState, useRef } from "react";

const Slider = (props) => {
  const sRef = useRef(null);
  const [stop, setStop] = useState(false);
  const [images, setImages] = useState(props.images ? props.images : []);
  const [counter, setCounter] = useState(0);
  const [auto, setAuto] = useState(props?.auto);
  const [animating, setAnimating] = useState(false);

  const touch = props.touch? props.touch : true;
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const timer = props.timer ? props.timer : 4000;
  const gap = props.gap ? props.gap : 50;
  const directionNav = props?.directionNav;
  const slideToShow = props.slideToShow ? props.slideToShow : 3;
  const transitionTime = props.transitionTime ? props.transitionTime : 500;
  const controlNav = props.controlNav ? props.controlNav : false;
  const animationEasing = props?.animationEasing;
  const cs = props.className ? props.className + " fancySlider" : "fancySlider";

  const [wrapper, setWrapper] = useState();

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    if (images) {
      initializeSlider();
    }
  }, [images, slideToShow]);

  useEffect(() => {
    if (auto || (!directionNav && !controlNav)) {
      let c = counter;
      c = c + 1;

      const sliderInterval = setInterval(() => {
        sliderLogic(c);
      }, timer);

      if (stop) {
        clearInterval(sliderInterval);
      }

      return () => clearInterval(sliderInterval);
    }
  }, [stop, timer, counter, animating, auto]);

  useEffect(() => {
    if (controlNav) {
      let c = counter;
      setTimeout(() => {
        let grabController = sRef.current.querySelector(
          ".controlWrapper > ul > li > button.active"
        );
        if (grabController) {
          grabController.classList.remove("active");
        }

        grabController = sRef.current.querySelector(
          `.controlWrapper > ul > li:nth-child(${c + 1})`
        );

        grabController.firstChild.classList.add("active");
      }, transitionTime);
    }
  }, [controlNav, counter]);

  useEffect(() => {
    if (windowSize < 760 && slideToShow > 1) {
      let divs = sRef.current.querySelectorAll(".wrapper > div");
      if (divs.length > 0) {
        divs.forEach((ele) => {
          if (ele.className === "left") {
            ele.style.width = "100%";
          } else {
            ele.style.display = "none";
          }
        });
      }
    } else {
      let divs = sRef.current.querySelectorAll(".wrapper > div");

      if (slideToShow > 2) {
        if (divs.length > 0) {
          divs.forEach((ele) => {
            ele.style.display = "block";
            ele.style.width = `calc(33.33% - ${gap / 3}px)`;
          });
        }
      } else {
        if (divs.length > 0) {
          divs.forEach((ele) => {
            if (ele.className === "right") {
              ele.style.width = "none";
            } else {
              ele.style.display = "block";
              ele.style.width = `calc(50% - ${gap / 2}px)`;
            }
          });
        }
      }
    }
  }, [windowSize]);

  useEffect(() => {
    if(x1==x2) {
      return
    }
    setStop(true);
    let c = counter;
    if (x1 > x2) {
      c = c + 1;
    } else if (x1 < x2) {
        sRef.current.classList.add("reverse");
        c = c - 1;
    }

    sliderLogic(c);

    setTimeout(() => {
      x1 < x2 && sRef.current.classList.remove("reverse");
      setStop(false);
    }, transitionTime);

  }, [swiping]);

  ////////////////////////////////////////////////
  const screenTouched = (e) => {
    setX1(e.touches[0].screenX);
    setX2(e.touches[0].screenX);
  };

  const screenSwiped = (e) => {
    setX2(e.touches[0].screenX);
  };

  const screenTouchEnd = () => {
    setSwiping((prevSwiping) => !prevSwiping);
  };

  ////////////////////////////////////////////////
  function initializeSlider() {
    let c = counter;

    switch (animationEasing) {
      case "slide":
        sRef.current.classList.add("slide");
        break;

      case "fade":
        sRef.current.classList.add("fade");
        break;

      default:
        break;
    }

    let leftStyle, centerStyle, rightStyle;
    const tempS = window.innerWidth < 761 ? 1 : slideToShow;
    switch (tempS) {
      case 1:
        leftStyle = { width: "100%", filter: "blur(0)" };
        centerStyle = { display: "none" };
        rightStyle = { display: "none" };
        break;

      case 2:
        leftStyle = { width: `calc(50% - ${gap / 2}px)`, filter: "blur(0)" };
        centerStyle = { width: `calc(50% - ${gap / 2}px)`, filter: "blur(0)" };
        rightStyle = { display: "none" };
        if (!directionNav) {
          setAuto(true);
        }
        break;

      default:
        leftStyle = { width: `calc(33.333% - ${gap / 3}px)` };
        centerStyle = {
          width: `calc(33.333% - ${gap / 3}px)`,
          filter: "blur(0)",
        };
        rightStyle = { width: `calc(33.333% - ${gap / 3}px)` };
        break;
    }

    let lS, center, rightSide;

    const newImgs = images;

    if (touch) {
      lS = (
        <div
          onTouchStart={(e) => screenTouched(e)}
          onTouchMove={(e) => screenSwiped(e)}
          onTouchEnd={() => screenTouchEnd()}
          className="left"
          style={leftStyle}
        >
          <img src={newImgs[c]} className="current" alt="img" />
          <img src={newImgs[c + 1]} className="next" alt="img" />
        </div>
      );
    } else {
      lS = (
        <div className="left" style={leftStyle}>
          <img src={newImgs[c]} className="current" alt="img" />
          <img src={newImgs[c + 1]} className="next" alt="img" />
        </div>
      );
    }

    center = (
      <div className="center" style={centerStyle}>
        <img src={newImgs[c + 1]} className="current" alt="img" />
        <img src={newImgs[c + 2]} className="next" alt="img" />
      </div>
    );

    rightSide = (
      <div className="right" style={rightStyle}>
        <img src={newImgs[c + 2]} className="current" alt="img" />
        <img src={newImgs[c + 3]} className="next" alt="img" />
      </div>
    );

    const wrap = (
      <div className="wrapper">
        {lS}
        {center}
        {rightSide}
      </div>
    );

    setWrapper(wrap);

    setImages(newImgs);

    if (controlNav) {
      let grabController = document.querySelector(
        ".controlWrapper > ul > li:first-child > button"
      );
      grabController.classList.add("active");
    }
  }
  ////////////////////////////////////////////////
  const sliderLogic = (c) => {
    if (animating) {
      return;
    }

    setAnimating(true);

    let aa, b;

    aa = c + 1;
    b = aa + 1;

    if (c === images.length - 2) {
      b = 0;
    } else if (c === images.length - 1) {
      aa = 0;
      b = 1;
    } else if (c > images.length - 1) {
      c = 0;

      aa = c + 1;
      b = aa + 1;
    } else if (c < 0) {
      c = images.length - 1;
      aa = 0;
      b = aa + 1;
    }

    setCounter(c);
    let leftSide = sRef.current.querySelector(".left"),
      rightSide = sRef.current.querySelector(".right"),
      center = sRef.current.querySelector(".center"),
      nextSlide;

    leftSide.childNodes.forEach((element) => {
      if (element.className === "next") {
        nextSlide = element;
      }
    });
    nextSlide.setAttribute("src", images[c]);

    center.childNodes.forEach((element) => {
      if (element.className === "next") {
        nextSlide = element;
      }
    });

    nextSlide.setAttribute("src", images[aa]);

    rightSide.childNodes.forEach((element) => {
      if (element.className === "next") {
        nextSlide = element;
      }
    });

    nextSlide.setAttribute("src", images[b]);

    let next = sRef.current.querySelectorAll(".next"),
      current = sRef.current.querySelectorAll(".current");

    requestAnimationFrame(() => {
      setTimeout(() => {
        next.forEach((item) => {
          item.classList.add("show");
        });

        current.forEach((item) => {
          item.classList.add("hide");
        });
        let imgs = sRef.current.querySelectorAll("img");
        imgs.forEach((ele) => {
          ele.style.transitionDuration = "0s";
        });

        let show = sRef.current.querySelectorAll("img.show");
        show.forEach((ele) => {
          ele.style.transitionDuration = `${transitionTime / 1000}s`;
        });

        let hide = sRef.current.querySelectorAll("img.hide");
        hide.forEach((ele) => {
          ele.style.transitionDuration = `${transitionTime / 1000}s`;
        });
      }, 1);

      setTimeout(() => {
        current.forEach((item) => {
          item.classList.add("next");
        });

        let newNext = sRef.current.querySelectorAll(".hide.next");
        newNext.forEach((item) => {
          item.classList.remove("hide");
          item.classList.remove("current");
        });

        let newCurrent = sRef.current.querySelectorAll(".show.next");
        newCurrent.forEach((item) => {
          item.classList.add("current");
          item.classList.remove("show");
          item.classList.remove("next");
        });

        let imgs = sRef.current.querySelectorAll("img");
        imgs.forEach((ele) => {
          ele.style.transitionDuration = "0s";
        });

        let show = sRef.current.querySelectorAll("img.show");
        show.forEach((ele) => {
          ele.style.transitionDuration = `${transitionTime / 1000}s`;
        });

        let hide = sRef.current.querySelectorAll("img.hide");
        hide.forEach((ele) => {
          ele.style.transitionDuration = `${transitionTime / 1000}s`;
        });
        setAnimating(false);
      }, transitionTime * 2);
    });
  };

  ////////////////////////////////////////////////
  const onDirectionBtnClick = (e) => {
    setStop(true);
    let c = counter;

    const classes = e.target.classList;

    classes.forEach((element) => {
      if (element === "right") {
        sRef.current.classList.remove("reverse");
        c = c + 1;
      } else if (element === "left") {
        sRef.current.classList.add("reverse");
        c = c - 1;
      }
    });

    sliderLogic(c);

    setTimeout(() => {
      sRef.current.classList.remove("reverse");
      setStop(false);
    }, transitionTime);
  };

  const controllerClicked = (e) => {
    setStop(true);

    const parentNode = e.target.parentNode.parentNode;
    const index = [].indexOf.call(parentNode.children, e.target.parentNode);

    const c = counter;

    if (index < c) {
      sRef.current.classList.add("reverse");
    }

    sliderLogic(index);

    setTimeout(() => {
      sRef.current.classList.remove("reverse");
      setStop(false);
    }, transitionTime);
  };

  const directionNavWrapper = (
    <>
      <button
        className="click_me left"
        onClick={(e) => onDirectionBtnClick(e)}
      ></button>
      <button
        className="click_me right"
        onClick={(e) => onDirectionBtnClick(e)}
      ></button>
    </>
  );

  const controlNavWrapper = (
    <div className="controlWrapper">
      <ul>
        {images.map((item, index) => (
          <li key={index}>
            {index == 0 ? (
              <button
                className="active"
                onClick={(e) => controllerClicked(e)}
              ></button>
            ) : (
              <button onClick={(e) => controllerClicked(e)}></button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  window.addEventListener("resize", function () {
    setWindowSize(window.innerWidth);
  });

  return (
    <div className={cs} ref={sRef}>
      {wrapper && wrapper}
      {directionNav && directionNavWrapper}
      {controlNav && controlNavWrapper}
    </div>
  );
};

export default Slider;
