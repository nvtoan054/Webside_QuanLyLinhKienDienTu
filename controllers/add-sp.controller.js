const fs = require('fs');

exports.addPlayerPage = (req, res) => {
    res.render('add-sp.ejs', {
        title: "Welcome to Điện Tử Shop | Thêm Sản Phẩm Mới",
        message: ''
    });
    return res;
};

exports.addPlayer = (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    let message = '';
    let ten_sp = req.body.ten_sp;
    let ton_kho = req.body.ton_kho;
    let gia = req.body.gia;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image_name = ten_sp + '.' + fileExtension;

    let usernameQuery = "SELECT * FROM `sanpham` WHERE ten_sp = '" + ten_sp + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Sản Phẩm Đã Tồn Tại';
            res.render('add-player.ejs', {
                message,
                title: "Welcome to Điện Tử Shop | Thêm Sản Phẩm Mới"
            });
            return res;
        } else {
            // check the filetype before uploading it
            if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database
                    let query = "INSERT INTO `sanpham` (ten_sp, ton_kho, gia, image) VALUES ('" +
                        ten_sp + "', '" + ton_kho + "', '" + gia + "', '" + image_name + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('add-sp.ejs', {
                    message,
                    title: "Welcome to Điện Tử Shop | Thêm Sản Phẩm Mới"
                });
            }
        }
    });
}

exports.editPlayerPage = (req, res) => {
    let playerId = req.params.masp;
    let query = "SELECT * FROM `sanpham` WHERE masp = '" + playerId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-sp.ejs', {
            title: "Chỉnh Sửa Sản Phẩm",
            player: result[0],
            message: ''
        });
    });
}

exports.editPlayer = (req, res) => {
    let playerId = req.params.masp;
    let ten_sp = req.body.ten_sp;
    let ton_kho = req.body.ton_kho;
    let gia = req.body.gia;

    let query = "UPDATE `sanpham` SET `ten_sp` = '" + ten_sp + "', `ton_kho` = '" + ton_kho + "', `gia` = '" + gia + "' WHERE `sanpham`.`masp` = '" + playerId + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deletePlayer = (req, res) => {
    let playerId = req.params.masp;
    let getImageQuery = 'SELECT image from `sanpham` WHERE masp = "' + playerId + '"';
    let deleteUserQuery = 'DELETE FROM sanpham WHERE masp = "' + playerId + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].image;

        fs.unlink(`public/assets/img/${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    });
}
