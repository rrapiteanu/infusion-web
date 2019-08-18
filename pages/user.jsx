import React, { Component, Fragment, useState } from "react";
import Layout from "./../components/ui/Layout/Layout";
import { withAuthSync } from "../lib/auth";
import InfusionForm from "../components/InfusionForm/InfusionForm";
import InfusionPost from "../components/InfusionPost/InfusionPost";
import InfusionButton from "../components/ui/InfusionButton/InfusionButton";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { getIntials } from "../lib/utils";
import redirect from "../lib/redirect";
import gql from "graphql-tag";
import QueryResult from "../components/ui/QueryResult";
import { useQuery } from "@apollo/react-hooks";
const placeholder = "https://i.pravatar.cc/300";

const Container = styled.div`
  .user-profile-header {
    position: relative;
    width: 100%;
    height: 400px;
    padding-top: 30px;
    margin-bottom: 30px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;

    .user-profile-photo {
      border-radius: 50%;
      height: 150px;
      width: 150px;
      margin-bottom: 20px;
      font-size: 50px;
    }

    .user-profile-info {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }

    .user-profile-name {
      font-size: 20px;
      text-align: center;
    }

    .add-friend {
      position: absolute;
      bottom: 10px;
      right: 20px;
    }
  }

  .main-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .posts-container {
      margin-left: 50px;
      margin-right: 50px;
      display: flex;
      flex-direction: column;
      .post {
        position: relative;
        width: 570px;
        // height: 266px;
        background: #ffffff;
        margin-bottom: 30px;
        border-radius: 4px;
        // box-shadow: 0 -1px 1px 0 rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.2);

        .post-options {
          position: absolute;
          top: 10px;
          right: 19px;
          font-size: 23px;
          color: #c1c1c1;
          cursor: pointer;
        }

        .post-container {
          background: #ffffff;
          // margin-bottom: 30px;
          box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.05),
            0 1px 2px 0 rgba(0, 0, 0, 0.2);
        }

        .comment-form {
          box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.05),
            0 1px 2px 0 rgba(0, 0, 0, 0.2);
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
      posts {
        id
        insertedAt
        user {
          id
          name
        }
        body
      }
    }
  }
`;

const currentUser = {
  id: "5"
};

const User = ({ id }) => {
  const [input, setInput] = useState("");

  const { subscribeToMore, ...queryResult } = useQuery(GET_USER, {
    variables: { id },
    ssr: false
  });

  return (
    <Layout>
      <Container>
        <QueryResult {...queryResult}>
          {({ data }) => {
            if (data.user === null) {
              return <div />;
            }

            return (
              <Fragment>
                <div className="user-profile-header">
                  <div className="user-profile-info">
                    <Avatar
                      className="user-profile-photo"
                      style={{ backgroundColor: "#429bf5" }}
                      alt="Profile"
                    >
                      {getIntials(data.user.name)}
                    </Avatar>
                    <span className="user-profile-name">{data.user.name}</span>
                  </div>

                  {/* {id !== currentUser.id && (
          <Fragment>
            {!this.state.isFriend &&
              !this.state.incomingRequest &&
              !this.state.outgoingRequest && (
                <InfusionButton
                  onClick={this.sendFriendRequest}
                  className="add-friend"
                  size="medium"
                  buttonStyle="simple"
                  color="blue"
                >
                  Add Friend
                </InfusionButton>
              )}

            {this.state.isFriend && (
              <InfusionButton
                onClick={this.removeFriend}
                className="add-friend"
                size="medium"
                buttonStyle="simple"
                color="blue"
              >
                Remove friend
              </InfusionButton>
            )}

            {this.state.outgoingRequest && (
              <InfusionButton
                onClick={this.cancelFriendRequest}
                className="add-friend"
                size="medium"
                buttonStyle="simple"
                color="blue"
              >
                Cancel Friend Request
              </InfusionButton>
            )}

            {this.state.incomingRequest && (
              <InfusionButton
                onClick={this.acceptFriendRequest}
                className="add-friend"
                size="medium"
                buttonStyle="simple"
                color="blue"
              >
                Accept friend request
              </InfusionButton>
            )}
          </Fragment>
        )} */}
                </div>
                <div className="main-container">
                  <div className="posts-container">
                    {data.user.posts.map(post => {
                      return <InfusionPost key={post.id} {...post} />;
                    })}
                  </div>
                </div>
              </Fragment>
            );
          }}
        </QueryResult>
      </Container>
    </Layout>
  );
};

User.getInitialProps = async ({ query: { id }, apolloClient, ...ctx }) => {
  if (!id) {
    redirect(ctx, "/feed");
  }

  return { id };
};

// class Users extends Component<any, any> {
//   constructor(props) {
//     super(props);

//     // this.state = {
//     //   username: "",
//     //   displayName: "",
//     //   uid: "",
//     //   isFriend: false,
//     //   hasIncomingFriendRequest: false,
//     //   hasOutgoingFriendRequest: false,
//     //   isLoading: true,
//     //   posts: []
//     // };
//     this.state = {
//       username: "nice player",
//       displayName: "Robert Rapiteanu",
//       uid: "123",
//       isFriend: false,
//       hasIncomingFriendRequest: false,
//       hasOutgoingFriendRequest: false,
//       isLoading: false,
//       posts: [
//         {
//           id: "21321",
//           body: "dwa",
//           insertedAt: "2019-08-15T01:35:49",
//           user: { name: "Robert Rapiteanu", avatar: "" }
//         }
//       ]
//     };
//   }

//   componentDidMount() {
//     // this.getUserInfo();
//   }

//   sendPost = () => {};
//   updateText = () => {};

//   componentWillUnmount() {}

//   getUserInfo = () => {
//     this.setState({
//       username: "nice player",
//       displayName: "Robert Rapiteanu",
//       uid: "123",
//       isFriend: false,
//       hasIncomingFriendRequest: false,
//       hasOutgoingFriendRequest: false,
//       isLoading: false,
//       posts: [
//         {
//           body: "dwa",
//           insertedAt: "2019-08-15T01:35:49",
//           user: { name: "Robert Rapiteanu", avatar: "" }
//         }
//       ]
//     });
//   };

//   renderPosts = posts => {
//     this.setState({ posts: [...posts] });
//   };

//   sendFriendRequest = () => {
//     this.setState({ outgoingRequest: true });
//   };

//   cancelFriendRequest = () => {
//     this.setState({ outgoingRequest: false });
//   };

//   acceptFriendRequest = () => {
//     this.setState({ incomingRequest: false, isFriend: true });
//   };

//   declineFriendRequest = () => {
//     this.setState({ incomingRequest: false });
//   };

//   removeFriend = () => {
//     this.setState({ isFriend: false });
//   };

//   render() {
//     const currentUser = { uid: "112" };

//     return (

//     );
//   }
// }

export default withAuthSync(User);
