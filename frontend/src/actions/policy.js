import axios from 'axios';
import ImportedURL from '../utils/api';

export const AC_ADD_POLICY = (data) => async (dispatch) => {
    try {
        const response = await axios.post(ImportedURL.API.addPolicy, data);
        dispatch({ type: 'ADD_POLICY', payload: response.data.result });
        return { success: true };
    } catch (error) {
        console.error('Error adding policy:', error.response?.data || error.message);
        return { success: false };
    }
};

export const AC_LIST_POLICIES = (params) => async (dispatch) => {
    try {
        const response = await axios.get(ImportedURL.API.listPolicy, { params });
        dispatch({ type: 'LIST_POLICIES', payload: response.data});
       
    } catch (error) {
        console.error('Error fetching policies:', error.response?.data || error.message);
    }
};

export const AC_DELETE_POLICY = (id) => async (dispatch) => {
    try {
        await axios.post(`${ImportedURL.API.softDeletePolicy}/${id}`);
        dispatch({ type: 'DELETE_POLICY', payload: id });
    } catch (error) {
        console.error('Error deleting policy:', error.response?.data || error.message);
    }
};

export const AC_UPDATE_POLICY = (id, data) => async (dispatch) => {
    try {
        const response = await axios.post(`${ImportedURL.API.updatePolicy}/${id}`, data);
        dispatch({ type: 'UPDATE_POLICY', payload: response.data.result });
        console.log('AC_UPDATE_POLICY response:', response.data.result);
    } catch (error) {
        console.error('Error updating policy:', error.response?.data || error.message);
    }
};

export const AC_VIEW_POLICY = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${ImportedURL.API.viewPolicy}/${id}`);
        dispatch({ type: 'VIEW_POLICY', payload: response.data });
        return response.data;
    } catch (error) {
        console.error('Error fetching policy details:', error.response?.data || error.message);
    }
};

export const AC_HANDLECHANGE_POLICY = (name, value) => (dispatch) => {
    dispatch({ type: 'HANDLECHANGE_POLICY', name, value });
};

export const AC_CLEAR_POLICY = () => (dispatch) => {
    dispatch({ type: 'CLEAR_POLICY' });
};
