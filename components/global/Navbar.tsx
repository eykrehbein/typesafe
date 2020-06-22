import React, { useEffect, useState, useContext } from "react";
import { percent, px, multiplePx, vw } from "@atomize/component";
import Link from "next/link";
import styled from "styled-components";

import { Row } from "@/components/Row";
import { Image } from "@/components/Image";
import { Anchor } from "@/components/Anchor";
import { Text } from "@/components/Text";
import { useBreakpoints } from "@/utils/helpers";
import { useRouter } from "next/router";
import { ThemeContext } from "@/utils/context";
import { Box } from "@/components/Box";

const NavbarAnchor = styled(Anchor)`
    font-family: Poppins;
    font-weight: 600;
    cursor: pointer;
    color: black !default;
    font-size: ${px(14)};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const Navbar = () => {
    const { theme } = useContext(ThemeContext);

    const router = useRouter();

    const { isMobile, isSmaller } = useBreakpoints();

    const [isInternalFlag, setIsInternalFlag] = useState(false);

    const handleToggleDarkmode = () => {
        const newTheme = theme.value === "dark" ? "light" : "dark";

        theme.setValue(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const localStorageItem = localStorage.getItem("theme");
        if (localStorageItem) {
            theme.setValue(localStorageItem as "light" | "dark");
        }
    }, []);

    useEffect(() => {
        if (router.pathname === "/") {
            setIsInternalFlag(true);
        }
    }, [router.pathname]);

    return (
        <Row
            $backgroundColor={
                theme.value === "dark" ? "#181A1B" : "rgba(255,255,255,0.95)"
            }
            $padding={multiplePx(
                0,
                !isSmaller && !isMobile ? 15 : isMobile ? 40 : 40
            )}
            $position="sticky"
            $top={0}
            $width={percent(100)}
            $zIndex={1000}
            $align="center"
            $justify="center"
        >
            <Row
                $align="center"
                $justify="space-between"
                $padding={multiplePx(25, 0)}
                $width={percent(100)}
                $maxWidth={px(1295)}
            >
                <Row $align="center" $marginTop={px(5)}>
                    <Link href={isInternalFlag ? "/?f=i" : "/"}>
                        <a>
                            <Image
                                alt="Logo"
                                src={
                                    theme.value === "dark"
                                        ? "/typesafe_light.png"
                                        : "/typesafe.png"
                                }
                                $cursor="pointer"
                                $maxWidth={px(118)}
                            />
                        </a>
                    </Link>
                    {!isMobile && (
                        <Text
                            $marginLeft={px(30)}
                            $marginBottom={px(4)}
                            $color={
                                theme.value === "dark"
                                    ? "#9B9B9B"
                                    : "rgba(0,0,0,0.3)"
                            }
                            $fontSize={px(13)}
                        >
                            Inspiring frontend articles
                        </Text>
                    )}
                </Row>
                <Row $align="center">
                    <Box $paddingRight={px(30)}>
                        <Image
                            alt="Dark Mode toggle"
                            src={
                                theme.value === "dark"
                                    ? "/sun.svg"
                                    : "/moon.svg"
                            }
                            onClick={handleToggleDarkmode}
                            $cursor="pointer"
                            $width={px(20)}
                        />
                    </Box>
                    <Link href="/getting-featured">
                        <NavbarAnchor
                            $color={
                                theme.value === "dark" ? "#E8E6E3" : undefined
                            }
                            href="/getting-featured"
                        >
                            Become an author
                        </NavbarAnchor>
                    </Link>
                </Row>
            </Row>
        </Row>
    );
};
