import axios from "axios";

export async function get(req, res) {

    let lat = 6.7132641;
    let long = 3.408046;
    let data = await axios.get(`https://api.weatherapi.com/v1/current.json?key=12f5c9e88f1e4a21a1b153312211209&q=${lat},${long}4&aqi=yes`);
    console.log(data);
    res.json(data.data);


}