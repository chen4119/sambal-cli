import {AUTO} from "./Constants";
import {JSONLD_ID, JSONLD_TYPE} from "sambal-jsonld";

export type EssentialProperties = {
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
        sameAs: AUTO,
        url: AUTO
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
        colleague: AUTO,
        email: AUTO,
        familyName: AUTO,
        follows: AUTO,
        gender: AUTO,
        givenName: AUTO,
        knows: AUTO,
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
    recommendedByGoogle: {
        review: AUTO,
        aggregateRating: AUTO
    },
    essential: {
        address: AUTO,
        email: AUTO,
        founder: AUTO
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
        productID: "Product unique identifier",
        award: AUTO,
        category: AUTO,
        model: AUTO,
        isRelatedTo: AUTO,
        isSimilarTo: AUTO
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

const Place: EssentialProperties = {
    id: "http://schema.org/Place",
    recommendedByGoogle: {
        aggregateRating: AUTO,
        address: AUTO,
        geo: {
            [JSONLD_TYPE]: "http://schema.org/GeoCoordinates",
            latitude: AUTO,
            longitude: AUTO
        },
        url: AUTO,
        review: AUTO,
        openingHoursSpecification: AUTO
    }
};

const LocalBusiness: EssentialProperties = {
    id: "http://schema.org/LocalBusiness",
    requiredByGoogle: {
        [JSONLD_ID]: "Globally unique ID of the specific business location in the form of a URL. If the business has multiple locations, make sure the @id is unique for each location.",
        name: AUTO,
        address: AUTO
    },
    recommendedByGoogle: {
        department: AUTO
    }
};

const OpeningHoursSpecification: EssentialProperties = {
    id: "http://schema.org/OpeningHoursSpecification",
    recommendedByGoogle: {
        closes: AUTO,
        dayOfWeek: AUTO,
        opens: AUTO,
        validFrom: AUTO,
        validThrough: AUTO
    }
};

const GeoCoordinates: EssentialProperties = {
    id: "http://schema.org/GeoCoordinates",
    recommendedByGoogle: {
        latitude: AUTO,
        longitude: AUTO
    }
};

export const essentialPropertiesMap = new Map<string, EssentialProperties>([
    [Thing.id, Thing],
    [Article.id, Article],
    [CreativeWork.id, CreativeWork],
    [Person.id, Person],
    [Organization.id, Organization],
    [ContactPoint.id, ContactPoint],
    [Product.id, Product],
    [Book.id, Book],
    [AggregateOffer.id, AggregateOffer],
    [Offer.id, Offer],
    [Review.id, Review],
    [AggregateRating.id, AggregateRating],
    [Rating.id, Rating],
    [MediaObject.id, MediaObject],
    [VideoObject.id, VideoObject],
    [Place.id, Place],
    [LocalBusiness.id, LocalBusiness],
    [OpeningHoursSpecification.id, OpeningHoursSpecification],
    [GeoCoordinates.id, GeoCoordinates]
]);