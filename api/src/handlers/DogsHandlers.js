
import { Dogs } from "../modules/Dogs.js";
import { filterAndFetch } from "../controllers/dogControllers.js";
import Temperaments from "../modules/Temperaments.js";
import { where } from "sequelize";
import { all } from "axios";


export const getDogsRace = async (req, res) => {
  try {
    const dogApi = await filterAndFetch()
    const getDRaze = await  Dogs.findAll({
      attributes: ["name"],
    });
    if (!getDRaze)
    return res.status(404).json({ message: "It cannot be found!" });
    const dbNames = getDRaze.map(dog => dog.name);
    const apiNames = dogApi.map(dog =>  dog.dbApi.name);
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
    console.log('converter', idStr)
       const getOneRaze = await Dogs.findByPk(id, {
       include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
       attributes: []
      }
  },
  order: [['createdAt', 'DESC']]    
      });
      if (getOneRaze){
         return res.status(200).json(getOneRaze)};
         const dogApi = await filterAndFetch(id)
         const idApi = dogApi.find(dog => dog.id == idStr)
      if (idApi){  
          console.log(rout())
         return res.status(200).json(idApi)
      } 

        return res.status(404).json({ message: "That Dog doesn't exist It cannot be found!" });
       
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const getOneDog = async (req, res) => {
  
  try {
    const { name } = req.query;
    const dogsDat= await filterAndFetch(name)
    // console.log(dogsDat)
    // const nameLyU =  dogsDat.filter(each => each.name.toLowerCase().includes(name.toLowerCase()))
    // console.log(nameLyU)
    const getOneRaze = await Dogs.findOne(
       {  attributes: ["name"],
      where: name ? { name: { [Op.iLike]: `%${name}%` } }:{},
      
      include: {
        model: Temperaments,
        attributes: ["name"],
        through: {
         attributes: []
        }
    },
  
      })
      if (!getOneRaze){
        return res.status(404).json({ message: "It cannot be found!" });
      }
    
      const dbNames = getOneRaze ? [getOneRaze.name] : [];
      const apiNames = dogsDat
        .filter(dog => dog && dog.dbApi && dog.dbApi.name)
        .map(dog => dog.dbApi.name);
  
      const allNames = [...new Set([...dbNames, ...apiNames])];
      return res.status(200).json(allNames);  
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


