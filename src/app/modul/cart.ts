// import { FileHandel } from "../_model/file-handel.model";

import { FileHandel } from "../_model/file-handel.model";

export interface Cart {
    cartId: number;
    product: {
      productId: number;
      productName: string;
      productDescription: string;
      productDiscountedPrice: number;
      productActualPrice: number;
      productImages: FileHandel[];
    };
    user: any;
  }