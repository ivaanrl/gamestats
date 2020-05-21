import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers";
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Typography,
} from "@material-ui/core";

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

const GameInfo = () => {
  const classes = useStyles();
  const game = useSelector((state: State) => state.gameInfo);

  const { name } = game;

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" color="secondary">
        {name}
      </Typography>
    </Container>
  );
};

export default GameInfo;
