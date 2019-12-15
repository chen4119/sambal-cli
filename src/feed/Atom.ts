import {toSchemaOrgJsonLd} from "sambal-jsonld";

export function generateAtomFeed() {

}

export function toAtomFeedItem(data: object, context?: any) {
    const creativeWork = toSchemaOrgJsonLd(data, "CreativeWork", context);
    
}