import { BoxProps } from "../Box";
import { DropdownMenuItems } from "../DropdownMenu/types";

export type MenuItemsType = {
  label: string;
  href: string;
  icon?: string;
  items?: DropdownMenuItems[];
  showOnMobile?: boolean;
  showItemsOnMobile?: boolean;
  scrollMenu?: boolean;
};

export interface MenuItemsProps extends BoxProps {
  items: MenuItemsType[];
  activeItem?: string;
  activeSubItem?: string;
  scrollMenu?: boolean;
}
