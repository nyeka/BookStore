import { Box, Typography, Rating, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

interface IProps {
  data: any[];
}

const ListBooks = ({ data }: IProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  let IDR = Intl.NumberFormat("en-US");

  const handler = (
    id: string,
    title: string,
    authors: string,
    listPrice: number,
    averageRating: number,
    imageLinks: any,
    webReaderLink: string,
    publisher: string,
    publishedDate: string,
    printType: string,
    pageCount: number,
    description: string,
    subtitle: string
  ) => {
    navigate(`/details/${title.replace(/ /g, "-")}`, {
      state: {
        id,
        title,
        authors,
        listPrice,
        averageRating,
        imageLinks,
        webReaderLink,
        publisher,
        publishedDate,
        printType,
        pageCount,
        description,
        subtitle,
      },
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
        const {
          title,
          authors,
          imageLinks,
          publishedDate,
          averageRating,
          publisher,
          printType,
          pageCount,
          description,
          subtitle,
        } = item.volumeInfo;
        const { listPrice } = item.saleInfo;
        const { webReaderLink } = item.accessInfo;

        return (
          <Box
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
            <Box
              onClick={() =>
                handler(
                  item.id,
                  title,
                  authors,
                  listPrice,
                  averageRating,
                  imageLinks,
                  webReaderLink,
                  publisher,
                  publishedDate,
                  printType,
                  pageCount,
                  description,
                  subtitle
                )
              }
              sx={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
            >
              <img
                style={{
                  width: "170px",
                  height: "200px",
                }}
                src={imageLinks && imageLinks.smallThumbnail}
                alt={title}
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
            </Box>
            <Rating
              name="read-only"
              defaultValue={averageRating}
              readOnly
              sx={{
                color: colors.redAccent[400],
                margin: "10px 0",
              }}
              precision={0.5}
            />
            {listPrice && listPrice.amount && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                IDR {listPrice && IDR.format(listPrice.amount)}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ListBooks;
