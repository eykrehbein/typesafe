import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { px, percent, multiplePx } from "@atomize/component";

import { Tag, ArticleProps } from "@/utils/types";
import { Box } from "@/components/Box";
import { Image } from "@/components/Image";
import { CardBody } from "@/components/landing/cardBody";
import { Text } from "@/components/Text";
import { Row } from "@/components/Row";
import { generateFriendlyString } from "@/utils/helpers";

export const ArticlePreview = ({
    date,
    tags,
    thumbnail,
    title,
    timeToRead,
}: ArticleProps) => (
    <CardBody $marginTop={px(40)} $padding={px(30)} $width={percent(33.3)}>
        <Link
            href={`/article/[articleTitle]`}
            as={`article/${generateFriendlyString(title)}`}
        >
            <a>
                <Box $width={percent(100)}>
                    <Image
                        alt="Article Thumbnail"
                        src={thumbnail}
                        $borderRadius={px(10)}
                        $height={px(235)}
                        $width={percent(100)}
                    />

                    <Box $marginTop={px(15)} $maxWidth={percent(100)}>
                        <Text
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
                            $color="rgba(0, 0, 0, 0.4)"
                            $fontSize={px(14)}
                            $marginLeft={px(15)}
                        >
                            {date}
                        </Text>

                        <Text
                            $color="rgba(0, 0, 0, 0.4)"
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
