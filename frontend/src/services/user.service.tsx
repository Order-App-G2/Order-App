import axios, { AxiosRequestHeaders } from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:5000";

class UserService {
    getProducts() {
        return axios.get(API_URL + '/home');
    }

    createProduct(title: any,content: any,price: any,category:any ){
        const product = {
            "title": title,
            "content": content,
            "price": price,
            "category": category 
        }
        const token = btoa(``)

        const header = {
            "Authorization": `Basic ${token}`,
            "Content-Type": "application/json"
        }

        return axios.post(API_URL + '/addProduct', product,{headers: header})
    }

    getCustomers() {
        return axios.get(API_URL + '/customer', { headers: authHeader() as AxiosRequestHeaders });
    }

    getCouriers() {
        return axios.get(API_URL + '/getCourier', { headers: authHeader() as AxiosRequestHeaders });
    }
   
    getCategoryFood() {
        return axios.get(API_URL, { headers: authHeader() as AxiosRequestHeaders } );
    }


}

export default new UserService();