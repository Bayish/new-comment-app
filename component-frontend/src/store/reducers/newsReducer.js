import {
    FETCH_REQUEST_NEWS,
    FETCH_SUCCESS_NEWS,
    FETCH_FAILURE_NEWS,
    CREATE_REQUEST_NEWS,
    CREATE_SUCCESS_NEWS,
    CREATE_FAILURE_NEWS,
    UPDATE_REQUEST_NEWS,
    UPDATE_SUCCESS_NEWS,
    UPDATE_FAILURE_NEWS,
    FETCH_REQUEST_NEWS_ITEM,
    FETCH_SUCCESS_NEWS_ITEM, FETCH_FAILURE_NEWS_ITEM, DELETE_REQUEST_NEWS, DELETE_SUCCESS_NEWS, DELETE_FAILURE_NEWS
} from "../actions/newsActions";

const initializeState = {
    loading: false,
    singleLoading: false,
    news: [],
    newsItem: null,
    error: null,
}
const newsReducer = (state = initializeState, action) => {
    switch (action.type) {
        case FETCH_REQUEST_NEWS:
            return {...state, loading: true};
        case FETCH_SUCCESS_NEWS:
            return {...state, loading: false, news: action.payload};
        case FETCH_FAILURE_NEWS:
            return {...state, loading: false, error: action.payload};
        case FETCH_REQUEST_NEWS_ITEM:
            return {...state, singleLoading: true};
        case FETCH_SUCCESS_NEWS_ITEM:
            return {...state, singleLoading: false, newsItem: action.payload};
        case FETCH_FAILURE_NEWS_ITEM:
            return {...state, singleLoading: false, error: action.payload};
        case CREATE_REQUEST_NEWS:
            return {...state, loading: true};
        case CREATE_SUCCESS_NEWS:
            return {...state, loading: false, error: null};
        case CREATE_FAILURE_NEWS:
            return {...state, loading: false, error: action.payload};
        case UPDATE_REQUEST_NEWS:
            return {...state, loading: true};
        case UPDATE_SUCCESS_NEWS:
            return {
                ...state,
                loading: false,
                news: state.news.map(n => n.id === action.payload.id ? action.payload : n)
            };
        case UPDATE_FAILURE_NEWS:
            return {...state, loading: false, error: action.payload};
        case DELETE_REQUEST_NEWS:
            return {...state, loading: true};
        case DELETE_SUCCESS_NEWS:
            return {...state, loading: false, news: state.news.filter(n => n.id !== action.payload)};
        case DELETE_FAILURE_NEWS:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default newsReducer;