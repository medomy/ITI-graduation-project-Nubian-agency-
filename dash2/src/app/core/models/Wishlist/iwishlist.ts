export interface Iwishlist {
  //id : string,
  productsIds: Array<string>;
  userUid: string;
  timestamp: {
    createdAt: string;
    removedAt?: string;
    updatedAt?: string;
  };
}
