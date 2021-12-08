import { IProduct } from "../products/i-product";
import { Iuser } from "../user/iuser";

export interface ICart {
  quantity: number;
  productData?: IProduct;
  productId: string;
  userData: Iuser;
  userId: string;
  subTotal: number;

  TimeStamp: {
    createdAt: string;
    updatedAt?: string;
    removedAt?: string;
  };
}
