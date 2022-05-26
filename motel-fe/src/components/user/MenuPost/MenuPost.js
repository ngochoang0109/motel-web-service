import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { postActionGuest } from '../../../actions/guest/postAction';
import { postAction } from '../../../actions/postAction';
import Pagination from '../../Pagination/Pagination';
import PostCard from './../PostCard/PostCard';

import './MenuPost.css';
const MenuPost = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("Danh sách tin đăng");

    const showingPosts = useSelector(state => state.menuPostReducer);

    const { filter, pageNo, sort } = useParams();

    const { url, path } = useRouteMatch();

    console.log(path);
    console.log("filter: " + filter);

    useEffect(() => {
        // if (typeof (pageNo) === 'undefined' && typeof(sort)==='undefined') {
        //     dispatch(postAction.getPostsShowing(0,'new-post'));
        // }
        // else {
        //     dispatch(postAction.getPostsShowing(pageNo,sort));
        // }
        switch (filter) {
            case 'cho-thue-phong-tro':
                setTitle("Cho thuê phòng trọ")
                break;
            case 'cho-thue-can-ho':
                setTitle("Cho thuê căn hộ")
                break;
            case 'nha-cho-thue':
                setTitle("Cho thuê nhà nguyên căn")
                break;
            default:
                setTitle("Danh sách tin đăng")
        }
        if (path === '/home') {
            dispatch(postAction.getPostsShowing(0, 'new-post'));
        }
        else if (path === '/home/:filter') {
            if (pageNo === undefined && sort === undefined) {
                dispatch(postActionGuest.getPostsOfType(filter, 0, 'new-post'));
            }
        }
        else if (path === '/home/:filter/:pageNo/:sort') {
            dispatch(postActionGuest.getPostsOfType(filter, pageNo, sort));
        }
    }, [filter, pageNo, sort]);

    const ShowPost = () => {
        if (showingPosts.content.length > 0) {
            let i = -1;
            return showingPosts.content.map((item, index) => {
                i++;
                if (i > 3) {
                    i = 0;
                }
                return <PostCard
                    key={item.id}
                    post={item}
                    index={index}></PostCard>
            })
        } else {
            return (
                <div className="title">
                    <h1>Chưa có dữ liệu phù hợp</h1>
                </div>)
        }
    }

    const showPostSort = () => {
        return <>
            <Link className={sort === 'new-post' || typeof (sort) === 'undefined' ? "active" : ""} to={`/home/${filter}/0/new-post`}>Mới nhất</Link>
            <Link className={sort === 'price-ascending' ? "active" : ""} to={`/home/${filter}/0/price-ascending`}>Giá tăng dần</Link>
            <Link className={sort === 'acreage-ascending' ? "active" : ""} to={`/home/${filter}/0/acreage-ascending`}>Diện tích tăng dần</Link>
        </>
    }

    return (
        <>
            <div className="re__srp re__main-content-layout js__main-container">
                <div className="re__main-content">
                    <div className='title-menu-post'>
                        <h1 className="re__srp-title">{title}</h1>
                        <span className="re__srp-total-count">Hiện có <span id="count-number">{showingPosts.totalElement}</span> bài đăng.</span>
                    </div>

                    <div className="re__breadcrumb js__breadcrumb lazyloaded">
                        <div className="post-sort">
                            <span>Sắp xếp: </span>
                            {showPostSort()}
                        </div>
                        <div className="re__srp-list js__srp-list" id="product-lists-web" style={{ display: 'block' }}>
                            {ShowPost()}
                        </div>
                        <Pagination pageNo={showingPosts.pageNo}
                            pageSize={showingPosts.pageSize}
                            totalElement={showingPosts.totalElement}
                            totalPage={showingPosts.totalPage}
                            last={showingPosts.last}
                            first={showingPosts.first}
                            type={filter}
                            sort={sort}></Pagination>
                    </div>
                </div>
                <div className="re__main-sidebar">
                    <div className="re__sidebar-box re__price-box">
                        <h2 className="re__sidebar-box-title">Lọc theo khoảng giá</h2>
                        <div className="re__sidebar-box-content">
                            <h3 className="re__sidebar-box-item">
                                <a className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/gia-duoi-1-trieu"
                                    title="Cho thuê căn hộ chung cư Việt Nam, giá dưới 1 triệu">&lt; 1 triệu</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a className="re__link-se" href="/cho-thue-can-ho-chung-cu/gia-tu-1-trieu-den-3-trieu"
                                    title="Cho thuê căn hộ chung cư Việt Nam, giá 1 - 3 triệu">1 - 3 triệu</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=price"
                                    className="re__link-se" href="/cho-thue-can-ho-chung-cu/gia-tu-3-trieu-den-5-trieu"
                                    title="Cho thuê căn hộ chung cư Việt Nam, giá 3 - 5 triệu">3 - 5 triệu</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=price"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/gia-tu-5-trieu-den-10-trieu"
                                    title="Cho thuê căn hộ chung cư Việt Nam, giá 5 - 10 triệu">5 - 10 triệu</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=price"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/gia-tu-10-trieu-den-40-trieu"
                                    title="Cho thuê căn hộ chung cư Việt Nam, giá 10 - 40 triệu">10 - 40 triệu</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=price"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/gia-tu-40-trieu-den-70-trieu"
                                    title="Cho thuê căn hộ chung cư Việt Nam, giá 40 - 70 triệu">40 - 70 triệu</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=price"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/gia-tu-70-trieu-den-100-trieu"
                                    title="Cho thuê căn hộ chung cư Việt Nam, giá 70 - 100 triệu">70 - 100 triệu</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=price"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/gia-tren-100-trieu"
                                    title="Cho thuê căn hộ chung cư Việt Nam, giá ≥ 100 triệu">≥ 100 triệu</a>
                            </h3>
                        </div>
                    </div>
                    <div className="re__sidebar-box re__price-box">
                        <h2 className="re__sidebar-box-title">Lọc theo diện tích</h2>
                        <div className="re__sidebar-box-content">
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-duoi-30m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích ≤ 30 m²">≤ 30 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tu-30m2-den-50m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích 30 - 50 m²">30 - 50 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tu-50m2-den-80m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích 50 - 80 m²">50 - 80 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tu-80m2-den-100m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích 80 - 100 m²">80 - 100 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tu-100m2-den-150m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích 100 - 150 m²">100 - 150 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tu-150m2-den-200m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích 150 - 200 m²">150 - 200 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tu-200m2-den-250m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích 200 - 250 m²">200 - 250 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tu-250m2-den-300m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích 250 - 300 m²">250 - 300 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tu-300m2-den-500m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích 300 - 500 m²">300 - 500 m²</a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link"
                                    tracking-label="loc=SRP For Rent;type=area"
                                    className="re__link-se"
                                    href="/cho-thue-can-ho-chung-cu/dt-tren-500m2"
                                    title="Cho thuê căn hộ chung cư Việt Nam, diện tích > 500 m²">&gt; 500 m²</a>
                            </h3>
                        </div>
                    </div>
                    <div className="re__sidebar-box re__product-count-box">
                        <h2 className="re__sidebar-box-title">Cho thuê căn hộ chung cư</h2>
                        <div className="re__sidebar-box-content">
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-tp-hcm" title="Cho thuê căn hộ chung cư tại Hồ Chí Minh">
                                    Thành phố Hồ Chí Minh (8718)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-ha-noi" title="Cho thuê căn hộ chung cư tại Hà Nội">
                                    Thành phố Hà Nội (3959)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-binh-duong" title="Cho thuê căn hộ chung cư tại Bình Dương">
                                    Bình Dương (614)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-da-nang" title="Cho thuê căn hộ chung cư tại Đà Nẵng">
                                    Đà Nẵng (162)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-hai-phong" title="Cho thuê căn hộ chung cư tại Hải Phòng">
                                    Hải Phòng (123)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-khanh-hoa" title="Cho thuê căn hộ chung cư tại Khánh Hòa">
                                    Khánh Hòa (119)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-dong-nai" title="Cho thuê căn hộ chung cư tại Đồng Nai">
                                    Đồng Nai (92)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-ba-ria-vung-tau" title="Cho thuê căn hộ chung cư tại Bà Rịa Vũng Tàu">
                                    Bà Rịa Vũng Tàu (66)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-hung-yen" title="Cho thuê căn hộ chung cư tại Hưng Yên">
                                    Hưng Yên (38)
                                </a>
                            </h3>
                            <h3 className="re__sidebar-box-item">
                                <a tracking-id="srp-suggestion-link" tracking-label="loc=SRP For Rent;type=related" className="re__link-se" href="/cho-thue-can-ho-chung-cu-binh-dinh" title="Cho thuê căn hộ chung cư tại Bình Định">
                                    Bình Định (33)
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="projcard-container">
                {ShowPost()}
            </div> */}
        </>)
}

export default MenuPost;