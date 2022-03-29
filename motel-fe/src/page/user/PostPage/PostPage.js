import './PostPage.css';

const PostPage = () => {
    return (
        <>
            <div className="alert">
                <a href="/#">Indicates</a>
                <p>====</p>
                <a href="/#">Indicates</a>
            </div>
            <div className="content">
                <div className="title">
                    <h1>Đăng tin mới</h1>
                </div>
                <form action="" className="post-form">
                    <div className="select-address">
                        <h3>
                            Địa chỉ cho thuê
                        </h3>
                    </div>
                    <div className="select-address-box">
                        <div className="select-box">
                            <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">Chọn tỉnh/ thành
                                phố</span> </label>
                            <select id="select-box1" className="select">
                                <option value="Choice 1">Falkland Islands</option>
                                <option value="Choice 2">Germany</option>
                                <option value="Choice 3">Neverland</option>
                                <option value="Choice 1">Falkland Islands</option>
                                <option value="Choice 2">Germany</option>
                                <option value="Choice 3">Neverland</option>
                                <option value="Choice 1">Falkland Islands</option>
                                <option value="Choice 2">Germany</option>
                                <option value="Choice 3">Neverland</option>
                            </select>

                        </div>
                        <div className="select-box">
                            <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">Chọn quận
                                huyện</span> </label>
                            <select id="select-box1" className="select">
                                <option value="Choice 1">Falkland Islands</option>
                                <option value="Choice 2">Germany</option>
                                <option value="Choice 3">Neverland</option>
                            </select>

                        </div>
                        <div className="select-box">
                            <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">Chọn phường
                                xã</span> </label>
                            <select id="select-box1" className="select">
                                <option value="Choice 1">Falkland Islands</option>
                                <option value="Choice 2">Germany</option>
                                <option value="Choice 3">Neverland</option>
                            </select>

                        </div>
                        <div className="select-box">
                            <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">Chọn
                                đường/thôn</span> </label>
                            <select id="select-box1" className="select">
                                <option value="Choice 1">Falkland Islands</option>
                                <option value="Choice 2">Germany</option>
                                <option value="Choice 3">Neverland</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-address">
                        <input type="text" placeholder="Nhập số nhà"></input>
                        <input type="text" placeholder="Nhập tọa độ [X,Y] nếu cần thiết"></input>
                    </div>
                    <div className="infor-desc">
                        <h3>Thông tin mô tả</h3>
                        <div className="post-infor">
                            <label> Tiêu đề</label>
                            <input type="text" placeholder="Tiêu đề bài viết"></input>
                            <label> Tóm tắt ngắn gọn</label>
                            <input type="text" placeholder="Tóm tắt bài viết"></input>
                            <label> Thông tin chi tiết</label>
                            <textarea
                                placeholder="Mô tả chi tiết thông tin phòng cho thuê, nên viết tiếng Việt có dấu."></textarea>
                        </div>
                        <div className="accomodation-infor">
                            <div className="row-first">
                                <div>
                                    <label> Thông tin liên hệ</label>
                                    <input type="text" placeholder="Số điện thoại"></input>
                                </div>
                                <div>
                                    <label> Diện tích</label>
                                    <input type="number" placeholder="Diện tích phòng trọ đơn vị mét vuông" min="12"></input>
                                </div>
                                <div>
                                    <label> Giá điện</label>
                                    <input type="text" placeholder="Đơn vị VNĐ"></input>
                                </div>
                                <div className="form-check">
                                    <div className="checkbox-input">
                                        <label className="form-check-label">Internet free</label>
                                        <input type="checkbox" className="form-check-input" />
                                    </div>
                                    <div className="checkbox-input">
                                        <label className="form-check-label">Chỗ để xe</label>
                                        <input type="checkbox" className="form-check-input" />
                                    </div>

                                    <div className="checkbox-input">
                                        <label className="form-check-label">Điều hòa</label>
                                        <input type="checkbox" className="form-check-input" />
                                    </div>

                                </div>
                            </div>
                            <div className="row-second">
                                <div>
                                    <label> Giá cho thuê</label>
                                    <input type="text" placeholder="Đơn vị VNĐ"></input>
                                </div>
                                <div>
                                    <label> Tiền đặt cọc</label>
                                    <input type="text" placeholder="Đơn vị VNĐ. Số tiền đặt cọc nên trên 10% tiền cho thuê"></input>
                                </div>
                                <div>
                                    <label> Giá nước</label>
                                    <input type="text" placeholder="Đơn vị VNĐ"></input>
                                </div>
                            </div>
                        </div>
                        <div className="media-infor">
                            <h3>Hình ảnh</h3>
                            <div className="media">
                                <input type="file" multiple></input>
                                <p>Kéo hình vào hoặc bấm vào để tải hình ảnh lên</p>
                                <div className="preview-image">
                                    <img src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/11/16/cho-thue-phong-tro-1613975723_1637034014.jpg" alt=""></img>
                                    <img src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/11/16/cho-thue-phong-tro-1613975723_1637034014.jpg" alt=""></img>
                                    <img src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/11/16/cho-thue-phong-tro-1613975723_1637034014.jpg" alt=""></img>
                                    <img src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/11/16/cho-thue-phong-tro-1613975723_1637034014.jpg" alt=""></img>
                                    <img src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2021/11/16/cho-thue-phong-tro-1613975723_1637034014.jpg" alt=""></img>
                                </div>
                            </div>
                        </div>
                        <div className="media-infor-video">
                            <h3>Video</h3>
                            <div className="media">
                                <input type="file" multiple></input>
                                <p>Kéo video vào hoặc bấm vào để tải hình video lên</p>
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