import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardMedia, CardActions, CardContent, Button, Typography, Link } from "@material-ui/core";
import GithubData from "../models/githubData";

interface CardProps {
  cardData: GithubData;
  goToDetailPage: () => void;
}

export default function GithubCard(props: CardProps) {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => props.goToDetailPage()}>
        <CardMedia className={classes.media} image={props.cardData.avatar_url} title={props.cardData.login} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.cardData.login}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {"Repos:" + props.cardData.public_repos}
            {"Followers:" + props.cardData.followers}
            {"Following:" + props.cardData.following}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        {/* <Link  onClick={preventDefault}> */}
        <Button size="small" color="primary">
          <a href={props.cardData.html_url}>Visit Profile</a>
        </Button>
        {/* </Link> */}
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
});
