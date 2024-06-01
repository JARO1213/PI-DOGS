import { DataTypes } from "sequelize";
import { sequelieze } from "../database/database.js";


export const Temperaments = sequelieze.define ('temperaments', {
    id: {type:DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
} ) 