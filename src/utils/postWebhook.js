const request = require('request');
const message = process.argv[2];

const postWebhook = (message, callback) => {
    const url = 'https://hooks.slack.com/services/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';
    
    request.post( {
        headers: 'Content-type: application/json',
        url: url,
        body: {
            type: 'mrkdwn',
            'text': message
            },
        json: true
        }, 
        (error, response) => {
        if (error) {
            callback('Unable to reach webhook services', undefined);
        } else {
            callback(undefined, response);
        }
    });
};


// postWebhook(message, (error, data) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Done');
// })

module.exports = postWebhook;

// var request = require('request');
// request.post({
//   headers: {'content-type' : 'application/x-www-form-urlencoded'},
//   url:     'http://localhost/test2.php',
//   body:    "mes=heydude"
// }, function(error, response, body){
//   console.log(body);
// });