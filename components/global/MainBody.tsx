import React from "react";
import { px, percent, vh, multiplePx } from "@atomize/component";

import { Box } from "@/components/Box";
import { useBreakpoints } from "@/utils/helpers";

export const MainBody = ({ children }: { children: React.ReactNode }) => {
    const { isMobile, isSmaller } = useBreakpoints();

    return (
        <Box
            $align="center"
            $justify="center"
            $padding={multiplePx(0, isSmaller || isMobile ? 40 : 0, 200)}
            $width={percent(100)}
        >
            <Box
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                $maxWidth={px(1295)}
                $width={percent(100)}
                $minHeight={vh(100)}
            >
                {children}
            </Box>
        </Box>
    );
};
