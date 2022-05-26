import React from 'react';
const Slide = ({ content }) => (
    <div style={{
        backgroundImage: `url(${content})`,
        height: '500px',
        width: '100%',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: "1px solid #ddd",
        /* Gray border */
        borderRadius: "8px",
    /* Rounded border */
        padding: "5px"
    }}>

    </div>
)

export default Slide;