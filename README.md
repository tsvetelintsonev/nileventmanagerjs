# nileventmanagerjs
Provides simple to use API for managing custom js events.

Install
---
```npm i nileventmanagerjs ```

Examples
---

Adding event listener:
```javascript
var em, handler;
    
    em = new NileventManager();
    
    myHandler = function() { console.log("handing myCustomEvent") };
    
    em.on("myCustomEvent", myHandler);
```

Removing event listener:
```javascript
    em.off("myCustomEvent", myHandler);
```

Firing the event:
```javascript
    em.fire("myCustomEvent");
    
    or
    
    em.fire("myCustomEvent", eventSource);
    
    or
    
    em.fire("myCustomEvent", eventSource, anotherParam);
    
    ...
    
```

"Eventifying" other objects:
```javascript
    function User() {
        username: "jj"
    };
    
    var user = new User();
    
    em.eventify(user);
    
    user.on("usernameChanged", userpanel.updateUsername);
    
    user.username = "jk";
    
    user.fire("usernameChanged");
```
