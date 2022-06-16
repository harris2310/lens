import React from "react"
import { Container } from "./Container"
import styled from "styled-components"
import { theme } from "../theme"
import {
  NavBar,
  NavBarContext,
  NavBarInner,
  NavItemsContainer,
  MenuButton,
  NavItem,
} from "../website/navbar/Navbar"
import {
  ArticleLink,
  ArticlesHeader,
  HorizontalDivider,
  IconLink,
  Link,
  Panel,
  SectionHeader,
  Spacer,
  VerticalDivider,
} from "../website/dropdown/Dropdown"

const Label = styled.span`
  border-radius: 4px;
  background-color: ${theme.colors.teal500};
  padding: ${theme.space[4]} ${theme.space[8]};
  color: ${theme.colors.white};
  line-height: 1;
  display: inline-block;
  font-weight: 600;
  font-size: 12px;
`

const HeaderWrapper = styled.div<{ lightFont?: boolean; notFixed?: boolean }>`
  font-size: 14px;
  position: ${(p) => (p.notFixed ? "relative" : "fixed")};
  top: 0;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  background-color: ${(p) =>
    !p.lightFont ? theme.colors.white : "transparent"};
  z-index: 9999;

  &.open {
    height: 100vh;
    overflow: scroll;
  }

  .container {
    @media only screen and (max-width: ${940 - 1}px) {
      padding: 0;
    }
  }

  .hidden-on-mobile {
    @media only screen and (max-width: ${940 - 1}px) {
      display: none;
    }
  }
  ${(p) =>
    p.lightFont &&
    `
  .item {
    > a {
      color: ${theme.colors.white};

      > a {
        color: ${theme.colors.white};
      }
    }
  }`}

  .mobile-header {
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 18px 8px 30px 24px;
    border-bottom: 1px solid ${theme.colors.gray300};
    .menu-toggle-button {
      display: inline-flex;
      color: ${theme.colors.gray800};
    }
    @media only screen and (min-width: ${940}px) {
      border-bottom: none;
      padding: 0;
      display: initial;
      width: auto;
      .menu-toggle-button {
        display: none;
      }
    }
  }

  .header-cta-container {
    width: 100%;
    a {
      width: 100%;
    }
    padding: 24px 24px 24px;
    @media only screen and (min-width: ${940}px) {
      padding: 0;
      width: auto;
      a {
        width: auto;
      }
    }
  }

  .company-dropdown-container {
    display: flex;
    flex-direction: row;
    .company-links {
      flex-shrink: 0;
      width: 100%;
      @media only screen and (min-width: ${940}px) {
        padding: 0 12px 0 20px;
        box-sizing: content-box;
        width: 187px;
      }
    }
    .articles {
      padding: 0 24px;
      display: none;
      @media only screen and (min-width: ${940}px) {
        display: block;
      }
    }
  }
`

const ButtonLink = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  line-height: 1;
  transition: "background-color .1s ease, color .2s ease";
  font-family: ${theme.fonts.text};
  font-weight: 500;
  background-color: ${theme.colors.indigo600};
  color: ${theme.colors.white};
  padding: ${theme.space[16]} ${theme.space[20]};
  hover: {
    backgroundcolor: ${theme.colors.indigo700};
  }
