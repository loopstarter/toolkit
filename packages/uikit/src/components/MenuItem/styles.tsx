import styled from "styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        background-color: ${theme.colors.primary};
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  font-family: FSMagistralLight;
  color: ${({ theme, $isActive, scrollMenu }) => (scrollMenu ? "#100052" : $isActive ? "#FFAA2E" : "#fff")};
  font-family: FSMagistralLight;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  svg {
    fill: ${({ theme, $isActive }) => ($isActive ? "#FFAA2E" : "#fff")};
  }
  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 48px;
  `
      : `
    padding: 4px 4px 0px 4px;
    height: 42px;
  `}

  &:hover {
    color: #ffaa2e;
    svg {
      fill: #ffaa2e;
    }
  }
`;

export default StyledMenuItem;
