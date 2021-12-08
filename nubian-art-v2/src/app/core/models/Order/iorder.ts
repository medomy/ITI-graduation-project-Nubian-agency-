import { IAddress } from '../address/iAddress';

export interface Iorder {
  adressId: string;
  addressData?: IAddress;
  userId: string;
  cartItems: Array<any>;
  userData?: any;
  timeStamp: {
    createdAt: string;
    removedAt: string;
    updatedAt: string;
  };
  Ispaid: boolean;
  totalPrice: number;
}
