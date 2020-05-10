
const {of, from} = require("rxjs");
const {render} = require("sambal");
const {renderBlogPost} = require("./js/render");

function landing({path, params}) {
    return of({
        url: "https://chen4119.me",
        headline: 'headline',
        text: 'hello world'
    }).pipe(render(renderBlogPost));
}

function sitemap() {
    return from([
        '/',
        '/about',
        '/user/chen4119',
    ]);
}

function asset() {
    return from([
        './assets/bg.jpg'
    ]);
}

module.exports = {
    routes: [
        {path: '/', render: landing},
        {path: '/about', render: landing},
        {path: '/user/:username', render: landing}
    ],
    sitemap$: sitemap(),
    asset$: asset()
};