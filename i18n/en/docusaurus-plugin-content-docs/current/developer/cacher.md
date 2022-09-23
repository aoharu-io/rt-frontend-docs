---
sidebar_position: 3
---

# Cacher
Cacher is a class of cache equipped with an expiration time and that functions similarly to a dictionary.  
You must use `rtlib.common.cacher.CacherPool.acquire` in order to obtain Cacher.  
Note that `CacherPool` will be an instance of Bot for rt-bot or an instance of `sanic.Sanic.ctx` for rt-backend, and it will be assigned to the attribute named `cachers`. Its operations are just like a dictionary's.  
For details on how to use the function `CacherPool.acquire`, which is used to obtain Cacher, please refer to its documentation.

## Syntax
You can use the syntax `Cacher[key, value]` for Cacher, just like you would with a dictionary.

## Changing the value expiration time
You can set the expiration time with either `Cacher.update_deadline` or `Cacher.set_deadline`