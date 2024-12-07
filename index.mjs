import { WechatferryPuppet } from "@wechatferry/puppet";
import { WechatyBuilder } from "wechaty";
import fs from "fs";
import path from "path";

// 创建根目录用于存储聊天记录
const chatLogRootDir = "./chat-logs";
if (!fs.existsSync(chatLogRootDir)) {
    fs.mkdirSync(chatLogRootDir);
}

const puppet = new WechatferryPuppet();
const bot = WechatyBuilder.build({ puppet });

bot
    .on("message", async (msg) => {
        // 确保消息是文字
        if (msg.type() !== bot.Message.Type.Text) {
            return; // 忽略非文字消息
        }

        const from = msg.talker(); // 消息发送者
        const text = msg.text(); // 消息内容
        const room = msg.room(); // 群信息
        const timestamp = new Date(); // 时间对象
        const timeString = timestamp.toLocaleString(); // 格式化完整时间

        // 如果是凌晨2点前，使用前一天的日期
        const adjustedDate = new Date(timestamp);
        if (adjustedDate.getHours() < 2) {
            adjustedDate.setDate(adjustedDate.getDate() - 1);
        }
        const dateString = adjustedDate.toLocaleString().split(" ")[0].replaceAll('/','-'); // 格式化日期 (YYYY-MM-DD)

        if (room) {
            const roomName = await room.topic(); // 获取群名称
            const senderName = from?.name() || "Unknown"; // 发言者姓名

            // 替换群名称中可能导致文件路径问题的字符
            const sanitizedRoomName = roomName.replace(/[/\\?%*:|"<>]/g, "-");
            const roomDir = path.join(chatLogRootDir, sanitizedRoomName);

            // 确保群目录存在
            if (!fs.existsSync(roomDir)) {
                fs.mkdirSync(roomDir, { recursive: true });
            }

            // 定义日志文件路径（以日期命名）
            const logFilePath = path.join(roomDir, `${dateString}.txt`);

            // 如果文件不存在，创建新文件
            if (!fs.existsSync(logFilePath)) {
                fs.writeFileSync(logFilePath, ''); // 创建空文件
                console.log(`Created new log file: ${logFilePath}`);
            }

            // 构造日志内容
            const logLine = `[${timeString}] [${senderName}] ${text}\n`;

            // 将聊天记录追加到文件中
            fs.appendFile(logFilePath, logLine, (err) => {
                if (err) {
                    console.error(`Failed to save log for room "${roomName}":`, err);
                }
            });

            console.log(`Saved message in room "${roomName}":`, logLine.trim());
        } else {
            console.log(`Received message from: ${from?.name()} - Content: ${text}`);
        }

        // 回复 "dong" 功能
        if (text === "ding") {
            msg.say("dong");
        }
    })
    .start();
