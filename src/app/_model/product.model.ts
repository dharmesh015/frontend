import { FileHandel } from "./file-handel.model";

export interface Product {
    productId:number,
    productName: String,
    productDescription: String,
    productDiscountedPrice: number,
    productActualPrice: number,
    sellername:string,
    productImages: FileHandel[]
}