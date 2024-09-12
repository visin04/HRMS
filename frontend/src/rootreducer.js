import { combineReducers } from 'redux';

import faqReducer from './reducers/Faq';

import departmentReducer from './reducers/Department';
import documentReducer from './reducers/document';
import employeeReducer from './reducers/employe';   
import leaveReducer from './reducers/Leave';
import policyReducer from './reducers/policy';


export default combineReducers({
    faqReducer,
    departmentReducer,
    documentReducer,
    employee:employeeReducer,
    policy: policyReducer,
    leaveReducer,
})






