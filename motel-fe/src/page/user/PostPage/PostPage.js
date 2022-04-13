import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { postAction } from '../../../actions/postAction';
import { provinceAPI } from '../../../utils/provinceAPI';
import { useHistory } from "react-router-dom";
import './PostPage.css';

const PostPage = () => {
    const alert= useAlert();
    const dispatch=useDispatch();
    const history= useHistory();
    const [provinceName, setProvinceName] = useState({
        namePro: ""
    });
    const [districtName, setDistrictName] = useState({
        nameDis: ""
    });
    const [wardName, setWardName] = useState({
        nameWard: ""
    });
    const [previewImage,setPreviewImage]=useState({
        previewImages: [],
        images:[]
    })

    const [video,setVideo]=useState({
        videoUpload:[],
        videos:[]
    });

    const [inputDisable, setInputDisable]=useState(true);

    const [post, setPost] = useState({
        provinceCode: "",
        districtCode: "",
        wardCode: "",
        streetAndNumOfHouse:"",
        xyCoordinate:"",
        title:"",
        brief:"",
        content:"",
        phone:"",
        acreage:"",
        price:0,
        deposit:0,
        electricPrice:0,
        waterPrice:0,
        internet:false,
        parking:false,
        airConditioner:false
    });

    const showProvinces = () => {
        const provinces = provinceAPI.getAllProvinces();
        return provinces.map((value, index) => {
            return <option key={index} value={value.code}>{value.name}</option>
        })
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value= event.target.value;
        const isChecked = event.target.checked;
        if(name==='price' && parseFloat(value)!==0){
            setInputDisable(false);
        }
        if(name==='deposit' && value!=="" && parseFloat(post.price)!==0){
            if(!checkDepositLessThanPrice(parseFloat(value),parseFloat(post.price))){
                alert.show('Tiền cọc nhỏ hơn tiền cho thuê', {
                    timeout: 2500,
                    type: 'info',
                    onClose:()=>{
                        return;
                    }
                });
            }else{
                setPost((prePost) => {
                    return {
                        ...prePost,
                        [name]: value
                    }
                });
            }
        }else{
            if(name!=='internet'&& name!=='parking' && name!=='airConditioner'){
                setPost((prePost) => {
                    return {
                        ...prePost,
                        [name]: value
                    }
                });
            }else{
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
        if (post.provinceCode !== "") {
            const province = provinceAPI.getProvinceByCode(post.provinceCode);
            setProvinceName({
                ...provinceName,
                namePro: province.name
            });
            
        }
        if(post.districtCode !== ""){
            const district= provinceAPI.getDistrictByCode(post.districtCode);
            setDistrictName({
                ...districtName,
                nameDis:district.name
            })
        }
        if(post.wardCode !== ""){
            const ward= provinceAPI.getWardByCode(post.wardCode);
            setWardName({
                ...wardName,
                nameWard:ward.name
            })
        }
    }, [post.provinceCode, post.districtCode,post.wardCode])

    const showDistrictsByProvinceCode = () => {
        const districts = provinceAPI.getDistrictsByProvinceCode(post.provinceCode);
        return districts.map((value, index) => {
            return <option key={index} value={value.code}>{value.name}</option>
        })
    }

    const showWardsByDistrictCode=()=>{
        const wards= provinceAPI.getWardsByDistrictCode(post.districtCode);
        return wards.map((value, index) => {
            return <option key={index} value={value.code}>{value.name}</option>
        })
    }
    const onChangePicture=(event)=>{
        const file=event.target.files[0];
        const preImg=previewImage.previewImages;
        const images=previewImage.images;
        images.push(file);
        preImg.push(URL.createObjectURL(file));
        if(preImg.length>5){
            alert.show('Tối đa upload 5 hình ảnh', {
                    timeout: 2500,
                    type: 'info'
                })
        }else{
            setPreviewImage((previousPreviewImage)=>{
                return{
                    ...previousPreviewImage,
                    previewImages:preImg,
                    images:images
                }
            });
        }
    }

    const onChangeVideo=(event)=>{
        const file=event.target.files[0];
        const preVideo=video.videoUpload;
        const videos= video.videos;
        videos.push(file);
        preVideo.push(URL.createObjectURL(file));
        if(preVideo.length>3){
            alert.show('Tối đa upload 3 video', {
                    timeout: 2500,
                    type: 'info'
                })
        }else{
            setVideo((previousVideo)=>{
                return{
                    ...previousVideo,
                    videoUpload:preVideo,
                    videos:videos
                }
            });
        }
    }

    const checkDepositLessThanPrice=(deposit, price)=>{
        if(deposit<=price){
            return true;
        }
        return false;
    }
    const alertStatus = useSelector(state => state.alertReducer);
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        dispatch(postAction.addPostRequest(post,previewImage,video));
        if(alertStatus){
            history.replace("/home/user/posts/list-posts");
        }
       
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
                            Địa chỉ cho thuê
                        </h3>
                    </div>
                    <div className="select-address-box">
                        <div className="select-box">
                            <label htmlFor="province" className="label select-box1">
                                <span className="label-desc">{provinceName.namePro === "" ? `Chọn tỉnh/ thành phố` : provinceName.namePro}</span>
                            </label>
                            <select id="province" className="select" onChange={onChangeHandler} name="provinceCode">
                                {showProvinces()}
                            </select>

                        </div>
                        <div className="select-box">
                            <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">
                            {districtName.nameDis === "" ? `Chọn quận/huyện` : districtName.nameDis}</span> </label>
                            <select id="select-box1" className="select" name="districtCode" onChange={onChangeHandler}>
                                {showDistrictsByProvinceCode()}
                            </select>

                        </div>
                        <div className="select-box">
                            <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">
                            {wardName.nameWard === "" ? `Chọn phường/xã` : wardName.nameWard}</span> </label>
                            <select id="select-box1" className="select" name='wardCode' onChange={onChangeHandler}>
                                {showWardsByDistrictCode()}
                            </select>
                        </div>
                    </div>

                    <div className="input-address">
                        <input type="text" placeholder="Nhập đường - số nhà" 
                                onChange={onChangeHandler} 
                                name="streetAndNumOfHouse"></input>
                        <input type="text" placeholder="Nhập tọa độ X,Y nếu cần thiết" 
                                name="xyCoordinate"
                                onChange={onChangeHandler}></input>
                    </div>
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
                                     onChange={onChangeHandler}></input>
                                </div>
                                <div>
                                    <label> Diện tích</label>
                                    <input type="number" name='acreage' 
                                            placeholder="Diện tích phòng trọ đơn vị mét vuông" min="12"
                                            onChange={onChangeHandler}></input>
                                </div>
                                <div>
                                    <label> Giá điện</label>
                                    <input type="number" name='electricPrice' placeholder="Đơn vị VNĐ"  onChange={onChangeHandler}></input>
                                </div>
                                <div className="form-check">
                                    <div className="checkbox-input">
                                        <label className="form-check-label">Internet free</label>
                                        <input type="checkbox" 
                                                name='internet'
                                                className="form-check-input"
                                                checked={post.internet} 
                                                onChange={onChangeHandler}/>
                                    </div>
                                    <div className="checkbox-input">
                                        <label className="form-check-label">Chỗ để xe</label>
                                        <input type="checkbox" name='parking' className="form-check-input" onChange={onChangeHandler}/>
                                    </div>

                                    <div className="checkbox-input">
                                        <label className="form-check-label">Điều hòa</label>
                                        <input type="checkbox" name='airConditioner' className="form-check-input" onChange={onChangeHandler}/>
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
                                <div>
                                    <label> Tiền đặt cọc</label>
                                    <input type="number" 
                                            name='deposit'
                                            onChange={onChangeHandler}
                                            disabled={inputDisable?"disabled":""}
                                            placeholder="Đơn vị VNĐ. Số tiền đặt cọc nên trên 10% tiền cho thuê"></input>
                                </div>
                                <div>
                                    <label> Giá nước</label>
                                    <input type="number" name='waterPrice' placeholder="Đơn vị VNĐ" onChange={onChangeHandler}></input>
                                </div>
                            </div>
                        </div>
                        <div className="media-infor">
                            <h3>Hình ảnh</h3>
                            <div className="media">
                                <input type="file"  multiple accept='image/*' onChange={onChangePicture}></input>
                                <p>Kéo hình vào hoặc bấm vào để tải hình ảnh lên. Tối đa 5 hình ảnh.</p>
                                <div className="preview-image">
                                    {previewImage.previewImages && previewImage.previewImages.map((value, index)=>{
                                        return(<img src={value} alt={value+index} key={index}></img>)
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="media-infor-video">
                            <h3>Video</h3>
                            <div className="media">
                                <input type="file"accept="video/*" onChange={onChangeVideo} multiple></input>
                                <p>Kéo video vào hoặc bấm vào để tải hình video lên. Tối đa 1 video</p>
                            </div>
                        </div>
                        <div className="btn-action">
                            <button className="create-post-btn" type="submit">Đăng tin</button>
                            <button className="create-post-btn clear-post-btn" type="submit">Xóa thông tin</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PostPage;