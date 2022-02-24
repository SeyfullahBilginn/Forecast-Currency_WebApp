import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useLayoutEffect, useState } from 'react';
import { Link } from "react-router-dom";
import setMode from "../data/pagesData";
import NavBar from '../navigation/NavBar';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: 120,
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Layout(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [pages, setPages] = useState(null);

    useLayoutEffect(() => {
        // if it s admin display admin layout
        if (props.isAdmin) {
            setPages(setMode("admin"))
            return
        }
        setPages(setMode("user"))

    }, [props.isAdmin]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (pages) {

        return (
            <Box sx={{
                minHeight: "100vh",
                display: 'flex',
                backgroundColor: "rgb(240,240,220)"
                // backgroundColor: "rgb(111,111,220)"
            }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    open={open}
                    style={{
                        backgroundColor: "#a0740a"
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '18px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {
                            /* currencies navigation bar */
                            // hide currencies navbar in user Screen
                            (window.location.pathname !== "/user") ? (
                                <NavBar />
                            ) : (null)
                        }
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}
                    // classes={{ paper: classes.paper }}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#bea865",
                        },
                    }}
                >

                    <DrawerHeader style={{
                        justifyContent: "center",
                        alignContent: "center",
                        height: "10vh",
                        margin: 10
                    }}>
                        <IconButton style={{ margin: 0 }} onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? (null) : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider style={{ color: "black" }} />
                    <List style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "flex-start",
                    }}>
                        <div>
                            {pages.slice(0, -1).map((page, index) => (
                                <Link to={page.to} key={index}>
                                    {/* {page.name} */}
                                    <ListItem button key={page.name}>
                                        <ListItemIcon>
                                            {page.icon}
                                        </ListItemIcon>

                                        <ListItemText primary={page.name} />
                                    </ListItem>
                                    <Divider style={{ color: "black" }} />
                                </Link>
                            ))}
                        </div>
                        <Link to={pages.at(-1).to} >
                            {/* {page.name} */}
                            <ListItem button key={pages.at(-1).name}>
                                <ListItemIcon>
                                    {pages.at(-1).icon}
                                </ListItemIcon>
                                <ListItemText primary={pages.at(-1).name} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    {props.children}
                </Box>
            </Box >
        );
    } else {
        return (
            <div>
                <h1>LOADING</h1>
            </div>

        )
    }
}