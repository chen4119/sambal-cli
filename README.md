
# [Sambal CLI](https://sambal.dev)

## Intro

Build fast and SEO friendly website with [RxJs](https://rxjs-dev.firebaseapp.com/).  No new template syntax to learn, just pure Javascript template literal.  Support schema.org vocabularies and json-ld (json linked data) format.

## Installation

```sh
npm install --save-dev sambal-cli sambal

touch sambal.config.js
```

## Sample `sambal.config.js`

```js
const {from, of} = require("rxjs");
const {render, template} = require("sambal");

function sitemap() {
    return from([
        '/first-blog',
    ]);
}

function render({path, params}) {
    return of({headline: "hello world"})
    .pipe(render(({headline}) => {
        return template`
            <html>
                <body>
                    <h1>${headline}</h1>
                </body>
            </html>
        `;
    }));
}

function sitemap() {
    return from([
        '/',
        '/user/user123',
    ]);
}

module.exports = {
    routes: [
        {path: '/', render: render},                 // REQUIRED. Array of routes.  Path is an expressjs style path, render is a function of type ({path, params}) => Observable  
        {path: '/user/:username', render: render}
    ],
    sitemap$: sitemap()                              // REQUIRED.  Observable of all possible urls in your website.  
};
```

## Generate static site

```sh
npx sambal build
```

## Start dev server and reload browser on change event

```sh
npx sambal serve
```

## Generate schema.org boilerplate type in yaml or json format

```sh
npx sambal schema.org <schema.org type> <output file> [-f, --full]
```

For example,

```sh
npx sambal schema.org person person.yml

npx sambal schema.org blogposting blog.json
```