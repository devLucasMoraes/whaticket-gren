import { styled } from "@mui/material";
import { Link } from "react-router";

const LinkStyled = styled(Link)(() => ({
  height: "75.2px",
  width: "221px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img
        src="/images/logos/dark-logo.svg"
        alt="logo"
        height={43.3}
        width={221}
      />
    </LinkStyled>
  );
};

export default Logo;
