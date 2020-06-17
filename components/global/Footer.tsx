import React from "react";
import { Box } from "@/components/Box";
import { px, percent } from "@atomize/component";
import { Row } from "@/components/Row";
import { Image } from "@/components/Image";
import { Text } from "@/components/Text";
import { Anchor } from "@/components/Anchor";

export const Footer = () => (
    <Box
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
        $align="center"
        $paddingBottom={px(10)}
        $width={percent(100)}
    >
        <Text $color="rgba(0,0,0,0.3)" $ff="Open Sans" $fontSize={px(12)}>
            typesafe.blog - Made by{" "}
            <Anchor
                $color="rgba(0,0,0,0.3)"
                $ff="Open Sans"
                $marginTop={px(10)}
                $fontSize={px(12)}
                href="https://www.linkedin.com/in/eykrehbein"
                target="_blank"
                $textDecoration="underline"
            >
                Eyk Rehbein
            </Anchor>
        </Text>
        <Row $marginTop={px(10)}>
            <a href="https://www.linkedin.com/in/eykrehbein" target="_blank">
                <Box
                    $align="center"
                    $justify="center"
                    $backgroundColor="#E4E4E4"
                    $borderRadius={percent(50)}
                    $height={px(30)}
                    $width={px(30)}
                >
                    <Image src="/icons/linkedin.svg" $width={px(13)} />
                </Box>
            </a>

            <a href="https://github.com/eykrehbein" target="_blank">
                <Box
                    $align="center"
                    $justify="center"
                    $backgroundColor="#E4E4E4"
                    $borderRadius={percent(50)}
                    $height={px(30)}
                    $marginLeft={px(10)}
                    $width={px(30)}
                >
                    <Image src="/icons/github.svg" $width={px(13)} />
                </Box>
            </a>
        </Row>

        <Anchor
            $color="rgba(0,0,0,0.3)"
            $ff="Open Sans"
            $marginTop={px(10)}
            $fontSize={px(12)}
            href="/privacy"
            $textDecoration="underline"
        >
            Privacy Policy
        </Anchor>
    </Box>
);
