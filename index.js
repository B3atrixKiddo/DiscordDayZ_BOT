import { Client, GatewayIntentBits, ChannelType, ActivityType } from "discord.js";
import dotenv from "dotenv";
import RCON from "battleye-node";

dotenv.config(); // load .env file

// ---------- Config ----------
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const BE_PASS = process.env.BE_PASS;
const CHAT_CHANNEL_ID = process.env.CHAT_CHANNEL_ID;
const SERVER_EVENTS_CHANNEL_ID = process.env.SERVER_EVENTS_CHANNEL_ID;
const SERVER_EVENTS_LOG_CHANNEL_ID = process.env.SERVER_EVENTS_LOG_CHANNEL_ID;
const PLAYER_COUNT_CHANNEL_ID = process.env.PLAYER_COUNT_CHANNEL_ID;
const BE_IP = process.env.BE_IP;
const BE_PORT = Number(process.env.BE_PORT || 2408);



// ---------- Discord Client ----------
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// ---------- Discord Channel Variables ----------
let chatChannel, eventsChannel, logChannel, playerCountChannel;


// ---------- BattlEye RCon Variable ----------
let be;


// ---------- Validations ----------
if (!DISCORD_TOKEN) {
    console.error("⚠️ Missing DISCORD_TOKEN");
    process.exit(1);
}

if (!BE_PASS) {
    console.error("⚠️ Missing BE_PASS");
    process.exit(1);
}


// ---------- Discord Bot Login ----------
client.login(DISCORD_TOKEN); // login to Discord with bot token


// ---------- Discord Boot ----------
client.once("ready", async () => { // when Discord bot is ready

    console.log(`✅ Logged in as ${client.user.tag}`); // log bot login to console

    chatChannel = await client.channels.fetch(CHAT_CHANNEL_ID).catch(() => null);                // global & direct chat channel
    eventsChannel = await client.channels.fetch(SERVER_EVENTS_CHANNEL_ID).catch(() => null);     // server events channel
    logChannel = await client.channels.fetch(SERVER_EVENTS_LOG_CHANNEL_ID).catch(() => null);    // players connected/disconnected log channel
    playerCountChannel = await client.channels.fetch(PLAYER_COUNT_CHANNEL_ID).catch(() => null); // player count channel

    // verify channels exist
    if (!chatChannel) console.log("⚠️  Missing access to CHAT_CHANNEL_ID");
    if (!eventsChannel) console.log("⚠️  Missing access to SERVER_EVENTS_CHANNEL_ID");
    if (!logChannel) console.log("⚠️  Missing access to SERVER_EVENTS_LOG_CHANNEL_ID");
    if (!playerCountChannel) console.log("⚠️  Missing access to PLAYER_COUNT_CHANNEL_ID");

    startBE(); // connect BattlEye RCon

});


// ---------- BattlEye RCon ----------
function startBE() { // main function to start & manage BattlEye RCon connection to capture and filter server messages

    be = new RCON({
        address: BE_IP,                // your server IP
        port: BE_PORT,                //  your server port (2306,2308...)
        password: BE_PASS,           //   RCON password from BEServer_x64.cfg
        connectionType: "udp4",     //    or "udp6"
        connectionTimeout: 50000,  //     50s before marking connection dead - [in ms (default 50000, min 50000)]
        connectionInterval: 10000,//      retry every 10s if disconnected - [in ms (default 5000, min 5000)]
        keepAliveInterval: 30000 //       send a keep-alive command every 30s - [in ms (default 10000)]
    });


    be.on("onConnect", (isConnected) => console.log("🔑  BE connected:", isConnected)); // on RCon connection true, display to console successful connection message

    be.on("disconnect", () => { console.log("🔌  BE disconnected"); }); // on RCon disconnect, display to console disconnect message

    be.on("error", (e) => { console.warn("⚠️  BE error:", e?.message || e); }); // on RCon error, display to console error message


    // main event, all server messages will be received here & all Discord implementation for chat, player connect/disconnect & server events goes here
    be.on("message", async (msg) => {

        console.log(msg); // log all messages to console

        // detect player count message and update Discord voice channel with current in game players count
        if (msg.includes("[IP Address]:[Port] [Ping] [GUID] [Name]")) {
            const total = parseTotalPlayers(msg);
            if (total != null) {
                await updatePlayerCount(total);
                return;
            }
        }

        // detect RCon and GUID messages and send them to server events Discord channel
        if (msg.includes("RCon") || msg.includes("GUID")) {
            if (!msg.includes("Welcome") && eventsChannel) {
                await eventsChannel.send(msg);
            }
            return;
        }

        // detect player connected/disconnected messages and send them to log Discord channel
        if (msg.includes("Player #")) {

            // ignore player Welcome message to console
            if (msg.includes("Welcome")) return;

            // display disconnected player to Discord channel
            if (logChannel && msg.includes(" disconnected")) {
                //  be.commandSend?.("players"); // can uncomment this line if you want to query current player count to update on disconnect too
                await logChannel.send(`\`\`\`diff\n- ${msg}\n\`\`\``);
            }

            // display connected player to Discord channel + query current player count
            else if (logChannel && msg.includes(" connected")) {
                be.commandSend?.("players"); // triggers player count command
                await logChannel.send(`\`\`\`diff\n+ ${msg}\n\`\`\``);
            }
            return;
        }

        // detect Global & Direct in-game chat messages and send them to global Discord channel
        if (msg.includes("(Global)")) {

            // parse chat message
            const chat = parseChat(msg);

            if (!chat || !chatChannel) return;

            const { type, name, text } = chat;

            // if the type really is Global, use diff + else use fix (for Direct messages)
            if (type === "Global") {
                await chatChannel.send(`\`\`\`diff\n+ (${type}) ${name}: ${text}\n\`\`\``);
            } else {
                await chatChannel.send(`\`\`\`fix\n(${type}) ${name}: ${text}\n\`\`\``);
            } return;
        }

    });

    try {
        be.login(); // attempt RCon login
    } catch (e) {
        console.warn("Login threw:", e?.message || e); // catch any login errors
    }
}


