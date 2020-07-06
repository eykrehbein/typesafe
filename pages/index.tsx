import { MainBody } from "@/components/global/MainBody";
import { Navbar } from "@/components/global/Navbar";
import { FeaturedArticle } from "@/components/landing/featuredArticle";
import { ArticlePreviews } from "@/components/landing/articlePreviews";
import { useEffect } from "react";
import { useArticlesList, useBreakpoints } from "@/utils/helpers";
import Head from "next/head";
import { MobileArticlePreview } from "@/components/landing/mobileArticlePreview";
import { MobileArticlePreviews } from "@/components/landing/mobileArticlePreviews";
import { Box } from "@/components/Box";
import { percent } from "@atomize/component";

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

            <Box
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                $height={percent(100)}
                $width={percent(100)}
            >
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
            </Box>
        </>
    );
};
