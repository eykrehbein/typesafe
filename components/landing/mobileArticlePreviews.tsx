import React from "react";
import { ArticleProps } from "@/utils/types";
import { percent } from "@atomize/component";
import { MobileArticlePreview } from "@/components/landing/mobileArticlePreview";
import { Box } from "@/components/Box";

interface MobileArticlePreviewsProps {
    articles: ArticleProps[];
}

export const MobileArticlePreviews = ({
    articles,
}: MobileArticlePreviewsProps) => (
    <Box $maxWidth={percent(100)}>
        {articles.map((preview, index) => (
            <MobileArticlePreview key={index} article={preview} />
        ))}
    </Box>
);
