-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Июн 11 2021 г., 13:17
-- Версия сервера: 5.7.34-0ubuntu0.18.04.1
-- Версия PHP: 7.2.34-21+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Shop_GFL`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `id_options` int(11) DEFAULT NULL,
  `product_count` int(11) DEFAULT '0',
  `product_sum` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `category_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `category_description` varchar(250) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id_category`, `category_name`, `category_description`) VALUES
(1, 'Accessories', 'Description for cat 1'),
(2, 'Hoodies', 'Description for cat 2'),
(4, 'Albums', 'description for cat 4'),
(5, 'Clothing', 'description for cat 5');

-- --------------------------------------------------------

--
-- Структура таблицы `delivery_method`
--

CREATE TABLE `delivery_method` (
  `id_delivery_method` int(11) NOT NULL,
  `name_delivery` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `delivery_method`
--

INSERT INTO `delivery_method` (`id_delivery_method`, `name_delivery`) VALUES
(1, 'By the address'),
(2, 'By courier');

-- --------------------------------------------------------

--
-- Структура таблицы `image`
--

CREATE TABLE `image` (
  `id_image` int(11) NOT NULL,
  `image_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `image_description` varchar(250) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `image`
--

INSERT INTO `image` (`id_image`, `image_name`, `image_description`) VALUES
(1, 'album.jpg', 'decription'),
(2, 'beanie.jpg', 'decription'),
(3, 'beanie-with-logo.jpg', 'description'),
(4, 'cap.jpg', 'description'),
(5, 'hoodie-with-logo.jpg', 'description'),
(6, 'hoodie-with-pocket.jpg', 'description'),
(7, 'hoodie-with-zipper.jpg', 'description'),
(8, 'long-sleeve-tee.jpg', 'description'),
(9, 'polo.jpg', 'description'),
(10, 'sunglasses.jpg', 'description'),
(11, 'tshirt.jpg', 'description'),
(12, 't-shirt-with-logo.jpg', 'description'),
(13, 'vnech-tee-blue.jpg', 'description');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `country` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `city` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `state` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `delivery_address` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `postcode` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `payment_method` int(11) DEFAULT NULL,
  `delivery_method` int(11) DEFAULT NULL,
  `order_comments` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `order_full_price` int(11) DEFAULT NULL,
  `date_of_order` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `order_status` int(11) DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `country`, `city`, `state`, `delivery_address`, `postcode`, `payment_method`, `delivery_method`, `order_comments`, `order_full_price`, `date_of_order`, `order_status`) VALUES
