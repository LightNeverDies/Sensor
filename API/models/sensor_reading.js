/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sensor_reading', {
    reading_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    temperature: {
      type: DataTypes.REAL,
      allowNull: false
    },
    humidity: {
      type: DataTypes.REAL,
      allowNull: false
    },
    reading_time: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sensor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sensor',
        key: 'sensor_id'
      }
    }
  }, {
    tableName: 'sensor_reading',
    timestamps: false
  });
};
