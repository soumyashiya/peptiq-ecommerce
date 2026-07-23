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
  address: 'United Kingdom · Research operations',
};

/**
 * Compliance copy. These strings are used verbatim across the product,
 * cart, checkout and order pages. Do not soften them — they exist to
 * position every product as strictly research-use-only and to avoid any
 * medical, therapeutic, transformation, or personal-use implication.
 */
export const compliance = {
  productDisclaimer:
    'FOR RESEARCH PURPOSES ONLY. Not intended for human or veterinary use. Not intended to diagnose, treat, cure, or prevent any disease. Products are supplied strictly for laboratory and analytical research conducted by qualified professionals.',
  productDisclaimerShort:
    'For research purposes only. Not intended for human or veterinary use.',
  checkoutAcknowledgement:
    'By proceeding with this purchase, you acknowledge that these products are intended solely for laboratory research purposes and are not intended for human or veterinary use.',
  checkoutMedical:
    'These products are not intended to diagnose, treat, cure, or prevent any disease.',
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
  overline: 'Our story — Built for research supply',
  title:
    'Effortlessly advance research with research-grade peptides, validated by independent laboratories.',
  body: [
    'Peptiq develops research compounds for laboratory use only. Our science-backed peptides and formulations are produced in-house and supplied in sealed, traceable formats for controlled R&D programmes.',
    'We eliminate uncertainty with batch-tested compounds, ISO-certified clean-room manufacturing, and fully documented per-batch records. Every Peptiq research pen is independently verified by Janoshik Analytical.',
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
    'Peptiq randomly selects research pens from every batch and sends them to Janoshik — a globally recognised laboratory — for fully independent verification. ISO-certified filling, tamper-evident labelling, and full chain-of-custody records protect every research unit from synthesis onward.',
  cta: { label: 'View Janoshik report', href: '#innovation' },
  // The centre media that zooms from a small window to full-screen on scroll.
  video: '/images/video-new.mp4',
  poster: '/images/lab-new1.avif',
  image: '/images/lab-new1.avif',
};

export type ProductCompound = {
  name: string;
  concentration: string;
  content: string;
};

export type ProductJanoshik = {
  fillVolume: string;
  batchNumber: string;
  purity?: string;
  compounds: ProductCompound[];
};

export type ProductDetails = {
  contents: string[];
  storage: string[];
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  blurb: string;
  desc: string;
  image: string;
  gallery: string[];
  longDesc: string;
  specs: { label: string; value: string }[];
  labTestUrl?: string;
  janoshik?: ProductJanoshik;
  certificate?: string[];
  details?: ProductDetails;
};

export const products: {
  index: string;
  label: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  items: Product[];
} = {
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
        'A 40mg Retatrutide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Supplied in sealed format to support compound stability analysis, formulation studies, and device-mechanism evaluation.',
      specs: [
        { label: 'Format', value: '2.4 mL pre-filled pen' },
        { label: 'Purity', value: '99.269%' },
        { label: 'Batch', value: 'AR1739JAT' },
        { label: 'Content', value: '43.72 mg verified' },
      ],
      labTestUrl:
        'https://verify.janoshik.com/tests/163216-ALLUVI_RETATRUTIDE_40MG_KIT_TU3SQLQB9ZDQ',
      janoshik: {
        fillVolume: '2.4 mL',
        batchNumber: 'AR1739JAT',
        purity: '99.269%',
        compounds: [
          { name: 'Retatrutide', concentration: '18.22 mg/mL', content: '43.72 mg' },
        ],
      },
      certificate: [
        '/images/products/retatrutide-40mg/janoshik/page1.jpg',
        '/images/products/retatrutide-40mg/janoshik/page2.jpg',
      ],
      details: {
        contents: [
          'Each Retatrutide 40mg Research kit includes:',
          'Pre-filled Research pen (40mg Retatrutide)',
          'Research information sheet',
        ],
        storage: [
          'Store refrigerated (2–8°C). Do not freeze.',
          'Supplied in fixed-volume sealed format for laboratory analysis.',
        ],
      },
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
        'A 20mg Retatrutide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Supplied in sealed format to support compound stability analysis, formulation studies, and device-mechanism evaluation.',
      specs: [
        { label: 'Format', value: '2.4 mL pre-filled pen' },
        { label: 'Purity', value: '99.21%' },
        { label: 'Batch', value: 'AR1721TRT' },
        { label: 'Content', value: '22.96 mg verified' },
      ],
      labTestUrl:
        'https://verify.janoshik.com/tests/163215-ALLUVI_RETATRUTIDE_20MG_KIT_GBHEFN58JXXZ',
      janoshik: {
        fillVolume: '2.4 mL',
        batchNumber: 'AR1721TRT',
        purity: '99.21%',
        compounds: [
          { name: 'Retatrutide', concentration: '9.57 mg/mL', content: '22.96 mg' },
        ],
      },
      certificate: [
        '/images/products/retatrutide-20mg/janoshik/page1.jpg',
        '/images/products/retatrutide-20mg/janoshik/page2.jpg',
      ],
      details: {
        contents: [
          'Each Retatrutide 20mg Research kit includes:',
          'Pre-filled Research pen (20mg Retatrutide)',
          'Research information sheet',
        ],
        storage: [
          'Store refrigerated (2–8°C). Do not freeze.',
          'Supplied in fixed-volume sealed format for laboratory analysis.',
        ],
      },
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
        'A 40mg Tirzepatide formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Supplied in sealed format to support compound stability analysis, formulation studies, and device-mechanism evaluation.',
      specs: [
        { label: 'Format', value: '3 mL pre-filled pen' },
        { label: 'Purity', value: '99.85%' },
        { label: 'Batch', value: 'TR786PAOS' },
        { label: 'Content', value: '40.05 mg verified' },
      ],
      labTestUrl:
        'https://verify.janoshik.com/tests/147174-ALLUVI_TIRZEPATIDE_40MG_KIT_T5MBWRAYD4HN',
      janoshik: {
        fillVolume: '3 mL',
        batchNumber: 'TR786PAOS',
        purity: '99.85%',
        compounds: [
          { name: 'Tirzepatide', concentration: '13.35 mg/mL', content: '40.05 mg' },
        ],
      },
      certificate: [
        '/images/products/tirzepatide-40mg/janoshik/page1.jpg',
        '/images/products/tirzepatide-40mg/janoshik/page2.jpg',
        '/images/products/tirzepatide-40mg/janoshik/page3.jpg',
      ],
      details: {
        contents: [
          'Each Tirzepatide 40mg Research kit includes:',
          'Pre-filled Research pen (40mg Tirzepatide)',
          'Research information sheet',
        ],
        storage: [
          'Store refrigerated (2–8°C). Do not freeze.',
          'Supplied in fixed-volume sealed format for laboratory analysis.',
        ],
      },
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
        'A 40mg BPC-157 & TB-500 formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Supplied in sealed format to support compound stability analysis, formulation studies, and device-mechanism evaluation.',
      specs: [
        { label: 'Format', value: '3 mL pre-filled pen' },
        { label: 'Content', value: '21.99 + 19.59 mg' },
        { label: 'Batch', value: 'BP1701FSR' },
        { label: 'Verified', value: 'Janoshik' },
      ],
      labTestUrl:
        'https://verify.janoshik.com/tests/163218-ALLUVI_BPC157_TB500_40MG_KIT_EAI125ZEF8TB',
      janoshik: {
        fillVolume: '3 mL',
        batchNumber: 'BP1701FSR',
        compounds: [
          { name: 'BPC-157', concentration: '7.33 mg/mL', content: '21.99 mg' },
          { name: 'TB-500', concentration: '6.53 mg/mL', content: '19.59 mg' },
        ],
      },
      certificate: [
        '/images/products/bpc-157-tb-500-40mg/janoshik/page1.jpg',
        '/images/products/bpc-157-tb-500-40mg/janoshik/page2.jpg',
      ],
      details: {
        contents: [
          'Each BPC-157 & TB-500 40mg Research kit includes:',
          'Pre-filled Research pen (20mg BPC-157, 20mg TB-500)',
          'Research information sheet',
        ],
        storage: [
          'Store refrigerated (2–8°C). Do not freeze.',
          'Supplied in fixed-volume sealed format for laboratory analysis.',
        ],
      },
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
        'A 70mg Glow formulation supplied in a pre-filled research device, provided exclusively for controlled laboratory R&D applications. Supplied in sealed format to support compound stability analysis, formulation studies, and device-mechanism evaluation.',
      specs: [
        { label: 'Format', value: '2 × pre-filled pens' },
        { label: 'Content', value: '25.8 / 8.13 / 6.76 mg' },
        { label: 'Batch', value: 'GL0621XSA' },
        { label: 'Verified', value: 'Janoshik' },
      ],
      labTestUrl:
        'https://verify.janoshik.com/tests/163217-ALLUVI_GLOW_70MG_KIT_DCL3AJSE4JQP',
      janoshik: {
        fillVolume: '3.4 mL',
        batchNumber: 'GL0621XSA',
        compounds: [
          { name: 'GHK-Cu', concentration: '7.59 mg/mL', content: '25.8 mg' },
          { name: 'BPC-157', concentration: '2.39 mg/mL', content: '8.13 mg' },
          { name: 'TB-500', concentration: '1.99 mg/mL', content: '6.76 mg' },
        ],
      },
      certificate: [
        '/images/products/glow-70mg/janoshik/page1.jpg',
        '/images/products/glow-70mg/janoshik/page2.jpg',
      ],
      details: {
        contents: [
          'Each Glow 70mg Research kit includes:',
          '2 × Pre-filled Research pens (each pen contains 5mg BPC-157, 5mg TB-500, 25mg GHK-Cu)',
          'Total contents: 10mg BPC-157, 10mg TB-500, 50mg GHK-Cu',
        ],
        storage: [
          'Store refrigerated (2–8°C). Do not freeze.',
          'Supplied in fixed-volume sealed format for laboratory analysis.',
        ],
      },
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
        'NAD+ (Nicotinamide Adenine Dinucleotide) research formulation for laboratory analysis and in vitro studies only. Provided exclusively for controlled laboratory R&D applications.',
      specs: [
        { label: 'Content', value: '1,000mg NAD+' },
        { label: 'Standard', value: 'ISO 9001:2015' },
        { label: 'Docs', value: 'Full batch COA' },
        { label: 'Use', value: 'Laboratory R&D' },
      ],
      details: {
        contents: [
          'Each NAD+ 1,000mg kit includes:',
          '2 × Pre-filled NAD+ pens (500mg each)',
          'Research information sheet',
        ],
        storage: ['Store refrigerated (2–8°C). Do not freeze.'],
      },
    },
  ],
};

// Convenience: look up a product by slug (used by the detail route).
export const getProduct = (slug: string): Product | undefined =>
  products.items.find((p) => p.slug === slug);

export const services = {
  index: '04',
  label: 'SERVICES',
  title: 'End-to-end infrastructure for R&D supply',
  body:
    'From in-house API synthesis to independent third-party verification, Peptiq provides research-only peptide compounds with full traceability, published documentation, and dedicated research-programme support.',
  items: [
    {
      title: 'Independent Lab Testing',
      desc:
        'Every batch is independently verified by Janoshik Analytical. Random pens are pulled from production runs, sealed, and submitted for blind third-party analysis. Certificates of Analysis are published per batch — purity, concentration, and verified content.',
      image: '/images/independent-lab-test.webp',
    },
    {
      title: 'Batch Documentation',
      desc:
        'Every research unit is issued with a full per-batch record: Janoshik certificate of analysis, purity assay, verified compound content, chain-of-custody log, and tamper-evident batch coding — archived and available on request for every research programme.',
      image: '/images/cold-chain-seo.webp',
    },
    {
      title: 'Wholesale & Supply',
      desc:
        'Three tiered wholesale programmes — 50–100, 100–1,000, and 1,000+ research pens — with volume pricing, scheduled fulfilment, and dedicated support. Consistent stock, clear pricing, and full batch documentation for every research programme.',
      image: '/images/wholesale-seo.webp',
    },
  ],
};

