const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

class OtpCode extends Model {}

OtpCode.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    },

    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    attempts: {
      type: DataTypes.TINYINT.UNSIGNED,
      defaultValue: 0
    },

    resendAt: {
      type: DataTypes.DATE,
      allowNull: false
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }

  },
  {
    sequelize,
    modelName: 'OtpCode',
    tableName: 'otp_codes',
    timestamps: true
  }
);

module.exports = OtpCode;