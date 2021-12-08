export interface ICartItem {
    quantity: number;
    productId: string;
    userId: string;

    TimeStamp: {
        createdAt: Date;
        updatedAt?: Date;
        removedAt?: Date;
    };
}
