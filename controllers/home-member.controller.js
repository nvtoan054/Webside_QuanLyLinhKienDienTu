const fs = require('fs');

exports.getMemberPage = (req, res) => {
    let query = "SELECT * FROM `member` ORDER BY mamb ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('index-member.ejs', {
            title: "Welcome to Cửa Hàng Điện Tử | Xem Sản Phẩm",
            member: result
        });
        return res;
    });
};
