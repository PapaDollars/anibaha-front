
import { BaseEntity } from "@/types/base";
import { Product } from "@/types/product";

export interface WishlistItem extends BaseEntity {
  userId: string;
  productId: string;
  product: Product;
  note?: string;
}