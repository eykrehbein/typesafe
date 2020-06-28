import React, { useContext, useState, useRef } from "react";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { useHoverDirty } from "react-use";
import { useFetchImage } from "@eyk/hooks";

import { Box } from "@/components/Box";
import { px, percent, multiplePx } from "@atomize/component";
import { Row } from "@/components/Row";
import { Image } from "@/components/Image";
import { Text } from "@/components/Text";
import { CardBody } from "@/components/landing/cardBody";
import { ArticleProps } from "@/utils/types";
import { generateFriendlyString, useBreakpoints } from "@/utils/helpers";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ThemeContext } from "@/utils/context";

interface FeaturedArticleProps {
    article: ArticleProps;
}

export const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
    const featuredImageRef = useRef<HTMLImageElement>();
    const { theme } = useContext(ThemeContext);

    const { hasLoaded } = useFetchImage(article.thumbnail);

    const { isNormal } = useBreakpoints();

    const isHoveringImage = useHoverDirty(featuredImageRef);

    return (
        <Link
            href={`/article/[articleTitle]`}
            as={`article/${generateFriendlyString(article.title)}`}
        >
            <a>
                <CardBody
                    disableHoverTransform
                    $marginTop={px(40)}
                    $padding={multiplePx(50, 20, 50, 30)}
                    $width={percent(100)}
                >
                    <Row $align="center">
                        <Tilt
                            tiltEnable={isHoveringImage}
                            glareEnable={isHoveringImage}
                            glarePosition="all"
                            glareMaxOpacity={0.15}
                            tiltMaxAngleX={3}
                            tiltMaxAngleY={3}
                            tiltReverse={true}
                        >
                            <Image
                                alt="Featured Article Image"
                                src={article.thumbnail}
                                ref={featuredImageRef}
                                $boxShadow="-4px 4px 30px rgba(0,0,0,.25)"
                                $borderRadius={px(10)}
                                $width={px(570)}
                                $maxWidth={px(570)}
                                $position={hasLoaded ? undefined : "absolute"}
                                $opacity={hasLoaded ? 1 : 0}
                            />

                            {!hasLoaded && (
                                <LoadingIndicator
                                    $width={px(570)}
                                    $height={px(350)}
                                />
                            )}
                        </Tilt>

                        <Box $padding={multiplePx(30, 0, 0, 50)}>
                            <Text
                                dangerouslySetInnerHTML={{
                                    __html: article.title,
                                }}
                                $ff="Poppins"
                                $fontSize={isNormal ? px(56) : px(38)}
                                $fontWeight="bold"
                                $lineHeight={1.3}
                                $margin={0}
                                $color={
                                    theme.value === "dark"
                                        ? "#E8E6E3"
                                        : undefined
                                }
                            />

                            <Text
                                dangerouslySetInnerHTML={{
                                    __html: article.subTitle,
                                }}
                                $ff="Poppins"
                                $fontWeight={600}
                                $fontSize={px(18)}
                                $marginTop={px(8)}
                                $color={
                                    theme.value === "dark"
                                        ? "#9B9B9B"
                                        : "rgba(0,0,0,0.4)"
                                }
                            />

                            <Row>
                                {article.tags.map((tag, index) => (
                                    <Box
                                        key={index}
                                        $align="center"
                                        $background={
                                            tag.backgroundColor || "black"
                                        }
                                        $borderRadius={px(5)}
                                        $color={tag.color || "white"}
                                        $ff="Poppins"
                                        $fontSize={px(14)}
                                        $fontWeight={600}
                                        $justify="center"
                                        $padding={multiplePx(5, 20)}
                                        $marginTop={px(16)}
                                        $marginLeft={index !== 0 && px(10)}
                                    >
                                        {tag.name}
                                    </Box>
                                ))}
                            </Row>

                            <Row
                                $color={
                                    theme.value === "dark"
                                        ? "#9B9B9B"
                                        : "rgba(0,0,0,0.4)"
                                }
                                $marginTop={px(16)}
                            >
                                <Text $ff="Poppins">{article.date}</Text>

                                <Text $ff="Poppins" $marginLeft={px(15)}>
                                    {article.timeToRead} min read
                                </Text>
                            </Row>
                        </Box>
                    </Row>
                </CardBody>
            </a>
        </Link>
    );
};
