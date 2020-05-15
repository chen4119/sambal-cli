
const {render, template, toHtml} = require("sambal");
const {from} = require("rxjs");
const {map} = require("rxjs/operators");
import path from "path";
import webpack from "webpack";
const config = require("../webpack.config.js");
import Asset from "./Asset";
import {sitemap} from "./sitemap";
/*
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
*/

/*
(async () => {
    const compiler = webpack(config);
    
    compiler.run((err, stats) => {
        const info = stats.toJson();
        console.log(info.assets);
    });
})();*/

/*
const source = from([
    // './bg.jpg',
    {
        src: 'https://live.staticflickr.com/65535/49873609556_f31bf6e630_c_d.jpg',
        dest: 'assets/flickr-[hash].jpg',
        responsive: [
            {
                srcset: 'assets/flickr-480-[hash].webp 480w, assets/flickr-320-[hash].webp 320w'
            }
        ]
    }
]);

(async () => {
    const asset = new Asset(source, "public");
    await asset.init();
    await asset.generate();
})();
*/

const source = from([
    {loc: '/'},
    {loc: '/about'},
    {loc: '/faq'},
    {loc: '/blogs'},
    {loc: '/blogs/34k'},
    {loc: '/landing'}
]);

sitemap("./public", "https://example.com", source);
