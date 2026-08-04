import { type ClientSchema, a, defineData } from "@aws-amplify/backend"

/**
 * Every model: public guest read (unauthenticated Identity Pool role),
 * full CRUD for the "Admin" Cognito group. No public writes, ever.
 *
 * Singletons (Site/Contact/Hero/About/Experience/MenuSection/GallerySection/
 * EventsSection/ReviewsSection/ContactSection/ReservationCta/Footer) are
 * created once at seed time with a fixed id and only ever get()/update()'d
 * afterwards — there is no admin UI to create a second row.
 */
const publicReadAdminWrite = (allow: any) => [
  allow.guest().to(["read"]),
  allow.groups(["Admin"]),
]

const schema = a.schema({
  SiteSettings: a
    .model({
      navAboutLabel: a.string().required(),
      navExperienceLabel: a.string().required(),
      navMenuLabel: a.string().required(),
      navGalleryLabel: a.string().required(),
      navEventsLabel: a.string().required(),
      navContactLabel: a.string().required(),
      reservationButtonLabel: a.string().required(),
      logoPath: a.string(),
    })
    .authorization(publicReadAdminWrite),

  ContactInfo: a
    .model({
      phone: a.string().required(),
      email: a.string().required(),
      addressLine1: a.string().required(),
      addressLine2: a.string().required(),
      reservationUrl: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  HeroContent: a
    .model({
      ratingValue: a.string().required(),
      ratingLabel: a.string().required(),
      ratingCountLabel: a.string().required(),
      headlinePart1: a.string().required(),
      headlineAccent: a.string().required(),
      headlinePart2: a.string().required(),
      subheadline: a.string().required(),
      primaryButtonLabel: a.string().required(),
      secondaryButtonLabel: a.string().required(),
      backgroundImagePath: a.string(),
    })
    .authorization(publicReadAdminWrite),

  AboutContent: a
    .model({
      badgeNumber: a.string().required(),
      badgeLabel: a.string().required(),
      eyebrow: a.string().required(),
      heading1: a.string().required(),
      heading2: a.string().required(),
      paragraph1: a.string().required(),
      paragraph2: a.string().required(),
      paragraph3: a.string().required(),
      signature: a.string().required(),
      imagePath: a.string(),
      imageAlt: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  ExperienceContent: a
    .model({
      eyebrow: a.string().required(),
      heading1: a.string().required(),
      heading2: a.string().required(),
      intro: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  MenuSectionContent: a
    .model({
      eyebrow: a.string().required(),
      heading1: a.string().required(),
      heading2: a.string().required(),
      linkLabel: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  GallerySectionContent: a
    .model({
      eyebrow: a.string().required(),
      heading1: a.string().required(),
      heading2: a.string().required(),
      description: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  EventsSectionContent: a
    .model({
      eyebrow: a.string().required(),
      heading1: a.string().required(),
      heading2: a.string().required(),
      description: a.string().required(),
      imagePath: a.string(),
      imageAlt: a.string().required(),
      statNumber: a.string().required(),
      statLabel: a.string().required(),
      ctaLabel: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  ReviewsSectionContent: a
    .model({
      eyebrow: a.string().required(),
      heading1: a.string().required(),
      heading2: a.string().required(),
      aggregateRating: a.string().required(),
      aggregateCount: a.string().required(),
      ctaLabel: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  ContactSectionContent: a
    .model({
      eyebrow: a.string().required(),
      heading1: a.string().required(),
      heading2: a.string().required(),
      addressLabel: a.string().required(),
      routePlanLabel: a.string().required(),
      phoneLabel: a.string().required(),
      emailLabel: a.string().required(),
      hoursLabel: a.string().required(),
      parkingLabel: a.string().required(),
      accessibleLabel: a.string().required(),
      callNowButtonLabel: a.string().required(),
      openMapsButtonLabel: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  ReservationCtaContent: a
    .model({
      heading1: a.string().required(),
      heading2: a.string().required(),
      description: a.string().required(),
      buttonLabel: a.string().required(),
      phoneButtonLabelMobile: a.string().required(),
      note: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  FooterContent: a
    .model({
      brandName: a.string().required(),
      brandSubtitle: a.string().required(),
      description: a.string().required(),
      quickLinksHeading: a.string().required(),
      contactHeading: a.string().required(),
      hoursHeading: a.string().required(),
      quickLinkAboutLabel: a.string().required(),
      quickLinkMenuLabel: a.string().required(),
      quickLinkGalleryLabel: a.string().required(),
      quickLinkEventsLabel: a.string().required(),
      quickLinkReservationLabel: a.string().required(),
      quickLinkContactLabel: a.string().required(),
      legalImpressumLabel: a.string().required(),
      legalDatenschutzLabel: a.string().required(),
      legalCookieLabel: a.string().required(),
      developerCreditText: a.string().required(),
      copyrightText: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  // ---------------------------------------------------------------------
  // Lists — repeatable content, admin can create/edit/delete/reorder.
  // ---------------------------------------------------------------------

  ExperienceFeature: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      sortOrder: a.integer().required().default(0),
      // Fixed at seed time, not exposed in the admin form — icon choice is
      // a design decision and stays under developer control.
      iconKey: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  MenuCategory: a
    .model({
      name: a.string().required(),
      sortOrder: a.integer().required().default(0),
      items: a.hasMany("MenuItem", "categoryId"),
    })
    .authorization(publicReadAdminWrite),

  MenuItem: a
    .model({
      name: a.string().required(),
      description: a.string().required(),
      price: a.string().required(),
      imagePath: a.string(),
      sortOrder: a.integer().required().default(0),
      categoryId: a.id().required(),
      category: a.belongsTo("MenuCategory", "categoryId"),
    })
    .authorization(publicReadAdminWrite),

  GalleryImage: a
    .model({
      imagePath: a.string(),
      alt: a.string().required(),
      caption: a.string().required(),
      sortOrder: a.integer().required().default(0),
    })
    .authorization(publicReadAdminWrite),

  EventType: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      sortOrder: a.integer().required().default(0),
      iconKey: a.string().required(),
    })
    .authorization(publicReadAdminWrite),

  Review: a
    .model({
      author: a.string().required(),
      text: a.string().required(),
      source: a.string().required(),
      date: a.string().required(),
      rating: a.integer().required().default(5),
      sortOrder: a.integer().required().default(0),
    })
    .authorization(publicReadAdminWrite),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
})
