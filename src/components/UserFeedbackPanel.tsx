import * as React from "react";
import Iframe from "react-iframe";

const UserFeedbackPanel = () => {
  return (
    <div>
      <Iframe
        url="https://docs.google.com/forms/d/e/1FAIpQLSf_0-RLW2wF-rxLu-EtXE97W6_b4YfGfriwiz6gSqmbxdxbzw/viewform?embedded=true"
        width="640px"
        height="635px"
        frameBorder={0}
      >
        Loading…
      </Iframe>
    </div>
  );
};

export default UserFeedbackPanel;
