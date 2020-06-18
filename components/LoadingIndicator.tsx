import React from "react";
import styled, { keyframes, css } from "styled-components";
import { Box } from "@/components/Box";
import { px } from "@atomize/component";

const shimmeringBackground = (
    backgroundColor: string,
    lightenPercent: number = 1
) => css`
    animation: ${shimmer} 1.9s linear infinite;
    background: ${backgroundColor};
    background-image: linear-gradient(
        -80deg,
        ${backgroundColor} 0%,
        ${changeColorBrightness(backgroundColor, lightenPercent)} 60%,
        ${backgroundColor} 100%
    );
    background-position: -300px 0;
    background-repeat: no-repeat;
    background-size: 300px 100%;
`;
const shimmer = keyframes`
0% {
    background-position: -300px;
}

100% {
    background-position: 800px;
}
`;
const addHashPrefix = <T extends string | undefined | null>(value: T) =>
    value ? `#${value}` : value;

const changeColorBrightness = (color: string, percent: number) => {
    const num = parseInt(color[0] === "#" ? color.slice(1) : color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = ((num >> 8) & 0x00ff) + amt,
        G = (num & 0x0000ff) + amt;

    return addHashPrefix(
        (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
            (G < 255 ? (G < 1 ? 0 : G) : 255)
        )
            .toString(16)
            .slice(1)
    );
};

export const LoadingIndicator = styled(Box)`
    ${shimmeringBackground("#C4C4C4", 2)}
`;

LoadingIndicator.defaultProps = {
    $borderRadius: px(10),
};
