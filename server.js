var express = require('express');
var app = express();
var cors = require('cors');
var sortJsonArray = require('sort-json-array');
app.use(cors());


const fs = require("fs");

app.get('/api/partners_in_range', function (req, res) {
   result=sortJsonArray(getPartnersbyDistance(req.query.range,req.query.lat,req.query.lng,app.locals.partners),'organization','asc');
   res.setHeader('Content-Type', 'application/json');
   res.send(JSON.stringify(result));
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   app.locals.partners=readPartners_2();
   console.log("partner in range app api listening at http://%s:%s", host, port)

})

function getPartnersbyDistance(distance,myLat,myLng,partnerList)
{
  var result=[];
  for(var i=0;i<partnerList.length;i++)
  {
    for(var j=0;j<partnerList[i].offices.length;j++)
    {
      coordinates=partnerList[i].offices[j].coordinates.split(",");
      pLat=parseFloat(coordinates[0]);
      pLng=parseFloat(coordinates[1]);
      partnerDistance=getDistanceFromLatLonInKm(myLat,myLng,pLat,pLng)
      if(partnerDistance<=distance)
      {
        result.push({
            id:partnerList[i].id,
            urlName:partnerList[i].urlName,
            organization:partnerList[i].organization,
            customerLocations:partnerList[i].customerLocations,
            willWorkRemotely:partnerList[i].willWorkRemotely,
            website:partnerList[i].website,
            services:partnerList[i].services,
            distance:Math.round(partnerDistance * 100) / 100,
            location:partnerList[i].offices[j].location,
            address:partnerList[i].offices[j].address,
            coordinates:partnerList[i].offices[j].coordinates,
            lat:parseFloat(partnerList[i].offices[j].coordinates.split(",")[0]),
            lng:parseFloat(partnerList[i].offices[j].coordinates.split(",")[1])
          }
        );
      }
    }

  }
  return result;
}

function readPartners()
{
  var partner_json;
  console.log("reading json");
  fs.readFile("./partners.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    partner_json= JSON.parse("[]");
    return;
  }
  try {
    partner_json = JSON.parse(jsonString);
    console.log(partner_json);
    return ;
  } catch (err) {
    console.log("Error parsing JSON string:", err);
    partner_json= JSON.parse("[]");
  }
});
}

function readPartners_2()
{
  try {
  const jsonString = fs.readFileSync("./partners.json");
  partner_list = JSON.parse(jsonString);
} catch (err) {
  console.log(err);
  partner_list = JSON.parse("[]");;
}
return partner_list;
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
