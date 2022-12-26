import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
 'credit_db',
 'root',
 'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  },
  
);

export default sequelize;