import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    SET_MESSAGE,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS
} from "../types";
import UserService from "../../services/user.service"

export const createProduct = (title: string, content: string, price: number, category_id: number) => (dispatch: any) => {
    return UserService.createProduct(title, content, price, category_id)
        .then((response) => {
            dispatch({
                type: CREATE_PRODUCT_SUCCESS
            })
            dispatch({
                type: CREATE_PRODUCT_FAIL,
                payload: response.data.message
            })
            return Promise.resolve();
        },
            (error) => {
                const message =
                    (error.response &&
                        error.response.data &&

                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                dispatch({
                    type: CREATE_PRODUCT_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
        )
}


export const getCategory = () => (dispatch: any) => {
    return UserService.getAllCategory()
        .then((response) => {
            dispatch({
                type: GET_CATEGORY_SUCCESS, 
                payload: response.data
            })
            dispatch({
                type: GET_CATEGORY_FAIL,
                payload: response.data.message            
            })

            return Promise.resolve();

        })
}