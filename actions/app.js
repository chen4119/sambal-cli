import * as marked from 'marked';
import {SambalReader} from 'sambal-fs/dist/SambalReader';
export const GET_BLOG_POST = 'GET_BLOG_POST';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_SCREEN_SIZE = 'UPDATE_SCREEN_SIZE';
export const RECEIVE_LAZY_RESOURCES = 'RECEIVE_LAZY_RESOURCES';

const BLOG_TYPE = {
    name: "blog",
    primaryKey: "id",
    indexFields: ["year", "tags", "author"],
    contentType: 'markdown'
}

const ALL_BLOGS_COLLECTION = {
    name: "allBlogs",
    type: BLOG_TYPE,
    sortBy: [{
        field: "year",
        order: "desc"
    }]
};

const BLOGS_BY_AUTHOR = {
    name: "blogsByAuthor",
    type: BLOG_TYPE,
    partitionBy: ["tags", "author"]
};

export const updateLocation = (path) => (dispatch, getState) => {
    console.log('UPDATE LOCATION CALLED WITH: ' + path);
    dispatch({
        type: UPDATE_LOCATION,
        route: path
    });
};

export const updateScreenSize = (isSmallScreen) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_SCREEN_SIZE,
        isSmallScreen
    });
};

export const receivedLazyResources = () => (dispatch, getState) => {
    dispatch({
        type: RECEIVE_LAZY_RESOURCES
    });
};

/*
const reader = new SambalReader({
    types: [BLOG_TYPE], 
    collections: [ALL_BLOGS_COLLECTION, BLOGS_BY_AUTHOR]
}, {
    type: "local",
    host: "../data"
});

export const fetchBlog = () => async (dispatch) => {
    // const response = await fetch(`../data/types/blog/about.md`);
    // const text = await response.text();
    const partition = await reader.getCollectionPartition("blogsByAuthor", {partitionKey: {
        author: "Wan Chun Chen",
        tags: "angular"
    }});
    console.log(partition);
    const text = await reader.getObject("blog", {id: "about"});
    const html =  window.marked(text);
    console.log('got html');
    dispatch({
        type: GET_BLOG_POST,
        content: html
    });
};*/
