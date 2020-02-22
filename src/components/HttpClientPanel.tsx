import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button } from "@material-ui/core";
import axios from "axios";
// const axios = require("axios");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    // margin: theme.spacing(1)
  },
  input: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1)
  },
  multiLinedInput: {
    height: 300
  }
}));

const HttpClientPanel = props => {
  const classes = useStyles();
  const url = "https://material-ui.com/api/text-field/";
  const [values, setValues] = React.useState({
    url: url,
    response: "asdfasdfasd awefawefew"
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function _onGetDataClick(e) {
    console.log(`get data: ${values.url}: ${values.response}`);
    axios({
      method: "get",
      url: values.url
    })
      .then(response => {
        setValues({ ...values, [response]: response });
      })
      .catch(err => {
        console.log("ERROR: ", JSON.stringify(err));
      });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              placeholder=""
              label="url"
              fullWidth
              onChange={handleChange("b64decoded")}
              value={values.url}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={_onGetDataClick}
              variant="outlined"
              component="span"
              fullWidth
              className={classes.button}
            >
              Get Data
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputProps={{
              className: classes.multiLinedInput
            }}
            multiline
            fullWidth
            value={values.response}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default HttpClientPanel;
