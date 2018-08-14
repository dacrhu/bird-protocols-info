# bird-protocols-info
Parser for protocols information of Bird internet routing dameon.
Tested with BIRD 1.6.3.

### Require sudo
The BIRD usually run as root. If you run your application with other user (very recommended) then you must add this line to sudoers:

```
username ALL=(ALL) NOPASSWD: /usr/sbin/birdc show protocols all
```

### How to use it?
It is a very simple module, so usage is easy:

```
var protocols = require('bird-protocols-info');

protocols(function(data) {
    console.log(data);
});
```

That is all.

### Plans
I'll fix it to be able to switch between IPv4 and IPv6.
