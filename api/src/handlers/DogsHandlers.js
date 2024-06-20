
import { Dogs } from "../modules/Dogs.js";
import { filterAndFetch } from "../controllers/dogControllers.js";
import Temperaments from "../modules/Temperaments.js";



export const getDogsRace = async (req, res) => {
  try {
    const dogApi = await filterAndFetch()
    const getDRaze = await Dogs.findAll({
      attributes: ["name"],
    });
    if (!getDRaze)
      return res.status(404).json({ message: "It cannot be found!" });
    const dbNames = getDRaze.map(dog => dog.name);
    const apiNames = dogApi.map(dog => dog.dbApi.name);
    const allNames = [...new Set([...dbNames, ...apiNames])];
    return res.status(200).json(allNames);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getId = async (req, res) => {
  try {
    const { id } = req.params;
    const idStr = id.toString();
    console.log(idStr)
    const apiDog = await filterAndFetch()
    const idApi = apiDog.filter(dog => dog.dbApi.id && dog.dbApi.id === idStr)
    const getOneRaze = await Dogs.findByPk(idStr, {
      include: {
        model: Temperaments,
        attributes: ["name"],
        through: {
          attributes: []
        }
      },

    });

    if (getOneRaze) {
      return res.status(200).json(getOneRaze)
    };

    if (idApi) {
      return res.status(200).json(idApi)
    }

    return res.status(404).json({ message: "That Dog doesn't exist It cannot be found!" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneDog = async (req, res) => {
  try {
    const { name } = req.params;
    const lowerCaseName = name.toLowerCase()
    const dogsDat = await filterAndFetch()
    const filterD = dogsDat.filter(dogs => dogs.dbApi.name && dogs.dbApi.name.toLowerCase() === name.toLowerCase())
    const getOneRaze = await Dogs.findOne(
      {
        where: { name: lowerCaseName, name },
        include: {
          model: Temperaments,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      })
    if (!getOneRaze && filterD.length === 0) {
      return res.status(404).json({ message: "It cannot be found!" });
    }
    // console.log(getOneRaze.name.toLowerCase())

    const combinedResults = getOneRaze ? [getOneRaze, ...filterD] : [...filterD];
    return res.status(200).json(combinedResults);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDog = async (req, res) => {
  try {
    const { name, weight, height, life_span, image, temperaments } = req.body;

    if (!name || !weight || !height || !temperaments || temperaments.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newDog = await Dogs.create({
      name,
      weight,
      height,
      life_span,
      image
    });

    const temperamentPromises = temperaments.map(async temp => {
      const [temperament] = await Temperaments.findOrCreate({
        where: { name: temp }
      });
      return temperament;
    });

    const temperamentInstances = await Promise.all(temperamentPromises);
    await newDog.addTemperaments(temperamentInstances);

    return res.status(201).json(newDog);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllDogs = async (req, res) => {
  try {
    const dogApi = await filterAndFetch()
    const getDRaze = await Dogs.findAll({
      include: {
        model: Temperaments,
        }
    });
    if (!getDRaze)
      return res.status(404).json({ message: "It cannot be found!" });
    let allDogs = [...new Set([...dogApi, ...getDRaze])];
    if (allDogs.length > 19) {
      allDogs = allDogs.slice(0, 50);
    }
    return res.status(200).json(allDogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDogsBd = async (req, res) => {
  try {
   
    const getDog = await Dogs.findAll({
      include: {
        model: Temperaments,
        }
    });
    if (!getDog)
      return res.status(404).json({ message: "It cannot be found!" });
    let allDogs = [...new Set([ ...getDog])];
    if (allDogs.length > 19) {
      allDogs = allDogs.slice(0, 50);
    }
    return res.status(200).json(allDogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDogsApi = async (req, res) => {
  try {
    const dogApi = await filterAndFetch() 
    
    if (!dogApi)
      return res.status(404).json({ message: "It cannot be found!" });
    let apiDogs = [...new Set([...dogApi])];
    if (apiDogs.length > 19) {
      apiDogs = apiDogs.slice(0, 50);
    }
    return res.status(200).json(apiDogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
