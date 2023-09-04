import { ADD_SV, DELETE_SV, SELECTED_SV, UPDATE_SV } from "../types/userType"

export const addSVAction = (data) =>{
    return {
        type: ADD_SV,
        payload: data
    }
}
export const selectedSVAction = (data) =>{
    return {
        type: SELECTED_SV,
        payload: data
    }
}
export const updateSVAction = (data) =>{
    return {
        type: UPDATE_SV,
        payload: data
    }
}
export const deleteSVAction = (data) =>{
    return {
        type: DELETE_SV,
        payload: data
    }
}