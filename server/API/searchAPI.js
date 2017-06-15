import { fetchData } from '../helper/fetchHelper.js';

// Server Side implementation of GET API of Search with the express object.
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

        return fetchData(url, options, (data) => {
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
        },  {status: {}});
    });
}
