#1.先建立库---------------------------------------------------
#删除数据库
DROP DATABASE IF EXISTS YGGL;
#创建数据库
CREATE DATABASE IF NOT EXISTS YGGL;
#库的修改
#rename DATABASE books to luyu;
#更改库的字符集
ALTER DATABASE YGGL CHARACTER SET utf8;
#2.建立表---------------------------------------------------
#打开数据库
USE YGGL;
#删除表
DROP TABLE IF EXISTS Departments;
#建立表格 第一个表
CREATE TABLE IF NOT EXISTS Departments(
	departmentID INT(3) PRIMARY KEY AUTO_INCREMENT,#部门编号，主键，标识列
	departmentName CHAR(20) NOT NULL,#部门名
	note TEXT(16) #备注
);
#打开数据库
USE YGGL;
#删除表
DROP TABLE IF EXISTS  employees;
#建立表格 第二个表
CREATE TABLE IF NOT EXISTS  employees(
	employeeID CHAR(6) PRIMARY KEY,#员工编号，主键
	uname CHAR(10) NOT NULL,#姓名
	education CHAR(4) NOT NULL,#学历
	birthday DATE NOT NULL,#出生日期
	sex CHAR(2) NOT NULL,#性别
	workyear TINYINT(1), #工作时间
	address VARCHAR(20), #地址
	phonenumber CHAR(12), #电话
	departmentID INT(3) NOT NULL, #员工部门号，外键
	FOREIGN KEY(departmentID) REFERENCES departments(departmentID)
);
#打开数据库
USE YGGL;
#删除表
DROP TABLE IF EXISTS Salary;
#建立表格 第三个表
CREATE TABLE IF NOT EXISTS Salary(
	employeeID CHAR(6) PRIMARY KEY,#员工编号，主键，外键
	Income FLOAT(8) NOT NULL,#收入
	Outcome FLOAT(8) NOT NULL, #支出
	FOREIGN KEY (employeeID) REFERENCES employees(EmployeeID)
);
#ALTER TABLE books bookName INT;


#入数据-----------------------------------------
#打开数据库
USE YGGL;
#删除表数据
DELETE FROM `departments`;
#插入数据
ALTER TABLE `departments` AUTO_INCREMENT=1;
INSERT INTO `departments`(`departmentName`)
VALUES ("财务部"),("人力资源部"),("经理办公室"),("研发部"),("市场部");

#打开数据库
USE YGGL;
#删除表数据
DELETE FROM `employees`;
INSERT INTO `employees`
VALUES ("000001","王林","大专","1966-01-23","男",8,"中山路32-1-508","83355668",2),
("010008","伍容华","本科","1976-03-28","男",3,"北京东路100-2","833211321",1),
("020010","王向荣","硕士","1982-12-09","男",2,"四牌路10-0-108","83792361",1),
("020018","李丽","大专","1960-07-30","女",6,"中山东路102-2","83413301",1),
("102201","刘明","本科","1972-10-18","男",3,"虎踞路100-2","83606608",5),
("102208","朱俊","硕士","1965-09-28","男",2,"牌楼巷5-3-106","84708817",5),
("108991","钟敏","硕士","1979-08-10","女",4,"中山路10-3-105","83346722",3),
("111006","张石兵","本科","1974-10-01","男",1,"解放路34-1-203","84563418",5),
("210678","林涛","大专","1977-04-02","男",2,"中山北路24-35","83467336",3),
("302566","李玉敏","本科","1968-09-20","男",3,"热河路209-3","58765991",4),
("308759","叶凡","本科","1978-11-18","男",2,"北京西路3-7-52","83308901",4),
("504209","陈林琳","大专","1969-09-03","女",5,"汉中路120-4-12","84468158",4);

#打开数据库
USE YGGL;
#删除表数据
DELETE FROM `salary`;
INSERT INTO `salary`
VALUES ("000001",2100.8,123.09),
("010008",1582.62,88.03),
("102201",2569.88,185.65),
("111006",1987.01,79.58),
("504209",2066.15,108.0),
("302566",2980.7,210.2),
("108991",3259.98,281.52),
("020010",2860.0,298.0),
("020018",2347.68,180.0),
("308759",2531.98,199.08),
("210678",2240.0,121.0),
("102208",1980.0,100.0);



