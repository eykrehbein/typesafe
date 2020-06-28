import React, { useContext } from "react";
import Link from "next/link";
import { generateFriendlyString } from "@/utils/helpers";
import { Box } from "@/components/Box";
import { Image } from "@/components/Image";
import { px, percent, multiplePx } from "@atomize/component";
import { Text } from "@/components/Text";
import { Row } from "@/components/Row";
import { ArticleProps } from "@/utils/types";
import { ThemeContext } from "@/utils/context";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useFetchImage } from "@eyk/hooks";

interface MobileArticlePreviewProps {
    article: ArticleProps;
}

export const MobileArticlePreview = ({
    article,
}: MobileArticlePreviewProps) => {
    const { theme } = useContext(ThemeContext);

    const { hasLoaded: hasThumbnailLoaded } = useFetchImage(article.thumbnail);

    return (
        <Link
            href={`/article/[articleTitle]`}
            as={`article/${generateFriendlyString(article.title)}`}
        >
            <a>
                <Box
                    $align="center"
                    $textAlign="center"
                    $padding={multiplePx(30, 0)}
                    $width={percent(100)}
                >
                    {hasThumbnailLoaded && (
                        <Image
                            alt="Featured Article Image"
                            src={article.thumbnail}
                            $boxShadow="-4px 4px 30px rgba(0,0,0,.25)"
                            $borderRadius={px(5)}
                            $width={px(570)}
                            $maxWidth={percent(100)}
                        />
                    )}

                    {!hasThumbnailLoaded && (
                        <LoadingIndicator
                            $width={percent(100)}
                            $height={px(250)}
                        />
                    )}

                    <Box $marginTop={px(20)} $maxWidth={percent(100)}>
                        <Text
                            $color={
                                theme.value === "dark" ? "#E8E6E3" : undefined
                            }
                            dangerouslySetInnerHTML={{
                                __html: article.title,
                            }}
                            $ff="Poppins"
                            $fontSize={px(22)}
                            $fontWeight="bold"
                            $lineHeight={1.3}
                            $margin={0}
                        />
                    </Box>

                    <Row>
                        {article.tags.map((tag, index) => (
                            <Box
                                key={index}
                                $align="center"
                                $background={tag.backgroundColor || "black"}
                                $borderRadius={px(5)}
                                $color={tag.color || "white"}
                                $ff="Poppins"
                                $fontSize={px(12)}
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
            </a>
        </Link>
    );
};
