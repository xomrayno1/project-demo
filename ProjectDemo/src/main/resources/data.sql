INSERT INTO COURSE (code,create_date,update_date,name,description) values ('JAD','2021-03-01','2021-03-01','Java Advance' , 'Java nâng cao');
INSERT INTO COURSE (code,create_date,update_date,name,description) values ('JCB','2021-03-01','2021-03-01','Java Basic' , 'Java Co Ban');
INSERT INTO STUDENT (create_date,update_date,name,code_student,address,email) values ('2021-03-01','2021-03-01','Nguyen A', '1755241', 'Phu Hoa', 'xomrayno1@gmail.com');
INSERT INTO STUDENT (create_date,update_date,name,code_student,address,email) values ('2021-03-01','2021-03-01','Nguyen B', '1755242', 'Dong Hoa', 'xomrayno2@gmail.com');
INSERT INTO STUDENT (create_date,update_date,name,code_student,address,email) values ('2021-03-01','2021-03-01','Nguyen C', '1755243', 'Dong Hoa 1', 'xomrayno3@gmail.com');

INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (1,1);
INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (1,2);
INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (2,1);
INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (2,2);
INSERT INTO STUDENT_COURSE(STUDENT_ID,COURSE_ID) values (3,2);