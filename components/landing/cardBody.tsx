import styled from "styled-components";
import { Box } from "@/components/Box";

export const CardBody = styled(Box)`
  border-radius: 10px;
  cursor: pointer;

  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0);
  transition-duration: 0.45s;
  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    transition-durations: 0.45s;
  }
`;
