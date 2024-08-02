/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         name:
 *           type: string
 *           description: The name of the task
 *       example:
 *         id: d5fE_asz
 *         name: Do homework
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: L'ID de l'utilisateur.
 *         name:
 *           type: string
 *           description: Le nom de l'utilisateur.
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur.
 *         age:
 *           type: integer
 *           description: L'âge de l'utilisateur.
 *       example:
 *         id: "12345"
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 *         age: 30
 */
