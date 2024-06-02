import { Model } from "sequelize";
import { Dogs } from "../modules/Dogs.js";
import { Temperaments } from "../modules/Temperaments.js";

export const getDogsRace = async (req, res) => {
  try {
    const getDRaze = await Dogs.findAll({
      attributes: ["name"],
    });
    if (!getDRaze)
      return res.status(404).json({ message: "It cannot be found!" });
    return res.status(200).json(getDRaze);
    // console.log(req.body);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneDog = async (req, res) => {
  const { name } = req.params;
  try {
    const getOneRaze = await Dogs.findOne({
      where: {
        name: name},
        include: [
          {
            model: Temperaments,
            through: {
              attributes: [], // eliminar atributos intermedios
            },
          },
        ],
          });
    if (!getOneRaze){
      return res.status(404).json({ message: "It cannot be found!" });
  }
  const temperaments = getOneRaze.Temperaments.map(temp => temp.name);
  const dogData = {
    id: getOneRaze.id,
    image: getOneRaze.image,
    name: getOneRaze.name,
    height: getOneRaze.height,
    weight: getOneRaze.weight,
    life_span: getOneRaze.life_span,
    temperaments: temperaments,
  };
    return res.status(200).json(dogData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTemp = async (req, res) => {
  try {
    const getTemperament = await Temperaments.findAll({
      attributes: ["name"],
    });
    if (!getTemperament)
      return res.status(404).json({ message: "It cannot be anyone!" });
    return res.status(200).json(getTemperament);
    // console.log(req.body);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
