import React from "react";

import InfusionPost from "../InfusionPost/InfusionPost";

const FeedItem = ({ feedType, item }) => {
  // console.log("RENDER POST", item.id);
  return <InfusionPost {...item} />;
};

export default React.memo(FeedItem);
