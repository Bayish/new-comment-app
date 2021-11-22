import axiosApi from '../../axiosApi';

export const FETCH_REQUEST_NEWS = 'FETCH_REQUEST_NEWS';
export const FETCH_SUCCESS_NEWS = 'FETCH_SUCCESS_NEWS';
export const FETCH_FAILURE_NEWS = 'FETCH_FAILURE_NEWS';

export const fetchRequestNews = () => ({type: FETCH_REQUEST_NEWS});
export const fetchSuccessNews = news => ({type: FETCH_SUCCESS_NEWS, payload: news});
export const fetchFailureNews = e => ({type: FETCH_FAILURE_NEWS, payload: e});

export const FETCH_REQUEST_NEWS_ITEM = 'FETCH_REQUEST_NEWS_ITEM';
export const FETCH_SUCCESS_NEWS_ITEM = 'FETCH_SUCCESS_NEWS_ITEM';
export const FETCH_FAILURE_NEWS_ITEM = 'FETCH_FAILURE_NEWS_ITEM';

export const fetchRequestNewsItem = () => ({type: FETCH_REQUEST_NEWS_ITEM});
export const fetchSuccessNewsItem = news => ({type: FETCH_SUCCESS_NEWS_ITEM, payload: news});
export const fetchFailureNewsItem = e => ({type: FETCH_FAILURE_NEWS_ITEM, payload: e});

export const CREATE_REQUEST_NEWS = 'CREATE_REQUEST_NEWS';
export const CREATE_SUCCESS_NEWS = 'CREATE_SUCCESS_NEWS';
export const CREATE_FAILURE_NEWS = 'CREATE_FAILURE_NEWS';

export const UPDATE_REQUEST_NEWS = 'UPDATE_REQUEST_NEWS';
export const UPDATE_SUCCESS_NEWS = 'UPDATE_SUCCESS_NEWS';
export const UPDATE_FAILURE_NEWS = 'UPDATE_FAILURE_NEWS';

export const DELETE_REQUEST_NEWS = 'DELETE_REQUEST_NEWS';
export const DELETE_SUCCESS_NEWS = 'DELETE_SUCCESS_NEWS';
export const DELETE_FAILURE_NEWS = 'DELETE_FAILURE_NEWS';

export const createRequestNews = () => ({type: CREATE_REQUEST_NEWS});
export const createSuccessNews = () => ({type: CREATE_SUCCESS_NEWS});
export const createFailureNews = e => ({type: CREATE_FAILURE_NEWS, payload: e});

export const updateRequestNews = () => ({type: UPDATE_REQUEST_NEWS});
export const updateSuccessNews = news => ({type: UPDATE_SUCCESS_NEWS, payload: news});
export const updateFailureNews = e => ({type: UPDATE_FAILURE_NEWS, payload: e});

export const deleteRequestNews = () => ({type: DELETE_REQUEST_NEWS});
export const deleteSuccessNews = id => ({type: DELETE_SUCCESS_NEWS, payload: id});
export const deleteFailureNews = e => ({type: DELETE_FAILURE_NEWS, payload: e});

export const getNews = () => async dispatch => {
    try {
        dispatch(fetchRequestNews());
        const {data} = await axiosApi.get('/news');
        dispatch(fetchSuccessNews(data));
    } catch (e) {
        dispatch(fetchFailureNews(e));
    }
};

export const getNewsItem = id => async dispatch => {
    try {
        dispatch(fetchRequestNewsItem());
        const {data} = await axiosApi.get(`/news/${id}`);
        dispatch(fetchSuccessNewsItem(data));
    } catch (e) {
        dispatch(fetchFailureNewsItem(e));
    }
};

export const createNews = news => async dispatch => {
    try {
        dispatch(createRequestNews());
        await axiosApi.post('/news', news);
        dispatch(createSuccessNews());
    } catch (e) {
        dispatch(createFailureNews(e))
    }
};

export const updatePost = (id, news) => async dispatch => {
    try {
        dispatch(updateRequestNews());
        const {data} = await axiosApi.put('/news/' + id, news);
        dispatch(updateSuccessNews(data))
    } catch (e) {
        dispatch(updateFailureNews(e));
    }
}

export const removePost = id => async dispatch => {
    try {
        dispatch(deleteRequestNews());
        await axiosApi.delete(`/news/${id}`);
        dispatch(deleteSuccessNews(id))
    } catch (e) {
        dispatch(deleteFailureNews(e));
    }
}
