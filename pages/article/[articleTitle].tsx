import React, { useContext } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { percent, px, multiplePx } from "@atomize/component";
import { useFetchImage } from "@eyk/hooks";

import {
    useArticlesList,
    generateFriendlyString,
    useBreakpoints,
} from "@/utils/helpers";
import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import { Image } from "@/components/Image";
import { ArticleProps } from "@/utils/types";
import { CodeBlock } from "@/components/global/CodeBlock";
import { Row } from "@/components/Row";
import { Anchor } from "@/components/Anchor";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ThemeContext } from "@/utils/context";

interface ArticlePageProps {
    articleInfo: ArticleProps;
    content: string;
}

export default ({ articleInfo, content }: ArticlePageProps) => {
    const { hasLoaded: hasThumbnailLoaded } = useFetchImage(
        articleInfo.thumbnail
    );

    const { isMobile } = useBreakpoints();

    const { theme } = useContext(ThemeContext);

    if (!articleInfo) {
        return null;
    }

    return (
        <>
            <Head>
                <title>{articleInfo.title} | Typesafe</title>
                <meta
                    name="description"
                    content={
                        "Typesafe Article: " +
                        articleInfo.title +
                        " - " +
                        articleInfo.subTitle
                    }
                />
            </Head>

            <Box
                $align="center"
                $padding={multiplePx(0, isMobile ? 0 : 10)}
                $width={percent(100)}
            >
                <Box
                    $marginTop={px(60)}
                    $maxWidth={isMobile ? percent(100) : px(720)}
                >
                    <Box
                        $align="center"
                        $textAlign="center"
                        $width={percent(100)}
                    >
                        <Text
                            $lineHeight={1.3}
                            $fontSize={px(isMobile ? 36 : 57)}
                            $fontWeight="bold"
                            $color={
                                theme.value === "dark" ? "#E8E6E3" : undefined
                            }
                        >
                            {articleInfo.title}
                        </Text>

                        <Text
                            $color={
                                theme.value === "dark"
                                    ? "#9B9B9B"
                                    : "rgba(0,0,0,0.3)"
                            }
                            $marginTop={px(12)}
                            $fontWeight={500}
                            $fontSize={px(18)}
                        >
                            {articleInfo.subTitle}
                        </Text>

                        <Image
                            alt="Article Thumbnail"
                            src={articleInfo.thumbnail}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            $borderRadius={px(10)}
                            $marginTop={px(40)}
                            $width={!hasThumbnailLoaded ? 0 : percent(100)}
                            $opacity={hasThumbnailLoaded ? 1 : 0}
                            $position={
                                hasThumbnailLoaded ? undefined : "absolute"
                            }
                        />

                        {!hasThumbnailLoaded && (
                            <LoadingIndicator
                                $marginTop={px(40)}
                                $width={percent(100)}
                                $height={px(isMobile ? 230 : 400)}
                                $maxWidth={px(570)}
                            />
                        )}

                        <Row
                            $align="center"
                            $justify="center"
                            $marginTop={px(40)}
                            $maxWidth={percent(100)}
                        >
                            {articleInfo.author.profilePicture && (
                                <Image
                                    alt="Author Image"
                                    src={articleInfo.author.profilePicture}
                                    $height={px(isMobile ? 20 : 40)}
                                    $width={px(isMobile ? 20 : 40)}
                                    $borderRadius={percent(500)}
                                />
                            )}

                            <Anchor
                                href={
                                    articleInfo.author.linkedIn ||
                                    articleInfo.author.github ||
                                    undefined
                                }
                                target="_blank"
                                rel="noopener"
                                $color="#C5C5C5"
                                $ff="Poppins"
                                $marginLeft={px(
                                    articleInfo.author.profilePicture ? 15 : 0
                                )}
                                $fontSize={isMobile ? px(12) : undefined}
                            >
                                by <u>{articleInfo.author.name}</u>
                            </Anchor>

                            <Text
                                $marginLeft={px(isMobile ? 15 : 35)}
                                $ff="Poppins"
                                $color="#C5C5C5"
                                $fontSize={isMobile ? px(12) : undefined}
                            >
                                {articleInfo.date}
                            </Text>

                            <Text
                                $marginLeft={px(isMobile ? 15 : 35)}
                                $ff="Poppins"
                                $color="#C5C5C5"
                                $fontSize={isMobile ? px(12) : undefined}
                            >
                                {articleInfo.timeToRead} min read
                            </Text>
                        </Row>
                    </Box>

                    <Box
                        className="mdc"
                        $color={theme.value === "dark" ? "#E8E6E3" : undefined}
                        $marginTop={px(40)}
                        $width={percent(100)}
                    >
                        <ReactMarkdown
                            source={content}
                            linkTarget="_blank"
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
