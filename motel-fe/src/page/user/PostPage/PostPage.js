import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { postAction } from '../../../actions/postAction';
import { provinceAPI } from '../../../utils/provinceAPI';
import { useHistory } from "react-router-dom";
import MapContainer from '../../../components/Map/MapContainer';
import postConstant from '../../../constants/postConstant';
import { LocationDefault } from '../../../utils/LocationDefault';

import './PostPage.css';
import { userActions } from '../../../actions/userAction';
const PostPage = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const typePosts = useSelector(state => state.typePostsReducer);
    const userInfor = useSelector(state => state.userInfor);

    const [provinceName, setProvinceName] = useState({
        namePro: ""
    });
    const [districtName, setDistrictName] = useState({
        nameDis: ""
    });
    const [wardName, setWardName] = useState({
        nameWard: ""
    });

    const [previewImage, setPreviewImage] = useState({
        previewImages: [],
        images: []
    })

    const [video, setVideo] = useState({
        videoUpload: [],
        videos: []
    });

    const [inputDisable, setInputDisable] = useState(true);



    const [post, setPost] = useState({
        provinceCode: "",
        districtCode: "",
        wardCode: "",
        streetAndNumOfHouse: "",
        xCoordinate: "",
        yCoordinate: "",
        title: "",
        brief: "",
        content: "",
        phone: "",
        acreage: "",
        price: 0,
        deposit: 0,
        internet: false,
        parking: false,
        airConditioner: false,
        heater: false,
        fridge: false,
        furniture: false,
        tower: "",
        floor: 0,
        bedroom: 0,
        toilet: 0,
        type: ""
    });

    const [houseAndStreet, setHouseAndStreet] = useState(post.streetAndNumOfHouse);

    const showProvinces = () => {
        const provinces = provinceAPI.getAllProvinces();
        return provinces.map((value, index) => {
            return <option key={index} value={value.code}>{value.name}</option>
        })
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (name === 'price' && parseFloat(value) !== 0) {
            setInputDisable(false);
        }
        if (name === 'deposit' && value !== "" && parseFloat(post.price) !== 0) {
            if (!checkDepositLessThanPrice(parseFloat(value), parseFloat(post.price))) {
                alert.show('Tiền cọc nhỏ hơn tiền cho thuê', {
                    timeout: 2500,
                    type: 'info',
                    onClose: () => {
                        return;
                    }
                });
            } else {
                setPost((prePost) => {
                    return {
                        ...prePost,
                        [name]: value
                    }
                });
            }
        } else {
            if (name !== 'internet' && name !== 'parking' && name !== 'airConditioner' &&
                name !== 'fridge' && name !== 'furniture' && name !== 'heater') {
                setPost((prePost) => {
                    return {
                        ...prePost,
                        [name]: value
                    }
                });
            } else {
                setPost((prePost) => {
                    return {
                        ...prePost,
                        [name]: isChecked
                    }
                });
            }

        };
    }

    useEffect(() => {
            dispatch(postAction.getTypePosts());
            dispatch(userActions.currentUser());
            setPost({ ...post, ...userInfor.phone });
    },[])

    useEffect(() => {
        if (post.provinceCode !== "") {
            const province = provinceAPI.getProvinceByCode(post.provinceCode);
            setProvinceName({
                ...provinceName,
                namePro: province.name
            });

        }
        if (post.districtCode !== "") {
            const district = provinceAPI.getDistrictByCode(post.districtCode);
            setDistrictName({
                ...districtName,
                nameDis: district.name
            })
        }
        if (post.wardCode !== "") {
            const ward = provinceAPI.getWardByCode(post.wardCode);
            setWardName({
                ...wardName,
                nameWard: ward.name
            })
        }
    }, [post.provinceCode, post.districtCode, post.wardCode])

    const showDistrictsByProvinceCode = () => {
        if (post.provinceCode !== "") {
            const districts = provinceAPI.getDistrictsByProvinceCode(post.provinceCode);
            return districts.map((value, index) => {
                return <option key={index} value={value.code}>{value.name}</option>
            })
        }
    }

    const showTypePosts = () => {
        return typePosts.map((value) => {
            return <option key={value.shortName} value={value.fullName}>{value.fullName}</option>
        })
    }

    const showWardsByDistrictCode = () => {
        if (post.districtCode !== "") {
            const wards = provinceAPI.getWardsByDistrictCode(post.districtCode);
            return wards.map((value, index) => {
                return <option key={index} value={value.code}>{value.name}</option>
            })
        }
    }
    const onChangePicture = (event) => {
        const file = event.target.files[0];
        const preImg = previewImage.previewImages;
        const images = previewImage.images;
        images.push(file);
        preImg.push(URL.createObjectURL(file));
        if (preImg.length > 5) {
            alert.show('Tối đa upload 5 hình ảnh', {
                timeout: 2500,
                type: 'info'
            })
        } else {
            setPreviewImage((previousPreviewImage) => {
                return {
                    ...previousPreviewImage,
                    previewImages: preImg,
                    images: images
                }
            });
        }
    }

    const onChangeVideo = (event) => {
        const file = event.target.files[0];
        const preVideo = video.videoUpload;
        const videos = video.videos;
        videos.push(file);
        preVideo.push(URL.createObjectURL(file));
        if (preVideo.length > 3) {
            alert.show('Tối đa upload 3 video', {
                timeout: 2500,
                type: 'info'
            })
        } else {
            setVideo((previousVideo) => {
                return {
                    ...previousVideo,
                    videoUpload: preVideo,
                    videos: videos
                }
            });
        }
    }

    const checkDepositLessThanPrice = (deposit, price) => {
        if (deposit <= price) {
            return true;
        }
        return false;
    }
    const alertStatus = useSelector(state => state.alertReducer);

    const handlerLocationSelect = ({ latitude, longitude }) => {
        setPost({ ...post, xCoordinate: latitude, yCoordinate: longitude });
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(postAction.addPostRequest(post, previewImage, video));
        if (alertStatus) {
            history.replace("/home/user/posts/wait-approve");
        }

    }
    const onFocusOut = (event) => {
        console.log(event.target.value)
        setHouseAndStreet(event.target.value);
    }
    return (
        <>
            <div className="content">
                <div className="title">
                    <h1>Đăng tin mới</h1>
                </div>
                <form action="" className="post-form" onSubmit={onSubmitHandler}>
                    <div className="select-address">
                        <h3>
                            Danh mục tin đăng
                        </h3>
                    </div>
                    <div className="select-address-box">
                        <div className="select-box">
                            <label htmlFor="type" className="label select-box1">
                                <span className="label-desc">{post.type === "" ? `Chọn danh mục` : post.type}</span>
                            </label>
                            <select id="type" className="select" onChange={onChangeHandler} name="type">
                                <option disabled={true}>Chọn danh mục</option>
                                {showTypePosts()}
                            </select>

                        </div>
                    </div>
                    {post.type !== '' ? <><div className="select-address">
                        <h3>
                            Địa chỉ cho thuê
                        </h3>
                    </div>
                        <div className="select-address-box">
                            <div className="select-box">
                                <label htmlFor="province" className="label select-box1">
                                    <span className="label-desc">{provinceName.namePro === "" ? `Chọn tỉnh/ thành phố` : provinceName.namePro}</span>
                                </label>
                                <select id="province" className="select" onChange={onChangeHandler} name="provinceCode">
                                    <option disabled={true}>Chọn tỉnh/ thành phố</option>
                                    {showProvinces()}
                                </select>

                            </div>
                            <div className="select-box">
                                <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">
                                    {districtName.nameDis === "" ? `Chọn quận/huyện` : districtName.nameDis}</span> </label>
                                <select id="select-box1" className="select" name="districtCode" onChange={onChangeHandler}>
                                    <option disabled={true}>Chọn quận/huyện</option>
                                    {showDistrictsByProvinceCode()}
                                </select>

                            </div>
                            <div className="select-box">
                                <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">
                                    {wardName.nameWard === "" ? `Chọn phường/xã` : wardName.nameWard}</span> </label>
                                <select id="select-box1" className="select" name='wardCode' onChange={onChangeHandler}>
                                    <option disabled={true}>Chọn phường/xã</option>
                                    {showWardsByDistrictCode()}
                                </select>
                            </div>
                        </div>

                        <div className='map-block'>
                            <MapContainer 
                                location={LocationDefault}
                                zoomLevel={14}
                                handlerLocation={handlerLocationSelect}
                                address={{
                                    provinceName: provinceName.namePro,
                                    districtName: districtName.nameDis,
                                    wardName: wardName.nameWard,
                                    houseAndStreet: houseAndStreet
                                }}>
                            </MapContainer>
                        </div>

                        <div className="input-address">
                            <input type="text" placeholder="Nhập đường - số nhà"
                                onChange={onChangeHandler}
                                onBlur={onFocusOut}
                                name="streetAndNumOfHouse"></input>
                            <input type="text" placeholder="Gần với địa chỉ"
                                style={{ backgroundColor: "#ddd" }}
                                disabled={true}
                                name="xyCoordinate"
                                value={post.xCoordinate !== '' && post.yCoordinate !== '' ? `${post.xCoordinate.toFixed(8)},${post.yCoordinate.toFixed(8)}` : ''}
                                onChange={onChangeHandler}></input>
                        </div>

                        {post.type === postConstant.CAN_HO_TYPE ?
                            <>
                                <div className="select-address">
                                    <h3>
                                        Vị trí bất động sản
                                    </h3>
                                </div>
                                <div className="input-address">
                                    <input type="text" placeholder="Block/Tháp"
                                        onChange={onChangeHandler}
                                        name="tower"></input>
                                    <input type="number" placeholder="Tầng số"
                                        name="floor"
                                        onChange={onChangeHandler}></input>
                                </div>
                            </>
                            : null}

                        <div className="infor-desc">
                            <h3>Thông tin mô tả</h3>
                            <div className="post-infor">
                                <label> Tiêu đề</label>
                                <input type="text" placeholder="Tiêu đề bài viết" name='title' onChange={onChangeHandler}></input>
                                <label> Tóm tắt ngắn gọn</label>
                                <input type="text" placeholder="Tóm tắt bài viết" name='brief'
                                    onChange={onChangeHandler}></input>
                                <label> Thông tin chi tiết</label>
                                <textarea name='content'
                                    onChange={onChangeHandler}
                                    placeholder="Mô tả chi tiết thông tin phòng cho thuê, nên viết tiếng Việt có dấu."></textarea>
                            </div>
                            <div className="accomodation-infor">
                                <div className="row-first">
                                    <div>
                                        <label> Thông tin liên hệ</label>
                                        <input type="text" name='phone' placeholder="Số điện thoại"
                                            style={{ backgroundColor: "#ddd" }}
                                            disabled={true}
                                            value={userInfor.phone}
                                            onChange={onChangeHandler}></input>
                                    </div>
                                    {post.type === postConstant.CAN_HO_TYPE || post.type === postConstant.NHA_NGUYEN_CAN_TYPE ? <div>
                                        <label> Số phòng ngủ</label>
                                        <input type="number" name='bedroom' placeholder=""
                                            onChange={onChangeHandler}></input>
                                    </div> : null}
                                    <div>
                                        <label> Diện tích</label>
                                        <input type="number" name='acreage'
                                            placeholder="Diện tích phòng trọ đơn vị mét vuông" min="12"
                                            onChange={onChangeHandler}></input>
                                    </div>

                                    <div className="form-check">
                                        <div className="checkbox-input">
                                            <label className="form-check-label">Internet free</label>
                                            <input type="checkbox"
                                                name='internet'
                                                className="form-check-input"
                                                checked={post.internet}
                                                onChange={onChangeHandler} />
                                        </div>

                                        <div className="checkbox-input">
                                            <label className="form-check-label">Điều hòa</label>
                                            <input type="checkbox" name='airConditioner' className="form-check-input" onChange={onChangeHandler} />
                                        </div>

                                        <div className="checkbox-input">
                                            <label className="form-check-label">Chỗ để xe</label>
                                            <input type="checkbox" name='parking' className="form-check-input" onChange={onChangeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row-second">
                                    <div>
                                        <label> Giá cho thuê</label>
                                        <input type="number"
                                            name='price'
                                            placeholder="Đơn vị VNĐ"
                                            onChange={onChangeHandler}></input>
                                    </div>
                                    {post.type === postConstant.CAN_HO_TYPE || post.type === postConstant.NHA_NGUYEN_CAN_TYPE ? <div>
                                        <label> Số phòng vệ sinh</label>
                                        <input type="number"
                                            name='toilet' placeholder=""
                                            onChange={onChangeHandler}></input>
                                    </div> : null}
                                    <div>
                                        <label> Tiền cọc</label>
                                        <input type="number"
                                            name='deposit'
                                            onChange={onChangeHandler}
                                            disabled={inputDisable ? "disabled" : ""}
                                            placeholder="Đơn vị VNĐ"></input>
                                    </div>
                                    <div className='form-check'>
                                        <div className="checkbox-input">
                                            <label className="form-check-label">Máy nước nóng</label>
                                            <input type="checkbox" name='heater' className="form-check-input" onChange={onChangeHandler} />
                                        </div>

                                        <div className="checkbox-input">
                                            <label className="form-check-label">Tủ lạnh</label>
                                            <input type="checkbox" name='fridge' className="form-check-input" onChange={onChangeHandler} />
                                        </div>

                                        <div className="checkbox-input">
                                            <label className="form-check-label">Nội thất</label>
                                            <input type="checkbox" name='furniture' className="form-check-input" onChange={onChangeHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="media-infor">
                                <h3>Hình ảnh</h3>
                                <div className="media">
                                    <input type="file" multiple accept='image/*' onChange={onChangePicture}></input>
                                    <p>Kéo hình vào hoặc bấm vào để tải hình ảnh lên. Tối đa 5 hình ảnh.</p>
                                    <div className="preview-image">
                                        {previewImage.previewImages && previewImage.previewImages.map((value, index) => {
                                            return (<img src={value} alt={value + index} key={index}></img>)
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="media-infor-video">
                                <h3>Video</h3>
                                <div className="media">
                                    <input type="file" accept="video/*" onChange={onChangeVideo} multiple></input>
                                    <p>Kéo video vào hoặc bấm vào để tải hình video lên. Tối đa 1 video</p>
                                </div>
                            </div>
                            <div className="btn-action-page">
                                <button className="create-post-btn" type="submit">Đăng tin</button>
                                <button className="create-post-btn clear-post-btn" type="submit">Xóa thông tin</button>
                            </div>
                        </div></> : null}
                </form>
            </div >
        </>
    );
};

export default PostPage;