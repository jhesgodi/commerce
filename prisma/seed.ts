import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import categories from '../mocks/categories';
import products from '../mocks/products';

const seedProducts = async () => {
  // const categories = await prisma.category.findMany();

  for (const product of products) {
    const createdProduct = await prisma.product.upsert({
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
    const createdCategory = await prisma.category.upsert({
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
      await prisma.categoriesOnProducts.upsert({
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

async function main() {
  await seedProducts();
  await seedCategories();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
