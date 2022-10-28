---
sidebar_position: 6
---

# Rate Limit
The free version of RT has something called a rate limit.  
これは、RTに負荷がかからないようにするための制限のことです。  
例えば、短時間に大量のメッセージが送信されると、RTはそのサーバーからのコマンドとメッセージを受け付けなくなります。  
That is rate limit.
## Conditions for Occurrence
Currently, the rate limit is reached when the pace of four messages per second continues for about eight seconds.  
これは常に複数人が喋っているような活発なサーバーか、荒らしによって荒らされてしまったという場合にレート制限にかかると思います。  
またその他にも、短時間に大量のユーザーがサーバーに参加するなどでもレート制限にかかります。
## Examples of countermeasures
- 荒らされないようにRTの認証を適切に設定する。
- Set the channel to low-speed mode.
  - Discordのアプリでは五秒づつでしか設定できませんが、RTの`slowmode`コマンドを使用することで、三秒などに設定することが可能です。
- 製品版のRTを買う。
