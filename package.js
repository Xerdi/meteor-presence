Package.describe({
    name: 'xerdi:presence',
    version: '0.0.1',
    summary: 'Plugin for tracking user presence',
    git: 'https://github.com/Xerdi/meteor-presence.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.use([
        'ecmascript@0.16.2',
        'accounts-base@2.2.4',
        'mizzao:user-status@1.0.1',
        'xerdi:logging@0.0.3'
    ]);
    api.mainModule('client.js', 'client');
    api.mainModule('server.js', 'server');
});
