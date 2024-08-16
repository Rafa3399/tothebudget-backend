// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");


const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

const authRoutes = require("./routes/auth.routes.js");
const accountRoutes = require('./routes/Account.routes.js')
const expenseRoutes = require('./routes/Expense.routes.js')
const profitRoutes = require('./routes/Profit.routes.js')
const recurringExpenseRoutes = require('./routes/RecurringExpense.routes.js')


app.use("/auth", authRoutes);
app.use('/api/accounts', accountRoutes)
app.use('/api/expenses', expenseRoutes)
app.use('/api/profits', profitRoutes)
app.use('/api/recurring-expenses', recurringExpenseRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
