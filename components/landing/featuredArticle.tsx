import React from "react";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { useRouter } from "next/router";

import { Box } from "@/components/Box";
import { px, percent, multiplePx } from "@atomize/component";
import { Row } from "@/components/Row";
import { Image } from "@/components/Image";
import { Text } from "@/components/Text";
import { CardBody } from "@/components/landing/cardBody";
import { ArticleProps } from "@/utils/types";
import {
    generateFriendlyString,
    usePreloadedImage,
    useBreakpoints,
} from "@/utils/helpers";
import { UnstyledAnchor } from "@/components/UnstyledAnchor";

interface FeaturedArticleProps {
    article: ArticleProps;
}

export const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
    const { hasLoaded } = usePreloadedImage(article.thumbnail);

    const { isMobile, isSmaller, isNormal } = useBreakpoints();

    return (
        <Link
            href={`/article/[articleTitle]`}
            as={`article/${generateFriendlyString(article.title)}`}
        >
            <a>
                <CardBody
                    disableHoverTransform
                    $marginTop={px(40)}
                    $padding={multiplePx(50, 0, 50, 30)}
                    $width={percent(100)}
                    $opacity={hasLoaded ? 1 : 0}
                >
                    <Row $align="center">
                        <Tilt
                            glareEnable={true}
                            glarePosition="all"
                            glareMaxOpacity={0.15}
                            tiltMaxAngleX={3}
                            tiltMaxAngleY={3}
                            tiltReverse={true}
                        >
                            <Image
                                alt="Featured Article Image"
                                src={article.thumbnail}
                                $boxShadow="-4px 4px 30px rgba(0,0,0,.25)"
                                $borderRadius={px(10)}
                                $width={px(570)}
                                $maxWidth={px(570)}
                            />
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
                            />

                            <Text
                                dangerouslySetInnerHTML={{
                                    __html: article.subTitle,
                                }}
                                $color="rgba(0,0,0,0.4)"
                                $ff="Poppins"
                                $fontWeight={600}
                                $fontSize={px(18)}
                                $marginTop={px(8)}
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

                            <Row $marginTop={px(16)}>
                                <Text $color="rgba(0,0,0,0.4)" $ff="Poppins">
                                    {article.date}
                                </Text>

                                <Text
                                    $color="rgba(0,0,0,0.4)"
                                    $ff="Poppins"
                                    $marginLeft={px(15)}
                                >
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
