import React from "react";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";

interface StreamProps {
  viewer_count: string;
  streamer_id: string;
  user_name: string;
  thumbnail_url: string;
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    streamContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.dark,
      marginBottom: "15px",
      padding: "10px",
    },
    innerContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: "100%",
    },
    streamInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "90%",
      maxWidth: "90%",
    },
    viewerCount: {
      color: theme.palette.error.main,
    },
    userName: {},
    thumbnail: {
      marginLeft: "15px",
    },
    title: {
      minWidth: "80%",
      maxWidth: "80%",
      maxHeight: "1.5em",
      overflow: "hidden",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
    watchNowButton: {
      marginTop: "10px",
    },
  })
);

const GameActiveStreams = (props: { topStreams: StreamProps[] }) => {
  const classes = useStyles();
  const { topStreams } = props;

  return (
    <div>
      {topStreams.map((stream) => {
        return (
          <a
            href={"https://www.twitch.tv/" + stream.user_name}
            target="_blank"
            className={classes.link}
          >
            <div className={classes.streamContainer}>
              <div className={classes.innerContainer}>
                <div className={classes.thumbnail}>
                  <img
                    src={stream.thumbnail_url
                      .replace(/{width}/, "80")
                      .replace(/{height}/, "60")}
                  />
                </div>
                <div className={classes.streamInfo}>
                  <div className={classes.title}>{stream.title}</div>
                  <div className={classes.viewerCount}>
                    {stream.viewer_count}
                  </div>
                </div>
              </div>
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                className={classes.watchNowButton}
              >
                Watch now!
              </Button>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default GameActiveStreams;
