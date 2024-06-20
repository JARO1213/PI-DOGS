import { Router } from "express";
import { getDogsRace, getOneDog, getId, createDog, getAllDogs,getDogsBd, getDogsApi } from "../handlers/DogsHandlers.js";
import  {getTemp} from "../handlers/TemperamentsHandler.js";
// import { getDogsTem } from "../controllers/dogControllers.js";


const router = Router();
 


router.get('/dogs/', getDogsRace)
router.get('/dogs/:id', getId)
router.get('/temperaments/', getTemp)
router.get('/dogsName/:name/', getOneDog)
router.post('/dogs/', createDog)
router.get('/allDogs/', getAllDogs )
router.get('/dogsBd/', getDogsBd )
router.get('/dogsApi/', getDogsApi )





export default router
