import formatDate from './../../../utils/formatDate';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import vndFormat from '../../../utils/vndFormat';
import { useRouteMatch } from 'react-router-dom';
const PostCard = (props) => {

    const post = props.post;

    const {path } = useRouteMatch();

    const [time, setTime] = useState("");

    const [address,setAddress] =useState("");


    useEffect(() => {
        
        function difference(date1, date2) {
            const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
            const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
            let day = 1000 * 60 * 60 * 24;
            return (date2utc - date1utc) / day
        }

        const date1 = new Date(post.createdDate),
            date2 = new Date(),
            time_difference = difference(date1, date2);

        if (time_difference > 4) {
            setTime(formatDate(post.createdDate));
        } else {
            setTime(moment(formatDate(post.createdDate), "DD/MM/YYYY").startOf('hour').fromNow());
        }

        const arrAddress=post.address.split("-");
        setAddress(`${arrAddress[arrAddress.length - 2].trim()},${arrAddress[arrAddress.length - 1].trim().slice(0, 13)}...`)

    }, [])

    return (
        <>
            <div className="js__card js__card-full-web pr-container re__card-full re__card-full-no-label vip5 re__vip-5">
                <Link className="js__product-link-for-product-id disabled-link'"
                    to={`${path.replace("/:pageNo","")}/detail-post/${post.id}`} >
                    <div className="re__card-image">
                        <img alt=""
                            src={post.image.fileName} />
                    </div>
                    <div className="re__card-info">
                        <div className="re__card-info-content">
                            <h3 className="re__card-title">
                                <span className="vipFive pr-title js__card-title">
                                    {post.title}
                                </span>
                            </h3>
                            <div className="re__card-config">
                                <span className="re__card-config-price">{post.price ? vndFormat(post.price.toString()) : null}/tháng</span>
                                <span className="re__card-config-dot">·</span><span className="re__card-config-area">{post.areage} m²</span>
                                <span className="re__card-config-dot">·</span>
                                <div style={{ clear: 'left' }} />
                            </div>
                            <div className="re__card-location">
                                {address}
                            </div>
                            <div style={{ clear: 'left' }} />
                            <div className="re__card-description js__card-description">
                                {`${post.content.slice(0,202)}...`}
                            </div>
                            <div className="re__card-contact">
                                <div className="re__card-published-info">
                                    <span className="re__card-published-info-published-at">
                                        {time}
                                    </span>
                                </div>
                                <div className="re__card-contact-button">
                                    <span className="re__btn re__btn-cyan-solid--sm re__btn-icon-left--sm js__card-phone-btn">
                                        <i className="re__icon-phone-call fas fa-phone-volume" />
                                        <span>Liên hệ: {post.phone}</span>
                                    </span>
                                </div>
                                <div style={{ clear: 'left' }} />
                            </div>
                        </div>
                    </div>
                    <div style={{ clear: 'left' }} />
                </Link>
            </div>
        </>
    )
}

export default PostCard;