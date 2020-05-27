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
import GameDescription from "./GameDescription";
import GameActiveStreams from "./GameActiveStreams";

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
      marginBottom: "25px",
      maxWidth: "90vw",
      maxHeight: "65vh",
      [theme.breakpoints.up("md")]: {
        maxWidth: "40vw",
      },
      backgroundColor: theme.palette.primary.dark,
    },
    gameDescription: {
      maxWidth: "80vw",
      [theme.breakpoints.up("md")]: {
        maxWidth: "40vw",
      },
    },
    topStreamers: {},
  })
);

const GameInfo = () => {
  const classes = useStyles();
  const game = useSelector((state: State) => state.gameInfo);

  const { name, appdetails, top_streamers } = game;

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
      {appdetails?.detailed_description ? (
        <div className={classes.gameDescription}>
          <GameDescription gameDescription={appdetails?.detailed_description} />
        </div>
      ) : null}
      {top_streamers ? (
        <div className={classes.topStreamers}>
          <GameActiveStreams topStreams={top_streamers} />
        </div>
      ) : null}
    </Container>
  );
};

export default GameInfo;
