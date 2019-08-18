import React from "react";
import renderIf from "render-if";
// import { FeedItem, NewItem } from "components";
import Subscriber from "../../containers/Subscriber";
import FeedItem from "./FeedItem";

const Feed = ({
  feedType,
  items,
  createParams,
  subscribeToNew,
  newItemPosition = "top"
}) => {
  return (
    <Subscriber subscribeToNew={subscribeToNew}>
      {items.map(item => (
        <FeedItem key={item.id} item={item} feedType={feedType} />
      ))}
    </Subscriber>
  );
};

export default React.memo(Feed);
