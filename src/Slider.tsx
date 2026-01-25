import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import './styles.css'
import Slide from "./Slide"
import DirectionNav from "./DirectionNav"
import type { SliderProps } from "./typesDeclaration"

export const Slider = ({
    slideToShow = 1,
    customCss = '',
    images,
    aspectRatio='3/4',
    auto = true,
    timer = 4000,
    transitionTime = 500,
    directionNav = false,
    gap = 0,
    animation = 'fancy'
}: SliderProps) => {

    const [currIndex, setCurrIndex] = useState(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

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
        return stopCarousel
    }, [])

    if (!images || images.length === 0) {
        console.error('reactFancySlider: Carousel image links are not provided')
        return null
    }

    if (slideToShow > images.length) {
        console.error('reactFancySlider: Carousel images are less than slides to show')
        return null
    }

    return (
        <div className={`fancySlider ${animation} ${customCss}`}>
            <div className="wrapper" style={{
                gridTemplateColumns:`repeat(${slideToShow}, 1fr)`,
                gap:`${gap}px`
            }}>

                <div className="left" style={{ 
                    aspectRatio:aspectRatio
                    }}>
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
                {
                    slideToShow >1 && <div className="center" style={{ aspectRatio:aspectRatio}}>
                        {
                            images.map((img: string, i: number) => <Slide
                                key={i}
                                path={img}
                                currIndex={getForwardIndex(currIndex, 1)}
                                index={i}
                                transitionTime={transitionTime}
                                nextIndex={getNextIndex(getForwardIndex(currIndex, 1))}
                                prevIndex={getPrevIndex(getForwardIndex(currIndex, 1))} />
                            )
                        }
                    </div>
                }

                {
                    slideToShow  > 2 && <div className="right" style={{ aspectRatio:aspectRatio}}>
                        {
                            images.map((img: string, i: number) => <Slide
                                key={i}
                                path={img}
                                currIndex={getForwardIndex(currIndex, 2)}
                                index={i}
                                transitionTime={transitionTime}
                                nextIndex={getNextIndex(getForwardIndex(currIndex, 2))}
                                prevIndex={getPrevIndex(getForwardIndex(currIndex, 2))} />
                            )
                        }
                    </div>
                }
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