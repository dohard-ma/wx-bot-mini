# wx-bot-mini

## 项目说明

这是一个微信机器人，基于wechaty和wechatferry开发。

会自动记录群消息，并保存到本地。

聊天文件默认保存到当前目录下的`chat-logs`文件夹中。

## 项目结构

- index.mjs 主文件，用于启动机器人
- package.json 项目配置
- README.md 项目说明

## 环境要求和配置

### Node.js 18.17.1

下载地址: <https://nodejs.cn/en/download/prebuilt-installer>

![下载node安装包](./images/download-node-installer.png)

## 安装依赖

在当前目录下打开终端，输入以下命令安装项目依赖

```bash
npm i
```

![安装依赖](./images/install-dependencies.png)

## 启动项目

在当前目录下打开终端，输入以下命令启动项目

```bash
npm start
```

![启动项目](./images/start-project.png)

## 效果展示

当有人在群里发送消息时，会自动记录到本地。

![效果展示](./images/effect-show.png)

![聊天记录](./images/chat-logs.png)
