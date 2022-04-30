const creds = require("./client_secret.json")
const {Client} = require("@googlemaps/google-maps-services-js");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const client = new Client({});
const doc = new GoogleSpreadsheet("1xnKya_ZaYkuSOaxSKFcpK5oyMFWoJJ2CfiYAJgoPwSA")

async function gs(toIsland, toMainland){

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key:creds.private_key
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  // const sh = await doc.addSheet({
  //   headerValues:["timestamp", "origin", "destination", "duration", "distance", "toIsland", "toMainland"]
  // })
  await sheet.addRows([toIsland, toMainland])
}


async function getMapDetailsGhana({
    origin_lat,
    origin_long,
    destination_lat,
    destination_long,
    
}){
    client.distancematrix({
        params: {
          key: "AIzaSyD1Mcw5Ifbm_8YosXj-ca1uy20lLtBSmoM",
          "origins": [
              {
                "lat": origin_lat,
                "lng": origin_long
              },
              {
                "lat": destination_lat,
                "lng": destination_long
              }
            ],
            "destinations": [
              {
                "lat": destination_lat,
                "lng": destination_long
              },
              {
                "lat": origin_lat,
                "lng": origin_long
              }
            ],
            "travelMode": "DRIVING",
            "unitSystem": 0,
            "avoidHighways": false,
            "avoidTolls": false,
            "departure_time":"now"
        }, 
        timeout: 3000,
  
    }).then(async data=> {
      let d = data.data
      console.log(d.rows[1].elements)
      let destination = d["destination_addresses"]
      let origin = d["origin_addresses"]
      let row1 = d["rows"][0].elements
      let row2 = d["rows"][1].elements
   
      console.log({
          destination1: destination[0],
          origin1: origin[0],
          destination2: destination[1],
          origin2: origin[1],
          mainLandToIslandDuration: row1[0].duration_in_traffic.text,
          mainLandToIslandDistance: row1[0].distance.text,
          islandToMainlandDuration:row2[1].duration_in_traffic.text,
          islandToMainlandDistance: row2[1].distance.text,
          row1: row1,
          row2: row2,
          distance11: row1[0].distance,
          duration11: row1[0].duration_in_traffic,
          xduration11: row1[0].duration.text,
          distance12: row1[1].distance,
          duration12: row1[1].duration_in_traffic,
          xduration12: row1[1].duration.text,
          distance21: row2[0].distance,
          duration21: row2[0].duration_in_traffic,
          xduration21: row2[0].duration.text,
          distance22: row2[1].distance,
          duration22: row2[1].duration_in_traffic,
          xduration22: row2[1].duration.text
      })
      let toIsland = {
        timestamp: Date.now(),
        destination: destination[0],
        origin: origin[0],
        duration: row1[0].duration_in_traffic.text,
        distance: row1[0].distance.text,
        toIsland: "true",
        toMainland: "false",
      }
      let toMainland = {
        timestamp: Date.now(),
        destination: destination[1],
        origin: origin[1],
        duration: row2[1].duration_in_traffic.text,
        distance: row2[1].distance.text,
        toMainland: "true",
        toIsland: "false",
      }
    //   console.log(toMainland, toIsland)
      await gs(toIsland, toMainland)
    
    }).catch((e) => {
    console.log(e); //.rows[0].elements
  });
}


module.exports = {
    getMapDetailsGhana
}