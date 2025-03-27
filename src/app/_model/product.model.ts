import { FileHandel } from "./file-handel.model";

export interface Product {
   
    productName: String,
    productDescription: String,
    productDiscountedPrice: number,
    productActualPrice: number,
    productImages: FileHandel[]
}