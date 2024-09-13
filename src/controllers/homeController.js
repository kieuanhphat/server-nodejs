import db from '../models/index';
import crudServices from '../services/crudServices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }

}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let mess = await crudServices.createNewUser(req.body);
    console.log(mess);
    return res.send('OK')
}

let getEditCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let dataUser = await crudServices.getUserById(id);

        return res.render('editCRUD.ejs', {
            user: dataUser,
        });
    } else {
        return res.render('crud.ejs');
    }
}

let putCRUD = async (req, res) => {
    let dataUser = req.body;
    let allUser = await crudServices.updateDate(dataUser);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser,
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let dataUser = await crudServices.deleteUserById(id);
        if (dataUser) {
            return res.render('displayCRUD.ejs', {
                dataTable: dataUser,
            });
        } else {
            return res.send('user not found!');
        }
    } else {
        return res.send('user not found!');
    }
}

let displayGetCRUD = async (req, res) => {
    let data = await crudServices.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    });
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    deleteCRUD: deleteCRUD,
    putCRUD: putCRUD,
}