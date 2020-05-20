import React from "react";
import Paper from "@material-ui/core/Paper";
import { gameDetails } from "../../reducers/games.reducer";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import classes from "*.module.css";

export interface GamePreviewProps {
  appid: number;
  name: string;
  currentPlayers: number;
  twitch_id: string | null;
  twitch_name: string | null;
  twitch_box_art_url?: string | null | undefined;
  viewer_count: string | number | null;
  thumbnail_url?: string | undefined;
  top_streamer?:
    | {
        viewer_count: string;
        streamer_id: string;
      }
    | undefined;
  appdetails: gameDetails;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexBasis: "20%",
      marginRight: "20px",
      marginBottom: "20px",
    },
    name: {
      lineHeight: "1.5em",
      height: "1.5em",
      overflowX: "scroll",
      overflowY: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        width: "0",
        height: "0",
      },
    },
    shortDescription: {
      height: "100px",
      maxHeight: "100px",
      overflow: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        width: "0",
        height: "0",
      },
    },
    playersInfo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop: "10px",
    },
    currentPlayers: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      padding: "7px",
      borderRadius: "5px",
    },
    currentViewers: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.palette.primary.main,
      padding: "7px",
      borderRadius: "5px",
    },
  })
);

const GamePreview = (props: GamePreviewProps) => {
  const classes = useStyles();
  const { name, currentPlayers, twitch_name, viewer_count, appdetails } = props;

  const { header_image, short_description } = appdetails;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={header_image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            color="secondary"
            className={classes.name}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            className={classes.shortDescription}
          >
            {short_description}
          </Typography>
          <div className={classes.playersInfo}>
            <div className={classes.currentPlayers}>
              <Typography variant="body2" color="textPrimary" component="p">
                Current players
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
                {currentPlayers}
              </Typography>
            </div>
            <div className={classes.currentViewers}>
              <Typography variant="body2" color="textPrimary" component="p">
                Current viewers
              </Typography>
              <Typography variant="body2" color="error" component="p">
                {viewer_count}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" variant="outlined">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default GamePreview;
