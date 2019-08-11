export interface UserProfile {
  name?: string;
  displayName?: string;
  avatar?: string;
  email?: string;
}

export interface Author extends UserProfile {}
