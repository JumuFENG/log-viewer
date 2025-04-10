FROM node:slim

# 设置工作目录
WORKDIR /app

# 复制文件
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# 默认端口（可通过 ENV 覆盖）
ENV LOGVIEWER_PORT=5179

# 对外暴露端口
EXPOSE ${LOGVIEWER_PORT}

# 启动应用
CMD ["node", "server.js"]
