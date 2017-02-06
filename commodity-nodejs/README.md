# commodity-nodejs

# classification 分类表
CREATE TABLE "classification"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT DEFAULT NULL,
    "name" VARCHAR(300) DEFAULT NULL,
    "order" INTEGER,
    "picture" VARCHAR(300)
)

# commodity 内容
CREATE TABLE "commodity"
(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT DEFAULT NULL,
    "name" VARCHAR(300) DEFAULT NULL,
    "category" INTEGER,
    "summary" VARCHAR(300) DEFAULT NULL,
    "picture" VARCHAR(300) DEFAULT NULL,
    "product_demo" VARCHAR(300) DEFAULT NULL,
    "order" INTEGER,
    "home_page" VARCHAR(300),
    "product_desc" VARCHAR(300),
    "product_info" VARCHAR(300)
)