import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAction } from './../../../actions/postAction';
import { provinceAPI } from './../../../utils/provinceAPI';
import Modal from './../Modal/Modal';
import './SearchPost.css';

const SearchPost = () => {

    const dispatch = useDispatch();
    const typePosts = useSelector(state => state.typePostsReducer);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

    const [searchManagement] = useState([
        {
            type: "filter",
            title: "Lọc kết quả",
            status: false,
            data: ""
        }, {
            type: "type",
            title: "Loại nhà ở",
            status: false,
            data: ""
        }, {
            type: "address",
            title: "Chọn khu vực",
            status: false,
            data: ""
        }, {
            type: "price",
            title: "Giá",
            status: false,
            start: 0,
            end: 0
        }, {
            type: "acreage",
            title: "Diện tích",
            status: false,
            start: 0,
            end: 0
        }]);
    const showTypePost = (title) => {
        const content = <ul className='itemList'>
            {typePosts.map((value, index) => {
                return (<li key={index} onClick={() => handlerSearchFields(value.shortName)}>
                    <span>{value.fullName}</span>
                    <i className="fas fa-solid fa-arrow-right pd-l"></i>
                </li>)
            })}
        </ul>
        return <Modal title={title}
            content={content}
            onClose={() => setShow(false)} show={show}>

        </Modal>
    }

    const handlerSearchFields = (value) => {
        switch (name) {
            case searchManagement[1].type:
                const updateType = searchManagement[1];
                updateType.status = true;
                updateType.data = value;
                dispatch(postAction.getPostsBySearchCriteria(searchManagement));
                setShow(false);
                return;
            case searchManagement[2].type:
                const updateAddress = searchManagement[2];
                updateAddress.status = true;
                updateAddress.data = value;
                dispatch(postAction.getPostsBySearchCriteria(searchManagement));
                setShow(false);
                return;
            default:
                return searchManagement;
        }

    }

    const showModalSearch = (event) => {
        setShow(true);
        setName(event.target.getAttribute("name"));
    }

    useEffect(() => {
        dispatch(postAction.getTypePosts());
    }, []);

    const showDistrictsByProvinceCode = (title) => {
        const districts = provinceAPI.getDistrictsByProvinceCode(79);
        const content = (<ul className='itemList'>
            {districts.map((value, index) => {
                return <li key={value.code}
                    onClick={() => handlerSearchFields(value.name)}
                    name={searchManagement[1].type}>
                    <span>{value.name}</span>
                    <i className="fas fa-solid fa-arrow-right pd-l"></i>
                </li>
            })}
        </ul>)
        return <Modal title={title}
            onClose={() => setShow(false)} show={show}
            content={content}>
        </Modal>
    }

    const showFilter = () => {
        let title = "";

        switch (name) {
            case searchManagement[0].type:
                title = searchManagement[0].title;
                return (<Modal title={title} onClose={() => setShow(false)} show={show}>

                </Modal>)
            case searchManagement[1].type:
                title = searchManagement[1].title;
                return (showTypePost(title))
            case searchManagement[2].type:
                title = searchManagement[2].title;
                return (showDistrictsByProvinceCode(title))
            case searchManagement[3].type:
                title = searchManagement[3].title;
                return (<Modal title={title} onClose={() => setShow(false)} show={show}>

                </Modal>)
            case searchManagement[4].type:
                title = searchManagement[4].title;
                return (<Modal title={title} onClose={() => setShow(false)} show={show}>

                </Modal>)
            default:
                return null;
        }

    }

    return (
        <>
            <div className="search-container">
                <div className="filter-form" role="button" onClick={showModalSearch} name={searchManagement[0].type}>
                    <i className="fas fa-solid fa-filter"></i>
                    <span name={searchManagement[0].type}>Lọc</span>
                </div>
                <div className="type-post-search" role="button" onClick={showModalSearch} name={searchManagement[1].type}>
                    <i className="fas fa-solid fa-hotel"></i>
                    <span name={searchManagement[1].type}> Phòng trọ, nhà trọ</span>
                </div>
                <div className="address-search" role="button" onClick={showModalSearch} name={searchManagement[2].type}>
                    <i className="fas fa-solid fa-thumbtack"></i>
                    <span name={searchManagement[2].type}> Quận </span>
                </div>
                <div className="price-search" role="button" onClick={showModalSearch} name={searchManagement[3].type}>
                    <i className="fas fa-regular fa-tag"></i>
                    <span name={searchManagement[3].type}>Giá</span>
                </div>
                <div className="acreage-search" role="button" onClick={showModalSearch} name={searchManagement[4].type}>
                    <i className="fas fa-solid fa-chart-area"></i>
                    <span name={searchManagement[4].type}>Diện tích</span>
                </div>
            </div>
            {showFilter()}
        </>
    );
}

export default SearchPost;