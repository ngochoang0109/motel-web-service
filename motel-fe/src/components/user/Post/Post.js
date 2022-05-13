import { Link } from "react-router-dom";
import formatDate from "../../../utils/formatDate";

const Post = (props) => {

    const date= formatDate(props.post.createdDate);
    return (
        <tr>
            <th scope="row">{props.post.id}</th>
            <td className="column-image">
                <img src={props.post.image.fileName} alt=""></img>
            </td>
            <td className="column-title">{props.post.title}</td>
            <td>{props.post.price}</td>
            <td>{date}</td>
            <td>{props.post.address}</td>
            <td>
                <div className="btn-action">
                    <Link className="btn-business" to={`/home/user/post/edit-post/${props.post.id}`}>Sửa</Link>
                    <Link className="btn-business stop-post-btn" to={`/home/user/post/edit-post/${props.post.id}`}>Xóa</Link>
                </div>
            </td>
        </tr>)
}

export default Post;