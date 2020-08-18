import Asset from "../src/Asset";
import {from} from "rxjs";
import shelljs from "shelljs";

describe("Asset", () => {
    const CACHE_FOLDER = "./tests/cache";
    const assets = [
        {
            src: "./tests/images/image1.png",
            dest: "/dest/image1.jpg",
            responsive: [
                {
                    srcset: "dest/image1-480.jpg 480w, dest/image1-320.jpg 320w"
                }
            ]
        },
        {
            src: "./tests/images/image1.png",
        },
        {
            src: "./tests/images/image2.jpg",
            responsive: [
                {
                    srcset: "assets/image2-480.jpg 480w, assets/image2-320.jpg 320w"
                }
            ]
        },
        "./tests/images/image2.jpg"
    ];

    afterEach(() => {
        shelljs.rm("-rf", CACHE_FOLDER);
    });

    it('has correct image transforms', async () => {
        const asset = new Asset(from(assets), CACHE_FOLDER);
        await asset.init();
        expect(asset.transforms).toMatchSnapshot();
    });

    it('transform images', async () => {
        const asset = new Asset(from(assets), CACHE_FOLDER);
        await asset.init();
        await asset.generate();
        for (const transform of asset.transforms) {
            expect(shelljs.test('-f', transform.dest)).toBeTruthy();
        }
    });


});

