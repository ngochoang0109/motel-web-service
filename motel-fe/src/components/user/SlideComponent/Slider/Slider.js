import React, { useState } from 'react';
import SliderContent from '../SliderContent/SliderContent';
import Slide from '../Slide/Slide';
import Arrow from '../Arrow/Arrow';
import Dots from '../Dots/Dots';

const Slider = (props) => {

    const [state, setState] = useState({
        activeIndex: 0,
        translate: 0,
        transition: 0.45
    })


    const { translate, transition, activeIndex } = state;

    const nextSlide = () => {
        if (activeIndex === props.slides.length - 1) {
            return setState({
                ...state,
                translate: 0,
                activeIndex: 0
            })
        }

        setState({
            ...state,
            activeIndex: activeIndex + 1,
            translate: (activeIndex + 1) * 640
        })
    }

    const prevSlide = () => {
        if (activeIndex === 0) {
            return setState({
                ...state,
                translate: (props.slides.length - 1) * 640,
                activeIndex: props.slides.length - 1
            })
        }

        setState({
            ...state,
            activeIndex: activeIndex - 1,
            translate: (activeIndex - 1) * 640
        })
    }

    return (
        <div style={{
            position: "relative",
            height: "100%",
            width: "640px",
            margin: "0 auto",
            overflow: "hidden",
        }}>
            <SliderContent
                translate={translate}
                transition={transition}
                width={640 * props.slides.length}
            >
                {props.slides.map((slide, i) => {
                    return <Slide key={slide + i} content={slide} />
                })}
            </SliderContent>
            <div>
                <Arrow direction="left" handleClick={prevSlide} />
                <Arrow direction="right" handleClick={nextSlide} />
                <Dots slides={props.slides} activeIndex={activeIndex} />
            </div>

        </div>
    )
}


export default Slider