import program from "commander";
import {version} from "../package.json";
import {SCHEMA_PREFIX} from "./constants";

type EssentialProperties = {
    id: string,
    requiredByGoogle?: any,
    recommendedByGoogle?: any,
    essential?: any
}

const AUTO = "auto";
const Thing: EssentialProperties = {
    id: "",
    recommendedByGoogle: {
        name: AUTO,
        image: AUTO,
        description: AUTO
    },
    essential: {
        identifier: "Unique identifier or URL",
        sameAs: ["URL to same thing1", "URL to same thing2"]
    }
};

const Article: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        image: AUTO
    }
};

const CreativeWork: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        author: AUTO,
        datePublished: AUTO,
        headline: AUTO,
        publisher: AUTO
    },
    recommendedByGoogle: {
        dateModified: AUTO
    },
    essential: {
        keywords: ["keyword1", "keyword2"],
        thumbnailUrl: AUTO,
        interactionStatistic: AUTO
    }
};

const Person: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        name: AUTO
    },
    essential: {
        colleagues: ["URL to Person1", "URL to Person2"],
        email: AUTO,
        familyName: AUTO,
        follows: ["URL to Person1", "URL to Person2"],
        gender: AUTO,
        givenName: AUTO,
        knows: ["URL to Person1", "URL to Person2"],
        nationality: AUTO,
        worksFor: AUTO
    }
};

const Organization: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        contactPoint: AUTO,
        telephone: AUTO,
        areaServed: "Country/State/City",
    },
    essential: {
        address: AUTO,
        email: AUTO,
        founders: ["URL to Person1", "URL to Person2"]
    }
};

const ContactPoint: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        contactType: "Customer service, technical support, billing support, bill payment, sales, reservations, credit card support, emergency, baggage tracking, roadside assistance, package tracking"
    },
    recommendedByGoogle: {
        availableLanguage: AUTO,
        contactOption: AUTO
    }
};

const Product: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        name: AUTO,
        image: AUTO
    },
    recommendedByGoogle: {
        aggregateRating: AUTO,
        brand: AUTO,
        offers: AUTO,
        review: AUTO,
        gtin: "Global Trade Item Number",
        mpn: "Manufacturer part Number",
        sku: "Stock Keeping Unit"
    },
    essential: {
        productId: "Product unique identifier",
        award: AUTO,
        category: AUTO,
        model: AUTO,
        hasProductReturnPolicy: AUTO,
        isRelatedTo: ["Product1", "Product2"],
        iSimilarTo: ["Product1", "Product2"]
    }
};

const Book: EssentialProperties = {
    id: "",
    recommendedByGoogle: {
        isbn: AUTO
    }
};

const AggregateOffer: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        lowPrice: AUTO
    },
    recommendedByGoogle: {
        highPrice: AUTO,
        offerCount: AUTO
    }
};

const Offer: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        availability: AUTO,
        price: AUTO,
        priceCurrency: AUTO
    },
    recommendedByGoogle: {
        itemOffered: AUTO,
        priceValidUntil: AUTO
    }
};

const Review: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        itemReviewed: AUTO,
        reviewRating: AUTO
    },
    essential: {
        reviewBody: AUTO
    }
};

const AggregateRating: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        itemReviewed: AUTO,
        ratingCount: AUTO,
        reviewCount: AUTO
    }
};

const Rating: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        author: AUTO,
        ratingValue: AUTO
    },
    recommendedByGoogle: {
        bestRating: AUTO,
        worstRating: AUTO
    },
    essential: {
        ratingExplanation: AUTO
    }
};

const MediaObject: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        uploadDate: AUTO
    },
    recommendedByGoogle: {
        contentUrl: AUTO,
        duration: AUTO,
        embedUrl: AUTO
    }
};

const VideoObject: EssentialProperties = {
    id: "",
    requiredByGoogle: {
        name: AUTO,
        description: AUTO,
        thumbnailUrl: AUTO
    },
    recommendedByGoogle: {
        expires: AUTO,
        hasPart: "A video clip that is part of the entire video",
        interactionStatistic: AUTO
    }
};


const CMD_TYPES = [
    {id: `${SCHEMA_PREFIX}/Person`, name: "person"},

];

for (let i = 0; i < CMD_TYPES.length; i++) {
    program
        .command(`${CMD_TYPES[i].name} <output>`)
        .option("-f, --full", "Full schema")
        .action(makeSchema);
}

program
.version(version)
.parse(process.argv);

if (program.person) {
    console.log(program.person)
}

function makeSchema(output, cmd) {
    console.log(output);
    console.log(cmd.full);
}


/*
program.version(version);
    .option('-g, --generate', 'Generate Sambal javascript files')
    .option('-c, --collect', 'Generate data collection')
    .option('-b, --build', 'Build project')
    .option('-w, --watch', 'Watch for file changes')
    .parse(process.argv);

if (program.generate) {
    
} else if (program.collect) {
    
} else if (program.build) {
    // build(`${DEFAULT_OPTIONS.jsFolder}/app.js`, "bundle.js");
} else if (program.watch) {
    
}*/

