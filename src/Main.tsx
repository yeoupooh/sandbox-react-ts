import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";

import Hello from "./components/Hello";
import ImagePanel from "./components/ImagePanel";
// import DeepChild from "./components/DeepChild";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const theme = {
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
};

export default function Main() {
  const classes = useStyles({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React Sandbox in TS
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Hello" {...a11yProps(0)} />
          <Tab label="Image" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/* 
      NOTE dummy toolbars to unhide child components
      https://github.com/mui-org/material-ui/issues/16844
       */}
      <Toolbar />
      <Toolbar />
      <TabPanel value={value} index={0}>
        <Hello />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImagePanel />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      {/* <ThemeProvider theme={theme}><DeepChild /></ThemeProvider> */}
    </div>
  );
}
