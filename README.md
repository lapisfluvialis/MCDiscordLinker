# MCDiscordLinker

![demo](https://github.com/lapisfluvius/MCDiscordLinker/blob/master/DEMO.gif)

## Features
* Enable the members to talk with people in the game from Discord channel.
* The members can know who is joining the game by sending "/list" command from the channel. 
* Operator(s) can send any command via the dedicated channel.
* You don't have to install Forge or Spigot.

## Install
```
$ npm install mcdiscordlinker -g
```
**Do not forget -g option.**

## Run
Replace "java" in the server startup command with "mcdl".

e.g.
```
$ mcdl -jar server.jar nogui
```
* The first time you start the server, you have to configure the settings by following the instructions displayed on the screen.
* The configuration file, "mcdl-config.json", will be created in the current directory. You can edit this file by "mcdl" command or various text editors.



[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/lapisfluvius/MCDiscordLinker/blob/master/LICENSE)