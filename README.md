# e-commerce-website
This is a full stack application for an e-commerce website!

<img width="1440" alt="Captura de Tela 2023-10-03 às 15 08 42" src="https://github.com/felipeJJ/e-commerce-admin/assets/43899843/2191667b-f267-4931-a97c-2cf8f146abe5">

## About this Project

The idea of the App is:

Put into practice all the programming knowledge I've gained so far and create a functional product.

## Functionalities
- Shows product catalog according to the applied filters
  - Search for a product by name
  - Select a product category
  - Organize by new products
  - Organize in order of value
  - Move to the next product page

- Add products to cart
  -add a product with the first click or increase the quantity of the same product by clicking again on the cart icon for that product
  
- On cart page:
  - Shows all products in the shopping cart
  - Shows a summary of the products
  - You can edit the quantity of the same product you want to buy
  - You can delete a specific product
  - Calculate shipping to your destination and choose from options
  - Place the order
 
## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a Next JS APP.

Also create a .env file that conteins your MongoDB URI (used in database/lib/mongoose.ts as mongoUri) and the accses information to your S3 Cliente (used in pages/api/upload.ts as accessKeyId and secretAccessKey).

**Cloning the Repository**

```
$ git clone https://github.com/felipeJJ/e-commerce-admin.git

$ cd e-commerce-admin
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Running

With all dependencies installed and the environment properly configured, you can now run the app:

```
$ npm run dev
```

## Built With

- [Next JS](https://nextjs.org) - Front-end framework 
- [typescript](https://www.typescriptlang.org) - Add types to JS
- [tailwindcss](https://tailwindcss.com) - Create all the stylization
- [axios](https://axios-http.com) - Used to make HTTP requests
- [mongodb](https://www.mongodb.com) - Data base
- [mongoose](https://mongoosejs.com) - Create schema-based solution to model your application data
- [multiparty](https://github.com/pillarjs/multiparty) - Parse http requests with content-type
- [sweetalert2](https://sweetalert2.github.io) - Show warning pop ups on screen
- [cepcertoapi](https://cepcerto.com/) - API that calculates shipping values ​​and deadlines

## Support tools

- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

### Some Observations about this App

This is an MVP and lacks features that will be implemented in the future, such as applying payment methods.

