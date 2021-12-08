export interface Rate {
    timeStamp: {
        createdAt: Date;
        removedAt: Date;
        updatedAt: Date;
      },
    userUid : string,
    productId : string,
    oneRate : number
}
