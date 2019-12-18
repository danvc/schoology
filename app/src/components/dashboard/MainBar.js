import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchCourseField from './SearchCourseField';
import Logo from './Logo';

// css definitions
const useStyles = makeStyles(theme => ({
      textField: {
          width: 500,
          '& .MuiFormControl-marginNormal': {
              marginTop: '8 important!'
          },
          '& .MuiOutlinedInput-root': {
              '& fieldset': {
              },            
          }
      },
      mainLogo : {
          width: 150
      },
      grow: {
          flexGrow: 1,
      },
      menuButton: {
          marginRight: theme.spacing(2),
      },
      search: {  
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          borderColor: '#50ade1',
          backgroundColor: fade(theme.palette.common.white, 0.15),
          '&:hover': {
              backgroundColor: fade(theme.palette.common.white, 0.25),
          },
          marginRight: theme.spacing(2),
          marginLeft: 0,
          width: '100%',
          [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(6),
              width: 'auto',
          },
      },
      sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
              display: 'flex',
          },
      },
      appBar: {
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color:'#50ade1'
      }
    })
);

/**
 * Renders the main bar menu
 * @param {*} props 
 */
export default function MainBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
  
    const menuId = 'primary-search-account-menu';
    // main menu for web browser
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
                {/* Render the menu options */}
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
 
    return (
        <div className={classes.grow}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.mainLogo}>
                       <Logo/>
                    </div>

                    {/* Renders the textfield to file files by text */}
                    <div className={classes.search}>
                        <SearchCourseField className={classes.textField}/>
                    </div>

                    <div className={classes.grow} />
                        {/* Show notification and logout buttons */}
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}