---
title: git各分支开发，最后合并主分支
createTime: 2025/02/28 16:28:15
tags:
- git
permalink: /article/15iokif7/
---
# 1 重新拉取远程分支

```
git fetch origin
```

# 2 将远程的develop代码合并到本地的dev-zhou分支

要将远程的`develop`分支代码合并到本地的`dev-zhou`分支，你可以按照以下步骤操作：

1. **确保你在`dev-zhou`分支上**：

首先，你需要确保你当前在`dev-zhou`分支上工作。你可以使用`git status`查看当前分支，或者使用`git branch`查看所有分支并确认你所在的分支。如果不在`dev-zhou`分支上，使用`git checkout`命令切换到该分支：

```bash
git checkout dev-zhou
```

1. **拉取远程的`develop`分支的最新代码**：

在合并之前，你需要确保本地的`develop`分支是最新的，与远程仓库的`develop`分支保持一致。使用`git fetch`和`git merge`或者`git pull`来更新你的本地`develop`分支：

```bash
git fetch origin develop  
git checkout develop  
git merge origin/develop
```

或者你也可以直接使用`git pull`来简化这个过程：

```bash
git checkout develop  
git pull origin develop
```

这将会把远程`develop`分支的最新代码合并到你的本地`develop`分支。

1. **将`develop`分支的代码合并到`dev-zhou`分支**：

现在你已经有了最新的`develop`分支代码，可以将其合并到`dev-zhou`分支：

首先，切换回`dev-zhou`分支（如果你之前不在这个分支上）：

``` 
git checkout dev-zhou
```

然后，将`develop`分支的代码合并到`dev-zhou`分支：

```bash
git merge develop
```

Git会尝试将`develop`分支上的更改合并到`dev-zhou`分支。如果有冲突，Git会暂停合并过程，并标记出冲突的文件。你需要手动编辑这些文件来解决冲突，然后运行`git add`来标记冲突已解决，并最后使用`git commit`来提交合并的更改。

1. **解决可能的冲突**：

如果在合并过程中出现冲突，你需要打开有冲突的文件，查找并编辑以`<<<<<<<`、`=======`和`>>>>>>>`标记的区域，以解决冲突。解决完冲突后，保存文件并使用`git add`命令将文件添加到暂存区：

```bash
git add <conflicted-file>
```

重复这个过程，直到所有的冲突都已解决。

1. **提交合并的更改**：

一旦所有的冲突都已解决，你可以提交这个合并：

```bash
git commit -m "Merge develop into dev-zhou"
```

1. **（可选）推送更改到远程仓库**：

如果你想要将本地的更改推送到远程仓库的`dev-zhou`分支，使用`git push`命令：

```bash
git push origin dev-zhou
```

这样，你就成功地将远程的`develop`分支代码合并到了本地的`dev-zhou`分支，并可以选择将更改推送到远程仓库。

# 3 将dev-zhou分支推给远程develop分支

1. 首先，确保你的本地`dev-zhou`分支是最新的。在`dev-zhou`分支上运行`git pull`来同步远程变更。

   ```bash
   git checkout dev-zhou
   git pull origin dev-zhou
   ```



2. 切换到本地的`develop`分支，并拉取最新的远程变更，以确保合并时没有冲突。

   ```bash
   git checkout develop
   git pull origin develop
   ```



3. 将`dev-zhou`分支的变更合并到`develop`分支。

   ```bash
   git merge dev-zhou
   ```



4. 如果合并成功且没有冲突，推送合并后的变更到远程的`develop`分支。

   ```bash
   git push origin develop
   ```