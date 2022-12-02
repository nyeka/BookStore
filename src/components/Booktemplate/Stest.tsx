import { Box, Typography, Rating, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

interface IProps {
  data: any[];
}

const Stest = ({ data }: IProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handler = (
    id: string,
    title: string,
    authors: string,
    listPrice: any,
    averageRating: number,
    imageLinks: any
  ) => {
    navigate(`/details/${title.replace(/ /g, "-")}`, {
      state: { id, title, authors, listPrice, averageRating, imageLinks },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        gap: "24px",
      }}
    >
      {data.map((item: any) => {
        const { title, authors, imageLinks, averageRating } = item.volumeInfo;
        const { listPrice } = item.saleInfo;
        return (
          <Box
            onClick={() =>
              handler(
                item.id,
                title,
                authors,
                listPrice,
                averageRating,
                imageLinks
              )
            }
            key={item.id}
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
      })}
    </Box>
  );
};

export default Stest;
