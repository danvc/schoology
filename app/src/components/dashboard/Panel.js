import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme =>({
    container: {
        paddingTop: 100,
    },
  media: {
    height: 140,
  },
  button: {
    backgroundColor : "#50ade1",
    "&:hover" :{
        backgroundColor: "#1779b0"
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <CssBaseline />
        <Container className={classes.container}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardActionArea>

                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Frontend Technical Task
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                Congrats, you’ve got an api you can call, now build a front-end to show off that data. We use react with typescript. If you aren’t comfortable with typescript or react, then vue.js or angular will be fine. We will be changing this in Part 3, so pick something you are comfortable with. 
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                There is not a lot of guidance provided for this part, we are looking for an autocomplete component we could use in our site. Again, given the caveat that there is a finite time period in which you have to develop it.
                                Here you have some choices with how to spend your time. If you are great a CSS, then spend more time making it look very good. If your skills lay elsewhere, then just do a minimal job styling and show off in your stronger area.
                            </Typography>
                                
                            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                Again, be sure a Schoology employee has a document showing them the exact steps they’d need to use to get your auto-complete up and running on their machine. This means hitting a url in their browser to return data to the UI.
                            </Typography>
                                

                                
                                

                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary"  variant="contained" disableElevation className={classes.button}>
                                Submit Assignment
                            </Button>
                        </CardActions>
                    </Card>                    
                </Grid>
            </Grid>
        </Container>
    </React.Fragment>      

  );
}