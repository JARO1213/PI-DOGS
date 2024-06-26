import { literal, DataTypes, INTEGER } from "sequelize";
import { sequelieze } from "../database/database.js";
import { Temperaments } from "./Temperaments.js";

export const Dogs = sequelieze.define( "dogs", {
    id:{type:DataTypes.INTEGER, primaryKey: true, defaultValue: literal("nextval('custom_sequence')")},   //ID.\*
    image: {type:DataTypes.STRING}, // Imagen.\*
    name: {type:DataTypes.STRING}, // Nombre.\*
    weightImperial:  {type:DataTypes.STRING},
    weightMetric: {type:DataTypes.STRING}, 
    heightImperial: {type:DataTypes.STRING}, 
    heightMetric: {type:DataTypes.STRING}, 
    life_span: {type:DataTypes.STRING}, // Longevidad.\*    
    //temperament: {type:DataTypes.STRING}, // Temperamento.\*
    //temperament: {type:DataTypes.STRING}, // Temperamento.\*
    //temperament: {type:DataTypes.STRING}, // Temperamento.\*
})

sequelieze.beforeSync(() => {
   sequelieze.query('CREATE SEQUENCE IF NOT EXISTS custom_sequence CACHE 50');
  
   });
   await sequelieze.sync();   // This is to create a sequence that can be used automaticly
    

   Dogs.belongsToMany(Temperaments, {through: 'DogsTemperaments'})
   Temperaments.belongsToMany(Dogs, {through: 'DogsTemperaments'})

sequelieze.sync
export default Dogs