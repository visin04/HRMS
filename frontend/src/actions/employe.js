import axios from 'axios';
import ImportedURL from '../utils/api';

export const AC_ADD_EMPLOYEE = (data) => async (dispatch) => {
    try {
        const response = await axios.post(ImportedURL.API.addemp, data);
        dispatch({ type: 'ADD_EMPLOYEE', payload: response.data.result });
        return { success: true};
    } catch (error) {
        console.error('Error adding employee:', error.response.data);
        return { success: false};
       
    }
};

export const AC_LIST_EMPLOYEES = (params) => async (dispatch) => {
    try {
        const response = await axios.get(ImportedURL.API.listemp, { params });
        dispatch({ type: 'LIST_EMPLOYEES', payload: response.data.result });
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
};

export const AC_DELETE_EMPLOYEE = (id) => async (dispatch) => {
    try {
        await axios.post(ImportedURL.API.deleteemp+ `/${id}`);
        dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
};

export const AC_UPDATE_EMPLOYEE = (id,data) => async (dispatch) => {
    try {
        const response = await axios.post(ImportedURL.API.updateemp+ `/${id}`, data);
        dispatch({ type: 'UPDATE_EMPLOYEE', payload: response.data.result });
        console.log('AC_UPDATE_EMPLOYEE response:', response.data.result);
    } catch (error) {
        console.error('Error updating employee:', error);
    }
};

export const AC_VIEW_EMPLOYEE = (id) => async (dispatch) => {
    try {
        const response = await axios.post(ImportedURL.API.viewemp+ `/${id}`);
        dispatch({ type: 'VIEW_EMPLOYEE', payload: response.data.result });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching employee details:', error);
    }
};

export const AC_HANDLECHANGE_EMPLOYEE = (name, value) => (dispatch) => {
    dispatch({ type: 'HANDLECHANGE_EMPLOYEE', name, value });
};

export const AC_CLEAR_EMPLOYEE = () => (dispatch) => {
    dispatch({ type: 'CLEAR_EMPLOYEE' });
};