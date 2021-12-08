export interface Wishlistitem {
  productId: string;
  userUid: string;
  product: any;
  user:any;
  timestamp: {
    createdAt: string;
    removedAt?: string;
    updatedAt?: string;
  };
}
