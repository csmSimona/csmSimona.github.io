# Nodejs 面试题

### 对 Node.js 的理解

Node.js 是一个基于 Chrome V8 引擎的开源、跨平台的 JavaScript 运行时环境。它具有以下核心特点：

1. **运行环境**：让 JavaScript 可以在浏览器之外运行，使其成为一个服务器端的运行环境
2. **非阻塞 I/O**：
   - 采用非阻塞型 I/O 机制
   - 执行 I/O 操作时不会造成阻塞
   - 操作完成后通过事件通知执行回调函数
   - 例如：执行数据库操作时，不需要等待数据返回，而是继续执行后续代码，数据库返回结果后再通过回调函数处理
3. **事件驱动**：
   - 基于事件循环（Event Loop）
   - 新请求会被压入事件队列
   - 通过循环检测队列中的事件状态变化
   - 当检测到状态变化，执行对应的回调函数



### Node.js 的优缺点

**优点：**

1. 高并发处理能力强
2. 适合 I/O 密集型应用
3. 事件驱动非阻塞模式，程序执行效率高
4. 使用 JavaScript，前后端可以使用同一种语言
5. npm 生态系统非常强大

**缺点：**

1. 不适合 CPU 密集型应用
2. 单线程模式，无法充分利用多核 CPU
3. 可靠性相对较低，一旦出现未捕获的异常，整个程序可能崩溃
4. 回调函数嵌套多时可能产生回调地狱



### Node.js 应用场景

**最适合的场景：**

1. I/O 密集型应用
2. 实时交互应用
3. 高并发请求处理

**具体应用领域：**

1. **Web 应用系统**
   - 后台管理系统
   - 用户表单收集系统
   - 考试系统
   - 高并发 Web 应用
2. **实时通讯应用**
   - 在线聊天室
   - 实时通讯系统
   - 图文直播系统
   - WebSocket 应用
3. **接口服务**
   - RESTful API 服务
   - 数据库操作接口
   - 前端/移动端 API 服务
4. **工具类应用**
   - 构建工具（如 webpack）
   - 开发工具
   - 自动化脚本
5. **微服务**
   - 轻量级微服务
   - 中间层服务（BFF）

注意：虽然 Node.js 理论上可以开发各种应用，但在选择使用时应该考虑其是否适合特定场景，特别是需要避免在 CPU 密集型场景中使用。





