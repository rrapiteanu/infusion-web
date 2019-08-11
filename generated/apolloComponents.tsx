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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type CreateZoneInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  totalSpots: Scalars["Float"];
  address: Scalars["String"];
  thumbnailUrl: Scalars["String"];
};

export type EditProfileInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  activateSubscription?: Maybe<User>;
  cancelSubscription?: Maybe<User>;
  changePassword?: Maybe<User>;
  changePaymentMethod?: Maybe<User>;
  confirmUser: Scalars["Boolean"];
  createSubscription?: Maybe<User>;
  createUser: User;
  editProfile?: Maybe<User>;
  forgotPassword: Scalars["Boolean"];
  login?: Maybe<User>;
  logout: Scalars["Boolean"];
  addProfilePicture?: Maybe<Scalars["String"]>;
  register: User;
  createZone: Zone;
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationChangePaymentMethodArgs = {
  ccLast4: Scalars["String"];
  token: Scalars["String"];
};

export type MutationConfirmUserArgs = {
  token: Scalars["String"];
};

export type MutationCreateSubscriptionArgs = {
  ccLast4: Scalars["String"];
  token: Scalars["String"];
};

export type MutationCreateUserArgs = {
  data: RegisterInput;
};

export type MutationEditProfileArgs = {
  data: EditProfileInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationAddProfilePictureArgs = {
  picture: Scalars["Upload"];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationCreateZoneArgs = {
  data: CreateZoneInput;
};

export type Owner = {
  __typename?: "Owner";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  zones: Array<Zone>;
  zone: Zone;
};

export type QueryZoneArgs = {
  zoneId: Scalars["Int"];
};

export type RegisterInput = {
  password: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  subUntil?: Maybe<Scalars["Float"]>;
  subStatus: Scalars["String"];
  ccLast4?: Maybe<Scalars["String"]>;
  accountType: Scalars["String"];
  name: Scalars["String"];
  profilePicture?: Maybe<Scalars["String"]>;
};

export type Zone = {
  __typename?: "Zone";
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  totalSpots: Scalars["Float"];
  address: Scalars["String"];
  thumbnailUrl: Scalars["String"];
  owners: Array<Owner>;
};
export type AddProfilePictureMutationVariables = {
  file: Scalars["Upload"];
};

export type AddProfilePictureMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "addProfilePicture"
>;

export type ChangePasswordMutationVariables = {
  data: ChangePasswordInput;
};

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
  changePassword: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "firstName" | "lastName" | "email" | "name"
    >
  >;
};

export type ConfirmUserMutationVariables = {
  token: Scalars["String"];
};

export type ConfirmUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "confirmUser"
>;

export type ForgotPasswordMutationVariables = {
  email: Scalars["String"];
};

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>;

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "firstName" | "lastName" | "email" | "name"
    >
  >;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = {
  data: RegisterInput;
};

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & Pick<
    User,
    "id" | "firstName" | "lastName" | "email" | "name"
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<
    { __typename?: "User" } & Pick<
      User,
      | "id"
      | "email"
      | "firstName"
      | "lastName"
      | "name"
      | "accountType"
      | "ccLast4"
      | "profilePicture"
      | "subUntil"
      | "subStatus"
    >
  >;
};

export type ZoneQueryVariables = {
  id: Scalars["Int"];
};

export type ZoneQuery = { __typename?: "Query" } & {
  zone: { __typename?: "Zone" } & Pick<
    Zone,
    "id" | "name" | "description" | "totalSpots" | "address" | "thumbnailUrl"
  >;
};

export type ZonesQueryVariables = {};

export type ZonesQuery = { __typename?: "Query" } & {
  zones: Array<
    { __typename?: "Zone" } & Pick<
      Zone,
      "id" | "name" | "description" | "totalSpots" | "address" | "thumbnailUrl"
    >
  >;
};

export const AddProfilePictureDocument = gql`
  mutation addProfilePicture($file: Upload!) {
    addProfilePicture(picture: $file)
  }
`;
export type AddProfilePictureMutationFn = ReactApollo.MutationFn<
  AddProfilePictureMutation,
  AddProfilePictureMutationVariables
>;
export type AddProfilePictureComponentProps = Omit<
  ReactApollo.MutationProps<
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables
  >,
  "mutation"
>;

export const AddProfilePictureComponent = (
  props: AddProfilePictureComponentProps
) => (
  <ReactApollo.Mutation<
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables
  >
    mutation={AddProfilePictureDocument}
    {...props}
  />
);

export type AddProfilePictureProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables
  >
> &
  TChildProps;
export function withAddProfilePicture<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables,
    AddProfilePictureProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddProfilePictureMutation,
    AddProfilePictureMutationVariables,
    AddProfilePictureProps<TChildProps>
  >(AddProfilePictureDocument, {
    alias: "withAddProfilePicture",
    ...operationOptions
  });
}
export const ChangePasswordDocument = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
export type ChangePasswordMutationFn = ReactApollo.MutationFn<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export type ChangePasswordComponentProps = Omit<
  ReactApollo.MutationProps<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >,
  "mutation"
