---
sidebar_position: 1
---

# Contributing Rules
## Writing Style
Please follow the fundamentals of [this coding style](https://gist.github.com/tasuren/bf1fcce48f1e23a5c7e6abd503bdb3c1) established by tasuren.  
The current RT code is almost entirely written following this style.

## Type Checker
RT uses [pyright](https://pypi.org/project/pyright/).  
Use pyright's type detection (in basic mode) for type checking and make sure there are no type errors.

## Commit Messages
Start with a verb that indicates the kind of change being requested and follow it with the details of the request. Example: `fix: <specific issue>`.  
The following verbs are commonly used:
```
fix
improve
update
```
Please end your commit message with a full stop (period).  
Example：`improve: Deleted unecessary import.`

## SQL Writing Style
Use uppercase letters.  
Make sure you put `;` at the end.  
Use UpperCamelCase for table names and column names.