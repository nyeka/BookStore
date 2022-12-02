import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Cart = () => {
  const item = useSelector((state: any) => state.cart.cartitem);
  let IDR = Intl.NumberFormat("en-US");
  let total: number = 0;

  item.forEach((item: any) => {
    total += item.totalPrice;
  });

  return (
    <Box>
      <Typography variant="h3">Your Cart</Typography>
      {item.map((item: any, index: any) => {
        return (
          <Box key={index}>
            <Typography>{item.name}</Typography>
            <Typography>{item.price}</Typography>
          </Box>
        );
      })}
      <Typography>{IDR.format(total)}</Typography>
    </Box>
  );
};

export default Cart;
