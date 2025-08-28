# DayZ DiscordBot - integrate DayZ server data with Discord server
This script will connect your existing Discord bot with your RCon BattlEye connection to your DayZ server and send game data to your discord server channels

# Installation
Either download zip this repository or git clone it into an empty folder.
###


1) Navigate into `package.json` and change "name" to your desired app name (kebab-case only).

2) Navigate into `.env` and for each variable add its currect value:


**• DISCORD_TOKEN=**"YOUR DISCORD BOT TOKEN"

**• CHAT_DIRECT_CHANNEL_ID=**"YOUR DISCORD DESIGNATED DIRECT MESSAGES CHANNEL ID"

**• CHAT_GLOBAL_CHANNEL_ID=**"YOUR DISCORD DESIGNATED GLOBAL MESSAGES CHANNEL ID"

**• SERVER_RCON_EVENTS_CHANNEL_ID=**"YOUR DISCORD DESIGNATED RCON LOGS CHANNEL ID"

**• PLAYER_CONNECT_CHANNEL_ID=**"YOUR DISCORD DESIGNATED PLAYERS CONNECT & DISCONNECT CHANNEL ID"

**• PLAYER_COUNT_CHANNEL_ID=**"YOUR DISCORD DESIGNATED ONLINE IN-GAME PLAYERS COUNT VOICE CHANNEL ID" 


**• BE_IP=**"SERVER IP"

**• BE_PORT=**"SERVER RCON PORT"

**• BE_PASS=**"SERVER RCON PASSWORD"

# Setup
Now in your IDE (VSCode or other node script able compiler) open a new terminal and type: `npm install`.

After dependencies installtion type in the terminal: `node index.js`.

Script now will run and display to your Terminal log all the collected data from your RCon server, as long as this terminal runs your bot will be online.

<img width="470" height="227" alt="rconinitlog" src="https://github.com/user-attachments/assets/ce8010b8-e367-4736-aae3-6989336c69c1" />

You can also find a free Discord bot hosting service which is a better option to keep your bot alive, I found this video explaining how to integrate in a very easy way this code with Discloud: https://www.youtube.com/watch?v=zU5KK0bnkwY

<br>
<br>

## **Available Integrations**
## **• Display Global in-game chat to certain discord channel**

<img width="511" height="170" alt="Screenshot 2025-08-27 182902" src="https://github.com/user-attachments/assets/174059cb-64a7-41a8-8017-e51cf522616b" />

<br>
<br>

## **• Display Direct in-game chat to certain discord channel**

<img width="518" height="317" alt="Screenshot 2025-08-27 182651" src="https://github.com/user-attachments/assets/00a7dba8-61d8-4245-86b5-ad3b7c067ae0" />

<br>
<br>

## **• Display player connect & disconnect info to certain discord channel**

<img width="555" height="321" alt="asdawdawda" src="https://github.com/user-attachments/assets/9cd8309b-d8c5-4bf7-9b45-a7395aa4ff9e" />

<br>
<br>

## **• Display current in-game online players to certain discord voice channel & in bot activity**

<img width="243" height="83" alt="Screenshot 2025-08-27 182559" src="https://github.com/user-attachments/assets/90c5dacf-7370-47b6-acee-a3109e1d4800" />

<img width="244" height="38" alt="Screenshot 2025-08-27 182701" src="https://github.com/user-attachments/assets/62f5345c-8fe5-41a5-8b4a-be0e89575a32" />

<br>
<br>

## **• Display RCON logs to certain discord channel**

<img width="557" height="430" alt="rconnew" src="https://github.com/user-attachments/assets/888d2807-fc53-4983-9a8d-e8642f43374e" />
