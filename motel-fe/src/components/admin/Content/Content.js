import './Content.css'

const Content = (props) => {
    return (
    <div className="area">
        {props.children}
    </div>)
}

export default Content;