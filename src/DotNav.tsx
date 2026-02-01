import React, { memo, useCallback, useEffect, useRef } from 'react'
import { DotNavProps } from './typesDeclaration'

const DotNav = memo(({
    auto,
    stopCarousel,
    playCarousel,
    transitionTime,
    setCurrIndex,
    getNextIndex,
    timer,
    updateTransitionTime,
    totalSlides,
    currIndex,
    getPrevIndex
}: DotNavProps) => {

    const clickedRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const restartRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const transRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const dotClicked = useCallback(
        (index: number) => {
            if (index === currIndex) return null
            if (clickedRef.current) clearInterval(clickedRef.current)
            if (restartRef.current) clearTimeout(restartRef.current)
            if (transRef.current) clearTimeout(restartRef.current)

            const timesToRun = Math.abs(index - currIndex)

            if (auto)
                stopCarousel()

            let counter = 0
            const direction = index > currIndex ? 'right' : 'left'

            clickedRef.current = setInterval(() => {
                counter++
                setCurrIndex(prev => direction === 'right' ? getNextIndex(prev) : getPrevIndex(prev))

                if (counter === timesToRun) {
                    clearInterval(clickedRef.current)
                    transRef.current = setTimeout(()=>updateTransitionTime(transitionTime), transitionTime)
                    if (auto)
                        restartRef.current = setTimeout(() => playCarousel(), transitionTime)
                }
            }, transitionTime)
        }, [auto, currIndex, stopCarousel, playCarousel, updateTransitionTime, setCurrIndex, transitionTime, getNextIndex, getPrevIndex]
    )
    useEffect(() => {
        return (() => {
            if (clickedRef.current) clearInterval(clickedRef.current)
            if (restartRef.current) clearTimeout(restartRef.current)
            if (transRef.current) clearTimeout(transRef.current)
        })
    }, [])
    return (
        <div className="dotWrapper">
            <ul>
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <li key={`dot-${index}`}>
                        <button
                            className={`${index === currIndex ? 'active' : ''}`}
                            onClick={() => dotClicked(index)}
                        >

                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
)
export default DotNav