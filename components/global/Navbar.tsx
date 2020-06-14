import React from "react";
import { percent, px, multiplePx } from "@atomize/component";
import Link from "next/link";
import styled from "styled-components";

import { Row } from "@/components/Row";
import { Image } from "@/components/Image";
import { Anchor } from "@/components/Anchor";

const NavbarAnchor = styled(Anchor)`
  font-family: Poppins;
  font-weight: 600;
  cursor: pointer;
  color: black;
  font-size: ${px(14)};
  &:hover {
    text-decoration: underline;
  }
`;

export const Navbar = () => (
  <Row
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    $justify="space-between"
    $marginTop={px(25)}
    $padding={multiplePx(0, 45, 0, 20)}
    $width={percent(100)}
  >
    <Link href="/">
      <Image src="/typesafe.png" $cursor="pointer" />
    </Link>

    <Row>
      <Link href="/advertise">
        <NavbarAnchor $marginRight={px(40)}>Advertise</NavbarAnchor>
      </Link>
      <Link href="/author">
        <NavbarAnchor>Become an author</NavbarAnchor>
      </Link>
    </Row>
  </Row>
);
