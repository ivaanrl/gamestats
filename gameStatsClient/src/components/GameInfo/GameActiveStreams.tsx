import React from "react";
import classes from "*.module.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: theme.palette.primary.dark,
    },
    streamInfo: {
      display: "flex",
      flexDirection: "column",
    },
    viewerCount: {
      color: theme.palette.error.main,
    },
    userName: {},
    thumbnail: {},
    link: {
      textDecoration: "none",
      color: "inherit",
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
              <div className={classes.thumbnail}>
                <img
                  src={stream.thumbnail_url
                    .replace(/{width}/, "80")
                    .replace(/{height}/, "60")}
                />
              </div>
              <div className={classes.streamInfo}>
                <div className={classes.userName}>{stream.user_name}</div>
                <div className={classes.userName}>{stream.title}</div>
                <div className={classes.viewerCount}>{stream.viewer_count}</div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default GameActiveStreams;
