import * as ActionTypes from  './ActionTypes';
import { createPortal } from 'react-dom';

export const addComment = (dishId, rating, author, comment) => ({
    type : ActionTypes.ADD_COMMENT,
    payload : {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }
});