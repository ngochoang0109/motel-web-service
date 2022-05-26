import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActionGuest } from "../../../actions/guest/postAction";
import { LocationDefault } from "../../../constants/LocationDefault";
import MapContainer from "../../Map/MapContainer";
import Comments from "../Comments/Comments";
import NewPost from "../NewPost/NewPost";
import RelatePost from "../RelatePost/RelatePost";
import Slider from "../SlideComponent/Slider/Slider";
import { useParams } from 'react-router-dom';
import vndFormat from "../../../utils/vndFormat";
import formatDate from "../../../utils/formatDate";
import { convertTypePostUtils } from "../../../utils/convertTypePostUtils";
import postConstant from "../../../constants/postConstant";

const DetailPost = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    const postDetail = useSelector(state => state.postUser);

    const price = vndFormat(postDetail.accommodationDto.price.toString());

    const date = formatDate(postDetail.postDto.createDate);

    const type = convertTypePostUtils.getNameOfType(postDetail.postDto.type);

    const address = postDetail.accommodationDto.address.split("-");

    const strAdd=`${address[address.length - 2]}-${address[address.length - 1]}`;

    const images = postDetail.imageDtos.map((item) => {
        return item.fileName;
    })

    const showExtensions = () => {
        let result = '';
        if (postDetail.accommodationDto.airConditioner) {
            result = `${result}Điều hòa, `;
        }
        if (postDetail.accommodationDto.fridge) {
            result = `${result}Tủ lạnh, `;
        }
        if (postDetail.accommodationDto.furniture) {
            result = `${result}Nội thất, `;
        }
        if (postDetail.accommodationDto.heater) {
            result = `${result}Máy nước nóng, `;
        }
        if (postDetail.accommodationDto.internet) {
            result = `${result}Internet, `;
        }
        if (postDetail.accommodationDto.airConditioner) {
            result = `${result}Chỗ đỗ xe, `;
        }
        return `${result.slice(0, -2)}.`;
    }

    const showMoreInfor = () => {
        if (type === postConstant.NHA_NGUYEN_CAN_TYPE) {
            return <>
                <tr>
                    <td className="name">Số phòng ngủ</td>
                    <td>{postDetail.accommodationDto.bedroom}</td>
                </tr>
                <tr>
                    <td className="name">Số phòng vệ sinh</td>
                    <td>{postDetail.accommodationDto.toilet}</td>
                </tr>
            </>
        }
        if (type === postConstant.CAN_HO_TYPE) {
            return <>
                <tr>
                    <td className="name">Tòa nhà</td>
                    <td>{postDetail.accommodationDto.tower}</td>
                </tr>
                <tr>
                    <td className="name">Tầng số</td>
                    <td>{postDetail.accommodationDto.floor}</td>
                </tr>
                <tr>
                    <td className="name">Số phòng ngủ</td>
                    <td>{postDetail.accommodationDto.bedroom}</td>
                </tr>
                <tr>
                    <td className="name">Số phòng vệ sinh</td>
                    <td>{postDetail.accommodationDto.toilet}</td>
                </tr>
            </>
        }
    }

    useEffect(() => {
        dispatch(postActionGuest.getPostDetailById(id))
    }, [id])


    return (
        <div className="col-layout">
            <div className='col-one'>
                <Slider slides={images} >
                </Slider>
                <div>
                    <h1 className="AdDecription_adTitle__2I0VE bgc" itemProp="name">{postDetail.postDto.title}</h1>
                </div>
                <div className="post-attributes bgc">
                    <div className="item price">
                        <div>
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                        <span style={{ color: "#16c784", fontWeight: "bold", fontSize: "1.5rem" }}>{price}/tháng</span>
                    </div>
                    <div className="item acreage">
                        <div>
                            <i className="fas fa-layer-group"></i>
                        </div>
                        <span> {postDetail.accommodationDto.acreage}m<sup>2</sup></span>
                    </div>
                    <div className="item published">
                        <div>
                            <i className="far fa-clock"></i>
                        </div>
                        <span title="Thứ 6, 09:24 20/05/2022">{date}</span>
                    </div>
                </div>
                <div className='post-address bgc'>
                    <i className="fas fa-map-marker-alt"></i>
                    <span className='text'>{postDetail.accommodationDto.address}</span>
                </div>
                <div className='mb-1rem bgc'>
                    <p className='brief-detail-post text'>
                        {postDetail.postDto.brief}
                    </p>
                    <p className='content-detail-post text'>
                        {postDetail.postDto.content}
                    </p>
                </div>

                <section className="section post-overview">
                    <div className="section-header">
                        <h3 className="section-title">Đặc điểm tin đăng</h3>
                    </div>
                    <div className="section-content">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td className="name">Loại tin</td>
                                    <td>{type}</td>
                                </tr>
                                <tr>
                                    <td className="name">Tiền cọc</td>
                                    <td>{postDetail.accommodationDto.deposit ? vndFormat(postDetail.accommodationDto.deposit.toString()) : null}</td>
                                </tr>
                                <tr>
                                    <td className="name">Ngày đăng</td>
                                    <td><time title="Thứ 6, 09:24 20/05/2022">{date}</time></td>
                                </tr>
                                <tr>
                                    <td className="name">Ngày hết hạn</td>
                                    <td><time title="Thứ 6, 09:24 27/05/2022">Chưa rõ</time></td>
                                </tr>
                                <tr>
                                    <td className="name">Tiện ích</td>
                                    <td>{showExtensions()}</td>
                                </tr>
                                {showMoreInfor()}
                                <tr>
                                    <td className="name">Địa chỉ chính xác</td>
                                    <td>{`${postDetail.accommodationDto.x}, ${postDetail.accommodationDto.y}`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <Comments></Comments>
            </div>
            <div className='col-two'>
                <div className='author-aside'>
                    <figure className="author-avatar">
                        <img src="https://phongtro123.com/images/default-user.png" alt=''></img>
                    </figure>
                    <span className="author-name">{postDetail.userDto.fullName}</span>
                    <a className="btn-phone author-phone" rel="nofollow" href="#/"><i></i> {postDetail.userDto.phone}</a>
                </div>
                <MapContainer location={LocationDefault}
                    zoomLevel={18}
                    address={{
                        provinceName: '',
                        districtName: '',
                        wardName: '',
                        houseAndStreet: ''
                    }}
                    height={16.8}>
                </MapContainer>
                <NewPost id={id}></NewPost>
                <RelatePost address={strAdd} 
                            type={postDetail.postDto.type}
                            id={id}></RelatePost>
            </div>
        </div>)
}

export default DetailPost;