import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getSubDetailsSuccess,
    getSubDetailsRequest,
    getTeacherdetailsSuccess,
    getPollsSuccess,
    postVotesuccess,
    getPollsforadminsuccess
} from './sclassSlice';
const REACT_APP_BASE_URL = "http://localhost:5000";

export const updatePoll = (fields, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.post(`${REACT_APP_BASE_URL}/${address}`,fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(postVotesuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getPollsforAdmin = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}Get/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getPollsforadminsuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getAllSclasses = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getAllCommunityPolls = (uid,cid, address) => async (dispatch) => {
    dispatch(getRequest());
// '/PollsGet/:uid/:cid'
    try {
        console.log(`${REACT_APP_BASE_URL}/${address}Get/${uid}/${cid}`,'ths is roitre')
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}Get/${uid}/${cid}`);
        console.log(result,'this is res from bckend')
        dispatch(getPollsSuccess(result.data));
    } catch (error) {
        console.log("Error in getAllCommunityPolls:", error); // Also add this
        dispatch(getError(error));
        
    }
}

export const getClassStudents = (id,type) => async (dispatch) => {
    dispatch(getRequest());

    try {
    console.log(`${REACT_APP_BASE_URL}/Sclass/Students/${id}`, 'this is route')
    let url = `${REACT_APP_BASE_URL}/Sclass/Students/${id}`;
    if (type) {
        url += `?type=${type}`;
    }
        const result = await axios.get(url);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getStudentsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getClassDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(detailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getTeacherDetail = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(getTeacherdetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getSubjectList = (id,role, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        let url = `${REACT_APP_BASE_URL}/${address}/${id}`;
        if (role) {
            url += `/${role}`;
        }
        console.log(id, "this is comm id", url)
        const result = await axios.get(url);
        console.log(result, "this is result")
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${REACT_APP_BASE_URL}/FreeSubjectList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getSubjectDetails = (id, address) => async (dispatch) => {
    dispatch(getSubDetailsRequest());

    try {
        console.log(`${REACT_APP_BASE_URL}/${address}/${id}`, 'this routre')
        const result = await axios.get(`${REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data) {
            dispatch(getSubDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}