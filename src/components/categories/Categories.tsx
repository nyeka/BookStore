import { Box, Typography } from "@mui/material";
import useGetData from "../../Hooks/useGetData";
import ListBooks from "../Booktemplate/Template";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Categories = () => {
  const free = `https://www.googleapis.com/books/v1/volumes?q=atomic-habit&filter=free-ebooks&key=${process.env.REACT_APP_TOKEN}`;
  const paid = `https://www.googleapis.com/books/v1/volumes?q=atomic-habit&filter=paid-ebooks&key=${process.env.REACT_APP_TOKEN}`;
  const paidbooks = `https://www.googleapis.com/books/v1/volumes?q=anime&filter=paid-ebooks&key=${process.env.REACT_APP_TOKEN}`;
  const full = `https://www.googleapis.com/books/v1/volumes?q=atomic-habit&filter=full&key=${process.env.REACT_APP_TOKEN}`;
  const urlfree = `https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=${process.env.REACT_APP_TOKEN}`;
  const { data } = useGetData({ api: free });
  const { data: paiddata, loading } = useGetData({ api: paid });
  const { data: paidbooksdata } = useGetData({ api: paidbooks });
  const { data: fulldata } = useGetData({ api: full });
  const { data: urlfreedata } = useGetData({ api: urlfree });

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
        }}
      >
        Categories
      </Typography>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {data && (
        <Box
          sx={{
            marginTop: "70px",
          }}
        >
          {!loading && <Typography variant="h4">Best Paid-Eooks</Typography>}
          <Box
            sx={{
              display: "flex",
              marginTop: "20px",
              flexFlow: "row wrap",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <ListBooks data={paiddata} />
            <ListBooks data={paidbooksdata} />
          </Box>
        </Box>
      )}
      {data && (
        <Box
          sx={{
            marginTop: "70px",
          }}
        >
          {!loading && <Typography variant="h4">Best Free-Ebooks</Typography>}
          <Box
            sx={{
              display: "flex",
              marginTop: "20px",
              flexFlow: "row wrap",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <ListBooks data={data} />
            <ListBooks data={urlfreedata} />
          </Box>
        </Box>
      )}
      {data && (
        <Box
          sx={{
            marginTop: "70px",
          }}
        >
          {!loading && (
            <Typography variant="h4">Best ViewAble Ebook</Typography>
          )}
          <Box
            sx={{
              display: "flex",
              marginTop: "20px",
              flexFlow: "row wrap",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <ListBooks data={fulldata} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Categories;