SET FOREIGN_KEY_CHECKS=0;
DELETE FROM `employees` WHERE `departmentID`="000001";

-- 级联删除 别名在from子语句取别名 delete子句中一定要用别名
DELETE e,s
FROM `employees` e JOIN `salary` s 
ON e.`employeeID`=s.`employeeID` 
WHERE e.`employeeID`="000001";

#使用SQL命令修改表Salary，将编号为011112的职工收入改为2890。
#将所有职工收入增加100。
#使用SQL命令删除Employees中编号为011112的职工信息。
#删除所有收入大于2500的员工信息。 
#使用TRUNCATE TABLE语句删除Salary表中有行。（删除后请重新插入，以后要用）

			#1.SELECT语句的基本使用-----------------------------------
#用SELECT语句查询Departments表的所有记录。
SELECT * FROM `departments`;
#用SELECT语句查询Salary表的所有记录。
SELECT * FROM `salary`;
#用SELECT语句查询Departments表的部门号和部门名称列。
SELECT `departmentID` 部门号, `departmentName` 部门名称 FROM `departments`;
#查询Employees表中部门号和性别，要求使用DISTINCT消除重复行。
SELECT DISTINCT `departmentID` 部门号,`sex` 性别  FROM `employees`;
#查询月收入高于2000的员工号码。
SELECT `phonenumber` FROM `salary` s JOIN `employees` e ON s.`employeeID`=e.`employeeID` WHERE `Income`>2000;
#查询所有1970以后出生的员工的姓名和住址。
SELECT `uname` 姓名,`address` 住址 FROM `employees` WHERE `birthday`>"1970";
#查询所有财务部门的员工号码和姓名。
SELECT `phonenumber` 员工号码,`uname` 姓名 
FROM `employees` e 
JOIN `departments` d 
ON e.`departmentID`=d.`departmentID` 
WHERE d.`departmentName`="财务部"
#查询Empoyees表中男员工的姓名和出生日期，要求个列标题用中文表示。
SELECT `uname` 姓名,`birthday` 出生日期 FROM `employees` WHERE `sex`="男";
#查询Employees员工的姓名住址和收入水平，2000以下的显示为低收入，2000`3000的显示为中等收入，3000以上的显示为高收入。
#百度的写不来
SELECT `uname`,`address`,
	CASE
	WHEN `Income`<2000 THEN '低收入'
	WHEN `Income` BETWEEN 2000 AND 3000 THEN '中等收入'
	WHEN `Income`>3000 THEN '高收入'
	END AS 收入水平
FROM `employees` e
JOIN `salary` s ON e.`employeeID`=s.`employeeID`;

SELECT `uname` 姓名,`address` 住址,`Income` 收入水平 
FROM `employees` e
JOIN `salary` s ON e.`employeeID`=s.`employeeID`
WHERE `Income`<2000 低收入||2000<`Income`<3000 中等收入||`Income`>3000 高收入;
#计算Salary表中员工月收入的平均数。
SELECT AVG(`Income`)  FROM `salary`;
#获得Employees表中的最大的员工号码。
SELECT MAX(`phonenumber`) FROM `employees`;
#计算Salary表中所有员工的总支出。
SELECT SUM(`Outcome`) FROM `salary`;
#查询财务部官员的最高和最低实际收入。
SELECT MAX(`Income`-`Outcome`) 最高,MIN(`Income`-`Outcome`) 最低 
FROM `salary` s
JOIN `employees` e ON s.`employeeID`=e.`employeeID`
JOIN `departments` d ON d.`departmentID`=e.`departmentID`
WHERE d.`departmentName`="财务部";
#找出所有其地址含有“中山”的雇员的号码及部门号。
SELECT `phonenumber` 号码,`departmentID` 部门号 FROM `employees` WHERE `address` LIKE "%中山%";
#查找员工号码中倒数第二个数字为0的姓名、地址和学历。
SELECT `uname` 姓名,`address` 地址,`education` 学历 FROM `employees` WHERE `phonenumber` LIKE "%0_";
#找出所有部门“1”或“2”工作的雇员的号码。
SELECT `phonenumber` FROM `employees` WHERE `departmentID`="1" || `departmentID`="2";


			#2.子查询的使用-----------------------------------
#用子查询的方法查找所有收入在2500以下的雇员的情况。
SELECT e.*
FROM `employees` e
JOIN `salary` s ON e.`employeeID`=s.`employeeID`
WHERE `Income`<=2500;

