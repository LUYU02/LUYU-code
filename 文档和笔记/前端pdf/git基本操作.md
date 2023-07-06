# git基本操作

1. git init      <!--//初始化文件-->

2. git status  简写(**git status -s  git status -short**)      //查看文件的状态

3. git add 文件名   全部文件(git add .)      //跟踪文件 放到暂存区

4. git commit -m "描述"       //提交更新

5. git checkout -- 文件名      //撤销还未提交到git的文件 还原成git的版本(**无法恢复**)

6. git reset HEAD 文件名     //从暂存区中移除对应的文件

7. git commit -a -m "描述"     跳过git add 的命令 将已跟踪的文件直接提交到仓库

8. git rm -f 文件名 将工作区和仓库的文件同时移除

9. git rm --cached 文件名 从仓库移除 保留工作区文件

10. 忽略文件  先创建 .gitignore  配置文件

    | 以 # 开头是注释       |
    | --------------------- |
    | 以 / **结尾**的是目录 |
    | 以 / **开头**防止递归 |
    | 以 ! 开头表示取反     |

    glob 模式进行文件和文件夹的匹配（glob 指简化了的正则表达式）

    ①**星号 \*** 匹配零个或多个任意字符

    ② **[abc]** 匹配任何一个列在方括号中的字符 （此案例匹配一个 a 或匹配一个 b 或匹配一个 c）

    ③ **问号** **?** 只匹配一个任意字符

    ④ 在方括号中使用**短划线**分隔两个字符， 表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配所有 0 到 9 的数字）

    ⑤ **两个星号 \**** 表示匹配任意中间目录（比如 a/**/z 可以匹配 a/z 、 a/b/z 或 a/b/c/z 等）

    ## 查看提交版本

    git log 排序所有的提交历史 最近的在上面

    git log --数字   显示最新的提交历史

    git log --2 --pretty=oneline 在一行显示提交历史

    git log --2 --pretty=format:"%h - %an - %ar - %s" (%h提交的简写哈希值%an作者名字%ar作者修订日期，按多久以前的方式显示%s提交说明) 在一行展示最近两次的提交历史 并自定义输出格式

    ## 回到指定版本

    git reset --hard  id    指定的提交id 回退指定版本

    git reflog --pretty=oneline  查看命令操作的历史 (在旧版使用这个查看历史版本)

    

    # 提交到github

    git push -u origin master  第一次提交到github中

    git push 提交到github仓库中   

    ## 克隆到本地

    git clone 远程仓库的地址

    # 本地分支

    查看分支 git branch  

    创建分支 git branch  分支名称

    切换分支 git checkout 分支名称

    快速切换并创建分支 git checkout -b 分支名称

    合并分支 git merge 分支名称      切换到主分支 在执行改代码

    删除分支 git branch -d 分支名称    **强行删除 -D**

    如果在两个不同的分支中，对同一个文件进行了不同的修改，Git 就没法干净的合并它们。 此时，我们需要打开这些包含冲突的文件然后**手动解决冲突**。

    git add .

    git commit -m ""

    ## 远程分支

    **本地分支推送到远程仓库 (第一次推送要写-u)**

    git push -u 远程仓库的别名(默认 origin) 本地分支名称:远程分支名称 (不改名称直接写一个)

    查看远程仓库所有分支 git remote show 远程仓库的别名(默认 origin)

    **跟踪分支 从远程仓库中，把远程分支下载到本地仓库中**

    git checkout 远程仓库名称

    下载本地并取别名 git checkout -b 本地分支名称 远程仓库名称(origin)/远程分支名称

    **拉取远程分支最新代码**

    拉取当前分支最新代码 git pull

    **删除远程分支**

    git push 远程仓库名称(origin) --delete 远程分支名称

    

