const initialState = {
    employeeList: [],
    selectedEmployee: null,
    employeeForm: {},
    error: ''
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_EMPLOYEES':
            return { ...state, employeeList: action.payload };
        case 'DELETE_EMPLOYEE':
            return { ...state, employeeList: state.employeeList.filter(emp => emp._id !== action.payload) };
        case 'UPDATE_EMPLOYEE': 
            return { 
                ...state, 
                employeeList:    state.employeeList.map(emp =>
                    emp._id === action.payload._id ? { ...emp, ...action.payload } : emp
                  
                ) 
            };
        case 'VIEW_EMPLOYEE':
            return { ...state, selectedEmployee: action.payload };
        case 'ADD_EMPLOYEE':
            return { ...state, employeeList: [...state.employeeList, action.payload] };
        case 'HANDLECHANGE_EMPLOYEE':
            return {
                ...state,
                employeeForm: { ...state.employeeForm, [action.name]: action.value }
            };
        case 'CLEAR_EMPLOYEE':
            return initialState;
        default:
            return state;
    }
};

export default employeeReducer;