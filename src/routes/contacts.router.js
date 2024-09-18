const express = require("express");
const contactsController = require("../controllers/contacts.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const avatarUpload = require("../middlewares/avatar-upload.middleware");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/contacts", router);

  /**
   * @swagger
   * /api/v1/contacts:
   *   get:
   *     summary: Get contacts by filter
   *     description: Get contacts by filter
   *     parameters:
   *       - in: query
   *         name: favorite
   *         schema:
   *           type: boolean
   *         description: Filter by favorite status
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Filter by contact name
   *       - $ref: '#/components/parameters/limitParam'
   *       - $ref: '#/components/parameters/pageParam'
   *     tags:
   *       - contacts
   *     responses:
   *       200:
   *         description: A list of contacts
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     contacts:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Contact'
   *                     metadata:
   *                       $ref: '#/components/schemas/PaginationMetadata'
   */

  router.get("/", contactsController.getContactsByFilter);

  /**
   * @swagger
   * /api/v1/contacts:
   *   post:
   *     summary: create a new contact
   *     description: create a new contact
   *     requestBody:
   *          required: true
   *          content:
   *            multipart/form-data:
   *              schema:
   *                $ref: '#/components/schemas/Contact'
   *     tags:
   *       - contacts
   *     responses:
   *       201:
   *         description: A new contact
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     contacts:
   *                         $ref: '#/components/schemas/Contact'
   */
  router.post("/", avatarUpload, contactsController.createContact);

  /**
   * @swagger
   *  /api/v1/contacts:
   *    delete:
   *      summary: delete all contacts
   *      description: delete all contacts
   *      tags:
   *        - contacts
   *      responses:
   *        200:
   *          description: all contacts deteled
   *          $ref: '#/components/responses/200NoData'
   */
  router.delete("/", contactsController.deleteAllContacts);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/contacts/{id}:
   *   get:
   *     summary: Get contacts by ID
   *     description: Get contacts by ID
   *     parameters:
   *       - $ref: '#/components/parameters/contactIdParam'
   *     tags:
   *       - contacts
   *     responses:
   *       200:
   *         description: A contact
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     contacts:
   *                         $ref: '#/components/schemas/Contact'
   */
  router.get("/:id", contactsController.getContact);
  /**
   * @swagger
   * /api/v1/contacts/{id}:
   *   put:
   *     summary: update contacts by ID
   *     description: update contacts by ID
   *     parameters:
   *       - $ref: '#/components/parameters/contactIdParam'
   *     requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            $ref: '#/components/schemas/Contact'
   *     tags:
   *       - contacts
   *     responses:
   *       200:
   *         description: A update contact
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     contacts:
   *                         $ref: '#/components/schemas/Contact'
   */
  router.put("/:id", avatarUpload, contactsController.updateContact);
  /**
   * @swagger
   *  /api/v1/contacts/{id}:
   *    delete:
   *      summary: delete contacts by id
   *      description: delete contact by id
   *      parameters:
   *        - $ref: '#/components/parameters/contactIdParam'
   *      tags:
   *        - contacts
   *      responses:
   *        200:
   *          description: contacts deteled
   *          $ref: '#/components/responses/200NoData'
   */
  router.delete("/:id", contactsController.deleteContact);
  router.all("/", methodNotAllowed);
};
