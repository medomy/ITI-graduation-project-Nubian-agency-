import { IProduct } from '../products/i-product';

export interface Iwishlist {
  //id : string,
  productsIds: Array<string>;
  userUid: string;
  products: Array<any>;
  timestamp: {
    createdAt: string;
    removedAt?: string;
    updatedAt?: string;
  };
}
