import React, { useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import ReactMarkdown from "react-markdown";
import { percent, px, multiplePx } from "@atomize/component";
import hljs from "highlight.js";

import { useArticlesList, generateFriendlyString } from "@/utils/helpers";
import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import { Image } from "@/components/Image";
import { ArticleProps } from "@/utils/types";
import { CodeBlock } from "@/components/global/CodeBlock";

interface ArticlePageProps {
    articleInfo: ArticleProps;
    content: string;
}

export default ({ articleInfo, content }: ArticlePageProps) => {
    if (!articleInfo) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{articleInfo.title} | Typesafe</title>
                <meta
                    name="description"
                    content={"Typesafe Article: " + articleInfo.title}
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                    rel="stylesheet"
                ></link>

                <link
                    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>

            <Box
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                $align="center"
                $padding={multiplePx(0, 20)}
                $width={percent(100)}
            >
                <Box $marginTop={px(60)} $maxWidth={px(720)}>
                    <Box
                        $align="center"
                        $textAlign="center"
                        $width={percent(100)}
                    >
                        <Text
                            $lineHeight={1.3}
                            $fontSize={px(57)}
                            $fontWeight="bold"
                        >
                            {articleInfo.title}
                        </Text>

                        <Text
                            $color="rgba(0,0,0,0.3)"
                            $marginTop={px(12)}
                            $fontWeight={500}
                            $fontSize={px(18)}
                        >
                            {articleInfo.subTitle}
                        </Text>

                        <Image
                            alt="Article Thumbnail"
                            src={articleInfo.thumbnail}
                            $borderRadius={px(10)}
                            $marginTop={px(40)}
                            $width={percent(100)}
                        />
                    </Box>

                    <Box
                        className="mdc"
                        $marginTop={px(40)}
                        $width={percent(100)}
                    >
                        <ReactMarkdown
                            source={content}
                            renderers={{ code: CodeBlock }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const articleList = await import("../../public/articles/list.json");

    let articleInfo = null;

    if (
        generateFriendlyString(articleList.featured.title) ===
        context.params.articleTitle
    ) {
        articleInfo = articleList.featured;
    } else {
        for (const articleItem of articleList.standard) {
            if (
                generateFriendlyString(articleItem.title) ===
                context.params.articleTitle
            ) {
                articleInfo = articleItem;
            }
        }
    }

    const moduleContent = await import(
        `../../public/articles/${context.params.articleTitle}.md`
    );

    return {
        props: {
            articleInfo,
            content: moduleContent.default,
        },
    };
};

export const getStaticPaths = async () => {
    const articleList = await import("../../public/articles/list.json");

    const articleTitles = [
        generateFriendlyString(articleList.featured.title),
        ...articleList.standard.map(({ title }) =>
            generateFriendlyString(title)
        ),
    ];

    return {
        paths: articleTitles.map((title) => ({
            params: { articleTitle: title },
        })),
        fallback: false,
    };
};
