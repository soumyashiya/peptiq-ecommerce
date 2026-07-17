/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL CONTENT & BRANDING
 * ─────────────────────────────────────────────────────────────────────────────
 *  Content modelled on peptiq.bz — premium research peptides for laboratory
 *  R&D. All products are for laboratory research and development only.
 *  Not for human or veterinary consumption.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  name: 'Peptiq',
  suffix: '',
  tagline: 'ADVANCING DISCOVERY THROUGH PEPTIQ RESEARCH',
  established: 2024,
  email: 'research@peptiq.org',
  phone: 'Contact via email (support@peptiq.org)',
  address: 'United Kingdom · EU R&D supply',
};

export const nav = {
  links: [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#story' },
    { label: 'Products', href: '#products' },
    { label: 'Why Us', href: '#innovation' },
    { label: 'Testimonial', href: '#news' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Get in touch', href: '#contact' },
  language: 'ENG',
};

export const hero = {
  kicker:
    'RESEARCH USE ONLY — PREMIUM RESEARCH PEPTIDES FOR LABORATORY R&D. NOT FOR HUMAN OR VETERINARY CONSUMPTION.',
  line1: 'ENGINEERED FOR',
  line2: 'RESEARCH PRECISION',
  scrollCue: '[ SCROLL DOWN AND ENTER ]',
  footerLeft: 'ADVANCING DISCOVERY',
  footerRight: 'THROUGH PEPTIQ RESEARCH',
  // Floating lab/research render on a blue gradient.
  image: '/images/hero-new1.webp',
};

export const story = {
  index: '01',
  label: 'ABOUT',
  overline: 'Our story — Built for R&D supply',
  title:
    'Effortlessly advance science with research-grade peptides, validated by independent laboratories.',
  body: [
    'Peptiq develops innovative compounds for laboratory research use only. Our science-backed peptides and formulations are produced in-house and supplied in sealed, traceable formats for controlled R&D programmes.',
    'We eliminate uncertainty with batch-tested compounds, ISO-certified clean-room manufacturing, and fully documented supply across the UK and EU. Every Peptiq pen is independently verified by Janoshik Analytical.',
  ],
  cta: { label: 'Discover our process', href: '#innovation' },
  facts: [
    { value: '48+', label: 'Advanced formulations developed' },
    { value: '26.3k+', label: 'R&D-tested research units' },
    { value: '99.95%', label: 'Lab-tested purity' },
  ],
  image: '/images/about-big.webp',
  image2: '/images/about-small.webp',
};

export const stats = {
  label: 'INDEPENDENTLY VERIFIED · BATCH TESTED',
  items: [
    { value: 99.9, suffix: '%', caption: 'Lab-tested purity (Janoshik verified)' },
    { value: 56, suffix: ' DAYS', caption: 'Room-temperature stability hold' },
    { value: 26.3, suffix: 'K+', caption: 'R&D-tested research units' },
    { value: 48, suffix: '+', caption: 'Advanced formulations developed' },
  ],
};

export const sustainability = {
  index: '02',
  label: 'QUALITY ASSURANCE PROTOCOL',
  title: 'Trusted through',
  rotating: ['Testing', 'Purity', 'Stability', 'Traceability'],
  body:
    'Peptiq randomly selects a batch of pens from thousands to be sent to Janoshik — a globally recognised laboratory — for fully independent verification. Cold-chain handling, ISO-certified filling, and tamper-evident labelling protect every research unit from synthesis to dispatch.',
  cta: { label: 'View Janoshik report', href: '#innovation' },
  // The centre media that zooms from a small window to full-screen on scroll.
  video: '/images/video-new.mp4',
  poster: '/images/lab-new1.avif',
  image: '/images/lab-new1.avif',
};

export const products = {
  index: '03',
  label: 'RESEARCH PEPTIDES',
  title: 'Engineered for research precision.',
  subtitle:
    'Pre-filled research pens, independently tested by Janoshik. Supplied exclusively for controlled laboratory R&D. Not for human or veterinary consumption.',
  cta: { label: 'Browse all research peptides', href: '#contact' },
  items: [
    {
      slug: 'retatrutide-40mg',
      name: 'Retatrutide 40mg',
      price: 180,
      blurb: '2.4 mL pre-filled research pen',
      desc: '99.27% purity, batch AR1739JAT. 56-day room-temp stability.',
      image: '/images/products/retatrutide-40mg/front.jpg',
      gallery: [
        '/images/products/retatrutide-40mg/front.jpg',
        '/images/products/retatrutide-40mg/pen.jpg',
        '/images/products/retatrutide-40mg/open.jpg',
        '/images/products/retatrutide-40mg/uv.jpg',
      ],
      longDesc:
        'Triple agonist (GLP-1 / GIP / glucagon) pre-filled research pen, Janoshik-verified and cold-chain shipped. Research use only — not for human or veterinary consumption.',
      specs: [
        { label: 'Format', value: '2.4 mL pre-filled pen' },
        { label: 'Purity', value: '99.27%' },
        { label: 'Batch', value: 'AR1739JAT' },
        { label: 'Stability', value: '56-day room temp' },
      ],
    },
    {
      slug: 'retatrutide-20mg',
      name: 'Retatrutide 20mg',
      price: 100,
      blurb: '2.4 mL pre-filled research pen',
      desc: '99.21% purity, batch AR1721TRT. 20mg pre-filled research pen.',
      image: '/images/products/retatrutide-20mg/front.jpg',
      gallery: [
        '/images/products/retatrutide-20mg/front.jpg',
        '/images/products/retatrutide-20mg/pen.jpg',
        '/images/products/retatrutide-20mg/open.jpg',
        '/images/products/retatrutide-20mg/uv.jpg',
      ],
      longDesc:
        '20mg Retatrutide formulation supplied in a pre-filled research device for controlled laboratory R&D, Janoshik third-party verified with a per-batch COA. Research use only — not for human or veterinary consumption.',
      specs: [
        { label: 'Format', value: '2.4 mL pre-filled pen' },
        { label: 'Purity', value: '99.21%' },
        { label: 'Batch', value: 'AR1721TRT' },
        { label: 'Content', value: '22.96 mg verified' },
      ],
    },
    {
      slug: 'tirzepatide-40mg',
      name: 'Tirzepatide 40mg',
      price: 100,
      blurb: '3 mL pre-filled research pen',
      desc: '99.85% purity, batch TR786PAOS. Sealed for formulation studies.',
      image: '/images/products/tirzepatide-40mg/front.jpg',
      gallery: [
        '/images/products/tirzepatide-40mg/front.jpg',
        '/images/products/tirzepatide-40mg/pen.jpg',
        '/images/products/tirzepatide-40mg/open.jpg',
        '/images/products/tirzepatide-40mg/uv.jpg',
      ],
      longDesc:
        'Dual GIP / GLP-1 receptor agonist pre-filled pen for stability and formulation studies, Janoshik-assayed with a per-batch COA. Research use only — not for human or veterinary consumption.',
      specs: [
        { label: 'Format', value: '3 mL pre-filled pen' },
        { label: 'Purity', value: '99.85%' },
        { label: 'Batch', value: 'TR786PAOS' },
        { label: 'Use', value: 'Formulation studies' },
      ],
    },
    {
      slug: 'bpc-157-tb-500-40mg',
      name: 'BPC-157 & TB-500 40mg',
      price: 130,
      blurb: '20mg BPC-157 + 20mg TB-500',
      desc: '20mg BPC-157 + 20mg TB-500, batch BP1701FSR. Janoshik verified.',
      image: '/images/products/bpc-157-tb-500-40mg/front.jpg',
      gallery: [
        '/images/products/bpc-157-tb-500-40mg/front.jpg',
        '/images/products/bpc-157-tb-500-40mg/pen.jpg',
        '/images/products/bpc-157-tb-500-40mg/open.jpg',
        '/images/products/bpc-157-tb-500-40mg/uv.jpg',
      ],
      longDesc:
        'Combined pre-filled pen pairing 20mg BPC-157 with 20mg TB-500, Janoshik third-party verified and cold-chain shipped. Research use only — not for human or veterinary consumption.',
      specs: [
        { label: 'Format', value: '3 mL pre-filled pen' },
        { label: 'Content', value: '20mg + 20mg' },
        { label: 'Batch', value: 'BP1701FSR' },
        { label: 'Verified', value: 'Janoshik' },
      ],
    },
    {
      slug: 'glow-70mg',
      name: 'Glow 70mg',
      price: 100,
      blurb: '2 × pre-filled research pens',
      desc: '50mg GHK-Cu + 10mg BPC-157 + 10mg TB-500, batch GL0621XSA.',
      image: '/images/products/glow-70mg/front.jpg',
      gallery: [
        '/images/products/glow-70mg/front.jpg',
        '/images/products/glow-70mg/pen.jpg',
        '/images/products/glow-70mg/open.jpg',
        '/images/products/glow-70mg/uv.jpg',
      ],
      longDesc:
        'Two-pen stability kit — 50mg GHK-Cu with 10mg BPC-157 and 10mg TB-500 — shipped with full batch documentation. Research use only — not for human or veterinary consumption.',
      specs: [
        { label: 'Format', value: '2 × pre-filled pens' },
        { label: 'Content', value: '50/10/10 mg' },
        { label: 'Batch', value: 'GL0621XSA' },
        { label: 'Type', value: 'Stability kit' },
      ],
    },
    {
      slug: 'nad-1000mg',
      name: 'NAD+ 1,000mg',
      price: 140,
      blurb: '1,000mg for laboratory research',
      desc: '1,000mg NAD+, ISO 9001:2015 with full batch documentation.',
      image: '/images/products/nad-1000mg/front.jpg',
      gallery: [
        '/images/products/nad-1000mg/front.jpg',
        '/images/products/nad-1000mg/pen.jpg',
        '/images/products/nad-1000mg/open.jpg',
        '/images/products/nad-1000mg/uv.jpg',
      ],
      longDesc:
        'High-purity 1,000mg NAD+ manufactured to ISO 9001:2015 with full batch documentation and a published COA. Research use only — not for human or veterinary consumption.',
      specs: [
        { label: 'Content', value: '1,000mg NAD+' },
        { label: 'Standard', value: 'ISO 9001:2015' },
        { label: 'Docs', value: 'Full batch COA' },
        { label: 'Use', value: 'Laboratory R&D' },
      ],
    },
  ],
};

// Convenience: look up a product by slug (used by the detail route).
export type Product = (typeof products.items)[number];
export const getProduct = (slug: string): Product | undefined =>
  products.items.find((p) => p.slug === slug);

export const services = {
  index: '04',
  label: 'SERVICES',
  title: 'End-to-end fulfilment for R&D supply',
  body:
    'From in-house API synthesis to validated cold-chain delivery, Peptiq provides regulated, research-only peptide compounds with full traceability across Europe and the UK.',
  items: [
    {
      title: 'Independent Lab Testing',
      desc:
        'Every batch is independently verified by Janoshik Analytical. Random pens are pulled from production runs, sealed, and shipped for blind third-party analysis. Certificates of Analysis are published per batch — purity, concentration, and verified content.',
      image: '/images/independent-lab-test.webp',
    },
    {
      title: 'Cold-Chain Logistics',
      desc:
        'Validated cold-chain packaging keeps compounds stable and compliant during sensitive laboratory delivery. Tracked and signed-for via UPS, Royal Mail and DPD across the UK and EU. Pre-3pm UK orders ship the same working day.',
      image: '/images/cold-chain-seo.webp',
    },
    {
      title: 'Wholesale & Supply',
      desc:
        'Three tiered wholesale programmes — 50–100, 100–1,000, and 1,000+ pens — with volume pricing, scheduled delivery, and dedicated support. Consistent stock, clear pricing, full batch documentation for every shipment.',
      image: '/images/wholesale-seo.webp',
    },
  ],
};

export const innovation = {
  index: '05',
  label: 'WHY PEPTIQ',
  title: 'The standards that set Peptiq apart',
  body:
    'Not vials behind closed doors, but a transparent R&D operation built around in-house API manufacturing, independent verification, and proven long-term stability. Here is what separates Peptiq from ordinary peptide suppliers.',
  milestones: [
    {
      year: '01',
      title: 'In-House API Manufacturing',
      desc:
        'Core peptide APIs synthesised in-house under ISO 9001:2015 clean-room standards. Quality controlled at every step, with full batch validation and chain-of-custody logs.',
    },
    {
      year: '02',
      title: 'Janoshik Third-Party Verification',
      desc:
        'Peptiq randomly selects pens from production batches and ships them to Janoshik — a globally recognised laboratory — for fully independent purity and content analysis.',
    },
    {
      year: '03',
      title: '56-Day Room-Temperature Stability',
      desc:
        'A 40mg Retatrutide Peptiq pen held at room temperature for 56 days retained 98.32% purity and lost just 0.07% of verified content. Independently re-tested by Janoshik at each checkpoint.',
    },
    {
      year: '04',
      title: 'Validated Cold-Chain Delivery',
      desc:
        'Cold-chain packaging keeps every compound stable from dispatch to receipt. Tamper-evident labelling and secure procurement logs designed for R&D compliance.',
    },
    {
      year: '05',
      title: 'Direct, No Social Media',
      desc:
        'Peptiq operates exclusively through peptiq.bz and peptiq.store. We have no presence on TikTok, Instagram, WhatsApp, or Facebook — any seller claiming otherwise is unauthorised.',
    },
  ],
};

export const gallery = {
  label: 'INSIDE PEPTIQ LABS',
  title: 'Where precision meets process',
  intro:
    'Five controlled stages take every compound from synthesis to a sealed, traceable research unit — each one documented, independently verified and cold-chain protected.',
  items: [
    {
      tag: 'STAGE 01',
      title: 'API Synthesis',
      caption:
        'Compounds produced in-house under ISO 9001:2015 in a controlled clean-room environment.',
      image: '/images/api-seo.webp',
    },
    {
      tag: 'STAGE 02',
      title: 'Purification',
      caption:
        'Chromatographic purification and assay — every batch reaches 99%+ before it advances.',
      image: '/images/purification-seo.webp',
    },
    {
      tag: 'STAGE 03',
      title: 'Independent QC',
      caption:
        'Random pens are pulled and shipped blind to Janoshik Analytical for third-party verification.',
      image: '/images/independen-seo.webp',
    },
    {
      tag: 'STAGE 04',
      title: 'Sterile Filling',
      caption:
        'Tamper-evident, batch-coded filling of pre-filled research pens for fully traceable supply.',
      image: '/images/filling.webp',
    },
    {
      tag: 'STAGE 05',
      title: 'Cold-Chain Dispatch',
      caption:
        'Validated cold-chain packaging, tracked and signed-for across the UK and EU.',
      image: '/images/cold-chain-seo.webp',
    },
  ],
};

export const news = {
  index: '06',
  label: 'TESTIMONIALS',
  title: 'What our customers say',
  body:
    'Real reviews from researchers who order from Peptiq — on purity, packaging, delivery, and support. Every review is from a verified order.',
  // Aggregate trust signal shown beside the heading.
  rating: { score: '4.9', outOf: '5', count: '2,400+ verified reviews' },
  items: [
    {
      quote:
        'Ordered the Retatrutide 40mg pen on a Tuesday and it arrived next morning, fully cold-packed. I sent it for my own blind testing and it came back at 99.2% — exactly matching the COA in the box. Couldn’t ask for more.',
      name: 'Daniel K.',
      role: 'Verified buyer',
      org: 'United Kingdom',
      rating: 5,
      tag: 'Verified purchase',
      avatar: '/images/review1-seo.webp',
    },
    {
      quote:
        'I’ve tried four different suppliers and Peptiq is the only one whose purity actually held up when I tested it myself. Consistent from batch to batch — I don’t order from anyone else now.',
      name: 'Sophie R.',
      role: 'Repeat customer',
      org: 'Research lab · EU',
      rating: 5,
      tag: 'Repeat customer',
      avatar: '/images/review2-seo.webp',
    },
    {
      quote:
        'Support replied within the hour and sorted a reship with zero hassle when my courier messed up. Tamper-evident packaging, tracking worked the whole way across the EU. Genuinely the smoothest order experience I’ve had.',
      name: 'Marcus T.',
      role: 'Verified buyer',
      org: 'Germany',
      rating: 5,
      tag: 'Verified purchase',
      avatar: '/images/review3-seo.webp',
    },
    {
      quote:
        'The 56-day room-temperature stability is real — I re-tested mine at day 40 and it was still within spec. Fair pricing for this level of quality and documentation. Already reordered the BPC-157 & TB-500.',
      name: 'Priya N.',
      role: 'Research customer',
      org: 'United Kingdom',
      rating: 5,
      tag: 'Verified purchase',
      avatar: '/images/review4-seo.webp',
    },
  ],
};

export const contact = {
  index: '07',
  label: 'CONTACT US',
  title: 'Talk to our research team',
  body:
    'Tell us about your laboratory programme — products, volumes, and timelines. Our team responds within one working day. Pre-3pm UK orders dispatch the same day.',
  fields: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'organisation', label: 'Laboratory / Organisation', type: 'text', required: true },
    { name: 'phone', label: 'Mobile Phone Number', type: 'tel', required: false },
  ],
  message: { name: 'message', label: 'How can we help with your R&D programme?' },
  submit: 'Send enquiry',
};

