---
sidebar_position: 6
---

# Rate Limit
The free version of RT has something called a rate limit.  
これは、RTに負荷がかからないようにするための制限のことです。  
For example, if a large number of messages are sent in a short period of time, RT will stop accepting commands and receiving messages from that server.  
That is rate limit.
## Conditions for Occurrence
Currently, the rate limit is reached when the pace of four messages per second continues for about eight seconds.  
This would be a rate limitation if the server is active, with multiple people talking at any given time, or if it has been trolled by raid. Other factors such as a large number of users joining the server in a short period of time can also result in a rate limit.
## Examples of countermeasures
- 荒らされないようにRTの認証を適切に設定する。
- Set the channel to low-speed mode.
  - Discordのアプリでは五秒づつでしか設定できませんが、RTの`slowmode`コマンドを使用することで、三秒などに設定することが可能です。
- Buy the product version.
