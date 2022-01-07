import { AsyncLocalStorage } from "async_hooks";
import axios from "axios";
import jwt from 'jwt-decode';

const API_URL = "http://localhost:5000/";

interface User {
    public_id: any,
    exp: any
}


class AuthService {
    login(username: any, password: any, reCaptchaToken: any) {
        const user = {
            username,
            password,
            token: reCaptchaToken
        }
        const token = btoa(`${username}:${password}`)

        const header = {
            "Authorization": `Basic ${token}`,
            "Content-Type": "application/json"
        }

        return axios
            .post(API_URL + 'login', user, { headers: header })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    // const token: User = jwt(response.data.token)
                    const header = {
                            'token': response.data.token
                    }
                    return axios.get(API_URL + `userRole`, {headers: header})
                        .then((res) => {
                            return  res.data.usertype
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

    forgottenPassword(email: string) {
        return axios.post(API_URL + 'forgottenPassword', {email});
    }

    resetPassword(token: string, password: string){
        return axios.post(API_URL + '/reset_login/'+token, {password});
    }
}

export default new AuthService();