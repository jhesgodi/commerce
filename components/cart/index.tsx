import api from 'lib/services';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await api.getCart(cartId);
  }

  return <CartModal cart={cart} />;
}
