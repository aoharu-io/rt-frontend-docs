---
sidebar_position: 3
---

# Cacher
Cacherというものは、辞書のように扱える有効期限つきのキャッシュのクラスです。  
`rtlib.common.cacher.CacherPool.acquire`を使用して取得する必要があります。  
なお、`CacherPool`は、rt-botではBotのインスタンスに、rt-backendでは`sanic.Sanic.ctx`に、`cachers`という名前の属性に代入されます。
使用方法は辞書と同じです。  
Cacherの取得に使う`CacherPool.acquire`の使用方法については、その関数のドキュメンテーションを見てください。

## 型付け
`Cacher[キー, 値]`のように辞書と同じように型付けが可能です。

## 値の有効期限の更新
`Cacher.update_deadline`か`Cacher.set_deadline`で可能です。