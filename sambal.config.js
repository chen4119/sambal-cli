
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
        {
            src: './assets/bg.jpg',
            dest: 'assets/bg.jpg',
            responsive: [
                {
                    srcset: 'assets/bg-480.jpg 480w, assets/bg-320.jpg 320w'
                }
            ]
        }
    ]);
}

module.exports = {
    baseUrl: 'https://sambal.dev',
    routes: [
        {path: '/', render: landing},
        {path: '/about', render: landing},
        {path: '/user/:username', render: landing}
    ],
    sitemap$: sitemap(),
    asset$: asset()
};