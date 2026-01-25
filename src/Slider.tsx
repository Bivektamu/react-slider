import { useCallback, useEffect, useRef, useState } from "react"
import './styles.css'
import Slide from "./Slide"
import DirectionNav from "./DirectionNav"
import type { SliderProps } from "./typesDeclaration"

export const Slider = ({
    customCss = '',
    slideToShow = 1,
    images,
    auto = true,
    timer = 4000,
    transitionTime = 500,
    directionNav = false,
    animation = 'fancy'
}: SliderProps) => {

    const [currIndex, setCurrIndex] = useState(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)


    const getNextIndex = useCallback((index: number) => (index + 1) % images.length, [images.length])


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
        return stopCarousel
    }, [])

    if (!images || images.length === 0) {
        console.error('reactFancySlider: Carousel image links are not provided')
        return null
    }
    else if (slideToShow > images.length) {
        console.error('reactFancySlider: slides to show is greater than carousel images provided')
        return null
    }

    return (
        <div className={`fancySlider ${animation} ${customCss}`}>
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
                directionNav && <DirectionNav
                    auto={auto}
                    stopCarousel={stopCarousel}
                    setCurrIndex={setCurrIndex}
                    transitionTime={transitionTime}
                    playCarousel={playCarousel}
                    getNextIndex={getNextIndex}
                    getPrevIndex={getPrevIndex}
                />
            }
        
        </div>
    )
}