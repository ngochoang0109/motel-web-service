import './Modal.css';

const Modal = (props) => {

    if (!props.show) {
        return null;
    }


    console.log("modal re-render")

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">{props.content}</div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className='button btn-close'>Đóng</button>
                </div>
            </div>
        </div>)
}

export default Modal;