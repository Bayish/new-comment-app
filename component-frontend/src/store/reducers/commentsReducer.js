import {
    CREATE_FAILURE_COMMENTS,
    CREATE_REQUEST_COMMENTS,
    CREATE_SUCCESS_COMMENTS,
    DELETE_FAILURE_COMMENTS,
    DELETE_REQUEST_COMMENTS,
    DELETE_SUCCESS_COMMENTS,
    FETCH_FAILURE_COMMENTS,
    FETCH_REQUEST_COMMENTS,
    FETCH_SUCCESS_COMMENTS,
} from "../actions/commentActions";


const initializeState = {
    loading: false,
    comments: [],
    error: null,
}
const commentsReducer = (state = initializeState, action) => {
    switch (action.type) {
        case FETCH_REQUEST_COMMENTS:
            return {...state, loading: true};
        case FETCH_SUCCESS_COMMENTS:
            return {...state, loading: false, comments: action.payload};
        case FETCH_FAILURE_COMMENTS:
            return {...state, loading: false, error: action.payload};
        case CREATE_REQUEST_COMMENTS:
            return {...state, loading: true};
        case CREATE_SUCCESS_COMMENTS:
            return {...state, loading: false, comments: [...state.news, ...action.payload]};
        case CREATE_FAILURE_COMMENTS:
            return {...state, loading: false, error: action.payload};
        case DELETE_REQUEST_COMMENTS:
            return {...state, loading: true};
        case DELETE_SUCCESS_COMMENTS:
            return {
                ...state,
                loading: false,
                comments: state.comments.filter(c => c.id !== action.payload)
            };
        case DELETE_FAILURE_COMMENTS:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default commentsReducer;