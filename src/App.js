import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import "./App.css";
import { useStyles } from "./styles.js";
import axios from "axios";
import { Power3, TimelineLite } from "gsap";

const Table = lazy(() => import("./MUITable"));

function App() {
  const classes = useStyles();
  const CORS_URL = "https://mycors-proxy.herokuapp.com/";
  const URL_HOST = "https://sahmed93846.api-us1.com/api/3/contacts?limit=100";
  const API_KEY =
    "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0";
  const [contacts, setContacts] = React.useState([]);
  const config = {
    headers: {
      "Api-Token": API_KEY,
    },
  };
  const [showTable, setShowTable] = React.useState(false);
  let cardRef = React.useRef(null);
  const tl = new TimelineLite();

  React.useEffect(() => {
    axios.get(CORS_URL + URL_HOST, config).then((data) => {
      setContacts(data.data.contacts);
      cardSlideIn();
    });
    // eslint-disable-next-line
  }, []);

  // animate card slide
  const cardSlideIn = () => {
    tl.from(cardRef.current, {
      x: "-12060",
      ease: Power3.easeInOut,
      duration: 1,
    });
  };

  const show_table = () => {
    if (contacts.length > 0) {
      return (
        <Grid container>
          <Typography
            align="left"
            style={{
              width: "100%",
              fontSize: "2.75rem",
              color: "#356ae6",
              padding: "1rem",
              fontWeight: "500",
            }}
            variant="h2"
          >
            ActiveCampaign
          </Typography>

          {showTable ? (
            <Suspense fallback={<CircularProgress />}>
              <Table contacts={contacts} CORS_URL={CORS_URL} config={config} />
            </Suspense>
          ) : (
            <div ref={cardRef} style={{ width: "100%" }}>
              <Grid container justify="center" style={{ marginTop: "20%" }}>
                <Card style={{ padding: "2rem", width: "70%" }} elevation={20}>
                  <Typography
                    align="center"
                    variant="h3"
                    style={{
                      fontSize: "1.5rem",
                      paddingBottom: "10rem",
                      textTransform: "capitalize",
                    }}
                  >
                    Click the button below to generate a table of user data!
                  </Typography>
                  <Grid container item xs={10} sm={6} justify="flex-start">
                    <Button
                      onClick={() => setShowTable(true)}
                      variant="contained"
                      color="primary"
                      width="full"
                    >
                      Generate Table
                    </Button>
                  </Grid>
                </Card>
              </Grid>
            </div>
          )}
        </Grid>
      );
    }
    return (
      <Grid
        container
        justify="center"
        style={{ height: "100vh" }}
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );
  };

  return (
    <Grid container>
      <Grid className={classes.outerContainer} container>
        {show_table()}
      </Grid>
    </Grid>
  );
}

export default App;
