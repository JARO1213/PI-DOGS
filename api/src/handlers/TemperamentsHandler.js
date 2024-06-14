
import { Temperaments } from "../modules/Temperaments.js";
import { filterAndFetch } from "../controllers/dogControllers.js";

export const getTemp = async (req, res) => {
    try {
      const getApitem = await filterAndFetch() 
      const araTemp = (getApitem.filter(dogs => dogs.dbApi.temperament ).map(dog => dog.dbApi.temperament))
      const getTemperament = await Temperaments.findAll({
      attributes: ['name']
      });
      if (!getTemperament && araTemp.length === 0){
        return res.status(404).json({ message: "It cannot be anyone!" });
      }
      
        const combinedResults =  [getTemperament, ...araTemp]
        return res.status(200).json(combinedResults);
      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };