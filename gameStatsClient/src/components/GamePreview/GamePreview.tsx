import React from "react";
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
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import allActions from "../../actions";

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
      flexBasis: "90%",
      marginRight: "20px",
      marginBottom: "20px",
      [theme.breakpoints.up("md")]: {
        flexBasis: "30%",
      },
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
      display: "block",
      height: "80px",
      maxHeight: "80px",
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
    cardActions: {
      display: "flex",
      justifyContent: "flex-end",
      paddingRight: "20px",
      borderTop: `1px solid ${theme.palette.primary.light}`,
    },
  })
);

const GamePreview = (props: GamePreviewProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, currentPlayers, twitch_name, viewer_count, appdetails } = props;

  const { header_image, short_description } = appdetails;

  const handleClick = () => {
    dispatch(allActions.addGameInfo(props));
    history.push("/gameInfo/" + name.replace(/ /g, "+"));
  };

  return (
    <Card className={classes.root} onClick={handleClick}>
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
                {currentPlayers.toLocaleString()}
              </Typography>
            </div>
            {viewer_count !== null ? (
              <div className={classes.currentViewers}>
                <Typography variant="body2" color="textPrimary" component="p">
                  Current viewers
                </Typography>
                <Typography variant="body2" color="error" component="p">
                  {viewer_count.toLocaleString()}
                </Typography>
              </div>
            ) : null}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={handleClick}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default GamePreview;
