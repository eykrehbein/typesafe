import React from "react";
import { px, percent } from "@atomize/component";

import { Box } from "@/components/Box";

export const MainBody = ({ children }: { children: React.ReactNode }) => (
  <Box
    $align="center"
    $justify="center"
    $paddingBottom={px(300)}
    $width={percent(100)}
  >
    <Box $maxWidth={px(1295)} $width={percent(100)}>
      {children}
    </Box>
  </Box>
);
