import { postDataAPI, getDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes";

export const TYPES = {
    AUTH: "AUTH"
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })

        const res = await postDataAPI("auth/login", data)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: { token: "Bearer " + res.data.accessToken, user: res.data.user }
        })

        dispatch({
            type: GLOBALTYPES.USER_ROLE,
            payload: res.data.user.role
        })

        dispatch({ type: GLOBALTYPES.LOADING, payload: false })

        localStorage.setItem("firstLogin", true)
        localStorage.setItem("accessToken", "Bearer " + res.data.access_token)
        localStorage.setItem("refreshToken", "Bearer " + res.data.refresh_token)

        dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: res.data.msg })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err.response.data.msg
        })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const regist = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.LOADING, payload: true })

        const res = await postDataAPI("auth/regist", data)

        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
        dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: res.data.msg })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err.response.data.msg
        })
        dispatch({ type: GLOBALTYPES.LOADING, payload: false })
    }
}

export const verifyEmail = ({ token, setIsLoading, setResult }) => async (dispatch) => {
    try {
        setIsLoading(true);
        const res = await getDataAPI(`auth/verify-email/${token}`);
        setResult(res.data.msg);
        setIsLoading(false);
        dispatch({ type: GLOBALTYPES.SUCCESS_ALERT, payload: res.data.msg });
    } catch (err) {
        setResult(err.response.data.msg);
        setIsLoading(false);
        dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: err.response.data.msg });
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("firstLogin")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        await postDataAPI("auth/logout")
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err.response.data.msg
        })
    }
}
export const getUserInfo = (userId, token) => async (dispatch) => {
    try {
        if (!userId) {
            const res = await getDataAPI("auth/get-user-info", token)

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: { token: "Bearer " + res.data.accessToken, user: res.data.user }
            })

            dispatch({
                type: GLOBALTYPES.USER_ROLE,
                payload: res.data.user.role
            })
        }
        const res = await getDataAPI(`auth/get-user-info/${userId}`, token)
        return res.data
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ERROR_ALERT,
            payload: err.response.data.msg
        })
    }
}


