import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

export const BreadcrumbsWrapper = ({
  path,
}: {
  path: {
    label: string;
    to?: string;
  }[];
}) => {
  return (
    <Box padding={1}>
      <Breadcrumbs>
        <Link underline="hover" component={RouterLink} to="/">
          Dashboard
        </Link>

        {path.map((item, index) =>
          item.to ? (
            <Link
              key={`item-${index}`}
              underline="hover"
              component={RouterLink}
              to={item?.to ?? "#"}
            >
              {item.label}
            </Link>
          ) : (
            <Typography key={`item-${index}`}>{item.label}</Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
};
