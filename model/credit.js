import { Sequelize } from "sequelize"
import sequelize from "../seq-db.js"

    const Credit = sequelize.define("tcredit",{
        NumCre:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        DatCred:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        MonCre:{
            type:Sequelize.INTEGER,
        },
        DurCre:{
            type:Sequelize.INTEGER,
        },
        TauCre:{
            type:Sequelize.INTEGER,
        },
        AnnCred:{
            type:Sequelize.INTEGER,
        },
        DatPreVer:{
            type:Sequelize.STRING,
        },
        NumCli:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    },
    {
        tableName: 'tcredit',
        timestamps: false
    })

export default Credit