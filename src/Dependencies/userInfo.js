import axios from "axios";
import { browserName, osName, osVersion } from "react-device-detect";
// browserVersion -- gets latest version of browser installed from react-device-detect

let ipAddress;
let location;

axios("https://extreme-ip-lookup.com/json/")
  .then((res) => {
    const { query, countryCode, city, region } = res.data;
    ipAddress = query;
    location = `${city}, ${region}, ${countryCode}`;
  })
  .catch(() => {
    console.log("Request failed");
  });

export const compId = {
  browserType: browserName,
  ip: ipAddress,
  location: location,
};
// osType =  `${osName}: ${osVersion}`, -- if you include the operating system and its versin used by user from react-device-detect