SELECT *
FROM `employees` 
WHERE`employeeID` IN(
	SELECT `employeeID` 
	FROM `salary`
	WHERE `Income`<=2500);
		

#用子查询的方法查找研发部比财务部所有雇员收入都高的雇员的姓名。
SELECT `uname`,`Income`
FROM `salary` s
JOIN `employees` e ON s.`employeeID`=e.`employeeID`
JOIN `departments` d ON d.`departmentID`=e.`departmentID`
WHERE `departmentName`="研发部" 
AND `Income`>(SELECT MAX(`Income`)
		FROM `salary` s
		JOIN `employees` e ON s.`employeeID`=e.`employeeID`
		JOIN `departments` d ON d.`departmentID`=e.`departmentID`
		WHERE `departmentName`="财务部");
#用子查询的方法查找年龄比研发部所有雇员年龄都大的雇员的姓名。
SELECT `uname`,YEAR(`birthday`)
FROM `salary` s
JOIN `employees` e ON s.`employeeID`=e.`employeeID`
JOIN `departments` d ON d.`departmentID`=e.`departmentID`
WHERE `birthday` AND YEAR(`birthday`) <(SELECT MIN(YEAR(`birthday`))
		FROM `salary` s
		JOIN `employees` e ON s.`employeeID`=e.`employeeID`
		JOIN `departments` d ON d.`departmentID`=e.`departmentID`
		WHERE `departmentName`="研发部");
		
		
		
			#3.连接查询的使用-----------------------------------
#查询每个雇员的情况及其工作部门的情况。
SELECT e.*,d.*
FROM `employees` e
JOIN `departments` d ON e.`departmentID`=d.`departmentID`;
#使用内连接的方法查找不在财务部工作的所有员工信息。
SELECT e.*
FROM `employees` e
JOIN `departments` d ON e.`departmentID`=d.`departmentID`
WHERE !(d.`departmentName`="财务部");
#使用外连接方法查找所有员工月收入 右外连接///////////////////
SELECT e.*,s.`Income`
FROM `salary` s
RIGHT JOIN `employees` e ON s.`employeeID`=e.`employeeID`;

#左外连接
SELECT e.*,s.`Income`
FROM `employees` e  #第一个表在左 
LEFT JOIN `salary` s ON s.`employeeID`=e.`employeeID`;

#查询研发部在1966年以前出生的雇员姓名及其薪的月收入。
SELECT e.`uname` 姓名,s.`Income` 月收入
FROM `employees` e
JOIN `departments` d ON e.`departmentID`=d.`departmentID`
JOIN `salary` s ON s.`employeeID`=e.`employeeID`
WHERE e.`birthday`<"1966" && d.`departmentName`="研发部";


			#4.GROUP BY、ORDER BY和LIMIT子句的使用-----------------------------------
#按部门列出在该部门工作的员工的人数。
SELECT d.`departmentName` ,COUNT(*) 员工的人数
FROM `employees` e
JOIN `departments` d ON e.`departmentID`=d.`departmentID`
GROUP BY d.`departmentName`;
#按员工的学历分组，列出本科、大专和硕士的人数。
SELECT e.`education`,COUNT(*) 人数
FROM  `employees` e
GROUP BY e.`education`;
#按员工的工作年份分组，统计各个工作年份的人数，如工作1年的多少人，工作2年的多少人。
SELECT e.`workyear` 工作几年,COUNT(*) 人数
FROM  `employees` e
GROUP BY e.`workyear`;
#将员工信息按出生日期从小到大排列。
SELECT *
FROM `employees`
ORDER BY `birthday`;
#在ORDER BY子句中使用子查询，查询员工姓名、性别和工龄信息，要求按实际收入从大到小排列。
SELECT e.`uname` 姓名,e.`sex` 性别,e.`workyear` 工龄信息 
FROM `employees` e
JOIN `salary` s ON e.`employeeID`=s.`employeeID`
ORDER BY s.`Income`-s.`Outcome` DESC;
#返回Employees表中从第3位员工开始的5个员工的信息。
SELECT *
FROM `employees`
LIMIT 3,5; 
			#5.创建视图-----------------------------------
