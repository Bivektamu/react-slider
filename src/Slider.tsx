import { useCallback, useEffect, useRef, useState, TouchEvent } from "react"
import './styles.css'
import Slide from "./Slide"
import DirectionNav from "./DirectionNav"
import type { SliderProps } from "./typesDeclaration"
import DotNav from "./DotNav"

export const Slider = ({
    slideToShow = 1,
    customCss = '',
    images,
    aspectRatio = '3/4',
    auto = true,
    timer = 4000,
    transitionTime = 500,
    directionNav = false,
    dotNav = false,
    gap = 0,
    animation = 'fancy'
}: SliderProps) => {

    const [currIndex, setCurrIndex] = useState(0)
    const [initalX, setInitialX] = useState<null | number>(null)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const clickedRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const restartRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [updatedTransitionTime, setUpdatedTransitionTime] = useState(transitionTime)

    const getNextIndex = useCallback((index: number) => (index + 1) % images.length, [images.length])


    const getForwardIndex = useCallback((currentIndex: number, forwardBy: number) => (currentIndex + forwardBy) % images.length, [images.length])

    const getPrevIndex = useCallback((index: number) => (index - 1 + images.length) % images.length, [images.length])

    const stopCarousel = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
    }, [])

    const playCarousel = useCallback(() => {
        stopCarousel()
        if (auto && images.length > 1)
            timerRef.current = setInterval(() => {
                setCurrIndex(prev => getNextIndex(prev))
            }, timer)
    }, [timer, images.length, auto, getNextIndex, stopCarousel])

    useEffect(() => {
        playCarousel();
        return (() => {
            stopCarousel()
            if (clickedRef.current) clearTimeout(clickedRef.current)
            if (restartRef.current) clearTimeout(restartRef.current)
        })
    }, [])

    const touchStartHandler = useCallback((event: TouchEvent) => {
        setInitialX(event.touches[0].pageX)
    }, [])

    const touchEndHandler = useCallback((event: TouchEvent) => {
        const deltaX = event.changedTouches[0].pageX - initalX
        if (Math.abs(deltaX) > 65) {
            if (auto)
                stopCarousel()
            if (clickedRef.current) clearTimeout(clickedRef.current)
            if (restartRef.current) clearTimeout(restartRef.current)

            if (deltaX < 0) {
                clickedRef.current = setTimeout(() => setCurrIndex(prev => getNextIndex(prev)), transitionTime / 2)
            }
            else if (deltaX > 0) {
                clickedRef.current = setTimeout(() => setCurrIndex(prev => getPrevIndex(prev)), transitionTime / 2)
            }

            if (auto)
                restartRef.current = setTimeout(() => playCarousel(), transitionTime)
        }
    }, [stopCarousel, getNextIndex, transitionTime, getPrevIndex, playCarousel, auto, initalX])

    if (!images || images.length === 0) {
        console.error('reactFancySlider: Carousel image links are not provided')
        return null
    }

    if (slideToShow > images.length) {
        console.error('reactFancySlider: Carousel images are less than slides to show')
        return null
    }

    return (
        <div
            className={`fancySlider ${animation} ${customCss}`}
            onTouchStart={touchStartHandler}
            onTouchEnd={touchEndHandler}
        >
            <div className="wrapper" style={{
                gridTemplateColumns: `repeat(${slideToShow}, 1fr)`,
                gap: `${gap}px`,
                touchAction: 'pan-y'
            }}>

                {
                    Array.from({ length: slideToShow }).map((_, index) =>
                        <div
                            className="slot"
                            key={`slot-${index}`}
                            style={{ aspectRatio: aspectRatio }}>
                            {
                                images.map((img: string, i: number) => <Slide
                                    key={i}
                                    path={img}
                                    currIndex={getForwardIndex(currIndex, index)}
                                    index={i}
                                    transitionTime={updatedTransitionTime}
                                    nextIndex={getNextIndex(getForwardIndex(currIndex, index))}
                                    prevIndex={getPrevIndex(getForwardIndex(currIndex, index))} />
                                )
                            }
                        </div>
                    )
                }

            </div>

            {
                directionNav && <DirectionNav
                    auto={auto}
                    stopCarousel={stopCarousel}
                    setCurrIndex={setCurrIndex}
                    transitionTime={updatedTransitionTime}
                    playCarousel={playCarousel}
                    getNextIndex={getNextIndex}
                    getPrevIndex={getPrevIndex}
                />
            }

            {
                dotNav && <DotNav
                    auto={auto}
                    stopCarousel={stopCarousel}
                    setCurrIndex={setCurrIndex}
                    transitionTime={updatedTransitionTime}
                    updateTransitionTime = {setUpdatedTransitionTime}
                    timer={timer}
                    playCarousel={playCarousel}
                    getNextIndex={getNextIndex}
                    getPrevIndex={getPrevIndex}
                    totalSlides={images.length}
                    currIndex={currIndex}
                />
            }

        </div>
    )
}