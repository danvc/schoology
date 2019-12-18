import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NewReleases from '@material-ui/icons/NewReleases';
import School from '@material-ui/icons/School';
import Assessment from '@material-ui/icons/Assessment';
import Book from '@material-ui/icons/Book';
import Event from '@material-ui/icons/Event';

// define sthe drawer with
const drawerWidth = 240;

// css definitions
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    iconColor: {
        color: '#50ade1'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}));

/**
 * Renders the drawer (left panel) with few items 
 */
export default function AppDrawer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}>
            <div className={classes.toolbar} />
            <List>
                <ListItem button>
                    <ListItemIcon><Book className={classes.iconColor} /></ListItemIcon>
                    <ListItemText primary="Materials" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><NewReleases className={classes.iconColor}/></ListItemIcon>
                    <ListItemText primary="Updates" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Assessment className={classes.iconColor}/></ListItemIcon>
                    <ListItemText primary="Grades" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><School className={classes.iconColor}/></ListItemIcon>
                    <ListItemText primary="Mastery" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Event className={classes.iconColor}/></ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItem>
            </List>
            <Divider />
            </Drawer>
        </div>
    );
}