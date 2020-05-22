import React, { useState } from "react";
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classes from "*.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gameDescriptionHeader: {
      textAlign: "center",
    },
  })
);

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const GameDescription = (props: { gameDescription: string }) => {
  const classes = useStyles();
  const { gameDescription } = props;
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string | false) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          className={classes.gameDescriptionHeader}
        >
          <Typography align="center">Description</Typography>
          <ExpandMoreIcon />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <div dangerouslySetInnerHTML={{ __html: gameDescription }} />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default GameDescription;
