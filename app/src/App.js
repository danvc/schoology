import React from 'react';
import './App.css';
import 'typeface-roboto';
import MainBar from './components/dashboard/MainBar';
import Drawer from './components/dashboard/Drawer';
import Panel from './components/dashboard/Panel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: theme.mixins.toolbar,
  }));

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
