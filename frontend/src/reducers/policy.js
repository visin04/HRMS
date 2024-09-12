const initialState = {
    policyList: [],
    selectedPolicy: null,
    policyForm: {},
    error: ''
};

const policyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_POLICIES':
            return { ...state, policyList: action.payload };
        case 'DELETE_POLICY':
            return { ...state, policyList: state.policyList.filter(policy => policy._id !== action.payload) };
        case 'UPDATE_POLICY': 
            return { 
                ...state, 
                policyList: state.policyList.map(policy =>
                    policy._id === action.payload._id ? { ...policy, ...action.payload } : policy
                ) 
            };
        case 'VIEW_POLICY':
            return { ...state, selectedPolicy: action.payload };
        case 'ADD_POLICY':
            return { ...state, policyList: [...state.policyList, action.payload] };
        case 'HANDLECHANGE_POLICY':
            return {
                ...state,
                policyForm: { ...state.policyForm, [action.name]: action.value }
            };
        case 'CLEAR_POLICY':
            return initialState;
        default:
            return state;
    }
};

export default policyReducer;
