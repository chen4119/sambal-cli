export const schemaMap = new Map([
    [
        "http://schema.org/trainstation",
        {
            _id: "http://schema.org/TrainStation",
            _name: "TrainStation",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/employeraggregaterating",
        {
            _id: "http://schema.org/EmployerAggregateRating",
            _name: "EmployerAggregateRating",
            _parent: [
                "http://schema.org/AggregateRating"
            ]
        }
    ],
    [
        "http://schema.org/recipe",
        {
            _id: "http://schema.org/Recipe",
            _name: "Recipe",
            _parent: [
                "http://schema.org/HowTo"
            ],
            cookingMethod: [
                "http://schema.org/Text"
            ],
            cookTime: [
                "http://schema.org/Duration"
            ],
            nutrition: [
                "http://schema.org/NutritionInformation"
            ],
            recipeCategory: [
                "http://schema.org/Text"
            ],
            recipeCuisine: [
                "http://schema.org/Text"
            ],
            recipeIngredient: [
                "http://schema.org/Text"
            ],
            recipeInstructions: [
                "http://schema.org/CreativeWork",
                "http://schema.org/ItemList",
                "http://schema.org/Text"
            ],
            recipeYield: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Text"
            ],
            suitableForDiet: [
                "http://schema.org/RestrictedDiet"
            ]
        }
    ],
    [
        "http://schema.org/photograph",
        {
            _id: "http://schema.org/Photograph",
            _name: "Photograph",
            _parent: [
                "http://schema.org/CreativeWork"
            ]
        }
    ],
    [
        "http://schema.org/volcano",
        {
            _id: "http://schema.org/Volcano",
            _name: "Volcano",
            _parent: [
                "http://schema.org/Landform"
            ]
        }
    ],
    [
        "http://schema.org/sportsteam",
        {
            _id: "http://schema.org/SportsTeam",
            _name: "SportsTeam",
            _parent: [
                "http://schema.org/SportsOrganization"
            ],
            athlete: [
                "http://schema.org/Person"
            ],
            coach: [
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/grocerystore",
        {
            _id: "http://schema.org/GroceryStore",
            _name: "GroceryStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/demand",
        {
            _id: "http://schema.org/Demand",
            _name: "Demand",
            _parent: [
                "http://schema.org/Intangible"
            ],
            acceptedPaymentMethod: [
                "http://schema.org/PaymentMethod",
                "http://schema.org/LoanOrCredit"
            ],
            advanceBookingRequirement: [
                "http://schema.org/QuantitativeValue"
            ],
            areaServed: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place",
                "http://schema.org/AdministrativeArea"
            ],
            availability: [
                "http://schema.org/ItemAvailability"
            ],
            availabilityEnds: [
                "http://schema.org/DateTime",
                "http://schema.org/Time",
                "http://schema.org/Date"
            ],
            availabilityStarts: [
                "http://schema.org/Time",
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            availableAtOrFrom: [
                "http://schema.org/Place"
            ],
            availableDeliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ],
            businessFunction: [
                "http://schema.org/BusinessFunction"
            ],
            deliveryLeadTime: [
                "http://schema.org/QuantitativeValue"
            ],
            eligibleCustomerType: [
                "http://schema.org/BusinessEntityType"
            ],
            eligibleDuration: [
                "http://schema.org/QuantitativeValue"
            ],
            eligibleQuantity: [
                "http://schema.org/QuantitativeValue"
            ],
            eligibleRegion: [
                "http://schema.org/GeoShape",
                "http://schema.org/Text",
                "http://schema.org/Place"
            ],
            eligibleTransactionVolume: [
                "http://schema.org/PriceSpecification"
            ],
            gtin12: [
                "http://schema.org/Text"
            ],
            gtin13: [
                "http://schema.org/Text"
            ],
            gtin14: [
                "http://schema.org/Text"
            ],
            gtin8: [
                "http://schema.org/Text"
            ],
            includesObject: [
                "http://schema.org/TypeAndQuantityNode"
            ],
            ineligibleRegion: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place"
            ],
            inventoryLevel: [
                "http://schema.org/QuantitativeValue"
            ],
            itemCondition: [
                "http://schema.org/OfferItemCondition"
            ],
            itemOffered: [
                "http://schema.org/Product",
                "http://schema.org/Service"
            ],
            mpn: [
                "http://schema.org/Text"
            ],
            priceSpecification: [
                "http://schema.org/PriceSpecification"
            ],
            seller: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            serialNumber: [
                "http://schema.org/Text"
            ],
            sku: [
                "http://schema.org/Text"
            ],
            validFrom: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            validThrough: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            warranty: [
                "http://schema.org/WarrantyPromise"
            ]
        }
    ],
    [
        "http://schema.org/aboutpage",
        {
            _id: "http://schema.org/AboutPage",
            _name: "AboutPage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/exerciseaction",
        {
            _id: "http://schema.org/ExerciseAction",
            _name: "ExerciseAction",
            _parent: [
                "http://schema.org/PlayAction"
            ],
            distance: [
                "http://schema.org/Distance"
            ],
            exerciseCourse: [
                "http://schema.org/Place"
            ],
            fromLocation: [
                "http://schema.org/Place"
            ],
            opponent: [
                "http://schema.org/Person"
            ],
            sportsActivityLocation: [
                "http://schema.org/SportsActivityLocation"
            ],
            sportsEvent: [
                "http://schema.org/SportsEvent"
            ],
            sportsTeam: [
                "http://schema.org/SportsTeam"
            ],
            toLocation: [
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/foodservice",
        {
            _id: "http://schema.org/FoodService",
            _name: "FoodService",
            _parent: [
                "http://schema.org/Service"
            ]
        }
    ],
    [
        "http://schema.org/seabodyofwater",
        {
            _id: "http://schema.org/SeaBodyOfWater",
            _name: "SeaBodyOfWater",
            _parent: [
                "http://schema.org/BodyOfWater"
            ]
        }
    ],
    [
        "http://schema.org/conveniencestore",
        {
            _id: "http://schema.org/ConvenienceStore",
            _name: "ConvenienceStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/trip",
        {
            _id: "http://schema.org/Trip",
            _name: "Trip",
            _parent: [
                "http://schema.org/Intangible"
            ],
            arrivalTime: [
                "http://schema.org/Time",
                "http://schema.org/DateTime"
            ],
            departureTime: [
                "http://schema.org/Time",
                "http://schema.org/DateTime"
            ],
            offers: [
                "http://schema.org/Offer"
            ],
            provider: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/dataset",
        {
            _id: "http://schema.org/Dataset",
            _name: "Dataset",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            distribution: [
                "http://schema.org/DataDownload"
            ],
            includedInDataCatalog: [
                "http://schema.org/DataCatalog"
            ],
            issn: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/action",
        {
            _id: "http://schema.org/Action",
            _name: "Action",
            _parent: [
                "http://schema.org/Thing"
            ],
            actionStatus: [
                "http://schema.org/ActionStatusType"
            ],
            agent: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            endTime: [
                "http://schema.org/DateTime",
                "http://schema.org/Time"
            ],
            error: [
                "http://schema.org/Thing"
            ],
            instrument: [
                "http://schema.org/Thing"
            ],
            location: [
                "http://schema.org/Place",
                "http://schema.org/Text",
                "http://schema.org/PostalAddress"
            ],
            object: [
                "http://schema.org/Thing"
            ],
            participant: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            result: [
                "http://schema.org/Thing"
            ],
            startTime: [
                "http://schema.org/DateTime",
                "http://schema.org/Time"
            ],
            target: [
                "http://schema.org/EntryPoint"
            ]
        }
    ],
    [
        "http://schema.org/insuranceagency",
        {
            _id: "http://schema.org/InsuranceAgency",
            _name: "InsuranceAgency",
            _parent: [
                "http://schema.org/FinancialService"
            ]
        }
    ],
    [
        "http://schema.org/audioobject",
        {
            _id: "http://schema.org/AudioObject",
            _name: "AudioObject",
            _parent: [
                "http://schema.org/MediaObject"
            ],
            caption: [
                "http://schema.org/MediaObject",
                "http://schema.org/Text"
            ],
            transcript: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/taxireservation",
        {
            _id: "http://schema.org/TaxiReservation",
            _name: "TaxiReservation",
            _parent: [
                "http://schema.org/Reservation"
            ],
            partySize: [
                "http://schema.org/Integer",
                "http://schema.org/QuantitativeValue"
            ],
            pickupLocation: [
                "http://schema.org/Place"
            ],
            pickupTime: [
                "http://schema.org/DateTime"
            ]
        }
    ],
    [
        "http://schema.org/game",
        {
            _id: "http://schema.org/Game",
            _name: "Game",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            characterAttribute: [
                "http://schema.org/Thing"
            ],
            gameItem: [
                "http://schema.org/Thing"
            ],
            gameLocation: [
                "http://schema.org/PostalAddress",
                "http://schema.org/Place",
                "http://schema.org/URL"
            ],
            numberOfPlayers: [
                "http://schema.org/QuantitativeValue"
            ],
            quest: [
                "http://schema.org/Thing"
            ]
        }
    ],
    [
        "http://schema.org/vehicle",
        {
            _id: "http://schema.org/Vehicle",
            _name: "Vehicle",
            _parent: [
                "http://schema.org/Product"
            ],
            cargoVolume: [
                "http://schema.org/QuantitativeValue"
            ],
            dateVehicleFirstRegistered: [
                "http://schema.org/Date"
            ],
            driveWheelConfiguration: [
                "http://schema.org/DriveWheelConfigurationValue",
                "http://schema.org/Text"
            ],
            fuelConsumption: [
                "http://schema.org/QuantitativeValue"
            ],
            fuelEfficiency: [
                "http://schema.org/QuantitativeValue"
            ],
            fuelType: [
                "http://schema.org/QualitativeValue",
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            knownVehicleDamages: [
                "http://schema.org/Text"
            ],
            mileageFromOdometer: [
                "http://schema.org/QuantitativeValue"
            ],
            numberOfAirbags: [
                "http://schema.org/Text",
                "http://schema.org/Number"
            ],
            numberOfAxles: [
                "http://schema.org/Number",
                "http://schema.org/QuantitativeValue"
            ],
            numberOfDoors: [
                "http://schema.org/Number",
                "http://schema.org/QuantitativeValue"
            ],
            numberOfForwardGears: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Number"
            ],
            numberOfPreviousOwners: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Number"
            ],
            productionDate: [
                "http://schema.org/Date"
            ],
            purchaseDate: [
                "http://schema.org/Date"
            ],
            steeringPosition: [
                "http://schema.org/SteeringPositionValue"
            ],
            vehicleConfiguration: [
                "http://schema.org/Text"
            ],
            vehicleEngine: [
                "http://schema.org/EngineSpecification"
            ],
            vehicleIdentificationNumber: [
                "http://schema.org/Text"
            ],
            vehicleInteriorColor: [
                "http://schema.org/Text"
            ],
            vehicleInteriorType: [
                "http://schema.org/Text"
            ],
            vehicleModelDate: [
                "http://schema.org/Date"
            ],
            vehicleSeatingCapacity: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Number"
            ],
            vehicleTransmission: [
                "http://schema.org/QualitativeValue",
                "http://schema.org/URL",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/permit",
        {
            _id: "http://schema.org/Permit",
            _name: "Permit",
            _parent: [
                "http://schema.org/Intangible"
            ],
            issuedBy: [
                "http://schema.org/Organization"
            ],
            issuedThrough: [
                "http://schema.org/Service"
            ],
            permitAudience: [
                "http://schema.org/Audience"
            ],
            validFor: [
                "http://schema.org/Duration"
            ],
            validFrom: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            validIn: [
                "http://schema.org/AdministrativeArea"
            ],
            validUntil: [
                "http://schema.org/Date"
            ]
        }
    ],
    [
        "http://schema.org/autopartsstore",
        {
            _id: "http://schema.org/AutoPartsStore",
            _name: "AutoPartsStore",
            _parent: [
                "http://schema.org/AutomotiveBusiness",
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/wpadblock",
        {
            _id: "http://schema.org/WPAdBlock",
            _name: "WPAdBlock",
            _parent: [
                "http://schema.org/WebPageElement"
            ]
        }
    ],
    [
        "http://schema.org/someproducts",
        {
            _id: "http://schema.org/SomeProducts",
            _name: "SomeProducts",
            _parent: [
                "http://schema.org/Product"
            ],
            inventoryLevel: [
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/moveaction",
        {
            _id: "http://schema.org/MoveAction",
            _name: "MoveAction",
            _parent: [
                "http://schema.org/Action"
            ],
            fromLocation: [
                "http://schema.org/Place"
            ],
            toLocation: [
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/creativework",
        {
            _id: "http://schema.org/CreativeWork",
            _name: "CreativeWork",
            _parent: [
                "http://schema.org/Thing"
            ],
            about: [
                "http://schema.org/Thing"
            ],
            accessibilityAPI: [
                "http://schema.org/Text"
            ],
            accessibilityControl: [
                "http://schema.org/Text"
            ],
            accessibilityFeature: [
                "http://schema.org/Text"
            ],
            accessibilityHazard: [
                "http://schema.org/Text"
            ],
            accessibilitySummary: [
                "http://schema.org/Text"
            ],
            accessMode: [
                "http://schema.org/Text"
            ],
            accessModeSufficient: [
                "http://schema.org/ItemList"
            ],
            accountablePerson: [
                "http://schema.org/Person"
            ],
            aggregateRating: [
                "http://schema.org/AggregateRating"
            ],
            alternativeHeadline: [
                "http://schema.org/Text"
            ],
            associatedMedia: [
                "http://schema.org/MediaObject"
            ],
            audience: [
                "http://schema.org/Audience"
            ],
            audio: [
                "http://schema.org/AudioObject",
                "http://schema.org/Clip"
            ],
            author: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            award: [
                "http://schema.org/Text"
            ],
            character: [
                "http://schema.org/Person"
            ],
            citation: [
                "http://schema.org/Text",
                "http://schema.org/CreativeWork"
            ],
            comment: [
                "http://schema.org/Comment"
            ],
            commentCount: [
                "http://schema.org/Integer"
            ],
            contentLocation: [
                "http://schema.org/Place"
            ],
            contentRating: [
                "http://schema.org/Rating",
                "http://schema.org/Text"
            ],
            contributor: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            copyrightHolder: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            copyrightYear: [
                "http://schema.org/Number"
            ],
            creator: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            dateCreated: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            dateModified: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            datePublished: [
                "http://schema.org/Date"
            ],
            discussionUrl: [
                "http://schema.org/URL"
            ],
            editor: [
                "http://schema.org/Person"
            ],
            educationalAlignment: [
                "http://schema.org/AlignmentObject"
            ],
            educationalUse: [
                "http://schema.org/Text"
            ],
            encoding: [
                "http://schema.org/MediaObject"
            ],
            encodingFormat: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            exampleOfWork: [
                "http://schema.org/CreativeWork"
            ],
            expires: [
                "http://schema.org/Date"
            ],
            funder: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            genre: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            hasPart: [
                "http://schema.org/CreativeWork"
            ],
            headline: [
                "http://schema.org/Text"
            ],
            inLanguage: [
                "http://schema.org/Text",
                "http://schema.org/Language"
            ],
            interactionStatistic: [
                "http://schema.org/InteractionCounter"
            ],
            interactivityType: [
                "http://schema.org/Text"
            ],
            isAccessibleForFree: [
                "http://schema.org/Boolean"
            ],
            isBasedOn: [
                "http://schema.org/Product",
                "http://schema.org/CreativeWork",
                "http://schema.org/URL"
            ],
            isFamilyFriendly: [
                "http://schema.org/Boolean"
            ],
            isPartOf: [
                "http://schema.org/CreativeWork"
            ],
            keywords: [
                "http://schema.org/Text"
            ],
            learningResourceType: [
                "http://schema.org/Text"
            ],
            license: [
                "http://schema.org/URL",
                "http://schema.org/CreativeWork"
            ],
            locationCreated: [
                "http://schema.org/Place"
            ],
            mainEntity: [
                "http://schema.org/Thing"
            ],
            material: [
                "http://schema.org/Product",
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            mentions: [
                "http://schema.org/Thing"
            ],
            offers: [
                "http://schema.org/Offer"
            ],
            position: [
                "http://schema.org/Text",
                "http://schema.org/Integer"
            ],
            producer: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            provider: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            publication: [
                "http://schema.org/PublicationEvent"
            ],
            publisher: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            publishingPrinciples: [
                "http://schema.org/CreativeWork",
                "http://schema.org/URL"
            ],
            recordedAt: [
                "http://schema.org/Event"
            ],
            releasedEvent: [
                "http://schema.org/PublicationEvent"
            ],
            review: [
                "http://schema.org/Review"
            ],
            schemaVersion: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            sourceOrganization: [
                "http://schema.org/Organization"
            ],
            spatial: [
                "http://schema.org/Place"
            ],
            spatialCoverage: [
                "http://schema.org/Place"
            ],
            sponsor: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            temporal: [
                "http://schema.org/DateTime",
                "http://schema.org/Text"
            ],
            temporalCoverage: [
                "http://schema.org/DateTime",
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            text: [
                "http://schema.org/Text"
            ],
            thumbnailUrl: [
                "http://schema.org/URL"
            ],
            timeRequired: [
                "http://schema.org/Duration"
            ],
            translator: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            typicalAgeRange: [
                "http://schema.org/Text"
            ],
            version: [
                "http://schema.org/Text",
                "http://schema.org/Number"
            ],
            video: [
                "http://schema.org/Clip",
                "http://schema.org/VideoObject"
            ],
            workExample: [
                "http://schema.org/CreativeWork"
            ]
        }
    ],
    [
        "http://schema.org/addaction",
        {
            _id: "http://schema.org/AddAction",
            _name: "AddAction",
            _parent: [
                "http://schema.org/UpdateAction"
            ]
        }
    ],
    [
        "http://schema.org/jewelrystore",
        {
            _id: "http://schema.org/JewelryStore",
            _name: "JewelryStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/viewaction",
        {
            _id: "http://schema.org/ViewAction",
            _name: "ViewAction",
            _parent: [
                "http://schema.org/ConsumeAction"
            ]
        }
    ],
    [
        "http://schema.org/wpfooter",
        {
            _id: "http://schema.org/WPFooter",
            _name: "WPFooter",
            _parent: [
                "http://schema.org/WebPageElement"
            ]
        }
    ],
    [
        "http://schema.org/qapage",
        {
            _id: "http://schema.org/QAPage",
            _name: "QAPage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/likeaction",
        {
            _id: "http://schema.org/LikeAction",
            _name: "LikeAction",
            _parent: [
                "http://schema.org/ReactAction"
            ]
        }
    ],
    [
        "http://schema.org/publicationevent",
        {
            _id: "http://schema.org/PublicationEvent",
            _name: "PublicationEvent",
            _parent: [
                "http://schema.org/Event"
            ],
            isAccessibleForFree: [
                "http://schema.org/Boolean"
            ],
            publishedOn: [
                "http://schema.org/BroadcastService"
            ]
        }
    ],
    [
        "http://schema.org/course",
        {
            _id: "http://schema.org/Course",
            _name: "Course",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            courseCode: [
                "http://schema.org/Text"
            ],
            coursePrerequisites: [
                "http://schema.org/AlignmentObject",
                "http://schema.org/Course",
                "http://schema.org/Text"
            ],
            educationalCredentialAwarded: [
                "http://schema.org/EducationalOccupationalCredential",
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            hasCourseInstance: [
                "http://schema.org/CourseInstance"
            ]
        }
    ],
    [
        "http://schema.org/parcelservice",
        {
            _id: "http://schema.org/ParcelService",
            _name: "ParcelService",
            _parent: [
                "http://schema.org/DeliveryMethod"
            ]
        }
    ],
    [
        "http://schema.org/befriendaction",
        {
            _id: "http://schema.org/BefriendAction",
            _name: "BefriendAction",
            _parent: [
                "http://schema.org/InteractAction"
            ]
        }
    ],
    [
        "http://schema.org/howto",
        {
            _id: "http://schema.org/HowTo",
            _name: "HowTo",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            estimatedCost: [
                "http://schema.org/Text",
                "http://schema.org/MonetaryAmount"
            ],
            performTime: [
                "http://schema.org/Duration"
            ],
            prepTime: [
                "http://schema.org/Duration"
            ],
            step: [
                "http://schema.org/HowToStep",
                "http://schema.org/HowToSection",
                "http://schema.org/CreativeWork",
                "http://schema.org/Text"
            ],
            supply: [
                "http://schema.org/Text",
                "http://schema.org/HowToSupply"
            ],
            tool: [
                "http://schema.org/Text",
                "http://schema.org/HowToTool"
            ],
            totalTime: [
                "http://schema.org/Duration"
            ],
            yield: [
                "http://schema.org/Text",
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/policestation",
        {
            _id: "http://schema.org/PoliceStation",
            _name: "PoliceStation",
            _parent: [
                "http://schema.org/CivicStructure",
                "http://schema.org/EmergencyService"
            ]
        }
    ],
    [
        "http://schema.org/healthclub",
        {
            _id: "http://schema.org/HealthClub",
            _name: "HealthClub",
            _parent: [
                "http://schema.org/SportsActivityLocation",
                "http://schema.org/HealthAndBeautyBusiness"
            ]
        }
    ],
    [
        "http://schema.org/drinkaction",
        {
            _id: "http://schema.org/DrinkAction",
            _name: "DrinkAction",
            _parent: [
                "http://schema.org/ConsumeAction"
            ]
        }
    ],
    [
        "http://schema.org/downloadaction",
        {
            _id: "http://schema.org/DownloadAction",
            _name: "DownloadAction",
            _parent: [
                "http://schema.org/TransferAction"
            ]
        }
    ],
    [
        "http://schema.org/tireshop",
        {
            _id: "http://schema.org/TireShop",
            _name: "TireShop",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/synagogue",
        {
            _id: "http://schema.org/Synagogue",
            _name: "Synagogue",
            _parent: [
                "http://schema.org/PlaceOfWorship"
            ]
        }
    ],
    [
        "http://schema.org/animalshelter",
        {
            _id: "http://schema.org/AnimalShelter",
            _name: "AnimalShelter",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/workersunion",
        {
            _id: "http://schema.org/WorkersUnion",
            _name: "WorkersUnion",
            _parent: [
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/howtosection",
        {
            _id: "http://schema.org/HowToSection",
            _name: "HowToSection",
            _parent: [
                "http://schema.org/ItemList",
                "http://schema.org/ListItem",
                "http://schema.org/CreativeWork"
            ]
        }
    ],
    [
        "http://schema.org/musicalbum",
        {
            _id: "http://schema.org/MusicAlbum",
            _name: "MusicAlbum",
            _parent: [
                "http://schema.org/MusicPlaylist"
            ],
            albumProductionType: [
                "http://schema.org/MusicAlbumProductionType"
            ],
            albumRelease: [
                "http://schema.org/MusicRelease"
            ],
            albumReleaseType: [
                "http://schema.org/MusicAlbumReleaseType"
            ],
            byArtist: [
                "http://schema.org/Person",
                "http://schema.org/MusicGroup"
            ]
        }
    ],
    [
        "http://schema.org/person",
        {
            _id: "http://schema.org/Person",
            _name: "Person",
            _parent: [
                "http://schema.org/Thing"
            ],
            additionalName: [
                "http://schema.org/Text"
            ],
            address: [
                "http://schema.org/Text",
                "http://schema.org/PostalAddress"
            ],
            affiliation: [
                "http://schema.org/Organization"
            ],
            alumniOf: [
                "http://schema.org/EducationalOrganization",
                "http://schema.org/Organization"
            ],
            award: [
                "http://schema.org/Text"
            ],
            birthDate: [
                "http://schema.org/Date"
            ],
            birthPlace: [
                "http://schema.org/Place"
            ],
            brand: [
                "http://schema.org/Organization",
                "http://schema.org/Brand"
            ],
            children: [
                "http://schema.org/Person"
            ],
            colleague: [
                "http://schema.org/Person",
                "http://schema.org/URL"
            ],
            contactPoint: [
                "http://schema.org/ContactPoint"
            ],
            deathDate: [
                "http://schema.org/Date"
            ],
            deathPlace: [
                "http://schema.org/Place"
            ],
            duns: [
                "http://schema.org/Text"
            ],
            email: [
                "http://schema.org/Text"
            ],
            familyName: [
                "http://schema.org/Text"
            ],
            faxNumber: [
                "http://schema.org/Text"
            ],
            follows: [
                "http://schema.org/Person"
            ],
            funder: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            gender: [
                "http://schema.org/GenderType",
                "http://schema.org/Text"
            ],
            givenName: [
                "http://schema.org/Text"
            ],
            globalLocationNumber: [
                "http://schema.org/Text"
            ],
            hasOccupation: [
                "http://schema.org/Occupation"
            ],
            hasOfferCatalog: [
                "http://schema.org/OfferCatalog"
            ],
            hasPOS: [
                "http://schema.org/Place"
            ],
            height: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Distance"
            ],
            homeLocation: [
                "http://schema.org/Place",
                "http://schema.org/ContactPoint"
            ],
            honorificPrefix: [
                "http://schema.org/Text"
            ],
            honorificSuffix: [
                "http://schema.org/Text"
            ],
            isicV4: [
                "http://schema.org/Text"
            ],
            knows: [
                "http://schema.org/Person"
            ],
            makesOffer: [
                "http://schema.org/Offer"
            ],
            memberOf: [
                "http://schema.org/ProgramMembership",
                "http://schema.org/Organization"
            ],
            naics: [
                "http://schema.org/Text"
            ],
            nationality: [
                "http://schema.org/Country"
            ],
            netWorth: [
                "http://schema.org/PriceSpecification",
                "http://schema.org/MonetaryAmount"
            ],
            owns: [
                "http://schema.org/Product",
                "http://schema.org/OwnershipInfo"
            ],
            parent: [
                "http://schema.org/Person"
            ],
            performerIn: [
                "http://schema.org/Event"
            ],
            publishingPrinciples: [
                "http://schema.org/CreativeWork",
                "http://schema.org/URL"
            ],
            relatedTo: [
                "http://schema.org/Person"
            ],
            seeks: [
                "http://schema.org/Demand"
            ],
            sibling: [
                "http://schema.org/Person"
            ],
            sponsor: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            spouse: [
                "http://schema.org/Person"
            ],
            taxID: [
                "http://schema.org/Text"
            ],
            telephone: [
                "http://schema.org/Text"
            ],
            vatID: [
                "http://schema.org/Text"
            ],
            weight: [
                "http://schema.org/QuantitativeValue"
            ],
            workLocation: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Place"
            ],
            worksFor: [
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/deliverychargespecification",
        {
            _id: "http://schema.org/DeliveryChargeSpecification",
            _name: "DeliveryChargeSpecification",
            _parent: [
                "http://schema.org/PriceSpecification"
            ],
            appliesToDeliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ],
            areaServed: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place",
                "http://schema.org/AdministrativeArea"
            ],
            eligibleRegion: [
                "http://schema.org/GeoShape",
                "http://schema.org/Text",
                "http://schema.org/Place"
            ],
            ineligibleRegion: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/lendaction",
        {
            _id: "http://schema.org/LendAction",
            _name: "LendAction",
            _parent: [
                "http://schema.org/TransferAction"
            ],
            borrower: [
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/foodestablishment",
        {
            _id: "http://schema.org/FoodEstablishment",
            _name: "FoodEstablishment",
            _parent: [
                "http://schema.org/LocalBusiness"
            ],
            acceptsReservations: [
                "http://schema.org/Text",
                "http://schema.org/URL",
                "http://schema.org/Boolean"
            ],
            hasMenu: [
                "http://schema.org/Menu",
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            servesCuisine: [
                "http://schema.org/Text"
            ],
            starRating: [
                "http://schema.org/Rating"
            ]
        }
    ],
    [
        "http://schema.org/listenaction",
        {
            _id: "http://schema.org/ListenAction",
            _name: "ListenAction",
            _parent: [
                "http://schema.org/ConsumeAction"
            ]
        }
    ],
    [
        "http://schema.org/transferaction",
        {
            _id: "http://schema.org/TransferAction",
            _name: "TransferAction",
            _parent: [
                "http://schema.org/Action"
            ],
            fromLocation: [
                "http://schema.org/Place"
            ],
            toLocation: [
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/nutritioninformation",
        {
            _id: "http://schema.org/NutritionInformation",
            _name: "NutritionInformation",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            calories: [
                "http://schema.org/Energy"
            ],
            carbohydrateContent: [
                "http://schema.org/Mass"
            ],
            cholesterolContent: [
                "http://schema.org/Mass"
            ],
            fatContent: [
                "http://schema.org/Mass"
            ],
            fiberContent: [
                "http://schema.org/Mass"
            ],
            proteinContent: [
                "http://schema.org/Mass"
            ],
            saturatedFatContent: [
                "http://schema.org/Mass"
            ],
            servingSize: [
                "http://schema.org/Text"
            ],
            sodiumContent: [
                "http://schema.org/Mass"
            ],
            sugarContent: [
                "http://schema.org/Mass"
            ],
            transFatContent: [
                "http://schema.org/Mass"
            ],
            unsaturatedFatContent: [
                "http://schema.org/Mass"
            ]
        }
    ],
    [
        "http://schema.org/sitenavigationelement",
        {
            _id: "http://schema.org/SiteNavigationElement",
            _name: "SiteNavigationElement",
            _parent: [
                "http://schema.org/WebPageElement"
            ]
        }
    ],
    [
        "http://schema.org/organization",
        {
            _id: "http://schema.org/Organization",
            _name: "Organization",
            _parent: [
                "http://schema.org/Thing"
            ],
            address: [
                "http://schema.org/Text",
                "http://schema.org/PostalAddress"
            ],
            aggregateRating: [
                "http://schema.org/AggregateRating"
            ],
            alumni: [
                "http://schema.org/Person"
            ],
            areaServed: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place",
                "http://schema.org/AdministrativeArea"
            ],
            award: [
                "http://schema.org/Text"
            ],
            brand: [
                "http://schema.org/Organization",
                "http://schema.org/Brand"
            ],
            contactPoint: [
                "http://schema.org/ContactPoint"
            ],
            department: [
                "http://schema.org/Organization"
            ],
            dissolutionDate: [
                "http://schema.org/Date"
            ],
            duns: [
                "http://schema.org/Text"
            ],
            email: [
                "http://schema.org/Text"
            ],
            employee: [
                "http://schema.org/Person"
            ],
            event: [
                "http://schema.org/Event"
            ],
            faxNumber: [
                "http://schema.org/Text"
            ],
            founder: [
                "http://schema.org/Person"
            ],
            foundingDate: [
                "http://schema.org/Date"
            ],
            foundingLocation: [
                "http://schema.org/Place"
            ],
            funder: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            globalLocationNumber: [
                "http://schema.org/Text"
            ],
            hasOfferCatalog: [
                "http://schema.org/OfferCatalog"
            ],
            hasPOS: [
                "http://schema.org/Place"
            ],
            isicV4: [
                "http://schema.org/Text"
            ],
            legalName: [
                "http://schema.org/Text"
            ],
            leiCode: [
                "http://schema.org/Text"
            ],
            location: [
                "http://schema.org/Place",
                "http://schema.org/Text",
                "http://schema.org/PostalAddress"
            ],
            logo: [
                "http://schema.org/URL",
                "http://schema.org/ImageObject"
            ],
            makesOffer: [
                "http://schema.org/Offer"
            ],
            member: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            memberOf: [
                "http://schema.org/ProgramMembership",
                "http://schema.org/Organization"
            ],
            naics: [
                "http://schema.org/Text"
            ],
            numberOfEmployees: [
                "http://schema.org/QuantitativeValue"
            ],
            owns: [
                "http://schema.org/Product",
                "http://schema.org/OwnershipInfo"
            ],
            parentOrganization: [
                "http://schema.org/Organization"
            ],
            publishingPrinciples: [
                "http://schema.org/CreativeWork",
                "http://schema.org/URL"
            ],
            review: [
                "http://schema.org/Review"
            ],
            seeks: [
                "http://schema.org/Demand"
            ],
            slogan: [
                "http://schema.org/Text"
            ],
            sponsor: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            subOrganization: [
                "http://schema.org/Organization"
            ],
            taxID: [
                "http://schema.org/Text"
            ],
            telephone: [
                "http://schema.org/Text"
            ],
            vatID: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/deleteaction",
        {
            _id: "http://schema.org/DeleteAction",
            _name: "DeleteAction",
            _parent: [
                "http://schema.org/UpdateAction"
            ]
        }
    ],
    [
        "http://schema.org/tradeaction",
        {
            _id: "http://schema.org/TradeAction",
            _name: "TradeAction",
            _parent: [
                "http://schema.org/Action"
            ],
            price: [
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            priceCurrency: [
                "http://schema.org/Text"
            ],
            priceSpecification: [
                "http://schema.org/PriceSpecification"
            ]
        }
    ],
    [
        "http://schema.org/legalservice",
        {
            _id: "http://schema.org/LegalService",
            _name: "LegalService",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/visualartwork",
        {
            _id: "http://schema.org/VisualArtwork",
            _name: "VisualArtwork",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            artEdition: [
                "http://schema.org/Text",
                "http://schema.org/Integer"
            ],
            artform: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            artMedium: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            artworkSurface: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            depth: [
                "http://schema.org/Distance",
                "http://schema.org/QuantitativeValue"
            ],
            height: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Distance"
            ],
            width: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Distance"
            ]
        }
    ],
    [
        "http://schema.org/attorney",
        {
            _id: "http://schema.org/Attorney",
            _name: "Attorney",
            _parent: [
                "http://schema.org/LegalService"
            ]
        }
    ],
    [
        "http://schema.org/rsvpaction",
        {
            _id: "http://schema.org/RsvpAction",
            _name: "RsvpAction",
            _parent: [
                "http://schema.org/InformAction"
            ],
            additionalNumberOfGuests: [
                "http://schema.org/Number"
            ],
            comment: [
                "http://schema.org/Comment"
            ],
            rsvpResponse: [
                "http://schema.org/RsvpResponseType"
            ]
        }
    ],
    [
        "http://schema.org/generalcontractor",
        {
            _id: "http://schema.org/GeneralContractor",
            _name: "GeneralContractor",
            _parent: [
                "http://schema.org/HomeAndConstructionBusiness"
            ]
        }
    ],
    [
        "http://schema.org/rating",
        {
            _id: "http://schema.org/Rating",
            _name: "Rating",
            _parent: [
                "http://schema.org/Intangible"
            ],
            author: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            bestRating: [
                "http://schema.org/Text",
                "http://schema.org/Number"
            ],
            ratingValue: [
                "http://schema.org/Text",
                "http://schema.org/Number"
            ],
            reviewAspect: [
                "http://schema.org/Text"
            ],
            worstRating: [
                "http://schema.org/Number",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/apartmentcomplex",
        {
            _id: "http://schema.org/ApartmentComplex",
            _name: "ApartmentComplex",
            _parent: [
                "http://schema.org/Residence"
            ]
        }
    ],
    [
        "http://schema.org/registeraction",
        {
            _id: "http://schema.org/RegisterAction",
            _name: "RegisterAction",
            _parent: [
                "http://schema.org/InteractAction"
            ]
        }
    ],
    [
        "http://schema.org/housepainter",
        {
            _id: "http://schema.org/HousePainter",
            _name: "HousePainter",
            _parent: [
                "http://schema.org/HomeAndConstructionBusiness"
            ]
        }
    ],
    [
        "http://schema.org/movierentalstore",
        {
            _id: "http://schema.org/MovieRentalStore",
            _name: "MovieRentalStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/watchaction",
        {
            _id: "http://schema.org/WatchAction",
            _name: "WatchAction",
            _parent: [
                "http://schema.org/ConsumeAction"
            ]
        }
    ],
    [
        "http://schema.org/propertyvaluespecification",
        {
            _id: "http://schema.org/PropertyValueSpecification",
            _name: "PropertyValueSpecification",
            _parent: [
                "http://schema.org/Intangible"
            ],
            defaultValue: [
                "http://schema.org/Thing",
                "http://schema.org/Text"
            ],
            maxValue: [
                "http://schema.org/Number"
            ],
            minValue: [
                "http://schema.org/Number"
            ],
            multipleValues: [
                "http://schema.org/Boolean"
            ],
            readonlyValue: [
                "http://schema.org/Boolean"
            ],
            stepValue: [
                "http://schema.org/Number"
            ],
            valueMaxLength: [
                "http://schema.org/Number"
            ],
            valueMinLength: [
                "http://schema.org/Number"
            ],
            valueName: [
                "http://schema.org/Text"
            ],
            valuePattern: [
                "http://schema.org/Text"
            ],
            valueRequired: [
                "http://schema.org/Boolean"
            ]
        }
    ],
    [
        "http://schema.org/educationevent",
        {
            _id: "http://schema.org/EducationEvent",
            _name: "EducationEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/resumeaction",
        {
            _id: "http://schema.org/ResumeAction",
            _name: "ResumeAction",
            _parent: [
                "http://schema.org/ControlAction"
            ]
        }
    ],
    [
        "http://schema.org/toystore",
        {
            _id: "http://schema.org/ToyStore",
            _name: "ToyStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/bedandbreakfast",
        {
            _id: "http://schema.org/BedAndBreakfast",
            _name: "BedAndBreakfast",
            _parent: [
                "http://schema.org/LodgingBusiness"
            ]
        }
    ],
    [
        "http://schema.org/suite",
        {
            _id: "http://schema.org/Suite",
            _name: "Suite",
            _parent: [
                "http://schema.org/Accommodation"
            ],
            bed: [
                "http://schema.org/BedDetails",
                "http://schema.org/Text",
                "http://schema.org/BedType"
            ],
            numberOfRooms: [
                "http://schema.org/Number",
                "http://schema.org/QuantitativeValue"
            ],
            occupancy: [
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/reservoir",
        {
            _id: "http://schema.org/Reservoir",
            _name: "Reservoir",
            _parent: [
                "http://schema.org/BodyOfWater"
            ]
        }
    ],
    [
        "http://schema.org/distillery",
        {
            _id: "http://schema.org/Distillery",
            _name: "Distillery",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/giveaction",
        {
            _id: "http://schema.org/GiveAction",
            _name: "GiveAction",
            _parent: [
                "http://schema.org/TransferAction"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ]
        }
    ],
    [
        "http://schema.org/postoffice",
        {
            _id: "http://schema.org/PostOffice",
            _name: "PostOffice",
            _parent: [
                "http://schema.org/GovernmentOffice"
            ]
        }
    ],
    [
        "http://schema.org/checkoutpage",
        {
            _id: "http://schema.org/CheckoutPage",
            _name: "CheckoutPage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/accommodation",
        {
            _id: "http://schema.org/Accommodation",
            _name: "Accommodation",
            _parent: [
                "http://schema.org/Place"
            ],
            amenityFeature: [
                "http://schema.org/LocationFeatureSpecification"
            ],
            floorSize: [
                "http://schema.org/QuantitativeValue"
            ],
            numberOfRooms: [
                "http://schema.org/Number",
                "http://schema.org/QuantitativeValue"
            ],
            permittedUsage: [
                "http://schema.org/Text"
            ],
            petsAllowed: [
                "http://schema.org/Boolean",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/performingartstheater",
        {
            _id: "http://schema.org/PerformingArtsTheater",
            _name: "PerformingArtsTheater",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/aggregateoffer",
        {
            _id: "http://schema.org/AggregateOffer",
            _name: "AggregateOffer",
            _parent: [
                "http://schema.org/Offer"
            ],
            highPrice: [
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            lowPrice: [
                "http://schema.org/Text",
                "http://schema.org/Number"
            ],
            offerCount: [
                "http://schema.org/Integer"
            ],
            offers: [
                "http://schema.org/Offer"
            ]
        }
    ],
    [
        "http://schema.org/museum",
        {
            _id: "http://schema.org/Museum",
            _name: "Museum",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/howtosupply",
        {
            _id: "http://schema.org/HowToSupply",
            _name: "HowToSupply",
            _parent: [
                "http://schema.org/HowToItem"
            ],
            estimatedCost: [
                "http://schema.org/Text",
                "http://schema.org/MonetaryAmount"
            ]
        }
    ],
    [
        "http://schema.org/autorepair",
        {
            _id: "http://schema.org/AutoRepair",
            _name: "AutoRepair",
            _parent: [
                "http://schema.org/AutomotiveBusiness"
            ]
        }
    ],
    [
        "http://schema.org/exercisegym",
        {
            _id: "http://schema.org/ExerciseGym",
            _name: "ExerciseGym",
            _parent: [
                "http://schema.org/SportsActivityLocation"
            ]
        }
    ],
    [
        "http://schema.org/embassy",
        {
            _id: "http://schema.org/Embassy",
            _name: "Embassy",
            _parent: [
                "http://schema.org/GovernmentBuilding"
            ]
        }
    ],
    [
        "http://schema.org/profilepage",
        {
            _id: "http://schema.org/ProfilePage",
            _name: "ProfilePage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/disagreeaction",
        {
            _id: "http://schema.org/DisagreeAction",
            _name: "DisagreeAction",
            _parent: [
                "http://schema.org/ReactAction"
            ]
        }
    ],
    [
        "http://schema.org/imageobject",
        {
            _id: "http://schema.org/ImageObject",
            _name: "ImageObject",
            _parent: [
                "http://schema.org/MediaObject"
            ],
            caption: [
                "http://schema.org/MediaObject",
                "http://schema.org/Text"
            ],
            exifData: [
                "http://schema.org/PropertyValue",
                "http://schema.org/Text"
            ],
            representativeOfPage: [
                "http://schema.org/Boolean"
            ],
            thumbnail: [
                "http://schema.org/ImageObject"
            ]
        }
    ],
    [
        "http://schema.org/reservationpackage",
        {
            _id: "http://schema.org/ReservationPackage",
            _name: "ReservationPackage",
            _parent: [
                "http://schema.org/Reservation"
            ],
            subReservation: [
                "http://schema.org/Reservation"
            ]
        }
    ],
    [
        "http://schema.org/financialproduct",
        {
            _id: "http://schema.org/FinancialProduct",
            _name: "FinancialProduct",
            _parent: [
                "http://schema.org/Service"
            ],
            annualPercentageRate: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Number"
            ],
            feesAndCommissionsSpecification: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            interestRate: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/digitaldocument",
        {
            _id: "http://schema.org/DigitalDocument",
            _name: "DigitalDocument",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            hasDigitalDocumentPermission: [
                "http://schema.org/DigitalDocumentPermission"
            ]
        }
    ],
    [
        "http://schema.org/homeandconstructionbusiness",
        {
            _id: "http://schema.org/HomeAndConstructionBusiness",
            _name: "HomeAndConstructionBusiness",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/programmembership",
        {
            _id: "http://schema.org/ProgramMembership",
            _name: "ProgramMembership",
            _parent: [
                "http://schema.org/Intangible"
            ],
            hostingOrganization: [
                "http://schema.org/Organization"
            ],
            member: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            membershipNumber: [
                "http://schema.org/Text"
            ],
            programName: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/controlaction",
        {
            _id: "http://schema.org/ControlAction",
            _name: "ControlAction",
            _parent: [
                "http://schema.org/Action"
            ]
        }
    ],
    [
        "http://schema.org/checkaction",
        {
            _id: "http://schema.org/CheckAction",
            _name: "CheckAction",
            _parent: [
                "http://schema.org/FindAction"
            ]
        }
    ],
    [
        "http://schema.org/dancegroup",
        {
            _id: "http://schema.org/DanceGroup",
            _name: "DanceGroup",
            _parent: [
                "http://schema.org/PerformingGroup"
            ]
        }
    ],
    [
        "http://schema.org/discussionforumposting",
        {
            _id: "http://schema.org/DiscussionForumPosting",
            _name: "DiscussionForumPosting",
            _parent: [
                "http://schema.org/SocialMediaPosting"
            ]
        }
    ],
    [
        "http://schema.org/icecreamshop",
        {
            _id: "http://schema.org/IceCreamShop",
            _name: "IceCreamShop",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/touristattraction",
        {
            _id: "http://schema.org/TouristAttraction",
            _name: "TouristAttraction",
            _parent: [
                "http://schema.org/Place"
            ],
            availableLanguage: [
                "http://schema.org/Language",
                "http://schema.org/Text"
            ],
            touristType: [
                "http://schema.org/Audience",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/car",
        {
            _id: "http://schema.org/Car",
            _name: "Car",
            _parent: [
                "http://schema.org/Vehicle"
            ]
        }
    ],
    [
        "http://schema.org/pricespecification",
        {
            _id: "http://schema.org/PriceSpecification",
            _name: "PriceSpecification",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            eligibleQuantity: [
                "http://schema.org/QuantitativeValue"
            ],
            eligibleTransactionVolume: [
                "http://schema.org/PriceSpecification"
            ],
            maxPrice: [
                "http://schema.org/Number"
            ],
            minPrice: [
                "http://schema.org/Number"
            ],
            price: [
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            priceCurrency: [
                "http://schema.org/Text"
            ],
            validFrom: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            validThrough: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            valueAddedTaxIncluded: [
                "http://schema.org/Boolean"
            ]
        }
    ],
    [
        "http://schema.org/administrativearea",
        {
            _id: "http://schema.org/AdministrativeArea",
            _name: "AdministrativeArea",
            _parent: [
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/drawaction",
        {
            _id: "http://schema.org/DrawAction",
            _name: "DrawAction",
            _parent: [
                "http://schema.org/CreateAction"
            ]
        }
    ],
    [
        "http://schema.org/paymentcard",
        {
            _id: "http://schema.org/PaymentCard",
            _name: "PaymentCard",
            _parent: [
                "http://schema.org/PaymentMethod",
                "http://schema.org/FinancialProduct"
            ]
        }
    ],
    [
        "http://schema.org/publicationvolume",
        {
            _id: "http://schema.org/PublicationVolume",
            _name: "PublicationVolume",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            pageEnd: [
                "http://schema.org/Text",
                "http://schema.org/Integer"
            ],
            pageStart: [
                "http://schema.org/Integer",
                "http://schema.org/Text"
            ],
            pagination: [
                "http://schema.org/Text"
            ],
            volumeNumber: [
                "http://schema.org/Integer",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/localbusiness",
        {
            _id: "http://schema.org/LocalBusiness",
            _name: "LocalBusiness",
            _parent: [
                "http://schema.org/Place",
                "http://schema.org/Organization"
            ],
            currenciesAccepted: [
                "http://schema.org/Text"
            ],
            openingHours: [
                "http://schema.org/Text"
            ],
            paymentAccepted: [
                "http://schema.org/Text"
            ],
            priceRange: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/cancelaction",
        {
            _id: "http://schema.org/CancelAction",
            _name: "CancelAction",
            _parent: [
                "http://schema.org/PlanAction"
            ]
        }
    ],
    [
        "http://schema.org/ignoreaction",
        {
            _id: "http://schema.org/IgnoreAction",
            _name: "IgnoreAction",
            _parent: [
                "http://schema.org/AssessAction"
            ]
        }
    ],
    [
        "http://schema.org/musicrecording",
        {
            _id: "http://schema.org/MusicRecording",
            _name: "MusicRecording",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            byArtist: [
                "http://schema.org/Person",
                "http://schema.org/MusicGroup"
            ],
            duration: [
                "http://schema.org/Duration"
            ],
            inAlbum: [
                "http://schema.org/MusicAlbum"
            ],
            inPlaylist: [
                "http://schema.org/MusicPlaylist"
            ],
            isrcCode: [
                "http://schema.org/Text"
            ],
            recordingOf: [
                "http://schema.org/MusicComposition"
            ]
        }
    ],
    [
        "http://schema.org/motorcycledealer",
        {
            _id: "http://schema.org/MotorcycleDealer",
            _name: "MotorcycleDealer",
            _parent: [
                "http://schema.org/AutomotiveBusiness"
            ]
        }
    ],
    [
        "http://schema.org/checkoutaction",
        {
            _id: "http://schema.org/CheckOutAction",
            _name: "CheckOutAction",
            _parent: [
                "http://schema.org/CommunicateAction"
            ]
        }
    ],
    [
        "http://schema.org/bankaccount",
        {
            _id: "http://schema.org/BankAccount",
            _name: "BankAccount",
            _parent: [
                "http://schema.org/FinancialProduct"
            ]
        }
    ],
    [
        "http://schema.org/duration",
        {
            _id: "http://schema.org/Duration",
            _name: "Duration",
            _parent: [
                "http://schema.org/Quantity"
            ]
        }
    ],
    [
        "http://schema.org/realestateagent",
        {
            _id: "http://schema.org/RealEstateAgent",
            _name: "RealEstateAgent",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/sportsorganization",
        {
            _id: "http://schema.org/SportsOrganization",
            _name: "SportsOrganization",
            _parent: [
                "http://schema.org/Organization"
            ],
            sport: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ]
        }
    ],
    [
        "http://schema.org/endorseaction",
        {
            _id: "http://schema.org/EndorseAction",
            _name: "EndorseAction",
            _parent: [
                "http://schema.org/ReactAction"
            ],
            endorsee: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/educationalorganization",
        {
            _id: "http://schema.org/EducationalOrganization",
            _name: "EducationalOrganization",
            _parent: [
                "http://schema.org/Organization"
            ],
            alumni: [
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/cableorsatelliteservice",
        {
            _id: "http://schema.org/CableOrSatelliteService",
            _name: "CableOrSatelliteService",
            _parent: [
                "http://schema.org/Service"
            ]
        }
    ],
    [
        "http://schema.org/currencyconversionservice",
        {
            _id: "http://schema.org/CurrencyConversionService",
            _name: "CurrencyConversionService",
            _parent: [
                "http://schema.org/FinancialProduct"
            ]
        }
    ],
    [
        "http://schema.org/hindutemple",
        {
            _id: "http://schema.org/HinduTemple",
            _name: "HinduTemple",
            _parent: [
                "http://schema.org/PlaceOfWorship"
            ]
        }
    ],
    [
        "http://schema.org/tvseason",
        {
            _id: "http://schema.org/TVSeason",
            _name: "TVSeason",
            _parent: [
                "http://schema.org/CreativeWork",
                "http://schema.org/CreativeWorkSeason"
            ],
            countryOfOrigin: [
                "http://schema.org/Country"
            ]
        }
    ],
    [
        "http://schema.org/searchresultspage",
        {
            _id: "http://schema.org/SearchResultsPage",
            _name: "SearchResultsPage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/danceevent",
        {
            _id: "http://schema.org/DanceEvent",
            _name: "DanceEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/bookstore",
        {
            _id: "http://schema.org/BookStore",
            _name: "BookStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/entrypoint",
        {
            _id: "http://schema.org/EntryPoint",
            _name: "EntryPoint",
            _parent: [
                "http://schema.org/Intangible"
            ],
            actionApplication: [
                "http://schema.org/SoftwareApplication"
            ],
            actionPlatform: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            contentType: [
                "http://schema.org/Text"
            ],
            encodingType: [
                "http://schema.org/Text"
            ],
            httpMethod: [
                "http://schema.org/Text"
            ],
            urlTemplate: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/foodevent",
        {
            _id: "http://schema.org/FoodEvent",
            _name: "FoodEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/digitaldocumentpermission",
        {
            _id: "http://schema.org/DigitalDocumentPermission",
            _name: "DigitalDocumentPermission",
            _parent: [
                "http://schema.org/Intangible"
            ],
            grantee: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ],
            permissionType: [
                "http://schema.org/DigitalDocumentPermissionType"
            ]
        }
    ],
    [
        "http://schema.org/outletstore",
        {
            _id: "http://schema.org/OutletStore",
            _name: "OutletStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/orderaction",
        {
            _id: "http://schema.org/OrderAction",
            _name: "OrderAction",
            _parent: [
                "http://schema.org/TradeAction"
            ],
            deliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ]
        }
    ],
    [
        "http://schema.org/inviteaction",
        {
            _id: "http://schema.org/InviteAction",
            _name: "InviteAction",
            _parent: [
                "http://schema.org/CommunicateAction"
            ],
            event: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/tvepisode",
        {
            _id: "http://schema.org/TVEpisode",
            _name: "TVEpisode",
            _parent: [
                "http://schema.org/Episode"
            ],
            countryOfOrigin: [
                "http://schema.org/Country"
            ],
            subtitleLanguage: [
                "http://schema.org/Text",
                "http://schema.org/Language"
            ]
        }
    ],
    [
        "http://schema.org/musicgroup",
        {
            _id: "http://schema.org/MusicGroup",
            _name: "MusicGroup",
            _parent: [
                "http://schema.org/PerformingGroup"
            ],
            album: [
                "http://schema.org/MusicAlbum"
            ],
            genre: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            track: [
                "http://schema.org/ItemList",
                "http://schema.org/MusicRecording"
            ]
        }
    ],
    [
        "http://schema.org/amusementpark",
        {
            _id: "http://schema.org/AmusementPark",
            _name: "AmusementPark",
            _parent: [
                "http://schema.org/EntertainmentBusiness"
            ]
        }
    ],
    [
        "http://schema.org/casino",
        {
            _id: "http://schema.org/Casino",
            _name: "Casino",
            _parent: [
                "http://schema.org/EntertainmentBusiness"
            ]
        }
    ],
    [
        "http://schema.org/subscribeaction",
        {
            _id: "http://schema.org/SubscribeAction",
            _name: "SubscribeAction",
            _parent: [
                "http://schema.org/InteractAction"
            ]
        }
    ],
    [
        "http://schema.org/businessevent",
        {
            _id: "http://schema.org/BusinessEvent",
            _name: "BusinessEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/campingpitch",
        {
            _id: "http://schema.org/CampingPitch",
            _name: "CampingPitch",
            _parent: [
                "http://schema.org/Accommodation"
            ]
        }
    ],
    [
        "http://schema.org/gameserver",
        {
            _id: "http://schema.org/GameServer",
            _name: "GameServer",
            _parent: [
                "http://schema.org/Intangible"
            ],
            game: [
                "http://schema.org/VideoGame"
            ],
            playersOnline: [
                "http://schema.org/Integer"
            ],
            serverStatus: [
                "http://schema.org/GameServerStatus"
            ]
        }
    ],
    [
        "http://schema.org/depositaccount",
        {
            _id: "http://schema.org/DepositAccount",
            _name: "DepositAccount",
            _parent: [
                "http://schema.org/BankAccount",
                "http://schema.org/InvestmentOrDeposit"
            ]
        }
    ],
    [
        "http://schema.org/motel",
        {
            _id: "http://schema.org/Motel",
            _name: "Motel",
            _parent: [
                "http://schema.org/LodgingBusiness"
            ]
        }
    ],
    [
        "http://schema.org/painting",
        {
            _id: "http://schema.org/Painting",
            _name: "Painting",
            _parent: [
                "http://schema.org/CreativeWork"
            ]
        }
    ],
    [
        "http://schema.org/childcare",
        {
            _id: "http://schema.org/ChildCare",
            _name: "ChildCare",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/internetcafe",
        {
            _id: "http://schema.org/InternetCafe",
            _name: "InternetCafe",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/pharmacy",
        {
            _id: "http://schema.org/Pharmacy",
            _name: "Pharmacy",
            _parent: [
                "http://schema.org/MedicalBusiness",
                "http://schema.org/MedicalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/defenceestablishment",
        {
            _id: "http://schema.org/DefenceEstablishment",
            _name: "DefenceEstablishment",
            _parent: [
                "http://schema.org/GovernmentBuilding"
            ]
        }
    ],
    [
        "http://schema.org/breadcrumblist",
        {
            _id: "http://schema.org/BreadcrumbList",
            _name: "BreadcrumbList",
            _parent: [
                "http://schema.org/ItemList"
            ]
        }
    ],
    [
        "http://schema.org/church",
        {
            _id: "http://schema.org/Church",
            _name: "Church",
            _parent: [
                "http://schema.org/PlaceOfWorship"
            ]
        }
    ],
    [
        "http://schema.org/liquorstore",
        {
            _id: "http://schema.org/LiquorStore",
            _name: "LiquorStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/publicationissue",
        {
            _id: "http://schema.org/PublicationIssue",
            _name: "PublicationIssue",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            issueNumber: [
                "http://schema.org/Text",
                "http://schema.org/Integer"
            ],
            pageEnd: [
                "http://schema.org/Text",
                "http://schema.org/Integer"
            ],
            pageStart: [
                "http://schema.org/Integer",
                "http://schema.org/Text"
            ],
            pagination: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/continent",
        {
            _id: "http://schema.org/Continent",
            _name: "Continent",
            _parent: [
                "http://schema.org/Landform"
            ]
        }
    ],
    [
        "http://schema.org/article",
        {
            _id: "http://schema.org/Article",
            _name: "Article",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            articleBody: [
                "http://schema.org/Text"
            ],
            articleSection: [
                "http://schema.org/Text"
            ],
            pageEnd: [
                "http://schema.org/Text",
                "http://schema.org/Integer"
            ],
            pageStart: [
                "http://schema.org/Integer",
                "http://schema.org/Text"
            ],
            pagination: [
                "http://schema.org/Text"
            ],
            speakable: [
                "http://schema.org/SpeakableSpecification",
                "http://schema.org/URL"
            ],
            wordCount: [
                "http://schema.org/Integer"
            ]
        }
    ],
    [
        "http://schema.org/webpageelement",
        {
            _id: "http://schema.org/WebPageElement",
            _name: "WebPageElement",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            cssSelector: [
                "http://schema.org/CssSelectorType"
            ],
            xpath: [
                "http://schema.org/XPathType"
            ]
        }
    ],
    [
        "http://schema.org/videogame",
        {
            _id: "http://schema.org/VideoGame",
            _name: "VideoGame",
            _parent: [
                "http://schema.org/SoftwareApplication",
                "http://schema.org/Game"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            cheatCode: [
                "http://schema.org/CreativeWork"
            ],
            director: [
                "http://schema.org/Person"
            ],
            gamePlatform: [
                "http://schema.org/URL",
                "http://schema.org/Text",
                "http://schema.org/Thing"
            ],
            gameServer: [
                "http://schema.org/GameServer"
            ],
            gameTip: [
                "http://schema.org/CreativeWork"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            playMode: [
                "http://schema.org/GamePlayMode"
            ],
            trailer: [
                "http://schema.org/VideoObject"
            ]
        }
    ],
    [
        "http://schema.org/mobilephonestore",
        {
            _id: "http://schema.org/MobilePhoneStore",
            _name: "MobilePhoneStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/airline",
        {
            _id: "http://schema.org/Airline",
            _name: "Airline",
            _parent: [
                "http://schema.org/Organization"
            ],
            boardingPolicy: [
                "http://schema.org/BoardingPolicyType"
            ],
            iataCode: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/liveblogposting",
        {
            _id: "http://schema.org/LiveBlogPosting",
            _name: "LiveBlogPosting",
            _parent: [
                "http://schema.org/BlogPosting"
            ],
            coverageEndTime: [
                "http://schema.org/DateTime"
            ],
            coverageStartTime: [
                "http://schema.org/DateTime"
            ],
            liveBlogUpdate: [
                "http://schema.org/BlogPosting"
            ]
        }
    ],
    [
        "http://schema.org/bikestore",
        {
            _id: "http://schema.org/BikeStore",
            _name: "BikeStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/buddhisttemple",
        {
            _id: "http://schema.org/BuddhistTemple",
            _name: "BuddhistTemple",
            _parent: [
                "http://schema.org/PlaceOfWorship"
            ]
        }
    ],
    [
        "http://schema.org/menusection",
        {
            _id: "http://schema.org/MenuSection",
            _name: "MenuSection",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            hasMenuItem: [
                "http://schema.org/MenuItem"
            ],
            hasMenuSection: [
                "http://schema.org/MenuSection"
            ]
        }
    ],
    [
        "http://schema.org/autorental",
        {
            _id: "http://schema.org/AutoRental",
            _name: "AutoRental",
            _parent: [
                "http://schema.org/AutomotiveBusiness"
            ]
        }
    ],
    [
        "http://schema.org/loanorcredit",
        {
            _id: "http://schema.org/LoanOrCredit",
            _name: "LoanOrCredit",
            _parent: [
                "http://schema.org/FinancialProduct"
            ],
            amount: [
                "http://schema.org/MonetaryAmount",
                "http://schema.org/Number"
            ],
            currency: [
                "http://schema.org/Text"
            ],
            loanTerm: [
                "http://schema.org/QuantitativeValue"
            ],
            requiredCollateral: [
                "http://schema.org/Thing",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/hotelroom",
        {
            _id: "http://schema.org/HotelRoom",
            _name: "HotelRoom",
            _parent: [
                "http://schema.org/Room"
            ],
            bed: [
                "http://schema.org/BedDetails",
                "http://schema.org/Text",
                "http://schema.org/BedType"
            ],
            occupancy: [
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/zoo",
        {
            _id: "http://schema.org/Zoo",
            _name: "Zoo",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/website",
        {
            _id: "http://schema.org/WebSite",
            _name: "WebSite",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            issn: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/movie",
        {
            _id: "http://schema.org/Movie",
            _name: "Movie",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            countryOfOrigin: [
                "http://schema.org/Country"
            ],
            director: [
                "http://schema.org/Person"
            ],
            duration: [
                "http://schema.org/Duration"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            productionCompany: [
                "http://schema.org/Organization"
            ],
            subtitleLanguage: [
                "http://schema.org/Text",
                "http://schema.org/Language"
            ],
            trailer: [
                "http://schema.org/VideoObject"
            ]
        }
    ],
    [
        "http://schema.org/eventreservation",
        {
            _id: "http://schema.org/EventReservation",
            _name: "EventReservation",
            _parent: [
                "http://schema.org/Reservation"
            ]
        }
    ],
    [
        "http://schema.org/organizeaction",
        {
            _id: "http://schema.org/OrganizeAction",
            _name: "OrganizeAction",
            _parent: [
                "http://schema.org/Action"
            ]
        }
    ],
    [
        "http://schema.org/audience",
        {
            _id: "http://schema.org/Audience",
            _name: "Audience",
            _parent: [
                "http://schema.org/Intangible"
            ],
            audienceType: [
                "http://schema.org/Text"
            ],
            geographicArea: [
                "http://schema.org/AdministrativeArea"
            ]
        }
    ],
    [
        "http://schema.org/restaurant",
        {
            _id: "http://schema.org/Restaurant",
            _name: "Restaurant",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/agreeaction",
        {
            _id: "http://schema.org/AgreeAction",
            _name: "AgreeAction",
            _parent: [
                "http://schema.org/ReactAction"
            ]
        }
    ],
    [
        "http://schema.org/integer",
        {
            _id: "http://schema.org/Integer",
            _name: "Integer",
            _parent: [
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/useaction",
        {
            _id: "http://schema.org/UseAction",
            _name: "UseAction",
            _parent: [
                "http://schema.org/ConsumeAction"
            ]
        }
    ],
    [
        "http://schema.org/apireference",
        {
            _id: "http://schema.org/APIReference",
            _name: "APIReference",
            _parent: [
                "http://schema.org/TechArticle"
            ],
            assemblyVersion: [
                "http://schema.org/Text"
            ],
            executableLibraryName: [
                "http://schema.org/Text"
            ],
            programmingModel: [
                "http://schema.org/Text"
            ],
            targetPlatform: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/departmentstore",
        {
            _id: "http://schema.org/DepartmentStore",
            _name: "DepartmentStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/filmaction",
        {
            _id: "http://schema.org/FilmAction",
            _name: "FilmAction",
            _parent: [
                "http://schema.org/CreateAction"
            ]
        }
    ],
    [
        "http://schema.org/mobileapplication",
        {
            _id: "http://schema.org/MobileApplication",
            _name: "MobileApplication",
            _parent: [
                "http://schema.org/SoftwareApplication"
            ],
            carrierRequirements: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/softwareapplication",
        {
            _id: "http://schema.org/SoftwareApplication",
            _name: "SoftwareApplication",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            applicationCategory: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            applicationSubCategory: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            applicationSuite: [
                "http://schema.org/Text"
            ],
            availableOnDevice: [
                "http://schema.org/Text"
            ],
            countriesNotSupported: [
                "http://schema.org/Text"
            ],
            countriesSupported: [
                "http://schema.org/Text"
            ],
            downloadUrl: [
                "http://schema.org/URL"
            ],
            featureList: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            fileSize: [
                "http://schema.org/Text"
            ],
            installUrl: [
                "http://schema.org/URL"
            ],
            memoryRequirements: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            operatingSystem: [
                "http://schema.org/Text"
            ],
            permissions: [
                "http://schema.org/Text"
            ],
            processorRequirements: [
                "http://schema.org/Text"
            ],
            releaseNotes: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            screenshot: [
                "http://schema.org/ImageObject",
                "http://schema.org/URL"
            ],
            softwareAddOn: [
                "http://schema.org/SoftwareApplication"
            ],
            softwareHelp: [
                "http://schema.org/CreativeWork"
            ],
            softwareRequirements: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            softwareVersion: [
                "http://schema.org/Text"
            ],
            storageRequirements: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            supportingData: [
                "http://schema.org/DataFeed"
            ]
        }
    ],
    [
        "http://schema.org/sportinggoodsstore",
        {
            _id: "http://schema.org/SportingGoodsStore",
            _name: "SportingGoodsStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/textdigitaldocument",
        {
            _id: "http://schema.org/TextDigitalDocument",
            _name: "TextDigitalDocument",
            _parent: [
                "http://schema.org/DigitalDocument"
            ]
        }
    ],
    [
        "http://schema.org/quantitativevaluedistribution",
        {
            _id: "http://schema.org/QuantitativeValueDistribution",
            _name: "QuantitativeValueDistribution",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            duration: [
                "http://schema.org/Duration"
            ],
            median: [
                "http://schema.org/Number"
            ],
            percentile10: [
                "http://schema.org/Number"
            ],
            percentile25: [
                "http://schema.org/Number"
            ],
            percentile75: [
                "http://schema.org/Number"
            ],
            percentile90: [
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/waterfall",
        {
            _id: "http://schema.org/Waterfall",
            _name: "Waterfall",
            _parent: [
                "http://schema.org/BodyOfWater"
            ]
        }
    ],
    [
        "http://schema.org/officeequipmentstore",
        {
            _id: "http://schema.org/OfficeEquipmentStore",
            _name: "OfficeEquipmentStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/planaction",
        {
            _id: "http://schema.org/PlanAction",
            _name: "PlanAction",
            _parent: [
                "http://schema.org/OrganizeAction"
            ],
            scheduledTime: [
                "http://schema.org/DateTime"
            ]
        }
    ],
    [
        "http://schema.org/movietheater",
        {
            _id: "http://schema.org/MovieTheater",
            _name: "MovieTheater",
            _parent: [
                "http://schema.org/CivicStructure",
                "http://schema.org/EntertainmentBusiness"
            ],
            screenCount: [
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/gatedresidencecommunity",
        {
            _id: "http://schema.org/GatedResidenceCommunity",
            _name: "GatedResidenceCommunity",
            _parent: [
                "http://schema.org/Residence"
            ]
        }
    ],
    [
        "http://schema.org/country",
        {
            _id: "http://schema.org/Country",
            _name: "Country",
            _parent: [
                "http://schema.org/AdministrativeArea"
            ]
        }
    ],
    [
        "http://schema.org/placeofworship",
        {
            _id: "http://schema.org/PlaceOfWorship",
            _name: "PlaceOfWorship",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/howtotip",
        {
            _id: "http://schema.org/HowToTip",
            _name: "HowToTip",
            _parent: [
                "http://schema.org/CreativeWork",
                "http://schema.org/ListItem"
            ]
        }
    ],
    [
        "http://schema.org/performancerole",
        {
            _id: "http://schema.org/PerformanceRole",
            _name: "PerformanceRole",
            _parent: [
                "http://schema.org/Role"
            ],
            characterName: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/unitpricespecification",
        {
            _id: "http://schema.org/UnitPriceSpecification",
            _name: "UnitPriceSpecification",
            _parent: [
                "http://schema.org/PriceSpecification"
            ],
            billingIncrement: [
                "http://schema.org/Number"
            ],
            priceType: [
                "http://schema.org/Text"
            ],
            referenceQuantity: [
                "http://schema.org/QuantitativeValue"
            ],
            unitCode: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            unitText: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/performaction",
        {
            _id: "http://schema.org/PerformAction",
            _name: "PerformAction",
            _parent: [
                "http://schema.org/PlayAction"
            ],
            entertainmentBusiness: [
                "http://schema.org/EntertainmentBusiness"
            ]
        }
    ],
    [
        "http://schema.org/bedtype",
        {
            _id: "http://schema.org/BedType",
            _name: "BedType",
            _parent: [
                "http://schema.org/QualitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/mountain",
        {
            _id: "http://schema.org/Mountain",
            _name: "Mountain",
            _parent: [
                "http://schema.org/Landform"
            ]
        }
    ],
    [
        "http://schema.org/civicstructure",
        {
            _id: "http://schema.org/CivicStructure",
            _name: "CivicStructure",
            _parent: [
                "http://schema.org/Place"
            ],
            openingHours: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/receiveaction",
        {
            _id: "http://schema.org/ReceiveAction",
            _name: "ReceiveAction",
            _parent: [
                "http://schema.org/TransferAction"
            ],
            deliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ],
            sender: [
                "http://schema.org/Audience",
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/videogameclip",
        {
            _id: "http://schema.org/VideoGameClip",
            _name: "VideoGameClip",
            _parent: [
                "http://schema.org/Clip"
            ]
        }
    ],
    [
        "http://schema.org/musicstore",
        {
            _id: "http://schema.org/MusicStore",
            _name: "MusicStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/crematorium",
        {
            _id: "http://schema.org/Crematorium",
            _name: "Crematorium",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/quoteaction",
        {
            _id: "http://schema.org/QuoteAction",
            _name: "QuoteAction",
            _parent: [
                "http://schema.org/TradeAction"
            ]
        }
    ],
    [
        "http://schema.org/propertyvalue",
        {
            _id: "http://schema.org/PropertyValue",
            _name: "PropertyValue",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            maxValue: [
                "http://schema.org/Number"
            ],
            minValue: [
                "http://schema.org/Number"
            ],
            propertyID: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            unitCode: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            unitText: [
                "http://schema.org/Text"
            ],
            value: [
                "http://schema.org/StructuredValue",
                "http://schema.org/Text",
                "http://schema.org/Boolean",
                "http://schema.org/Number"
            ],
            valueReference: [
                "http://schema.org/StructuredValue",
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Enumeration",
                "http://schema.org/PropertyValue",
                "http://schema.org/QualitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/listitem",
        {
            _id: "http://schema.org/ListItem",
            _name: "ListItem",
            _parent: [
                "http://schema.org/Intangible"
            ],
            item: [
                "http://schema.org/Thing"
            ],
            nextItem: [
                "http://schema.org/ListItem"
            ],
            position: [
                "http://schema.org/Text",
                "http://schema.org/Integer"
            ],
            previousItem: [
                "http://schema.org/ListItem"
            ]
        }
    ],
    [
        "http://schema.org/contactpage",
        {
            _id: "http://schema.org/ContactPage",
            _name: "ContactPage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/webapplication",
        {
            _id: "http://schema.org/WebApplication",
            _name: "WebApplication",
            _parent: [
                "http://schema.org/SoftwareApplication"
            ],
            browserRequirements: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/broadcastfrequencyspecification",
        {
            _id: "http://schema.org/BroadcastFrequencySpecification",
            _name: "BroadcastFrequencySpecification",
            _parent: [
                "http://schema.org/Intangible"
            ],
            broadcastFrequencyValue: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/blogposting",
        {
            _id: "http://schema.org/BlogPosting",
            _name: "BlogPosting",
            _parent: [
                "http://schema.org/SocialMediaPosting"
            ]
        }
    ],
    [
        "http://schema.org/lodgingreservation",
        {
            _id: "http://schema.org/LodgingReservation",
            _name: "LodgingReservation",
            _parent: [
                "http://schema.org/Reservation"
            ],
            checkinTime: [
                "http://schema.org/Time",
                "http://schema.org/DateTime"
            ],
            checkoutTime: [
                "http://schema.org/DateTime",
                "http://schema.org/Time"
            ],
            lodgingUnitDescription: [
                "http://schema.org/Text"
            ],
            lodgingUnitType: [
                "http://schema.org/QualitativeValue",
                "http://schema.org/Text"
            ],
            numAdults: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Integer"
            ],
            numChildren: [
                "http://schema.org/Integer",
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/preorderaction",
        {
            _id: "http://schema.org/PreOrderAction",
            _name: "PreOrderAction",
            _parent: [
                "http://schema.org/TradeAction"
            ]
        }
    ],
    [
        "http://schema.org/mediasubscription",
        {
            _id: "http://schema.org/MediaSubscription",
            _name: "MediaSubscription",
            _parent: [
                "http://schema.org/Intangible"
            ],
            authenticator: [
                "http://schema.org/Organization"
            ],
            expectsAcceptanceOf: [
                "http://schema.org/Offer"
            ]
        }
    ],
    [
        "http://schema.org/presentationdigitaldocument",
        {
            _id: "http://schema.org/PresentationDigitalDocument",
            _name: "PresentationDigitalDocument",
            _parent: [
                "http://schema.org/DigitalDocument"
            ]
        }
    ],
    [
        "http://schema.org/report",
        {
            _id: "http://schema.org/Report",
            _name: "Report",
            _parent: [
                "http://schema.org/Article"
            ],
            reportNumber: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/structuredvalue",
        {
            _id: "http://schema.org/StructuredValue",
            _name: "StructuredValue",
            _parent: [
                "http://schema.org/Intangible"
            ]
        }
    ],
    [
        "http://schema.org/musicrelease",
        {
            _id: "http://schema.org/MusicRelease",
            _name: "MusicRelease",
            _parent: [
                "http://schema.org/MusicPlaylist"
            ],
            catalogNumber: [
                "http://schema.org/Text"
            ],
            creditedTo: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            duration: [
                "http://schema.org/Duration"
            ],
            musicReleaseFormat: [
                "http://schema.org/MusicReleaseFormatType"
            ],
            recordLabel: [
                "http://schema.org/Organization"
            ],
            releaseOf: [
                "http://schema.org/MusicAlbum"
            ]
        }
    ],
    [
        "http://schema.org/techarticle",
        {
            _id: "http://schema.org/TechArticle",
            _name: "TechArticle",
            _parent: [
                "http://schema.org/Article"
            ],
            dependencies: [
                "http://schema.org/Text"
            ],
            proficiencyLevel: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/sculpture",
        {
            _id: "http://schema.org/Sculpture",
            _name: "Sculpture",
            _parent: [
                "http://schema.org/CreativeWork"
            ]
        }
    ],
    [
        "http://schema.org/saleevent",
        {
            _id: "http://schema.org/SaleEvent",
            _name: "SaleEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/computerstore",
        {
            _id: "http://schema.org/ComputerStore",
            _name: "ComputerStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/radiostation",
        {
            _id: "http://schema.org/RadioStation",
            _name: "RadioStation",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/map",
        {
            _id: "http://schema.org/Map",
            _name: "Map",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            mapType: [
                "http://schema.org/MapCategoryType"
            ]
        }
    ],
    [
        "http://schema.org/golfcourse",
        {
            _id: "http://schema.org/GolfCourse",
            _name: "GolfCourse",
            _parent: [
                "http://schema.org/SportsActivityLocation"
            ]
        }
    ],
    [
        "http://schema.org/departaction",
        {
            _id: "http://schema.org/DepartAction",
            _name: "DepartAction",
            _parent: [
                "http://schema.org/MoveAction"
            ]
        }
    ],
    [
        "http://schema.org/actionaccessspecification",
        {
            _id: "http://schema.org/ActionAccessSpecification",
            _name: "ActionAccessSpecification",
            _parent: [
                "http://schema.org/Intangible"
            ],
            availabilityEnds: [
                "http://schema.org/DateTime",
                "http://schema.org/Time",
                "http://schema.org/Date"
            ],
            availabilityStarts: [
                "http://schema.org/Time",
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            category: [
                "http://schema.org/Thing",
                "http://schema.org/Text",
                "http://schema.org/PhysicalActivityCategory"
            ],
            eligibleRegion: [
                "http://schema.org/GeoShape",
                "http://schema.org/Text",
                "http://schema.org/Place"
            ],
            expectsAcceptanceOf: [
                "http://schema.org/Offer"
            ],
            requiresSubscription: [
                "http://schema.org/MediaSubscription",
                "http://schema.org/Boolean"
            ]
        }
    ],
    [
        "http://schema.org/comment",
        {
            _id: "http://schema.org/Comment",
            _name: "Comment",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            downvoteCount: [
                "http://schema.org/Integer"
            ],
            parentItem: [
                "http://schema.org/Question"
            ],
            upvoteCount: [
                "http://schema.org/Integer"
            ]
        }
    ],
    [
        "http://schema.org/shoestore",
        {
            _id: "http://schema.org/ShoeStore",
            _name: "ShoeStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/suspendaction",
        {
            _id: "http://schema.org/SuspendAction",
            _name: "SuspendAction",
            _parent: [
                "http://schema.org/ControlAction"
            ]
        }
    ],
    [
        "http://schema.org/wpsidebar",
        {
            _id: "http://schema.org/WPSideBar",
            _name: "WPSideBar",
            _parent: [
                "http://schema.org/WebPageElement"
            ]
        }
    ],
    [
        "http://schema.org/flightreservation",
        {
            _id: "http://schema.org/FlightReservation",
            _name: "FlightReservation",
            _parent: [
                "http://schema.org/Reservation"
            ],
            boardingGroup: [
                "http://schema.org/Text"
            ],
            passengerPriorityStatus: [
                "http://schema.org/Text",
                "http://schema.org/QualitativeValue"
            ],
            passengerSequenceNumber: [
                "http://schema.org/Text"
            ],
            securityScreening: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/alignmentobject",
        {
            _id: "http://schema.org/AlignmentObject",
            _name: "AlignmentObject",
            _parent: [
                "http://schema.org/Intangible"
            ],
            alignmentType: [
                "http://schema.org/Text"
            ],
            educationalFramework: [
                "http://schema.org/Text"
            ],
            targetDescription: [
                "http://schema.org/Text"
            ],
            targetName: [
                "http://schema.org/Text"
            ],
            targetUrl: [
                "http://schema.org/URL"
            ]
        }
    ],
    [
        "http://schema.org/sellaction",
        {
            _id: "http://schema.org/SellAction",
            _name: "SellAction",
            _parent: [
                "http://schema.org/TradeAction"
            ],
            buyer: [
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/petstore",
        {
            _id: "http://schema.org/PetStore",
            _name: "PetStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/ondemandevent",
        {
            _id: "http://schema.org/OnDemandEvent",
            _name: "OnDemandEvent",
            _parent: [
                "http://schema.org/PublicationEvent"
            ]
        }
    ],
    [
        "http://schema.org/autodealer",
        {
            _id: "http://schema.org/AutoDealer",
            _name: "AutoDealer",
            _parent: [
                "http://schema.org/AutomotiveBusiness"
            ]
        }
    ],
    [
        "http://schema.org/chooseaction",
        {
            _id: "http://schema.org/ChooseAction",
            _name: "ChooseAction",
            _parent: [
                "http://schema.org/AssessAction"
            ],
            actionOption: [
                "http://schema.org/Thing",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/locationfeaturespecification",
        {
            _id: "http://schema.org/LocationFeatureSpecification",
            _name: "LocationFeatureSpecification",
            _parent: [
                "http://schema.org/PropertyValue"
            ],
            hoursAvailable: [
                "http://schema.org/OpeningHoursSpecification"
            ],
            validFrom: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            validThrough: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ]
        }
    ],
    [
        "http://schema.org/governmentoffice",
        {
            _id: "http://schema.org/GovernmentOffice",
            _name: "GovernmentOffice",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/place",
        {
            _id: "http://schema.org/Place",
            _name: "Place",
            _parent: [
                "http://schema.org/Thing"
            ],
            additionalProperty: [
                "http://schema.org/PropertyValue"
            ],
            address: [
                "http://schema.org/Text",
                "http://schema.org/PostalAddress"
            ],
            aggregateRating: [
                "http://schema.org/AggregateRating"
            ],
            amenityFeature: [
                "http://schema.org/LocationFeatureSpecification"
            ],
            branchCode: [
                "http://schema.org/Text"
            ],
            containedInPlace: [
                "http://schema.org/Place"
            ],
            containsPlace: [
                "http://schema.org/Place"
            ],
            event: [
                "http://schema.org/Event"
            ],
            faxNumber: [
                "http://schema.org/Text"
            ],
            geo: [
                "http://schema.org/GeoCoordinates",
                "http://schema.org/GeoShape"
            ],
            geoContains: [
                "http://schema.org/Place",
                "http://schema.org/GeospatialGeometry"
            ],
            geoCoveredBy: [
                "http://schema.org/Place",
                "http://schema.org/GeospatialGeometry"
            ],
            geoCovers: [
                "http://schema.org/GeospatialGeometry",
                "http://schema.org/Place"
            ],
            geoCrosses: [
                "http://schema.org/GeospatialGeometry",
                "http://schema.org/Place"
            ],
            geoDisjoint: [
                "http://schema.org/GeospatialGeometry",
                "http://schema.org/Place"
            ],
            geoEquals: [
                "http://schema.org/Place",
                "http://schema.org/GeospatialGeometry"
            ],
            geoIntersects: [
                "http://schema.org/Place",
                "http://schema.org/GeospatialGeometry"
            ],
            geoOverlaps: [
                "http://schema.org/GeospatialGeometry",
                "http://schema.org/Place"
            ],
            geoTouches: [
                "http://schema.org/Place",
                "http://schema.org/GeospatialGeometry"
            ],
            geoWithin: [
                "http://schema.org/GeospatialGeometry",
                "http://schema.org/Place"
            ],
            globalLocationNumber: [
                "http://schema.org/Text"
            ],
            hasMap: [
                "http://schema.org/Map",
                "http://schema.org/URL"
            ],
            isAccessibleForFree: [
                "http://schema.org/Boolean"
            ],
            isicV4: [
                "http://schema.org/Text"
            ],
            logo: [
                "http://schema.org/URL",
                "http://schema.org/ImageObject"
            ],
            maximumAttendeeCapacity: [
                "http://schema.org/Integer"
            ],
            openingHoursSpecification: [
                "http://schema.org/OpeningHoursSpecification"
            ],
            photo: [
                "http://schema.org/Photograph",
                "http://schema.org/ImageObject"
            ],
            publicAccess: [
                "http://schema.org/Boolean"
            ],
            review: [
                "http://schema.org/Review"
            ],
            slogan: [
                "http://schema.org/Text"
            ],
            smokingAllowed: [
                "http://schema.org/Boolean"
            ],
            specialOpeningHoursSpecification: [
                "http://schema.org/OpeningHoursSpecification"
            ],
            telephone: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/sendaction",
        {
            _id: "http://schema.org/SendAction",
            _name: "SendAction",
            _parent: [
                "http://schema.org/TransferAction"
            ],
            deliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ]
        }
    ],
    [
        "http://schema.org/leaveaction",
        {
            _id: "http://schema.org/LeaveAction",
            _name: "LeaveAction",
            _parent: [
                "http://schema.org/InteractAction"
            ],
            event: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/gasstation",
        {
            _id: "http://schema.org/GasStation",
            _name: "GasStation",
            _parent: [
                "http://schema.org/AutomotiveBusiness"
            ]
        }
    ],
    [
        "http://schema.org/mosque",
        {
            _id: "http://schema.org/Mosque",
            _name: "Mosque",
            _parent: [
                "http://schema.org/PlaceOfWorship"
            ]
        }
    ],
    [
        "http://schema.org/assessaction",
        {
            _id: "http://schema.org/AssessAction",
            _name: "AssessAction",
            _parent: [
                "http://schema.org/Action"
            ]
        }
    ],
    [
        "http://schema.org/commentaction",
        {
            _id: "http://schema.org/CommentAction",
            _name: "CommentAction",
            _parent: [
                "http://schema.org/CommunicateAction"
            ],
            resultComment: [
                "http://schema.org/Comment"
            ]
        }
    ],
    [
        "http://schema.org/library",
        {
            _id: "http://schema.org/Library",
            _name: "Library",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/touristinformationcenter",
        {
            _id: "http://schema.org/TouristInformationCenter",
            _name: "TouristInformationCenter",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/musiccomposition",
        {
            _id: "http://schema.org/MusicComposition",
            _name: "MusicComposition",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            composer: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            firstPerformance: [
                "http://schema.org/Event"
            ],
            includedComposition: [
                "http://schema.org/MusicComposition"
            ],
            iswcCode: [
                "http://schema.org/Text"
            ],
            lyricist: [
                "http://schema.org/Person"
            ],
            lyrics: [
                "http://schema.org/CreativeWork"
            ],
            musicalKey: [
                "http://schema.org/Text"
            ],
            musicArrangement: [
                "http://schema.org/MusicComposition"
            ],
            musicCompositionForm: [
                "http://schema.org/Text"
            ],
            recordedAs: [
                "http://schema.org/MusicRecording"
            ]
        }
    ],
    [
        "http://schema.org/professionalservice",
        {
            _id: "http://schema.org/ProfessionalService",
            _name: "ProfessionalService",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/selfstorage",
        {
            _id: "http://schema.org/SelfStorage",
            _name: "SelfStorage",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/scholarlyarticle",
        {
            _id: "http://schema.org/ScholarlyArticle",
            _name: "ScholarlyArticle",
            _parent: [
                "http://schema.org/Article"
            ]
        }
    ],
    [
        "http://schema.org/geoshape",
        {
            _id: "http://schema.org/GeoShape",
            _name: "GeoShape",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            address: [
                "http://schema.org/Text",
                "http://schema.org/PostalAddress"
            ],
            addressCountry: [
                "http://schema.org/Country",
                "http://schema.org/Text"
            ],
            box: [
                "http://schema.org/Text"
            ],
            circle: [
                "http://schema.org/Text"
            ],
            elevation: [
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            line: [
                "http://schema.org/Text"
            ],
            polygon: [
                "http://schema.org/Text"
            ],
            postalCode: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/entertainmentbusiness",
        {
            _id: "http://schema.org/EntertainmentBusiness",
            _name: "EntertainmentBusiness",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/broadcastchannel",
        {
            _id: "http://schema.org/BroadcastChannel",
            _name: "BroadcastChannel",
            _parent: [
                "http://schema.org/Intangible"
            ],
            broadcastChannelId: [
                "http://schema.org/Text"
            ],
            broadcastFrequency: [
                "http://schema.org/BroadcastFrequencySpecification",
                "http://schema.org/Text"
            ],
            broadcastServiceTier: [
                "http://schema.org/Text"
            ],
            genre: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            inBroadcastLineup: [
                "http://schema.org/CableOrSatelliteService"
            ],
            providesBroadcastService: [
                "http://schema.org/BroadcastService"
            ]
        }
    ],
    [
        "http://schema.org/florist",
        {
            _id: "http://schema.org/Florist",
            _name: "Florist",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/mass",
        {
            _id: "http://schema.org/Mass",
            _name: "Mass",
            _parent: [
                "http://schema.org/Quantity"
            ]
        }
    ],
    [
        "http://schema.org/howtotool",
        {
            _id: "http://schema.org/HowToTool",
            _name: "HowToTool",
            _parent: [
                "http://schema.org/HowToItem"
            ]
        }
    ],
    [
        "http://schema.org/barcode",
        {
            _id: "http://schema.org/Barcode",
            _name: "Barcode",
            _parent: [
                "http://schema.org/ImageObject"
            ]
        }
    ],
    [
        "http://schema.org/webpage",
        {
            _id: "http://schema.org/WebPage",
            _name: "WebPage",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            breadcrumb: [
                "http://schema.org/Text",
                "http://schema.org/BreadcrumbList"
            ],
            lastReviewed: [
                "http://schema.org/Date"
            ],
            mainContentOfPage: [
                "http://schema.org/WebPageElement"
            ],
            primaryImageOfPage: [
                "http://schema.org/ImageObject"
            ],
            relatedLink: [
                "http://schema.org/URL"
            ],
            reviewedBy: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            significantLink: [
                "http://schema.org/URL"
            ],
            speakable: [
                "http://schema.org/SpeakableSpecification",
                "http://schema.org/URL"
            ],
            specialty: [
                "http://schema.org/Specialty"
            ]
        }
    ],
    [
        "http://schema.org/residence",
        {
            _id: "http://schema.org/Residence",
            _name: "Residence",
            _parent: [
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/replyaction",
        {
            _id: "http://schema.org/ReplyAction",
            _name: "ReplyAction",
            _parent: [
                "http://schema.org/CommunicateAction"
            ],
            resultComment: [
                "http://schema.org/Comment"
            ]
        }
    ],
    [
        "http://schema.org/bustrip",
        {
            _id: "http://schema.org/BusTrip",
            _name: "BusTrip",
            _parent: [
                "http://schema.org/Trip"
            ],
            arrivalBusStop: [
                "http://schema.org/BusStop",
                "http://schema.org/BusStation"
            ],
            busName: [
                "http://schema.org/Text"
            ],
            busNumber: [
                "http://schema.org/Text"
            ],
            departureBusStop: [
                "http://schema.org/BusStation",
                "http://schema.org/BusStop"
            ]
        }
    ],
    [
        "http://schema.org/unregisteraction",
        {
            _id: "http://schema.org/UnRegisterAction",
            _name: "UnRegisterAction",
            _parent: [
                "http://schema.org/InteractAction"
            ]
        }
    ],
    [
        "http://schema.org/loseaction",
        {
            _id: "http://schema.org/LoseAction",
            _name: "LoseAction",
            _parent: [
                "http://schema.org/AchieveAction"
            ],
            winner: [
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/shoppingcenter",
        {
            _id: "http://schema.org/ShoppingCenter",
            _name: "ShoppingCenter",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/flight",
        {
            _id: "http://schema.org/Flight",
            _name: "Flight",
            _parent: [
                "http://schema.org/Trip"
            ],
            aircraft: [
                "http://schema.org/Vehicle",
                "http://schema.org/Text"
            ],
            arrivalAirport: [
                "http://schema.org/Airport"
            ],
            arrivalGate: [
                "http://schema.org/Text"
            ],
            arrivalTerminal: [
                "http://schema.org/Text"
            ],
            boardingPolicy: [
                "http://schema.org/BoardingPolicyType"
            ],
            departureAirport: [
                "http://schema.org/Airport"
            ],
            departureGate: [
                "http://schema.org/Text"
            ],
            departureTerminal: [
                "http://schema.org/Text"
            ],
            estimatedFlightDuration: [
                "http://schema.org/Duration",
                "http://schema.org/Text"
            ],
            flightDistance: [
                "http://schema.org/Distance",
                "http://schema.org/Text"
            ],
            flightNumber: [
                "http://schema.org/Text"
            ],
            mealService: [
                "http://schema.org/Text"
            ],
            seller: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            webCheckinTime: [
                "http://schema.org/DateTime"
            ]
        }
    ],
    [
        "http://schema.org/howtostep",
        {
            _id: "http://schema.org/HowToStep",
            _name: "HowToStep",
            _parent: [
                "http://schema.org/CreativeWork",
                "http://schema.org/ItemList",
                "http://schema.org/ListItem"
            ]
        }
    ],
    [
        "http://schema.org/offercatalog",
        {
            _id: "http://schema.org/OfferCatalog",
            _name: "OfferCatalog",
            _parent: [
                "http://schema.org/ItemList"
            ]
        }
    ],
    [
        "http://schema.org/creativeworkseries",
        {
            _id: "http://schema.org/CreativeWorkSeries",
            _name: "CreativeWorkSeries",
            _parent: [
                "http://schema.org/CreativeWork",
                "http://schema.org/Series"
            ],
            endDate: [
                "http://schema.org/DateTime",
                "http://schema.org/Date"
            ],
            issn: [
                "http://schema.org/Text"
            ],
            startDate: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ]
        }
    ],
    [
        "http://schema.org/datafeed",
        {
            _id: "http://schema.org/DataFeed",
            _name: "DataFeed",
            _parent: [
                "http://schema.org/Dataset"
            ],
            dataFeedElement: [
                "http://schema.org/DataFeedItem",
                "http://schema.org/Thing",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/state",
        {
            _id: "http://schema.org/State",
            _name: "State",
            _parent: [
                "http://schema.org/AdministrativeArea"
            ]
        }
    ],
    [
        "http://schema.org/playground",
        {
            _id: "http://schema.org/Playground",
            _name: "Playground",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/appendaction",
        {
            _id: "http://schema.org/AppendAction",
            _name: "AppendAction",
            _parent: [
                "http://schema.org/InsertAction"
            ]
        }
    ],
    [
        "http://schema.org/interactioncounter",
        {
            _id: "http://schema.org/InteractionCounter",
            _name: "InteractionCounter",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            interactionService: [
                "http://schema.org/SoftwareApplication",
                "http://schema.org/WebSite"
            ],
            interactionType: [
                "http://schema.org/Action"
            ],
            userInteractionCount: [
                "http://schema.org/Integer"
            ]
        }
    ],
    [
        "http://schema.org/parkingfacility",
        {
            _id: "http://schema.org/ParkingFacility",
            _name: "ParkingFacility",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/cookaction",
        {
            _id: "http://schema.org/CookAction",
            _name: "CookAction",
            _parent: [
                "http://schema.org/CreateAction"
            ],
            foodEstablishment: [
                "http://schema.org/Place",
                "http://schema.org/FoodEstablishment"
            ],
            foodEvent: [
                "http://schema.org/FoodEvent"
            ],
            recipe: [
                "http://schema.org/Recipe"
            ]
        }
    ],
    [
        "http://schema.org/authorizeaction",
        {
            _id: "http://schema.org/AuthorizeAction",
            _name: "AuthorizeAction",
            _parent: [
                "http://schema.org/AllocateAction"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ]
        }
    ],
    [
        "http://schema.org/bookseries",
        {
            _id: "http://schema.org/BookSeries",
            _name: "BookSeries",
            _parent: [
                "http://schema.org/CreativeWorkSeries"
            ]
        }
    ],
    [
        "http://schema.org/pawnshop",
        {
            _id: "http://schema.org/PawnShop",
            _name: "PawnShop",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/assignaction",
        {
            _id: "http://schema.org/AssignAction",
            _name: "AssignAction",
            _parent: [
                "http://schema.org/AllocateAction"
            ]
        }
    ],
    [
        "http://schema.org/payaction",
        {
            _id: "http://schema.org/PayAction",
            _name: "PayAction",
            _parent: [
                "http://schema.org/TradeAction"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ]
        }
    ],
    [
        "http://schema.org/highschool",
        {
            _id: "http://schema.org/HighSchool",
            _name: "HighSchool",
            _parent: [
                "http://schema.org/EducationalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/typeandquantitynode",
        {
            _id: "http://schema.org/TypeAndQuantityNode",
            _name: "TypeAndQuantityNode",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            amountOfThisGood: [
                "http://schema.org/Number"
            ],
            businessFunction: [
                "http://schema.org/BusinessFunction"
            ],
            typeOfGood: [
                "http://schema.org/Product",
                "http://schema.org/Service"
            ],
            unitCode: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            unitText: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/steeringpositionvalue",
        {
            _id: "http://schema.org/SteeringPositionValue",
            _name: "SteeringPositionValue",
            _parent: [
                "http://schema.org/QualitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/sportsclub",
        {
            _id: "http://schema.org/SportsClub",
            _name: "SportsClub",
            _parent: [
                "http://schema.org/SportsActivityLocation"
            ]
        }
    ],
    [
        "http://schema.org/aquarium",
        {
            _id: "http://schema.org/Aquarium",
            _name: "Aquarium",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/traintrip",
        {
            _id: "http://schema.org/TrainTrip",
            _name: "TrainTrip",
            _parent: [
                "http://schema.org/Trip"
            ],
            arrivalPlatform: [
                "http://schema.org/Text"
            ],
            arrivalStation: [
                "http://schema.org/TrainStation"
            ],
            departurePlatform: [
                "http://schema.org/Text"
            ],
            departureStation: [
                "http://schema.org/TrainStation"
            ],
            trainName: [
                "http://schema.org/Text"
            ],
            trainNumber: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/bridge",
        {
            _id: "http://schema.org/Bridge",
            _name: "Bridge",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/cafeorcoffeeshop",
        {
            _id: "http://schema.org/CafeOrCoffeeShop",
            _name: "CafeOrCoffeeShop",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/reserveaction",
        {
            _id: "http://schema.org/ReserveAction",
            _name: "ReserveAction",
            _parent: [
                "http://schema.org/PlanAction"
            ]
        }
    ],
    [
        "http://schema.org/paymentservice",
        {
            _id: "http://schema.org/PaymentService",
            _name: "PaymentService",
            _parent: [
                "http://schema.org/FinancialProduct"
            ]
        }
    ],
    [
        "http://schema.org/speakablespecification",
        {
            _id: "http://schema.org/SpeakableSpecification",
            _name: "SpeakableSpecification",
            _parent: [
                "http://schema.org/Intangible"
            ],
            cssSelector: [
                "http://schema.org/CssSelectorType"
            ],
            xpath: [
                "http://schema.org/XPathType"
            ]
        }
    ],
    [
        "http://schema.org/interactaction",
        {
            _id: "http://schema.org/InteractAction",
            _name: "InteractAction",
            _parent: [
                "http://schema.org/Action"
            ]
        }
    ],
    [
        "http://schema.org/amradiochannel",
        {
            _id: "http://schema.org/AMRadioChannel",
            _name: "AMRadioChannel",
            _parent: [
                "http://schema.org/RadioChannel"
            ]
        }
    ],
    [
        "http://schema.org/autobodyshop",
        {
            _id: "http://schema.org/AutoBodyShop",
            _name: "AutoBodyShop",
            _parent: [
                "http://schema.org/AutomotiveBusiness"
            ]
        }
    ],
    [
        "http://schema.org/school",
        {
            _id: "http://schema.org/School",
            _name: "School",
            _parent: [
                "http://schema.org/EducationalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/televisionstation",
        {
            _id: "http://schema.org/TelevisionStation",
            _name: "TelevisionStation",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/homegoodsstore",
        {
            _id: "http://schema.org/HomeGoodsStore",
            _name: "HomeGoodsStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/lakebodyofwater",
        {
            _id: "http://schema.org/LakeBodyOfWater",
            _name: "LakeBodyOfWater",
            _parent: [
                "http://schema.org/BodyOfWater"
            ]
        }
    ],
    [
        "http://schema.org/bodyofwater",
        {
            _id: "http://schema.org/BodyOfWater",
            _name: "BodyOfWater",
            _parent: [
                "http://schema.org/Landform"
            ]
        }
    ],
    [
        "http://schema.org/radioseries",
        {
            _id: "http://schema.org/RadioSeries",
            _name: "RadioSeries",
            _parent: [
                "http://schema.org/CreativeWorkSeries"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            containsSeason: [
                "http://schema.org/CreativeWorkSeason"
            ],
            director: [
                "http://schema.org/Person"
            ],
            episode: [
                "http://schema.org/Episode"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            numberOfEpisodes: [
                "http://schema.org/Integer"
            ],
            numberOfSeasons: [
                "http://schema.org/Integer"
            ],
            productionCompany: [
                "http://schema.org/Organization"
            ],
            trailer: [
                "http://schema.org/VideoObject"
            ]
        }
    ],
    [
        "http://schema.org/musicvideoobject",
        {
            _id: "http://schema.org/MusicVideoObject",
            _name: "MusicVideoObject",
            _parent: [
                "http://schema.org/MediaObject"
            ]
        }
    ],
    [
        "http://schema.org/beach",
        {
            _id: "http://schema.org/Beach",
            _name: "Beach",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/spreadsheetdigitaldocument",
        {
            _id: "http://schema.org/SpreadsheetDigitalDocument",
            _name: "SpreadsheetDigitalDocument",
            _parent: [
                "http://schema.org/DigitalDocument"
            ]
        }
    ],
    [
        "http://schema.org/howtoitem",
        {
            _id: "http://schema.org/HowToItem",
            _name: "HowToItem",
            _parent: [
                "http://schema.org/ListItem"
            ],
            requiredQuantity: [
                "http://schema.org/Number",
                "http://schema.org/Text",
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/shareaction",
        {
            _id: "http://schema.org/ShareAction",
            _name: "ShareAction",
            _parent: [
                "http://schema.org/CommunicateAction"
            ]
        }
    ],
    [
        "http://schema.org/wpheader",
        {
            _id: "http://schema.org/WPHeader",
            _name: "WPHeader",
            _parent: [
                "http://schema.org/WebPageElement"
            ]
        }
    ],
    [
        "http://schema.org/landmarksorhistoricalbuildings",
        {
            _id: "http://schema.org/LandmarksOrHistoricalBuildings",
            _name: "LandmarksOrHistoricalBuildings",
            _parent: [
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/marryaction",
        {
            _id: "http://schema.org/MarryAction",
            _name: "MarryAction",
            _parent: [
                "http://schema.org/InteractAction"
            ]
        }
    ],
    [
        "http://schema.org/notary",
        {
            _id: "http://schema.org/Notary",
            _name: "Notary",
            _parent: [
                "http://schema.org/LegalService"
            ]
        }
    ],
    [
        "http://schema.org/reactaction",
        {
            _id: "http://schema.org/ReactAction",
            _name: "ReactAction",
            _parent: [
                "http://schema.org/AssessAction"
            ]
        }
    ],
    [
        "http://schema.org/message",
        {
            _id: "http://schema.org/Message",
            _name: "Message",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            bccRecipient: [
                "http://schema.org/Organization",
                "http://schema.org/Person",
                "http://schema.org/ContactPoint"
            ],
            ccRecipient: [
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/ContactPoint"
            ],
            dateRead: [
                "http://schema.org/DateTime",
                "http://schema.org/Date"
            ],
            dateReceived: [
                "http://schema.org/DateTime"
            ],
            dateSent: [
                "http://schema.org/DateTime"
            ],
            messageAttachment: [
                "http://schema.org/CreativeWork"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ],
            sender: [
                "http://schema.org/Audience",
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            toRecipient: [
                "http://schema.org/Audience",
                "http://schema.org/ContactPoint",
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/investmentordeposit",
        {
            _id: "http://schema.org/InvestmentOrDeposit",
            _name: "InvestmentOrDeposit",
            _parent: [
                "http://schema.org/FinancialProduct"
            ],
            amount: [
                "http://schema.org/MonetaryAmount",
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/drycleaningorlaundry",
        {
            _id: "http://schema.org/DryCleaningOrLaundry",
            _name: "DryCleaningOrLaundry",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/deactivateaction",
        {
            _id: "http://schema.org/DeactivateAction",
            _name: "DeactivateAction",
            _parent: [
                "http://schema.org/ControlAction"
            ]
        }
    ],
    [
        "http://schema.org/fastfoodrestaurant",
        {
            _id: "http://schema.org/FastFoodRestaurant",
            _name: "FastFoodRestaurant",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/datafeeditem",
        {
            _id: "http://schema.org/DataFeedItem",
            _name: "DataFeedItem",
            _parent: [
                "http://schema.org/Intangible"
            ],
            dateCreated: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            dateDeleted: [
                "http://schema.org/DateTime",
                "http://schema.org/Date"
            ],
            dateModified: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            item: [
                "http://schema.org/Thing"
            ]
        }
    ],
    [
        "http://schema.org/socialmediaposting",
        {
            _id: "http://schema.org/SocialMediaPosting",
            _name: "SocialMediaPosting",
            _parent: [
                "http://schema.org/Article"
            ],
            sharedContent: [
                "http://schema.org/CreativeWork"
            ]
        }
    ],
    [
        "http://schema.org/park",
        {
            _id: "http://schema.org/Park",
            _name: "Park",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/voteaction",
        {
            _id: "http://schema.org/VoteAction",
            _name: "VoteAction",
            _parent: [
                "http://schema.org/ChooseAction"
            ],
            candidate: [
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/achieveaction",
        {
            _id: "http://schema.org/AchieveAction",
            _name: "AchieveAction",
            _parent: [
                "http://schema.org/Action"
            ]
        }
    ],
    [
        "http://schema.org/comedyclub",
        {
            _id: "http://schema.org/ComedyClub",
            _name: "ComedyClub",
            _parent: [
                "http://schema.org/EntertainmentBusiness"
            ]
        }
    ],
    [
        "http://schema.org/servicechannel",
        {
            _id: "http://schema.org/ServiceChannel",
            _name: "ServiceChannel",
            _parent: [
                "http://schema.org/Intangible"
            ],
            availableLanguage: [
                "http://schema.org/Language",
                "http://schema.org/Text"
            ],
            processingTime: [
                "http://schema.org/Duration"
            ],
            providesService: [
                "http://schema.org/Service"
            ],
            serviceLocation: [
                "http://schema.org/Place"
            ],
            servicePhone: [
                "http://schema.org/ContactPoint"
            ],
            servicePostalAddress: [
                "http://schema.org/PostalAddress"
            ],
            serviceSmsNumber: [
                "http://schema.org/ContactPoint"
            ],
            serviceUrl: [
                "http://schema.org/URL"
            ]
        }
    ],
    [
        "http://schema.org/exhibitionevent",
        {
            _id: "http://schema.org/ExhibitionEvent",
            _name: "ExhibitionEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/rentaction",
        {
            _id: "http://schema.org/RentAction",
            _name: "RentAction",
            _parent: [
                "http://schema.org/TradeAction"
            ],
            landlord: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            realEstateAgent: [
                "http://schema.org/RealEstateAgent"
            ]
        }
    ],
    [
        "http://schema.org/employeerole",
        {
            _id: "http://schema.org/EmployeeRole",
            _name: "EmployeeRole",
            _parent: [
                "http://schema.org/OrganizationRole"
            ],
            baseSalary: [
                "http://schema.org/MonetaryAmount",
                "http://schema.org/PriceSpecification",
                "http://schema.org/Number"
            ],
            salaryCurrency: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/employmentagency",
        {
            _id: "http://schema.org/EmploymentAgency",
            _name: "EmploymentAgency",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/prependaction",
        {
            _id: "http://schema.org/PrependAction",
            _name: "PrependAction",
            _parent: [
                "http://schema.org/InsertAction"
            ]
        }
    ],
    [
        "http://schema.org/firestation",
        {
            _id: "http://schema.org/FireStation",
            _name: "FireStation",
            _parent: [
                "http://schema.org/EmergencyService",
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/courseinstance",
        {
            _id: "http://schema.org/CourseInstance",
            _name: "CourseInstance",
            _parent: [
                "http://schema.org/Event"
            ],
            courseMode: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            instructor: [
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/hotel",
        {
            _id: "http://schema.org/Hotel",
            _name: "Hotel",
            _parent: [
                "http://schema.org/LodgingBusiness"
            ]
        }
    ],
    [
        "http://schema.org/individualproduct",
        {
            _id: "http://schema.org/IndividualProduct",
            _name: "IndividualProduct",
            _parent: [
                "http://schema.org/Product"
            ],
            serialNumber: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/book",
        {
            _id: "http://schema.org/Book",
            _name: "Book",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            bookEdition: [
                "http://schema.org/Text"
            ],
            bookFormat: [
                "http://schema.org/BookFormatType"
            ],
            illustrator: [
                "http://schema.org/Person"
            ],
            isbn: [
                "http://schema.org/Text"
            ],
            numberOfPages: [
                "http://schema.org/Integer"
            ]
        }
    ],
    [
        "http://schema.org/radioclip",
        {
            _id: "http://schema.org/RadioClip",
            _name: "RadioClip",
            _parent: [
                "http://schema.org/Clip"
            ]
        }
    ],
    [
        "http://schema.org/intangible",
        {
            _id: "http://schema.org/Intangible",
            _name: "Intangible",
            _parent: [
                "http://schema.org/Thing"
            ]
        }
    ],
    [
        "http://schema.org/electronicsstore",
        {
            _id: "http://schema.org/ElectronicsStore",
            _name: "ElectronicsStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/order",
        {
            _id: "http://schema.org/Order",
            _name: "Order",
            _parent: [
                "http://schema.org/Intangible"
            ],
            acceptedOffer: [
                "http://schema.org/Offer"
            ],
            billingAddress: [
                "http://schema.org/PostalAddress"
            ],
            broker: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            confirmationNumber: [
                "http://schema.org/Text"
            ],
            customer: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            discount: [
                "http://schema.org/Text",
                "http://schema.org/Number"
            ],
            discountCode: [
                "http://schema.org/Text"
            ],
            discountCurrency: [
                "http://schema.org/Text"
            ],
            isGift: [
                "http://schema.org/Boolean"
            ],
            orderDate: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            orderDelivery: [
                "http://schema.org/ParcelDelivery"
            ],
            orderedItem: [
                "http://schema.org/OrderItem",
                "http://schema.org/Service",
                "http://schema.org/Product"
            ],
            orderNumber: [
                "http://schema.org/Text"
            ],
            orderStatus: [
                "http://schema.org/OrderStatus"
            ],
            partOfInvoice: [
                "http://schema.org/Invoice"
            ],
            paymentDueDate: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            paymentMethod: [
                "http://schema.org/PaymentMethod"
            ],
            paymentMethodId: [
                "http://schema.org/Text"
            ],
            paymentUrl: [
                "http://schema.org/URL"
            ],
            seller: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/tvclip",
        {
            _id: "http://schema.org/TVClip",
            _name: "TVClip",
            _parent: [
                "http://schema.org/Clip"
            ]
        }
    ],
    [
        "http://schema.org/nailsalon",
        {
            _id: "http://schema.org/NailSalon",
            _name: "NailSalon",
            _parent: [
                "http://schema.org/HealthAndBeautyBusiness"
            ]
        }
    ],
    [
        "http://schema.org/contactpoint",
        {
            _id: "http://schema.org/ContactPoint",
            _name: "ContactPoint",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            areaServed: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place",
                "http://schema.org/AdministrativeArea"
            ],
            availableLanguage: [
                "http://schema.org/Language",
                "http://schema.org/Text"
            ],
            contactOption: [
                "http://schema.org/ContactPointOption"
            ],
            contactType: [
                "http://schema.org/Text"
            ],
            email: [
                "http://schema.org/Text"
            ],
            faxNumber: [
                "http://schema.org/Text"
            ],
            hoursAvailable: [
                "http://schema.org/OpeningHoursSpecification"
            ],
            productSupported: [
                "http://schema.org/Product",
                "http://schema.org/Text"
            ],
            telephone: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/televisionchannel",
        {
            _id: "http://schema.org/TelevisionChannel",
            _name: "TelevisionChannel",
            _parent: [
                "http://schema.org/BroadcastChannel"
            ]
        }
    ],
    [
        "http://schema.org/governmentbuilding",
        {
            _id: "http://schema.org/GovernmentBuilding",
            _name: "GovernmentBuilding",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/emergencyservice",
        {
            _id: "http://schema.org/EmergencyService",
            _name: "EmergencyService",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/financialservice",
        {
            _id: "http://schema.org/FinancialService",
            _name: "FinancialService",
            _parent: [
                "http://schema.org/LocalBusiness"
            ],
            feesAndCommissionsSpecification: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/videoobject",
        {
            _id: "http://schema.org/VideoObject",
            _name: "VideoObject",
            _parent: [
                "http://schema.org/MediaObject"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            caption: [
                "http://schema.org/MediaObject",
                "http://schema.org/Text"
            ],
            director: [
                "http://schema.org/Person"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            thumbnail: [
                "http://schema.org/ImageObject"
            ],
            transcript: [
                "http://schema.org/Text"
            ],
            videoFrameSize: [
                "http://schema.org/Text"
            ],
            videoQuality: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/collectionpage",
        {
            _id: "http://schema.org/CollectionPage",
            _name: "CollectionPage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/menu",
        {
            _id: "http://schema.org/Menu",
            _name: "Menu",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            hasMenuItem: [
                "http://schema.org/MenuItem"
            ],
            hasMenuSection: [
                "http://schema.org/MenuSection"
            ]
        }
    ],
    [
        "http://schema.org/periodical",
        {
            _id: "http://schema.org/Periodical",
            _name: "Periodical",
            _parent: [
                "http://schema.org/CreativeWorkSeries"
            ]
        }
    ],
    [
        "http://schema.org/movieseries",
        {
            _id: "http://schema.org/MovieSeries",
            _name: "MovieSeries",
            _parent: [
                "http://schema.org/CreativeWorkSeries"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            director: [
                "http://schema.org/Person"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            productionCompany: [
                "http://schema.org/Organization"
            ],
            trailer: [
                "http://schema.org/VideoObject"
            ]
        }
    ],
    [
        "http://schema.org/series",
        {
            _id: "http://schema.org/Series",
            _name: "Series",
            _parent: [
                "http://schema.org/Intangible"
            ]
        }
    ],
    [
        "http://schema.org/electrician",
        {
            _id: "http://schema.org/Electrician",
            _name: "Electrician",
            _parent: [
                "http://schema.org/HomeAndConstructionBusiness"
            ]
        }
    ],
    [
        "http://schema.org/photographaction",
        {
            _id: "http://schema.org/PhotographAction",
            _name: "PhotographAction",
            _parent: [
                "http://schema.org/CreateAction"
            ]
        }
    ],
    [
        "http://schema.org/healthandbeautybusiness",
        {
            _id: "http://schema.org/HealthAndBeautyBusiness",
            _name: "HealthAndBeautyBusiness",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/legislativebuilding",
        {
            _id: "http://schema.org/LegislativeBuilding",
            _name: "LegislativeBuilding",
            _parent: [
                "http://schema.org/GovernmentBuilding"
            ]
        }
    ],
    [
        "http://schema.org/videogameseries",
        {
            _id: "http://schema.org/VideoGameSeries",
            _name: "VideoGameSeries",
            _parent: [
                "http://schema.org/CreativeWorkSeries"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            characterAttribute: [
                "http://schema.org/Thing"
            ],
            cheatCode: [
                "http://schema.org/CreativeWork"
            ],
            containsSeason: [
                "http://schema.org/CreativeWorkSeason"
            ],
            director: [
                "http://schema.org/Person"
            ],
            episode: [
                "http://schema.org/Episode"
            ],
            gameItem: [
                "http://schema.org/Thing"
            ],
            gameLocation: [
                "http://schema.org/PostalAddress",
                "http://schema.org/Place",
                "http://schema.org/URL"
            ],
            gamePlatform: [
                "http://schema.org/URL",
                "http://schema.org/Text",
                "http://schema.org/Thing"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            numberOfEpisodes: [
                "http://schema.org/Integer"
            ],
            numberOfPlayers: [
                "http://schema.org/QuantitativeValue"
            ],
            numberOfSeasons: [
                "http://schema.org/Integer"
            ],
            playMode: [
                "http://schema.org/GamePlayMode"
            ],
            productionCompany: [
                "http://schema.org/Organization"
            ],
            quest: [
                "http://schema.org/Thing"
            ],
            trailer: [
                "http://schema.org/VideoObject"
            ]
        }
    ],
    [
        "http://schema.org/broadcastservice",
        {
            _id: "http://schema.org/BroadcastService",
            _name: "BroadcastService",
            _parent: [
                "http://schema.org/Service"
            ],
            broadcastAffiliateOf: [
                "http://schema.org/Organization"
            ],
            broadcastDisplayName: [
                "http://schema.org/Text"
            ],
            broadcaster: [
                "http://schema.org/Organization"
            ],
            broadcastFrequency: [
                "http://schema.org/BroadcastFrequencySpecification",
                "http://schema.org/Text"
            ],
            broadcastTimezone: [
                "http://schema.org/Text"
            ],
            hasBroadcastChannel: [
                "http://schema.org/BroadcastChannel"
            ],
            parentService: [
                "http://schema.org/BroadcastService"
            ],
            videoFormat: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/wearaction",
        {
            _id: "http://schema.org/WearAction",
            _name: "WearAction",
            _parent: [
                "http://schema.org/UseAction"
            ]
        }
    ],
    [
        "http://schema.org/travelagency",
        {
            _id: "http://schema.org/TravelAgency",
            _name: "TravelAgency",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/performinggroup",
        {
            _id: "http://schema.org/PerformingGroup",
            _name: "PerformingGroup",
            _parent: [
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/hostel",
        {
            _id: "http://schema.org/Hostel",
            _name: "Hostel",
            _parent: [
                "http://schema.org/LodgingBusiness"
            ]
        }
    ],
    [
        "http://schema.org/winaction",
        {
            _id: "http://schema.org/WinAction",
            _name: "WinAction",
            _parent: [
                "http://schema.org/AchieveAction"
            ],
            loser: [
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/quantity",
        {
            _id: "http://schema.org/Quantity",
            _name: "Quantity",
            _parent: [
                "http://schema.org/Intangible"
            ]
        }
    ],
    [
        "http://schema.org/videogallery",
        {
            _id: "http://schema.org/VideoGallery",
            _name: "VideoGallery",
            _parent: [
                "http://schema.org/CollectionPage"
            ]
        }
    ],
    [
        "http://schema.org/educationalaudience",
        {
            _id: "http://schema.org/EducationalAudience",
            _name: "EducationalAudience",
            _parent: [
                "http://schema.org/Audience"
            ],
            educationalRole: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/cityhall",
        {
            _id: "http://schema.org/CityHall",
            _name: "CityHall",
            _parent: [
                "http://schema.org/GovernmentBuilding"
            ]
        }
    ],
    [
        "http://schema.org/comedyevent",
        {
            _id: "http://schema.org/ComedyEvent",
            _name: "ComedyEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/donateaction",
        {
            _id: "http://schema.org/DonateAction",
            _name: "DonateAction",
            _parent: [
                "http://schema.org/TradeAction"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ]
        }
    ],
    [
        "http://schema.org/brand",
        {
            _id: "http://schema.org/Brand",
            _name: "Brand",
            _parent: [
                "http://schema.org/Intangible"
            ],
            aggregateRating: [
                "http://schema.org/AggregateRating"
            ],
            logo: [
                "http://schema.org/URL",
                "http://schema.org/ImageObject"
            ],
            review: [
                "http://schema.org/Review"
            ],
            slogan: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/movingcompany",
        {
            _id: "http://schema.org/MovingCompany",
            _name: "MovingCompany",
            _parent: [
                "http://schema.org/HomeAndConstructionBusiness"
            ]
        }
    ],
    [
        "http://schema.org/question",
        {
            _id: "http://schema.org/Question",
            _name: "Question",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            acceptedAnswer: [
                "http://schema.org/ItemList",
                "http://schema.org/Answer"
            ],
            answerCount: [
                "http://schema.org/Integer"
            ],
            downvoteCount: [
                "http://schema.org/Integer"
            ],
            suggestedAnswer: [
                "http://schema.org/Answer",
                "http://schema.org/ItemList"
            ],
            upvoteCount: [
                "http://schema.org/Integer"
            ]
        }
    ],
    [
        "http://schema.org/borrowaction",
        {
            _id: "http://schema.org/BorrowAction",
            _name: "BorrowAction",
            _parent: [
                "http://schema.org/TransferAction"
            ],
            lender: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/gardenstore",
        {
            _id: "http://schema.org/GardenStore",
            _name: "GardenStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/reviewaction",
        {
            _id: "http://schema.org/ReviewAction",
            _name: "ReviewAction",
            _parent: [
                "http://schema.org/AssessAction"
            ],
            resultReview: [
                "http://schema.org/Review"
            ]
        }
    ],
    [
        "http://schema.org/paintaction",
        {
            _id: "http://schema.org/PaintAction",
            _name: "PaintAction",
            _parent: [
                "http://schema.org/CreateAction"
            ]
        }
    ],
    [
        "http://schema.org/blog",
        {
            _id: "http://schema.org/Blog",
            _name: "Blog",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            blogPost: [
                "http://schema.org/BlogPosting"
            ],
            issn: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/sportsactivitylocation",
        {
            _id: "http://schema.org/SportsActivityLocation",
            _name: "SportsActivityLocation",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/warrantypromise",
        {
            _id: "http://schema.org/WarrantyPromise",
            _name: "WarrantyPromise",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            durationOfWarranty: [
                "http://schema.org/QuantitativeValue"
            ],
            warrantyScope: [
                "http://schema.org/WarrantyScope"
            ]
        }
    ],
    [
        "http://schema.org/event",
        {
            _id: "http://schema.org/Event",
            _name: "Event",
            _parent: [
                "http://schema.org/Thing"
            ],
            about: [
                "http://schema.org/Thing"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            aggregateRating: [
                "http://schema.org/AggregateRating"
            ],
            attendee: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            audience: [
                "http://schema.org/Audience"
            ],
            composer: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            contributor: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            director: [
                "http://schema.org/Person"
            ],
            doorTime: [
                "http://schema.org/Time",
                "http://schema.org/DateTime"
            ],
            duration: [
                "http://schema.org/Duration"
            ],
            endDate: [
                "http://schema.org/DateTime",
                "http://schema.org/Date"
            ],
            eventStatus: [
                "http://schema.org/EventStatusType"
            ],
            funder: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            inLanguage: [
                "http://schema.org/Text",
                "http://schema.org/Language"
            ],
            isAccessibleForFree: [
                "http://schema.org/Boolean"
            ],
            location: [
                "http://schema.org/Place",
                "http://schema.org/Text",
                "http://schema.org/PostalAddress"
            ],
            maximumAttendeeCapacity: [
                "http://schema.org/Integer"
            ],
            offers: [
                "http://schema.org/Offer"
            ],
            organizer: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            performer: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            previousStartDate: [
                "http://schema.org/Date"
            ],
            recordedIn: [
                "http://schema.org/CreativeWork"
            ],
            remainingAttendeeCapacity: [
                "http://schema.org/Integer"
            ],
            review: [
                "http://schema.org/Review"
            ],
            sponsor: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            startDate: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            subEvent: [
                "http://schema.org/Event"
            ],
            superEvent: [
                "http://schema.org/Event"
            ],
            translator: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            typicalAgeRange: [
                "http://schema.org/Text"
            ],
            workFeatured: [
                "http://schema.org/CreativeWork"
            ],
            workPerformed: [
                "http://schema.org/CreativeWork"
            ]
        }
    ],
    [
        "http://schema.org/adultentertainment",
        {
            _id: "http://schema.org/AdultEntertainment",
            _name: "AdultEntertainment",
            _parent: [
                "http://schema.org/EntertainmentBusiness"
            ]
        }
    ],
    [
        "http://schema.org/drivewheelconfigurationvalue",
        {
            _id: "http://schema.org/DriveWheelConfigurationValue",
            _name: "DriveWheelConfigurationValue",
            _parent: [
                "http://schema.org/QualitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/role",
        {
            _id: "http://schema.org/Role",
            _name: "Role",
            _parent: [
                "http://schema.org/Intangible"
            ],
            endDate: [
                "http://schema.org/DateTime",
                "http://schema.org/Date"
            ],
            roleName: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            startDate: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ]
        }
    ],
    [
        "http://schema.org/city",
        {
            _id: "http://schema.org/City",
            _name: "City",
            _parent: [
                "http://schema.org/AdministrativeArea"
            ]
        }
    ],
    [
        "http://schema.org/consumeaction",
        {
            _id: "http://schema.org/ConsumeAction",
            _name: "ConsumeAction",
            _parent: [
                "http://schema.org/Action"
            ],
            actionAccessibilityRequirement: [
                "http://schema.org/ActionAccessSpecification"
            ],
            expectsAcceptanceOf: [
                "http://schema.org/Offer"
            ]
        }
    ],
    [
        "http://schema.org/screeningevent",
        {
            _id: "http://schema.org/ScreeningEvent",
            _name: "ScreeningEvent",
            _parent: [
                "http://schema.org/Event"
            ],
            subtitleLanguage: [
                "http://schema.org/Text",
                "http://schema.org/Language"
            ],
            videoFormat: [
                "http://schema.org/Text"
            ],
            workPresented: [
                "http://schema.org/Movie"
            ]
        }
    ],
    [
        "http://schema.org/arriveaction",
        {
            _id: "http://schema.org/ArriveAction",
            _name: "ArriveAction",
            _parent: [
                "http://schema.org/MoveAction"
            ]
        }
    ],
    [
        "http://schema.org/createaction",
        {
            _id: "http://schema.org/CreateAction",
            _name: "CreateAction",
            _parent: [
                "http://schema.org/Action"
            ]
        }
    ],
    [
        "http://schema.org/scheduleaction",
        {
            _id: "http://schema.org/ScheduleAction",
            _name: "ScheduleAction",
            _parent: [
                "http://schema.org/PlanAction"
            ]
        }
    ],
    [
        "http://schema.org/dentist",
        {
            _id: "http://schema.org/Dentist",
            _name: "Dentist",
            _parent: [
                "http://schema.org/MedicalBusiness",
                "http://schema.org/LocalBusiness",
                "http://schema.org/MedicalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/discoveraction",
        {
            _id: "http://schema.org/DiscoverAction",
            _name: "DiscoverAction",
            _parent: [
                "http://schema.org/FindAction"
            ]
        }
    ],
    [
        "http://schema.org/endorsementrating",
        {
            _id: "http://schema.org/EndorsementRating",
            _name: "EndorsementRating",
            _parent: [
                "http://schema.org/Rating"
            ]
        }
    ],
    [
        "http://schema.org/installaction",
        {
            _id: "http://schema.org/InstallAction",
            _name: "InstallAction",
            _parent: [
                "http://schema.org/ConsumeAction"
            ]
        }
    ],
    [
        "http://schema.org/musicevent",
        {
            _id: "http://schema.org/MusicEvent",
            _name: "MusicEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/store",
        {
            _id: "http://schema.org/Store",
            _name: "Store",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/monetaryamount",
        {
            _id: "http://schema.org/MonetaryAmount",
            _name: "MonetaryAmount",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            currency: [
                "http://schema.org/Text"
            ],
            maxValue: [
                "http://schema.org/Number"
            ],
            minValue: [
                "http://schema.org/Number"
            ],
            validFrom: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            validThrough: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            value: [
                "http://schema.org/StructuredValue",
                "http://schema.org/Text",
                "http://schema.org/Boolean",
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/hairsalon",
        {
            _id: "http://schema.org/HairSalon",
            _name: "HairSalon",
            _parent: [
                "http://schema.org/HealthAndBeautyBusiness"
            ]
        }
    ],
    [
        "http://schema.org/dayspa",
        {
            _id: "http://schema.org/DaySpa",
            _name: "DaySpa",
            _parent: [
                "http://schema.org/HealthAndBeautyBusiness"
            ]
        }
    ],
    [
        "http://schema.org/enginespecification",
        {
            _id: "http://schema.org/EngineSpecification",
            _name: "EngineSpecification",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            fuelType: [
                "http://schema.org/QualitativeValue",
                "http://schema.org/URL",
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/activateaction",
        {
            _id: "http://schema.org/ActivateAction",
            _name: "ActivateAction",
            _parent: [
                "http://schema.org/ControlAction"
            ]
        }
    ],
    [
        "http://schema.org/eventvenue",
        {
            _id: "http://schema.org/EventVenue",
            _name: "EventVenue",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/radioepisode",
        {
            _id: "http://schema.org/RadioEpisode",
            _name: "RadioEpisode",
            _parent: [
                "http://schema.org/Episode"
            ]
        }
    ],
    [
        "http://schema.org/elementaryschool",
        {
            _id: "http://schema.org/ElementarySchool",
            _name: "ElementarySchool",
            _parent: [
                "http://schema.org/EducationalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/replaceaction",
        {
            _id: "http://schema.org/ReplaceAction",
            _name: "ReplaceAction",
            _parent: [
                "http://schema.org/UpdateAction"
            ],
            replacee: [
                "http://schema.org/Thing"
            ],
            replacer: [
                "http://schema.org/Thing"
            ]
        }
    ],
    [
        "http://schema.org/creditcard",
        {
            _id: "http://schema.org/CreditCard",
            _name: "CreditCard",
            _parent: [
                "http://schema.org/LoanOrCredit",
                "http://schema.org/PaymentCard"
            ]
        }
    ],
    [
        "http://schema.org/openinghoursspecification",
        {
            _id: "http://schema.org/OpeningHoursSpecification",
            _name: "OpeningHoursSpecification",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            closes: [
                "http://schema.org/Time"
            ],
            dayOfWeek: [
                "http://schema.org/DayOfWeek"
            ],
            opens: [
                "http://schema.org/Time"
            ],
            validFrom: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            validThrough: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ]
        }
    ],
    [
        "http://schema.org/dislikeaction",
        {
            _id: "http://schema.org/DislikeAction",
            _name: "DislikeAction",
            _parent: [
                "http://schema.org/ReactAction"
            ]
        }
    ],
    [
        "http://schema.org/playaction",
        {
            _id: "http://schema.org/PlayAction",
            _name: "PlayAction",
            _parent: [
                "http://schema.org/Action"
            ],
            audience: [
                "http://schema.org/Audience"
            ],
            event: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/bankorcreditunion",
        {
            _id: "http://schema.org/BankOrCreditUnion",
            _name: "BankOrCreditUnion",
            _parent: [
                "http://schema.org/FinancialService"
            ]
        }
    ],
    [
        "http://schema.org/faqpage",
        {
            _id: "http://schema.org/FAQPage",
            _name: "FAQPage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/tieaction",
        {
            _id: "http://schema.org/TieAction",
            _name: "TieAction",
            _parent: [
                "http://schema.org/AchieveAction"
            ]
        }
    ],
    [
        "http://schema.org/corporation",
        {
            _id: "http://schema.org/Corporation",
            _name: "Corporation",
            _parent: [
                "http://schema.org/Organization"
            ],
            tickerSymbol: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/itemlist",
        {
            _id: "http://schema.org/ItemList",
            _name: "ItemList",
            _parent: [
                "http://schema.org/Intangible"
            ],
            itemListElement: [
                "http://schema.org/Text",
                "http://schema.org/Thing",
                "http://schema.org/ListItem"
            ],
            itemListOrder: [
                "http://schema.org/Text",
                "http://schema.org/ItemListOrderType"
            ],
            numberOfItems: [
                "http://schema.org/Integer"
            ]
        }
    ],
    [
        "http://schema.org/winery",
        {
            _id: "http://schema.org/Winery",
            _name: "Winery",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/informaction",
        {
            _id: "http://schema.org/InformAction",
            _name: "InformAction",
            _parent: [
                "http://schema.org/CommunicateAction"
            ],
            event: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/returnaction",
        {
            _id: "http://schema.org/ReturnAction",
            _name: "ReturnAction",
            _parent: [
                "http://schema.org/TransferAction"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ]
        }
    ],
    [
        "http://schema.org/meetingroom",
        {
            _id: "http://schema.org/MeetingRoom",
            _name: "MeetingRoom",
            _parent: [
                "http://schema.org/Room"
            ]
        }
    ],
    [
        "http://schema.org/monetaryamountdistribution",
        {
            _id: "http://schema.org/MonetaryAmountDistribution",
            _name: "MonetaryAmountDistribution",
            _parent: [
                "http://schema.org/QuantitativeValueDistribution"
            ],
            currency: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/stadiumorarena",
        {
            _id: "http://schema.org/StadiumOrArena",
            _name: "StadiumOrArena",
            _parent: [
                "http://schema.org/CivicStructure",
                "http://schema.org/SportsActivityLocation"
            ]
        }
    ],
    [
        "http://schema.org/joinaction",
        {
            _id: "http://schema.org/JoinAction",
            _name: "JoinAction",
            _parent: [
                "http://schema.org/InteractAction"
            ],
            event: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/riverbodyofwater",
        {
            _id: "http://schema.org/RiverBodyOfWater",
            _name: "RiverBodyOfWater",
            _parent: [
                "http://schema.org/BodyOfWater"
            ]
        }
    ],
    [
        "http://schema.org/buyaction",
        {
            _id: "http://schema.org/BuyAction",
            _name: "BuyAction",
            _parent: [
                "http://schema.org/TradeAction"
            ],
            seller: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/searchaction",
        {
            _id: "http://schema.org/SearchAction",
            _name: "SearchAction",
            _parent: [
                "http://schema.org/Action"
            ],
            query: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/hvacbusiness",
        {
            _id: "http://schema.org/HVACBusiness",
            _name: "HVACBusiness",
            _parent: [
                "http://schema.org/HomeAndConstructionBusiness"
            ]
        }
    ],
    [
        "http://schema.org/taxistand",
        {
            _id: "http://schema.org/TaxiStand",
            _name: "TaxiStand",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/productmodel",
        {
            _id: "http://schema.org/ProductModel",
            _name: "ProductModel",
            _parent: [
                "http://schema.org/Product"
            ],
            isVariantOf: [
                "http://schema.org/ProductModel"
            ],
            predecessorOf: [
                "http://schema.org/ProductModel"
            ],
            successorOf: [
                "http://schema.org/ProductModel"
            ]
        }
    ],
    [
        "http://schema.org/catholicchurch",
        {
            _id: "http://schema.org/CatholicChurch",
            _name: "CatholicChurch",
            _parent: [
                "http://schema.org/Church"
            ]
        }
    ],
    [
        "http://schema.org/movieclip",
        {
            _id: "http://schema.org/MovieClip",
            _name: "MovieClip",
            _parent: [
                "http://schema.org/Clip"
            ]
        }
    ],
    [
        "http://schema.org/writeaction",
        {
            _id: "http://schema.org/WriteAction",
            _name: "WriteAction",
            _parent: [
                "http://schema.org/CreateAction"
            ],
            inLanguage: [
                "http://schema.org/Text",
                "http://schema.org/Language"
            ]
        }
    ],
    [
        "http://schema.org/applyaction",
        {
            _id: "http://schema.org/ApplyAction",
            _name: "ApplyAction",
            _parent: [
                "http://schema.org/OrganizeAction"
            ]
        }
    ],
    [
        "http://schema.org/locksmith",
        {
            _id: "http://schema.org/Locksmith",
            _name: "Locksmith",
            _parent: [
                "http://schema.org/HomeAndConstructionBusiness"
            ]
        }
    ],
    [
        "http://schema.org/landform",
        {
            _id: "http://schema.org/Landform",
            _name: "Landform",
            _parent: [
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/episode",
        {
            _id: "http://schema.org/Episode",
            _name: "Episode",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            director: [
                "http://schema.org/Person"
            ],
            episodeNumber: [
                "http://schema.org/Integer",
                "http://schema.org/Text"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            partOfSeason: [
                "http://schema.org/CreativeWorkSeason"
            ],
            partOfSeries: [
                "http://schema.org/CreativeWorkSeries"
            ],
            productionCompany: [
                "http://schema.org/Organization"
            ],
            trailer: [
                "http://schema.org/VideoObject"
            ]
        }
    ],
    [
        "http://schema.org/oceanbodyofwater",
        {
            _id: "http://schema.org/OceanBodyOfWater",
            _name: "OceanBodyOfWater",
            _parent: [
                "http://schema.org/BodyOfWater"
            ]
        }
    ],
    [
        "http://schema.org/medicalorganization",
        {
            _id: "http://schema.org/MedicalOrganization",
            _name: "MedicalOrganization",
            _parent: [
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/trainreservation",
        {
            _id: "http://schema.org/TrainReservation",
            _name: "TrainReservation",
            _parent: [
                "http://schema.org/Reservation"
            ]
        }
    ],
    [
        "http://schema.org/musicvenue",
        {
            _id: "http://schema.org/MusicVenue",
            _name: "MusicVenue",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/review",
        {
            _id: "http://schema.org/Review",
            _name: "Review",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            itemReviewed: [
                "http://schema.org/Thing"
            ],
            reviewAspect: [
                "http://schema.org/Text"
            ],
            reviewBody: [
                "http://schema.org/Text"
            ],
            reviewRating: [
                "http://schema.org/Rating"
            ]
        }
    ],
    [
        "http://schema.org/postaladdress",
        {
            _id: "http://schema.org/PostalAddress",
            _name: "PostalAddress",
            _parent: [
                "http://schema.org/ContactPoint"
            ],
            addressCountry: [
                "http://schema.org/Country",
                "http://schema.org/Text"
            ],
            addressLocality: [
                "http://schema.org/Text"
            ],
            addressRegion: [
                "http://schema.org/Text"
            ],
            postalCode: [
                "http://schema.org/Text"
            ],
            postOfficeBoxNumber: [
                "http://schema.org/Text"
            ],
            streetAddress: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/claimreview",
        {
            _id: "http://schema.org/ClaimReview",
            _name: "ClaimReview",
            _parent: [
                "http://schema.org/Review"
            ],
            claimReviewed: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/confirmaction",
        {
            _id: "http://schema.org/ConfirmAction",
            _name: "ConfirmAction",
            _parent: [
                "http://schema.org/InformAction"
            ]
        }
    ],
    [
        "http://schema.org/collegeoruniversity",
        {
            _id: "http://schema.org/CollegeOrUniversity",
            _name: "CollegeOrUniversity",
            _parent: [
                "http://schema.org/EducationalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/ownershipinfo",
        {
            _id: "http://schema.org/OwnershipInfo",
            _name: "OwnershipInfo",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            acquiredFrom: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            ownedFrom: [
                "http://schema.org/DateTime"
            ],
            ownedThrough: [
                "http://schema.org/DateTime"
            ],
            typeOfGood: [
                "http://schema.org/Product",
                "http://schema.org/Service"
            ]
        }
    ],
    [
        "http://schema.org/softwaresourcecode",
        {
            _id: "http://schema.org/SoftwareSourceCode",
            _name: "SoftwareSourceCode",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            codeRepository: [
                "http://schema.org/URL"
            ],
            codeSampleType: [
                "http://schema.org/Text"
            ],
            programmingLanguage: [
                "http://schema.org/ComputerLanguage",
                "http://schema.org/Text"
            ],
            runtimePlatform: [
                "http://schema.org/Text"
            ],
            targetProduct: [
                "http://schema.org/SoftwareApplication"
            ]
        }
    ],
    [
        "http://schema.org/clip",
        {
            _id: "http://schema.org/Clip",
            _name: "Clip",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            clipNumber: [
                "http://schema.org/Text",
                "http://schema.org/Integer"
            ],
            director: [
                "http://schema.org/Person"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            partOfEpisode: [
                "http://schema.org/Episode"
            ],
            partOfSeason: [
                "http://schema.org/CreativeWorkSeason"
            ],
            partOfSeries: [
                "http://schema.org/CreativeWorkSeries"
            ]
        }
    ],
    [
        "http://schema.org/seat",
        {
            _id: "http://schema.org/Seat",
            _name: "Seat",
            _parent: [
                "http://schema.org/Intangible"
            ],
            seatingType: [
                "http://schema.org/QualitativeValue",
                "http://schema.org/Text"
            ],
            seatNumber: [
                "http://schema.org/Text"
            ],
            seatRow: [
                "http://schema.org/Text"
            ],
            seatSection: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/wantaction",
        {
            _id: "http://schema.org/WantAction",
            _name: "WantAction",
            _parent: [
                "http://schema.org/ReactAction"
            ]
        }
    ],
    [
        "http://schema.org/readaction",
        {
            _id: "http://schema.org/ReadAction",
            _name: "ReadAction",
            _parent: [
                "http://schema.org/ConsumeAction"
            ]
        }
    ],
    [
        "http://schema.org/taxiservice",
        {
            _id: "http://schema.org/TaxiService",
            _name: "TaxiService",
            _parent: [
                "http://schema.org/Service"
            ]
        }
    ],
    [
        "http://schema.org/ticket",
        {
            _id: "http://schema.org/Ticket",
            _name: "Ticket",
            _parent: [
                "http://schema.org/Intangible"
            ],
            dateIssued: [
                "http://schema.org/DateTime",
                "http://schema.org/Date"
            ],
            issuedBy: [
                "http://schema.org/Organization"
            ],
            priceCurrency: [
                "http://schema.org/Text"
            ],
            ticketedSeat: [
                "http://schema.org/Seat"
            ],
            ticketNumber: [
                "http://schema.org/Text"
            ],
            ticketToken: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            totalPrice: [
                "http://schema.org/PriceSpecification",
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            underName: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/occupation",
        {
            _id: "http://schema.org/Occupation",
            _name: "Occupation",
            _parent: [
                "http://schema.org/Intangible"
            ],
            estimatedSalary: [
                "http://schema.org/Number",
                "http://schema.org/MonetaryAmountDistribution",
                "http://schema.org/MonetaryAmount"
            ],
            experienceRequirements: [
                "http://schema.org/Text"
            ],
            occupationalCategory: [
                "http://schema.org/Text",
                "http://schema.org/CategoryCode"
            ],
            occupationLocation: [
                "http://schema.org/AdministrativeArea"
            ],
            responsibilities: [
                "http://schema.org/Text"
            ],
            skills: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/artgallery",
        {
            _id: "http://schema.org/ArtGallery",
            _name: "ArtGallery",
            _parent: [
                "http://schema.org/EntertainmentBusiness"
            ]
        }
    ],
    [
        "http://schema.org/plumber",
        {
            _id: "http://schema.org/Plumber",
            _name: "Plumber",
            _parent: [
                "http://schema.org/HomeAndConstructionBusiness"
            ]
        }
    ],
    [
        "http://schema.org/preschool",
        {
            _id: "http://schema.org/Preschool",
            _name: "Preschool",
            _parent: [
                "http://schema.org/EducationalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/rejectaction",
        {
            _id: "http://schema.org/RejectAction",
            _name: "RejectAction",
            _parent: [
                "http://schema.org/AllocateAction"
            ]
        }
    ],
    [
        "http://schema.org/tattooparlor",
        {
            _id: "http://schema.org/TattooParlor",
            _name: "TattooParlor",
            _parent: [
                "http://schema.org/HealthAndBeautyBusiness"
            ]
        }
    ],
    [
        "http://schema.org/geocircle",
        {
            _id: "http://schema.org/GeoCircle",
            _name: "GeoCircle",
            _parent: [
                "http://schema.org/GeoShape"
            ],
            geoMidpoint: [
                "http://schema.org/GeoCoordinates"
            ],
            geoRadius: [
                "http://schema.org/Text",
                "http://schema.org/Number",
                "http://schema.org/Distance"
            ]
        }
    ],
    [
        "http://schema.org/energy",
        {
            _id: "http://schema.org/Energy",
            _name: "Energy",
            _parent: [
                "http://schema.org/Quantity"
            ]
        }
    ],
    [
        "http://schema.org/furniturestore",
        {
            _id: "http://schema.org/FurnitureStore",
            _name: "FurnitureStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/busstop",
        {
            _id: "http://schema.org/BusStop",
            _name: "BusStop",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/motorcyclerepair",
        {
            _id: "http://schema.org/MotorcycleRepair",
            _name: "MotorcycleRepair",
            _parent: [
                "http://schema.org/AutomotiveBusiness"
            ]
        }
    ],
    [
        "http://schema.org/governmentpermit",
        {
            _id: "http://schema.org/GovernmentPermit",
            _name: "GovernmentPermit",
            _parent: [
                "http://schema.org/Permit"
            ]
        }
    ],
    [
        "http://schema.org/insertaction",
        {
            _id: "http://schema.org/InsertAction",
            _name: "InsertAction",
            _parent: [
                "http://schema.org/AddAction"
            ],
            toLocation: [
                "http://schema.org/Place"
            ]
        }
    ],
    [
        "http://schema.org/resort",
        {
            _id: "http://schema.org/Resort",
            _name: "Resort",
            _parent: [
                "http://schema.org/LodgingBusiness"
            ]
        }
    ],
    [
        "http://schema.org/invoice",
        {
            _id: "http://schema.org/Invoice",
            _name: "Invoice",
            _parent: [
                "http://schema.org/Intangible"
            ],
            accountId: [
                "http://schema.org/Text"
            ],
            billingPeriod: [
                "http://schema.org/Duration"
            ],
            broker: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            category: [
                "http://schema.org/Thing",
                "http://schema.org/Text",
                "http://schema.org/PhysicalActivityCategory"
            ],
            confirmationNumber: [
                "http://schema.org/Text"
            ],
            customer: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ],
            minimumPaymentDue: [
                "http://schema.org/MonetaryAmount",
                "http://schema.org/PriceSpecification"
            ],
            paymentDueDate: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            paymentMethod: [
                "http://schema.org/PaymentMethod"
            ],
            paymentMethodId: [
                "http://schema.org/Text"
            ],
            paymentStatus: [
                "http://schema.org/Text",
                "http://schema.org/PaymentStatusType"
            ],
            provider: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            referencesOrder: [
                "http://schema.org/Order"
            ],
            scheduledPaymentDate: [
                "http://schema.org/Date"
            ],
            totalPaymentDue: [
                "http://schema.org/PriceSpecification",
                "http://schema.org/MonetaryAmount"
            ]
        }
    ],
    [
        "http://schema.org/table",
        {
            _id: "http://schema.org/Table",
            _name: "Table",
            _parent: [
                "http://schema.org/WebPageElement"
            ]
        }
    ],
    [
        "http://schema.org/url",
        {
            _id: "http://schema.org/URL",
            _name: "URL",
            _parent: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/compoundpricespecification",
        {
            _id: "http://schema.org/CompoundPriceSpecification",
            _name: "CompoundPriceSpecification",
            _parent: [
                "http://schema.org/PriceSpecification"
            ],
            priceComponent: [
                "http://schema.org/UnitPriceSpecification"
            ]
        }
    ],
    [
        "http://schema.org/peopleaudience",
        {
            _id: "http://schema.org/PeopleAudience",
            _name: "PeopleAudience",
            _parent: [
                "http://schema.org/Audience"
            ],
            requiredGender: [
                "http://schema.org/Text"
            ],
            requiredMaxAge: [
                "http://schema.org/Integer"
            ],
            requiredMinAge: [
                "http://schema.org/Integer"
            ],
            suggestedGender: [
                "http://schema.org/Text"
            ],
            suggestedMaxAge: [
                "http://schema.org/Number"
            ],
            suggestedMinAge: [
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/governmentorganization",
        {
            _id: "http://schema.org/GovernmentOrganization",
            _name: "GovernmentOrganization",
            _parent: [
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/foodestablishmentreservation",
        {
            _id: "http://schema.org/FoodEstablishmentReservation",
            _name: "FoodEstablishmentReservation",
            _parent: [
                "http://schema.org/Reservation"
            ],
            endTime: [
                "http://schema.org/DateTime",
                "http://schema.org/Time"
            ],
            partySize: [
                "http://schema.org/Integer",
                "http://schema.org/QuantitativeValue"
            ],
            startTime: [
                "http://schema.org/DateTime",
                "http://schema.org/Time"
            ]
        }
    ],
    [
        "http://schema.org/paymentchargespecification",
        {
            _id: "http://schema.org/PaymentChargeSpecification",
            _name: "PaymentChargeSpecification",
            _parent: [
                "http://schema.org/PriceSpecification"
            ],
            appliesToDeliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ],
            appliesToPaymentMethod: [
                "http://schema.org/PaymentMethod"
            ]
        }
    ],
    [
        "http://schema.org/busreservation",
        {
            _id: "http://schema.org/BusReservation",
            _name: "BusReservation",
            _parent: [
                "http://schema.org/Reservation"
            ]
        }
    ],
    [
        "http://schema.org/itempage",
        {
            _id: "http://schema.org/ItemPage",
            _name: "ItemPage",
            _parent: [
                "http://schema.org/WebPage"
            ]
        }
    ],
    [
        "http://schema.org/physician",
        {
            _id: "http://schema.org/Physician",
            _name: "Physician",
            _parent: [
                "http://schema.org/MedicalBusiness",
                "http://schema.org/MedicalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/orderitem",
        {
            _id: "http://schema.org/OrderItem",
            _name: "OrderItem",
            _parent: [
                "http://schema.org/Intangible"
            ],
            orderDelivery: [
                "http://schema.org/ParcelDelivery"
            ],
            orderedItem: [
                "http://schema.org/OrderItem",
                "http://schema.org/Service",
                "http://schema.org/Product"
            ],
            orderItemNumber: [
                "http://schema.org/Text"
            ],
            orderItemStatus: [
                "http://schema.org/OrderStatus"
            ],
            orderQuantity: [
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/tipaction",
        {
            _id: "http://schema.org/TipAction",
            _name: "TipAction",
            _parent: [
                "http://schema.org/TradeAction"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ]
        }
    ],
    [
        "http://schema.org/howtodirection",
        {
            _id: "http://schema.org/HowToDirection",
            _name: "HowToDirection",
            _parent: [
                "http://schema.org/CreativeWork",
                "http://schema.org/ListItem"
            ],
            afterMedia: [
                "http://schema.org/MediaObject",
                "http://schema.org/URL"
            ],
            beforeMedia: [
                "http://schema.org/URL",
                "http://schema.org/MediaObject"
            ],
            duringMedia: [
                "http://schema.org/URL",
                "http://schema.org/MediaObject"
            ],
            performTime: [
                "http://schema.org/Duration"
            ],
            prepTime: [
                "http://schema.org/Duration"
            ],
            supply: [
                "http://schema.org/Text",
                "http://schema.org/HowToSupply"
            ],
            tool: [
                "http://schema.org/Text",
                "http://schema.org/HowToTool"
            ],
            totalTime: [
                "http://schema.org/Duration"
            ]
        }
    ],
    [
        "http://schema.org/apartment",
        {
            _id: "http://schema.org/Apartment",
            _name: "Apartment",
            _parent: [
                "http://schema.org/Accommodation"
            ],
            numberOfRooms: [
                "http://schema.org/Number",
                "http://schema.org/QuantitativeValue"
            ],
            occupancy: [
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/notedigitaldocument",
        {
            _id: "http://schema.org/NoteDigitalDocument",
            _name: "NoteDigitalDocument",
            _parent: [
                "http://schema.org/DigitalDocument"
            ]
        }
    ],
    [
        "http://schema.org/service",
        {
            _id: "http://schema.org/Service",
            _name: "Service",
            _parent: [
                "http://schema.org/Intangible"
            ],
            aggregateRating: [
                "http://schema.org/AggregateRating"
            ],
            areaServed: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place",
                "http://schema.org/AdministrativeArea"
            ],
            audience: [
                "http://schema.org/Audience"
            ],
            availableChannel: [
                "http://schema.org/ServiceChannel"
            ],
            award: [
                "http://schema.org/Text"
            ],
            brand: [
                "http://schema.org/Organization",
                "http://schema.org/Brand"
            ],
            broker: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            category: [
                "http://schema.org/Thing",
                "http://schema.org/Text",
                "http://schema.org/PhysicalActivityCategory"
            ],
            hasOfferCatalog: [
                "http://schema.org/OfferCatalog"
            ],
            hoursAvailable: [
                "http://schema.org/OpeningHoursSpecification"
            ],
            isRelatedTo: [
                "http://schema.org/Product",
                "http://schema.org/Service"
            ],
            isSimilarTo: [
                "http://schema.org/Product",
                "http://schema.org/Service"
            ],
            logo: [
                "http://schema.org/URL",
                "http://schema.org/ImageObject"
            ],
            offers: [
                "http://schema.org/Offer"
            ],
            provider: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            providerMobility: [
                "http://schema.org/Text"
            ],
            review: [
                "http://schema.org/Review"
            ],
            serviceOutput: [
                "http://schema.org/Thing"
            ],
            serviceType: [
                "http://schema.org/Text"
            ],
            slogan: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/campground",
        {
            _id: "http://schema.org/Campground",
            _name: "Campground",
            _parent: [
                "http://schema.org/LodgingBusiness",
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/tenniscomplex",
        {
            _id: "http://schema.org/TennisComplex",
            _name: "TennisComplex",
            _parent: [
                "http://schema.org/SportsActivityLocation"
            ]
        }
    ],
    [
        "http://schema.org/thing",
        {
            _id: "http://schema.org/Thing",
            _name: "Thing",
            additionalType: [
                "http://schema.org/URL"
            ],
            alternateName: [
                "http://schema.org/Text"
            ],
            description: [
                "http://schema.org/Text"
            ],
            disambiguatingDescription: [
                "http://schema.org/Text"
            ],
            identifier: [
                "http://schema.org/Text",
                "http://schema.org/PropertyValue",
                "http://schema.org/URL"
            ],
            image: [
                "http://schema.org/URL",
                "http://schema.org/ImageObject"
            ],
            mainEntityOfPage: [
                "http://schema.org/CreativeWork",
                "http://schema.org/URL"
            ],
            name: [
                "http://schema.org/Text"
            ],
            potentialAction: [
                "http://schema.org/Action"
            ],
            sameAs: [
                "http://schema.org/URL"
            ],
            subjectOf: [
                "http://schema.org/CreativeWork",
                "http://schema.org/Event"
            ],
            url: [
                "http://schema.org/URL"
            ]
        }
    ],
    [
        "http://schema.org/subwaystation",
        {
            _id: "http://schema.org/SubwayStation",
            _name: "SubwayStation",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/courthouse",
        {
            _id: "http://schema.org/Courthouse",
            _name: "Courthouse",
            _parent: [
                "http://schema.org/GovernmentBuilding"
            ]
        }
    ],
    [
        "http://schema.org/autowash",
        {
            _id: "http://schema.org/AutoWash",
            _name: "AutoWash",
            _parent: [
                "http://schema.org/AutomotiveBusiness"
            ]
        }
    ],
    [
        "http://schema.org/hardwarestore",
        {
            _id: "http://schema.org/HardwareStore",
            _name: "HardwareStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/askaction",
        {
            _id: "http://schema.org/AskAction",
            _name: "AskAction",
            _parent: [
                "http://schema.org/CommunicateAction"
            ],
            question: [
                "http://schema.org/Question"
            ]
        }
    ],
    [
        "http://schema.org/visualartsevent",
        {
            _id: "http://schema.org/VisualArtsEvent",
            _name: "VisualArtsEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/trackaction",
        {
            _id: "http://schema.org/TrackAction",
            _name: "TrackAction",
            _parent: [
                "http://schema.org/FindAction"
            ],
            deliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ]
        }
    ],
    [
        "http://schema.org/beautysalon",
        {
            _id: "http://schema.org/BeautySalon",
            _name: "BeautySalon",
            _parent: [
                "http://schema.org/HealthAndBeautyBusiness"
            ]
        }
    ],
    [
        "http://schema.org/communicateaction",
        {
            _id: "http://schema.org/CommunicateAction",
            _name: "CommunicateAction",
            _parent: [
                "http://schema.org/InteractAction"
            ],
            about: [
                "http://schema.org/Thing"
            ],
            inLanguage: [
                "http://schema.org/Text",
                "http://schema.org/Language"
            ],
            recipient: [
                "http://schema.org/ContactPoint",
                "http://schema.org/Person",
                "http://schema.org/Organization",
                "http://schema.org/Audience"
            ]
        }
    ],
    [
        "http://schema.org/menuitem",
        {
            _id: "http://schema.org/MenuItem",
            _name: "MenuItem",
            _parent: [
                "http://schema.org/Intangible"
            ],
            menuAddOn: [
                "http://schema.org/MenuItem",
                "http://schema.org/MenuSection"
            ],
            nutrition: [
                "http://schema.org/NutritionInformation"
            ],
            offers: [
                "http://schema.org/Offer"
            ],
            suitableForDiet: [
                "http://schema.org/RestrictedDiet"
            ]
        }
    ],
    [
        "http://schema.org/roofingcontractor",
        {
            _id: "http://schema.org/RoofingContractor",
            _name: "RoofingContractor",
            _parent: [
                "http://schema.org/HomeAndConstructionBusiness"
            ]
        }
    ],
    [
        "http://schema.org/governmentservice",
        {
            _id: "http://schema.org/GovernmentService",
            _name: "GovernmentService",
            _parent: [
                "http://schema.org/Service"
            ],
            serviceOperator: [
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/deliveryevent",
        {
            _id: "http://schema.org/DeliveryEvent",
            _name: "DeliveryEvent",
            _parent: [
                "http://schema.org/Event"
            ],
            accessCode: [
                "http://schema.org/Text"
            ],
            availableFrom: [
                "http://schema.org/DateTime"
            ],
            availableThrough: [
                "http://schema.org/DateTime"
            ],
            hasDeliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ]
        }
    ],
    [
        "http://schema.org/hobbyshop",
        {
            _id: "http://schema.org/HobbyShop",
            _name: "HobbyShop",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/followaction",
        {
            _id: "http://schema.org/FollowAction",
            _name: "FollowAction",
            _parent: [
                "http://schema.org/InteractAction"
            ],
            followee: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/childrensevent",
        {
            _id: "http://schema.org/ChildrensEvent",
            _name: "ChildrensEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/rvpark",
        {
            _id: "http://schema.org/RVPark",
            _name: "RVPark",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/enumeration",
        {
            _id: "http://schema.org/Enumeration",
            _name: "Enumeration",
            _parent: [
                "http://schema.org/Intangible"
            ]
        }
    ],
    [
        "http://schema.org/singlefamilyresidence",
        {
            _id: "http://schema.org/SingleFamilyResidence",
            _name: "SingleFamilyResidence",
            _parent: [
                "http://schema.org/House"
            ],
            numberOfRooms: [
                "http://schema.org/Number",
                "http://schema.org/QuantitativeValue"
            ],
            occupancy: [
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/datacatalog",
        {
            _id: "http://schema.org/DataCatalog",
            _name: "DataCatalog",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            dataset: [
                "http://schema.org/Dataset"
            ]
        }
    ],
    [
        "http://schema.org/wholesalestore",
        {
            _id: "http://schema.org/WholesaleStore",
            _name: "WholesaleStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/broadcastevent",
        {
            _id: "http://schema.org/BroadcastEvent",
            _name: "BroadcastEvent",
            _parent: [
                "http://schema.org/PublicationEvent"
            ],
            broadcastOfEvent: [
                "http://schema.org/Event"
            ],
            isLiveBroadcast: [
                "http://schema.org/Boolean"
            ],
            videoFormat: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/rentalcarreservation",
        {
            _id: "http://schema.org/RentalCarReservation",
            _name: "RentalCarReservation",
            _parent: [
                "http://schema.org/Reservation"
            ],
            dropoffLocation: [
                "http://schema.org/Place"
            ],
            dropoffTime: [
                "http://schema.org/DateTime"
            ],
            pickupLocation: [
                "http://schema.org/Place"
            ],
            pickupTime: [
                "http://schema.org/DateTime"
            ]
        }
    ],
    [
        "http://schema.org/travelaction",
        {
            _id: "http://schema.org/TravelAction",
            _name: "TravelAction",
            _parent: [
                "http://schema.org/MoveAction"
            ],
            distance: [
                "http://schema.org/Distance"
            ]
        }
    ],
    [
        "http://schema.org/organizationrole",
        {
            _id: "http://schema.org/OrganizationRole",
            _name: "OrganizationRole",
            _parent: [
                "http://schema.org/Role"
            ],
            numberedPosition: [
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/skiresort",
        {
            _id: "http://schema.org/SkiResort",
            _name: "SkiResort",
            _parent: [
                "http://schema.org/SportsActivityLocation"
            ]
        }
    ],
    [
        "http://schema.org/automatedteller",
        {
            _id: "http://schema.org/AutomatedTeller",
            _name: "AutomatedTeller",
            _parent: [
                "http://schema.org/FinancialService"
            ]
        }
    ],
    [
        "http://schema.org/canal",
        {
            _id: "http://schema.org/Canal",
            _name: "Canal",
            _parent: [
                "http://schema.org/BodyOfWater"
            ]
        }
    ],
    [
        "http://schema.org/ngo",
        {
            _id: "http://schema.org/NGO",
            _name: "NGO",
            _parent: [
                "http://schema.org/Organization"
            ]
        }
    ],
    [
        "http://schema.org/tvseries",
        {
            _id: "http://schema.org/TVSeries",
            _name: "TVSeries",
            _parent: [
                "http://schema.org/CreativeWork",
                "http://schema.org/CreativeWorkSeries"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            containsSeason: [
                "http://schema.org/CreativeWorkSeason"
            ],
            countryOfOrigin: [
                "http://schema.org/Country"
            ],
            director: [
                "http://schema.org/Person"
            ],
            episode: [
                "http://schema.org/Episode"
            ],
            musicBy: [
                "http://schema.org/MusicGroup",
                "http://schema.org/Person"
            ],
            numberOfEpisodes: [
                "http://schema.org/Integer"
            ],
            numberOfSeasons: [
                "http://schema.org/Integer"
            ],
            productionCompany: [
                "http://schema.org/Organization"
            ],
            trailer: [
                "http://schema.org/VideoObject"
            ]
        }
    ],
    [
        "http://schema.org/barorpub",
        {
            _id: "http://schema.org/BarOrPub",
            _name: "BarOrPub",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/float",
        {
            _id: "http://schema.org/Float",
            _name: "Float",
            _parent: [
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/datatype",
        {
            _id: "http://schema.org/DataType",
            _name: "DataType",
            _parent: [
                "rdfs:Class"
            ]
        }
    ],
    [
        "http://schema.org/fmradiochannel",
        {
            _id: "http://schema.org/FMRadioChannel",
            _name: "FMRadioChannel",
            _parent: [
                "http://schema.org/RadioChannel"
            ]
        }
    ],
    [
        "http://schema.org/distance",
        {
            _id: "http://schema.org/Distance",
            _name: "Distance",
            _parent: [
                "http://schema.org/Quantity"
            ]
        }
    ],
    [
        "http://schema.org/musicplaylist",
        {
            _id: "http://schema.org/MusicPlaylist",
            _name: "MusicPlaylist",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            numTracks: [
                "http://schema.org/Integer"
            ],
            track: [
                "http://schema.org/ItemList",
                "http://schema.org/MusicRecording"
            ]
        }
    ],
    [
        "http://schema.org/quantitativevalue",
        {
            _id: "http://schema.org/QuantitativeValue",
            _name: "QuantitativeValue",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            additionalProperty: [
                "http://schema.org/PropertyValue"
            ],
            maxValue: [
                "http://schema.org/Number"
            ],
            minValue: [
                "http://schema.org/Number"
            ],
            unitCode: [
                "http://schema.org/URL",
                "http://schema.org/Text"
            ],
            unitText: [
                "http://schema.org/Text"
            ],
            value: [
                "http://schema.org/StructuredValue",
                "http://schema.org/Text",
                "http://schema.org/Boolean",
                "http://schema.org/Number"
            ],
            valueReference: [
                "http://schema.org/StructuredValue",
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Enumeration",
                "http://schema.org/PropertyValue",
                "http://schema.org/QualitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/beddetails",
        {
            _id: "http://schema.org/BedDetails",
            _name: "BedDetails",
            _parent: [
                "http://schema.org/Intangible"
            ],
            numberOfBeds: [
                "http://schema.org/Number"
            ],
            typeOfBed: [
                "http://schema.org/Text",
                "http://schema.org/BedType"
            ]
        }
    ],
    [
        "http://schema.org/bakery",
        {
            _id: "http://schema.org/Bakery",
            _name: "Bakery",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/nightclub",
        {
            _id: "http://schema.org/NightClub",
            _name: "NightClub",
            _parent: [
                "http://schema.org/EntertainmentBusiness"
            ]
        }
    ],
    [
        "http://schema.org/mensclothingstore",
        {
            _id: "http://schema.org/MensClothingStore",
            _name: "MensClothingStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/acceptaction",
        {
            _id: "http://schema.org/AcceptAction",
            _name: "AcceptAction",
            _parent: [
                "http://schema.org/AllocateAction"
            ]
        }
    ],
    [
        "http://schema.org/language",
        {
            _id: "http://schema.org/Language",
            _name: "Language",
            _parent: [
                "http://schema.org/Intangible"
            ]
        }
    ],
    [
        "http://schema.org/newsarticle",
        {
            _id: "http://schema.org/NewsArticle",
            _name: "NewsArticle",
            _parent: [
                "http://schema.org/Article"
            ],
            dateline: [
                "http://schema.org/Text"
            ],
            printColumn: [
                "http://schema.org/Text"
            ],
            printEdition: [
                "http://schema.org/Text"
            ],
            printPage: [
                "http://schema.org/Text"
            ],
            printSection: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/theatergroup",
        {
            _id: "http://schema.org/TheaterGroup",
            _name: "TheaterGroup",
            _parent: [
                "http://schema.org/PerformingGroup"
            ]
        }
    ],
    [
        "http://schema.org/parceldelivery",
        {
            _id: "http://schema.org/ParcelDelivery",
            _name: "ParcelDelivery",
            _parent: [
                "http://schema.org/Intangible"
            ],
            deliveryAddress: [
                "http://schema.org/PostalAddress"
            ],
            deliveryStatus: [
                "http://schema.org/DeliveryEvent"
            ],
            expectedArrivalFrom: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            expectedArrivalUntil: [
                "http://schema.org/DateTime",
                "http://schema.org/Date"
            ],
            hasDeliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ],
            itemShipped: [
                "http://schema.org/Product"
            ],
            originAddress: [
                "http://schema.org/PostalAddress"
            ],
            partOfOrder: [
                "http://schema.org/Order"
            ],
            provider: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            trackingNumber: [
                "http://schema.org/Text"
            ],
            trackingUrl: [
                "http://schema.org/URL"
            ]
        }
    ],
    [
        "http://schema.org/pond",
        {
            _id: "http://schema.org/Pond",
            _name: "Pond",
            _parent: [
                "http://schema.org/BodyOfWater"
            ]
        }
    ],
    [
        "http://schema.org/answer",
        {
            _id: "http://schema.org/Answer",
            _name: "Answer",
            _parent: [
                "http://schema.org/Comment"
            ]
        }
    ],
    [
        "http://schema.org/brewery",
        {
            _id: "http://schema.org/Brewery",
            _name: "Brewery",
            _parent: [
                "http://schema.org/FoodEstablishment"
            ]
        }
    ],
    [
        "http://schema.org/allocateaction",
        {
            _id: "http://schema.org/AllocateAction",
            _name: "AllocateAction",
            _parent: [
                "http://schema.org/OrganizeAction"
            ]
        }
    ],
    [
        "http://schema.org/parentaudience",
        {
            _id: "http://schema.org/ParentAudience",
            _name: "ParentAudience",
            _parent: [
                "http://schema.org/PeopleAudience"
            ],
            childMaxAge: [
                "http://schema.org/Number"
            ],
            childMinAge: [
                "http://schema.org/Number"
            ]
        }
    ],
    [
        "http://schema.org/radiochannel",
        {
            _id: "http://schema.org/RadioChannel",
            _name: "RadioChannel",
            _parent: [
                "http://schema.org/BroadcastChannel"
            ]
        }
    ],
    [
        "http://schema.org/room",
        {
            _id: "http://schema.org/Room",
            _name: "Room",
            _parent: [
                "http://schema.org/Accommodation"
            ]
        }
    ],
    [
        "http://schema.org/publicswimmingpool",
        {
            _id: "http://schema.org/PublicSwimmingPool",
            _name: "PublicSwimmingPool",
            _parent: [
                "http://schema.org/SportsActivityLocation"
            ]
        }
    ],
    [
        "http://schema.org/jobposting",
        {
            _id: "http://schema.org/JobPosting",
            _name: "JobPosting",
            _parent: [
                "http://schema.org/Intangible"
            ],
            baseSalary: [
                "http://schema.org/MonetaryAmount",
                "http://schema.org/PriceSpecification",
                "http://schema.org/Number"
            ],
            datePosted: [
                "http://schema.org/Date"
            ],
            employmentType: [
                "http://schema.org/Text"
            ],
            estimatedSalary: [
                "http://schema.org/Number",
                "http://schema.org/MonetaryAmountDistribution",
                "http://schema.org/MonetaryAmount"
            ],
            experienceRequirements: [
                "http://schema.org/Text"
            ],
            hiringOrganization: [
                "http://schema.org/Organization"
            ],
            incentiveCompensation: [
                "http://schema.org/Text"
            ],
            industry: [
                "http://schema.org/Text"
            ],
            jobBenefits: [
                "http://schema.org/Text"
            ],
            jobLocation: [
                "http://schema.org/Place"
            ],
            occupationalCategory: [
                "http://schema.org/Text",
                "http://schema.org/CategoryCode"
            ],
            relevantOccupation: [
                "http://schema.org/Occupation"
            ],
            responsibilities: [
                "http://schema.org/Text"
            ],
            salaryCurrency: [
                "http://schema.org/Text"
            ],
            skills: [
                "http://schema.org/Text"
            ],
            specialCommitments: [
                "http://schema.org/Text"
            ],
            title: [
                "http://schema.org/Text"
            ],
            validThrough: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            workHours: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/computerlanguage",
        {
            _id: "http://schema.org/ComputerLanguage",
            _name: "ComputerLanguage",
            _parent: [
                "http://schema.org/Intangible"
            ]
        }
    ],
    [
        "http://schema.org/conversation",
        {
            _id: "http://schema.org/Conversation",
            _name: "Conversation",
            _parent: [
                "http://schema.org/CreativeWork"
            ]
        }
    ],
    [
        "http://schema.org/mediaobject",
        {
            _id: "http://schema.org/MediaObject",
            _name: "MediaObject",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            associatedArticle: [
                "http://schema.org/NewsArticle"
            ],
            bitrate: [
                "http://schema.org/Text"
            ],
            contentSize: [
                "http://schema.org/Text"
            ],
            contentUrl: [
                "http://schema.org/URL"
            ],
            duration: [
                "http://schema.org/Duration"
            ],
            embedUrl: [
                "http://schema.org/URL"
            ],
            encodesCreativeWork: [
                "http://schema.org/CreativeWork"
            ],
            encodingFormat: [
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            endTime: [
                "http://schema.org/DateTime",
                "http://schema.org/Time"
            ],
            height: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Distance"
            ],
            playerType: [
                "http://schema.org/Text"
            ],
            productionCompany: [
                "http://schema.org/Organization"
            ],
            regionsAllowed: [
                "http://schema.org/Place"
            ],
            requiresSubscription: [
                "http://schema.org/MediaSubscription",
                "http://schema.org/Boolean"
            ],
            startTime: [
                "http://schema.org/DateTime",
                "http://schema.org/Time"
            ],
            uploadDate: [
                "http://schema.org/Date"
            ],
            width: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Distance"
            ]
        }
    ],
    [
        "http://schema.org/cemetery",
        {
            _id: "http://schema.org/Cemetery",
            _name: "Cemetery",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/accountingservice",
        {
            _id: "http://schema.org/AccountingService",
            _name: "AccountingService",
            _parent: [
                "http://schema.org/FinancialService"
            ]
        }
    ],
    [
        "http://schema.org/checkinaction",
        {
            _id: "http://schema.org/CheckInAction",
            _name: "CheckInAction",
            _parent: [
                "http://schema.org/CommunicateAction"
            ]
        }
    ],
    [
        "http://schema.org/businessaudience",
        {
            _id: "http://schema.org/BusinessAudience",
            _name: "BusinessAudience",
            _parent: [
                "http://schema.org/Audience"
            ],
            numberOfEmployees: [
                "http://schema.org/QuantitativeValue"
            ],
            yearlyRevenue: [
                "http://schema.org/QuantitativeValue"
            ],
            yearsInOperation: [
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/lodgingbusiness",
        {
            _id: "http://schema.org/LodgingBusiness",
            _name: "LodgingBusiness",
            _parent: [
                "http://schema.org/LocalBusiness"
            ],
            amenityFeature: [
                "http://schema.org/LocationFeatureSpecification"
            ],
            audience: [
                "http://schema.org/Audience"
            ],
            availableLanguage: [
                "http://schema.org/Language",
                "http://schema.org/Text"
            ],
            checkinTime: [
                "http://schema.org/Time",
                "http://schema.org/DateTime"
            ],
            checkoutTime: [
                "http://schema.org/DateTime",
                "http://schema.org/Time"
            ],
            numberOfRooms: [
                "http://schema.org/Number",
                "http://schema.org/QuantitativeValue"
            ],
            petsAllowed: [
                "http://schema.org/Boolean",
                "http://schema.org/Text"
            ],
            starRating: [
                "http://schema.org/Rating"
            ]
        }
    ],
    [
        "http://schema.org/house",
        {
            _id: "http://schema.org/House",
            _name: "House",
            _parent: [
                "http://schema.org/Accommodation"
            ],
            numberOfRooms: [
                "http://schema.org/Number",
                "http://schema.org/QuantitativeValue"
            ]
        }
    ],
    [
        "http://schema.org/airport",
        {
            _id: "http://schema.org/Airport",
            _name: "Airport",
            _parent: [
                "http://schema.org/CivicStructure"
            ],
            iataCode: [
                "http://schema.org/Text"
            ],
            icaoCode: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/creativeworkseason",
        {
            _id: "http://schema.org/CreativeWorkSeason",
            _name: "CreativeWorkSeason",
            _parent: [
                "http://schema.org/CreativeWork"
            ],
            actor: [
                "http://schema.org/Person"
            ],
            director: [
                "http://schema.org/Person"
            ],
            endDate: [
                "http://schema.org/DateTime",
                "http://schema.org/Date"
            ],
            episode: [
                "http://schema.org/Episode"
            ],
            numberOfEpisodes: [
                "http://schema.org/Integer"
            ],
            partOfSeries: [
                "http://schema.org/CreativeWorkSeries"
            ],
            productionCompany: [
                "http://schema.org/Organization"
            ],
            seasonNumber: [
                "http://schema.org/Integer",
                "http://schema.org/Text"
            ],
            startDate: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            trailer: [
                "http://schema.org/VideoObject"
            ]
        }
    ],
    [
        "http://schema.org/reservation",
        {
            _id: "http://schema.org/Reservation",
            _name: "Reservation",
            _parent: [
                "http://schema.org/Intangible"
            ],
            bookingTime: [
                "http://schema.org/DateTime"
            ],
            broker: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            modifiedTime: [
                "http://schema.org/DateTime"
            ],
            priceCurrency: [
                "http://schema.org/Text"
            ],
            programMembershipUsed: [
                "http://schema.org/ProgramMembership"
            ],
            provider: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            reservationFor: [
                "http://schema.org/Thing"
            ],
            reservationId: [
                "http://schema.org/Text"
            ],
            reservationStatus: [
                "http://schema.org/ReservationStatusType"
            ],
            reservedTicket: [
                "http://schema.org/Ticket"
            ],
            totalPrice: [
                "http://schema.org/PriceSpecification",
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            underName: [
                "http://schema.org/Organization",
                "http://schema.org/Person"
            ]
        }
    ],
    [
        "http://schema.org/findaction",
        {
            _id: "http://schema.org/FindAction",
            _name: "FindAction",
            _parent: [
                "http://schema.org/Action"
            ]
        }
    ],
    [
        "http://schema.org/recyclingcenter",
        {
            _id: "http://schema.org/RecyclingCenter",
            _name: "RecyclingCenter",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/hospital",
        {
            _id: "http://schema.org/Hospital",
            _name: "Hospital",
            _parent: [
                "http://schema.org/EmergencyService",
                "http://schema.org/CivicStructure",
                "http://schema.org/MedicalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/festival",
        {
            _id: "http://schema.org/Festival",
            _name: "Festival",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/lockerdelivery",
        {
            _id: "http://schema.org/LockerDelivery",
            _name: "LockerDelivery",
            _parent: [
                "http://schema.org/DeliveryMethod"
            ]
        }
    ],
    [
        "http://schema.org/clothingstore",
        {
            _id: "http://schema.org/ClothingStore",
            _name: "ClothingStore",
            _parent: [
                "http://schema.org/Store"
            ]
        }
    ],
    [
        "http://schema.org/bookmarkaction",
        {
            _id: "http://schema.org/BookmarkAction",
            _name: "BookmarkAction",
            _parent: [
                "http://schema.org/OrganizeAction"
            ]
        }
    ],
    [
        "http://schema.org/radioseason",
        {
            _id: "http://schema.org/RadioSeason",
            _name: "RadioSeason",
            _parent: [
                "http://schema.org/CreativeWorkSeason"
            ]
        }
    ],
    [
        "http://schema.org/updateaction",
        {
            _id: "http://schema.org/UpdateAction",
            _name: "UpdateAction",
            _parent: [
                "http://schema.org/Action"
            ],
            targetCollection: [
                "http://schema.org/Thing"
            ]
        }
    ],
    [
        "http://schema.org/aggregaterating",
        {
            _id: "http://schema.org/AggregateRating",
            _name: "AggregateRating",
            _parent: [
                "http://schema.org/Rating"
            ],
            itemReviewed: [
                "http://schema.org/Thing"
            ],
            ratingCount: [
                "http://schema.org/Integer"
            ],
            reviewCount: [
                "http://schema.org/Integer"
            ]
        }
    ],
    [
        "http://schema.org/emailmessage",
        {
            _id: "http://schema.org/EmailMessage",
            _name: "EmailMessage",
            _parent: [
                "http://schema.org/Message"
            ]
        }
    ],
    [
        "http://schema.org/busstation",
        {
            _id: "http://schema.org/BusStation",
            _name: "BusStation",
            _parent: [
                "http://schema.org/CivicStructure"
            ]
        }
    ],
    [
        "http://schema.org/bowlingalley",
        {
            _id: "http://schema.org/BowlingAlley",
            _name: "BowlingAlley",
            _parent: [
                "http://schema.org/SportsActivityLocation"
            ]
        }
    ],
    [
        "http://schema.org/imagegallery",
        {
            _id: "http://schema.org/ImageGallery",
            _name: "ImageGallery",
            _parent: [
                "http://schema.org/CollectionPage"
            ]
        }
    ],
    [
        "http://schema.org/offer",
        {
            _id: "http://schema.org/Offer",
            _name: "Offer",
            _parent: [
                "http://schema.org/Intangible"
            ],
            acceptedPaymentMethod: [
                "http://schema.org/PaymentMethod",
                "http://schema.org/LoanOrCredit"
            ],
            addOn: [
                "http://schema.org/Offer"
            ],
            advanceBookingRequirement: [
                "http://schema.org/QuantitativeValue"
            ],
            aggregateRating: [
                "http://schema.org/AggregateRating"
            ],
            areaServed: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place",
                "http://schema.org/AdministrativeArea"
            ],
            availability: [
                "http://schema.org/ItemAvailability"
            ],
            availabilityEnds: [
                "http://schema.org/DateTime",
                "http://schema.org/Time",
                "http://schema.org/Date"
            ],
            availabilityStarts: [
                "http://schema.org/Time",
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            availableAtOrFrom: [
                "http://schema.org/Place"
            ],
            availableDeliveryMethod: [
                "http://schema.org/DeliveryMethod"
            ],
            businessFunction: [
                "http://schema.org/BusinessFunction"
            ],
            category: [
                "http://schema.org/Thing",
                "http://schema.org/Text",
                "http://schema.org/PhysicalActivityCategory"
            ],
            deliveryLeadTime: [
                "http://schema.org/QuantitativeValue"
            ],
            eligibleCustomerType: [
                "http://schema.org/BusinessEntityType"
            ],
            eligibleDuration: [
                "http://schema.org/QuantitativeValue"
            ],
            eligibleQuantity: [
                "http://schema.org/QuantitativeValue"
            ],
            eligibleRegion: [
                "http://schema.org/GeoShape",
                "http://schema.org/Text",
                "http://schema.org/Place"
            ],
            eligibleTransactionVolume: [
                "http://schema.org/PriceSpecification"
            ],
            gtin12: [
                "http://schema.org/Text"
            ],
            gtin13: [
                "http://schema.org/Text"
            ],
            gtin14: [
                "http://schema.org/Text"
            ],
            gtin8: [
                "http://schema.org/Text"
            ],
            includesObject: [
                "http://schema.org/TypeAndQuantityNode"
            ],
            ineligibleRegion: [
                "http://schema.org/Text",
                "http://schema.org/GeoShape",
                "http://schema.org/Place"
            ],
            inventoryLevel: [
                "http://schema.org/QuantitativeValue"
            ],
            itemCondition: [
                "http://schema.org/OfferItemCondition"
            ],
            itemOffered: [
                "http://schema.org/Product",
                "http://schema.org/Service"
            ],
            mpn: [
                "http://schema.org/Text"
            ],
            offeredBy: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            price: [
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            priceCurrency: [
                "http://schema.org/Text"
            ],
            priceSpecification: [
                "http://schema.org/PriceSpecification"
            ],
            priceValidUntil: [
                "http://schema.org/Date"
            ],
            review: [
                "http://schema.org/Review"
            ],
            seller: [
                "http://schema.org/Person",
                "http://schema.org/Organization"
            ],
            serialNumber: [
                "http://schema.org/Text"
            ],
            sku: [
                "http://schema.org/Text"
            ],
            validFrom: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            validThrough: [
                "http://schema.org/Date",
                "http://schema.org/DateTime"
            ],
            warranty: [
                "http://schema.org/WarrantyPromise"
            ]
        }
    ],
    [
        "http://schema.org/datadownload",
        {
            _id: "http://schema.org/DataDownload",
            _name: "DataDownload",
            _parent: [
                "http://schema.org/MediaObject"
            ]
        }
    ],
    [
        "http://schema.org/product",
        {
            _id: "http://schema.org/Product",
            _name: "Product",
            _parent: [
                "http://schema.org/Thing"
            ],
            additionalProperty: [
                "http://schema.org/PropertyValue"
            ],
            aggregateRating: [
                "http://schema.org/AggregateRating"
            ],
            audience: [
                "http://schema.org/Audience"
            ],
            award: [
                "http://schema.org/Text"
            ],
            brand: [
                "http://schema.org/Organization",
                "http://schema.org/Brand"
            ],
            category: [
                "http://schema.org/Thing",
                "http://schema.org/Text",
                "http://schema.org/PhysicalActivityCategory"
            ],
            color: [
                "http://schema.org/Text"
            ],
            depth: [
                "http://schema.org/Distance",
                "http://schema.org/QuantitativeValue"
            ],
            gtin12: [
                "http://schema.org/Text"
            ],
            gtin13: [
                "http://schema.org/Text"
            ],
            gtin14: [
                "http://schema.org/Text"
            ],
            gtin8: [
                "http://schema.org/Text"
            ],
            height: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Distance"
            ],
            isAccessoryOrSparePartFor: [
                "http://schema.org/Product"
            ],
            isConsumableFor: [
                "http://schema.org/Product"
            ],
            isRelatedTo: [
                "http://schema.org/Product",
                "http://schema.org/Service"
            ],
            isSimilarTo: [
                "http://schema.org/Product",
                "http://schema.org/Service"
            ],
            itemCondition: [
                "http://schema.org/OfferItemCondition"
            ],
            logo: [
                "http://schema.org/URL",
                "http://schema.org/ImageObject"
            ],
            manufacturer: [
                "http://schema.org/Organization"
            ],
            material: [
                "http://schema.org/Product",
                "http://schema.org/Text",
                "http://schema.org/URL"
            ],
            model: [
                "http://schema.org/ProductModel",
                "http://schema.org/Text"
            ],
            mpn: [
                "http://schema.org/Text"
            ],
            offers: [
                "http://schema.org/Offer"
            ],
            productID: [
                "http://schema.org/Text"
            ],
            productionDate: [
                "http://schema.org/Date"
            ],
            purchaseDate: [
                "http://schema.org/Date"
            ],
            releaseDate: [
                "http://schema.org/Date"
            ],
            review: [
                "http://schema.org/Review"
            ],
            sku: [
                "http://schema.org/Text"
            ],
            slogan: [
                "http://schema.org/Text"
            ],
            weight: [
                "http://schema.org/QuantitativeValue"
            ],
            width: [
                "http://schema.org/QuantitativeValue",
                "http://schema.org/Distance"
            ]
        }
    ],
    [
        "http://schema.org/geocoordinates",
        {
            _id: "http://schema.org/GeoCoordinates",
            _name: "GeoCoordinates",
            _parent: [
                "http://schema.org/StructuredValue"
            ],
            address: [
                "http://schema.org/Text",
                "http://schema.org/PostalAddress"
            ],
            addressCountry: [
                "http://schema.org/Country",
                "http://schema.org/Text"
            ],
            elevation: [
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            latitude: [
                "http://schema.org/Number",
                "http://schema.org/Text"
            ],
            longitude: [
                "http://schema.org/Text",
                "http://schema.org/Number"
            ],
            postalCode: [
                "http://schema.org/Text"
            ]
        }
    ],
    [
        "http://schema.org/middleschool",
        {
            _id: "http://schema.org/MiddleSchool",
            _name: "MiddleSchool",
            _parent: [
                "http://schema.org/EducationalOrganization"
            ]
        }
    ],
    [
        "http://schema.org/automotivebusiness",
        {
            _id: "http://schema.org/AutomotiveBusiness",
            _name: "AutomotiveBusiness",
            _parent: [
                "http://schema.org/LocalBusiness"
            ]
        }
    ],
    [
        "http://schema.org/literaryevent",
        {
            _id: "http://schema.org/LiteraryEvent",
            _name: "LiteraryEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/socialevent",
        {
            _id: "http://schema.org/SocialEvent",
            _name: "SocialEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/eataction",
        {
            _id: "http://schema.org/EatAction",
            _name: "EatAction",
            _parent: [
                "http://schema.org/ConsumeAction"
            ]
        }
    ],
    [
        "http://schema.org/theaterevent",
        {
            _id: "http://schema.org/TheaterEvent",
            _name: "TheaterEvent",
            _parent: [
                "http://schema.org/Event"
            ]
        }
    ],
    [
        "http://schema.org/takeaction",
        {
            _id: "http://schema.org/TakeAction",
            _name: "TakeAction",
            _parent: [
                "http://schema.org/TransferAction"
            ]
        }
    ],
    [
        "http://schema.org/sportsevent",
        {
            _id: "http://schema.org/SportsEvent",
            _name: "SportsEvent",
            _parent: [
                "http://schema.org/Event"
            ],
            awayTeam: [
                "http://schema.org/Person",
                "http://schema.org/SportsTeam"
            ],
            competitor: [
                "http://schema.org/Person",
                "http://schema.org/SportsTeam"
            ],
            homeTeam: [
                "http://schema.org/Person",
                "http://schema.org/SportsTeam"
            ]
        }
    ],
    [
        "http://schema.org/gendertype",
        {
            _values: [
                "Male",
                "Female"
            ]
        }
    ],
    [
        "http://schema.org/mapcategorytype",
        {
            _values: [
                "ParkingMap",
                "SeatingMap",
                "VenueMap",
                "TransitMap"
            ]
        }
    ],
    [
        "http://schema.org/contactpointoption",
        {
            _values: [
                "HearingImpairedSupported",
                "TollFree"
            ]
        }
    ],
    [
        "http://schema.org/digitaldocumentpermissiontype",
        {
            _values: [
                "WritePermission",
                "ReadPermission",
                "CommentPermission"
            ]
        }
    ],
    [
        "http://schema.org/paymentstatustype",
        {
            _values: [
                "PaymentPastDue",
                "PaymentDue",
                "PaymentComplete",
                "PaymentDeclined",
                "PaymentAutomaticallyApplied"
            ]
        }
    ],
    [
        "http://schema.org/musicalbumreleasetype",
        {
            _values: [
                "EPRelease",
                "BroadcastRelease",
                "AlbumRelease",
                "SingleRelease"
            ]
        }
    ],
    [
        "http://schema.org/gameserverstatus",
        {
            _values: [
                "OfflinePermanently",
                "OfflineTemporarily",
                "Online",
                "OnlineFull"
            ]
        }
    ],
    [
        "http://schema.org/offeritemcondition",
        {
            _values: [
                "UsedCondition",
                "RefurbishedCondition",
                "NewCondition",
                "DamagedCondition"
            ]
        }
    ],
    [
        "http://schema.org/restricteddiet",
        {
            _values: [
                "HalalDiet",
                "LowLactoseDiet",
                "VeganDiet",
                "VegetarianDiet",
                "KosherDiet",
                "LowCalorieDiet",
                "LowFatDiet",
                "DiabeticDiet",
                "LowSaltDiet",
                "HinduDiet",
                "GlutenFreeDiet"
            ]
        }
    ],
    [
        "http://schema.org/qualitativevalue",
        {
            _values: []
        }
    ],
    [
        "http://schema.org/paymentmethod",
        {
            _values: []
        }
    ],
    [
        "http://schema.org/actionstatustype",
        {
            _values: [
                "FailedActionStatus",
                "CompletedActionStatus",
                "ActiveActionStatus",
                "PotentialActionStatus"
            ]
        }
    ],
    [
        "http://schema.org/orderstatus",
        {
            _values: [
                "OrderDelivered",
                "OrderProcessing",
                "OrderInTransit",
                "OrderCancelled",
                "OrderPickupAvailable",
                "OrderReturned",
                "OrderPaymentDue",
                "OrderProblem"
            ]
        }
    ],
    [
        "http://schema.org/bookformattype",
        {
            _values: [
                "EBook",
                "AudiobookFormat",
                "Hardcover",
                "Paperback"
            ]
        }
    ],
    [
        "http://schema.org/itemlistordertype",
        {
            _values: [
                "ItemListOrderDescending",
                "ItemListUnordered",
                "ItemListOrderAscending"
            ]
        }
    ],
    [
        "http://schema.org/warrantyscope",
        {
            _values: []
        }
    ],
    [
        "http://schema.org/deliverymethod",
        {
            _values: [
                "OnSitePickup"
            ]
        }
    ],
    [
        "http://schema.org/musicalbumproductiontype",
        {
            _values: [
                "SpokenWordAlbum",
                "SoundtrackAlbum",
                "RemixAlbum",
                "CompilationAlbum",
                "StudioAlbum",
                "DemoAlbum",
                "DJMixAlbum",
                "LiveAlbum",
                "MixtapeAlbum"
            ]
        }
    ],
    [
        "http://schema.org/specialty",
        {
            _values: []
        }
    ],
    [
        "http://schema.org/itemavailability",
        {
            _values: [
                "SoldOut",
                "PreOrder",
                "PreSale",
                "InStock",
                "OutOfStock",
                "LimitedAvailability",
                "Discontinued",
                "OnlineOnly",
                "InStoreOnly"
            ]
        }
    ],
    [
        "http://schema.org/businessfunction",
        {
            _values: []
        }
    ],
    [
        "http://schema.org/rsvpresponsetype",
        {
            _values: [
                "RsvpResponseMaybe",
                "RsvpResponseYes",
                "RsvpResponseNo"
            ]
        }
    ],
    [
        "http://schema.org/businessentitytype",
        {
            _values: []
        }
    ],
    [
        "http://schema.org/reservationstatustype",
        {
            _values: [
                "ReservationPending",
                "ReservationCancelled",
                "ReservationConfirmed",
                "ReservationHold"
            ]
        }
    ],
    [
        "http://schema.org/boardingpolicytype",
        {
            _values: [
                "ZoneBoardingPolicy",
                "GroupBoardingPolicy"
            ]
        }
    ],
    [
        "http://schema.org/musicreleaseformattype",
        {
            _values: [
                "VinylFormat",
                "CassetteFormat",
                "LaserDiscFormat",
                "DigitalAudioTapeFormat",
                "CDFormat",
                "DigitalFormat",
                "DVDFormat"
            ]
        }
    ],
    [
        "http://schema.org/dayofweek",
        {
            _values: [
                "Friday",
                "Wednesday",
                "Tuesday",
                "PublicHolidays",
                "Sunday",
                "Saturday",
                "Thursday",
                "Monday"
            ]
        }
    ],
    [
        "http://schema.org/eventstatustype",
        {
            _values: [
                "EventScheduled",
                "EventCancelled",
                "EventPostponed",
                "EventRescheduled"
            ]
        }
    ],
    [
        "http://schema.org/gameplaymode",
        {
            _values: [
                "MultiPlayer",
                "CoOp",
                "SinglePlayer"
            ]
        }
    ]
]);
