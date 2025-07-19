## 常见的 Linux 命令

### **文件与目录操作**

- `ls`：列出当前目录下的文件和目录。
  - `ls -l`：显示详细信息（如权限、大小、修改时间）。
  - `ls -a`：显示所有文件，包括隐藏文件。
- `cd`：切换当前目录。
  - `cd /path/to/directory`：跳转到指定目录。
  - `cd ..`：跳转到上级目录。
  - `cd ~`：跳转到用户的主目录。
- `pwd`：显示当前工作目录的完整路径。
- `mkdir`：创建目录。
  - `mkdir new-directory`：创建名为`new-directory`的目录。
- `rm`：删除文件或目录。
  - `rm file.txt`：删除文件。
  - `rm -rf directory/`：递归删除目录及其内容。
- `cp`：复制文件或目录。
  - `cp source.txt destination.txt`：复制文件。
  - `cp -r source-directory/ destination/`：递归复制目录。
- `mv`：移动文件或目录，或重命名。
  - `mv oldname.txt newname.txt`：重命名文件。
  - `mv file.txt /path/to/destination/`：移动文件。

### **文件内容查看与编辑**

- `cat`：查看文件内容。
  - `cat file.txt`：查看`file.txt`文件的内容。
- `less`：分页查看文件内容，支持上下翻页。
  - `less file.txt`：分页查看文件内容。
- `head`：查看文件的前几行。
  - `head -n 10 file.txt`：查看文件前 10 行。
- `tail`：查看文件的后几行。
  - `tail -n 10 file.txt`：查看文件后 10 行。
  - `tail -f file.txt`：实时查看文件新增的内容（常用于查看日志文件）。
- `nano`或`vim`：命令行文本编辑器。
  - `nano file.txt`：用`nano`编辑文件（易用）。
  - `vim file.txt`：用`vim`编辑文件（功能强大，学习曲线较陡）。

### **权限管理**

- `chmod`：更改文件或目录的权限。
  - `chmod 755 file.txt`：给文件设置读、写、执行权限。
  - `chmod +x script.sh`：给脚本文件增加执行权限。
- `chown`：更改文件或目录的所有者。
  - `chown user:group file.txt`：将文件的所有者改为`user`，所属组改为`group`。

### **Git 与版本控制**

- `git clone`：克隆远程 Git 仓库到本地。
- `git pull`：从远程仓库拉取最新的更新。
- `git push`：将本地的提交推送到远程仓库。
- `git commit`：提交代码。
- `git status`：查看当前工作区的状态。
- `git branch`：列出所有本地分支。
- `git checkout`：切换到其他分支。
- `git merge`：合并分支。
- `git log`：查看提交历史。

### **系统管理与监控**

- `top`：查看系统的实时进程和资源使用情况。
- `htop`：`top`的增强版，图形化界面（需要安装）。
- `ps`：查看当前正在运行的进程。
  - `ps aux`：查看所有进程。
- `kill`：终止进程。
  - `kill PID`：杀死指定 PID 的进程。
- `df`：查看磁盘空间使用情况。
  - `df -h`：以人类可读的格式显示磁盘空间。
- `free`：查看内存使用情况。
  - `free -h`：以人类可读格式显示内存使用情况。

### **网络操作**

- `ping`：测试网络连接。
  - `ping google.com`：测试与 Google 的网络连接。
- `curl`：获取网页或 API 响应。
  - `curl https://api.example.com`：获取指定 URL 的内容。
- `wget`：从网络下载文件。
  - `wget http://example.com/file.zip`：下载文件。
- `netstat`：查看网络连接。
  - `netstat -tuln`：查看监听的端口。
- `ssh`：远程连接到其他服务器。
  - `ssh user@hostname`：通过 SSH 连接到远程服务器。

### **日志查看**

- `tail -f /var/log/nginx/access.log`：实时查看 Nginx 访问日志。
- `journalctl -u service-name`：查看特定服务的日志。
- `grep`：在文件中查找特定的文本模式。
  - `grep "ERROR" /var/log/nginx/error.log`：查找 Nginx 错误日志中的所有`ERROR`。

### **包管理**

- `apt`（Debian/Ubuntu 系）：
  - `apt update`：更新软件包列表。
  - `apt upgrade`：升级已安装的软件包。
  - `apt install package-name`：安装指定软件包。
  - `apt remove package-name`：卸载指定软件包。
- `yum`（CentOS/RHEL 系）：
  - `yum install package-name`：安装指定软件包。
  - `yum update`：更新软件包。

### **前端开发相关**

- **Node.js 项目管理**：
  - `npm install`：安装项目依赖。
  - `npm run build`：执行构建命令（如构建生产环境的代码）。
  - `npm start`：启动开发服务器。
- **查看端口占用情况**：
  - `lsof -i :3000`：查看是否有进程在使用 3000 端口。
  - `kill $(lsof -t -i :3000)`：杀掉占用 3000 端口的进程。
- **使用**\*\*`pm2`\*\***管理 Node.js 应用**：
  - `pm2 start app.js`：使用`pm2`启动 Node.js 应用。
  - `pm2 restart app`：重启已启动的应用。
  - `pm2 logs`：查看应用日志。

### **自动化与调度**

- `cron`：定时任务调度。
  - 编辑定时任务：`crontab -e`。
  - 查看当前定时任务：`crontab -l`。
- `at`：设置一次性任务。
  - `at now + 5 minutes`：在 5 分钟后执行任务。
