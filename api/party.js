const express = require('express');
const { playGame, getUserHistory, getAllHistory } = require('../controllers/party');
const router = express.Router();

/**
 * @swagger
 * /api/game/play:
 *   post:
 *     tags:
 *       - Party
 *     summary: Play a TrueNumber game
 *     description: Launch a game, generate a number, update balance, and save history. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Game played successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   enum: [gagné, perdu]
 *                 generatedNumber:
 *                   type: integer
 *                 newBalance:
 *                   type: integer
 */
router.post('/game/play', playGame);

/**
 * @swagger
 * /api/history:
 *   get:
 *     tags:
 *       - Party
 *     summary: Get current user's party history
 *     description: Retrieve the history of games played by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: History retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   gameId:
 *                     type: string
 *                   date:
 *                     type: string
 *                   generatedNumber:
 *                     type: integer
 *                   result:
 *                     type: string
 *                   balanceChange:
 *                     type: integer
 *                   newBalance:
 *                     type: integer
 */
router.get('/history', getUserHistory);

/**
 * @swagger
 * /api/history/all:
 *   get:
 *     tags:
 *       - Party
 *     summary: Get all users' party history (admin only)
 *     description: Retrieve the history of all games played by all users. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All history retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   gameId:
 *                     type: string
 *                   date:
 *                     type: string
 *                   generatedNumber:
 *                     type: integer
 *                   result:
 *                     type: string
 *                   balanceChange:
 *                     type: integer
 *                   newBalance:
 *                     type: integer
 */
router.get('/history/all', getAllHistory);

module.exports = router;