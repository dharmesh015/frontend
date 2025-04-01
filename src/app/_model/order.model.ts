import { Registrationuser } from "../modul/registrationuser";
import { Product } from "./product.model";

export interface MyOrderDetails {
    orderId: number;
    orderFullName : string;
    orderFullOrder : string;
    orderContactNumber : string;
    orderAlternateContactNumber : string;
    orderStatus : string;
    orderAmount : number;
    product : Product;
    user : Registrationuser;
    date: string; // Add this field
}
