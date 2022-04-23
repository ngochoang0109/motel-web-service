const pcVN = require('pc-vn')

const getAllProvinces=()=>{
    const provinces = pcVN.getProvinces();
    return provinces;
}

const getAllDistricts=()=>{
    return pcVN.getDistricts;
}

const getWards=()=>{
    return pcVN.getWards;
}

const getDistrictsByProvinceCode=(provinceCode)=>{
    if(!provinceCode){
        return {};
    }
    return pcVN.getDistrictsByProvinceCode(provinceCode);
}

const getWardsByDistrictCode=(districtCode)=>{
    return pcVN.getWardsByDistrictCode(districtCode);
}

const getProvinceByCode=(provinceCode)=>{
    
    const provinces= pcVN.getProvinces();
    const result=provinces.filter(item=>item.code===provinceCode);
    return result[0];
};

const getDistrictByCode=(districtCode)=>{
    const districts=pcVN.getDistricts();
    const result= districts.filter(item=>item.code===districtCode);
    return result[0];
}

const getWardByCode=(wardCode)=>{
    const wards=pcVN.getWards();
    const result= wards.filter(item=>item.code===wardCode);
    return result[0];
}

export const provinceAPI = {
    getAllProvinces,
    getAllDistricts,
    getWards,
    getDistrictsByProvinceCode,
    getWardsByDistrictCode,
    getProvinceByCode,
    getDistrictByCode,
    getWardByCode
}