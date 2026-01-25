import {  useMemo } from 'react'
type Props = {
    path: string,
    currIndex: number,
    index: number,
    nextIndex: number,
    prevIndex: number,
    transitionTime: number
}
const Slide = ({
    path,
    currIndex,
    index,
    nextIndex,
    prevIndex,
    transitionTime
}: Props) => {

    const css:string = useMemo(() => {
        if (index === currIndex) {
            return 'current'
        }
        else if (index === nextIndex) {
            return 'next'
        }

        else if (index === prevIndex) {
            return 'prev'
        }
        
        return 'hide'
    }, [index, currIndex, nextIndex, prevIndex])


    return (
        <img src={path} alt="" style={{transitionDuration:`${transitionTime}ms`}} className={css} />
    )
}

export default Slide