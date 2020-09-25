import Builder from "../src/Builder";
import shelljs from "shelljs";
import {OUTPUT_FOLDER} from "../src/constants";

describe("Builder", () => {
    // const sitemapMock = jest.spyOn(sitemapFns, "sitemap").mockImplementation(() => {});

    afterEach(() => {
        shelljs.rm("-rf", OUTPUT_FOLDER);
        // sitemapMock.mockClear();
    });

    it('generate html files', async () => {
        const builder = new Builder(null, []);
        await builder.start();
        expect(shelljs.test('-f', `${OUTPUT_FOLDER}/about/index.html`)).toBeTruthy();
        expect(shelljs.test('-f', `${OUTPUT_FOLDER}/user/chen/index.html`)).toBeTruthy();
    });

});