DROP VIEW `ds_view`;
DROP VIEW `employees_view`;
#创建YGGL数据库上的视图DS_VIEW，视图包含Departments表的全部列。
CREATE VIEW DS_VIEW AS
SELECT * FROM `departments`;
#创建YGGL数据库上的视图Employees_view，视图包含员工号码、姓名和实际收入。
CREATE VIEW Employees_view AS 
SELECT `phonenumber` 员工号码,`uname` 姓名,(`Income`-`Outcome`) 实际收入
FROM `employees` e
JOIN `salary` s ON e.`employeeID`=s.`employeeID`;
			#6.查询视图-----------------------------------
#从视图DS_VIEW中查询出部门号为3的部门名称。
SELECT `departmentName` FROM `ds_view` WHERE `departmentID`=3;
#从视图Employees_view查询出姓名为“王林”的员工的实际收入。
SELECT  实际收入
FROM `employees_view` 
WHERE 姓名="王林";
			#7.更新视图-----------------------------------
#向视图DS_VIEW中插入一行数据：6，广告部，广告业务。
INSERT INTO `ds_view` VALUES(6,"广告部","广告业务");
#执行完该命令使用SELECT语句分别查看视图DS_VIEW和基本表Departments中发生的变化。
SELECT * FROM `ds_view` ;
SELECT * FROM `departments` ;
#尝试向视图Employees_view中插入一行数据，看看会发生什么情况。
INSERT INTO `employees_view` VALUES("8332121","小江",15000);

INSERT INTO `ds_view` VALUES(7,"小江","112");
#修改视图DS_VIEW，将部门号为5的部门名称修改为“生产车间”。
UPDATE `ds_view` SET `departmentName`="生产车间" WHERE `departmentID`=5;
#执行完该命令使用SELECT语句分别查看视图DS_VIEW和基本表Departments中发生的变化。
SELECT * FROM `ds_view`;
SELECT * FROM `departments` ;
#修改视图Employees_view视图中号码为000001的雇员的姓名为“王浩”。
UPDATE  `employees_view` SET 姓名="王浩" WHERE 员工号码="000001";
#删除该视图DS_VIEW中部门号为“1”的数据。
SET FOREIGN_KEY_CHECKS=0;
DELETE FROM `ds_view` WHERE `departmentID`="1";
			#8.删除视图-----------------------------------
#删除视图DS_VIEW。
DROP VIEW `ds_view`;
DROP VIEW `employees_view`;


			#9.存储过程-----------------------------------------
#存储过程

	#语法-------
#声明字符 新的程序结束符号
DELIMITER $
CREATE PROCEDURE 存储过程名(参数列表)
BEGIN
#存储过程体 (一组合法的sql语句)
END $

#调用
CALL 存储过程名(参数列表)


#创建存储过程,要求当一个员工的工作年份大于6年时将其转到经理办公室工作
DELIMITER $
#删除语句
DROP PROCEDURE LU1$
CREATE PROCEDURE LU1()
BEGIN
	UPDATE `employees` SET `departmentID`=(
		SELECT `departmentID` 
		FROM `departments`
		WHERE `departmentName`="经理办公室")
	WHERE `workyear`>5;
END $
#调用函数
CALL LU1()$


#带参数的
DELIMITER $
#删除语句
DROP PROCEDURE LU2$
CREATE PROCEDURE LU2(IN 员工ID CHAR(6))
BEGIN
	#定义变量 DECLARE 变量名 类型
	DECLARE work_year TINYINT(1);
	SELECT `workyear`  INTO work_year #赋值 into 变量名
	FROM `employees`
	WHERE `employeeID`=员工ID;
	#判断
	IF work_year>6
	THEN
		UPDATE `employees` SET `departmentID`=(
			SELECT `departmentID` 
			FROM `departments`
			WHERE `departmentName`="经理办公室")
		WHERE `employeeID`=员工ID;
	END IF ;
END$
#调用函数
CALL LU2("000001");


DELIMITER$
#删除语句
DROP PROCEDURE LU3$
CREATE PROCEDURE LU3(OUT per DOUBLE)
BEGIN
	DECLARE total INT;
	DECLARE num INT;
	SELECT COUNT(*) INTO total
	FROM `employees`;
	SELECT COUNT(*) INTO num
	FROM `employees`
	WHERE `education` IN("本科","硕士");
	SET per=ROUND(num/total,2);
END$
#调用函数
#在全局定义的变量 要用@
CALL LU3(@百分数);
#查看变量
SELECT @百分数;

