# DayZ Discord Bot - integration with your server & channel
This script will connect your existing Discord bot with your RCon BattlEye connection to your DayZ server

## **Available Intergrations**
**• Display Global & Direct in-game chat to certain discord channel**

**• Display player connect & disconnect info to certain discord channel**

**• Display current in-game online players to certain discord voice channel & in bot activity**

**• Display RCON logs to certain discord channel**


# Installation
Either download zip this repository or git clone it into an empty folder.
###


1) Navigate into `package.json` and change "name" to your desired app name (kebab-case only).

2) Navigate into `.env` and for each variable add its currect value:


**• DISCORD_TOKEN=**"YOUR DISCORD BOT TOKEN""

**• CHAT_CHANNEL_ID=**"YOUR DISCORD DESIGNATED GLOBAL & DIRECT CHANNEL ID""

**• SERVER_EVENTS_CHANNEL_ID=**"YOUR DISCORD DESIGNATED RCON LOGS CHANNEL ID""

**• SERVER_EVENTS_LOG_CHANNEL_ID=**"YOUR DISCORD DESIGNATED PLAYERS CONNECT & DISCONNECT CHANNEL ID""

**• PLAYER_COUNT_CHANNEL_ID=**"YOUR DISCORD DESIGNATED ONLINE IN-GAME PLAYERS COUNT VOICE CHANNEL ID" 


**• BE_IP=**"SERVER IP"

**• BE_PORT=**"SERVER RCON PORT"

**• BE_PASS=**"SERVER RCON PASSWORD"

# Setup
Now in your IDE (VSCode or other node script able compiler) open a new terminal and type: `npm install`.

After dependencies installtion type in the terminal: `node index.js`.

Script now will run and display to your Terminal log all the collected data from your RCon server, as long as this terminal runs your bot will be online.

You can also find a free Discord bot hosting service which is a better option to keep your bot alive, I found this video explaining how to integrate in a very easy way this code with Discloud: https://www.youtube.com/watch?v=zU5KK0bnkwY


