import {AUTO} from "./constants";

type EssentialProperties = {
    id: string,
    requiredByGoogle?: any,
    recommendedByGoogle?: any,
    essential?: any
}

const Thing: EssentialProperties = {
    id: "http://schema.org/Thing",
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
    id: "http://schema.org/Article",
    requiredByGoogle: {
        image: AUTO
    }
};

const CreativeWork: EssentialProperties = {
    id: "http://schema.org/CreativeWork",
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
    id: "http://schema.org/Person",
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
    id: "http://schema.org/Organization",
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
    id: "http://schema.org/ContactPoint",
    requiredByGoogle: {
        contactType: "Customer service, technical support, billing support, bill payment, sales, reservations, credit card support, emergency, baggage tracking, roadside assistance, package tracking"
    },
    recommendedByGoogle: {
        availableLanguage: AUTO,
        contactOption: AUTO
    }
};

const Product: EssentialProperties = {
    id: "http://schema.org/Product",
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
    id: "http://schema.org/Book",
    recommendedByGoogle: {
        isbn: AUTO
    }
};

const AggregateOffer: EssentialProperties = {
    id: "http://schema.org/AggregateOffer",
    requiredByGoogle: {
        lowPrice: AUTO
    },
    recommendedByGoogle: {
        highPrice: AUTO,
        offerCount: AUTO
    }
};

const Offer: EssentialProperties = {
    id: "http://schema.org/Offer",
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
    id: "http://schema.org/Review",
    requiredByGoogle: {
        itemReviewed: AUTO,
        reviewRating: AUTO
    },
    essential: {
        reviewBody: AUTO
    }
};

const AggregateRating: EssentialProperties = {
    id: "http://schema.org/AggregateRating",
    requiredByGoogle: {
        itemReviewed: AUTO,
        ratingCount: AUTO,
        reviewCount: AUTO
    }
};

const Rating: EssentialProperties = {
    id: "http://schema.org/Rating",
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
    id: "http://schema.org/MediaObject",
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
    id: "http://schema.org/VideoObject",
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

export const essentialPropertiesMap = new Map<string, EssentialProperties>([
    ["http://schema.org/Thing", Thing],
    ["http://schema.org/Article", Article],
    ["http://schema.org/CreativeWork", CreativeWork],
    ["http://schema.org/Person", Person],
    ["http://schema.org/Organization", Organization],
    ["http://schema.org/ContactPoint", ContactPoint],
    ["http://schema.org/Product", Product],
    ["http://schema.org/Book", Book],
    ["http://schema.org/AggregateOffer", AggregateOffer],
    ["http://schema.org/Offer", Offer],
    ["http://schema.org/Review", Review],
    ["http://schema.org/AggregateRating", AggregateRating],
    ["http://schema.org/Rating", Rating],
    ["http://schema.org/MediaObject", MediaObject],
    ["http://schema.org/VideoObject", VideoObject],
]);