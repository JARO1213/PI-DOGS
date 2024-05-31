import { Dogs } from "../modules/Dogs.js";
import { Temperaments } from "../modules/Temperaments.js";

export const getDogsRace =('/breeds/name', async (req, res) => {
  try {
        const getDRace = await Dogs.findAll({
            attributes: ['name']
        });
    if (!getDRace)
      return res.status(404).json({ message: "It cannot be found!" });
       return res.status(200).json(getDRace);
    // console.log(req.body);  
 } catch (error) {
    return res.status(500).json({ message: error.message });
   }
});
