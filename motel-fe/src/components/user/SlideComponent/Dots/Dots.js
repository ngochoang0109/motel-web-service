const Dot = ({ active }) => (
    <span
        style={{
            padding: "10px",
            marginRight: "5px",
            cursor: "pointer",
            borderRadius: "50%",
            background: `${active ? "black" : "white"}`
        }}
    />
)

const Dots = ({ slides, activeIndex }) => {
    return (
        <div style={{
            position: "absolute",
            bottom: "25px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {slides.map((slide, i) => (
                <Dot key={slide} active={activeIndex === i} />
            ))}
        </div>
    )

}

export default Dots;