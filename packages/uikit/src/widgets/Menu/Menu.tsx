import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import MenuItems from "../../components/MenuItems/MenuItems";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./components/Logo";
import { MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { NavProps } from "./types";
import { MenuContext } from "./context";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ scrollMenu: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ scrollMenu }) => (scrollMenu ? "#fff" : "transparent")};
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FixedContainer = styled.div<{ showMenu: boolean; height: number; scrollMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : "-100px")};
  left: 0;
  transition: top 0.2s;
  // height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
  background-color: ${({ scrollMenu }) => (scrollMenu ? "#fff" : "transparent")};
  padding: 22px 0;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;

const Menu: React.FC<NavProps> = ({
  linkComponent = "a",
  userMenu,
  banner,
  isDark,
  links,
  activeItem,
  activeSubItem,
  children,
}) => {
  const { isMobile } = useMatchBreakpoints();
  const [showMenu, setShowMenu] = useState(true);
  const [scrollMenu, setScrollMenu] = useState(false);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
        setScrollMenu(false);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
          setScrollMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <MenuContext.Provider value={{ linkComponent }}>
      <Wrapper>
        <FixedContainer scrollMenu={scrollMenu} showMenu={showMenu} height={totalTopMenuHeight}>
          {banner && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
          <StyledNav scrollMenu={scrollMenu}>
            <Flex>
              <Logo href={homeLink?.href ?? "/"} scrollMenu={scrollMenu} />
            </Flex>
            <Flex alignItems="center" height="100%">
              {!isMobile && (
                <MenuItems
                  scrollMenu={scrollMenu}
                  items={links}
                  activeItem={activeItem}
                  activeSubItem={activeSubItem}
                  ml="24px"
                />
              )}
              {userMenu}
            </Flex>
          </StyledNav>
        </FixedContainer>
        <BodyWrapper>
          <Inner isPushed={false} showMenu={showMenu}>
            {children}
          </Inner>
        </BodyWrapper>
        {isMobile && <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />}
      </Wrapper>
    </MenuContext.Provider>
  );
};

export default Menu;
