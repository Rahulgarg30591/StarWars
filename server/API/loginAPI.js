import { checkStatus } from '../helper/helper.js';
import fetch from 'node-fetch';

export default function attachLoginAPI(app) {
    app.post('/api/login', function(req, res) {
        var userName = encodeURIComponent(req.body.userName);
        var password = req.body.password;
        var url = `https://swapi.co/api/people?search=${userName}`;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return fetch(url, options)
            .then(checkStatus)
            .then(data => data.json())
            .then(data => {
                if (data.results &&
                    data.results.length > 0 &&
                    data.results[0].birth_year === password) {
                    res.send({
                        status: {
                            code: 1000,
                            message: 'Credentials Found',
                        },
                        data: data.results[0],
                    });
                    return;
                }
                res.send({ status:
                {
                    code: 2000,
                    message: 'Credentials Not Found',
                }});
                return;
            })
            .catch((err) => {
                const errorCallbackObject = {status: {}};
                errorCallbackObject.status.code = err.message.split(' ')[0];
                errorCallbackObject.status.message = err.message;
                res.send(errorCallbackObject);
            });
    });
}
