import * as mongodb from "mongodb";
 
export interface Employee {
   nombre: string;
   puesto: string;
   nivel: "junior" | "mid" | "senior";
   _id?: mongodb.ObjectId;
}