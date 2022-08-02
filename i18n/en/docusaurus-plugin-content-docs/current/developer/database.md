- - -
sidebar_position: 2
- - -

# DatabaseManager
RTでは、データベース(mysql)を簡単に操作するためのものである`DatabaseManager`が提供されています。  
それの使用方法についてここに書き留めます。  
`rtlib`(rt-libリポジトリのもの)にある`DatabaseManager`を使用することで、簡単にデータベースを操作することができます。 これは、継承して使用してください。  
ですが、`fetchstep`(後述)は、継承しないで使用が可能です。

## importする
### 通常
```python
from rtlib.common.database import DatabaseManager, cursor
```
### rt-botリポジトリ
rt-libに`DatabaseManager`はありますが、rt-botリポジトリでは簡単にimportできるように、`core`からimportできるようにしています。  
以下のようにimportしてください。
```python
from core import DatabaseManager, cursor
```

## 作る
importした`DatabaseManager`を継承したクラスを作ります。  
そのクラスの名前は普通は`DataManager`にしてください。  
また、開発者間では、このセーブデータを管理するクラスのことをDataManagerとよく呼びます。
```python
class DataManager(DatabaseManager):
    ...
```
### コンストラクタ
まず、`DataManager.pool`にデータベースのコネクションプールのインスタンス(`aiomysql.Pool`)を代入するようにコンストラクタを実装してください。
```python
class DataManager(DatabaseManager):
    def __init__(self, pool: Pool):
        self.pool = pool
```
もし、rt-botリポジトリでDataManagerを作る場合は、`aiomysql.Pool`を受け取る引数をコンストラクタに作るのではなく、そのDataManagerを使用するコグのインスタンスを受け取るようにしてください。  
そして、コグにあるBotの参照からプールのインスタンスを代入してください。
```python
class DataManager(DatabaseManager):
    def __init__(self, cog: CogName):
        self.cog = cog
        self.pool = self.cog.bot.pool
```
### SQLを実行する
SQLを実行するコルーチン関数をクラス上に実装していきます。  
クラス上に実装したコルーチン関数内では、`aiomysql.Cursor`のインスタンスが入った変数`cursor`を使用可能です。  
それを使用して`SQL`を実行してください。
```python
class DataManager(DatabaseManager):
    def __init__(self, pool: Pool):
        self.pool = pool

    async def set_level(self, user_id: int, level: int) -> None:
        "レベルを設定します。"
        await cursor.execute(
            """INSERT INTO Level (%s, %s)
                ON DUPLICATE KEY UPDATE Level = %s;""",
            (user_id, level, level)
        )
```
実装する関数には簡単な説明をコメントしてください。
#### Notes
全関数で`cursor`を共用しているように見えますが、実は共用していません。  
最初に`DatabaseManager`をimportする際にimportした`cursor`の中身は実は`None`となっています。  
というのも、`DatabaseManager`は、継承された際に、継承したクラスに実装されているコルーチン関数に`cursor`引数を付け加えます。  
そして、その関数をラップして、自動で`aiomysql.Cursor`のインスタンスを作り、関数の`cursor`引数にそのインスタンスを渡すようにします。  
ですので、共用ではなく、一つ一つの関数が実行されるたびに、コネクションプールからコネクションを得て、そのコネクションから`aiomysql.Cursor`のインスタンスを取得しています。  
もし、関数内で、他の関数を実行したい場合は、その他の関数に`**_`と引数に付け加えて、それを実行する際に`他の関数(..., cursor=cursor)`のように`cursor`引数に`aiomysql.Cursor`のインスタンスを渡してください。  
なぜそうするかというのは、そうしなければ、既に`aiomysql.Cursor`のインスタンスがあるのに、もう一つのコネクションと`aiomysql.Cursor`のインスタンスを余計に取得してしまうからです。

### テーブルを作る関数について
SQLをデータを書き込むために実行する前に、同然ながらテーブルがデータベースに存在する状態にする必要があります。  
なので、そのテーブルを作る関数をDataManagerに実装して、それが起動時に実行されるようにしなければなりません。  
そのテーブルを作る関数の名前は大抵は`prepare_table`としてください。  
また、SQLは以下のようにすれば良いです。
```sql
CREATE TABLE IF NOT EXISTS テーブル名 (コラム, ...);
```
> `IF NOT EXISTS`

を置くことで、存在しない場合のみテーブルを作るように実行することができます。
#### rt-botリポジトリの場合
rt-botのプログラムで`prepare_table`を起動時に実行するようにする場合は、コグの`cog_load`メソッドから実行するようにしてください。

