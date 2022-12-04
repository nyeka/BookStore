import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { tokens } from "../../theme";
import { collection, getDocs, addDoc } from "firebase/firestore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector, useDispatch } from "react-redux";
import { sliceActions } from "../../store/create-slice";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Checkout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Address, setAddress] = useState<any[]>([]);
  const item = useSelector((state: any) => state.cart.cartitem);
  const [loading, setloading] = useState<boolean>(false);
  let IDR = Intl.NumberFormat("en-US");
  let total: number = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  item.forEach((item: any) => {
    total += item.totalPrice;
  });

  const clearCart = () => {
    dispatch(sliceActions.clearCart());
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const snap = await getDocs(collection(db, "user"));
        setAddress(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);

  const sendPurchased = async () => {
    try {
      setloading(true);
      await addDoc(collection(db, "purchased"), {
        purchased: item,
        uid: auth.currentUser?.uid,
      });
    } catch (error) {
      console.log(error);
    }
    clearCart();
    navigate("/purchased");
    setloading(false);
  };

  const addressFilter = Address.filter(
    (item) => item.uid === auth.currentUser?.uid
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h4">Checkout</Typography>
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          padding: "16px",
          borderRadius: "4px",
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          sx={{
            display: "flex",
            gap: "6px",
          }}
        >
          <LocationOnIcon
            sx={{
              color: colors.redAccent[400],
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: colors.redAccent[400],
            }}
          >
            Shipping Address
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            marginTop: "16px",
          }}
        >
          <Box display="flex" gap="26px">
            <Box
              sx={{
                fontWeight: "bold",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                {auth.currentUser?.displayName}
              </Typography>
              <Typography>{auth.currentUser?.email}</Typography>
            </Box>
            <Typography
              sx={{
                width: "700px",
              }}
            >
              {addressFilter[0]?.address}
            </Typography>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              color: colors.redAccent[400],
            }}
          >
            <Typography>Edit</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.primary[400],
            borderRadius: "8px",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            gap: "16px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: colors.redAccent[400],
            }}
          >
            Product
          </Typography>
          {item.map((item: any, index: any) => {
            const { name, price, author, image, quantity, totalPrice } = item;
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: "34px",
                }}
              >
                <Box display="flex" gap="10px">
                  <img
                    src={image && image.smallThumbnail}
                    alt={name}
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
                      {name}
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.redAccent[400],
                      }}
                    >
                      {author}
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
                  <Typography>IDR {IDR.format(price)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>{quantity}</Typography>
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
                    IDR {IDR.format(totalPrice)}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            backgroundColor: colors.primary[400],
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            width: "600px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: colors.redAccent[400],
              padding: "16px",
            }}
          >
            <Typography variant="h5">Payment Method</Typography>
            <Typography>COD (Pay on way)</Typography>
          </Box>
          <Box
            sx={{
              marginTop: "26px",
              backgroundColor: colors.primary[400],
              height: "fit-content",
              width: "inherit",
              padding: "16px",
              alignSelf: "flex-end",
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
              <Typography>Sub Total Product: </Typography>
              <Typography>IDR {IDR.format(total)}</Typography>
            </Box>
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
              sx={{
                marginTop: "24px",
                backgroundColor: colors.blueAccent[400],
                padding: "14px 0",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={sendPurchased}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#fff !important",
                }}
              >
                Buy
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
