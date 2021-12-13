import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "../types";
import AuthService from "../../services/auth.service"

export const registerCustomer = (username: any, password: any, email: any, phone_number: any, address: any) => (dispatch: any) => {
    return AuthService.registerCustomer(username, password, email, phone_number, address)
        .then((response) => {
            dispatch({
                type: REGISTER_SUCCESS
            })

            dispatch({
                type: SET_MESSAGE,
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
                    type: REGISTER_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
        )
}


export const registerPartner = (username: any, password: any, email: any) => (dispatch: any) => {
    return AuthService.registerPartner(username, password, email)
        .then((response) => {
            dispatch({
                type: REGISTER_SUCCESS
            })

            dispatch({
                type: SET_MESSAGE,
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
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
        )
}

export const registerCourier = (username: any, password: any, email: any) => (dispatch: any) => {
   return AuthService.registerCourier(username, password, email)
   .then((response) => {
    dispatch({
        type: REGISTER_SUCCESS
    })

    dispatch({
        type: SET_MESSAGE,
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
        type: REGISTER_FAIL,
    });

    dispatch({
        type: SET_MESSAGE,
        payload: message,
    });

    return Promise.reject();
}
)
}



export const login = (username: any, password: any) => (dispatch: any) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });

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
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch: any) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};

export const 