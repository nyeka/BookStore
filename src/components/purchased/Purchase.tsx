import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { tokens } from "../../theme";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Purchase = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState<any[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  let IDR = Intl.NumberFormat("en-US");

  useEffect(() => {
    const getAddress = async () => {
      try {
        setloading(true);
        const snap = await getDocs(collection(db, "purchased"));
        setData(snap.docs.map((doc) => ({ ...doc.data() })));
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    };
    getAddress();
  }, []);

  const addressFilter = data.filter(
    (item) => item.uid === auth.currentUser?.uid
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="24px"
      sx={{
        padding: "24px",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
        }}
      >
        Books That You've purchased
      </Typography>
      {addressFilter.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "34px",
          }}
        >
          {addressFilter.map((item) => {
            const { purchased } = item;
            return (
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                {purchased.map((item: any) => {
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
                          src={item.image && item.image.smallThumbnail}
                          alt={item.name}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            marginTop: "10px",
                          }}
                        >
                          {item.name}
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
                            {item.author}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        IDR {IDR.format(item.price)}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box>
          {!loading && (
            <Typography variant="h6">
              You haven't purchased any books yet
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Purchase;
