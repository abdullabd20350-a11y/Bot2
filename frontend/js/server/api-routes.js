const express = require('express');
const botManager = require('./bot-manager');
const router = express.Router();

// ?????? ??? ???? ???????
router.get('/bots', async (req, res) => {
    try {
        const bots = await botManager.getAllBotsStatus();
        res.json(bots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ????? ??? ????
router.post('/bots', async (req, res) => {
    try {
        const { botName, serverIp, port } = req.body;

        // ?????? ?? ??? ????????
        if (!botName || !serverIp) {
            return res.status(400).json({ error: '??? ????? ????? ??????? ???????' });
        }

        const bot = await botManager.addBot({ botName, serverIp, port: port || 19132 });
        res.status(201).json(bot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ????? ???
router.post('/bots/:id/start', async (req, res) => {
    try {
        await botManager.startBot(req.params.id);
        res.json({ message: '?? ????? ????? ?????' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ????? ???
router.post('/bots/:id/stop', async (req, res) => {
    try {
        await botManager.stopBot(req.params.id);
        res.json({ message: '?? ????? ????? ?????' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ??? ???
router.delete('/bots/:id', async (req, res) => {
    try {
        await botManager.deleteBot(req.params.id);
        res.json({ message: '?? ??? ????? ?????' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
