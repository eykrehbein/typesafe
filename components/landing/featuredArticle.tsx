import React from "react";
import Tilt from "react-parallax-tilt";

import { Box } from "@/components/Box";
import { px, percent, multiplePx } from "@atomize/component";
import { Row } from "@/components/Row";
import { Image } from "@/components/Image";
import { Text } from "@/components/Text";
import { CardBody } from "@/components/landing/cardBody";

export const FeaturedArticle = () => {
  const title = `The role of <br /> tag-functions in modern frontend`;
  const subTitle = "How styled-components changed the world";

  const tags = [
    { name: "JAVASCRIPT", color: "#109FFF" },
    { name: "FEATURED", color: "#00CC87" },
  ];

  return (
    <CardBody
      $marginTop={px(30)}
      $padding={multiplePx(30, 0, 30, 30)}
      $width={percent(100)}
    >
      <Row>
        <Tilt
          glareEnable={true}
          glarePosition="all"
          glareMaxOpacity={0.15}
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
        >
          <Image
            $boxShadow="-4px 4px 30px rgba(0,0,0,.25)"
            $borderRadius={px(10)}
            src="/example_featured.png"
            $width="570px auto"
            $maxWidth={px(570)}
          />
        </Tilt>
        <Box $padding={multiplePx(30, 150, 0, 50)}>
          <Text
            dangerouslySetInnerHTML={{ __html: title }}
            $ff="Poppins"
            $fontSize={px(56)}
            $fontWeight="bold"
            $lineHeight={1.3}
            $margin={0}
          />

          <Text
            dangerouslySetInnerHTML={{ __html: subTitle }}
            $color="rgba(0,0,0,0.4)"
            $ff="Poppins"
            $fontWeight={600}
            $fontSize={px(18)}
            $marginTop={px(8)}
          />

          <Row>
            {tags.map((tag, index) => (
              <Box
                key={index}
                $align="center"
                $background={tag.color}
                $borderRadius={px(5)}
                $color="white"
                $ff="Poppins"
                $fontSize={px(14)}
                $fontWeight={600}
                $justify="center"
                $padding={multiplePx(5, 20)}
                $marginTop={px(16)}
                $marginLeft={index !== 0 && px(10)}
              >
                {tag.name}
              </Box>
            ))}
          </Row>
        </Box>
      </Row>
    </CardBody>
  );
};
