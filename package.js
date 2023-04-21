Package.describe({
    name: 'xerdi:presence',
    version: '0.0.2',
    summary: 'Plugin for tracking user presence',
    git: 'https://github.com/Xerdi/meteor-presence.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('2.11.0');
    api.use([
        'ecmascript',
        'accounts-base',
        'mizzao:user-status@1.0.1',
        'xerdi:logging@0.0.4'
    ]);
    api.mainModule('client.js', 'client');
    api.mainModule('server.js', 'server');
});
