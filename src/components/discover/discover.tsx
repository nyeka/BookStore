import {
  Box,
  Container,
  Typography,
  InputBase,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../../theme";
import Axios from "axios";
import Template from "../Booktemplate/Template";

const Discover = () => {
  const [val, setVal] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchdata = async () => {
    const url = val;
    const api = `https://www.googleapis.com/books/v1/volumes?q=${url}&key=${process.env.REACT_APP_TOKEN}`;
    try {
      setLoading(true);
      const response = await Axios.get(api);
      setData(response.data.items);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box
        display="flex"
        borderRadius="3px"
        width="300px"
        sx={{
          backgroundColor: colors.primary[400],
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={fetchdata}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Typography variant="h6">Find your next favorite book</Typography>
      {loading ? (
        <CircularProgress
          sx={{
            color: colors.redAccent[400],
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            marginTop: "20px",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {data.map((item, index) => {
            const { title, authors, imageLinks, averageRating } =
              item.volumeInfo;
            const { listPrice } = item.saleInfo;
            return (
              <Template
                key={index}
                title={title}
                authors={authors}
                imageLinks={imageLinks}
                averageRating={averageRating}
                listPrice={listPrice && listPrice.amount}
              />
            );
          })}
        </Box>
      )}
    </Container>
  );
};

export default Discover;
