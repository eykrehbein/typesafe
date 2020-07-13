import React, { useEffect, useState, useContext } from "react";
import { percent, px, multiplePx, vw } from "@atomize/component";
import Link from "next/link";
import styled from "styled-components";
import { useAnimation } from "framer-motion";

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

    const newsletterLinkAnimation = useAnimation();
    const newsLetterArrowAnimation = useAnimation();

    const router = useRouter();

    const { isMobile, isSmaller } = useBreakpoints();

    const [isInternalFlag, setIsInternalFlag] = useState(false);

    const handleToggleDarkmode = () => {
        const newTheme = theme.value === "dark" ? "light" : "dark";

        theme.setValue(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const handleNewsletterLinkHoverStart = () => {
        newsletterLinkAnimation.start({ translateX: px(-15) });
        newsLetterArrowAnimation.start({
            display: "flex",
            translateX: px(10),
        });
    };

    const handleNewsletterLinkHoverEnd = () => {
        newsletterLinkAnimation.start({ translateX: px(15) });
        newsLetterArrowAnimation.start({
            display: "none",
            translateX: px(-10),
        });
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
        <Box
            $backgroundColor={
                theme.value === "dark" ? "#181A1B" : "rgba(255,255,255,0.95)"
            }
            $position="sticky"
            $top={0}
            $width={percent(100)}
            $zIndex={1000}
            $align="center"
            $justify="center"
        >
            <Row
                $align="center"
                $background="linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);"
                $height={px(55)}
                $justify="center"
                $width={percent(100)}
            >
                <Link href="//typesafe.news">
                    <a
                        target="_blank"
                        onMouseEnter={handleNewsletterLinkHoverStart}
                        onMouseLeave={handleNewsletterLinkHoverEnd}
                    >
                        <Row
                            animate={newsletterLinkAnimation}
                            $align="center"
                            $height={percent(100)}
                        >
                            <Text
                                $color="white"
                                $fontSize={px(14)}
                                $fontWeight="bold"
                            >
                                Sign up for the new Typesafe Newsletter!
                            </Text>

                            <Box $margin={multiplePx(0, 0, 3, 5)}>🎉</Box>

                            <Box
                                animate={newsLetterArrowAnimation}
                                $display="none"
                            >
                                <svg
                                    width="21"
                                    height="12"
                                    viewBox="0 0 21 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.4">
                                        <path
                                            d="M20.5303 6.53033C20.8232 6.23744 20.8232 5.76256 20.5303 5.46967L15.7574 0.696699C15.4645 0.403806 14.9896 0.403806 14.6967 0.696699C14.4038 0.989592 14.4038 1.46447 14.6967 1.75736L18.9393 6L14.6967 10.2426C14.4038 10.5355 14.4038 11.0104 14.6967 11.3033C14.9896 11.5962 15.4645 11.5962 15.7574 11.3033L20.5303 6.53033ZM0 6.75H20V5.25H0V6.75Z"
                                            fill="black"
                                        />
                                    </g>
                                </svg>
                            </Box>
                        </Row>
                    </a>
                </Link>
            </Row>
            <Row
                $align="center"
                $justify="space-between"
                $padding={multiplePx(
                    25,
                    !isSmaller && !isMobile ? 15 : isMobile ? 40 : 40
                )}
                $width={percent(100)}
                $maxWidth={px(1295)}
            >
                <Row $align="center" $marginTop={px(5)}>
                    <Link href="/">
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
                            The Frontend Platform
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
                    <Link
                        href={`/article/[articleTitle]`}
                        as="/article/publish-an-article-on-typesafe"
                    >
                        <NavbarAnchor
                            $color={
                                theme.value === "dark" ? "#E8E6E3" : undefined
                            }
                        >
                            Become an author
                        </NavbarAnchor>
                    </Link>
                </Row>
            </Row>
        </Box>
    );
};
