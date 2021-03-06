import {template, render, paginate, toHtml} from "sambal";
import {forkJoin, of, empty} from "rxjs";
import {bufferCount, mergeMap, toArray} from "rxjs/operators";
import {writeText} from "./utils";


// <lastmod>2005-01-01</lastmod>
const siteMapEntry = ({baseUrl, loc, lastmod, changefreq, priority}) => {
    return template`
        <url>
            <loc>${`${baseUrl}${loc}`}</loc>
            ${lastmod ? `<changefreq>${lastmod}</lastmod>` : null}
            ${changefreq ? `<changefreq>${changefreq}</changefreq>` : null}
            ${priority ? `<priority>${priority}</priority>` : null}
        </url>
    `;
};

const siteMapEntryList = (baseUrl) => {
    return ({items}) => {
        return template`
            <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${items.map(entry => siteMapEntry({baseUrl: baseUrl, ...entry}))}
            </urlset> 
        `;
    }
}

const siteMapIndex = ({baseUrl, sitemaps}) => {
    return template`
        <?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemaps.map(fileName => {
            return template`
                <sitemap>
                    <loc>${baseUrl}/${fileName}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                </sitemap>
            `;
        })}
        </sitemapindex>
    `;
}

export function sitemap(outputFolder, baseUrl, sitemap$) {
    sitemap$
    .pipe(bufferCount(1000))
    .pipe(paginate())
    .pipe(render(siteMapEntryList(baseUrl)))
    .pipe(mergeMap(d => forkJoin({
        data: Promise.resolve(d),
        html: of(d).pipe(toHtml())
    })))
    .pipe(mergeMap(async (d: {data: any, html: string}) => {
        const fileName = `sitemap${d.data.page === 1 ? '' : d.data.page}.xml`;
        await writeText(`${outputFolder}/${fileName}`, d.html);
        return fileName;
    }))
    .pipe(toArray())
    .pipe(mergeMap((sitemaps: string[]) => {
        if (sitemaps.length > 1) {
            return of({baseUrl: baseUrl, sitemaps: sitemaps})
            .pipe(render(siteMapIndex))
            .pipe(toHtml());
        }
        return empty();
    }))
    .pipe(mergeMap(async (html: string) => {
        await writeText(`${outputFolder}/index.xml`, html);
    }))
    .subscribe(d => console.log(d));

}

export async function atom(page$) {
    
}

const atomEntry = ({creativeWork}) => {
    return template`
        <entry>
            <title>Atom-Powered Robots Run Amok</title>
            <link href="http://example.org/2003/12/13/atom03"/>
            <id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a</id>
            <updated>2003-12-13T18:30:02Z</updated>
            <summary>Some text.</summary>
        </entry>
    `;
};

const atomFeed = () => {
    return template`
        <?xml version="1.0" encoding="utf-8"?>
        <feed xmlns="http://www.w3.org/2005/Atom">
        
            <title>Example Feed</title>
            <link href="http://example.org/"/>
            <updated>2003-12-13T18:30:02Z</updated>
            <author>
                <name>John Doe</name>
            </author>
            <id>urn:uuid:60a76c80-d399-11d9-b93C-0003939e0af6</id>
            
        
        </feed>
    `;
};