export interface Cart {
    cartId: number;
    product: {
      productId: number;
      productName: string;
      productDescription: string;
      productDiscountedPrice: number;
      productActualPrice: number;
      productImages: any[];
    };
    user: any;
  }