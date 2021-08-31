import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar } from "@material-ui/core";
import useStyles from './navbarStyles';
import memories from '../../images/logo.png';
import text from '../../images/text.png';
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import * as actionType from '../../constants/actionType';
import decode from 'jwt-decode';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const logout = useCallback(() => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    }, [dispatch, history]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, logout, user?.token]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={text} alt="icon" height="45px" />
                <img className={classes.image} src={memories} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        {/* <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> */}
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;