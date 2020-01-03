
const {render, template} = require("sambal");

const renderBlogPost = ({headline, text}) => {
    return template`
    <!DOCTYPE html>
        <html>
            <head>
            <script src="./js/index.js"></script>
            </head>
            <body>
                <h1 class="text-primary">${headline}</h1>
                <i class="fab fa-github-square"></i>
            </body>
        </html>
    `;
};


function route(store) {
    return store
    .content()
    .pipe(render(renderBlogPost));
}

module.exports = {
    host: "https://chen4119.me",
    contentPath: "content",
    collections: null,
    route$: route
};