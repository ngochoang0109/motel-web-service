

const SliderContent = (props) => {
  return (
    <div style={{
      transform: `translate(-${props.translate}px, 0px)`,
      transition: `transform ${props.transition}s ease-out`,
      height: '100%',
      width: `${props.width}px`,
      display: "flex"
    }}>
    {props.children}
    </div >)
}

export default SliderContent