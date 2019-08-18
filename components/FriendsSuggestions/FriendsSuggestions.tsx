import React, { Component } from "react";
import Link from "next/link";
import { SkeletonLine } from "../ui/Skeleton/Skeleton";
import InfusionLoader from "../ui/InfusionLoader";
import { Close } from "@material-ui/icons";
import { getIntials } from "../../lib/utils";
import { Avatar } from "@material-ui/core";

export default class FriendsSuggestions extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      people: [{}, {}, {}],
      loading: true
    };
  }

  componentDidMount() {
    this.getSuggestions();
  }

  getSuggestions = () => {
    setTimeout(() => {
      this.setState({
        loading: false,
        people: []
      });
    }, 50);
  };

  render() {
    const { loading } = this.state;

    return (
      <div className="right-menu-sub">
        <div className="portlet">
          <div className="portlet-title">
            <div className="caption">
              <span className="font-blue-madison">PEOPLE YOU MAY KNOW</span>
            </div>
          </div>
          <div className="portlet-body">
            <div style={{ position: "relative" }} className="members">
              {loading && <InfusionLoader />}
              {!loading &&
                this.state.people.map(user => {
                  return (
                    <div key={user.id} className="member">
                      <Avatar
                        style={{ backgroundColor: "#429bf5" }}
                        alt="Profile"
                        className="avatar"
                      >
                        {getIntials(user.displayName)}
                      </Avatar>

                      <Link href={`user`}>
                        <span className="name">{user.displayName}</span>
                      </Link>
                      <div className="action-button">
                        <Close />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
