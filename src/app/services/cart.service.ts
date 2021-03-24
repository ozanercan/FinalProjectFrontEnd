import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: Product) {
    let item = CartItems.find((p) => p.product.productId === product.productId);

    if (item) {
      item.quantity++;
    } else {
      let cartItemToAdd = new CartItem();
      cartItemToAdd.quantity = 1;
      cartItemToAdd.product = product;
      CartItems.push(cartItemToAdd);
    }
  }

  removeFromCart(product: Product) {
    let item = CartItems.find((p) => p.product.productId === product.productId);

    CartItems.splice(CartItems.indexOf(item, 1));
  }

  list(): CartItem[] {
    return CartItems;
  }
}
