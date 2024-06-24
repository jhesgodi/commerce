import { GridTileImage } from 'components/grid/tile';
import api from 'lib/services';
import type { Product } from 'lib/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.slug}`}>
        <GridTileImage
          src={item.image.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.price.amount,
            currencyCode: item.price.currency
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const products = await api.getCategoryProducts({
    categoryId: 'featured'
  });

  const size = products?.length || 0;
  if (size < 3) return null;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      {products.map((product, i) => (
        <ThreeItemGridItem
          key={`${product.slug}${i}`}
          item={product}
          size={i > 0 ? 'half' : 'full'}
        />
      ))}
    </section>
  );
}
