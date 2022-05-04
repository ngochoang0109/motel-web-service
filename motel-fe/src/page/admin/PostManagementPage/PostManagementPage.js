import { useRouteMatch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import PostDetailPage from '../PostDetailPage/PostDetailPage';
import Posts from './../../../components/admin/Posts/Posts';

const PostManagementPage = () => {

    const { path } = useRouteMatch();

    return (
        <>
            <Route path={`${path}/:name`} exact>
                <Posts ></Posts>
            </Route>
            <Route path={`${path}/:name/:id`} exact>
                <PostDetailPage ></PostDetailPage>
            </Route>
        </>

    )
}

export default PostManagementPage;