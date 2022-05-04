import formatDate from "../../../utils/fomatDate";

const Post = (props) => {

    const date= formatDate(props.post.createdDate);
    return (
        <tr>
            <th scope="row">{props.post.id}</th>
            <td className="column-image">
                <img src={props.post.image.fileName}></img>
            </td>
            <td className="column-title">{props.post.title}</td>
            <td>{props.post.price}</td>
            <td>{date}</td>
            <td>{props.post.address}</td>
            <td>
                <div className="btn-action">
                    <button className="btn-business" type="submit">Sửa</button>
                    <button className="btn-business stop-post-btn" type="submit">Dừng</button>
                </div>
            </td>
        </tr>)
}

export default Post;