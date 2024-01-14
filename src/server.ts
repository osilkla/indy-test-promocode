
import config from './config.js';
import server from './server/index.js';

server.listen(config.port);
console.debug('Serveur listen to port ' + config.port);

server.on('error', (error) => {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);
});