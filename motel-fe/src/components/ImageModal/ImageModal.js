import './ImageModal.css';

const ImageModal = () => {
    return (<div id="show_image_popup">
        <div class="close-btn-area">
            <button id="close-btn">X</button>
        </div>
        <div id="image-show-area">
            <img id="large-image" src="" alt=""></img>
        </div>
    </div>
    )
}

export default ImageModal;