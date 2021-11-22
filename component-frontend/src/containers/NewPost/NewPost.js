import {Typography} from "@material-ui/core";
import NewsForm from "../../components/NewsForm/NewsForm";
import {useDispatch} from "react-redux";
import {createNews} from '../../store/actions/newsActions';


const NewPost = ({history}) => {
    const dispatch = useDispatch();

    const createProductHandler = async productData => {
        await dispatch(createNews(productData));
        history.replace('/');
    };

    return (
        <>
            <Typography variant="h4">New product</Typography>
            <NewsForm onSubmit={createProductHandler}/>
        </>
    );
};

export default NewPost;