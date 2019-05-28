import {
    UPDATE_LOCATION,
    UPDATE_SCREEN_SIZE,
    RECEIVE_LAZY_RESOURCES,
    GET_BLOG_POST
} from '../actions/app.js';
import {html} from 'lit-element';

const INITIAL_STATE = {
    route: null,
    isSmallScreen: false,
    lazyResourcesLoaded: false,
    blogPost: null
};

const getTemplate = function(templateString, html){
    return new Function('html', "return html`"+templateString +"`;").call(this, html);
}

const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {
                ...state,
                route: action.route
            };
        case UPDATE_SCREEN_SIZE:
            return {
                ...state,
                isSmallScreen: action.isSmallScreen
            };
        case RECEIVE_LAZY_RESOURCES:
            return {
              ...state,
              lazyResourcesLoaded: true
            };
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

  