import db from '../models/index';
import bcrypt from 'bcryptjs';
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
module.exports = {
  handleUserLogin: handleUserLogin,
}