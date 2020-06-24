import React, { useContext } from "react";
import { px, percent, vh, multiplePx } from "@atomize/component";

import { Box } from "@/components/Box";
import { useBreakpoints } from "@/utils/helpers";
import { ThemeContext } from "@/utils/context";

export const MainBody = ({ children }: { children: React.ReactNode }) => {
    const { isMobile, isSmaller } = useBreakpoints();
    const { theme } = useContext(ThemeContext);

    return (
        <Box
            $align="center"
            $backgroundColor={theme.value === "dark" ? "#181A1B" : "white"}
            $justify="center"
            $padding={multiplePx(0, isSmaller ? 40 : isMobile ? 20 : 0, 200)}
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
