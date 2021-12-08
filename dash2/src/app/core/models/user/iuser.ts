export interface Iuser {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  avatar?: string;
  birthDate?: string;
  gender?: string;
  isAdmin: boolean;
  TimeStamp?: {
    createdAt?: string;
    lastSignInTime?: string;
    updatedAt?: string;
    removedAt?: string;
  };
}
