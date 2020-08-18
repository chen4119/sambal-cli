import Builder from "../src/Builder";
import {from, of} from "rxjs";
import * as sitemapFns from "../src/sitemap";
import {render, template} from "sambal";
import shelljs from "shelljs";
import {OUTPUT_FOLDER} from "../src/constants";

describe("Builder", () => {
    const sitemapMock = jest.spyOn(sitemapFns, "sitemap").mockImplementation(() => {});
    const baseUrl = "https://example.com";
    const routes = [
        {path: "/about", render: renderer},
        {path: "/user/:username", render: renderer}
    ];

    const sitemap$ = from([
        "/about",
        "/user/chen"
    ]);

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

    afterEach(() => {
        shelljs.rm("-rf", OUTPUT_FOLDER);
        sitemapMock.mockClear();
    });

    it('generate html files', async () => {
        const builder = new Builder(baseUrl);
        await builder.start(sitemap$, routes);
        expect(sitemapMock).toHaveBeenCalled();
        expect(shelljs.test('-f', `${OUTPUT_FOLDER}/about/index.html`)).toBeTruthy();
        expect(shelljs.test('-f', `${OUTPUT_FOLDER}/user/chen/index.html`)).toBeTruthy();
    });

});

