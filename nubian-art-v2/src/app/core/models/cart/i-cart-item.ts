export interface ICartItem {
  quantity: number;
  productId: string;
  product: any;
  userId: string;

  TimeStamp: {
    createdAt: string;
    updatedAt?: string;
    removedAt?: string;
  };
}
