# Git小记

### 1、查看我的分支和 master 的不同

```Bash
git diff master..my-branch
```



### 2、定制提交

```Bash
# 编辑上次提交
git commit --amend -m "更好的提交日志"

# 在上次提交中附加一些内容，保持提交日志不变
git add . && git commit --amend --no-edit

# 空提交 —— 可以用来重新触发 CI 构建
git commit --allow-empty -m "chore: re-trigger build"
```



### 3、暂存区操作

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



### 4、压缩合并提交

```Bash
git merge --squash
```

将一个分支的所有提交压缩成一个单独的提交进行合并

不会产生合并提交，提交历史上只有一个新的提交

**使用场景：**

- **简化历史记录**：当你希望将一个功能分支的所有工作合并为一个提交，以简化提交历史时使用`git merge --squash`。
- **合并大量微小提交**：如果一个分支上有大量的微小提交，可以使用`squash`将这些提交压缩成一个，避免提交历史过于冗长。



### 5、git rebase

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



### 6、将一个项目复制到另一个项目仓库

```Bash
git clone --mirror <老仓库的git地址>
cd <克隆下来的项目目录>
git remote set-url origin <新的git项目的地址>
git push --all # 推送本地所有分支到新仓库（包括历史记录）
git push --tags # 推送标签
```



### 7、git reset

- git reset ：回滚到某次提交。
- git reset --soft：此次提交之后的修改会被退回到暂存区。
- git reset --hard：此次提交之后的修改不做任何保留，git status 查看工作区是没有记录的



### 8、回退到某个commit下并更新远程仓库（回滚代码）

```Bash
git reset --hard HEAD^         # 回退到上个版本
git reset --hard HEAD~3        # 回退到前3次提交之前，以此类推，回退到n次提交之前
git reset --hard commit_id     # 退到/进到 指定commit的sha码

# 强推到远程，更新回退后的远程仓库
git push origin HEAD --force
```



### 9、修改已经提交并push后的commit注释

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



### 10、cherry-pick

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



### 11、git revert

将现有的提交还原，恢复提交的内容，并生成一条还原记录

```Bash
git revert HEAD # 撤销前一次 commit
git revert HEAD^ # 撤销前前一次 commit
git revert <commitHash> # 撤销指定的版本
```

reset和revert的区别：

`git reset`如果想恢复到之前某个提交的版本，且那个版本之后提交的版本我们都不要了，就可以用这种方法

`git revert`如果我们想撤销之前的某一版本，但是又想保留该目标版本后面的版本，记录下这整个版本变动流程，就可以用这种方法



### 12、git merge 和 git rebase的区别

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



### 13、为指定Git仓库单独配置用户名和邮箱

```Bash
# 进入指定 Git 仓库
cd HelloWorld
# 局部配置用户名
git config user.name "csmSimona"
# 局部配置邮箱
git config user.email "980715844@qq.com"
```



### 14、git fetch和git pull的区别

**git fetch**

- **作用**：`git fetch` 用于从远程仓库下载最新的提交、分支和标签等信息，但**不会自动合并这些更改到你的本地分支**。
- **使用场景**：当你想要查看远程仓库中的更新内容，而不立即将它们合并到你的工作分支时，可以使用 `git fetch`。
- **流程**： fetch 后，你可以通过 `git log`、`git diff` 等命令检查哪些更改在远程分支中。

**git pull**

- **作用**：**`git pull` 是 `git fetch` 和 `git merge` 的组合**，它从远程仓库下载最新的更改，并自动尝试将这些更改合并到你的当前工作分支。
- **使用场景**：当你希望立即将远程仓库中的更改应用到本地分支时，可以使用 `git pull`。
- **风险**：如果远程仓库的更改与本地更改存在冲突，`git pull` 将提示冲突并要求解决，可能需要你手动处理。

**最佳实践建议**

1. **优先使用 `git fetch`**：
   - 查看差异：`git diff main origin/main`（比较本地 `main` 和远程 `origin/main`）
   - 检查日志：`git log origin/main`（查看远程 `main` 分支的提交历史）
   - 手动合并：`git merge origin/main`（将远程变更合并到当前分支）
   - 或变基：`git rebase origin/main`（更整洁的线性历史）
2. **谨慎使用 `git pull`**：
   - 仅当确定需要**立即合并**远程变更。
   - 确保本地没有重要的未提交修改（可使用 `git stash` 暂存）。
   - 理解 `pull` 的默认行为（通常是 `fetch + merge`），也可配置为 `fetch + rebase`（`git pull --rebase`）。
3. **理解 `pull` 的配置**：
   - `git config pull.rebase true`：设置 `git pull` 默认使用 `rebase` 代替 `merge`（避免多余的合并提交）。



### 15、删除已合并的功能分支

```bash
# 删除本地分支
git branch -d feature-branch
# 删除远程分支
git push origin --delete feature-branch
```



### 16、如何使用 git 多人协作开发？

#### 1.小型项目 

（例如：1-3 人的小型开发团队）

