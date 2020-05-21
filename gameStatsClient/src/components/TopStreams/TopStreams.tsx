import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../reducers";
import allActions from "../../actions";
import GamePreview from "../GamePreview/GamePreview";
import { makeStyles, Theme, createStyles, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "80px",
    },
    isLoading: { marginTop: "20px" },
  })
);

const TopStreams = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const topStreams = useSelector((state: State) => state.games);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(allActions.getTopStreams());
  }, [dispatch]);

  useEffect(() => {
    if (topStreams.length !== 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    console.log(isLoading);
  }, [topStreams]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      {isLoading ? (
        <CircularProgress color="secondary" className={classes.isLoading} />
      ) : null}
      {topStreams.map((game) => {
        const {
          appid,
          name,
          currentPlayers,
          twitch_id,
          twitch_name,
          twitch_box_art_url,
          viewer_count,
          thumbnail_url,
          top_streamer,
          appdetails,
        } = game;
        return (
          <GamePreview
            appid={appid}
            name={name}
            currentPlayers={currentPlayers}
            twitch_id={twitch_id}
            twitch_name={twitch_name}
            twitch_box_art_url={twitch_box_art_url}
            viewer_count={viewer_count}
            thumbnail_url={thumbnail_url}
            top_streamer={top_streamer}
            appdetails={appdetails}
          />
        );
      })}
    </Container>
  );
};

export default TopStreams;
