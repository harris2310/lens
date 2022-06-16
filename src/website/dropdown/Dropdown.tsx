import styled from "styled-components"
import React, { AnchorHTMLAttributes } from "react"
import { theme } from "../../theme"

export const Panel = styled.div<{ width?: number }>`
  width: ${(p) => p.width || 407}px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: ${theme.space["20"]} 0 ${theme.space["20"]};
  background-color: ${theme.colors.gray100};
  @media only screen and (min-width: 940px) {
    background-color: white;
  }
`

export const SectionHeader = styled.h4`
  color: ${theme.colors.gray600};
  font-family: ${theme.fonts.display};
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1;
  text-transform: uppercase;
  margin: 0;
  margin-top: ${33 / 16}rem;
  margin-bottom: ${theme.space["16"]};
  padding: 0 ${theme.space["24"]};
  color: ${theme.colors.gray600};
  @media only screen and (min-width: 940px) {
    padding: 0 ${theme.space["32"]};
    color: ${theme.colors.gray600};
  }
  &:first-child {
    margin-top: ${theme.space["12"]};
  }
`

export const ArticlesHeader = styled.h4`
  color: ${theme.colors.gray600};
  font-family: ${theme.fonts.display};
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1;
  text-transform: uppercase;
  margin-top: 12px;
  margin-bottom: 32px;
`

export const Link = styled.a`
  text-decoration: none;
  font-weight: 600;
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes[14]};
  color: ${theme.colors.gray800};
  line-height: 1;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 15px 24px;
  transition: color 0.1s ease;
  font-weight: 500;
  color: ${theme.colors.gray800};
  @media only screen and (min-width: 940px) {
    padding: 12px 12px;
    font-weight: 600;
    color: ${theme.colors.gray800};
  }
  &:hover {
    @media only screen and (min-width: 940px) {
      color: ${theme.colors.indigo600};
    }
  }
`

const IconLinkStyles = styled.a<{ titleOnlyOnMobile: boolean }>`
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: start;
  text-decoration: none;

  padding: ${theme.space["16"]} ${theme.space["24"]} ${theme.space["16"]}
    ${theme.space["24"]};
  @media only screen and (min-width: 940px) {
    padding: ${theme.space["12"]} ${theme.space["16"]} ${theme.space["12"]}
      ${theme.space["32"]};
    margin-bottom: ${theme.space["8"]};
  }

  &:last-child {
    margin-bottom: 0;
  }

  .link-icon {
    flex-shrink: 0;
    transition: background-color 0.1s ease;
    background-color: ${theme.colors.gray100};
    border-radius: 5px;
    width: 38px;
    height: 38px;
    display: none;
    @media only screen and (min-width: 940px) {
      display: flex;
    }
  }
  .link-title {
    transition: color 0.1s ease;
    line-height: 1;
    color: ${theme.colors.gray800};
    margin-bottom: ${(p) => (p.titleOnlyOnMobile ? 0 : theme.space["4"])};
    font-weight: ${(p) => (p.titleOnlyOnMobile ? 500 : 600)};
    @media only screen and (min-width: 940px) {
      color: ${theme.colors.gray800};
      font-weight: 600;
      margin-bottom: ${theme.space["4"]};
    }
  }
  .link-subtitle {
    transition: color 0.1s ease;
    font-weight: 400;
    line-height: ${18 / 14};
    font-size: 12.25px;
    display: ${(p) => (p.titleOnlyOnMobile ? "none" : "initial")};
    color: ${theme.colors.gray600};
    @media only screen and (min-width: 940px) {
      color: ${theme.colors.gray600};
      display: initial;
    }
  }

  &:hover {
    @media only screen and (min-width: 940px) {
      .link-icon {
        background-color: ${theme.colors.indigo100};
      }
      .link-title {
        color: ${theme.colors.indigo600};
      }
      .link-subtitle {
        color: ${theme.colors.indigo400};
      }
    }
  }
`

const LinkTitle = styled.div`
  text-decoration: none;
  font-weight: 600;
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes[14]};
  color: ${theme.colors.gray800};
  line-height: 1;
`
type IconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  icon: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  titleOnlyOnMobile?: boolean
}
export const IconLink = ({
  href,
  icon,
  title,
  subtitle,
  titleOnlyOnMobile = false,
  ...rest
}: IconLinkProps) => {
  return (
    <IconLinkStyles {...rest} titleOnlyOnMobile={titleOnlyOnMobile} href={href}>
      <div className="link-icon">
        <img src={`/header${icon}.svg`} />
      </div>
      <div>
        <LinkTitle className="link-title">{title}</LinkTitle>
        <div className="link-subtitle">{subtitle}</div>
      </div>
    </IconLinkStyles>
  )
}

const ArticleLinkStyles = styled.a`
  display: flex;
  gap: 18px;
  margin-bottom: 32px;
  text-decoration: none;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
  .article-image {
    flex-shrink: 0;
    width: 148px;
    img {
      border-radius: 8px;
    }
  }
  p {
    transition: color 0.1s ease;
    margin: 0;
  }
  &:hover {
    p {
      color: ${theme.colors.indigo600};
    }
  }
`
const ArticleTitle = styled.p`
  font-weight: 500;
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes[14]};
  line-height: 1.3;
  color: ${theme.colors.gray600};
`
type ArticleLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  image: React.ReactNode
  title: React.ReactNode
}
export const ArticleLink = ({ image, title, ...rest }: ArticleLinkProps) => {
  return (
    <ArticleLinkStyles {...rest}>
      <div className="article-image">{image}</div>
      <ArticleTitle>{title}</ArticleTitle>
    </ArticleLinkStyles>
  )
}

export const HorizontalDivider = styled.div`
  height: 1px;
  margin: ${theme.space["24"]} ${theme.space["32"]} ${theme.space["32"]};
  background-color: ${theme.colors.gray300};
  display: none;
  @media only screen and (min-width: 940px) {
    display: block;
  }
`

export const VerticalDivider = styled.div`
  width: 1px;
  background-color: ${theme.colors.gray300};
  margin: ${theme.space["12"]} 0;
  display: none;
  @media only screen and (min-width: 940px) {
    display: block;
  }
`

export const Spacer = styled.div<{ height?: number; width?: number }>`
  display: none;
  height: ${(p) => p.height + "px" || "initial"};
  width: ${(p) => p.width + "px" || "initial"};
  @media only screen and (min-width: 940px) {
    display: block;
  }
`
