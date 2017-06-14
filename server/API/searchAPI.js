import { checkStatus } from '../helper/helper.js';
import fetch from 'node-fetch';

export default function attachSearchAPI(app) {
    app.get('/api/search', function(req, res) {
        var searchTag = encodeURIComponent(req.param('param'));
        var url = `https://swapi.co/api/planets?search=${searchTag}`;
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
                    data.results.length > 0) {
                    res.send({
                        status: {
                            code: 1000,
                            message: 'Search is Complete.',
                        },
                        data: data.results,
                    });
                    return;
                }
                res.send({
                    status: {
                        code: 2000,
                        message: 'No result.',
                    },
                    data: null,
                });
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
