import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    SET_MESSAGE
} from "../types";
import UserService from "../../services/user.service"

export const createProduct = (title: string, content: string, price: number, category: string) => (dispatch: any) => {
    return UserService.createProduct(title, content, price, category)
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