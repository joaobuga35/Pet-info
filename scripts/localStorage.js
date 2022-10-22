export {getlocalStorage}
const getlocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user')) || ""
    return user
}