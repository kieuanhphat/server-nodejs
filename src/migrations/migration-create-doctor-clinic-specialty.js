'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctor_clinic_specialty', {
    // currentNumber: DataTypes.INTEGER,
    // maxNumber: DataTypes.INTEGER,
    // date: DataTypes.DATE,
    // timeType: DataTypes.STRING,
    // doctorId: DataTypes.INTEGER
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        type: Sequelize.INTEGER
      },
       clinicId: {
        type: Sequelize.INTEGER
      },
       specialtyId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctor_clinic_specialty');
  }
};