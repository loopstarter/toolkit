import React, { useContext } from "react";
import { MenuContext } from "../../widgets/Menu/context";
import StyledMenuItem, { StyledMenuItemContainer } from "./styles";
import { MenuItemProps } from "./types";
import IconComponent from "../Svg/IconComponent";

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href,
  isActive = false,
  variant = "default",
  statusColor,
  hasItems,
  scrollMenu,
  ...props
}) => {
  const { linkComponent } = useContext(MenuContext);
  const itemLinkProps: unknown = href
    ? {
        as: linkComponent,
        href,
      }
    : {
        as: "div",
      };
  return (
    <StyledMenuItemContainer $isActive={isActive} $variant={variant}>
      <StyledMenuItem
        {...itemLinkProps}
        $isActive={isActive}
        $variant={variant}
        $statusColor={statusColor}
        {...props}
        scrollMenu={scrollMenu}
      >
        {children}
        {hasItems && <IconComponent iconName="ChevronDown" />}
      </StyledMenuItem>
    </StyledMenuItemContainer>
  );
};

export default MenuItem;
