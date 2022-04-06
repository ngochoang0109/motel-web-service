export function getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('tokenUser'));
    if(user) {
        return user;
    }
    return null;
}