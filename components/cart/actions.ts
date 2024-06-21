'use server';

import api from 'lib/services';
import { TAGS } from 'lib/utils/constants';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(prevState: any, id: string | undefined) {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await api.getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await api.createCart();
    cartId = cart.id;
    cookies().set('cartId', cartId);
  }

  if (!id) {
    return 'Missing product variant ID';
  }

  try {
    await api.addToCart(cartId, [{ id, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, id: string) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    await api.removeFromCart(cartId, [id]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    id: string;
    variantId: string;
    quantity: number;
  }
) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { id, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await api.removeFromCart(cartId, [id]);
      revalidateTag(TAGS.cart);
      return;
    }

    await api.updateCart(cartId, [
      {
        id,
        variantId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error updating item quantity';
  }
}
