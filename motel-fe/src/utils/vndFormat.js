const vndFormat=(price)=>{
    return price.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
    })
}

export default vndFormat;