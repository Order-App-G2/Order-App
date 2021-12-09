import axios, { AxiosRequestHeaders } from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:5000";

class UserService {
    getProducts() {
        return axios.get(API_URL + '/home');
    }

    getCustomers() {
        return axios.get(API_URL + '/customer', { headers: authHeader() as AxiosRequestHeaders });
    }

    getCouriers() {
        return axios.get(API_URL + '/getCourier', { headers: authHeader() as AxiosRequestHeaders });
    }
    getPartners() {
        // return axios.get(API_URL + '/getCourier', { headers: authHeader() as AxiosRequestHeaders });
    }

    //   getAdminBoard() {
    //     return axios.get(API_URL + '/', { headers: authHeader() as AxiosRequestHeaders });
    //   }

}

export default new UserService();