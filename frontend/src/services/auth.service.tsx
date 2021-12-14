import { AsyncLocalStorage } from "async_hooks";
import axios from "axios";
import jwt from 'jwt-decode';

const API_URL = "http://localhost:5000/";

interface User {
    public_id: any, 
    exp: any
}


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
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    const user: User= jwt(response.data.token)
                    console.log(user)
                    return  axios.get(API_URL + `customer/${user.public_id}`)
                                .then((res)=>{
                                    console.log(res)
                                })
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