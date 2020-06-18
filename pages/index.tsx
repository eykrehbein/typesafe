import { MainBody } from "@/components/global/MainBody";
import { Navbar } from "@/components/global/Navbar";
import { FeaturedArticle } from "@/components/landing/featuredArticle";
import { ArticlePreviews } from "@/components/landing/articlePreviews";
import { useEffect } from "react";
import { useArticlesList } from "@/utils/helpers";
import Head from "next/head";

export default () => {
    const articles = useArticlesList();

    if (!articles) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Typesafe - Exclusive Frontend Blog</title>
                <meta
                    name="description"
                    content="Stay on the cutting edge of frontend development with interesting articles from passionate frontend developers"
                />
            </Head>
            <FeaturedArticle article={articles.featured} />
            <ArticlePreviews articles={articles.standard} />
        </>
    );
};
