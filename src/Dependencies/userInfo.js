import axios from "axios";
import { browserName } from "react-device-detect";
// browserVersion -- gets latest version of browser installed from react-device-detect
// osName, osVersion -- would include the operating system and its version used by user from react-device-detect

let ipAddress;
// let location;

axios("https://extreme-ip-lookup.com/json/")
  .then((res) => {
    const { query } = res.data; // { countryCode, city, region } -- gets the country abbreviation, city and state respectively
    ipAddress = query;
    //location = `${city}, ${region} - ${countryCode}`;
  })
  .catch(() => {
    console.log("Request failed");
  });

export const compId = {
  browserType: browserName,
  //osType: `${osName}: ${osVersion}`,
  ip: ipAddress,
  //location: location,
};
