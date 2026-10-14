import type {Metadata} from "next";
import {HomePageClient} from "@/components/portfolio/home-page-client";
import {getBlogPosts, getGithubOverview, getGithubRepos, getHackatimeStats,} from "@/lib/server/portfolio-data";
import {donationUrl, fajriDevUrl, githubUrl, hackatimeUrl,  linkedinUrl, linkHubUrl, ogImageUrl, siteUrl, sponsorUrl, xUrl,} from "@/lib/site-config";

export const metadata: Metadata = {
    title: {
        absolute: "Fajri Ramadhan"
    },
    description: "Fajri Ramadhan portfolio: Devloper Junior, Full stack devloper.",
    alternates: {
        canonical: "/"
    },
    keywords: [
        "Fajri Ramadhan Portfolio",
        "Full stack devloper",
        "Startup Enggineer",
        "Software Service"
    ],
    openGraph: {
        title: "Fajri Ramadhan | Devloper Junior, Full stack devloper, Startup Enggineer",
        description: "Devloper Junior and Full stack devloper",
        url: siteUrl,
        type: "website",
        images: [
            {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: "Fajri Ramadhan Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Fajri Ramadhan",
        description: "Devloper Junior and Full stack devloper",
        images: [ogImageUrl],
    },
};

function serializeJsonLd (value: unknown): string{
    return JSON.stringify(value).replace(/</g, "\\u003c");
}

async function safeFetch<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
    try {
        return await fn();
    }catch {
        return fallback;
    }
}

export default async function HomePage() {
    const [initialRepos, initialPosts, initialHackatime, initialGitHubOverview] = 
    await Promise.all ([
        safeFetch([], () => getGithubRepos()),
        safeFetch([], () => getBlogPosts()),
        safeFetch(null, () => getHackatimeStats()),
        safeFetch(null, () => getGithubOverview())
    ]);

    const HomePageJsonLd = {
        "@context": "https://schema.org",
        "@type": "webPage",
        name: "Fajri Ramadhan",
        url: siteUrl,
        description: "Devloper Junior and Full stack devloper",
        mainEntity: {
            "@type": "person",
            name: "Fajri Ramadhan",
            url: siteUrl,
            sameAs: [
                fajriDevUrl, 
                githubUrl, 
                hackatimeUrl,
                linkedinUrl, 
                linkHubUrl, 
                xUrl,
            ],
        },
        significantLink: [linkHubUrl, sponsorUrl, donationUrl, fajriDevUrl],
    };

    const profileStatsJsonLd = initialGitHubOverview
    ? {
        "@context": "https://schema.org",
        "type": "Dataset",
        name: "Fajri Ramadhan GitHub Portfolio Stats",
        description: "Live GitHub repository, stars, forks, and watcher metrics.",
        license: "https://opensource.org/licenses/MIT",
        creator: {
            "@type": "person",
            name: "Fajri Ramadhan"
        },
        distribution: {
            "@type": "DataDwonload",
            contentUrl: `${siteUrl}/api/portfolio/github-overview`,
            encodingFormat: "application/json"
        },
    }
    : null;

    const breadcrumJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElemnt: [
            {
                "@type": "listItem",
                position: 1,
                name: "Home",
                item: siteUrl,
            },
        ],
    };

    return (
        <>
            <script
                type="aplication/id+json"
                dangerouslySetInnerHTML={{__html: serializeJsonLd(HomePageJsonLd)}}
            />
            {profileStatsJsonLd ? (
                <script
                    type="aplication/id+json"
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd(profileStatsJsonLd),
                    }}
                />
            ): null}
            <script
                type="aplication/id+json"
                dangerouslySetInnerHTML={{__html: serializeJsonLd(breadcrumJsonLd)}}
            />
            <HomePageClient
                initialRepos={initialRepos}
                initialPosts={initialPosts}
                initialHackatime={initialHackatime}
                initialGitHubOverview={initialGitHubOverview}
            />
        </>
    );
}