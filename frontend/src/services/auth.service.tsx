import { AsyncLocalStorage } from "async_hooks";
import axios from "axios";
const API_URL = "http://localhost:5000/";


class AuthService {
    login(username: any, password: any) {
        const user = {
            username,
            password
        }
        const token = btoa(`${username}:${password}`)

        const header = {
            "Authorization": `Basic ${token}`,
            "Content-Type": "application/json"
        }

        return axios
            .post(API_URL + 'login', user , {headers: header})
            .then((response) => {
                if (response.data.accsessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user")
    }

    registerCourier(username: any, password: any, email: any) {
        const courier = {
            "username": username,
            "password": password,
            "email": email
        }

        return axios.post(API_URL + 'createCourier', courier)
    }

    registerPartner(username: any, password: any, email: any) {
        const partner = {
            "username": username,
            "password": password,
            "email": email
        }

        return axios.post(API_URL + 'createPartner', partner)
    }

    registerCustomer(username: any, password: any, email: any, phoneNumber: any, address: any) {
        const user = {
            "username": username,
            "password": password,
            "email": email,
            "phone_number": phoneNumber,
            "address": address
        }

        return axios.post(API_URL + 'createCustomer', user);
    }
}
export default new AuthService();