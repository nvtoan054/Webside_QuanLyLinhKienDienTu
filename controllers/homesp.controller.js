const fs = require('fs');

exports.getHomePage = (req, res) => {
    // res.render('header.ejs')
    const search = req.query.search;
    let query = "";

        if(search){
            query = "SELECT * FROM `sanpham` where ten_sp like '%" + search + "%' ORDER BY masp ASC";
        }else {
            query = "SELECT * FROM `sanpham` ORDER BY masp ASC"; // query database to get all the players
        }
    // let query = "SELECT * FROM `sanpham` ORDER BY masp ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('index-sp.ejs', {
            title: "Welcome to Cửa Hàng Điện Tử | Xem Sản Phẩm",
            sanpham: result
        });
    });
};
