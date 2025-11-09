import axios from 'axios';

import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './complainSlice';
const REACT_APP_BASE_URL = "http://localhost:5000";

export const getAllComplains = (id,role, address) => async (dispatch) => {
    dispatch(getRequest());
    console.log(`${REACT_APP_BASE_URL}/${address}List/${id}/${role}`, 'this is clist url')
    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}List/${id}/${role}`);
        console.log(result,'res from comp')
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
