import { Router } from "express";
import { getRecipeByHoliday } from "../controllers/recipeController";
 
const router = Router();
router.get('/:holidayId', getRecipeByHoliday);
 
export default router;