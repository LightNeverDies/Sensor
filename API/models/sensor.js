/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sensor', {
    sensor_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    sensor_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sensor_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'sensor',
    timestamps: false
  });
};
