// routes/Account.routes.js
const express = require('express');
const Account = require('../models/Account.model');
const router = express.Router();

// Get
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const accounts = await Account.find({ user: userId })
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Post
router.post('/', async (req, res) => {
    const { user, name, balance } = req.body

    const newAccount = new Account({
        user,
        name,
        balance
    });

    try {
        const savedAccount = await newAccount.save()
        res.status(201).json(savedAccount);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Put
router.put('/:accountId', async (req, res) => {
    try {
        const { accountId } = req.params
        const updatedAccount = await Account.findByIdAndUpdate(accountId, req.body, { new: true })
        res.status(200).json(updatedAccount)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Delete 
router.delete('/:accountId', async (req, res) => {
    try {
        const { accountId } = req.params
        await Account.findByIdAndDelete(accountId)
        res.status(200).json({ message: 'Account deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
