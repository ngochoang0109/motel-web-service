import { LocationDefault } from "../../../utils/LocationDefault";
import MapContainer from "../../Map/MapContainer";

const PostDetail = () => {
    return (
        <div className="content">
            <div className="header-post">
                <h3>Tieu de cua bai dang</h3>
                <button>Khoa bai</button>
                <button>Duyet bai</button>
            </div>
            <div className="content-post">
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className='map-block'>
                    <MapContainer
                        location={LocationDefault}
                        zoomLevel={14}
                        // handlerLocation={handlerLocationSelect}
                        address={{
                            provinceName: '',
                            districtName:'',
                            wardName: '',
                            houseAndStreet:''
                        }}>
                    </MapContainer>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
                <div className="information-detail">
                    <p>infor</p>
                    <p>data</p>
                </div>
            </div>
        </div>
    )
}

export default PostDetail;