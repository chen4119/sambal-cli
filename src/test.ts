
const {render, template} = require("sambal");
const {from} = require("rxjs");
const {map} = require("rxjs/operators");
import {build} from "./webpack";
import path from "path";

const renderBlogPost = ({headline}) => {
    return template`
    <!DOCTYPE html>
        <html>
            <head>
            <script src="js/index.js"></script>
            </head>
            <body>
                <h1 class="text-primary">${headline}</h1>
                <i class="fab fa-github-square"></i>
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


(async () => {
    const results = await build("./js/index.js", path.resolve(process.cwd(), "public"));
    console.log(results);
})();

// from([{headline: "hello world"}])
// .pipe(render(renderBlogPost))
