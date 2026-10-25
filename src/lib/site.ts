import { portfolioData } from "@/data/portfolio";

// Public URL of the site. Set NEXT_PUBLIC_SITE_URL once a custom domain exists;
// on Vercel the production domain is picked up automatically.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

const { personalInfo, education, experience } = portfolioData;

export const seo = {
  title: "Ayesha Siddiqa | Full-Stack Developer (React, Next.js, Vue.js)",
  shortTitle: "Ayesha Siddiqa",
  description:
    "Ayesha Siddiqa is a Full-Stack Developer with 4+ years of experience and a front-end focus: React.js, Next.js, Vue.js and TypeScript, plus Node.js, Laravel and WordPress. 300+ websites delivered. Based in Pakistan and open to remote roles worldwide, or onsite in the USA, UAE and Pakistan.",
  keywords: [
    "Ayesha Siddiqa",
    "Ayesha Siddiqa developer",
    "Ayesha Siddiqa portfolio",
    "Full-Stack Developer",
    "Front-End Developer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "Vue.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Laravel Developer",
    "MERN Stack Developer",
    "WordPress Developer",
    "WooCommerce Developer",
    "Remote Full-Stack Developer",
    "Remote React Developer",
    "Hire Remote Frontend Developer",
    "Freelance Web Developer",
    "React Developer USA",
    "Frontend Developer UAE",
    "Frontend Developer Dubai",
    "Web Developer Saudi Arabia",
    "Frontend Developer UK",
    "Frontend Developer Europe",
    "Frontend Developer Canada",
    "Full-Stack Developer Pakistan",
    "Web Developer Lahore",
    "Software Engineer Portfolio",
  ],
};

// Regions highlighted for hiring; remote work covers everywhere else
const hiringRegions = ["United States", "United Arab Emirates", "Pakistan", "United Kingdom", "Canada", "Saudi Arabia"];

// schema.org data so search engines understand who the site is about
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: personalInfo.name,
        url: siteUrl,
        image: `${siteUrl}/opengraph-image.png`,
        jobTitle: personalInfo.role,
        description: seo.description,
        email: `mailto:${personalInfo.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
        worksFor: { "@type": "Organization", name: experience[0].company },
        alumniOf: { "@type": "CollegeOrUniversity", name: education[0].institution },
        knowsAbout: [
          "React.js", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "Express.js",
          "Laravel", "PHP", "MongoDB", "MySQL", "PostgreSQL", "WordPress", "WooCommerce", "REST APIs", "SEO",
        ],
        sameAs: [personalInfo.linkedIn, personalInfo.gitHub],
        knowsLanguage: ["English", "Urdu"],
        nationality: { "@type": "Country", name: "Pakistan" },
        hasOccupation: {
          "@type": "Occupation",
          name: "Full-Stack Developer",
          occupationalCategory: "15-1254.00 Web Developers",
          skills: "React.js, Next.js, Vue.js, TypeScript, Node.js, Laravel, MongoDB, MySQL, PostgreSQL, WordPress",
          occupationLocation: hiringRegions.map((name) => ({ "@type": "Country", name })),
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: education[0].degree,
          recognizedBy: { "@type": "CollegeOrUniversity", name: education[0].institution },
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: `Projects by ${personalInfo.name}`,
        itemListElement: portfolioData.featuredProjects.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: project.name,
            description: project.description,
            url: project.url,
            image: `${siteUrl}${project.image}`,
            creator: { "@id": `${siteUrl}/#person` },
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${personalInfo.name} · Portfolio`,
        inLanguage: "en",
        description: seo.description,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: seo.title,
        mainEntity: { "@id": `${siteUrl}/#person` },
        hasPart: { "@id": `${siteUrl}/#projects` },
      },
    ],
  };
}
