import React from 'react';
import { withRouter } from 'react-router-dom';

// Google Analytics needs the HTML to reload to track normally.
// Since this is a single-page-app, the HTML only loads once. So Google
// Analytics isn't aware of what the user is doing as they move through the app.
// This component makes Google Analytics aware of changes to the URL from React
// Router

// SOLUTION from user bozdoz on Stack Overflow
// https://stackoverflow.com/questions/34836500/how-to-set-up-google-analytics-for-react-router
class GoogleAnalytics extends React.Component {
  componentWillUpdate({ location, history }) {
    const gtag = window.gtag;

    if (location.pathname === this.props.location.pathname) {
      // don't log identical link clicks (nav links likely)
      return;
    }

    if (history.action === 'PUSH' && typeof gtag === 'function') {
      gtag('config', 'UA-177254644-1', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }

  render() {
    return null;
  }
}

export default withRouter(GoogleAnalytics);
