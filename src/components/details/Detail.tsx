import { useLocation } from "react-router-dom";
import { Box, Typography, useTheme, Rating } from "@mui/material";
import { tokens } from "../../theme";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { sliceActions } from "../../store/create-slice";
import HouseIcon from "@mui/icons-material/House";

const Detail = () => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  let IDR = Intl.NumberFormat("en-US");

  const {
    title,
    listPrice,
    authors,
    publisher,
    publishedDate,
    printType,
    pageCount,
    imageLinks,
    description,
    subtitle,
    averageRating,
    saleability,
    downloadLink,
    infoLink,
    id,
  } = location.state;

  const addToCart = () => {
    dispatch(
      sliceActions.addTocart({
        id,
        name: title,
        price: listPrice && listPrice.amount,
        image: imageLinks,
        author: authors[0],
      })
    );
  };

  console.log(downloadLink);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "24px 16px",
      }}
    >
      <Box>
        <Box display="flex" flexDirection="column" gap="24px">
          <Typography
            variant="h3"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>

          <Box>
            <Typography
              sx={{
                color: colors.blueAccent[400],
              }}
            >
              {authors}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Typography>{publishedDate}</Typography>
              <Typography>{publisher}</Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            sx={{
              gap: "32px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <LibraryBooksIcon />
              <Typography>{printType}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Typography>{pageCount}</Typography>
              <Typography>Pages</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <HouseIcon />
              <Typography>Eligble</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            {saleability === "FOR_SALE" ? (
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: colors.blueAccent[400],
                  borderRadius: "4px",
                  width: "fit-content",
                  padding: "8px 16px",
                }}
              >
                <Typography
                  sx={{
                    color: "white !important",
                  }}
                >
                  IDR {listPrice && IDR.format(listPrice.amount)} Buy
                </Typography>
              </Box>
            ) : saleability === "NOT_FOR_SALE" ? (
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: colors.blueAccent[400],
                  borderRadius: "4px",
                  width: "fit-content",
                  padding: "8px 16px",
                }}
              >
                <a href={infoLink} target="_blank" rel="noreferrer">
                  <Typography
                    sx={{
                      color: "white !important",
                    }}
                  >
                    See Books
                  </Typography>
                </a>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: colors.blueAccent[400],
                  borderRadius: "4px",
                  width: "fit-content",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                <a href={downloadLink} target="_blank" rel="noreferrer">
                  <Typography
                    sx={{
                      color: "white !important",
                    }}
                  >
                    Download
                  </Typography>
                </a>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                borderRadius: "4px",
                width: "fit-content",
                padding: "8px 16px",
                border: `1px solid ${colors.blueAccent[400]}`,
              }}
            >
              <Typography>Preview</Typography>
            </Box>
            {saleability === "FOR_SALE" && (
              <Box
                sx={{
                  display: "flex",
                  borderRadius: "4px",
                  gap: "8px",
                  width: "fit-content",
                  padding: "8px 16px",
                  border: `1px solid ${colors.blueAccent[400]}`,
                  cursor: "pointer",
                }}
                onClick={addToCart}
              >
                <ShoppingCartIcon />
                <Typography>Add To Cart</Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "34px",
              gap: "16px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              More About This Book
            </Typography>
            <Typography>{subtitle}</Typography>
            <Box dangerouslySetInnerHTML={{ __html: description }}></Box>
          </Box>
          <Box
            sx={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Rate This Book
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                }}
              >
                Tell Us What You Think
              </Typography>
              <Rating
                name="size-large"
                defaultValue={averageRating}
                sx={{
                  color: colors.redAccent[400],
                  margin: "10px 0",
                }}
                precision={0.5}
                size="large"
              />
            </Box>
            <Box
              sx={{
                backgroundColor: colors.blueAccent[400],
                display: "flex",
                padding: "8px 16px",
                borderRadius: "4px",
                color: "white !important",
              }}
            >
              <Typography>Write a review</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          paddingRight: "46px",
          width: "220px",
        }}
      >
        <img
          src={imageLinks && imageLinks.smallThumbnail}
          alt="ini gambar"
          style={{
            width: "150px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default Detail;
