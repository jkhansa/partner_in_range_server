var expect  = require('chai').expect;
var request = require('request');

const hostname = 'http://localhost';
const server_port = 8081;
const client_port = 3000;

describe ('Testing Application', function() {
    describe ('Test partner Search', function() {
        it('Get Partners in range of 10KM', function(done) {
            request(hostname+':'+server_port+'/api/partners_in_range?range=10&lat=51.5144636&lng=-0.142571' , function(error, response, body) {
                expected_response = [
    {
        "id": 4,
        "urlName": "blue-square-360",
        "organization": "Blue Square 360",
        "customerLocations": "globally",
        "willWorkRemotely": true,
        "website": "http://www.bluesquare360.com/",
        "services": "Blue Square 360 provides a professionally managed service covering all areas of a 360Â° Feedback initiative. We're experienced in supporting projects of all sizes, and always deliver a personal service that provides the level of support you need to ensure your 360 initiative delivers results for the business.",
        "distance": 5.14,
        "location": "London, UK",
        "address": "St Saviours Wharf, London SE1 2BE",
        "coordinates": "51.5014767,-0.0713608999999451",
        "lat": 51.5014767,
        "lng": -0.0713608999999451
    },
    {
        "id": 13,
        "urlName": "gallus-consulting",
        "organization": "Gallus Consulting",
        "customerLocations": "across the UK",
        "willWorkRemotely": true,
        "website": "http://www.gallusconsulting.com/",
        "services": "We're strategy consultants with a difference - we work with organisations and their leaders to take them from strategy to reality. In our work with leaders we often use 360-degree feedback to identify capability gaps, improve self-awareness, and develop strategic and cultural alignment. Our aim is for believe-able leaders to emerge with the drive, capability and cultural fit to take strategy to reality.",
        "distance": 3.81,
        "location": "London",
        "address": "No1 Royal Exchange, London, EC3V 3DG",
        "coordinates": "51.5136102,-0.08757919999993646",
        "lat": 51.5136102,
        "lng": -0.08757919999993646
    }
];
                expected_response_string = JSON.stringify(expected_response);

                expect(body).to.equal(expected_response_string);
                done();
            });
        });
    });



    describe ('Testing Response Code', function() {
    it('Client Response code 200', function(done) {
        request(hostname+':'+client_port , function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    });

});
