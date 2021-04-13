const fs = require('fs');

exports.addMemberPage = (req, res) => {
    res.render('add-member.ejs', {
        title: "Welcome to Điện Tử Shop | Thêm Thành Viên Mới",
        message: ''
    });
};

exports.addMember = (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    let message = '';
    let ho_ten = req.body.ho_ten;
    let dia_chi = req.body.dia_chi;
    let vi_tri = req.body.vi_tri;
    let dien_thoai = req.body.dien_thoai;
    let user = req.body.user;
    let pass = req.body.pass;
    let uploadedFile = req.files.avt;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image_name = user + '.' + fileExtension;

    let usernameQuery = "SELECT * FROM `member` WHERE user = '" + user + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'User Đã Tồn Tại';
            res.render('add-member.ejs', {
                message,
                title: "Welcome to Điện Tử Shop | Thêm Thành Viên Mới"
            });
        } else {
            // check the filetype before uploading it
            if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database
                    let query = "INSERT INTO `member` (ho_ten, dia_chi, vi_tri, dien_thoai, user, pass, avt) VALUES ('" +
                        ho_ten + "', '" + dia_chi + "', '" + vi_tri + "','" + dien_thoai + "', '" + user + "', '" + pass + "', '" + image_name + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/homemb');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('add-member.ejs', {
                    message,
                    title: "Welcome to Điện Tử Shop | Thêm Thành Viên Mới"
                });
            }
        }
    });
}

exports.editMemberPage = (req, res) => {
    let playerId = req.params.mamb;
    let query = "SELECT * FROM `member` WHERE mamb = '" + playerId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-member.ejs', {
            title: "Chỉnh Sửa Thành Viên",
            player: result[0],
            message: ''
        });
    });
}

exports.editMember = (req, res) => {
    let playerId = req.params.mamb;
    let ho_ten = req.body.ho_ten;
    let dia_chi = req.body.dia_chi;
    let vi_tri = req.body.vi_tri;
    let dien_thoai = req.body.dien_thoai;

    let query = "UPDATE `member` SET `ho_ten` = '" + ho_ten + "', `dia_chi` = '" + dia_chi + "', `vi_tri` = '" + vi_tri + "', `dien_thoai` = '" + dien_thoai + "' WHERE `member`.`mamb` = '" + playerId + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/homemb');
    });
}

exports.deleteMember = (req, res) => {
    let playerId = req.params.mamb;
    let getImageQuery = 'SELECT avt from `member` WHERE mamb = "' + playerId + '"';
    let deleteUserQuery = 'DELETE FROM member WHERE mamb = "' + playerId + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let avt = result[0].avt;

        fs.unlink(`public/assets/img/${avt}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/homemb');
            });
        });
    });
}
