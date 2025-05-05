const parser = require('./parser');
const chokidar = require('chokidar');

const ignore = [
    '.DS_Store',
    '.Spotlight-V100',
    '.Trashes',
    'ehthumbs.db',
    'Thumbs.db'
];

module.exports = {
    watch: (watched, output, processed) => {
        parser.setWatched(watched);
        parser.setOutput(output);
        parser.setProcessed(processed);

        console.info();
        console.info('\x1b[38;2;0;0;170m%s\x1b[0m', 'Watching folder:');
        console.info(`${watched}`);
        console.info();

        // Use chokidar because fs.watch is a pile of garbage
        const watcher = chokidar.watch(watched, {
            ignored: (path, stats) => {
                return stats?.isFile() && !path.endsWith('.csv')
            },
            persistent: true
        });

        // On add a new file, log it and process the change in Parser
        watcher
            .on('add', (path) => {
                console.info();
                console.info("File was added to " + path + ", attempting to parse it.");
                parser.processChange(path);
            })
            .on('error', (err) => {
                console.info();
                console.warn("There was an error when watching the watched input folder: " + err);
                console.info();
             });
    }
};