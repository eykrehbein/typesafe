import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { px, percent, multiplePx } from "@atomize/component";

import { Tag, ArticleProps } from "@/utils/types";
import { Box } from "@/components/Box";
import { Image } from "@/components/Image";
import { CardBody } from "@/components/landing/cardBody";
import { Text } from "@/components/Text";
import { Row } from "@/components/Row";
import {
    generateFriendlyString,
    usePreloadedImage,
    useBreakpoints,
} from "@/utils/helpers";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ThemeContext } from "@/utils/context";

export const ArticlePreview = ({
    date,
    tags,
    thumbnail,
    title,
    timeToRead,
}: ArticleProps) => {
    const router = useRouter();

    const { hasLoaded } = usePreloadedImage(thumbnail);

    const { isSmaller } = useBreakpoints();

    const { theme } = useContext(ThemeContext);

    return (
        <CardBody $marginTop={px(40)} $padding={px(30)} $width={percent(33.3)}>
            <Link
                href={`/article/[articleTitle]`}
                as={`article/${generateFriendlyString(title)}`}
            >
                <a>
                    <Box $width={percent(100)}>
                        <Box>
                            {!hasLoaded && (
                                <LoadingIndicator
                                    $width={percent(100)}
                                    $height={isSmaller ? px(200) : px(220)}
                                />
                            )}
                            <Image
                                alt="Article Thumbnail"
                                src={thumbnail}
                                $borderRadius={px(10)}
                                $maxHeight={isSmaller ? px(200) : px(220)}
                                $objectFit="cover"
                                $position={hasLoaded ? undefined : "absolute"}
                                $opacity={hasLoaded ? 1 : 0}
                            />
                        </Box>

                        <Box $marginTop={px(15)} $maxWidth={percent(100)}>
                            <Text
                                $color={
                                    theme.value === "dark"
                                        ? "#E8E6E3"
                                        : undefined
                                }
                                $ff="Poppins"
                                $fontWeight="bold"
                                $fontSize={px(28)}
                                $lineHeight={1.3}
                            >
                                {title}
                            </Text>
                        </Box>

                        <Row $align="center" $marginTop={px(15)}>
                            {tags.map((tag, index) => (
                                <Box
                                    key={index}
                                    $backgroundColor={
                                        tag.backgroundColor || "black"
                                    }
                                    $color={tag.color || "white"}
                                    $padding={multiplePx(5, 20)}
                                    $borderRadius={px(5)}
                                >
                                    <Text
                                        $ff="Poppins"
                                        $fontWeight={600}
                                        $fontSize={px(11)}
                                    >
                                        {tag.name}
                                    </Text>
                                </Box>
                            ))}

                            <Text
                                $color={
                                    theme.value === "dark"
                                        ? "#9B9B9B"
                                        : "rgba(0,0,0,0.4)"
                                }
                                $fontSize={px(14)}
                                $marginLeft={px(15)}
                            >
                                {date}
                            </Text>

                            <Text
                                $color={
                                    theme.value === "dark"
                                        ? "#9B9B9B"
                                        : "rgba(0,0,0,0.4)"
                                }
                                $fontSize={px(14)}
                                $marginLeft={px(15)}
                            >
                                {timeToRead} min read
                            </Text>
                        </Row>
                    </Box>
                </a>
            </Link>
        </CardBody>
    );
};
