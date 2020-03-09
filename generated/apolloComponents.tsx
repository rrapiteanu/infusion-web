import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  NaiveDateTime: any;
};

export type Comment = {
   __typename?: 'Comment';
  body?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  insertedAt?: Maybe<Scalars['NaiveDateTime']>;
  post?: Maybe<Post>;
  user?: Maybe<User>;
};

export type Conversation = {
   __typename?: 'Conversation';
  id?: Maybe<Scalars['ID']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Message = {
   __typename?: 'Message';
  body?: Maybe<Scalars['String']>;
  conversation?: Maybe<Conversation>;
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<User>;
};


export type Post = {
   __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  id?: Maybe<Scalars['ID']>;
  insertedAt?: Maybe<Scalars['NaiveDateTime']>;
  user?: Maybe<User>;
};

export type RootMutationType = {
   __typename?: 'RootMutationType';
  authenticate?: Maybe<User>;
  createComment?: Maybe<Comment>;
  createConversation?: Maybe<Conversation>;
  createMessage?: Maybe<Message>;
  createPost?: Maybe<Post>;
  signUp?: Maybe<User>;
};


export type RootMutationTypeAuthenticateArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RootMutationTypeCreateCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['ID'];
};


export type RootMutationTypeCreateConversationArgs = {
  userIds: Array<Maybe<Scalars['ID']>>;
};


export type RootMutationTypeCreateMessageArgs = {
  body: Scalars['String'];
  conversationId: Scalars['ID'];
};


export type RootMutationTypeCreatePostArgs = {
  body: Scalars['String'];
};


export type RootMutationTypeSignUpArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type RootQueryType = {
   __typename?: 'RootQueryType';
  conversation?: Maybe<Conversation>;
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  currentUser?: Maybe<User>;
  messages?: Maybe<Array<Maybe<Message>>>;
  post?: Maybe<Post>;
  postComments?: Maybe<Array<Maybe<Comment>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
};


export type RootQueryTypeConversationArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeMessagesArgs = {
  conversationId: Scalars['ID'];
};


export type RootQueryTypePostArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypePostCommentsArgs = {
  postId: Scalars['ID'];
};


export type RootQueryTypeSearchUsersArgs = {
  searchTerm: Scalars['String'];
};


export type RootQueryTypeUserArgs = {
  id: Scalars['ID'];
};

export type RootSubscriptionType = {
   __typename?: 'RootSubscriptionType';
  commentCreated?: Maybe<Comment>;
  conversationCreated?: Maybe<Conversation>;
  conversationUpdated?: Maybe<Conversation>;
  messageCreated?: Maybe<Message>;
  postCreated?: Maybe<Post>;
};


export type RootSubscriptionTypeCommentCreatedArgs = {
  postId: Scalars['ID'];
};


export type RootSubscriptionTypeMessageCreatedArgs = {
  conversationId: Scalars['ID'];
};

export type User = {
   __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  gravatarMd5?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  token?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'RootMutationType' }
  & { authenticate: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'token'>
  )> }
);

export type RegisterMutationVariables = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'RootMutationType' }
  & { signUp: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'gravatarMd5' | 'id' | 'name' | 'token'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'RootQueryType' }
  & { currentUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'gravatarMd5' | 'id' | 'name' | 'token'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  authenticate(email: $email, password: $password) {
    id
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> & TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    
export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables> & TChildProps;
export function withRegister<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;