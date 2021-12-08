export interface Iartist {
  name: string;
  dateOfBirth: string;
  country: string;
  email: string;
  gender: string;
  department: string;
  avatar: string;

  TimeStamp: {
    createdAt: string;
    updatedAt?: string;
    removedAt?: string;
  };
}
