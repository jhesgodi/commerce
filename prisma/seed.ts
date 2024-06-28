import db from '../lib/db';

import categories from '../mocks/categories';
import nftCollections from '../mocks/nft-collections';
import products from '../mocks/products';

const seedProducts = async () => {
  for (const product of products) {
    const createdProduct = await db.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        name: product.title,
        image: product.image.url,
        price: JSON.stringify(product.price),
        stock: product.stock,
        description: product.description,
        productOptions: JSON.stringify(product.options),
        productVariants: JSON.stringify(product.variants)
      }
    });
    console.log(`Created product with id: ${createdProduct.id}`);
  }
};

const seedCategories = async () => {
  for (const category of categories) {
    const createdCategory = await db.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        id: category.slug,
        slug: category.slug,
        path: category.path,
        title: category.title,
        description: category.description,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt)
      }
    });

    // Connect products to the category
    for (const productId of category.productIds) {
      await db.categoriesOnProducts.upsert({
        where: {
          categoryId_productId: { categoryId: createdCategory.id, productId: productId }
        },
        update: {},
        create: {
          categoryId: createdCategory.id,
          productId: productId
        }
      });
      console.log(`Connected product ${productId} to category ${createdCategory.slug}`);
    }
  }
};

const seedNFTCollections = async () => {
  for (const nftCollection of nftCollections) {
    const createdNFTCollection = await db.nFTCollection.upsert({
      where: {
        id: nftCollection.id
      },
      update: {},
      create: {
        id: nftCollection.id,
        name: nftCollection.name,
        description: nftCollection.description,
        contractAddress: nftCollection.contractAddress,
        externalLink: '',
        image: nftCollection.image,
        products: {
          connect: nftCollection.productIds.map((id) => ({ id }))
        }
      }
    });

    console.log(`Created NFT Collection with id: ${createdNFTCollection.id}`);
  }
};

async function main() {
  await seedProducts();
  await seedCategories();
  await seedNFTCollections();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
