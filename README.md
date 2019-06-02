# MCDiscordLinker

![demo](https://github.com/lapisfluvialis/MCDiscordLinker/blob/master/DEMO.gif)

## Features
* Enable the members to talk with people in the game from Discord channel.
* The members can know who is joining the game by sending "/list" command from the channel.
* Operator(s) can send any command via another channel.
* You don't have to install Forge or Spigot.

## Install
```
$ npm install mcdiscordlinker -g
```
**Do not forget the "-g" option.**

## Run
Replace "java" in the server startup command with "mcdl".

e.g.
```
$ mcdl -jar server.jar nogui
```
* The first time you start the new server, you have to configure the settings by following the instructions displayed on the screen.
* If you want to change the settings later, run "mcdl" (with no args) or edit "mcdl-config.json" manually.



[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/lapisfluvialis/MCDiscordLinker/blob/master/LICENSE)