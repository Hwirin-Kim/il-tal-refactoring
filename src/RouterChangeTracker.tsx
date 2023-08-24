import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";
export default function RouterChangeTracker() {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  const GA_ID = process.env.REACT_APP_GA_TRACKING_ID;

  useEffect(() => {
    ReactGA.initialize(GA_ID);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    }
  }, [initialized, location]);
}
