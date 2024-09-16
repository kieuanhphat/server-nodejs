import db from '../models/index';
import bcrypt from 'bcryptjs';
import CrudServices from './crudServices';
import { where } from 'sequelize';

let handleUserLogin = (email, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await checkLogin(email, pass);
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  })
}
let checkEmail = async (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      })
      if (user) {
        resolve(1);
      } else {
        resolve(0);
      }
    } catch (e) {
      reject(e);
    }
  })
}
let checkLogin = (userEmail, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let user = await db.User.findOne({
        attributes: ['email', 'roleId', 'password'],
        where: { email: userEmail },
        raw: true,
      })
      if (user) {
        let check = await bcrypt.compareSync(password, user.password);
        if (check) {
          userData.statusErr = 0;
          userData.messErr = 'Log in successfully';
          delete user.password;
          userData.userInfo = user;
        } else {
          userData.statusErr = 1;
          userData.messErr = 'Your password does not exist'
        }
      } else {
        userData.statusErr = 1;
        userData.messErr = 'Your email does not exist, Please try other email'
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  })
}

let getAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUser = '';
      if (id === 'all') {
        listUser = await db.User.findAll({
          attributes: {
            exclude: ['password']
          }
        });
      }
      if (id && id !== 'all') {
        listUser = await db.User.findOne({
          attributes: {
            exclude: ['password']
          },
          where: { id: id },
        });
      }
      resolve(listUser);
    } catch (e) {
      reject(e);
    }
  })
}

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await CrudServices.hashUserPassword(data.password);
      let checkUser = await checkEmail(data.email);
      let messCreate = {};
      if (checkUser === 0) {
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPasswordFromBcrypt,
          address: data.address,
          gender: data.gender === '1' ? true : false,
          phoneNumber: data.phoneNumber,
          roleId: data.roleId,
        });
        messCreate.errCode = 0;
        messCreate.mess = 'OK';
      } else {
        messCreate.errCode = 1;
        messCreate.mess = 'User already exists! Please use other email'
      }

      resolve(messCreate);
    } catch (e) {
      reject(e);
    }
  })
}

let deleteUser = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    let messDelete = {};
    try {
      let user = await db.User.findOne({
        where: { id: idUser }
      });
      if (user) {
        await db.User.destroy({
          where: { id: idUser }
        })
        messDelete.errCode = 0;
        messDelete.mess = 'OK';
      } else {
        messDelete.errCode = 1;
        messDelete.mess = 'User not found';
      }
      resolve(messDelete);
    } catch (e) {
      reject(e);
    }
  });
}
let updateUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let messUpdate = {};

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false
      })

      if (user) {
        let checkUserDB = await checkEmail(data.email);
        let checkUserData = user.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender === '1' ? true : false;
        user.roleId = data.roleId;
        if (checkUserData == data.email) {
          await user.save();
          messUpdate.errCode = 0;
          messUpdate.mess = 'Update User success';
        } else {
          if (checkUserDB === 0) {
            await user.save();
            messUpdate.errCode = 0;
            messUpdate.mess = 'Update User success';
          } else {
            messUpdate.errCode = 1;
            messUpdate.mess = 'User already exists! Please use other email';
          }
        }

      } else {
        messUpdate.errCode = 1;
        messUpdate.mess = 'User not found';
      }
      resolve(messUpdate);
    } catch (e) {
      reject(e);
    }
  });

}
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
}