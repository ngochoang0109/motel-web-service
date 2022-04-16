import formatDate from '../../../../../utils/fomatDate';
import './PostCard.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
const PostCard = (props) => {
    const post = props.post;
    const address = post.address.split("/");

    const [time,setTime]=useState("");
    

    useEffect(()=>{
        function difference(date1, date2) {
            const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
            const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
            let day = 1000 * 60 * 60 * 24;
            return (date2utc - date1utc) / day
        }
    
        const date1 = new Date(post.createdDate),
        date2 = new Date(),
        time_difference = difference(date1, date2);

        if(time_difference>4){
            setTime(formatDate(post.createdDate));
        }else{
            setTime(moment(formatDate(post.createdDate), "DD/MM/YYYY").startOf('hour').fromNow());
        }
    },[])

    return (
        <>
            <div className={`projcard ${props.color}`}>
                <div className="projcard-innerbox">
                    <img className="projcard-img" src={post.image.fileName}></img>
                    <div className="projcard-textbox">
                        <div className="projcard-title">{`${post.title.slice(0, 30)}...`}</div>
                        <div className="projcard-subtitle">{`${post.brief.slice(0, 50)}...`}</div>
                        <div className="projcard-bar"></div>
                        <div className="projcard-description">{`${post.content.slice(0, 120)}...`}</div>
                        <div className="projcard-tagbox">
                            <span className="projcard-tag">{`${post.price}/Tháng`}</span>
                            <span className="projcard-tag">{post.areage}m<sup>2</sup></span>
                            <span className="projcard-tag">{`${address[address.length - 2]}/${address[address.length - 1].slice(0, 17)}...`}</span>
                            <span className="projcard-tag">{post.fullName}</span>
                            <span className="projcard-tag">{time}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostCard;