import { Dogs } from "../modules/Dogs.js";
import { Temperaments } from "../modules/Temperaments.js";

export const getDogsRace =(async (req, res) => {
  try {
        const getDRaze = await Dogs.findAll({
            attributes: ['name']
        });
    if (!getDRaze)
      return res.status(404).json({ message: "It cannot be found!" });
       return res.status(200).json(getDRaze);
    // console.log(req.body);  
 } catch (error) {
    return res.status(500).json({ message: error.message });
   }
});

export const getOneDog =(async (req, res) => {
   
   try {
      const {name} = req.params; 
         const getOneRaze = await Dogs.findByPk(name);
             
     if (!getOneRaze)
       return res.status(404).json({ message: "It cannot be found!" });
      res.status(200).json(getOneRaze);
     // console.log(req.body);  
  } catch (error) {
     return res.status(500).json({ message: error.message });
    }
 });
 