>;

export const ChangePasswordComponent = (
  props: ChangePasswordComponentProps
) => (
  <ReactApollo.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables>
    mutation={ChangePasswordDocument}
    {...props}
  />
);

export type ChangePasswordProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
> &
  TChildProps;
export function withChangePassword<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ChangePasswordMutation,
    ChangePasswordMutationVariables,
    ChangePasswordProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ChangePasswordMutation,
    ChangePasswordMutationVariables,
    ChangePasswordProps<TChildProps>
  >(ChangePasswordDocument, {
    alias: "withChangePassword",
    ...operationOptions
  });
}
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
export type ConfirmUserMutationFn = ReactApollo.MutationFn<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;
export type ConfirmUserComponentProps = Omit<
  ReactApollo.MutationProps<ConfirmUserMutation, ConfirmUserMutationVariables>,
  "mutation"
>;

export const ConfirmUserComponent = (props: ConfirmUserComponentProps) => (
  <ReactApollo.Mutation<ConfirmUserMutation, ConfirmUserMutationVariables>
    mutation={ConfirmUserDocument}
    {...props}
  />
);

export type ConfirmUserProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ConfirmUserMutation, ConfirmUserMutationVariables>
> &
  TChildProps;
export function withConfirmUser<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ConfirmUserMutation,
    ConfirmUserMutationVariables,
    ConfirmUserProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ConfirmUserMutation,
    ConfirmUserMutationVariables,
    ConfirmUserProps<TChildProps>
  >(ConfirmUserDocument, {
    alias: "withConfirmUser",
    ...operationOptions
  });
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = ReactApollo.MutationFn<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export type ForgotPasswordComponentProps = Omit<
  ReactApollo.MutationProps<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
  "mutation"
>;

export const ForgotPasswordComponent = (
  props: ForgotPasswordComponentProps
) => (
  <ReactApollo.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>
    mutation={ForgotPasswordDocument}
    {...props}
  />
);

export type ForgotPasswordProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
> &
  TChildProps;
export function withForgotPassword<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    ForgotPasswordProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    ForgotPasswordProps<TChildProps>
  >(ForgotPasswordDocument, {
    alias: "withForgotPassword",
    ...operationOptions
  });
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      name
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
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>;
export type LogoutComponentProps = Omit<
  ReactApollo.MutationProps<LogoutMutation, LogoutMutationVariables>,
  "mutation"
>;

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ReactApollo.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type LogoutProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutMutationVariables>
> &
  TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: "withLogout",
    ...operationOptions
  });
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
      name
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
    me {
      id
      email
      firstName
      lastName
      name
      accountType
      ccLast4
      profilePicture
      subUntil
      subStatus
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
export const ZoneDocument = gql`
  query Zone($id: Int!) {
    zone(zoneId: $id) {
      id
      name
      description
      totalSpots
      address
      thumbnailUrl
    }
  }
`;
export type ZoneComponentProps = Omit<
  ReactApollo.QueryProps<ZoneQuery, ZoneQueryVariables>,
  "query"
> &
  ({ variables: ZoneQueryVariables; skip?: false } | { skip: true });

export const ZoneComponent = (props: ZoneComponentProps) => (
  <ReactApollo.Query<ZoneQuery, ZoneQueryVariables>
    query={ZoneDocument}
    {...props}
  />
);

export type ZoneProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ZoneQuery, ZoneQueryVariables>
> &
  TChildProps;
export function withZone<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ZoneQuery,
    ZoneQueryVariables,
    ZoneProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ZoneQuery,
    ZoneQueryVariables,
    ZoneProps<TChildProps>
  >(ZoneDocument, {
    alias: "withZone",
    ...operationOptions
  });
}
export const ZonesDocument = gql`
  query Zones {
    zones {
      id
      name
      description
      totalSpots
      address
      thumbnailUrl
    }
  }
`;
export type ZonesComponentProps = Omit<
  ReactApollo.QueryProps<ZonesQuery, ZonesQueryVariables>,
  "query"
>;

export const ZonesComponent = (props: ZonesComponentProps) => (
  <ReactApollo.Query<ZonesQuery, ZonesQueryVariables>
    query={ZonesDocument}
    {...props}
  />
);

export type ZonesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ZonesQuery, ZonesQueryVariables>
> &
  TChildProps;
export function withZones<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ZonesQuery,
    ZonesQueryVariables,
    ZonesProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ZonesQuery,
    ZonesQueryVariables,
    ZonesProps<TChildProps>
  >(ZonesDocument, {
    alias: "withZones",
    ...operationOptions
  });
}
