import { MainBody } from "@/components/global/MainBody";
import { Navbar } from "@/components/global/Navbar";
import { FeaturedArticle } from "@/components/landing/featuredArticle";
import { ArticlePreviews } from "@/components/landing/articlePreviews";
import { useEffect } from "react";
import { useArticlesList } from "@/utils/helpers";

export default () => {
    const articles = useArticlesList();

    if (!articles) {
        return null;
    }

    return (
        <>
            <FeaturedArticle article={articles.featured} />
            <ArticlePreviews articles={articles.standard} />
        </>
    );
};
