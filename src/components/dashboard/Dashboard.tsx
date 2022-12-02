import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Rating from "@mui/material/Rating";
import useGetData from "../../Hooks/useGetData";
import ListBooks from "../Booktemplate/Template";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const url = "Harry+Potter";
  const api = `https://www.googleapis.com/books/v1/volumes?q=${url}&key=${process.env.REACT_APP_TOKEN}`;
  const Best = `https://www.googleapis.com/books/v1/volumes?q=atomic-habit&key=${process.env.REACT_APP_TOKEN}`;
  const { data } = useGetData({ api });
  const { data: freedata } = useGetData({ api: Best });


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Typography variant="h4">We recomend</Typography>
      <Box
        sx={{
          display: "flex",
          backgroundColor: colors.primary[400],
          padding: "16px",
          borderRadius: "7px",
          gap: "20px",
        }}
      >
        <img
          style={{
            width: "200px",
            height: "340px",
            boxShadow: "0px 10px 10px 0px rgba(0,0,0,0.75)",
          }}
          src="http://i2.wp.com/geekdad.com/wp-content/uploads/2013/02/HP1-Kibuishi.jpg"
          alt="harry potter"
        />
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
            }}
          >
            Harry Potter and the Prisoner of Azkaban
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "4px",
            }}
          >
            <span>By</span>
            <Typography
              variant="h4"
              sx={{
                color: colors.redAccent[400],
              }}
            >
              Philosopher’s Stone
            </Typography>
          </Box>
          <Rating
            name="size-medium"
            defaultValue={2}
            sx={{
              color: colors.redAccent[400],
              marginBottom: "10px",
            }}
          />
          <Typography>HARDCOVER</Typography>
          <p>
            On his 11th birthday Harry discovers that his parents were a witch
            and a wizard and that he, a wizard himself, has been invited to
            attend Hogwarts School of Witchcraft and Wizardry. He also learns
            that his parents had not perished in a car accident, as his aunt and
            uncle had told him, but that they instead had been murdered by an
            evil wizard named Voldemort. Harry was the only person to have ever
            survived an attack by Voldemort—by somehow rebounding the latter’s
            “killing curse”—which left him with a lightning-bolt-shaped scar on
            his forehead. Indeed, Harry’s mysterious survival had all but killed
            Voldemort, who was left disembodied, and the young boy was thus
            already a celebrated figure in the “wizarding” community. At
            Hogwarts Harry becomes fast friends with classmates Ron Weasley and
            Hermione Granger and finds a rival in Draco Malfoy. He is taken
            under the wing of the school’s headmaster, Albus Dumbledore. These
            relationships persist throughout the series, especially as the young
            wizards and witches grow older and are called upon to take sides in
            a growing wizard war.
          </p>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}
          >
            $ 10.00
          </Typography>
        </Box>
      </Box>
      {data && (
        <Box
          sx={{
            marginTop: "70px",
          }}
        >
          <Typography variant="h4">Best sellers</Typography>
          <Box
            sx={{
              display: "flex",
              marginTop: "20px",
              flexFlow: "row wrap",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <ListBooks data={freedata} />
          </Box>
        </Box>
      )}
      {freedata && (
        <Box
          sx={{
            marginTop: "70px",
          }}
        >
          <Typography variant="h4">Best Free-Ebooks</Typography>
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
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
