import express from 'express';
import { createMailGroups, deleteMailGroups, getMailGroups } from '../controllers/mailGroupsController.js';

const ROUTER = express.Router();

ROUTER.get("/mail-groups", getMailGroups);
ROUTER.post("/mail-groups/add", createMailGroups);
ROUTER.delete("/mail-groups/remove/:id", deleteMailGroups);

export default ROUTER;