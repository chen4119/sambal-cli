import {
    GET_BLOG_POST
} from '../actions/app.js';
import {html} from '@polymer/lit-element';

const INITIAL_STATE = {
    blogPost: null
};

const getTemplate = function(templateString, html){
    return new Function('html', "return html`"+templateString +"`;").call(this, html);
}

const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BLOG_POST:
            return {
                ...state,
                blogPost: getTemplate(action.content, html)
            };
        default:
            return state;
    }
};

export default app;
  