import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL
} from "../types";

const initialState = {
    isCreateProduct: false,
    foodCategory: []
}


export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isCreateProduct: true
            }
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                isCreateProduct: false
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                foodCategory: payload.categories
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }

}