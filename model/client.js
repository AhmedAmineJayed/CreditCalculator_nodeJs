import { Sequelize } from "sequelize"
import sequelize from "../seq-db.js"

    const Client = sequelize.define("tclient",{
        NumCli:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        NomCli:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        PassCli:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        AdrCli:{
            type:Sequelize.STRING,
        },
        VilCli:{
            type:Sequelize.STRING,
        },
        TelCli:{
            type:Sequelize.STRING,
        },
        MailCli:{
            type:Sequelize.STRING,
        },
    },
    {
        tableName: 'tclient',
        timestamps: false
    })

export default Client