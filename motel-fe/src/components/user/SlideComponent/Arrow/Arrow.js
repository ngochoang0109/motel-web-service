import rightArrow from './../../../../assets/images/right-arrow.svg';
import leftArrow from './../../../../assets/images/left-arrow.svg';

const Arrow = ({ direction, handleClick }) => {
    const tranX = `${direction === 'left' ? '-2' : '2'}px`;
    return (
        <div onClick={handleClick}
            style={{
                display: "flex",
                position: "absolute",
                top: "50%",
                right:`${direction === 'right' ? "25px" : null}`,
                left:`${direction === 'left' ? "25px" : null}`,
                height: "50px",
                width: "50px",
                justifyContent: "center",
                background: "white",
                borderRadius: "50%",
                cursor: "pointer",
                alignItems: "center",
                transition: "transform 0,1s ease-out",
                "&:hover": {
                    transform: "scale(1, 1)"
                }
            }}>
            {direction === 'right' ? <img src={rightArrow}
                style={{
                    transform: `translateX(${tranX})`,
                    "&:focus": {
                        outline: 0
                    }
                }}
                alt="" /> : <img src={leftArrow} style={{
                    transform: `translateX(${tranX})`,
                    "&:focus": {
                        outline: 0
                    }
                }}
                    alt="" />}
        </div>
    )
}

export default Arrow;