import { Router } from "express";
import { getDogsRace, getOneDog} from "../controllers/DogsControllers.js";



const router = Router();
 

router.get('/dogs/', getDogsRace)
router.get('/dogs/:name', getOneDog)




export default router