SELECT *  FROM `employees`;


			#10.触发器----------------------------------------------------
#创建update触发器,当departments表中部门号发生变化时,employees表中员工所属部门号也将改变
DELIMITER $
DROP TRIGGER LU1 $
CREATE TRIGGER LU1 
AFTER UPDATE ON `departments` FOR EACH ROW
BEGIN	
	UPDATE `employees` 
	SET `departmentID`=new.`departmentID` #new.修改后表
	WHERE `departmentID`=old.`departmentID`; #old修改前表
END $

#测试 
SET FOREIGN_KEY_CHECKS=0;
UPDATE `departments`
SET `departmentID`=5
WHERE `departmentID`=6;
#查询
SELECT *  FROM `employees`;

#创建update触发器,当salary表中的inCome值增加500时,outCome值则增加50
DELIMITER $
DROP TRIGGER LU2 $
CREATE TRIGGER LU2
BEFORE UPDATE ON `salary` FOR EACH ROW
BEGIN
	#变量定义
	DECLARE salary_add FLOAT;
	#新的工资减去旧的工资 赋值给变量
	SET salary_add=new.`Income`-old.`Income`;
	IF salary_add=500
	THEN
		SET new.`Outcome`=old.`Outcome`+50;
	END IF;
END $

#测试
#为000001员工号 增加500元
UPDATE `salary`
SET `Income`=`Income`+500
WHERE `employeeID`="000001";
#查询员工000001 的工资
SELECT * FROM `salary`
WHERE `employeeID`="000001";

			#11.备份和恢复--------------------------
#1.备份yggl数据库中的employees表到D盘FILE文件夹下,并在执行后完成查看
#D盘FILE文件夹下是否有employees.txt文件
SELECT * 
FROM `employees` 
INTO OUTFILE "C:/Users/luyu/Desktop/employees.txt";
#2.先删去employees表中的几行数据,在使用sql语句恢复employees表,
#执行完成后使用select查看employees表的变化

#删除一条
USE YGGL;
DELETE FROM `employees`
WHERE `uname`="王林";

#删除所有
USE YGGL;
DELETE FROM `employees`;

#修改一条
USE YGGL;
UPDATE `employees` SET `employeeID`="000002"
WHERE `employeeID`="000001";

#插入一条
INSERT INTO `employees` 
VALUES("000002","小江","大专","1966-01-23","男",8,"中山路32-1-508","83355668",2);

#查看全部
SELECT * FROM `employees`;

#恢复数据
LOAD DATA INFILE "C:/Users/luyu/Desktop/employees.txt"
REPLACE INTO TABLE `employees`;
			#12.安全性------------------------
#(1）创建数据库用户user_1和user_2，密码都为1234（假设服务器名为localhost).
USE mysql;
SELECT * FROM "user";
CREATE USER
"user_1"@"localhost" IDENTIFIED BY "1234",
"user_2"@"localhost" IDENTIFIED BY "1234";

#(2)将用户user_2的名称修改为user_3.
RENAME USER "user_2"@"localhost" TO "user_3"@"localhost";
#(3)将用户user_3的密码修改为123456.
SET PASSWORD FOR "user_3"@"localhost"=PASSWORD("123456");
#(4)册除用户user_3.
DROP USER"user_3"@"localhost" ;

#2.用户权限的授予与收回
#(1)授予用户user_1对rcGL数据库Employees表的所有操作权限及查询操作权限。
USE YGGL;
GRANT ALL ON'employees' TO "user_1"@"1ocalhost";
GRANT SELECT ON'employees'TO "user_1"@"localhost" ;
#(2）授予用户user 1对Employees表进行插入，修改，删除操作权限。
GRANT INSERT,UPDATE,DELETE ON 'employees'TO "user_1"@"localhost";
#(3)授予用户user_1对数据库rGGL的所有权限。
GRANT ALL ON*TO "user_1"e"localhost" ;
SHOW GRANTS FOR"user_1"@"localhost" ;
#(4)回收user_1的Employees表上的sELECr权限。
REVOKE SELECT ON'employees' FROM "user_1"@"localhost";
#(5)取消用户user_1所有的权限。
REVOKE ALL ON * FROM "user_1"@"localhost";
SHOW GRANTS FOR "user_1"@"localhost" ;





