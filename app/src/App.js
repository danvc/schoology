import React from 'react';
import './App.css';
import 'typeface-roboto';
import MainBar from './components/dashboard/MainBar';
import Drawer from './components/dashboard/Drawer';
import Panel from './components/dashboard/Panel';
import { makeStyles } from '@material-ui/core/styles';

/**
 * CSS definition
 */
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
}));

/**
 * Main app 
 */
function App (){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MainBar/>
            <Drawer/>
            <Panel/>
        </div>
    );
}

export default App;
