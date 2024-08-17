const express = require('express');
const Account = require('../models/Account.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const router = express.Router();

// GET /api/accounts/:userId
router.get('/:userId', isAuthenticated, async (req, res) => {
    try {
        const { userId } = req.params;
        const accounts = await Account.find({ user: userId });
        if (accounts.length > 0) {
            res.status(200).json(accounts);
        } else {
            res.status(404).json({ message: 'No accounts found for this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving accounts', error: error.message });
    }
});

// POST /api/accounts
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { name, balance } = req.body;
        const userId = req.payload._id; 

        const newAccount = new Account({
            user: userId,
            name,
            balance,
        });

        const savedAccount = await newAccount.save();
        res.status(201).json(savedAccount);
    } catch (error) {
        res.status(500).json({ message: 'Error creating account', error: error.message });
    }
});

// PUT /api/accounts/:accountId
router.put('/:accountId', isAuthenticated, async (req, res) => {
    try {
        const { accountId } = req.params;
        const updatedAccount = await Account.findByIdAndUpdate(accountId, req.body, { new: true });

        if (!updatedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ message: 'Error updating account', error: error.message });
    }
});

// DELETE /api/accounts/:accountId
router.delete('/:accountId', isAuthenticated, async (req, res) => {
    try {
        const { accountId } = req.params;
        const deletedAccount = await Account.findByIdAndDelete(accountId);

        if (!deletedAccount) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ message: 'Account deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error: error.message });
    }
});

module.exports = router;
