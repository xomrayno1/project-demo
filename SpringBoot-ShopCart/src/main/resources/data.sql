INSERT INTO CATEGORIES(NAME,CREATE_DATE,UPDATE_DATE,PARENT_ID) VALUES ('Apple','2021-02-22','2021-02-22',0);
INSERT INTO CATEGORIES(NAME,CREATE_DATE,UPDATE_DATE,PARENT_ID) VALUES ('Samsung','2021-02-22','2021-02-22',0);
INSERT INTO CATEGORIES(NAME,CREATE_DATE,UPDATE_DATE,PARENT_ID) VALUES ('Sony','2021-02-22','2021-02-22',0);
INSERT INTO CATEGORIES(NAME,CREATE_DATE,UPDATE_DATE,PARENT_ID) VALUES ('IPhone','2021-02-22','2021-02-22',1);
INSERT INTO CATEGORIES(NAME,CREATE_DATE,UPDATE_DATE,PARENT_ID) VALUES ('IPad','2021-02-22','2021-02-22',1);

INSERT INTO PRODUCT(PRICE,NAME,CREATE_DATE,UPDATE_DATE) VALUES (3000000,'Sony A1','2021-02-22','2021-02-22');
INSERT INTO PRODUCT(PRICE,NAME,CREATE_DATE,UPDATE_DATE) VALUES (7000000,'IPhone 7','2021-02-22','2021-02-22');
INSERT INTO PRODUCT(PRICE,NAME,CREATE_DATE,UPDATE_DATE) VALUES (9000000,'IPhone 7 Plus','2021-02-22','2021-02-22');

INSERT INTO PRODUCT(PRICE,NAME,CREATE_DATE,UPDATE_DATE) VALUES (25000000,'IPad Pro','2021-02-22','2021-02-22');
INSERT INTO PRODUCT(PRICE,NAME,CREATE_DATE,UPDATE_DATE) VALUES (9000000,'IPad mini 5','2021-02-22','2021-02-22');

INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (3,1);
INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (1,2);
INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (1,3);
INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (3,2);
INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (3,3);

INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (1,4);
INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (1,5);
INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (4,4);
INSERT INTO PRODUCT_CATEGORY(CATEGORY_ID,PRODUCT_ID) VALUES (4,5);