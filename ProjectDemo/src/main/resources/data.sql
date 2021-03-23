INSERT INTO COURSE (code,create_date,update_date,name,description) values ('JAD','2021-03-01','2021-03-01','JavaAdvance' , 'Javanângcao');
INSERT INTO COURSE (code,create_date,update_date,name,description) values ('JCB','2021-03-01','2021-03-01','JavaBasic' , 'JavaCoBan');
INSERT INTO STUDENT (create_date,update_date,name,code_student,address,email) values ('2021-03-01','2021-03-01','NguyenA', '1755241', 'PhuHoa', 'xomrayno1@gmail.com');
INSERT INTO STUDENT (create_date,update_date,name,code_student,address,email) values ('2021-03-01','2021-03-01','NguyenB', '1755242', 'DongHoa', 'xomrayno2@gmail.com');
INSERT INTO STUDENT (create_date,update_date,name,code_student,address,email) values ('2021-03-01','2021-03-01','NguyenC', '1755243', 'DongHoa1', 'xomrayno3@gmail.com');

INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (1,1);
INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (1,2);
INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (2,1);
INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (2,2);
INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (3,2);