export default function authHeader() {
    const user = JSON.parse(localStorage && localStorage.getItem('user') as string);
    if (user && user.accssToken) {
        return {
            "Authorization": "Basic" + user.accssToken,
            "Content-Type": "application/json"
        }
    } else {
        return {}
    }
}
