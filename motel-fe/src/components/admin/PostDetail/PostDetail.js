import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postAction } from "../../../actions/postAction";
import formatDate from "../../../utils/formatDate";
import MapContainer from "../../Map/MapContainer";
import './PostDetail.css';
import vndFormat from './../../../utils/vndFormat';
import { convertTypePostUtils } from "../../../utils/convertTypePostUtils";
import { useHistory } from "react-router-dom";

const PostDetail = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const history=useHistory();

    const post = useSelector(state => state.postAdmin);

    console.log(post);

    useEffect(() => {
        dispatch(postAction.getPostWaitingDetailById(id));
    }, [])

    const date = formatDate(post.postDto.createDate);

    const price = vndFormat(post.accommodationDto.price.toString());

    const type = convertTypePostUtils.getNameOfType(post.postDto.type);


    const showExtensions = () => {
        let result = '';
        if (post.accommodationDto.airConditioner) {
            result = `${result}Điều hòa, `;
        }
        if (post.accommodationDto.fridge) {
            result = `${result}Tủ lạnh, `;
        }
        if (post.accommodationDto.furniture) {
            result = `${result}Nội thất, `;
        }
        if (post.accommodationDto.heater) {
            result = `${result}Máy nước nóng, `;
        }
        if (post.accommodationDto.internet) {
            result = `${result}internet, `;
        }
        if (post.accommodationDto.airConditioner) {
            result = `${result}Chỗ đỗ xe, `;
        }
        return result;
    }

    const showImage = () => {
        return post.imageDtos.map((item, index) => {
            return <img src={item.fileName} alt="" key={index}></img>
        })
    }

    const showVideo = () => {
        return post.videoDtos.map((item, index) => {
            return <video key={index}>
                <source src={item.source} type="video/mp4" />
            </video>
        })
    }

    const handlerLocationSelect = () => {
        return;
    }

    const onHandlerApprove=(event)=>{
        const status= event.target.name;
        console.log(typeof(status));
        dispatch(postAction.updateStatusPost(id, status));
        history.goBack();
    }


    return (
        <div className="content">
            <div className="header-post">
                <h3>{post.postDto.title}</h3>
            </div>
            <div className="content-post">
                <div className="row">
                    <div className="information-detail">
                        <p className="label-post">Người đăng:</p>
                        <p className="data-label">{post.userDto.fullName}</p>
                    </div>
                    <div className="information-detail">
                        <p className="label-post">Liên lạc:</p>
                        <p className="data-label">{post.userDto.phone}</p>
                    </div>
                    <div className="information-detail">
                        <p className="label-post">Ngày đăng:</p>
                        <p className="data-label">{date}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="information-detail">
                        <p className="label-post">Loại phòng:</p>
                        <p className="data-label">{type}</p>
                    </div>
                    <div className="information-detail">
                        <p className="label-post">Giá thuê:</p>
                        <p className="data-label">{price} vnd/tháng</p>
                    </div>
                    <div className="information-detail">
                        <p className="label-post">Diện tích:</p>
                        <p className="data-label">{post.accommodationDto.acreage} m<sup className="data-label">2</sup></p>
                    </div>
                </div>

                <div className="information-detail-address">
                    <p className="label-post">Địa chỉ:</p>
                    <p className="data-label">{post.accommodationDto.address}</p>
                </div>

                <div className='map-block'>

                    <MapContainer
                        location={{
                            address: post.accommodationDto.address,
                            lat: Number(post.accommodationDto.x),
                            lng: Number(post.accommodationDto.y)
                        }}
                        zoomLevel={18}
                        handlerLocation={handlerLocationSelect}
                        address={{
                            provinceName: '',
                            districtName: '',
                            wardName: '',
                            houseAndStreet: ''
                        }}>
                    </MapContainer>
                </div>
                <div className="information-detail-address">
                    <p className="label-post">Tiện ích:</p>
                    <p className="data-label">{showExtensions()}</p>
                </div>
                <div className="information-detail-address">
                    <p className="label-post">Mô tả ngắn:</p>
                    <p className="data-label">{post.postDto.brief}</p>
                </div>
                <div className="detail-post">
                    <p className="label-post">Nội dung:</p>
                    <p>{post.postDto.content}</p>
                </div>
                <div className="pre-image">
                    {showImage()}
                </div>
                <div className="pre-image">
                    {showVideo()}
                </div>
                <div className="btn-action-page">
                    <button className="create-post-btn mg-2-rem" onClick={onHandlerApprove} name="true">Duyệt</button>
                    <button className="create-post-btn clear-post-btn" type="submit" onClick={onHandlerApprove} name="false">Từ chối</button>
                </div>
            </div>
        </div>
    )
}

export default PostDetail;