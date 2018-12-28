import * as marked from 'marked';
export const GET_BLOG_POST = 'GET_BLOG_POST';

export const fetchBlog = () => async (dispatch) => {
    const response = await fetch(`../data/types/blog/about.md`);
    const text = await response.text();
    const html =  window.marked(text);
    console.log('got html');
    dispatch({
        type: GET_BLOG_POST,
        content: html
    });
};
