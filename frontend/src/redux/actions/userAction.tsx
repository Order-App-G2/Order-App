import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    SET_MESSAGE,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_FOOD_FAIL,
    GET_FOOD_SUCCESS,
    GET_PARTNER_FOOD_SUCCESS,
    GET_PARTNER_FOOD_FAIL,
    ADD_TO_CARD_SUCESS,
    REMOVE_FROM_CARD,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    RESET_CARD,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL
} from "../types";
import UserService, { orderProduct } from "../../services/user.service"

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

export const createOrder = (partner_id: number, orders: orderProduct[]) => (dispatch: any) => {
    return UserService.createOrder(partner_id, orders)
        .then((response) => {
            dispatch({
                type: CREATE_ORDER_SUCCESS
            })
            dispatch({
                type: CREATE_ORDER_FAIL,
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
                    type: CREATE_ORDER_FAIL,
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

export const getProduct = () => (dispatch: any) => {
    return UserService.getFood()
        .then((response) => {
            dispatch({
                type: GET_FOOD_SUCCESS,
                payload: response.data
            })
            dispatch({
                type: GET_FOOD_FAIL,
                payload: response.data.message
            })

            return Promise.resolve();

        })
}

export const getPartnerProducts = () => (dispatch: any) => {
    return UserService.getPartnerProducts()
        .then((response) => {
            dispatch({
                type: GET_PARTNER_FOOD_SUCCESS,
                payload: response.data
            })
            dispatch({
                type: GET_PARTNER_FOOD_FAIL,
                payload: response.data.message
            })

            return Promise.resolve();

        })
}

export const deleteProduct = (product_id: any) => (dispatch: any) => {
    return UserService.deleteProduct(product_id)
        .then((response) => {
            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
            })
            dispatch({
                type: DELETE_PRODUCT_FAIL,
                payload: response.data.message
            })

            return Promise.resolve();

        })
}

export const addToCard = (meal: any) => (dispatch: any) => {
    return dispatch({ type: ADD_TO_CARD_SUCESS, payload: meal });
}

export const resetCard = () => (dispatch: any) => {
    return dispatch({ type: RESET_CARD, });
}

export const removeFromCard = (index: number) => (dispatch: any) => {
    return dispatch({ type: REMOVE_FROM_CARD, payload: index });
}