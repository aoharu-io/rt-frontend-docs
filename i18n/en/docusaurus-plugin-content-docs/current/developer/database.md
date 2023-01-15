- - -
sidebar_position: 2
- - -

# DatabaseManager
RT includes `DatabaseManager`, a tool for easily managing MySQL databases.  
The specifics of how to use DatabaseManager are detailed below.  
By inheriting the `DatabaseManager` class located in the `rtlib` repository, you'll be able to easily manage databases.  
However, `fetchstep` (explained later) does not require inheritance to use it.

## Importing
### Usual process
```python
from rtlib.common.database import DatabaseManager, cursor
```
### rt-bot Repository
Although `DatabaseManager` is included in rt-lib, you can also easily import it from `core` while working in the rt-bot repository.  
You can import it like this:
```python
from core import DatabaseManager, cursor
```

## Creating the class
Create a class that inherits the imported `DatabaseManager`.  
You should name that class `DataManager`.  
Among developers, these classes that manage saved data are often called DataManager.
```python
class DataManager(DatabaseManager):
    ...
```
### Constructor
First, create the constructor by assigning a database connection pool instance (`aiomysql.Pool`) to `DataManager.pool`.
```python
class DataManager(DatabaseManager):
    def __init__(self, pool: Pool):
        self.pool = pool
```
If you are creating a DataManager in the rt-bot repository, do not pass `aiomysql.Pool` as one of the constructor's arguments. Instead, assign it to the Cog instance used by DataManager.  
Specifically, assign it as the pool instance within the Bot reference in Cog.
```python
class DataManager(DatabaseManager):
    def __init__(self, cog: CogName):
        self.cog = cog
        self.pool = self.cog.connection.pool
```
### Executing SQL queries
Coroutine functions for executing SQL queries are implemented within the class.  
Among the coroutine functions implemented in the class is an instance of `aiomysql.Cursor`, which is accessible through the variable `cursor`.  
Use that cursor to execute `SQL` queries.
```python
class DataManager(DatabaseManager):
    def __init__(self, pool: Pool):
        self.pool = pool

    async def set_level(self, user_id: int, level: int) -> None:
        "Set the level."
        await cursor.execute(
            """INSERT INTO Level (%s, %s)
                ON DUPLICATE KEY UPDATE Level = %s;""",
            (user_id, level, level)
        )
```
Please leave a simple explanation in any functions you implement.
#### Notes
Although it seems as if all functions share the same `cursor`, that is not the case.  
Initially, when `DatabaseManager` is imported, the content of `cursor` is actually `None`.  
The class that inherits `DatabaseManager` obtains a `cursor` as an argument of various coroutine functions implemented by said class.  
These functions are called through wrappers and, when called, an instance of `aiomysql.Cursor` is automatically created and passed to them in the `cursor` argument.  
This means cursors are never shared. Every time these functions are called, they get a connection from the connection pool and then obtain a new `aiomysql.Cursor` instance from said pool.  
If you want to call another function inside one of these functions, you should add `**_` to the parameters of that other function's definition. Then, when calling that other function, you should pass the `aiomysql.Cursor` instance in the `cursor` parameter like this: `other_function(..., cursor=cursor)`.  
This is good practice because otherwise another database connection will be made and a new `aiomysql.Cursor` instance will be created even though an `aiomysql.Cursor` already exists.

### About functions for creating tables
Before executing SQL queries that insert data into the database, the database must first contain some tables where the data will be written to.  
Therefore, a function for creating tables must be implemented in DataManager and executed before any other queries.  
Such functions are often named `prepare_table`. Please follow that convention.  
The SQL query for creating a table looks like this:
```sql
CREATE TABLE IF NOT EXISTS table_name(column, ...);
```
> `By adding "IF NOT EXISTS",`

the query will only be executed if the table to be created does not already exist.
#### If you're using the rt-bot repository
If you want to call `prepare_table` in the startup of an rt-bot program, please call it from Cog's `cog_load` method.

### Coroutine functions that do not execute SQL queries
To create a function that will not execute SQL queries, you must use the `DatabaseManager.ignore` decorator for them.  
Otherwise, every time the function is called, a database connection and other database elements will be needlessly created.

### The static method `fetchstep`
DataManager includes a static method called `fetchstep`.  
`aiomysql.Cursor` contains the method `fetchall`, which returns all the rows that match an SQL query. However, if the given query would result in fetching all of the rows in a table, all these data will be fetched __at once__, and the sheer size of these data could overwhelm the system's memory.  
fetchstep is a method designed for retrieving large amounts of data without overwheming the system's memory.  
This method iterates asynchronously through the rows returned by an SQL query and returns them in groups of 50 (by default). Use this method for executing SQL queries that have the potential for returning large amounts of data.  
Example：
```python
async def update_caches(self) -> None:
    "Update cache."
    async for row in self.fetchstep(cursor, "SELECT * FROM Table;"):
        self.caches[row[0]] = row[1:]
```

### rt-bot repository restrictions
When working with the rt-bot repository, there are some functions that must be implemented in DataManager and some considerations that must be taken into account.  
Specifically, `update_caches` and `clean` must be handled.  
We will discuss these in this section.
#### Where to store the DataManager instance
You must assign it to Cog's `data` property.
#### Variable names when using Cacher with DataManager
When creating a cache using `rtlib.common.cacher.Cacher` to keep a save data cache in DataManager, the name of the variable that stores that Cacher must end `caches`.  
If you are using multiple Cacher instances, you must store them in a `dataclass` instance (using the standard library's dataclasses module). You must then assign that dataclass instance to DataManager's `caches` property.
#### The `clean` function
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