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

const getProvinceCodeByName=(name)=>{
    const provinces= pcVN.getProvinces();
    const result= provinces.filter(item=>item.name===name);
    return result[0];
}

const getSpecificDistrictByProvinceCodeAndName=(provinceCode, districtName)=>{
    const district=getDistrictsByProvinceCode(provinceCode);
    const result=district.filter(item=>item.name===districtName);
    return result[0];
}

const getSpecificWardByDistrictCodeAndName=(districtCode, wardName)=>{
    const ward=getWardsByDistrictCode(districtCode);
    const result=ward.filter(item=>item.name===wardName);
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
    getWardByCode,
    getProvinceCodeByName,
    getSpecificDistrictByProvinceCodeAndName,
    getSpecificWardByDistrictCodeAndName
}