import axios, { AxiosRequestHeaders } from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:5000";

class UserService {
    getProducts() {
        return axios.get(API_URL + '/home');
    }

    createProduct(title: any, content: any, price: any, category: any) {
        const product = {
            "title": title,
            "content": content,
            "price": price,
            "category": category
        }

        const token = JSON.parse(localStorage.getItem("user") as string);

        const header = {
            "Authorization": `Bearer ${token}`,
            "token": token.token,
            "Content-Type": "application/json"
        }


        return axios.post(API_URL + '/addProduct', product, { headers: header as AxiosRequestHeaders })
    }

    getAllCategory() {
        return axios.get(API_URL + '/getAllCategories', { headers: authHeader() as AxiosRequestHeaders })
            .then((res) => {
                return res
            })
    }

    getCustomers() {
        return axios.get(API_URL + '/customer', { headers: authHeader() as AxiosRequestHeaders });
    }

    getCouriers() {
        return axios.get(API_URL + '/getCourier', { headers: authHeader() as AxiosRequestHeaders });
    }

    getFood() {
        return axios.get(API_URL + '/home', { headers: authHeader() as AxiosRequestHeaders })
            .then((res)=>{
                return res
            });
    }


}

export default new UserService();