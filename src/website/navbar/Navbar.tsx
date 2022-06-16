import styled from "styled-components"
import React, {
  HTMLAttributes,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react"
import _ from "lodash"
import { theme } from "../../theme"
import { Icon } from "../../components/icon/Icon"

type NavBarState = {
  mobileOpen: boolean
  navItems: { [key: string | number]: boolean }
}
type NavBarAction =
  | { type: "TOGGLE_NAV_ITEM"; navItemKey: string | number }
  | { type: "TOGGLE_MOBILE_MENU" }
  | { type: "CLOSE" }
function navBarReducer(state: NavBarState, action: NavBarAction): NavBarState {
  switch (action.type) {
    case "TOGGLE_MOBILE_MENU":
      return {
        ...state,
        mobileOpen: !state.mobileOpen,
        navItems: { ..._.mapValues(state.navItems, () => false) },
      }
    case "TOGGLE_NAV_ITEM":
      return {
        ...state,
        navItems: {
          ..._.mapValues(state.navItems, () => false),
          [action.navItemKey]: !state.navItems[action.navItemKey],
        },
      }
    case "CLOSE":
      return {
        ...state,
        navItems: _.mapValues(state.navItems, () => false),
        mobileOpen: false,
      }
    default:
      return state
  }
}
let lastId = 0
function _nextId() {
  lastId++
  return lastId
}
type NavBarContextType = {
  nextId: typeof _nextId
  state: NavBarState
  dispatch: React.Dispatch<NavBarAction>
}
export const NavBarContext = React.createContext<NavBarContextType>(
  {} as NavBarContextType
)
type NavBarProps = { children: React.ReactNode }
export const NavBar = (props: NavBarProps) => {
  const mobileNavigationBreakpoint = 940
  const [state, dispatch] = useReducer(navBarReducer, {
    navItems: {},
    mobileOpen: false,
  })

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= mobileNavigationBreakpoint) {
        dispatch({ type: "CLOSE" })
      }
    }
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  useEffect(() => {
    if (state.mobileOpen) {
      window.document.body.classList.add("mobile-nav-opened")
    } else {
      window.document.body.classList.remove("mobile-nav-opened")
    }
  }, [state.mobileOpen])

  return (
    <NavBarContext.Provider value={{ nextId: _nextId, state, dispatch }}>
      {props.children}
    </NavBarContext.Provider>
  )
}

export const NavBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  @media only screen and (min-width: 940px) {
    padding: 8px 0;
    flex-direction: row;
    width: auto;
  }
`
const NavItemsContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 100%;
  @media only screen and (min-width: 940px) {
    gap: 10px;
    flex-direction: row;
    width: auto;
  }
  .item {
    width: 100%;
    @media only screen and (min-width: 940px) {
      width: auto;
    }

    &:after {
      display: block;
      content: "";
      background-color: ${theme.colors.gray300};
      width: auto;
      height: 1px;
      margin: -1px 24px 0;
      box-sizing: content-box;
      @media only screen and (min-width: 940px) {
        display: none;
      }
    }

    &:last-child:after {
      display: none;
    }

    & > a {
      color: ${theme.colors.gray800};
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      line-height: ${24 / 16};
      position: relative;
      justify-content: space-between;
      padding: 31px 24px;
      @media only screen and (min-width: 940px) {
        padding: 12px 16px;
      }
      &:after {
        @media only screen and (min-width: 940px) {
          display: block;
          transition: opacity 0.1s ease;
          content: "";
          height: 1px;
          opacity: 0;
          background-color: ${theme.colors.indigo600};
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: -8px;
        }
      }
      &.has-dropdown {
        .item-open {
          display: none;
        }
        .item-closed {
          display: initial;
        }

        &:after {
          right: 22px;
        }
      }
    }

    @media only screen and (max-width: ${940 - 1}px) {
      .panel-spacer {
        & > div {
          width: 100%;
          max-width: 100%;
          box-shadow: none;
          border-radius: 0;
        }
      }
    }

    .panel-outer {
      display: none;
    }
    @media only screen and (min-width: 940px) {
      .panel-outer {
        position: relative;
        display: none;
        z-index: 1;
      }
      .panel-inner {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
      }
      .panel-spacer {
        padding-top: 28px;
      }

      &:hover {
        .panel-outer {
          display: block;
        }
        & > a {
          color: ${theme.colors.indigo600};
          &:after {
            opacity: 1;
          }

          &.has-dropdown {
            .item-open {
              display: initial;
            }
            .item-closed {
              display: none;
            }
          }
        }
      }
    }

    @media only screen and (max-width: ${940 - 1}px) {
      &.open {
        .has-dropdown {
          .item-open {
            display: initial;
          }
          .item-closed {
            display: none;
          }
        }
        .panel-outer {
          display: block;
        }
      }
    }
  }
`
type NavLinksProps = HTMLAttributes<HTMLDivElement> & {}
export const NavItemsContainer = ({ ...rest }: NavLinksProps) => (
  <NavItemsContainerWrapper {...rest} />
)

type DropdownPositionedProps = {
  children: React.ReactNode
  className?: string
}
const DropdownPositioned = ({
  children,
  className,
}: DropdownPositionedProps) => (
  <div className={`panel-outer ${className}`}>
    <div className="panel-inner">
      <div className="panel-spacer">{children}</div>
    </div>
  </div>
)

const NavLink = styled.a`
  text-decoration: none;
  font-weight: 600;
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes[14]};
  color: ${theme.colors.gray800};
  line-height: 1;
  transition: color 0.1s ease;
  &:hover {
    @media only screen and (min-width: 940px) {
      color: ${theme.colors.indigo600};
    }
  }
`

type NavItemProps = {
  href?: string
  title: React.ReactNode
  dropdown?: React.ReactNode
}
export const NavItem = ({ href, title, dropdown }: NavItemProps) => {
  const instanceRef = useRef({ id: 0 })
  const context = useContext(NavBarContext)
  useEffect(() => {
    instanceRef.current.id = context.nextId()
  }, [])

  const navlink = (
    <NavLink
      onClick={() =>
        context.dispatch({
          type: "TOGGLE_NAV_ITEM",
          navItemKey: instanceRef.current.id,
        })
      }
      className={dropdown ? "has-dropdown" : ""}
    >
      {title}
      {dropdown && (
        <>
          <Icon name="chevron-down" className="item-closed" />
          <Icon name="chevron-up" className="item-open" />
        </>
      )}
    </NavLink>
  )

  return (
    <div
      className={
        "item" + (context.state.navItems[instanceRef.current.id] ? " open" : "")
      }
    >
      {href ? (
        <a href={href}>
          {/* passHref */}
          {navlink}
        </a>
      ) : (
        navlink
      )}

      {dropdown && <DropdownPositioned>{dropdown}</DropdownPositioned>}
    </div>
  )
}

export const MenuButton = () => {
  const {
    state: { mobileOpen },
    dispatch,
  } = useContext(NavBarContext)
  return (
    <div>
      <a
        onClick={() => dispatch({ type: "TOGGLE_MOBILE_MENU" })}
        className={"menu-toggle-button"}
      >
        {mobileOpen ? <Icon name="x" /> : <Icon name="menu" />}
      </a>
    </div>
  )
}
