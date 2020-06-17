import { createBaseComponent } from "@atomize/component";

export const UnstyledAnchor = createBaseComponent("a")`
    text-decoration: none;
    color: black !default;
`;
