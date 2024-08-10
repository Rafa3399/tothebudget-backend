# To The Budget (API Documentation)


This documentation provides an overview of the available routes and data models for the Expense Tracker API.

Throughout the project, you should use this documentation as a reference and a guide. Refer to it whenever you need information or more details on how to implement the routes or model your database.

<br>

## Routes

In this section, you will find detailed information about the different routes available in the API.
The API offers a variety of routes to work with *cohort* and *student* documents. Each route is associated with a specific HTTP verb and URL, allowing you to perform CRUD (Create, Read, Update, and Delete) actions on the data.

<br>

#### Authentication Routes

| HTTP verb | URL                        | Request body | Action                                  |
| --------- | -------------------------- | ------------ | --------------------------------------- |
| POST      | `/auth/signup`             | JSON         | Signs up a new user                     |
| POST      | `/auth/login`              | JSON         | Logs in a user and returns a JWT        |
| GET       | `/auth/verify`             | (empty)      | Verifies the JWT and returns user info  |



<br>

#### Account Routes

| HTTP verb | URL                               | Request body | Action                                                         |
| --------- | --------------------------------- | ------------ | -------------------------------------------------------------- |
| GET       | `/api/accounts/:userId`           | (empty)      | Returns all accounts for a user                                |
| POST      | `/api/accounts`                   | JSON         | Creates a new account                                          |
| PUT       | `/api/accounts/:accountId`        | JSON         | Updates the specified account by id                            |
| DELETE    | `/api/accounts/:accountId`        | (empty)      | Deletes the specified account by id                            |


<br>

#### Expense Routes

| HTTP verb | URL                               | Request body | Action                                                         |
| --------- | --------------------------------- | ------------ | -------------------------------------------------------------- |
| GET       | `/api/expenses/:userId`           | (empty)      | Returns all expenses for a user                                |
| POST      | `/api/expenses`                   | JSON         | Creates a new expense                                          |
| PUT       | `/api/expenses/:expenseId`        | JSON         | Updates the specified expense by id                            |
| DELETE    | `/api/expenses/:expenseId`        | (empty)      | Deletes the specified expense by id                            |

<br>

<br>

#### Profit Routes

| HTTP verb | URL                               | Request body | Action                                                         |
| --------- | --------------------------------- | ------------ | -------------------------------------------------------------- |
| GET       | `/api/profits/:userId`            | (empty)      | Returns all profits for a user                                 |
| POST      | `/api/profits`                    | JSON         | Creates a new profit entry                                     |
| PUT       | `/api/profits/:profitId`          | JSON         | Updates the specified profit by id                             |
| DELETE    | `/api/profits/:profitId`          | (empty)      | Deletes the specified profit by id                             |

<br>

#### Recurring Expense Routes

| HTTP verb | URL                                           | Request body | Action                                                         |
| --------- | --------------------------------------------- | ------------ | -------------------------------------------------------------- |
| GET       | `/api/recurring-expenses/:userId`             | (empty)      | Returns all recurring expenses for a user                      |
| POST      | `/api/recurring-expenses`                     | JSON         | Creates a new recurring expense                                |
| PUT       | `/api/recurring-expenses/:recurringExpenseId` | JSON         | Updates the specified recurring expense by id                  |
| DELETE    | `/api/recurring-expenses/:recurringExpenseId` | (empty)      | Deletes the specified recurring expense by id                  |

<br>

#### Category Routes

| HTTP verb | URL                               | Request body | Action                                                         |
| --------- | --------------------------------- | ------------ | -------------------------------------------------------------- |
| GET       | `/api/categories/:userId`         | (empty)      | Returns all categories for a user                              |
| POST      | `/api/categories`                 | JSON         | Creates a new category                                         |
| PUT       | `/api/categories/:categoryId`     | JSON         | Updates the specified category by id                           |
| DELETE    | `/api/categories/:categoryId`     | (empty)      | Deletes the specified category by id                           |

<hr>
<br>

## Models

The Models section holds information about the data models for your database. It outlines the structure of the documents in the database, providing you with a clear understanding of how your data should be organized.

<br>

#### Account Model

| Field          | Data Type        | Description                                 |
|----------------|------------------|---------------------------------------------|
| `user`         | *`ObjectId`*     | Reference to the user. Required.            |
| `name`         | *`String`*       | Name of the account. Required.              |
| `balance`      | *`Number`*       | Balance of the account. Default: 0.         |

<br>

#### Expense Model

| Field        | Data Type                            | Description                                   |
|--------------|--------------------------------------|---------------------------------------------- |
| `user`       | *`ObjectId`*                         | Reference to the user. Required.              |
| `amount`     | *`Number`*                           | Expense amount. Required.                     |
| `category`   | *`ObjectId`*                         | Reference to the category. Required.          |
| `description`| *`String`*                           | Expense description. Optional.                |
| `date`       | *`Date`*                             | Date of the expense. Default: Current date.   |
| `account`    | *`ObjectId`*                         | Reference to the account. Optional.           |

<br>

#### Profit Model

| Field        | Data Type                            | Description                                   |
|--------------|--------------------------------------|---------------------------------------------- |
| `user`       | *`ObjectId`*                         | Reference to the user. Required.              |
| `amount`     | *`Number`*                           | Profit  amount. Required.                     |
| `category  ` | *`ObjectId`*                         | TO IMPLEMENT                                  |
| `description`| *`String`*                           | Expense description. Optional.                |
| `date`       | *`Date`*                             | Date of the profit. Default: Current date.    |
| `account`    | *`ObjectId`*                         | Reference to the account. Optional.           |

<br>

#### Recurring Expense Model

| Field        | Data Type                            | Description                                                                       |
|--------------|--------------------------------------|---------------------------------------------------------------------------------- |
| `user`       | *`ObjectId`*                         | Reference to the user. Required.                                                  |
| `amount`     | *`Number`*                           | Recurring expense amount. Required.                                               |
| `category  ` | *`ObjectId`*                         | Reference to the category. Required.                                              |
| `description`| *`String`*                           | Recurring expense description. Optional.                                          |
| `startDate`  | *`Date`*                             | Start date of the recurring expense. Required.                                    |
| `endDate`    | *`Date`*                             | End date of the recurring expense. Optional.                                      |
| `frequency`  | *`String`*                           | Frequency of the expense. Allowed values: "daily", "weekly", "monthly". Required. |

<br>

#### Category Model

| Field        | Data Type                            | Description                                                                       |
|--------------|--------------------------------------|---------------------------------------------------------------------------------- |
| `user`       | *`ObjectId`*                         | Reference to the user. Required.                                                  |
| `name`       | *`String`*                           | Name of the category. Required.                                                   |
| `type  `     | *`String`*                           | Type of the category. Allowed values: "expense", "profit". Required.              |
| `icon`       | *`String`*                           | Icon for the category. Optional.                                                  |


<br>