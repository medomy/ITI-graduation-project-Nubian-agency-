export interface Iorder {
  adressId: string;
  userId: string;
  cartItems: Array<any>;
  timeStamp: {
    createdAt: Date;
    removedAt: Date;
    updatedAt: Date;
  };
  Ispaid: boolean;
  totalPrice: number;
}
