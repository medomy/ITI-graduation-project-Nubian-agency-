export interface IProduct {
  title: string;
  description: string;
  size?: string;
  price: number;

  images: {
    mainImage: string;
    subImages: Array<string>;
  };
  artistID: string;
  categoryID: string;

  TimeStamp: {
    createdAt: string;
    updatedAt?: string;
    removedAt?: string;
  };
}
