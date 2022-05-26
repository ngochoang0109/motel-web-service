
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {

    const [sortField,setSortField]=useState(props.sortField);

    const [type,setType]=useState(props.type);

    useEffect(()=>{
        if(typeof(props.type)==='undefined'){
            setType('all');
        }else{  
            setType(props.type);
        }
        if(typeof(props.sort)==='undefined'){
            setSortField('new-post');
        }else{
            setSortField(props.sort)
        }
    },[props.sort,props.type])

    const showPaging = () => {

        const arr = [];

        for (let i = 0; i < props.totalPage; i++) {
            arr.push(i);
        }

        return arr.map((item) => {
            return item===props.pageNo?<Link to={`/home/${type}/${item}/${sortField}`} className="re__pagination-number re__actived" key={item} 
                            style={{textDecoration:"none"}}>
                {item + 1}
            </Link>:<Link to={`/home/${type}/${item}/${sortField}`} className="re__pagination-number" key={item} 
                            style={{textDecoration:"none"}}>
                {item + 1}
            </Link>
        })

    }

    return (
        <div className="re__srp-paging js__srp-paging">
            <div className="re__pagination-group">
                <Link to={props.first?`/home/${type}/${props.pageNo}/${sortField}`:`/home/${type}/${props.pageNo-1}/${sortField}`} className="re__pagination-icon">
                    <i className="far fa-arrow-alt-circle-left re__icon-chevron-left--sm"></i>
                </Link>
                {showPaging()}
                <Link to={props.last?`/home/${type}/${props.pageNo}/${sortField}`:`/home/${type}/${props.pageNo+1}/${sortField}`} className="re__pagination-icon">
                    <i className="far fa-arrow-alt-circle-right re__icon-chevron-right--sm"></i>
                </Link>
            </div>
        </div>
    )
}

export default Pagination;