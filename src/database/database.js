import  {Sequelize} from "sequelize";

export const sequelieze = new Sequelize ('dogs', 'postgres','123456', {
    host: 'localhost',
    dialect: 'postgres',
});