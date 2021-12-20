import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_FOOD_FAIL,
    GET_FOOD_SUCCESS,
    ADD_TO_CARD_SUCESS,
    REMOVE_FROM_CARD,
} from "../types";

const initialState = {
    isCreateProduct: false,
    foodCategory: [], 
    allProducts: [],
    cardItems: []
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
            case GET_FOOD_SUCCESS:
            return {
                ...state,
                allProducts: payload.products
            }
            case GET_FOOD_FAIL:
            return {
                ...state,
            }
            case ADD_TO_CARD_SUCESS:
                return {
                    ...state,
                    cardItems: [...state.cardItems, payload]
                }
            case REMOVE_FROM_CARD:
                const newCardItems = [...state.cardItems]
                newCardItems.splice(payload, 1); 
                return {
                    ...state,
                    cardItems: [...newCardItems]
                }
        default:
            return state;
    }

}