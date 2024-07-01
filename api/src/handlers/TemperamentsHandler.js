
import { Temperaments } from "../modules/Temperaments.js";
import { filterAndFetch } from "../controllers/dogControllers.js";

export const getTemp = async (req, res) => {
  try {
    const getApitem = await filterAndFetch()
    const araTemp = (getApitem.filter(dogs =>
      dogs.dbApi.temperament).map(dog => dog.dbApi.temperament.split(', ')
        .map(temp => ({ name: temp.trim() }))));
    
    const getTemperament = await Temperaments.findAll({
      attributes: ['name']
    });

    const dbTemperaments = getTemperament.map(t => ({name:t.name}));
    

    if (!dbTemperaments && araTemp.length === 0) {
      return res.status(404).json({ message: "It cannot be anyone!" });
    }
    
    const combinedResults = [dbTemperaments, ...araTemp.flat()]
   
    return res.status(200).json(combinedResults);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};