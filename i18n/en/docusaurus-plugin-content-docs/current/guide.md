---
sidebar_position: 2
---

# User Guide
The procedure for installing and operating RT is described here.

## Putting RT into the server
Nothing can start without first putting RT on the server.  
You can select a server when you open [this link](https://app.dissoku.net/api/bots/716496407212589087/invite) and put RT on that server.

### Select the server
![image](/img/invite/1.jpg)

### Push "Authorize"
![image2](/img/invite/2.jpg)

### Do authorization
![image2](/img/invite/3.jpg)

### Successfully
You added RT to server.

## How to operate RT
### Definition
In Discord, the word "command" is frequently used regardless of RT.  
This refers to the string used to operate the Bot.  
As the name implies, "command" is used to command the Bot.
### Slash Command
The slash command is a way to control the bot, which is provided by Discord officials.  
For example, type `/ping` in a text channel.  
Then you will probably see an RT icon and an option that says `/ping`.  
(If it does not appear, the Internet is slow or there is some kind of bug.)  
Let's send a message by pressing the item that comes up with that `/ping`.  
Then RT should reply to you.  
Thus, to instruct RT to do something, it is usually necessary to send a command (instruction) in a written message.
### Message Command
The message command is very similar to the slash command.  
This is an unofficial, non-slash official Discord bot instruction method.  
Unlike slash, a normal message is sent and the RT sees the contents of the message and executes the command.  
For example, to execute a `ping` command executed when a slash command is used, it would look like this:
> `rt!ping`

The `/` in `/ping` just became `rt!`.  
This method has been around for a long time, and there are probably still bots outside of RT that operate in this manner.  
In the case of slash commands, there is a function called completion that displays commands similar to the characters you have typed in the middle of the command.  
So, in most cases, the slash command is easier to operate.  
Incidentally, in this example, `rt!` is first, but there are also `Rt!` and `Ritsu!`, etc. can also be used.
### コマンドの存在を知る方法
といっても、何のコマンドがどんなことをするのかわからないと、RTを操ることはできません。  
もちろん、それを教えるための取扱説明書なるものが存在します。  
それはヘルプコマンドというものです。  
`/help`(または`rt!help`)と実行してみてください。  
すると、選択ボックスが二つついたメッセージをRTが送信します。  
この選択ボックスでカテゴリーとコマンドを選択することで、コマンドの説明(使用方法)を見ることができます。  
二つの選択ボックスのうち上にあるのが、コマンドの種類を表すカテゴリーの選択ボックスです。  
下にある選択ボックスが、そのカテゴリーに分類されているコマンドの選択ボックスとなります。  
試しに、先ほどから実行している`ping`コマンドを見てみましょう。  
`ping`コマンドはRTカテゴリーに分類されるので、上の選択ボックスからRTを探してRTを選択してみましょう。  
すると、メッセージが編集されてたくさん文章が出てきたと思います。  
出てきた文章は今選択したRTカテゴリーにあるコマンドの一覧です。  
そこに一覧されているコマンドを下の選択ボックスから選択します。  
そのコマンド一覧に`ping`があるはずです。  
下の選択ボックスから`ping`を選択してみましょう。  
すると、一覧が消えて短い文章がでてきたはずです。  
それが`ping`コマンドのヘルプ(説明)です。  
他のコマンドも同じようにして説明を閲覧することができます。

## コマンドの引数
引数というのはコマンド(命令)に入れる追加情報です。  
例えば、RTに「あなたが嫌いなの」または「あなたが好きなの。(NYN姉貴風)」と言わせるためのコマンド`/love`があるとします。  
あなたはRTに「あなたが好きなの」と言わせたいと思い、その言わせるコマンドを実行しようとするとします。  
ですが、その言わせるコマンドは好きではなく嫌いと言わせることもできます。  
あなたは同然嫌いとは言われたくありません。  
なので、RTにして欲しいことを伝える必要があります。  
もちろん、そのコマンドではそれを伝えることができます。  
そういったものが引数で用意されています。  
今回の場合はコマンドの後ろに好きか嫌いをつければいいようです。  
そして、あなたは`/love 好き`と実行して、無事好きと言われました！  
先ほど説明したヘルプコマンドの`/help`も、同じように引数を受け取ることができます。  
その引数に渡すことができる値(もの)はコマンドの名前か検索ワードです。  
例えば、先ほどから実行しまくっている`/ping`コマンドのヘルプを、`/help`の引数を使って選択ボックスを用いずにみてみましょう。  
勘のいい人はもうわかると思います。  
この場合は`/help ping`を実行することでできます。  
RTにヘルプコマンド(助けてくれ命令)に引数(追加情報)として`ping`を付け加えています。  
ここで注意ですが、瞬時に`/help ping`とは入力しないでください。  
コマンドを入力すると引数の選択肢がでてくるので(`/help`の場合は`word`)、それを押してから引数の内容(ここでは`ping`)を入力してください。 実行すると、`ping`のヘルプが出てきたと思います。
### 引数の説明の見方
ヘルプでの引数の見方をここでは説明していきます。  
ヘルプコマンドのヘルプを例としてここでは解説するので、`/help help`でヘルプコマンドのヘルプを表示してください。

![<code>/help help</code>と実行した結果の画像](/img/help_help.png)

まず
> **#** 使い方

という見出しの項目を見てください。
> メッセージ: `rt!help [word=None]`  
> スラッシュ: `/help [word=None]`

と書かれていますね。  
`[]`でかか壊れている部分が引数となります。  
`=`の左にあるのが引数の名前で、右にあるのがデフォルトの値です。  
デフォルトの値というのは、引数が未入力の時に代わりに渡される値です。  
今回のデフォルトの値は`None`(空という意味)になっています。  
ヘルプコマンドは引数を指定しない`/help`だけでも動くようになっているので、デフォルト値が`None`(空)なのは納得ですね。  
そして、その下には引数の説明がかかれています。
> word : 文字列, オプション  
> 　　検索ワードまたはコマンド名

ヘルプコマンドの場合は上記のように書かれています。  
先ほどの引数`word`の説明が書かれてますね。  
はい、RTのヘルプではコマンドと引数の名前を並べたものと、その引数の名前に対応するものを下に書き、それの説明を記載します。  
その引数の説明の書き方は以下のように書かれます。
```
引数名 : 引数が取る値の種類, (オプション(省略可能)かどうか)
    引数の説明
```
ヘルプの説明の詳細については[こちら](reference/help)をご覧ください。

## コンテキストメニュー
コンテキストメニューとは、メッセージをPCのDiscordでは右クリック、スマホやタブレットでは長押しした際にでるメニューのことです。  
ユーザーにも右クリック(スマホやタブレットではタッチ)で、メニューがでてきます。  
RTは、これで選択したメッセージやユーザーに対してなにかしらできるようになっています。  
RTの項目はコンテキストメニューの「アプリ」というところにあります。  
例えば、メッセージのコンテキストメニューのアプリと言う欄に、RTのアイコンと`Translate`というものがあるはずです。  
英語のメッセージを選択して、この`Translate`を押してみてください。  
すると、選択したメッセージが翻訳されます。  
このように選択したメッセージまたはユーザーに対して何かしらのアクションを行う機能がコンテキストメニューです。  
ヘルプでは、コンテキストメニューの〇〇のように書かれると思います。  
また、Discordではこのコンテキストメニューは最大五つまでしか登録できないようになっています。  
そのため、五つ以上登録できるように、`Other`と言う選択肢を作りました。  
この選択肢を押すと、登録しきれなかったコンテキストメニューを選択するように要求されます。  
もし、コンテキストメニューにないのに、ヘルプにはコンテキストメニューにあると書かれている場合は、この`Other`を押してみてください。  
ちなみに、`Other`と言う単語はその他という意味です。