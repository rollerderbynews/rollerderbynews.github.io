// The client ID is obtained from the Google Developers Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var API_KEY = 'AIzaSyACB6D2xbwa9cWjpXM03BLNeitaPjk7VvU';



function initializeGapi() {
    gapi.client.setApiKey(API_KEY); // client API_KEY variable for client
    gapi.client.load('youtube', 'v3', 
        function() { 
            console.log('Youtube API loaded.');
            search();
        }
    );
}
