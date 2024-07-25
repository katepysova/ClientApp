import React from "react";
import empty from "@images/not-found.svg";

import "./EmptyState.scss";

function EmptyState() {
  return (
    <div className="empty-state">
      <img src={empty} alt={"Not Found"} />
      <h2 className="empty-state__heading heading-tertiary">No Data Found</h2>
    </div>
  );
}

export default EmptyState;
