import { MainBody } from "@/components/global/MainBody";
import { Navbar } from "@/components/global/Navbar";
import { FeaturedArticle } from "@/components/landing/featuredArticle";
import { ArticlePreviews } from "@/components/landing/articlePreviews";
import { useEffect } from "react";
import { useArticlesList, useBreakpoints } from "@/utils/helpers";
import Head from "next/head";
import { MobileArticlePreview } from "@/components/landing/mobileArticlePreview";
import { MobileArticlePreviews } from "@/components/landing/mobileArticlePreviews";

export default () => {
    const articles = useArticlesList();

    const { isMobile } = useBreakpoints();

    if (!articles) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Typesafe - Inspiring Frontend Articles</title>
                <meta
                    name="description"
                    content="Stay on the cutting edge of frontend development with interesting articles from passionate frontend developers"
                />
            </Head>

            {isMobile && (
                <MobileArticlePreviews
                    articles={[articles.featured, ...articles.standard]}
                />
            )}

            {!isMobile && (
                <>
                    <FeaturedArticle article={articles.featured} />
                    <ArticlePreviews articles={articles.standard} />{" "}
                </>
            )}
        </>
    );
};
