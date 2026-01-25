import { useEffect, useRef, useState, type MouseEvent } from "react"
import './styles.css'
import Slide from "./Slide"
interface SliderProps {
    className: string,
    touch: boolean,
    slideToShow: number,
    images: string[],
    auto: boolean,
    timer: number,
    transitionTime: number,
    directionNav: boolean
    controlNav: boolean
    gap: number
    animationEasing: string
}

export const Slider = ({
    className = '',
    slideToShow = 1,
    images,
    auto = true,
    timer = 4000,
    transitionTime = 500,
    directionNav = false,
    animationEasing = 'slide'
}: SliderProps) => {

    const [currIndex, setCurrIndex] = useState(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const clickRef = useRef<ReturnType<typeof setTimeout> | null>(null)


    const getNextIndex = (index: number) => (index + 1) % images.length


    const getPrevIndex = (index: number) => (index - 1 + images.length) % images.length
    // const getDesiredIndex = (currentIndex: number, desiredIndexfactor: number, order = '+') => {
    //     const desiredIndex = order === '+' ? (currIndex + desiredIndexfactor) % images.length : (currIndex - desiredIndexfactor + images.length) % images.length
    //     return desiredIndex
    // }


    useEffect(() => {
        if (auto && images.length > 1 && timer) {
            if (!timerRef.current)
                timerRef.current = setInterval(() => {
                    console.log('asdf')
                    setCurrIndex(prev => getNextIndex(prev))
                }, timer)
        }

        return (() => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        })
    }, [auto, images, getNextIndex, timer])


    const playSlider = () => {
        if (timerRef.current) return null
        timerRef.current = setInterval(() => {
            setCurrIndex(prev => getNextIndex(prev))
        }, timer)
    }

    const stopSlide = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }
    if (!images || images.length === 0) {
        console.error('reactFancySlider: Carousel image links are not provided')
        return null
    }
    else if (slideToShow > images.length) {
        console.error('reactFancySlider: slides to show is greater than carousel images provided')
        return null
    }

    const navigationHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const isItNext = event.currentTarget.className.includes('next')
        if (auto)
            stopSlide()
        if (clickRef.current) {
            clearTimeout(clickRef.current)
            clickRef.current = null
        }

        clickRef.current = setTimeout(() => {
            if (isItNext)
                setCurrIndex(prev => getNextIndex(prev))
            else
                setCurrIndex(prev => getPrevIndex(prev))
        }, transitionTime / 2)

        if (auto)
            setTimeout(() => playSlider(), transitionTime)
    }

    return (
        <div>
            <h1>Slider</h1>
            <div className={`fancySlider ${animationEasing} ${className}`}>
                <div className="wrapper">
                    <img src={images[0]} className="heightKeeper" />
                    <div className="center">
                        {
                            images.map((img: string, i: number) => <Slide
                                key={i}
                                path={img}
                                currIndex={currIndex}
                                index={i}
                                transitionTime={transitionTime}
                                nextIndex={getNextIndex(currIndex)}
                                prevIndex={getPrevIndex(currIndex)} />
                            )
                        }
                    </div>
                </div>

                {
                    directionNav && <>
                        <button className="click_me prev" onClick={navigationHandler}>Prev</button>
                        <button className="click_me next" onClick={navigationHandler}>Next</button>
                    </>
                }


                <button type="button" onClick={() => stopSlide()}>Stop</button>
                <button type="button" onClick={() => playSlider()}>Play</button>
            </div>

        </div>
    )
}