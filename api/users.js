const { 
    register, 
    login, 
    getUser, 
    getUsers, 
    updateUser, 
    changeUserRole, 
    deleteUser 
} = require('../controllers/userController');

const router = require("express").Router();

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */
router.post('/user/register', register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User login
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/user/login', login);

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user
 *     description: Retrieves the authenticated user's profile.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/user/me', getUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieves all users (admin only).
 *     responses:
 *       200:
 *         description: List of users retrieved
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user info
 *     description: Update user's name or email by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.patch('/user/:id', updateUser);

/**
 * @swagger
 * /api/user/role/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Change user role
 *     description: Updates a user's role (admin/user).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User role updated
 *       404:
 *         description: User not found
 */
router.patch('/user/role/:id', changeUserRole);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     description: Deletes a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/user/:id', deleteUser);

module.exports = router;
