import { IProduct } from '../products/i-product';
import { Iuser } from '../user/iuser';

export interface ICart {
  productData: IProduct;
  userData: Iuser;
  quantity: number;
  productId: string;
  userId: string;

  TimeStamp: {
    createdAt: string;
    updatedAt?: string;
    removedAt?: string;
  };
}
