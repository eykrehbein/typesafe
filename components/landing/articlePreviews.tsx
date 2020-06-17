import React from "react";

import { ArticleProps } from "@/utils/types";
import { Row } from "@/components/Row";
import { chunk } from "@/utils/helpers";
import { ArticlePreview } from "@/components/landing/articlePreview";
import { percent } from "@atomize/component";

interface ArticlePreviewsProps {
  articles: ArticleProps[];
}

export const ArticlePreviews = ({ articles }: ArticlePreviewsProps) => (
  <Row $flexWrap="wrap" $maxWidth={percent(100)}>
    {articles.map((preview, index) => (
      <ArticlePreview key={index} {...preview} />
    ))}
  </Row>
);
