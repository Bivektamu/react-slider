export interface SliderProps {
    slideToShow?: number,
    aspectRatio?: string;
    customCss?: string,
    images: string[],
    auto?: boolean,
    timer?: number,
    transitionTime?: number,
    gap?: number,
    directionNav?: boolean,
    dotNav?: boolean,
    animation?: string
}

export interface SlideProps {
    path: string,
    currIndex: number,
    index: number,
    nextIndex: number,
    prevIndex: number,
    transitionTime: number
}

export interface DirectionNavProps {
    auto: boolean,
    stopCarousel: () => void,
    playCarousel: () => void,
    getNextIndex: (index: number) => number,
    getPrevIndex: (index: number) => number,
    transitionTime: number,
    setCurrIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface DotNavProps {
    auto: boolean,
    stopCarousel: () => void,
    playCarousel: () => void,
    getNextIndex: (index: number) => number,
    getPrevIndex: (index: number) => number,
    transitionTime: number,
    currIndex: number,
    totalSlides: number,
    timer: number,
    setCurrIndex: React.Dispatch<React.SetStateAction<number>>,
    updateTransitionTime:React.Dispatch<React.SetStateAction<number>>
}