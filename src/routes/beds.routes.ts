const express = require('express');
const router = express.Router();

import { getAllBeds, addBed, addBeds, deleteBed } from "../controllers/bed.controller";

router.post('/add', addBed);
router.post('/add-multiple', addBeds);
router.get('/get-all', getAllBeds);
router.delete('/:id', deleteBed);

export default router;