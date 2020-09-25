
const {of, from, empty} = require("rxjs");
const {render, template} = require("sambal");

const mockRender = ({path, params}) => {
    return template`
    <!DOCTYPE html>
        <html>
            <body>
                <h1>${path}</h1>
                ${params ? Object.keys(params).map(key => template`<p>${key}=${params[key]}</p>`) : null}
            </body>
        </html>
    `;
};

function renderer({path, params}) {
    return of({
        path: path,
        params: params
    }).pipe(render(mockRender));
}

function sitemap() {
    return from([
        "/about",
        "/user/chen"
    ]);
}

function asset() {
    /* TODO: What if src doesn't exist??  Handle error
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
    ]);*/
    return empty();
}

module.exports = {
    baseUrl: "https://example.com",
    routes:  [
        {path: "/about", render: renderer},
        {path: "/user/:username", render: renderer}
    ],
    sitemap$: sitemap(),
    asset$: asset()
};