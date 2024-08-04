const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Folder = sequelize.define(
  'Folder',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // References the Users table
        key: 'id',
      },
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Folders', // References the Folders table
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

Folder.belongsTo(Folder, { as: 'parent', foreignKey: 'parentId' });
Folder.hasMany(Folder, { as: 'subfolders', foreignKey: 'parentId' });

module.exports = Folder;
