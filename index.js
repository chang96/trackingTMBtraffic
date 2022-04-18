const app = require("express")()
const PORT = process.env.PORT || 3001
const {Client} = require("@googlemaps/google-maps-services-js");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const client = new Client({});
const { promisify } = require("util")
const creds = require("./client_secret.json")
const {getMapDetails} = require("./utils")
const doc = new GoogleSpreadsheet("1Zb82JiV4JGOExijUBbTDFCfDRaqqoPQETILf37eA0hY")
setInterval(async function(){
  await getMapDetails({origin_lat: 6.54, origin_long: 3.39, destination_lat: 6.46, destination_long: 3.39})
}, 1000 * 60 * 15)

app.get("/", function(req, res){
  res.send("Still running...")
})

app.listen(PORT, function(PORT){
  console.log("running now")
})

  // async function gs(toIsland, toMainland){

  //   await doc.useServiceAccountAuth({
  //     client_email: creds.client_email,
  //     private_key:creds.private_key
  //   })
  //   await doc.loadInfo()
  //   console.log(doc.title)
  //   const sheet = doc.sheetsByIndex[0]
  //   console.log("sheet title:", sheet.title)
  //   // const sh = await doc.addSheet({
  //   //   headerValues:["timestamp", "origin", "destination", "duration", "distance", "toIsland", "toMainland"]
  //   // })
  //   await sheet.addRows([toIsland, toMainland])
  // }
  
  // gs()
  

  // client.distancematrix({
  //     params: {
  //       key: "AIzaSyD1Mcw5Ifbm_8YosXj-ca1uy20lLtBSmoM",
  //       "origins": [
  //           {
  //             "lat": 6.54,
  //             "lng": 3.39
  //           },
  //           {
  //             "lat": 6.46,
  //             "lng": 3.39
  //           }
  //         ],
  //         "destinations": [
            
  //           {
  //             "lat": 6.46,
  //             "lng": 3.39
  //           },
  //            {
  //             "lat": 6.54,
  //             "lng": 3.39
  //           },
  //         ],
  //         "travelMode": "DRIVING",
  //         "unitSystem": 0,
  //         "avoidHighways": false,
  //         "avoidTolls": false,
  //         "departure_time":"now"
  //     }, 
  //     timeout: 1000,

  // }).then(async data=> {
  //     let d = data.data
  //     // console.log(d.rows[0].elements)
  //     let destination = d["destination_addresses"]
  //     let origin = d["origin_addresses"]
  //     let row1 = d["rows"][0].elements
  //     let row2 = d["rows"][1].elements
   
  //     console.log({
  //         // destination1: destination[0],
  //         // origin1: origin[0],
  //         // destination2: destination[1],
  //         // origin2: origin[1],
  //         // mainLandToIslandDuration: row1[0].duration_in_traffic.text,
  //         // mainLandToIslandDistance: row1[0].distance.text,
  //         // islandToMainlandDuration:row2[1].duration_in_traffic.text,
  //         // islandToMainlandDistance: row2[1].distance.text,
  //         // row1: row1,
  //         // row2: row2,
  //         // distance11: row1[0].distance,
  //         // duration11: row1[0].duration_in_traffic,
  //         // xduration11: row1[0].duration.text,
  //         // distance12: row1[1].distance,
  //         // duration12: row1[1].duration_in_traffic,
  //         // xduration12: row1[1].duration.text,
  //         // distance21: row2[0].distance,
  //         // duration21: row2[0].duration_in_traffic,
  //         // xduration21: row2[0].duration.text,
  //         // distance22: row2[1].distance,
  //         // duration22: row2[1].duration_in_traffic,
  //         // xduration22: row2[1].duration.text
  //     })
  //     let toIsland = {
  //       timestamp: Date.now(),
  //       destination: destination[0],
  //       origin: origin[0],
  //       duration: row1[0].duration_in_traffic.text,
  //       distance: row1[0].distance.text,
  //       toIsland: "true",
  //       toMainland: "false",
  //     }
  //     let toMainland = {
  //       timestamp: Date.now(),
  //       destination: destination[1],
  //       origin: origin[1],
  //       duration: row2[1].duration_in_traffic.text,
  //       distance: row2[1].distance.text,
  //       toMainland: "true",
  //       toIsland: "false",
  //     }
  //     await gs(toIsland, toMainland)
    
  //   }).catch((e) => {
  //   console.log(e); //.rows[0].elements
  // });