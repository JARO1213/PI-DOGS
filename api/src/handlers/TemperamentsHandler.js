
import { Temperaments } from "../modules/Temperaments.js";

export const getTemp = async (req, res) => {
    try {
      const getTemperament = await Temperaments.findAll({
      attributes: ['name']
      });
      if (!getTemperament)
        return res.status(404).json({ message: "It cannot be anyone!" });
      return res.status(200).json(getTemperament);
      // console.log(req.body);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };