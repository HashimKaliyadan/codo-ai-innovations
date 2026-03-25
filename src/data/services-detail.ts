export interface ServiceDetail {
  slug: string;
  title: string;
  definition: string;
  category: string;
  image: string;
  approach: string;
  process: {
    step: string;
    title: string;
    desc: string;
  }[];
  features: {
    title: string;
    desc: string;
  }[];
}

export const servicesDetailData: Record<string, ServiceDetail> = {
  "software-development": {
    slug: "software-development",
    category: "Engineering",
    title: "Software Development",
    definition: "Software development is the technical process of designing, coding, testing, and maintaining bespoke applications or platforms. Unlike off-the-shelf software, custom development provides a unique solution tailored to your business's specific workflows, ensuring maximum efficiency and scalability.",
    image: "/images/services/service_software_dev.png",
    approach: "At CODO, our approach to software engineering is rooted in 'Architecture-First' methodology. We don't just write code; we build robust, future-proof systems. We begin by mapping your entire business logic, ensuring that the technology stack we choose—be it Python, Go, or Node.js—is optimized for your long-term growth.",
    process: [
      { step: "01", title: "Logic Mapping", desc: "We deep-dive into your manual workflows to identify automation opportunities." },
      { step: "02", title: "System Architecture", desc: "Designing the database schemas and API structures for high-load performance." },
      { step: "03", title: "Agile Sprints", desc: "Building in 2-week cycles with live demo environments for continuous feedback." },
      { step: "04", title: "Security & QA", desc: "Rigorous automated testing and penetration testing to ensure data integrity." },
    ],
    features: [
      { title: "SaaS Platforms", desc: "Scalable multi-tenant architectures for modern software businesses." },
      { title: "Legacy Migration", desc: "Modernizing outdated systems without interrupting your current operations." },
      { title: "API Orchestration", desc: "Connecting fragmented tools into one unified, powerful ecosystem." },
    ],
  },
  "website-development": {
    slug: "website-development",
    category: "Web",
    title: "Website Development",
    definition: "Website development involves the creation of high-performance digital storefronts and web-based applications. In the modern era, a website is more than just an information portal; it is a conversion engine that must be fast, responsive, and accessible on every device.",
    image: "/images/services/service_web_dev.png",
    approach: "CODO specializes in 'Headless' and 'Server-Side Rendering' (SSR) technologies. We treat web development as a performance sport. By using Next.js and React, we ensure your site loads in under 1 second, providing a premium user experience that significantly lowers bounce rates and increases search engine rankings.",
    process: [
      { step: "01", title: "UX Discovery", desc: "Mapping user journeys to ensure the path to conversion is friction-less." },
      { step: "02", title: "Visual Design", desc: "High-fidelity UI design in Figma that aligns with your brand's premium identity." },
      { step: "03", title: "Frontend Engineering", desc: "Writing clean, semantic code with smooth micro-animations for a high-end feel." },
      { step: "04", title: "Performance Tuning", desc: "Optimizing images, scripts, and server-side logic for 100/100 Lighthouse scores." },
    ],
    features: [
      { title: "E-commerce", desc: "Complex digital stores with custom checkouts and inventory management." },
      { title: "Corporate Portals", desc: "Secure, high-end websites for global enterprises and agencies." },
      { title: "Web Apps", desc: "Interactive tools and dashboards built directly into the web experience." },
    ],
  },
  "ios-android-development": {
    slug: "ios-android-development",
    category: "Mobile",
    title: "IOS & Android Development",
    definition: "Mobile application development is the creation of software specifically designed to run on smartphones and tablets. Whether native or cross-platform, a mobile app provides a direct, personalized channel to your users, leveraging hardware like cameras, GPS, and push notifications.",
    image: "/images/services/service_mobile_apps.png",
    approach: "We utilize 'Native-Performance' cross-platform frameworks like React Native and Expo. This allows us to deliver high-quality apps for both iOS and Android from a single codebase without sacrificing the 'native' feel. Our focus is on offline-first architecture and buttery-smooth 60fps animations.",
    process: [
      { step: "01", title: "Mobile Strategy", desc: "Determining the core features that drive value on a mobile interface." },
      { step: "02", title: "Interface Prototyping", desc: "Designing touch-friendly layouts optimized for one-handed use." },
      { step: "03", title: "Development", desc: "Building core functionality with real-time sync and local data storage." },
      { step: "04", title: "Store Launch", desc: "Navigating the complexities of Apple App Store and Google Play deployment." },
    ],
    features: [
      { title: "Cross-Platform", desc: "One codebase for both iOS and Android, reducing maintenance costs." },
      { title: "Offline Support", desc: "Ensuring your app remains functional even in areas with poor connectivity." },
      { title: "Push Engagement", desc: "Smart notification strategies to keep your users returning to the app." },
    ],
  },
  "logo-branding": {
    slug: "logo-branding",
    category: "Design",
    title: "Logo Branding",
    definition: "Logo branding is the art of creating a visual identity that encapsulates your brand's mission, values, and personality. It goes beyond a simple mark; it is a comprehensive system of color, typography, and imagery that builds trust and recognition in the marketplace.",
    image: "/images/services/service_web_dev.png",
    approach: "At CODO, branding is a collaborative evolution. We don't just provide options; we provide a rationale. We study your competition and your target audience's psychology to create a brand that doesn't just look good, but feels right. Our designs are built for the digital-first era.",
    process: [
      { step: "01", title: "Brand Audit", desc: "Understanding your current position and where you want to go." },
      { step: "02", title: "Identity Design", desc: "Developing logos, color palettes, and typography that tell a story." },
      { step: "03", title: "Brand Systems", desc: "Creating guidelines for how your brand appears on web, social, and print." },
      { step: "04", title: "Asset Delivery", desc: "Providing a full kit of high-res assets for every possible use case." },
    ],
    features: [
      { title: "Logo Systems", desc: "Flexible logos that work everywhere from favicons to billboards." },
      { title: "Visual Language", desc: "A cohesive set of patterns, icons, and illustrations unique to you." },
      { title: "Brand Guidelines", desc: "An 'Operating Manual' for your brand's visual identity." },
    ],
  },
  "performance-marketing": {
    slug: "performance-marketing",
    category: "Growth",
    title: "Performance Marketing",
    definition: "Performance marketing is a data-driven approach to advertising where you only pay for results. By using advanced tracking and analytics, businesses can scale their marketing spend with predictable ROI, targeting specific user segments with high precision.",
    image: "/images/services/service_software_dev.png",
    approach: "We bridge the gap between engineering and marketing. By integrating tracking pixels and CRM data directly into your apps, we provide a closed-loop view of your marketing performance. We focus on 'Level One' metrics like Customer Acquisition Cost (CAC) and Lifetime Value (LTV) rather than vanity metrics like 'likes'.",
    process: [
      { step: "01", title: "Data Setup", desc: "Implementing absolute tracking to see exactly where your leads come from." },
      { step: "02", title: "Campaign Launch", desc: "Deploying high-intent ads on Google, Meta, and LinkedIn." },
      { step: "03", title: "A/B Testing", desc: "Continuously testing copy and creatives to lower your cost-per-click." },
      { step: "04", title: "Scaling", desc: "Aggressively increasing spend on winning campaigns to drive growth." },
    ],
    features: [
      { title: "Paid Search", desc: "Capturing high-intent traffic from users searching for your solution." },
      { title: "Paid Social", desc: "Building brand awareness and driving leads on social platforms." },
      { title: "Retargeting", desc: "Bringing back users who previously visited your site without converting." },
    ],
  },
};
