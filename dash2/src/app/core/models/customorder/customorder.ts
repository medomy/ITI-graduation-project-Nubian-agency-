export interface Icustomorder {
  productId: string;
  userId: string;
  frameColor: string;
  desiredSize: string;
  specialOrder: string;
  photoUrl: string;
  AdminResponse?: string;
  adminId?: string;
  DateConfirm?: string;
  productData?: string;

  timeStamp: {
    createdAt: Date;
    removedAt: Date;
    updatedAt: Date;
  };
}
