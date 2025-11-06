import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';
export interface HolidayAttributes {
    id: number;
    title: string;
    description: string;
    main_meal: string;
    date_mm_dd: string; 
}


interface HolidayCreationAttributes extends Optional<HolidayAttributes, 'id'> {}

export class Holiday extends Model<HolidayAttributes, HolidayCreationAttributes> implements HolidayAttributes {
    public id!: number; 
    public title!: string;
    public description!: string;
    public main_meal!: string;
    public date_mm_dd!: string;
    public readonly createdAt!: Date; 
    public readonly updatedAt!: Date;
}

Holiday.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        description: {
            type: new DataTypes.TEXT,
            allowNull: false,
        },
        main_meal: {
            type: new DataTypes.STRING(64),
            allowNull: false,
        },
        date_mm_dd: {
            type: new DataTypes.STRING(5), 
            allowNull: false,
        }
    },
    {
        tableName: 'holidays',
        sequelize: sequelize,
    }
);