-- phpMyAdmin SQL Dump
-- version  4.5.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 30, 2021 lúc 10:30 PM
-- Phiên bản máy phục vụ: 10.1.13-MariaDB
-- Phiên bản PHP: 5.6.21


-- Tạo Database 'quanlychdientu'

CREATE DATABASE quanlychdientu;

-- Cấu Trúc Bảng 'member'

CREATE TABLE IF NOT EXISTS `member` (
    `mamb` int(5) NOT NULL AUTO_INCREMENT,
    `ho_ten` varchar(255) NOT NULL,
    `dia_chi` varchar(255) NOT NULL,
    `vi_tri` varchar(255) NOT NULL,
    `dien_thoai` int(15) NOT NULL,
    `user` varchar(30) NOT NULL,
    `pass` varchar(20) NOT NULL,
    `avt` varchar(255) NOT NULL,
    PRIMARY KEY (`mamb`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert dữ liệu cho bảng 'member'

INSERT INTO `member` (`mamb`, `ho_ten`, `dia_chi`, `vi_tri`, `dien_thoai`, `user`, `pass`) VALUES
(1, 'Nguyễn Văn Toản', 'Huế', 'Quản Trị Viên', '0869354785', 'admin', 'admin');

-- Cấu Trúc Bảng 'sanpham'

CREATE TABLE IF NOT EXISTS `sanpham` (
    `masp` int(5) NOT NULL AUTO_INCREMENT,
    `ten_sp` varchar(255) NOT NULL,
    `ton_kho` int(5) NOT NULL,
    `gia` int(9) NOT NULL,
    `image` varchar(255) NOT NULL,
    PRIMARY KEY (`masp`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;