import userServices from "../services/userServices"
let handleLogin = async (req, res) => {
  let email = req.body.email.trim();
  let pass = req.body.password.trim();
  let dataToView = { errCode: 1 }
  let status = 500;
  if (!email || !pass) {
    dataToView.mess = 'Email or password null! please input email password';
  } else {
    let userData = await userServices.handleUserLogin(email, pass)
    dataToView.errCode = userData.statusErr;
    dataToView.mess = userData.messErr;
    dataToView.userInfo = userData.userInfo ? userData.userInfo : {};
    status = 200;
  }
  return res.status(status).json(dataToView);
}

let handleAllUser = async (req, res) => {
  let id = req.query.id;
  let dataUsers = {
    errCode: 1,
    mess: 'Null user',
    data: {},
  }
  if (id) {
    let users = await userServices.getAllUser(id);
    if (users) {
      dataUsers.errCode = 0;
      dataUsers.mess = 'ok';
      dataUsers.data = users;
    }
  }
  return res.status(200).json(dataUsers);
}
let handleCreateUser = async (req, res) => {
  let mess = await userServices.createNewUser(req.body);
  return res.status(200).json({ mess });
}
let handleEditUser = async (req, res) => {
  let data = req.body;
  let messErr = {};
  let status = 500;
  if (data) {
    let mess = await userServices.updateUser(data);
    if (mess.errCode === 0) {
      messErr = mess;
      status = 200;
    } else {
      messErr = mess;
    }
  }
  return res.status(status).json({ messErr });
}
let handleDeleteUser = async (req, res) => {
  let idUser = req.body.id;
  let mess = {};
  let status = 500;
  if (idUser) {
    mess = await userServices.deleteUser(idUser);
    if (mess.errCode === 0) {
      status = 200;
    }
  }
  return res.status(status).json({ mess });
}
module.exports = {
  handleLogin: handleLogin,
  handleAllUser: handleAllUser,
  handleCreateUser: handleCreateUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
}