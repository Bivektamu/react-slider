import { memo, useCallback, useEffect, useRef } from 'react'
import type { DirectionNavProps } from './typesDeclaration'

const DirectionNav = memo(({
    auto,
    stopCarousel,
    playCarousel,
    transitionTime,
    setCurrIndex,
    getNextIndex,
    getPrevIndex

}: DirectionNavProps) => {
    const clickRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const restartRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const navigationHandler = useCallback((direction: string) => {
        if (auto)
            stopCarousel()
        if (clickRef.current) clearTimeout(clickRef.current)
        if (restartRef.current) clearTimeout(restartRef.current)

        clickRef.current = setTimeout(() => {
            setCurrIndex(prev => direction === 'prev' ? getPrevIndex(prev) : getNextIndex(prev))
        }, transitionTime / 2)

        if (auto)
            restartRef.current = setTimeout(() => playCarousel(), transitionTime)
    }, [auto, stopCarousel, setCurrIndex, getNextIndex, getPrevIndex, transitionTime, playCarousel])

    useEffect(() => {
        return (() => {
            if (clickRef.current) clearTimeout(clickRef.current)
            if (restartRef.current) clearTimeout(restartRef.current)

        })
    }, [])

    return (
        <>
            <button
                type='button'
                className="click_me prev"
                onClick={() => navigationHandler('prev')}
            >Prev</button>
            <button
                type='button'
                className="click_me next"
                onClick={() => navigationHandler('next')}
            >Next</button>
        </>
    )
})
export default DirectionNav