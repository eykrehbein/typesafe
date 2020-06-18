import React from "react";
import Head from "next/head";
import { px, percent, vh, multiplePx } from "@atomize/component";

import { Box } from "@/components/Box";
import { Text } from "@/components/Text";
import { Image } from "@/components/Image";
import { Button } from "@/components/Button";
import { Anchor } from "@/components/Anchor";
import { usePreloadedImage } from "@/utils/helpers";

export default () => {
    const { hasLoaded } = usePreloadedImage("/typesafe.png");

    return (
        <>
            <Head>
                <title>Getting featured as an Author on Typesafe</title>
                <meta
                    name="description"
                    content="Contact us to get featured as an article author on typesafe.blog"
                />
            </Head>
            <Box
                $align="center"
                $justify="center"
                $minHeight={vh(100)}
                $padding={multiplePx(0, 20)}
                $width={percent(100)}
                $opacity={hasLoaded ? 1 : 0}
            >
                <Text $color="rgba(0,0,0,0.3)" $ff="Poppins" $fontWeight={600}>
                    Getting featured on
                </Text>
                <Box $marginTop={px(10)}>
                    <Image
                        alt="Typesafe Logo"
                        src="/typesafe.png"
                        $width={px(290)}
                    />
                </Box>

                <Box
                    $textAlign="center"
                    $marginTop={px(40)}
                    $marginBottom={px(100)}
                    $maxWidth={px(570)}
                >
                    <Text
                        $ff="Open Sans"
                        $color="black"
                        $lineHeight={1.7}
                        $fontSize={px(18)}
                    >
                        You want to inspire a lot of frontend developers? Send
                        us an e-mail with the content of your article or a link
                        to your article (if you want to cross-post it) and we
                        will reply as soon as possible and decide if we want to
                        publish your article.
                    </Text>

                    <Anchor
                        $width={percent(100)}
                        $marginTop={px(40)}
                        href="mailto:author@typesafe.blog"
                    >
                        <Box
                            whileHover={{
                                transform: "translateY(-3px)",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                            }}
                            $border="none"
                            $borderRadius={px(10)}
                            $cursor="pointer"
                            $backgroundColor="black"
                            $color="white"
                            $ff="Poppins"
                            $fontSize={px(20)}
                            $padding={multiplePx(20, 0)}
                            $width={percent(100)}
                        >
                            Contact us
                        </Box>
                    </Anchor>
                </Box>
            </Box>
        </>
    );
};
