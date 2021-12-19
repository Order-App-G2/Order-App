import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL
} from "../types";

const initialState = {
    isCreateProduct: false
}


export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PRODUCT_SUCCESS: 
            return{
                ...state, 
                isCreateProduct: true
            }
        case CREATE_PRODUCT_FAIL: 
            return{
                ...state,
                isCreateProduct: false 
            }
        default:
            return state;
    }

}