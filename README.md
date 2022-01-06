# nodejs-graphql-architecture

## Project anatomy

```
app
 └ src                              → Application sources
    └ events                        → All the events executing to the second plane.
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
