import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { postAction } from '../../../actions/postAction';
import { userActions } from '../../../actions/userAction';
import postConstant from '../../../constants/postConstant';
import { convertTypePostUtils } from '../../../utils/convertTypePostUtils';
import { provinceAPI } from '../../../utils/provinceAPI';
import MapContainer from '../../Map/MapContainer';
import { LocationDefault } from './../../../constants/LocationDefault';
import './PostForm.css';

const PostForm = () => {

    const { id } = useParams();

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const typePosts = useSelector(state => state.typePostsReducer);
    const userInfor = useSelector(state => state.userInfor);
    const postUser = useSelector(state => state.postUser);

    const [provinceName, setProvinceName] = useState({
        namePro: "",
        selected: false
    });
    const [districtName, setDistrictName] = useState({
        nameDis: "",
        selected: false
    });
    const [wardName, setWardName] = useState({
        nameWard: "",
        selected: false
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
                alert.show('Ti???n c???c nh??? h??n ti???n cho thu??', {
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
                if (name === "provinceCode") {
                    setProvinceName({
                        ...provinceName,
                        selected: true
                    })
                }

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
        if (id !== undefined) {
            dispatch(postAction.getPostDetailById(id));
        }
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            let province;
            let district;
            let ward;
            const arrAddress = postUser.accommodationDto.address.split(" - ");
            if (arrAddress.length > 1) {
                province = provinceAPI.getProvinceCodeByName(arrAddress[arrAddress.length - 1]);
                district = provinceAPI.getSpecificDistrictByProvinceCodeAndName(province.code, arrAddress[arrAddress.length - 2]);
                ward = provinceAPI.getSpecificWardByDistrictCodeAndName(district.code, arrAddress[arrAddress.length - 3])
            }

            const images = postUser.imageDtos.map((item) => {
                return item.fileName;
            })
            setProvinceName({
                namePro: arrAddress[arrAddress.length - 1]
            })
            setDistrictName({
                nameDis: arrAddress[arrAddress.length - 2]
            })
            setWardName({
                nameWard: arrAddress[arrAddress.length - 3]
            })
            setPost({
                provinceCode: province ? province.code : "",
                districtCode: district ? district.code : "",
                wardCode: ward ? ward.code : "",
                streetAndNumOfHouse: arrAddress[arrAddress.length - 4],
                xCoordinate: postUser.accommodationDto.x,
                yCoordinate: postUser.accommodationDto.y,
                title: postUser.postDto.title,
                brief: postUser.postDto.brief,
                content: postUser.postDto.content,
                phone: "",
                acreage: postUser.accommodationDto.acreage,
                price: postUser.accommodationDto.price,
                deposit: postUser.accommodationDto.deposit,
                internet: postUser.accommodationDto.internet,
                parking: postUser.accommodationDto.parking,
                airConditioner: postUser.accommodationDto.airConditioner,
                heater: postUser.accommodationDto.heater,
                fridge: postUser.accommodationDto.fridge,
                furniture: postUser.accommodationDto.furniture,
                tower: postUser.accommodationDto.tower,
                floor: postUser.accommodationDto.floor,
                bedroom: postUser.accommodationDto.bedroom,
                toilet: postUser.accommodationDto.toilet,
                type: convertTypePostUtils.getNameOfType(postUser.postDto.type)
            })
            setPreviewImage({
                previewImages: images,
                images: images
            })
        }
    }, [postUser])

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
            alert.show('T???i ??a upload 5 h??nh ???nh', {
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
            alert.show('T???i ??a upload 3 video', {
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
        if (id === undefined) {
            // add
            dispatch(postAction.addPostRequest(post, previewImage, video));
        } else {
            //update

        }
        if (alertStatus) {
            history.replace("/home/user/posts/wait-approve");
        }

    }
    const onFocusOut = (event) => {
        setHouseAndStreet(event.target.value);
    }


    return (<>
        <div className="content">
            <div className="title">
                <h1>????ng tin m???i</h1>
            </div>
            <form action="" className="post-form" onSubmit={onSubmitHandler}>
                <div className="select-address">
                    <h3>
                        Danh m???c tin ????ng
                    </h3>
                </div>
                <div className="select-address-box">
                    <div className="select-box">
                        <label htmlFor="type" className="label select-box1">
                            <span className="label-desc">{post.type === "" ? `Ch???n danh m???c` : post.type}</span>
                        </label>
                        <select id="type" className="select"
                            onChange={onChangeHandler} name="type">
                            <option disabled={true}>Ch???n danh m???c</option>
                            {showTypePosts()}
                        </select>

                    </div>
                </div>
                {post.type !== '' ? <><div className="select-address">
                    <h3>
                        ?????a ch??? cho thu??
                    </h3>
                </div>
                    <div className="select-address-box">
                        <div className="select-box">
                            <label htmlFor="province" className="label select-box1">
                                <span className="label-desc">{provinceName.namePro === "" ? `Ch???n t???nh/ th??nh ph???` : provinceName.namePro}</span>
                            </label>
                            <select id="province" className="select" onChange={onChangeHandler} name="provinceCode">
                                <option disabled={true}>Ch???n t???nh/ th??nh ph???</option>
                                {showProvinces()}
                            </select>

                        </div>
                        <div className="select-box">
                            <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">
                                {districtName.nameDis === "" ? `Ch???n qu???n/huy???n` : districtName.nameDis}</span> </label>
                            <select id="select-box1" className="select" name="districtCode" onChange={onChangeHandler}>
                                <option disabled={true}>Ch???n qu???n/huy???n</option>
                                {showDistrictsByProvinceCode()}
                            </select>

                        </div>
                        <div className="select-box">
                            <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">
                                {wardName.nameWard === "" ? `Ch???n ph?????ng/x??` : wardName.nameWard}</span> </label>
                            <select id="select-box1" className="select" name='wardCode' onChange={onChangeHandler}>
                                <option disabled={true}>Ch???n ph?????ng/x??</option>
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
                                provinceName: provinceName,
                                districtName: districtName.nameDis,
                                wardName: wardName.nameWard,
                                houseAndStreet: houseAndStreet
                            }}>
                        </MapContainer>
                    </div>

                    <div className="input-address">
                        <input type="text" placeholder="Nh???p ???????ng - s??? nh??"
                            onChange={onChangeHandler}
                            onBlur={onFocusOut}
                            name="streetAndNumOfHouse"
                            value={post.streetAndNumOfHouse}></input>
                        <input type="text" placeholder="G???n v???i ?????a ch???"
                            style={{ backgroundColor: "#ddd" }}
                            disabled={true}
                            name="xyCoordinate"
                            value={post.xCoordinate !== '' && post.yCoordinate !== '' ? `${post.xCoordinate},${post.yCoordinate}` : ''}
                            onChange={onChangeHandler}></input>
                    </div>

                    {post.type === postConstant.CAN_HO_TYPE ?
                        <>
                            <div className="select-address">
                                <h3>
                                    V??? tr?? b???t ?????ng s???n
                                </h3>
                            </div>
                            <div className="input-address">
                                <input type="text" placeholder="Block/Th??p"
                                    onChange={onChangeHandler}
                                    name="tower" value={post.tower}></input>
                                <input type="number" placeholder="T???ng s???"
                                    name="floor"
                                    onChange={onChangeHandler} value={post.floor}></input>
                            </div>
                        </>
                        : null}

                    <div className="infor-desc">
                        <h3>Th??ng tin m?? t???</h3>
                        <div className="post-infor">
                            <label> Ti??u ?????</label>
                            <input type="text" placeholder="Ti??u ????? b??i vi???t"
                                name='title' onChange={onChangeHandler}
                                value={post.title}></input>
                            <label> T??m t???t ng???n g???n</label>
                            <input type="text" placeholder="T??m t???t b??i vi???t" name='brief'
                                onChange={onChangeHandler} value={post.brief}></input>
                            <label> Th??ng tin chi ti???t</label>
                            <textarea name='content'
                                onChange={onChangeHandler}
                                placeholder="M?? t??? chi ti???t th??ng tin ph??ng cho thu??, n??n vi???t ti???ng Vi???t c?? d???u."
                                value={post.content}></textarea>
                        </div>
                        <div className="accomodation-infor">
                            <div className="row-first">
                                <div>
                                    <label> Th??ng tin li??n h???</label>
                                    <input type="text" name='phone' placeholder="S??? ??i???n tho???i"
                                        style={{ backgroundColor: "#ddd" }}
                                        disabled={true}
                                        value={userInfor.phone}
                                        onChange={onChangeHandler}></input>
                                </div>
                                {post.type === postConstant.CAN_HO_TYPE || post.type === postConstant.NHA_NGUYEN_CAN_TYPE ? <div>
                                    <label> S??? ph??ng ng???</label>
                                    <input type="number" name='bedroom' placeholder=""
                                        onChange={onChangeHandler} value={post.bedroom}></input>
                                </div> : null}
                                <div>
                                    <label> Di???n t??ch</label>
                                    <input type="number" name='acreage'
                                        placeholder="Di???n t??ch ph??ng tr??? ????n v??? m??t vu??ng" min="12"
                                        onChange={onChangeHandler} value={post.acreage}></input>
                                </div>

                                <div className="form-check">
                                    <div className="checkbox-input">
                                        <label className="form-check-label">Internet free</label>
                                        <input type="checkbox"
                                            name='internet'
                                            className="form-check-input"
                                            checked={post.internet}
                                            onChange={onChangeHandler}
                                        />
                                    </div>

                                    <div className="checkbox-input">
                                        <label className="form-check-label">??i???u h??a</label>
                                        <input type="checkbox" name='airConditioner' className="form-check-input"
                                            onChange={onChangeHandler} checked={post.airConditioner} />
                                    </div>

                                    <div className="checkbox-input">
                                        <label className="form-check-label">Ch??? ????? xe</label>
                                        <input type="checkbox" name='parking' className="form-check-input"
                                            onChange={onChangeHandler} checked={post.parking} />
                                    </div>
                                </div>
                            </div>
                            <div className="row-second">
                                <div>
                                    <label> Gi?? cho thu??</label>
                                    <input type="number"
                                        name='price'
                                        placeholder="????n v??? VN??"
                                        onChange={onChangeHandler} value={post.price}></input>
                                </div>
                                {post.type === postConstant.CAN_HO_TYPE || post.type === postConstant.NHA_NGUYEN_CAN_TYPE ? <div>
                                    <label> S??? ph??ng v??? sinh</label>
                                    <input type="number"
                                        name='toilet' placeholder=""
                                        onChange={onChangeHandler}
                                        value={post.toilet}></input>
                                </div> : null}
                                <div>
                                    <label> Ti???n c???c</label>
                                    <input type="number"
                                        name='deposit'
                                        onChange={onChangeHandler}
                                        disabled={inputDisable ? "disabled" : ""}
                                        placeholder="????n v??? VN??" value={post.deposit}></input>
                                </div>
                                <div className='form-check'>
                                    <div className="checkbox-input">
                                        <label className="form-check-label">M??y n?????c n??ng</label>
                                        <input type="checkbox" name='heater' className="form-check-input"
                                            onChange={onChangeHandler} checked={post.heater} />
                                    </div>

                                    <div className="checkbox-input">
                                        <label className="form-check-label">T??? l???nh</label>
                                        <input type="checkbox" name='fridge' className="form-check-input"
                                            onChange={onChangeHandler} checked={post.fridge} />
                                    </div>

                                    <div className="checkbox-input">
                                        <label className="form-check-label">N???i th???t</label>
                                        <input type="checkbox" name='furniture' className="form-check-input"
                                            onChange={onChangeHandler} checked={post.furniture} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="media-infor">
                            <h3>H??nh ???nh</h3>
                            <div className="media">
                                <input type="file" multiple accept='image/*' onChange={onChangePicture}></input>
                                <p>K??o h??nh v??o ho???c b???m v??o ????? t???i h??nh ???nh l??n. T???i ??a 5 h??nh ???nh.</p>
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
                                <p>K??o video v??o ho???c b???m v??o ????? t???i h??nh video l??n. T???i ??a 1 video</p>
                            </div>
                        </div>
                        <div className="btn-action-page">
                            <button className="create-post-btn" type="submit">{id === undefined ? `????ng tin` : `C???p nh???t`}</button>
                            <button className="create-post-btn clear-post-btn" type="submit">X??a th??ng tin</button>
                        </div>
                    </div></> : null}
            </form>
        </div >
    </>)
}

export default PostForm;