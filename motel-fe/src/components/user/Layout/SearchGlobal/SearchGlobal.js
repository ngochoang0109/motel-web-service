import './SearchGlobal.css'

const SearchGlobal=()=>{
    return(
        <div className="search-navbar">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Tìm phòng bạn muốn"></input>
                    <button type="button" className="searchButton">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
        </div>
    )
}

export default SearchGlobal;