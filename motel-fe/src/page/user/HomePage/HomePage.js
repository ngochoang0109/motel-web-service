import MenuPost from "../../../components/user/MenuPost/MenuPost";
import SearchPost from "../../../components/user/SearchPost/SearchPost";
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