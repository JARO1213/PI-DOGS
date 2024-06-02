import { Router } from "express";
import { getDogsRace, getOneDog, getTemp} from "../controllers/DogsControllers.js";



const router = Router();
 

router.get('/dogs/', getDogsRace)
router.get('/dogs/:name', getOneDog)
router.get('/temperaments/', getTemp)





export default router
