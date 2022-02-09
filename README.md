# nodejs-graphql-architecture

## Project anatomy

```
app
 └ src                              → Application sources
    └ events                        → All the events executing to the second plane.
    └ utils                         → All the utils methods to be reused in all the project.
    └ schema                        → All the files correspondent to the GraphQL ecosystem
      └ models                      → All the models for the outputs schema
      └ types                       → The types that we are setting for GraphQL and also the enums
      └ index.ts                    → The main file for the schema folder
      └ queries                     → All the declare queries that can be used on GraphQL
      └ mutations                   → All the declare mutation that can be uses on GraphQL
    └ services                      → All the logic for the project, this is where define the functionality for all the queries and mutations for the entire project divided by the corresponding entities or parts for the app, every service has its own test file with all the cases of fails and success
      └ dtos                        → Data transfer objects for the current services
        └ request                   → Dto's for validate the incoming information
        └ response                  → Dto's to set the returning data
        └ base.dto.ts               → Generic DTO to implement in all the request and response dtos
    └ logger.ts                     → Logger for the entire application
    └ server.ts                     → Main application entry point
 └ prisma                           → Database sources
    └ migrations                    → All the migrations created based on the schema for the database
    └ schema.prisma                 → The file for prisma to generate the tables, columns and relation into the database
 └ node_modules (generated)         → NPM dependencies
 └ node.d.ts                        → The types for Typescript
```

<hr>

## Homework

### Build your tiny GraphQL API store.

You can choose the target of your business, be creative!.
**Examples:** snack store, pet store, drug store.

## Technical requirements

- POSTGRESQL
- ExpressJS
- Typescript
- Jest
- Prettier
- Eslint
- Apollo Server
- Code First

## Mandatory features

1. Authentication endpoints (sing up, sing in, sign out)
2. List products with pagination
3. Search products by category
4. Add 2 kinds of users (Manager, Client)
5. As a Manager I can:
   - Create products
   - Update products
   - Delete products
   - Disable products
   - Show clients orders
   - Upload images per product.
6. As a Client I can:
   - See products
   - See the product details
   - Buy products
   - Add products to car
   - Like products
   - Show my order
7. The product's information (included the images) should be visible for logged and not logged users
8. GraphQL playground documentation
9. Tests, at least a coverage of 80%

## Extra points

- When the stock of a product reaches 3, notify the last user that liked it and not purchased the product yet with an email. Use a background job and make sure to include the product's image in the email.
- Add forgot password functionality.
- Send an email when the user change the password
- Deploy on Heroku
