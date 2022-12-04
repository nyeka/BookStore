import { Box, IconButton, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { sliceActions } from "../../store/create-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";

interface IAdd {
  id: string;
  name: string;
  price: number;
  image: any;
  author: string;
  quantity: number;
  totalPrice: number;
}

const Cart = () => {
  const item = useSelector((state: any) => state.cart.cartitem);
  let IDR = Intl.NumberFormat("en-US");
  let total: number = 0;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  item.forEach((item: any) => {
    total += item.totalPrice;
  });

  const removeHandler = (id: any) => {
    dispatch(sliceActions.removeItem(id));
  };

  const addHandler = ({ id, name, price, author, totalPrice, image }: IAdd) => {
    dispatch(
      sliceActions.addTocart({ id, name, price, author, totalPrice, image })
    );
  };

  const navigateCheckout = () => {
    navigate(`/checkout/${auth.currentUser?.uid}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        gap: "24px",
      }}
    >
      <Typography variant="h3">Your Cart</Typography>
      {item.length === 0 ? (
        <Box>
          <Typography variant="h4">Your Cart is Empty</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              gap: "16px",
            }}
          >
            {item.map((item: any, index: any) => {
              const { id, name, price, author, image, quantity, totalPrice } =
                item;
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    padding: "24px 16px",
                    gap: "34px",
                    backgroundColor: colors.primary[400],
                    borderRadius: "8px",
                  }}
                >
                  <Box display="flex" gap="10px">
                    <img
                      src={item.image && item.image.smallThumbnail}
                      alt={item.title}
                      style={{
                        width: "70px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          width: "200px",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.redAccent[400],
                        }}
                      >
                        {item.author}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>IDR {IDR.format(item.price)}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => removeHandler(item.id)}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      onClick={() =>
                        addHandler({
                          id,
                          name,
                          price,
                          author,
                          totalPrice,
                          quantity,
                          image,
                        })
                      }
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.redAccent[400],
                      }}
                    >
                      IDR {IDR.format(item.totalPrice)}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      height: "40px",
                      alignSelf: "center",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              height: "fit-content",
              padding: "24px 16px",
              width: "400px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: "16px",
              }}
            >
              Cart Information
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Total Item: </Typography>
              <Typography>{item.length}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Fee Tax: </Typography>
              <Typography>{IDR.format(total / 10)}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Total Price:</Typography>
              <Typography>IDR {IDR.format(total + total / 10)}</Typography>
            </Box>
            <Box
              onClick={navigateCheckout}
              sx={{
                marginTop: "24px",
                backgroundColor: colors.blueAccent[400],
                padding: "14px 0",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#fff !important",
                }}
              >
                CheckOut
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
