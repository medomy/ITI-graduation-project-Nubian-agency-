export interface IAddress {
  city?: string;
  region?: string;
  street?: string;
  building?: string;
  floor?: string;
  flat?: string;
  note?: string;
  userID: string;
  TimeStamp?: {
    createdAt?: string;
    updatedAt?: string;
    removedAt?: string;
  };
}
