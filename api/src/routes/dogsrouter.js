import { Router } from "express";
import { getDogsRace, getOneDog, getId } from "../handlers/DogsHandlers.js";
import  {getTemp} from "../handlers/TemperamentsHandler.js";
// import { getDogsTem } from "../controllers/dogControllers.js";


const router = Router();
 


router.get('/dogs/', getDogsRace)
router.get('/dogs/:id', getId)
router.get('/temperaments/', getTemp)
router.get('/dogsName/:name/', getOneDog)





export default router
