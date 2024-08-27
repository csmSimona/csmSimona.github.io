# Git小记

#### 1、**查看我的分支和 master 的不同**

```Bash
git diff master..my-branch
```



#### 2、**定制提交**

```Bash
# 编辑上次提交
git commit --amend -m "更好的提交日志"

# 在上次提交中附加一些内容，保持提交日志不变
git add . && git commit --amend --no-edit

# 空提交 —— 可以用来重新触发 CI 构建
git commit --allow-empty -m "chore: re-trigger build"
```



#### 3、**暂存区操作**

```Bash
# 将当前修改添加到暂存区
git stash

# 查看暂存区列表
git stash list

# 恢复暂存区最近的记录
git stash apply

# 恢复暂存区指定记录
git stash apply stash@{n}

# 暂存区申请使用时，出现冲突，将冲突解决后的信息同步到暂存区
git stash apply --index

# 删除指定暂存区
git stash drop stash@{0}

# 恢复并删除最近一次暂存区
git stash pop
```



#### 4、压缩**合并提交**

```Bash
git merge --squash
```

将一个分支的所有提交压缩成一个单独的提交进行合并

不会产生合并提交，提交历史上只有一个新的提交

**使用场景：**

- **简化历史记录**：当你希望将一个功能分支的所有工作合并为一个提交，以简化提交历史时使用`git merge --squash`。
- **合并大量微小提交**：如果一个分支上有大量的微小提交，可以使用`squash`将这些提交压缩成一个，避免提交历史过于冗长。



#### 5、**git rebase**

**执行完git pull --rebase之后如果有合并冲突，使用以下三种方式处理这些冲突：**

- `git rebase --abort` 会放弃合并，回到rebase操作之前的状态，之前的提交的不会丢弃；
- `git rebase --skip` 则会将引起冲突的commits丢弃掉（慎用！！）；
- `git rebase --continue` 合并冲突，结合"git add 文件"命令一起用与修复冲突，提示开发者，一步一步地有没有解决冲突。

**功能：**

- `git rebase`将一个分支的所有提交重新应用到另一个分支上，生成新的提交。
- 历史记录将被重写，避免创建合并提交。

**使用场景：**

- **保持线性历史**：当你希望保持提交历史的线性结构，避免合并提交时使用`git rebase`。
- **整洁的提交历史**：在个人开发或小团队合作中，可以使用`git rebase`保持整洁的提交历史，使日志记录更加简洁明了

**总结：**

- `git merge`适合需要保留完整历史记录的场景
- `git merge --squash`适合需要简化提交历史的场景
- `git rebase`适合需要简洁线性历史的场景



#### 6、将一个项目复制到另一个项目仓库

```Bash
git clone --mirror <老仓库的git地址>
cd <克隆下来的项目目录>
git remote set-url origin <新的git项目的地址>
git push --all # 推送本地所有分支到新仓库（包括历史记录）
git push --tags # 推送标签
```



#### 7、git reset

- git reset ：回滚到某次提交。
- git reset --soft：此次提交之后的修改会被退回到暂存区。
- git reset --hard：此次提交之后的修改不做任何保留，git status 查看工作区是没有记录的



#### 8、回退到某个commit下并更新远程仓库（回滚代码）

```Bash
git reset --hard HEAD^         # 回退到上个版本
git reset --hard HEAD~3        # 回退到前3次提交之前，以此类推，回退到n次提交之前
git reset --hard commit_id     # 退到/进到 指定commit的sha码

# 强推到远程，更新回退后的远程仓库
git push origin HEAD --force
```



#### 9、修改已经提交并push后的commit注释

1.修改最后一次的commit注释

```
git rebase -i HEAD~1
```

2.修改pick为edit

- 回车后进入一个页面，按i进入编辑模式
- 将要修改的那一条的**pick**修改成**edit**
- 按esc退出编辑模式，输入**:wq**保存并退出

3.`git rebase --continue`

4.强制提交到远程仓库

```
git push --force
```



#### 10、cherry-pick

将已经提交的 commit，复制出新的 commit 应用到分支里

- 复制单个

  `git cherry-pick <commitHash>`

- 复制多个

```Bash
 git cherry-pick <HashA> <HashB> # 复制多个提交
 
 # 复制一系列提交
 git cherry-pick A..B   # 不包含A，包含B
 git cherry-pick A^..B  # 包含A和B
```

- 代码冲突

  场景一：解决代码冲突，重新提交到暂存区（git add .），继续执行cherry-pick

  `git cherry-pick --continue`

  场景二：放弃合并，回到操作前的样子

  `git cherry-pick --abort`

  场景三：保留已经 cherry-pick 成功的 commit，并退出 cherry-pick 流程

  `git cherry-pick --quit`



#### 11、git revert

将现有的提交还原，恢复提交的内容，并生成一条还原记录

```Bash
git revert HEAD # 撤销前一次 commit
git revert HEAD^ # 撤销前前一次 commit
git revert <commitHash> # 撤销指定的版本
```

reset和revert的区别：

`git reset`如果想恢复到之前某个提交的版本，且那个版本之后提交的版本我们都不要了，就可以用这种方法

`git revert`如果我们想撤销之前的某一版本，但是又想保留该目标版本后面的版本，记录下这整个版本变动流程，就可以用这种方法



#### 12、git merge 和 git rebase的区别

- 工作原理
  - `git merge`：将一个分支的更改合并到另一个分支。它会创建一个新的提交，该提交将两个分支的更改合并在一起，并且保留了每个分支上的历史记录。
  - `git rebase`：将当前分支的提交“移动”到目标分支的顶部，而不是创建一个新的合并提交。它会将当前分支的更改应用到目标分支的提交上，然后将当前分支移动到目标分支的最新提交之后。
- 提交历史
  - `git merge`：保留了每个分支的提交历史，并创建了一个新的合并提交，其中包含了两个分支的更改。
  - `git rebase`：将当前分支的提交“重播”在目标分支的提交之上，因此它会产生一个更线性的提交历史，看起来更加清晰。这种方法有助于保持项目历史的整洁性，但可能会导致变基后的提交 ID 发生变化，这可能会影响到已共享的提交。
- 合并冲突处理
  - `git merge`：在合并过程中，如果存在冲突，Git 会创建一个合并提交，并提示用户手动解决冲突。解决完冲突后，再提交合并结果。
  - `git rebase`：在重新应用每个提交的过程中，如果存在冲突，Git 会在每个冲突点停止，让用户解决冲突。然后用户可以使用 `git rebase --continue` 命令继续重新应用提交，直到全部提交都被应用完毕。
- 使用场景
  - `git merge`：适用于合并相对较稳定的分支，如主分支或者长期存在的开发分支。它将保留每个分支的完整历史记录，并创建一个新的合并提交，记录合并时的状态。
  - `git rebase`：通常用于将开发分支与目标分支同步，以便于保持一个清晰、线性的提交历史。这有助于避免分支合并后产生大量的合并提交，使得提交历史更易于理解和管理。



#### 13、为指定Git仓库单独配置用户名和邮箱

```Bash
# 进入指定 Git 仓库
cd HelloWorld
# 局部配置用户名
git config user.name "csmSimona"
# 局部配置邮箱
git config user.email "980715844@qq.com"
```