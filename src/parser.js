const fs = require('fs');
const path = require('path');
const { parse } = require('csv');

module.exports = {
    watched: null,
    output: null,
    processed: null,
    setWatched: function (watch) {
        this.watched = watch;
    },
    setOutput: function (out) {
        this.output = out;
    },
    setProcessed: function (proc) {
        this.processed = proc;
    },
    processChange: function (file) {
        // Output JSON file
        const outputFile = path.resolve(this.output, path.basename(file).replace('.csv', '.json'));
        console.info();
        console.info("Output file will be " + outputFile);
        console.info();
        // Inputted CSV File
        const processedFile = path.resolve(this.processed, path.basename(file));
        console.info();
        console.info("Processed file will be " + processedFile);
        console.info();
        let rows = [];

        fs.createReadStream(file)
            .pipe(parse({
                columns: true,
                trim: true
            }))
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {

                // Rename was breaking when trying to perform operation in container
                // Switched to CopyFileSync and got rid of callback
                // Switched to try catch because no callback for copyfilesync
                try {
                    fs.copyFileSync(file, processedFile);
                }
                catch (err) {
                    console.info();
                    console.error("There was an error copying the file: " + err);
                    console.info();
                    return;
                }



                // Write the JSON File
                fs.writeFile(outputFile, JSON.stringify(rows, null, 2), (err) => {
                    if (err) {
                        console.info();
                        console.error("There was an error when writing to the file: " + file + " : " + err);
                        console.info();
                        return;
                    }

                    console.info('\x1b[38;2;0;0;170m%s\x1b[0m', `Parsed ${file}`);
                });
            })
            .on('error', (err) => {
                console.info();
                console.error("There was an error when parsing the file: " + file + " : " + err);
                console.info();
                return new Error("Unparsable File");
            });
    }
};