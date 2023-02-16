# RT新機能作成ガイド
RTで新機能を作成するときに必要になるだろうことをまとめたガイドです。  
(※注: 未完成なのと、執筆者yaakiyuもあまり新RT分かってないので間違ってる可能性があります)

## ファイルを作る
`cogs`フォルダはカテゴリ別にまとまっているので、自分の作りたい機能がどのカテゴリに入るかを考えた上でそれぞれのカテゴリにファイルを作成します。ファイル名は機能を一目で見て分かるようなものにしてください。

ここでは例として、[ログ機能](https://github.com/rext-dev/rt-bot/issues/254)を作ることにしましょう。その場合、カテゴリは`server-management`になります。ファイル名はハイフン`-`ではなくアンダースコア`_`を利用するので、`server_management`フォルダを開いて新しい`log.py`という名前のファイルを作成します。

## 基本構成を整える
ファイルを作成したら、基本的な構成を整えましょう。
```python
"RT - Log"

from discord.ext.commands import Cog
import discord

from core import Core


class Log(Cog):
    "ログ機能を実装したコグです。"

    def __init__(self, bot: Core) -> None:
        self.bot = bot


async def setup(bot: Core) -> None:
    await bot.add_cog(Log(bot))
```
基本的にはdiscord.py v2.0のスタンダードなやり方と同じですが、以下のことに注意してください。
* 一行目は`"RT - 機能名"`に
* importの順番は「桜」に従う。
* (`core.Core`はBotのオーバーライドクラスです。)
* classの直下に説明用のdocstringをつける。
* 関数の返り値の`None`の型付けをする。

この作業が終わった時点でcommitしてPRを出してもいいですが、commitする際には`contributing.md`を読みながらその規則に従ったコミットメッセージにするようにしましょう。
