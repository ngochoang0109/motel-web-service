import './SearchPost.css';

const SearchPost = () => {
    return (<div className="search-container">
        <div className="filter-form" role="button">
            <i className="fas fa-solid fa-filter"></i>
            <span>Lọc</span>
        </div>
        <div className="type-post-search" role="button">
            <i className="fas fa-solid fa-hotel"></i>
            <span> Phòng trọ, nhà trọ</span>
        </div>
        <div className="address-search" role="button">
            <i className="fas fa-solid fa-thumbtack"></i>
            <span> Toàn quốc </span>
        </div>
        <div className="price-search" role="button">
            <i className="fas fa-regular fa-tag"></i>
            <span>Giá</span>
        </div>
        <div className="acreage-search" role="button">
            <i className="fas fa-solid fa-chart-area"></i>
            <span>Diện tích</span>
        </div>
    </div>);
}

export default SearchPost;