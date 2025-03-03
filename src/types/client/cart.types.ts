import { ProductWithImagesAndSizes } from "./product.types";

export interface CartItemWithProduct {
  id: number;
  product_id: number;
  product: ProductWithImagesAndSizes
  user_id: number | null;
  quantity: number;
  size: string | null;
  session_id: string | null;
}
