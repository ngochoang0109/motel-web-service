import './Main.css';

const Main=(props)=>{
    return (<div className="container-content">
        {props.children}
    </div>)
};


export default Main;