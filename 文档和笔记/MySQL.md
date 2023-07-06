# 1.查询

查询语法 231456

```sql
92语法：
	select 
		查询列表
	from
		表名
	where
		筛选条件
	GROUP BY
		分组的字段
	HAVING
		分组后筛选
	order by
		排序;
```

```
	99语法:
	select 查询列表
	from 表1 别名 【连接类型】
	join 表2 别名 
	on 连接条件
	【where 筛选条件】
	【group by 分组】
	【having 筛选条件】
	【order by 排序列表】
	limit 第几个,几个

```



## 	一、按条件表达式筛选

简单条件运算符：> < = != <> >= <=

## 二、按逻辑表达式筛选

逻辑运算符：
作用：用于连接条件表达式
&& || !
and or not
	
&&和and：两个条件都为true，结果为true，反之为false
||或or： 只要有一个条件为true，结果为true，反之为false
!或not： 如果连接的条件本身为false，结果为true，反之为false

## 三、模糊查询

### like  

语法 like '_%'

和通配符一起 % 任意多个字符,包含0个字符 _ 任意单个字符 

转义字符是反斜杠  \%=%   \ \_=_

### between and  //什么之间 区间

### in 什么和什么 	字段 IN(); 查询

### is null  空的         is not null 不是空的_

## 	四、排序查询

order by 单个字段、别名、表达式、函数、多个字段

asc默认升序 

desc降序

## 五、分组查询

组函数

min 最小

max 最大

sum 平均

avg 平均值

count 个数

## 六、其他

去重	 distinct

长度 	length(被查询) 查询字符长度

为空	 ifnull(被查询的,参数) 查是否为空 空则给一个参数

当前日期			now()  年月日时分秒

 年			year() 

当前年月日    	 date(now())

# 2.建库建表

#1.先建立库---------------------------------------------------
#删除数据库
DROP DATABASE IF EXISTS books;
#创建数据库
CREATE DATABASE IF NOT EXISTS books;
#库的修改
#rename DATABASE books to luyu;
#更改库的字符集
ALTER DATABASE books CHARACTER SET utf8;
#2.建立表---------------------------------------------------
#打开数据库
USE books;
#删除表
DROP TABLE IF EXISTS  book1;
#建立表格
CREATE TABLE IF NOT EXISTS  book1(
数据
);

## 约束

##### 		分类：六大约束 ##### 

	NOT NULL：非空，用于保证该字段的值不能为空
	比如姓名、学号等
	DEFAULT:默认，用于保证该字段有默认值
	比如性别
	PRIMARY KEY:主键，用于保证该字段的值具有唯一性，并且非空
	比如学号、员工编号等
	UNIQUE:唯一，用于保证该字段的值具有唯一性，可以为空
	比如座位号
	CHECK:检查约束【mysql中不支持】
	比如年龄、性别
	FOREIGN KEY:外键，用于限制两个表的关系，用于保证该字段的值必须来自于主表的关联列的值在从表添加外键约束，用于引用主表中某列的值比如学生表的专业编号，员工表的部门编号，员工表的工种编号

## 导入数据

插入：insert into 哪个表() values 什么数据();

修改：update 表名 set 列=新值,列=新值... [where 筛选条件];

删除：delete from 表名 [where 筛选条件];



# 视图

#### 创建视图

语法:

create view 视图名

as

查询语句; 



#### 视图修改

方式一：

create or replace view  视图名

as

查询语句;



#方式二：

语法：

alter view 视图名

as 

查询语句;

#### 删除视图

语法：drop view 视图名,视图名,...;

#### 视图的更新

插入：insert into 哪个视图() values 什么数据();

修改：update 视图 set 列=新值,列=新值... [where 筛选条件];

删除：delete from 视图 [where 筛选条件];

# 定义变量 

### 用户变量

```
作用域：针对于当前会话（连接）有效，作用域同于会话变量
赋值操作符：=或:=

①声明并初始化
SET @变量名=值;
SET @变量名:=值;
SELECT @变量名:=值;

#②赋值（更新变量的值）
方式一：
	SET @变量名=值;
	SET @变量名:=值;
	SELECT @变量名:=值;
方式二：
	SELECT 字段 INTO @变量名
	FROM 表;
	
③使用（查看变量的值）
SELECT @变量名;
```

### 局部变量

```

作用域：仅仅在定义它的begin end块中有效
应用在 begin end中的第一句话

①声明
DECLARE 变量名 类型;
DECLARE 变量名 类型 【DEFAULT 值】;

②赋值（更新变量的值）
#方式一：
	SET 局部变量名=值;
	SET 局部变量名:=值;
	SELECT 局部变量名:=值;
#方式二：
	SELECT 字段 INTO 具备变量名
	FROM 表;
	
③使用（查看变量的值）
SELECT 局部变量名;
```

# 存储过程

#### 自定义结束符

delimiter 结束标记

#### 语法

	CREATE PROCEDURE 存储过程名(参数列表)
	BEGIN
		存储过程体（一组合法的SQL语句）
	END
	
	调用
	call 存储过程名(实参)

参数模式：
in：该参数可以作为输入，也就是该参数需要调用方传入值   (实参给形参)
out：该参数可以作为输出，也就是该参数可以作为返回值  (形参给实参)
inout：该参数既可以作为输入又可以作为输出，也就是该参数既需要传入值，又可以返回值

# 函数

语法

```
CREATE FUNCTION 函数名(参数列表) RETURNS 返回类型
BEGIN
	函数体
END

调用
SELECT 函数名(参数列表)
```

查看函数

SHOW CREATE FUNCTION 函数名;

删除函数

DROP FUNCTION 函数名;

# 触发器



# 流程结构和循环结构

```
1.if语句

    if 条件1;
    then set 语句1;
    end if;

2.多重if

    if 条件1;
    then set 语句1;
    elseif 条件2;
    then set 语句2;
    end if;
```
