import { Box, Typography, Rating, useTheme } from "@mui/material";
import { tokens } from "../../theme";

interface IProps {
  title: string;
  authors: string;
  listPrice: any;
  imageLinks: any;
  averageRating: number;
}

const Template = ({
  title,
  authors,
  listPrice,
  imageLinks,
  averageRating,
}: IProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        width: "200px",
        borderRadius: "7px",
        boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <img
        style={{
          width: "170px",
          height: "200px",
        }}
        src={imageLinks && imageLinks.smallThumbnail}
        alt="hary potah"
      />
      <Typography
        variant="h6"
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "4px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
          }}
        >
          By
        </span>
        <Typography
          variant="h6"
          sx={{
            color: colors.redAccent[400],
            fontSize: "13px",
          }}
        >
          {authors}
        </Typography>
      </Box>
      <Rating
        name="size-medium"
        defaultValue={averageRating}
        sx={{
          color: colors.redAccent[400],
          margin: "10px 0",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        {listPrice && listPrice.amount}
      </Typography>
    </Box>
  );
};

export default Template;
