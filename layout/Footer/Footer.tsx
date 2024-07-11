/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";

const FooterWrap = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  background: ${primaryColors?.black};
  padding: 10px 0;
  &.footerWrapMainS {
    transform: translateY(100%);
    transition: transform 0.3s ease;
    @media (max-width: 1199px) {
      transform: inherit;
    }
    &.active {
      transform: translateY(0);
      @media (max-width: 1199px) {
        transform: inherit;
      }
    }
  }

  .ftr-wrapper {
    text-align: center;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center; */
    > * {
      @media (max-width: 599px) {
        flex-basis: 100%;
        max-width: 100%;
      }
    }
  }
  .copyrttxtr {
    color: ${primaryColors?.primary1};
    font-size: 12px;
  }
  .listedNavitem {
    display: inline-block;
    margin-left: 30px;
    @media (max-width: 599px) {
      margin: 0;
      margin-top: 3px;
      display: block;
    }
    ul {
      padding: 0;
      margin: 0;
      li {
        padding: 0;
        margin: 0;
        font-size: 12px;
        line-height: 1.3;
        width: auto;
        display: inline-block;
        margin-left: 10px;
        &:first-child {
          margin-left: 0;
        }
        a {
          color: ${primaryColors?.primary1};
          &:hover {
            color: ${primaryColors?.primary};
          }
        }
      }
    }
  }
`;

const navItems = [
  {
    name: "Terms & Conditions",
    route: "https://beamit.space/terms.pdf"
  }
];

const Footer = () => {
  const router = useRouter();

  return (
    <FooterWrap className="footerWrapMainS">
      <Container fixed>
        <Box className="ftr-wrapper">
          <small className="copyrttxtr">
            © 2024 STARBREEDER PTE. LTD., Singapore
          </small>

          <Box className="listedNavitem">
            <List>
              {navItems.map((item, index) => (
                <ListItem key={index}>
                  <Link href={item?.route} target="_blank">
                    {item?.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </FooterWrap>
  );
};

export default Footer;
