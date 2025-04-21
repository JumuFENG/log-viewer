# Log Viewer

一个基于 Node.js 的看日志的 Web 工具

## 功能特性

- **实时日志查看**: 使用 Web 界面方便地查看日志文件。

![示例截图](https://github.com/user-attachments/assets/447e3098-3c2d-4e34-abca-ed2ba183208a)

## 技术栈

- **Node.js**: 运行时环境
- **HTML + JavaScript**: 前端界面
- **Docker**: 支持容器化部署

## 快速开始

### 环境要求

- Node.js >= 14.x
- Docker (可选)

### 安装与运行

#### 使用 Node.js

1. 克隆仓库：
   ```bash
   git clone https://github.com/JumuFENG/log-viewer.git
   cd log-viewer

2. 安装依赖：
   ```bash
    npm install

3. 启动服务：
   ```bash
    npm start

4. 打开浏览器访问：http://localhost:3000。

#### 使用 Docker
1. 拉取镜像并运行：
   ```bash
    docker build -t log-viewer .
    docker run -p 3000:3000 log-viewer
2. 打开浏览器访问：http://localhost:3000。

## 贡献
欢迎对本项目进行贡献！请提交 PR 或创建 Issue 以报告问题或提出建议。

## 许可证
该项目基于 MIT License 许可。

