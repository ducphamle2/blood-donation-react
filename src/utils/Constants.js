/**
 * @author DucPL
 */

import React from "react";

// Different action types for calling dispatch (accessing the reducer)
// this function is used to render an error message if error whenever users hit the button
function renderError(errorMessage) {
  if (errorMessage !== "") {
    return (
      <p className="error-style">
        {errorMessage}<br />
      </p>
    );
  }
}

const Constants = {
  renderError,
  URL: "http://0.0.0.0:8080",
  LIMIT: 3
}

export default Constants;