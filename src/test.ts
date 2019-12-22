
const {render, template} = require("sambal");
const {from} = require("rxjs");
const {map} = require("rxjs/operators");
const {bundle} = require("./operators/bundle");

const renderBlogPost = ({headline}) => {
    return template`
    <!DOCTYPE html>
        <html>
            <head>
            <script src="js/index.js"></script>
            </head>
            <body>
                <h1 class="text-primary">${headline}</h1>

                <pre class="language-md"><code class="language-md"><span class="token hr punctuation">---</span>
headline: My first blogpost!
description: Starting my blog with Sambal
author:
    "@id": https://chen4119.me/about.html#about
<span class="token title important">keywords: ["sambal", "jamstack"]
<span class="token punctuation">---</span></span>
Hello world</code></pre>
            </body>
        </html>
    `;
};

function renderPage(obs) {
    return obs.pipe(render(renderBlogPost));
}



from([{headline: "hello world"}])
.pipe(render(renderBlogPost))