(46, 10, 'Ukraine', 'Mykolaiv', 'Mykolaivska', 'Mykolaiv', '54000', 2, 1, 'Comments', 477, '2021-06-11T10:04:03.057Z', 2),
(47, 10, 'Ukraine', 'Mykolaiv', 'Mykolaivska', 'Mykolaiv', '54000', 1, 2, 'Comments', 36, '2021-06-11T10:04:31.056Z', 2),
(48, 14, 'Ukraine', 'Mykolaiv', 'Mykolaivska', 'Mykolaiv', '54000', 1, 1, 'Comments', 90, '2021-06-11T10:05:31.255Z', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `order_details`
--

CREATE TABLE `order_details` (
  `id_order_details` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL,
  `product_options` int(11) DEFAULT NULL,
  `product_count` int(11) DEFAULT NULL,
  `product_sum` int(11) DEFAULT NULL,
  `id_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `order_details`
--

INSERT INTO `order_details` (`id_order_details`, `id_product`, `product_options`, `product_count`, `product_sum`, `id_order`) VALUES
(26, 1, 3, 4, 360, 46),
(27, 5, 8, 4, 72, 46),
(28, 8, 16, 1, 45, 46),
(29, 5, 6, 2, 36, 47),
(30, 1, 2, 1, 90, 48);

-- --------------------------------------------------------

--
-- Структура таблицы `order_status`
--

CREATE TABLE `order_status` (
  `id_order_status` int(11) NOT NULL,
  `name_order_status` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `order_status`
--

INSERT INTO `order_status` (`id_order_status`, `name_order_status`) VALUES
(1, 'Received'),
(2, 'In processing'),
(3, 'Accepted');

-- --------------------------------------------------------

--
-- Структура таблицы `payment_method`
--

CREATE TABLE `payment_method` (
  `id_payment_method` int(11) NOT NULL,
  `name_payment_method` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `payment_method`
--

INSERT INTO `payment_method` (`id_payment_method`, `name_payment_method`) VALUES
(1, 'Ukrposhta cash on delivery'),
(2, 'NovaPoshta cash on delivery');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `product_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `product_description` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `product_price` float DEFAULT NULL,
  `product_show` set('NO','YES') COLLATE utf8_bin NOT NULL DEFAULT 'NO',
  `product_count` int(11) DEFAULT NULL,
  `product_keywords` varchar(250) COLLATE utf8_bin DEFAULT NULL,
  `product_structure` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id_product`, `product_name`, `product_description`, `product_price`, `product_show`, `product_count`, `product_keywords`, `product_structure`) VALUES
(1, 'Sunglasses', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 90, 'YES', 10, 'accessories, sunglasses', 3),
(4, 'Album', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut metus leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus, dui eu sagittis sodales, nulla nibh sagittis augue, vel porttitor diam enim non metus. Vestibulum aliquam augue neque. Phasellus tincidunt odio eget ullamcorper efficitur.', 15, 'YES', 10, 'album', 4),
(5, 'Beanie', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 18, 'YES', 100000, 'Accessories', 1),
(6, 'Beanie with Logo', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 19, 'YES', 10, 'Accessories', 1),
(7, 'Cap', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo', 16, 'YES', 100, 'Accessories', 1),
(8, 'Hoodie with Logo', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 45, 'YES', 20, 'Hoodies', 2),
(9, 'Hoodie with Pocket', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 48, 'YES', 15, 'Hoodies', 2),
(10, 'Hoodie with Zipper', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 45, 'YES', 26, 'Hoodies', 2),
(11, 'Long Sleeve Tee', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 25, 'YES', 14, 'T-Shirts', 1),
(12, 'Polo', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 20, 'YES', 5, 'T-Shirts', 1),
(13, 'T-Shirt', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 18, 'YES', 10, 'T-Shirts', 1),
(14, 'T-Shirt with Logo', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.', 18, 'YES', 18, 'T-Shirts', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `product_category`
--

CREATE TABLE `product_category` (
  `id_product` int(11) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_category`
--

INSERT INTO `product_category` (`id_product`, `id_category`) VALUES
(1, 1),
(4, 4),
(5, 5),
(6, 5),
(7, 1),
(8, 2),
(9, 2),
(10, 2),
(11, 5),
(12, 5),
(13, 5),
(14, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `product_color`
--

CREATE TABLE `product_color` (
  `id_color` int(11) NOT NULL,
  `color_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `color_code` varchar(20) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_color`
--

INSERT INTO `product_color` (`id_color`, `color_name`, `color_code`) VALUES
(1, 'Red', '#FF3333'),
(2, 'White', '#FFFFFF'),
(3, 'Black', '#000000'),
(4, 'Green', '#40D300');

-- --------------------------------------------------------

--
-- Структура таблицы `product_gallery`
--

CREATE TABLE `product_gallery` (
  `id_product` int(11) DEFAULT NULL,
  `id_image` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_gallery`
--

INSERT INTO `product_gallery` (`id_product`, `id_image`) VALUES
(1, 10),
(4, 1),
(5, 2),
(6, 3),
(7, 4),
(8, 5),
(9, 6),
(10, 7),
(11, 8),
(12, 9),
(13, 11),
(14, 12);

-- --------------------------------------------------------

--
-- Структура таблицы `product_options`
--

CREATE TABLE `product_options` (
  `id_options` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL,
  `product_type` int(11) DEFAULT NULL,
  `product_color` int(11) DEFAULT NULL,
  `product_size` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_options`
--

INSERT INTO `product_options` (`id_options`, `id_product`, `product_type`, `product_color`, `product_size`) VALUES
(1, 1, 3, 3, 6),
(2, 1, 2, 2, 4),
(3, 1, 1, 1, 3),
(4, 4, 2, 1, 4),
(5, 4, 2, 2, 5),
(6, 5, 1, 3, 4),
(7, 5, 1, 4, 5),
(8, 5, 2, 3, 4),
(9, 5, 3, 4, 6),
(10, 6, 3, 4, 6),
(11, 6, 3, 1, 6),
(12, 7, 1, 2, 4),
(13, 7, 2, 2, 3),
(14, 8, 3, 4, 6),
(15, 8, 1, 4, 5),
(16, 8, 2, 4, 4),
(17, 8, 1, 2, 3),
(18, 9, 3, 4, 6),
(19, 9, 3, 1, 5),
(20, 10, 1, 3, 3),
(21, 10, 1, 2, 2),
(22, 11, 3, 1, 6),
(23, 11, 2, 2, 4),
(24, 12, 3, 1, NULL),
(25, 12, 3, 4, 5),
(26, 13, 1, 3, 3),
(27, 13, 2, 4, 4),
(28, 14, 1, 4, 2),
(29, 14, 2, 2, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `product_size`
--

CREATE TABLE `product_size` (
  `id_size` int(11) NOT NULL,
  `size_name` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_size`
--

INSERT INTO `product_size` (`id_size`, `size_name`) VALUES
(1, 'XXXL'),
(2, 'XXL'),
(3, 'XL'),
(4, 'L'),
(5, 'M'),
(6, 'S');

-- --------------------------------------------------------

--
-- Структура таблицы `product_type`
--

CREATE TABLE `product_type` (
  `id_type` int(11) NOT NULL,
  `type_name` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_type`
--

INSERT INTO `product_type` (`id_type`, `type_name`) VALUES
(3, 'Children'),
(1, 'Men'),
(2, 'Women');

-- --------------------------------------------------------

--
-- Структура таблицы `structure`
--

CREATE TABLE `structure` (
  `id_structure` int(11) NOT NULL,
  `structure_name` varchar(50) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `structure`
--

INSERT INTO `structure` (`id_structure`, `structure_name`) VALUES
(1, 'cotton'),
(2, 'wool'),
(3, 'plastic'),
(4, 'vinyl');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `user_login` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `user_password` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `user_name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `user_phone` int(11) DEFAULT NULL,
  `user_email` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `user_status` int(11) DEFAULT NULL,
  `user_token` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `user_login`, `user_password`, `user_name`, `user_phone`, `user_email`, `user_status`, `user_token`) VALUES
(10, 'dchaika', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', 'dchaika', 951414765, 'dchaika1990@gmail.com', 2, 'MTAuZGNoYWlrYS4xNjIzNDA1OTQwODk2'),
(14, 'test', '0071877d20a65c02d9a1654f109b97dc61416d1a', 'test', 123456789, 'testtesttest@ddd.co', 2, 'MTQudGVzdC4xNjIzNDA1OTE3NTAx');

-- --------------------------------------------------------

--
-- Структура таблицы `user_status`
--

CREATE TABLE `user_status` (
  `id_status` int(11) NOT NULL,
  `status_name` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `user_status`
--

INSERT INTO `user_status` (`id_status`, `status_name`) VALUES
(1, 'Admin'),
(2, 'User');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `fk_cart_product_options` (`id_options`),
  ADD KEY `fk_cart_users` (`id_user`),
  ADD KEY `fk_cart_cart` (`id_product`);

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Индексы таблицы `delivery_method`
--
ALTER TABLE `delivery_method`
  ADD PRIMARY KEY (`id_delivery_method`);

--
-- Индексы таблицы `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id_image`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `fk_orders_clients` (`id_user`),
  ADD KEY `fk_orders_order_status` (`order_status`),
  ADD KEY `fk_orders_payment_method` (`payment_method`),
  ADD KEY `idx_orders` (`delivery_method`);

--
-- Индексы таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id_order_details`),
  ADD KEY `fk_order_details_products` (`id_product`),
  ADD KEY `fk_order_details` (`product_options`),
  ADD KEY `fk_order_details_orders` (`id_order`);

--
-- Индексы таблицы `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id_order_status`);

--
-- Индексы таблицы `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id_payment_method`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `fk_products_structure` (`product_structure`);

--
-- Индексы таблицы `product_category`
--
ALTER TABLE `product_category`
  ADD KEY `fk_product_category_products` (`id_product`),
  ADD KEY `fk_product_category_category` (`id_category`);

--
-- Индексы таблицы `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`id_color`);

--
-- Индексы таблицы `product_gallery`
--
ALTER TABLE `product_gallery`
  ADD KEY `fk_product_gallery_structure` (`id_product`),
  ADD KEY `fk_product_gallery_image` (`id_image`);

--
-- Индексы таблицы `product_options`
--
ALTER TABLE `product_options`
  ADD PRIMARY KEY (`id_options`),
  ADD KEY `fk_product_options_products` (`id_product`),
  ADD KEY `fk_product_type` (`product_type`),
  ADD KEY `fk_product_color` (`product_color`),
  ADD KEY `fk_product_size` (`product_size`);

--
-- Индексы таблицы `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`id_size`);

--
-- Индексы таблицы `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id_type`),
  ADD UNIQUE KEY `unq_product_type_type_name` (`type_name`);

--
-- Индексы таблицы `structure`
--
ALTER TABLE `structure`
  ADD PRIMARY KEY (`id_structure`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `fk_client_status` (`user_status`);

--
-- Индексы таблицы `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`id_status`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `delivery_method`
--
ALTER TABLE `delivery_method`
  MODIFY `id_delivery_method` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `image`
--
ALTER TABLE `image`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT для таблицы `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id_order_details` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT для таблицы `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id_order_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id_payment_method` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `product_color`
--
ALTER TABLE `product_color`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `product_options`
--
ALTER TABLE `product_options`
  MODIFY `id_options` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT для таблицы `product_size`
--
ALTER TABLE `product_size`
  MODIFY `id_size` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `structure`
--
ALTER TABLE `structure`
  MODIFY `id_structure` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `user_status`
--
ALTER TABLE `user_status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_product_options` FOREIGN KEY (`id_options`) REFERENCES `product_options` (`id_options`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cart_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cart_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_clients` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orders_delivery_method` FOREIGN KEY (`delivery_method`) REFERENCES `delivery_method` (`id_delivery_method`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orders_order_status` FOREIGN KEY (`order_status`) REFERENCES `order_status` (`id_order_status`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orders_payment_method` FOREIGN KEY (`payment_method`) REFERENCES `payment_method` (`id_payment_method`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_details` FOREIGN KEY (`product_options`) REFERENCES `product_options` (`id_options`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_order_details_orders` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_order_details_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_structure` FOREIGN KEY (`product_structure`) REFERENCES `structure` (`id_structure`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `fk_product_category_category` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_product_category_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `product_gallery`
--
ALTER TABLE `product_gallery`
  ADD CONSTRAINT `fk_product_gallery_image` FOREIGN KEY (`id_image`) REFERENCES `image` (`id_image`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_product_gallery_structure` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `product_options`
--
ALTER TABLE `product_options`
  ADD CONSTRAINT `fk_product_color` FOREIGN KEY (`product_color`) REFERENCES `product_color` (`id_color`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_product_options_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_product_size` FOREIGN KEY (`product_size`) REFERENCES `product_size` (`id_size`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_product_type` FOREIGN KEY (`product_type`) REFERENCES `product_type` (`id_type`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_client_status` FOREIGN KEY (`user_status`) REFERENCES `user_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
