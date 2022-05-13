import postConstant from "../../constants/postConstant";

const initialState = {
    accommodationDto:
    {
        acreage: '',
        address: '',
        airConditioner: false,
        bedroom: 0,
        floor: 0,
        fridge: false,
        furniture: false,
        heater: false,
        internet: false,
        parking: false,
        price: 0,
        toilet: 0,
        tower: "",
        x: 0,
        y: 0
    },
    imageDtos: [{ fileName: '', fileType: false }],
    postDto: {
        title: '', brief: '', content: '', createDate: "2022-05-01T06:50:21.992+00:00",
        type: 2,
        updateDate: null
    },
    userDto: { fullName: '', phone: '', roles: [{ id: 0, name: '' }] },
    videoDtos: [{source:''}]
}

const post = (state = initialState, action) => {
    switch (action.type) {
        case postConstant.GET_POST_DETAIL_ADMIN:
            return action.data;
        default:
            return state;
    }
}

export default post;