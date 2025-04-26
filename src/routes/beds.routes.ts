const express = require('express');
const router = express.Router();

import { getAllBeds, addBed, addBeds } from "../controllers/bed.controller";

router.post('/bed', addBed);
router.post('/beds', addBeds);
router.get('/beds', getAllBeds);

module.exports = router;