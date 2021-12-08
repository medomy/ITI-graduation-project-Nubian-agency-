import { IProduct } from '../products/i-product';
import { Iuser } from '../user/iuser';

export interface Icustomorder {
  productId: string;
  productData: IProduct;
  userData: Iuser;
  userId: string;
  frameColor: string;
  desiredSize: string;
  specialOrder: string;
  photoUrl: string;
  AdminResponse?: string;
  adminId?: string;
  isView?: boolean;
  DateConfirm?: string;
  timeStamp: {
    createdAt: string;
    removedAt: string;
    updatedAt: string;
  };
}
