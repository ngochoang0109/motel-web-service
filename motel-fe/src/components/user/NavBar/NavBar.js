import Header from '../Header/Header';
import SearchGlobal from '../SearchGlobal/SearchGlobal';
import PostButton from '../PostButton/PostButton';
import './NavBar.css';

const NavBar=()=>{
    return(
        <div className="navbar">
            <Header></Header>
            <div className="navbar-action">
                <SearchGlobal></SearchGlobal>
                <PostButton></PostButton>
            </div>
        </div>
    )
};

export default NavBar;