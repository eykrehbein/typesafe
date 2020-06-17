import React from "react";
import { px, percent, vh } from "@atomize/component";

import { Box } from "@/components/Box";

export const MainBody = ({ children }: { children: React.ReactNode }) => (
    <Box
        $align="center"
        $justify="center"
        $paddingBottom={px(200)}
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