### SQLを実行しないコルーチン関数
SQLを実行しないコルーチン関数を作る場合は、`DatabaseManager.ignore`というデコレータを必ず付けてください。  
つけなければ、使用しないコネクション等を実行の度に作ってしまうからです。

### `fetchstep`静的メソッド
DataManagerには`fetchstep`という静的メソッドが実装されています。  
`aiomysql.Cursor`には`fetchall`というSQLで検索した結果を全て一度に取得するメソッドがありますが、もしテーブル内の全てのデータを取得しようと思っている場合は、全てを__一度で__取得するので、データが大量の場合はメモリがパンクしてしまう可能性があります。  
そうならないように大量のデータを取得するためのものがこれです。  
この関数は、指定されたSQLで検索したデータを(デフォルトでは)五十個づつ取得していく非同期イテレータ関数で、もし全てのデータのような大量のデータを扱いたい場合は、この関数を使用してください。  
例：
```python
async def update_caches(self) -> None:
    "キャッシュを更新する。"
    async for row in self.fetchstep(cursor, "SELECT * FROM Table;"):
        self.caches[row[0]] = row[1:]
```

### rt-botリポジトリ限定
rt-botリポジトリ限定でDataManagerに実装すべき関数や考慮すべきことがあります。  
それは、`update_caches`と`clean`です。  
それについてをここに書きます。
#### DataManagerのインスタンスを置く場所
コグの`data`という名前の属性に代入してください。
#### DataManagerでCacherを使う場合の変数名
DataManagerでセーブデータのキャッシュを保存するために`rtlib.common.cacher.Cacher`を使用したキャッシュを作る場合は、そのCacherを入れた属性の名前の最後に`caches`となるようにしてください。  
もし、複数のCacherを使う場合は、標準ライブラリのdataclassesの`dataclass`を使用して作ったデータクラスにCacherを格納して、そのデータクラスのインスタンスをDataManagerの`caches`という名前の属性に代入してください。
#### `clean`関数
これは、Bot(シャード)が起動完了している状態、かつ動いている全てのシャードのクライアントの中で自分が一番非同期タスクが少ないシャードとなっている場合にのみ、定期的に呼び出されます。  
この関数には、存在すべきではないデータを消すプログラムを実装してください。  
つまり、死神を実装してください。  
例えば、RTが参加していないサーバーのデータは存在すべきではありません。  
そういったデータを消すプログラムを実装してください。
##### 存在しているかチェックをする
Botのインスタンスには`exists`という存在しているかをチェックするための関数が実装されています。  
必ずこれで存在しているかをチェックしてください。  
`.get_guild`等で存在していないかをチェックするなどは絶対にやめてください。  
`.exists`は全てのシャードで`.get_...`を実行して、全てのシャードにおいて`None`が返された場合に`False`を返します。  
対して、`.get_guild`等の場合は、シャード分散している場合に、自分が担当していないサーバーを渡した時に`None`を返してしまいます。  
それでは、他のシャードが担当しているのに、既に死んだデータと判断してしまいます。  
これは、死神失格です。
##### `core.RT.clean`関数
RTのBotのインスタンスには`clean`という便利な関数が実装されています。  
これは指定されたテーブルの指定されたコラムの全データを検索して、消すべきデータは自動で消すようにプログラムしたものです。  
大抵は、これで存在しないものの削除のプログラムが済むと思います。
##### `core.RT.censor`関数
これは、製品版ではないサーバーのデータの量を規制する関数です。  
例えば、無料版では二個、製品版では四個設定できる機能をとあるサーバーが使ったとします。  
そのサーバーは元々製品版を使用していましたが、金を払わなくなって無料版に格下げしました。  
となると、そのサーバーが使っていた機能の設定数は二個までにしなければなりません。  
ですが、元々製品版を使っていたので、四個機能が設定されている可能性があります。  
もし四個設定されている場合は、他の無料ユーザーと比べて二個多く設定していることになります。  
これはよくないです。  
その場合は多い分(二個)のデータを消す必要があります。  
これを簡単にするための関数がこれです。  
指定したテーブルにあるデータで、指定された無料版での設定上限の数をオーバーしているデータを消します。
#### `update_caches`関数
これは、キャッシュを作る(`rtlib.common.cacher.Cacher`を除く)DataManagerに実装するべき関数です。  
`clean`関数の実行後に呼び出されます。  
これが実行された時は、作ったキャッシュをリセットする作業をしてください。  
`clean`関数によって削除されたキャッシュを完全に削除するためです。