- **共享仓库模型** ：大家都对同一个远程仓库进行操作。
- 策略：
  - 可以直接使用 `master/main` 分支，所有成员都可以在此分支上工作，避免复杂的分支管理。
  - 每个开发者都在本地创建自己的功能分支进行开发，完成后合并回 `main` 或 `master`。
  - 提交时保持简洁，并且在每次 `push` 前与远程仓库同步（`git pull --rebase`）。
- 具体流程：
  1. `git clone` 克隆远程仓库。
  2. `git checkout -b feature-branch` 创建并切换到自己的功能分支。
  3. 完成功能开发后，`git add .`、`git commit -m "Description"` 提交本地修改。
  4. 使用 `git pull --rebase` 更新远程仓库，解决冲突。
  5. 使用 `git push` 推送到远程仓库。
  6. 其他成员拉取最新的修改，确保项目同步。

#### 2.中型项目 

（例如：3-10 人的团队）

- **基于分支的协作** ：主分支用于发布，功能开发分支（feature branch）和修复分支（bugfix branch）被广泛使用。
- 策略：
  - `main` 或 `master` 作为生产分支，稳定且可以随时部署。
  - 开发人员通过功能分支进行开发，提交合并请求（Pull Requests）前进行代码审查。
  - 通过 `develop` 分支进行日常开发，`feature` 分支从 `develop` 分支创建，开发完成后合并回 `develop`。
- 具体流程：
  1. `git clone` 克隆远程仓库。
  2. 切换到 `develop` 分支并保持更新（`git pull`）。
  3. 创建自己的功能分支 `git checkout -b feature-branch`。
  4. 开发完成后，将功能分支推送到远程 `git push origin feature-branch`。
  5. 创建 Pull Request (PR)，请求代码审查并合并到 `develop` 分支。
  6. 定期将 `develop` 分支合并回 `main` 或 `master` 分支进行发布。

#### 3.大型项目

 （例如：10 人以上的团队）

- **Git Flow** ：这是一个非常适合大团队协作的模型。通过多个分支策略进行管理，确保版本发布和功能开发的平稳过渡。
- 策略：
  - `ain` 或 `master` 用于发布稳定版本。
  - `develop` 分支用于日常开发，所有新功能都在此基础上开发。
  - 使用 `feature` 分支进行独立的功能开发。
  - 使用 `release` 分支准备发布版本，包含 Bug 修复和最后的稳定性验证。
  - `hotfix` 分支用于快速修复生产环境的 bug。
- 具体流程：
  1. `git clone` 克隆仓库，切换到 `develop` 分支。
  2. 创建并切换到新的功能分支 `git checkout -b feature/feature-name`。
  3. 在功能分支上开发，完成后推送并创建 PR 合并回 `develop` 分支。
  4. 在 `develop` 分支合并后，测试团队测试新的功能，确保没有问题。
  5. 若需发布新版本，从 `develop` 创建 `release` 分支，进行最后的 bug 修复和稳定性测试。
  6. 发布后将 `release` 分支合并到 `main` 和 `develop` 分支。
  7. 快速修复 bug 时，从 `main` 分支创建 `hotfix` 分支，修复后合并回 `main` 和 `develop`。

#### 4.开源项目

- **Fork & Pull Request 模式** ：开源项目通常采用这种模式，每个贡献者通过自己的 Fork 进行开发，并通过 Pull Request 提交贡献。
- 策略：
  - 贡献者 Fork 项目仓库到自己的 GitHub（或其他平台）账户。
  - 在 Fork 的仓库中开发新的功能或修复 bug。
  - 完成开发后，创建 Pull Request 提交到原仓库进行审查。
  - 项目维护者负责合并经过审查的代码，确保项目稳定。
- 具体流程：
  1. `git fork` 仓库到自己的 GitHub 账户。
  2. `git clone` 自己 Fork 后的仓库。
  3. 创建一个功能分支 `git checkout -b feature-name`。
  4. 在功能分支上进行开发，提交修改并推送到自己的 Fork 仓库。
  5. 提交 PR 请求合并到原仓库的 `main` 或 `develop` 分支。
  6. 原项目维护者审查代码，若通过则合并；如果有问题，贡献者根据反馈修改代码。

#### 5.闭源项目

- **私有仓库** ：闭源项目通常使用私有仓库进行管理，团队协作模式与开源项目类似，但可能不需要开放给外部贡献者。
- 策略：
  - 仅限团队内部访问，所有成员都在相同的权限范围内操作。
  - 使用与中型项目类似的 Git Flow 或其他基于分支的工作流。
- 具体流程：
  1. 创建私有仓库并初始化 `main` 或 `master` 分支。
  2. 开发人员从 `develop` 分支创建功能分支进行开发。
  3. 完成后提交 PR 进行代码审查。
  4. 审查通过后，合并回 `develop` 分支并准备发布。
  5. 发布前测试人员验证，发布后合并到 `main`。

#### 总结

- **小型项目** ：共享仓库模型，简单的开发流程。
- **中型项目** ：功能分支管理，使用 `develop` 和 `feature` 分支。
- **大型项目** ：Git Flow 模式，多分支管理，发布和修复分支分开。
- **开源项目** ：Fork & Pull Request 模式，社区贡献，开放和审查。
- **闭源项目** ：私有仓库，常用 Git Flow 或类似工作流，团队内部管理。









