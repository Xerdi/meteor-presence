# Meteor Presence

A simple wrapper for the [user-status](https://github.com/Meteor-Community-Packages/meteor-user-status) package.

## Installation

Add the package to your project:
```shell
meteor add xerdi:presence
```

## Usage
The service is automatically started on login and stopped on logout.

### Client Side Functions
It can be started/stopped manually and there is a way to get the status of the service:
```javascript
import {Presence} from 'meteor/xerdi:presence';
import log from 'meteor/xerdi:logging';

log.info(`Presence status ${Presence.status()}`);

Presence.start();
// OR
Presence.stop();
```

### Schema Definition
In order for the service to work the user needs an additional schema.
```javascript
import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";

const UsersStatusSchema = new SimpleSchema({
    lastLogin: {
        type: Object,
        optional: true,
    },
    'lastLogin.date': {
        type: Date,
        optional: true,
    },
    'lastLogin.ipAddr': {
        type: String,
        optional: true,
    },
    'lastLogin.userAgent': {
        type: String,
        optional: true,
    },
    'idle': {
        type: Boolean,
        optional: true,
    },
    'lastActivity': {
        type: Date,
        optional: true,
    },
    'online': {
        type: Boolean,
        optional: true,
    },
});
Meteor.users.schema = new SimpleSchema({
    // ... other fields
    status: {
        type: UsersStatusSchema,
        optional: true
    }
});
Meteor.users.attachSchema(Meteor.users.schema);
```
