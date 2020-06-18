import React, { useEffect, useState } from "react";
import { percent, px, multiplePx } from "@atomize/component";
import Link from "next/link";
import styled from "styled-components";

import { Row } from "@/components/Row";
import { Image } from "@/components/Image";
import { Anchor } from "@/components/Anchor";
import { Text } from "@/components/Text";
import { useBreakpoints } from "@/utils/helpers";
import { useRouter } from "next/router";

const NavbarAnchor = styled(Anchor)`
    font-family: Poppins;
    font-weight: 600;
    cursor: pointer;
    color: black;
    font-size: ${px(14)};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const Navbar = () => {
    const router = useRouter();

    const { isMobile, isSmaller } = useBreakpoints();

    const [isInternalFlag, setIsInternalFlag] = useState(false);

    useEffect(() => {
        if (router.pathname === "/") {
            setIsInternalFlag(true);
        }
    }, [router.pathname]);

    return (
        <Row
            $borderBottomLeftRadius={px(10)}
            $borderBottomRightRadius={px(10)}
            $backgroundColor="rgba(255,255,255,0.95)"
            $padding={multiplePx(0, !isSmaller && !isMobile ? 15 : 40)}
            $position="sticky"
            $top={0}
            $width={percent(100)}
            $zIndex={1000}
        >
            <Row
                $align="center"
                $justify="space-between"
                $padding={multiplePx(25, 0)}
                $width={percent(100)}
            >
                <Row $align="center">
                    <Link href={isInternalFlag ? "/?f=i" : "/"}>
                        <a>
                            <Image
                                alt="Logo"
                                src="/typesafe.png"
                                $cursor="pointer"
                                $maxWidth={px(118)}
                            />
                        </a>
                    </Link>
                    {!isMobile && (
                        <Text
                            $marginLeft={px(30)}
                            $marginBottom={px(4)}
                            $color="rgba(0,0,0,0.3)"
                            $fontSize={px(13)}
                        >
                            Exclusive frontend blog
                        </Text>
                    )}
                </Row>
                <Row>
                    <Link href="/getting-featured">
                        <NavbarAnchor href="/getting-featured">
                            Become an author
                        </NavbarAnchor>
                    </Link>
                </Row>
            </Row>
        </Row>
    );
};
