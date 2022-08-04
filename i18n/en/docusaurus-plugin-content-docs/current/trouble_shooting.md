---
sidebar_position: 4
---

# Trouble Shooting
## Role-based functions fail
There may be times when roles cannot be granted due to captcha, role panel, etc.  
It could be due to the following.

### RT can't find the role.
Let's reconfigure it.
### RT has no permissions.
In this case, there are two possible causes.
#### RT doesn't have the permissions to grant roles.
Make sure that any one of the roles that RT has comes with permissions to manage the role.
#### The position of the role to be granted is above any role owned by the RT.
In this case, the role should be positioned below the role that RT has.