// ---------- Helpers----------
async function updatePlayerCount(n) { // update player count voice channel name & bot activity status

    try {
        if (!PLAYER_COUNT_CHANNEL_ID) return;
        // const ch = await client.channels.fetch(PLAYER_COUNT_CHANNEL_ID).catch(() => null);
        const ch = playerCountChannel;
        if (ch && (ch.type === ChannelType.GuildVoice || ch.type === ChannelType.GuildStageVoice)) {
            const newName = `Players: ${n}`;
            if (ch.name !== newName) await ch.setName(newName);
        }
        // if (client.user) await client.user.setActivity(`${n} online`, { type: ActivityType.Custom }); // old way
        if (client.user) {
            await client.user.setPresence({
                activities: [
                    {
                        type: ActivityType.Custom,         // ActivityType options: Playing, Streaming, Listening, Watching, Competing, Custom
                        name: "custom",                   // the custom activity name (not shown on Discord)
                        state: `🪖 In-game Survivors: ${n}`,// <- the text shown you can change it to what ever, but keep in mind that n is the amount
                    },
                ],
                status: "online", // You can show online, idle, and dnd (do not disturb)
            });
        }
    } catch (e) {
        console.warn("updatePlayerCount:", e?.message || e); // catch any errors
    }
}

function parseTotalPlayers(line) { // function to parse the "players" command to get the total number of players

    // parse "(12 players in total)" or "(1 player in total)"
    // parse to return the number only 
    const m = String(line).match(/\((\d+)\s+players?\s+in\s+total\)/i);
    return m ? Number(m[1]) : null;
}

function parseChat(line) { // function to parse and display the in game global/direct chat message to correct chat type, player name & message text in Discord channel

    let s = (line || "").replace(/^.*BattlEye Server:\s*/i, "").trim();
    if (/^Player\s+#\d+\s+/i.test(s) || /^\d{2}:\d{2}:\d{2}\s+Player\s+/i.test(s) || /-+\s*BE GUID:/i.test(s) || /^RCon admin\s+#\d+/i.test(s) || /\b(?:connecting|connected|disconnected)\b\.?$/i.test(s)) return null;
    const arrowRe = /^(?:ᐅ|▶|▷|>)+\s*/;
    const build = (name, text) => {
        name = (name || "").trim();
        text = (text || "").trim();
        const isGlobal = arrowRe.test(text);
        // understaind the diffrence between Global and Direct message by the arrow at the start of the message (▶)
        if (isGlobal) text = text.replace(arrowRe, "");
        return { type: isGlobal ? "Global" : "Direct", name, text };
    };
    let m = s.match(/\(Global\)\s*([^:]+):\s*(.+)$/i);
    if (m) return build(m[1], m[2]);
    m = s.match(/^\s*([^:]+):\s*(.+)$/);
    if (m) return build(m[1], m[2]);
    return null;
}