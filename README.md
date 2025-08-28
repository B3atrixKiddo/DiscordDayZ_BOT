# DayZ Discord Bot - integrate game server data to discord server
This script will connect your existing Discord bot with your RCon BattlEye connection to your DayZ server and send game data to your discord server channels

# Installation
Either download zip this repository or git clone it into an empty folder.
###


1) Navigate into `package.json` and change "name" to your desired app name (kebab-case only).

2) Navigate into `.env` and for each variable add its currect value:


**• DISCORD_TOKEN=**"YOUR DISCORD BOT TOKEN"

**• CHAT_CHANNEL_ID=**"YOUR DISCORD DESIGNATED DIRECT MESSAGES CHANNEL ID"

**• CHAT_GLOBAL_CHANNEL_ID=**"YOUR DISCORD DESIGNATED GLOBAL MESSAGES CHANNEL ID"

**• SERVER_EVENTS_CHANNEL_ID=**"YOUR DISCORD DESIGNATED RCON LOGS CHANNEL ID"

**• SERVER_EVENTS_LOG_CHANNEL_ID=**"YOUR DISCORD DESIGNATED PLAYERS CONNECT & DISCONNECT CHANNEL ID"

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

## **Available Intergrations**
## **• Display Global & Direct in-game chat to certain discord channel**

<img width="517" height="228" alt="chat" src="https://github.com/user-attachments/assets/6f7b8ca4-e0da-4d62-b31b-4f79b8d259bd" />

*optinal*: **send only global chat server messages to discord channel**

add comment // to the direct messages part(where fixx is located)
<img width="790" height="159" alt="image" src="https://github.com/user-attachments/assets/3bbcc2d8-0ca7-402d-98f3-50745001b5e7" />
you can also send the direct message into a diffrent discord channel, for example private mod channel to see direct messages between players
<br>
<br>

## **• Display player connect & disconnect info to certain discord channel**

<img width="496" height="145" alt="cdis" src="https://github.com/user-attachments/assets/421fed66-687a-4e0e-beca-302c43af9090" />

<br>
<br>

## **• Display current in-game online players to certain discord voice channel & in bot activity**

<img width="283" height="196" alt="image" src="https://github.com/user-attachments/assets/7bad089c-c8d9-41b6-b524-4925a95c4c51" />

<img width="243" height="79" alt="image" src="https://github.com/user-attachments/assets/e9861851-bdf5-4ec6-b4de-18a579d67bbb" />

<br>
<br>

## **• Display RCON logs to certain discord channel**

<img width="556" height="353" alt="rconlog" src="https://github.com/user-attachments/assets/0b5b731d-3300-4760-9c34-024ca5cd95eb" />


