import {Accounts} from "meteor/accounts-base";
import {UserStatus} from "meteor/mizzao:user-status";
import {log} from 'meteor/xerdi:logging';

class PresencePrototype {

    _jobId = undefined;
    _status;

    constructor() {
        this._status = UserStatus.isMonitoring() ? 'active' : 'inactive';
    }

    get status() {
        return this._status;
    }

    start() {
        log.info('starting presence');
        const self = this;
        if (this._status === 'inactive') {
            this._status = 'starting';
            this._jobId = Meteor.setInterval(function () {
                if (self._status === 'starting') {
                    if (UserStatus.isMonitoring()) {
                        log.warn('already monitoring user');
                        self._status = 'active';
                        Meteor.clearInterval(self._jobId);
                    } else {
                        try {
                            UserStatus.startMonitor();
                            log.info('presence started');
                            self._status = 'active';
                            Meteor.clearInterval(self._jobId);
                        } catch (err) {
                            log.warn('Failed to start monitor', err);
                        }
                    }
                } else {
                    log.info('presence startup aborted');
                    Meteor.clearInterval(self._jobId);
                }
            }, 500);
        }
    }

    stop() {
        log.info('stopping presence');
        if (UserStatus.isMonitoring()) {
            UserStatus.stopMonitor();
            log.info('presence stopped');
        } else {
            log.warn('already stopped monitoring user');
        }
        this._status = 'inactive';
    }

}

export const Presence = new PresencePrototype();

Accounts.onLogin(function (user) {
    if (user) {
        Presence.start();
    } else {
        log.warn('no user object was found after login');
    }
});

Accounts.onLogout(function () {
    Presence.stop();
});
