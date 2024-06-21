# NFTs Shop Commerce Template

A ecommerce shop template featuring:

- Immutable Checkout Widgets
- Immutable Primary sales


## Providers
This template requires a stock management system to manage product inventory and process orders. The `lib` folder contains a base implementation for a sample backend and woocomerce plugin backend.

You can create your own implementation, just follow the structure, keeping the provide `DataService` interface, the rest of the template unchanged.

Otherwise, you are welcome to improve this template and customise it to your needs.

> Note: If you are looking to learn more please read [Immutable checkout widgets documentation](https://docs.immutable.com/docs/zkevm/products/checkout/).

## Foundations

This project is a fork of Next.js Commerce [Vercel](https://github.com/vercel/nextjs-commerce) ([Demo](https://demo.vercel.store/)).

The NFTs checkout functionality is powered by Immutable's [Primary Sale Widget](https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/primary-sales/widget)

And, the ability to process orders and mint the NFTs is powered by Immutable's [Primary Sales Widget backend](https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/primary-sales/backend) in tandem with a [BYO Stock management system](https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/primary-sales/backend/byo), as showcased within `lib/sample-stock-management` or `lib/woocomerce` if using Immutable's [Woocomerce plugin](https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/primary-sales/backend/woocommerce).

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example).

If deploying to Vercel, dont forget to configure [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables), but overal an `.env` file is all that is necessary.

> Note: DO NOT commit your `.env` file or it will expose secrets that will allow others to control your store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

The store should now be running on [localhost:3000](http://localhost:3000/).

## BYO Stock Management system
We understand building a full fledge backend to run the sales can be a big endavour. Here are 2 boilerplates that can help you
test or start your sales faster.

- [Woocomerce Plugin](https://docs.immutable.com/docs/zkEVM/products/checkout/widgets/primary-sales/backend/woocommerce)
- [Sample Stock Management API](https://github.com/immutable/commerce-primary-sales-sample-api/tree/main)
