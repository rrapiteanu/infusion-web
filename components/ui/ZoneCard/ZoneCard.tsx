import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { withApollo } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";

import styled from "styled-components";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  card: {
    maxWidth: 345,
    margin: 20
  }
});

const Footer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const Available = styled.div`
  background: #a000ff;
  padding: 5px 15px;
  border-radius: 5px;
  display: flex;
`;

const AvailableText = styled.p`
  margin: 0;
  color: white;
`;

class ZoneCard extends React.Component<any, any> {
  render() {
    const { name, address, thumbnailUrl, classes } = this.props;
    return (
      <Grid item>
        <Card
          className={classes.card}
          onClick={() => {
            Router.push(`/zone/${this.props.id}`);
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              style={{ height: 220 }}
              image={thumbnailUrl}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Footer>
                <Typography variant="body2" color="textSecondary" component="p">
                  {address}
                </Typography>
                <Available>
                  <AvailableText>Available</AvailableText>
                </Available>
              </Footer>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(withApollo(ZoneCard));