export const resources = {
  title: 'Useful research documents to download',
  body:
    'Janoshik certificates of analysis, stability reports, and supply documentation. A space designed to give your laboratory everything it needs.',
  items: [
    { title: 'Janoshik Analytical Report — Retatrutide 40mg', meta: 'PDF · 1.4 MB', href: '#' },
    { title: 'Room-Temperature Stability Study (56-Day)', meta: 'PDF · 2.1 MB', href: '#' },
    { title: 'Batch Documentation & COA Archive', meta: 'ZIP · 8 MB', href: '#' },
  ],
};

export const footer = {
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/#story' },
        { label: 'Why Peptiq', href: '/#innovation' },
        { label: 'Quality protocol', href: '/#sustainability' },
        { label: 'Services', href: '/#services' },
        { label: 'Testimonials', href: '/#news' },
      ],
    },
    {
      title: 'Research peptides',
      links: [
        { label: 'Retatrutide 40mg', href: '/products/retatrutide-40mg' },
        { label: 'Tirzepatide 40mg', href: '/products/tirzepatide-40mg' },
        { label: 'BPC-157 & TB-500 40mg', href: '/products/bpc-157-tb-500-40mg' },
        { label: 'Glow 70mg', href: '/products/glow-70mg' },
        { label: 'NAD+ 1,000mg', href: '/products/nad-1000mg' },
        { label: 'Browse all', href: '/#products' },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'Sign in', href: '/login' },
        { label: 'Create account', href: '/register' },
        { label: 'Cart', href: '/cart' },
        { label: 'Track order', href: '/track-order' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/#contact' },
        { label: 'Shipping & delivery', href: '/#services' },
        { label: 'Verify a batch', href: '/#innovation' },
        { label: 'For laboratories', href: '/#services' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/policies/privacy-policy' },
    { label: 'Refund Policy', href: '/policies/refund-policy' },
    { label: 'Shipping Policy', href: '/policies/shipping-policy' },
    { label: 'Terms of Service', href: '/policies/terms-of-service' },
  ],
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LEGAL / POLICY PAGES
 * ─────────────────────────────────────────────────────────────────────────────
 *  Plain-language boilerplate tailored to a research-use-only peptide supplier.
 *  Review with qualified legal counsel before relying on this in production.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export type PolicySection = { heading: string; body: string[] };
export type Policy = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: PolicySection[];
};

export const policies: { items: Policy[] } = {
  items: [
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      summary:
        'How Peptiq collects, uses, stores and protects the personal data of researchers and account holders.',
      updated: '2 July 2026',
      sections: [
        {
          heading: 'Data we collect',
          body: [
            'We collect the details you provide when you create an account or place an order — including your name, email address, date of birth, nationality, country of residence, delivery address and order history.',
            'We also collect limited technical data (such as device and browser information) needed to operate the site securely. Your cart and session are stored locally in your browser.',
          ],
        },
        {
          heading: 'How we use your data',
          body: [
            'Your data is used solely to fulfil orders, verify eligibility for research-use-only supply, provide customer support, and meet our legal and record-keeping obligations across the UK and EU.',
            'We do not sell your personal data. We share it only with the processors required to deliver your order — for example payment providers and shipping carriers.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'You may request access to, correction of, or deletion of your personal data at any time. To exercise any of these rights, contact us at research@peptiq.org.',
          ],
        },
      ],
    },
    {
      slug: 'refund-policy',
      title: 'Refund Policy',
      summary:
        'The conditions under which returns, replacements and refunds are offered on Peptiq research compounds.',
      updated: '2 July 2026',
      sections: [
        {
          heading: 'Damaged or incorrect items',
          body: [
            'If your order arrives damaged, incomplete, or is not what you ordered, contact us within 7 days of delivery at research@peptiq.org with your order number and photographs. We will arrange a replacement or full refund.',
          ],
        },
        {
          heading: 'Cold-chain integrity',
          body: [
            'Because our compounds are supplied for controlled laboratory research and ship under validated cold-chain conditions, opened or temperature-compromised items cannot be returned once the seal is broken, except where a fault is confirmed.',
          ],
        },
        {
          heading: 'How refunds are issued',
          body: [
            'Approved refunds are returned to the original payment method within 5–10 business days of confirmation.',
          ],
        },
      ],
    },
    {
      slug: 'shipping-policy',
      title: 'Shipping Policy',
      summary:
        'Dispatch times, cold-chain handling, tracking and delivery coverage for UK and EU research orders.',
      updated: '2 July 2026',
      sections: [
        {
          heading: 'Dispatch & handling',
          body: [
            'Orders are processed within 1–2 business days. Every order is packed under validated cold-chain conditions and sealed with tamper-evident, traceable packaging.',
          ],
        },
        {
          heading: 'Delivery coverage & tracking',
          body: [
            'We ship tracked across the United Kingdom and the European Union. A tracking reference is issued by email once your order is dispatched, and can be followed from the Track Order page.',
          ],
        },
        {
          heading: 'Customs & research-use declaration',
          body: [
            'All shipments are declared for laboratory research and development use only. The buyer is responsible for ensuring receipt complies with the regulations of their destination country.',
          ],
        },
      ],
    },
    {
      slug: 'terms-of-service',
      title: 'Terms of Service',
      summary:
        'The terms governing use of the Peptiq website and the purchase of research-use-only compounds.',
      updated: '2 July 2026',
      sections: [
        {
          heading: 'Research use only',
          body: [
            'All products supplied by Peptiq are intended strictly for laboratory research and development. They are not for human or veterinary consumption, and must not be administered to humans or animals.',
            'By placing an order you confirm that you are a qualified researcher or organisation and that the products will be handled in accordance with applicable laws and safety standards.',
          ],
        },
        {
          heading: 'Eligibility',
          body: [
            'You must be of legal age in your jurisdiction and provide accurate account information. We reserve the right to refuse or cancel any order that does not meet our research-use eligibility criteria.',
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'Peptiq is not liable for any misuse of its products or for outcomes arising from handling that falls outside documented laboratory research practice. Nothing in these terms limits liability that cannot be excluded by law.',
          ],
        },
      ],
    },
  ],
};

export const getPolicy = (slug: string): Policy | undefined =>
  policies.items.find((p) => p.slug === slug);