export const innovation = {
  index: '05',
  label: 'WHY PEPTIQ',
  title: 'The standards that set Peptiq apart',
  body:
    'Not opaque supply behind closed doors, but a transparent R&D operation built around in-house API manufacturing, independent verification, and proven long-term stability. Here is what separates Peptiq from ordinary peptide suppliers.',
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
        'Peptiq randomly selects research pens from production batches and submits them to Janoshik — a globally recognised laboratory — for fully independent purity and content analysis.',
    },
    {
      year: '03',
      title: '56-Day Room-Temperature Stability',
      desc:
        'A 40mg Retatrutide Peptiq research pen held at room temperature for 56 days retained 98.32% purity and lost just 0.07% of verified content. Independently re-tested by Janoshik at each checkpoint.',
    },
    {
      year: '04',
      title: 'Full Batch Documentation',
      desc:
        'Every research unit carries a per-batch Janoshik certificate of analysis, purity assay, verified compound content, and tamper-evident batch coding — archived and traceable for every research programme.',
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
    'Five controlled stages take every compound from synthesis to a sealed, traceable research unit — each one documented, independently verified, and archived per batch.',
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
        'Random research pens are pulled and submitted blind to Janoshik Analytical for third-party verification.',
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
      title: 'Batch Archival',
      caption:
        'Every unit is sealed, labelled with a batch code, and archived alongside its Janoshik certificate of analysis.',
      image: '/images/cold-chain-seo.webp',
    },
  ],
};

