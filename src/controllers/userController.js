import userServices from "../services/userServices"
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  let dataToView = {}
  dataToView.errCode = 1;
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

module.exports = {
  handleLogin: handleLogin,
}