`
interface HeaderProps {
  className?: string
  lightFont?: boolean
  notFixed?: boolean
}

const WebsiteHeader = ({ className, lightFont, notFixed }: HeaderProps) => {
  return (
    <HeaderWrapper lightFont={lightFont} notFixed={notFixed}>
      <NavBar>
        <NavBarContext.Consumer>
          {({ state: { mobileOpen } }: any) => (
            <>
              <div className={className + (mobileOpen ? " open" : "")}>
                <Container className="container">
                  <NavBarInner>
                    <div className="mobile-header">
                      <a href="/">
                        <img
                          src={
                            lightFont
                              ? "https://website-v9.vercel.app/logo-white.svg"
                              : "https://website-v9.vercel.app/logo-dark.svg"
                          }
                          width={90}
                          height={27}
                          alt="prisma_logo"
                          style={{ cursor: "pointer" }}
                        />
                      </a>

                      <MenuButton />
                    </div>

                    <NavItemsContainer
                      className={mobileOpen ? "" : "hidden-on-mobile"}
                    >
                      <NavItem
                        title={"Products"}
                        dropdown={
                          <Panel>
                            <SectionHeader>Prisma ORM</SectionHeader>
                            <IconLink
                              href={"https://www.prisma.io/client"}
                              icon={"/icons/Icon-Client"}
                              title={"Client"}
                              subtitle={"Write Queries the way you think"}
                            />
                            <IconLink
                              href={"https://www.prisma.io/migrate"}
                              icon={"/icons/Icon-Migrate"}
                              title={"Migrate"}
                              subtitle={"Generate customizable SQL migrations"}
                            />

                            <SectionHeader>Prisma Data Platform</SectionHeader>
                            <IconLink
                              href={"https://www.prisma.io/data-platform"}
                              icon={"/icons/Icon-DataBrowser"}
                              title={"Data Browser"}
                              subtitle={
                                "Explore and manipulate data in your projects"
                              }
                            />
                            <IconLink
                              href={"https://www.prisma.io/data-platform"}
                              icon={"/icons/Icon-ServerlessDataProxy"}
                              title={"Data Proxy"}
                              subtitle={"Manage and scale your connection pool"}
                            />
                          </Panel>
                        }
                      />

                      <NavItem
                        href="https://www.prisma.io/pricing"
                        title={"Pricing"}
                      />

                      <NavItem
                        title={"Developers"}
                        dropdown={
                          <Panel width={461}>
                            <IconLink
                              href={"https://www.prisma.io/docs"}
                              titleOnlyOnMobile
                              icon={"/icons/Icon-Docs"}
                              title={"Documentation"}
                              subtitle={
                                "Refer to our technical documentation to configure Prisma, access APIs, develop your app, and deploy"
                              }
                            />

                            <IconLink
                              href={
                                "https://www.prisma.io/docs/getting-started"
                              }
                              titleOnlyOnMobile
                              icon={"/icons/Icon-GetStarted"}
                              title={"Get started"}
                              subtitle={"Set up Prisma for your project"}
                            />

                            <IconLink
                              href={"https://github.com/prisma/prisma-examples"}
                              titleOnlyOnMobile
                              icon={"/icons/Icon-PrismaExplained"}
                              title={"Prisma examples"}
                              subtitle={
                                "Access dozens of ready-to-run Prisma example projects"
                              }
                            />

                            <IconLink
                              href={"https://www.prisma.io/dataguide/"}
                              titleOnlyOnMobile
                              icon={"/icons/Icon-DataGuide"}
                              title={"Data Guide"}
                              subtitle={
                                "Refer to expert articles on how databases work"
                              }
                            />
                            <IconLink
                              href={
                                "https://www.prisma.io/prisma-in-your-stack/"
                              }
                              titleOnlyOnMobile
                              icon={"/icons/Icon-PrismaInYourStack"}
                              title={"Prisma in your Ecosystem"}
                              subtitle={
                                "Learn about Prisma’s integration with modern technology stacks, platforms, and applications"
                              }
                            />
                            {/* <HorizontalDivider /> */}
                            <IconLink
                              href={"https://www.prisma.io/support/"}
                              titleOnlyOnMobile
                              icon={"/icons/Icon-Support"}
                              title={"Support"}
                              subtitle={
                                "Find resources and get help from our support team"
                              }
                            />

                            <IconLink
                              href={"https://www.prisma.io/community/"}
                              titleOnlyOnMobile
                              icon={"/icons/Icon-Community"}
                              title={"Community"}
                              subtitle={"Join the growing Prisma community"}
                            />
                          </Panel>
                        }
                      />

                      <NavItem
                        title={"Use Cases"}
                        dropdown={
                          <Panel width={441}>
                            <IconLink
                              href={"https://www.prisma.io/showcase"}
                              titleOnlyOnMobile
                              icon={"/icons/Icon-CustomerStories"}
                              title={"Customer Stories"}
                              subtitle={
                                "Learn about applications built with Prisma"
                              }
                            />
                            <Spacer height={15} />
                            <IconLink
                              href={"https://www.prisma.io/prisma-enterprise"}
                              titleOnlyOnMobile
                              icon={"/icons/Icon-Enterprise"}
                              title={"Enterprise"}
                              subtitle={
                                "Up-level your Applications with our Data Platform"
                              }
                            />
                          </Panel>
                        }
                      />

                      <NavItem
                        title={"Company"}
                        dropdown={
                          <Panel width={621}>
                            <div className="company-dropdown-container">
                              <div className="company-links">
                                <Link href={"https://www.prisma.io/about"}>
                                  About
                                </Link>
                                <Link href={"https://www.prisma.io/blog"}>
                                  Blog
                                </Link>
                                {/* <Link href={"#"}>Vision</Link> */}
                                <Link href={"https://www.prisma.io/jobs"}>
                                  Careers <Label>We&apos;re Hiring</Label>
                                </Link>
                                <Link href={"https://www.prisma.io/events"}>
                                  Events
                                </Link>
                                {/* <Link href={"#"}>Press & Media</Link> */}
                                <Link
                                  href={
                                    "https://prismaio.notion.site/Prisma-Causes-0c9e1ddc0f5942edaba355692cfee69f"
                                  }
                                >
                                  Causes
                                </Link>
                              </div>

                              <VerticalDivider />

                              <div className="articles">
                                <ArticlesHeader>
                                  Latest from the blog
                                </ArticlesHeader>

                                <ArticleLink
                                  href={
                                    "https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0"
                                  }
                                  image={
                                    <img
                                      src="/header/blogpost1.png"
                                      alt="Landscape picture"
                                      width={148}
                                      height={83}
                                    />
                                  }
                                  title={
                                    "Building a REST API with NestJS and Prisma"
                                  }
                                />

                                <ArticleLink
                                  href={
                                    "https://www.prisma.io/blog/cockroach-ga-5JrD9XVWQDYL"
                                  }
                                  image={
                                    <img
                                      src="/header/blogpost2.png"
                                      alt="Landscape picture"
                                      width={148}
                                      height={83}
                                    />
                                  }
                                  title={
                                    "Prisma Support for CockroachDB Is Production Ready"
                                  }
                                />
                              </div>
                            </div>
                          </Panel>
                        }
                      />
                    </NavItemsContainer>

                    <div
                      className={
                        "header-cta-container" +
                        (mobileOpen ? "" : " hidden-on-mobile")
                      }
                    >
                      <ButtonLink
                        href={
                          "https://www.prisma.io/docs/getting-started/quickstart"
                        }
                      >
                        Get Started
                      </ButtonLink>
                    </div>
                  </NavBarInner>
                </Container>
              </div>
            </>
          )}
        </NavBarContext.Consumer>
      </NavBar>
    </HeaderWrapper>
  )
}

export { WebsiteHeader }