export const news = {
  index: '06',
  label: 'TESTIMONIALS',
  title: 'What our customers say',
  body:
    'Verified reviews from research customers — focused on packaging quality, batch documentation, presentation, order accuracy, and support responsiveness. Every review is from a confirmed order.',
  // Aggregate trust signal shown beside the heading.
  rating: { score: '4.9', outOf: '5', count: '2,400+ verified reviews' },
  items: [
    {
      quote:
        'Presentation was faultless — sealed research pen with the Janoshik COA inside the box, batch numbers matched, tamper-evident seal intact. Exactly what a research kit should be.',
      name: 'Daniel K.',
      role: 'Verified buyer',
      org: 'United Kingdom',
      rating: 5,
      tag: 'Verified purchase',
      avatar: '/images/review1-seo.webp',
    },
    {
      quote:
        'Consistent presentation from batch to batch — tamper-evident seal, matching COA, and traceable batch numbers. Documentation quality is what keeps me ordering from Peptiq for the lab.',
      name: 'Sophie R.',
      role: 'Repeat customer',
      org: 'Research lab',
      rating: 5,
      tag: 'Repeat customer',
      avatar: '/images/review2-seo.webp',
    },
    {
      quote:
        'Support replied within the hour and resolved my order query with zero hassle. Clear paperwork, tamper-evident packaging, and batch documentation exactly matched the COA reference.',
      name: 'Marcus T.',
      role: 'Verified buyer',
      org: 'Research customer',
      rating: 5,
      tag: 'Verified purchase',
      avatar: '/images/review3-seo.webp',
    },
    {
      quote:
        'Presentation and documentation are excellent. Full batch COA, clear per-compound content, and fair pricing for this level of paperwork. Already reordered the BPC-157 & TB-500 for the archive.',
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
    'Tell us about your laboratory programme — research compounds, volumes, and documentation requirements. Our team responds to enquiries within one working day.',
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
        { label: 'Verify a batch', href: '/#innovation' },
        { label: 'For laboratories', href: '/#services' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/policies/privacy-policy' },
    { label: 'Refund Policy', href: '/policies/refund-policy' },
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
            'We collect the details you provide when you create an account or place an order — including your name, email address, date of birth, nationality, country of residence, contact address, and order history.',
            'We also collect limited technical data (such as device and browser information) needed to operate the site securely. Your cart and session are stored locally in your browser.',
          ],
        },
        {
          heading: 'How we use your data',
          body: [
            'Your data is used solely to fulfil orders, verify eligibility for research-use-only supply, provide customer support, and meet our legal and record-keeping obligations.',
            'We do not sell your personal data. We share it only with the processors strictly required to fulfil your order — for example payment providers.',
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
            'If your order arrives damaged, incomplete, or is not what you ordered, contact us within 7 days of receipt at research@peptiq.org with your order number and photographs. We will arrange a replacement or full refund.',
          ],
        },
        {
          heading: 'Seal integrity',
          body: [
            'Because our compounds are supplied for controlled laboratory research, opened or seal-broken research units cannot be returned, except where a fault is confirmed on unopened stock.',
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
