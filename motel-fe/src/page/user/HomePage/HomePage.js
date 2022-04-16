import MenuPost from "../../../components/user/Layout/Main/MenuPost/MenuPost";
import SearchPost from "../../../components/user/Layout/Main/SearchPost/SearchPost"
import './HomePage.css';
const HomePage = () => {
    return (
        <>
            <SearchPost></SearchPost>
            <div className="content">
                <MenuPost></MenuPost>
            </div>
        </>
    )
}
export default HomePage;