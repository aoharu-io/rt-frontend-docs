# データベース関連

# SQL

必ず最後に`;`を入れてください。

## テーブル命名規則

基本はパスカルケースでお願いします。

`CREATE TABLE `の後に`IF NOT EXISTS `を必ず入れてください。

例:
```sql
CREATE TABLE IF NOT EXISTS GlobalChat
```

## カラム命名規則

テーブル命名規則と同じようにパスカルケースでお願いします。

## DatabaseManager

### はじめに

これは`DatabaseManager`を継承して使ってください。

必ずimport文に

```py
from core import cursor
```

っと入れてください。こうすることによって型チェックが通り抜けれます。

Sample:

```py
from core import DatabaseManager, cursor, RT


class DataManager(DatabaseManager):
    def __init__(self, bot: RT):
        self.pool = bot.pool
```

### 関数

自動的に`cursor`引数が挿入されます。なので要りませんが、
もしも関数内で同クラス内での関数を使用するときは`**_`とやると型チェックが楽になります。

Sample:

```py
from core import cursor

async def get_user(self, user_id: int):
    await cursor.execute(...)
```
    
### テーブル作成

Cogのロード時に実行される`cog_load`関数を使ってテーブル作成を実行してください。

そして作成する際に使う関数は`prepare_table`という名前でお願いします。

Sample:

```py
class DataManager(DatabaseManager):
    # 以下略
    async def prepare_table(self):
        await cursor.execute("CREATE TABLE Admin(userid BIGINT);")
        
class Admin(Cog):
    # 以下略
    async def cog_load(self):
        await self.data.prepare_table()
```
