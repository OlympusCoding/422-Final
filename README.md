CSV To JSON Parsing Application

This application allows the user to convert CSV files to JSON

The format for the CSV file must have the headers for each column as the first row, separated by commas.
Then it must have the data starting beneath that row

To use the application:

Firstly, ensure you have Node Version 22.15.0 installed locally.
Next, open a terminal and navigate to the root of this project once you have downloaded the files. 
Next, run the command 
`docker compose up --build`
 and wait for the command to show `Starting the Document Parser` & `Watching Folder`.
The application is now running in a docker container on port 8080 on your machine.
Next, you can add your CSV files to the inbound folder on your machine, and the files will automatically be mounted to the docker container, where
they will then be converted and sent to their specific folders

The JSON file can be found in the `outbound` folder,
The CSV file can be found in the `processed` folder.
