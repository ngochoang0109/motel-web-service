import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActionGuest } from "../../../actions/guest/postAction";
import { Link } from "react-router-dom";
import vndFormat from "../../../utils/vndFormat";
import formatDate from "../../../utils/formatDate";
import moment from 'moment';

const RelatePost = (props) => {

    const dispatch = useDispatch();

    const relatedPosts = useSelector(state => state.relatedPosts);

    console.log(relatedPosts)

    useEffect(() => {
        if (typeof (props.address) !== undefined &&
            typeof (props.type) !== undefined &&
            typeof (props.id) !== undefined) {
            dispatch(postActionGuest.getRelatedPosts(props.address, props.type, props.id));
        }
    }, [props.address, props.type, props.id])

    const showData = () => {
        if (relatedPosts.length !== 0) {
            return relatedPosts.map((item) => {
                let time="";
                function difference(date1, date2) {
                    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
                    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
                    let day = 1000 * 60 * 60 * 24;
                    return (date2utc - date1utc) / day
                }
            
                const date1 = new Date(item.createdDate),
                date2 = new Date(),
                time_difference = difference(date1, date2);
        
                if(time_difference>4){
                    time=(formatDate(item.createdDate));
                }else{
                    time=(moment(formatDate(item.createdDate), "DD/MM/YYYY").startOf('hour').fromNow());
                }
                return <li className="post-item clearfix normal" key={item.id}>
                    <Link to={`/home/detail-post/${item.id}`}>
                        <figure><img className="lazy_done"
                            src={item.image.fileName}
                            alt=""
                            height={100} width={100}
                            layout="responsive"
                            data-loaded="true" /></figure>
                        <div className="post-meta"><span className="post-title" style={{ color: '#E13427' }}>
                            <span className="star star-4" />{item.title}</span>
                            <span className="post-price">{item.price ? vndFormat(item.price.toString()) : null}/tháng</span>
                            <time className="post-time" title="Thứ 6, 15:39 20/05/2022">{time}</time>
                        </div>
                    </Link>
                </li>;
            })
        }

    }

    return (<section className='section section-aside-tinmoidang'>
        <div className="section-header">
            <span className="section-title">Bài viết liên quan</span>
        </div>
        <ul className="post-listing aside clearfix">
            {showData()}
        </ul>
    </section>)
}

export default RelatePost;