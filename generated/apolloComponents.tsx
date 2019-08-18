import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as React from "react";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Naive DateTime` scalar type represents a naive date and time without
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string.
   */
  NaiveDateTime: any;
};

/** A comment on the site */
export type Comment = {
  __typename?: "Comment";
  body?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  insertedAt?: Maybe<Scalars["NaiveDateTime"]>;
  post?: Maybe<Post>;
  user?: Maybe<User>;
};

/** A conversation on the site */
export type Conversation = {
  __typename?: "Conversation";
  id?: Maybe<Scalars["ID"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  title?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["NaiveDateTime"]>;
  users?: Maybe<Array<Maybe<User>>>;
};

/** A message on the site */
export type Message = {
  __typename?: "Message";
  body?: Maybe<Scalars["String"]>;
  conversation?: Maybe<Conversation>;
  id?: Maybe<Scalars["ID"]>;
  user?: Maybe<User>;
};

/** A post on the site */
export type Post = {
  __typename?: "Post";
  body?: Maybe<Scalars["String"]>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  id?: Maybe<Scalars["ID"]>;
  insertedAt?: Maybe<Scalars["NaiveDateTime"]>;
  user?: Maybe<User>;
};

export type RootMutationType = {
  __typename?: "RootMutationType";
  /** Authenticate */
  authenticate?: Maybe<User>;
  /** Create comment */
  createComment?: Maybe<Comment>;
  /** Create conversation */
  createConversation?: Maybe<Conversation>;
  /** Create message */
  createMessage?: Maybe<Message>;
  /** Create post */
  createPost?: Maybe<Post>;
  /** Sign up */
  signUp?: Maybe<User>;
};

export type RootMutationTypeAuthenticateArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type RootMutationTypeCreateCommentArgs = {
  body: Scalars["String"];
  postId: Scalars["ID"];
};

export type RootMutationTypeCreateConversationArgs = {
  userIds: Array<Maybe<Scalars["ID"]>>;
};

export type RootMutationTypeCreateMessageArgs = {
  body: Scalars["String"];
  conversationId: Scalars["ID"];
};

export type RootMutationTypeCreatePostArgs = {
  body: Scalars["String"];
};

export type RootMutationTypeSignUpArgs = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  /** Get a specific conversation */
  conversation?: Maybe<Conversation>;
  /** Get all conversations for current user */
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  /** Get current user */
  currentUser?: Maybe<User>;
  /** Get all messages for a conversation */
  messages?: Maybe<Array<Maybe<Message>>>;
  /** Get a specific post */
  post?: Maybe<Post>;
  /** Get all comments for a specific post */
  postComments?: Maybe<Array<Maybe<Comment>>>;
  /** Get all posts */
  posts?: Maybe<Array<Maybe<Post>>>;
  /** Search users */
  searchUsers?: Maybe<Array<Maybe<User>>>;
};

export type RootQueryTypeConversationArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypeMessagesArgs = {
  conversationId: Scalars["ID"];
};

export type RootQueryTypePostArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypePostCommentsArgs = {
  postId: Scalars["ID"];
};

export type RootQueryTypeSearchUsersArgs = {
  searchTerm: Scalars["String"];
};

export type RootSubscriptionType = {
  __typename?: "RootSubscriptionType";
  commentCreated?: Maybe<Comment>;
  conversationCreated?: Maybe<Conversation>;
  conversationUpdated?: Maybe<Conversation>;
  messageCreated?: Maybe<Message>;
  postCreated?: Maybe<Post>;
};

export type RootSubscriptionTypeCommentCreatedArgs = {
  postId: Scalars["ID"];
};

export type RootSubscriptionTypeMessageCreatedArgs = {
  conversationId: Scalars["ID"];
};

/** A user of the site */
export type User = {
  __typename?: "User";
  email?: Maybe<Scalars["String"]>;
  gravatarMd5?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  posts?: Maybe<Array<Maybe<Post>>>;
  token?: Maybe<Scalars["String"]>;
};
export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "RootMutationType" } & {
  authenticate: Maybe<{ __typename?: "User" } & Pick<User, "id" | "token">>;
};

export type RegisterMutationVariables = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type RegisterMutation = { __typename?: "RootMutationType" } & {
  signUp: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "email" | "gravatarMd5" | "id" | "name" | "token"
    >
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "RootQueryType" } & {
  currentUser: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "email" | "gravatarMd5" | "id" | "name" | "token"
    >
  >;
};

export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      id
      token
    }
  }
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginComponentProps = Omit<
  ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
  "mutation"
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: "withLogin",
    ...operationOptions
  });
}
export const RegisterDocument = gql`
  mutation Register($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      email
      gravatarMd5
      id
      name
      token
    }
  }
`;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>;
export type RegisterComponentProps = Omit<
  ReactApollo.MutationProps<RegisterMutation, RegisterMutationVariables>,
  "mutation"
>;

export const RegisterComponent = (props: RegisterComponentProps) => (
  <ReactApollo.Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
);

export type RegisterProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterMutationVariables>
> &
  TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: "withRegister",
    ...operationOptions
  });
}
export const MeDocument = gql`
  query Me {
    currentUser {
      email
      gravatarMd5
      id
      name
      token
    }
  }
`;
export type MeComponentProps = Omit<
  ReactApollo.QueryProps<MeQuery, MeQueryVariables>,
  "query"
>;

export const MeComponent = (props: MeComponentProps) => (
  <ReactApollo.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
);

export type MeProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MeQuery, MeQueryVariables>
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, {
    alias: "withMe",
    ...operationOptions
  });
}
