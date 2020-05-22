import React from "react";
import "./GameInfo.css";
import { useSelector } from "react-redux";
import { State } from "../../reducers";
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Typography,
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "80px",
    },
    isLoading: { marginTop: "20px" },
    carouselContainer: {
      maxWidth: "90vw",
      maxHeight: "65vh",
      [theme.breakpoints.up("md")]: {
        maxHeight: "30vh",
        maxWidth: "40vw",
      },
      backgroundColor: theme.palette.primary.dark,
    },
  })
);

const GameInfo = () => {
  const classes = useStyles();
  const game = useSelector((state: State) => state.gameInfo);

  const { name, appdetails } = game;

  const images: JSX.Element[] = [];

  if (appdetails) {
    {
      appdetails?.screenshots?.forEach((screenshot) => {
        images.push(
          <div>
            <img src={screenshot.path_thumbnail} />
          </div>
        );
      });
    }
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" color="secondary">
        {name}
      </Typography>
      <div className={classes.carouselContainer}>
        <Carousel>{images}</Carousel>
      </div>
    </Container>
  );
};

export default GameInfo;
