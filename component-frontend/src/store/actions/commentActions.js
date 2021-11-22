import axiosApi from '../../axiosApi';

export const FETCH_REQUEST_COMMENTS = 'FETCH_REQUEST_COMMENTS';
export const FETCH_SUCCESS_COMMENTS = 'FETCH_SUCCESS_COMMENTS';
export const FETCH_FAILURE_COMMENTS = 'FETCH_FAILURE_COMMENTS';

export const fetchRequestComments = () => ({type: FETCH_REQUEST_COMMENTS});
export const fetchSuccessComments = c => ({type: FETCH_SUCCESS_COMMENTS, payload: c});
export const fetchFailureComments = e => ({type: FETCH_FAILURE_COMMENTS, payload: e});


export const CREATE_REQUEST_COMMENTS = 'CREATE_REQUEST_COMMENTS';
export const CREATE_SUCCESS_COMMENTS = 'CREATE_SUCCESS_COMMENTS';
export const CREATE_FAILURE_COMMENTS = 'CREATE_FAILURE_COMMENTS';

export const DELETE_REQUEST_COMMENTS = 'DELETE_REQUEST_COMMENTS';
export const DELETE_SUCCESS_COMMENTS = 'DELETE_SUCCESS_COMMENTS';
export const DELETE_FAILURE_COMMENTS = 'DELETE_FAILURE_COMMENTS';

export const createRequestComments = () => ({type: CREATE_REQUEST_COMMENTS});
export const createSuccessComments = c => ({type: CREATE_SUCCESS_COMMENTS, payload: c});
export const createFailureComments = e => ({type: CREATE_FAILURE_COMMENTS, payload: e});

export const deleteRequestComments = () => ({type: DELETE_REQUEST_COMMENTS});
export const deleteSuccessComments = c => ({type: DELETE_SUCCESS_COMMENTS, payload: c});
export const deleteFailureComments = e => ({type: DELETE_FAILURE_COMMENTS, payload: e});

export const getComments = id => async dispatch => {
    try {
        dispatch(fetchRequestComments());
        const {data} = await axiosApi.get('/comments?posts_id=' + id);
        dispatch(fetchSuccessComments(data));
    } catch (e) {
        dispatch(fetchFailureComments(e));
    }
};



export const createComments = news => async dispatch => {
    try {
        dispatch(createRequestComments());
        const {data} = await axiosApi.post('/comments', news);
        dispatch(getComments(data.posts_id));
    } catch (e) {
        dispatch(createFailureComments(e))
    }
};

export const deleteComments = (id) => async dispatch => {
    try {
        dispatch(deleteRequestComments());
        await axiosApi.delete('/comments/' + id);
        dispatch(deleteSuccessComments(id))
    } catch (e) {
        dispatch(deleteFailureComments(e));
    }
}
