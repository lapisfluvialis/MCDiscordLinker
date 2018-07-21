# MCDiscordLinker

![demo](https://github.com/lapisfluvius/MCDiscordLinker/blob/master/DEMO.gif)

## 1. Install
```
$ npm install mcdiscordlinker -g
```

## 2. Config
Add properties like the following example to "server.property".
```
enable-rcon=true
rcon.port=25575
rcon.password=X9cigNWU
```

In your server directory,
```
$ mcdl --config
```
and follow the instructions.

(*1) Could you please google how to create a Discord bot and get a token.

(*2) To get the channel ID,
1. Click the gear icon at the bottom-right of your Discord client.
2. Click "Appearance" in the menu.
3. Enable "Developer Mode" in "ADVANCED".
4. Right-click on the channel name.
5. Select "Copy ID".

## 3. Run
Run as below.
```
$ java -jar server.jar nogui | mcdl
```



[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/lapisfluvius/MCDiscordLinker/blob/master/LICENSE)