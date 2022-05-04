import { convertTypePostUtils } from "../../../utils/convertTypePostUtils";
import formatDate from "../../../utils/fomatDate";
import './Post.css';
import { Link } from 'react-router-dom';

const Post = (props) => {

    const type = convertTypePostUtils.getNameOfType(props.post.type);
    const date = formatDate(props.post.createdDate);

    return (<tr>
        <th scope="row">{props.post.id}</th>
        <td>{type}</td>
        <td className="column-image-mng">
            <img src={props.post.image.fileName}></img>
        </td>
        <td className="column-title">{props.post.title}</td>
        <td>{props.post.price}</td>
        <td>{date}</td>
        <td>{props.post.address}</td>
        <td>{props.post.phone}</td>
        <td>
            <div className="btn-action">
                <Link className="btn-business" to={`/admin/home/posts-management/wait-ing/${props.post.id}`}>Chi tiết</Link>
                <Link className="btn-business stop-post-btn" to={`/admin/home/posts-management/wait-ing/${props.post.id}`} >Dừng</Link>
            </div>
        </td>
    </tr>
    )
}

export default Post;