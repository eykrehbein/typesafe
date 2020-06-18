import { useState, useEffect, useLayoutEffect } from "react";
import { createBreakpoint } from "react-use";

import { ArticleProps, ArticleObject } from "@/utils/types";

export const chunk = <T>(arr: T[], chunkSize = 1, cache = []) => {
    const tmp = [...arr];
    if (chunkSize <= 0) return cache;
    while (tmp.length) cache.push(tmp.splice(0, chunkSize));
    return cache;
};

export const useArticlesList = () => {
    const [posts, setPosts] = useState<ArticleObject>();

    useEffect(() => {
        const f = async () => {
            const res = await fetch("/articles/list.json");

            setPosts(await res.json());
        };

        f();
    }, []);

    return posts;
};

export const generateFriendlyString = (str: string) =>
    str.replace(/([^a-z0-9]+)/gi, "-").toLowerCase();

export const usePreloadedImage = (src: string) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = src;

        const errorHandler = () => {
            setHasError(true);
            setHasLoaded(true);
        };

        const loadedHandler = () => {
            setHasLoaded(true), setHasError(false);
        };

        image.onload = loadedHandler;
        image.onerror = errorHandler;

        return () => {
            image.removeEventListener("error", errorHandler);
            image.removeEventListener("load", loadedHandler);
        };
    }, [src]);

    return { hasLoaded, hasError };
};

const useBreakpoint = createBreakpoint({
    NORMAL: 1400,
    SMALL: 1070,
    MOBILE: 0,
});

export const useBreakpoints = () => {
    const breakpoint = useBreakpoint();

    return {
        isMobile: breakpoint === "MOBILE",
        isSmaller: breakpoint === "SMALL",
        isNormal: breakpoint === "NORMAL",
    };
};
