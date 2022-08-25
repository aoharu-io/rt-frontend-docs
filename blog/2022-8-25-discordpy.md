---
title: 現在開発中の機能
description: 現在開発中の機能について
slug: about
authors: tuna2134
tags: [discord.py]
---

# 猿でもわかるbotの作り方

## 概要

猿でもわかるようにbotを作っていこうと思います。

## import部分

```python
import discord
from discord import app_commands
```

## クライアントとインテンツの定義

```python
# intents全てをデフォルト化
intents = discord.Intents.default()
## intentsのタイピングを無効
intents.typing = False

# client
client = discord.Client(intents=intents)
```

## アプリケーションコマンドを作成するための部分

```python
tree = app_commands.CommandTree(client)
```

## アプリケーションコマンド作成

```python
@tree.command(description="Pingコマンドだよ。")
async def ping(interaction):
    await interaction.response.send_message("Pong!")
```

## 起動した際のイベント

```python
@client.event
async def on_ready():
    await tree.sync()
    print("起動しました")
```

## 実行

```python
client.run("<TOKEN>")
```

## 最後に

何か間違っていることがあれば、コメントお願いします。
