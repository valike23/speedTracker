<script lang="ts">
    import axios from "axios";

    import { onMount } from "svelte";
    import type { Iweather } from "../Model/map";
    let win: any = {};
    let map: any = {};
    let speed = 0;
    let air = '';
    let lat = 0;
    let long = 0;
    let weather: Iweather = {};
    weather.current = {};
    weather.current.condition = {};
    weather.current.air_quality = {};
    $: switch (weather.current.air_quality["us-epa-index"]) {
        case 1:
            air = "Good";
            break;
            case 2:
            air = "Moderate";
            break;
            case 3:
            air = "Slightly Unhealthy";
            break;
            case 4:
            air = "Unhealthy";
            break;
            case 5:
            air = "Very Unhealty";
            break;
            case 6:
            air = "Hazardous";
            break;
    
        default:
            air = "";
            break;
    }
    const refreshLocation = (position) => {
        console.log(position);
        speed = position.coords.speed;
        if (speed) {
            speed = Math.ceil(speed * 3.6);
        } else {
            speed = 0;
        }
        lat = position.coords.latitude;
        long = position.coords.longitude;
        win.L.marker([position.coords.latitude, position.coords.longitude])
            .addTo(map)
            .bindPopup("You are here!!!")
            .openPopup();
    };
    const handleWeather = (data: Iweather) => {
    };
    onMount(async () => {
        win = window;
        map = win.L.map("map").setView([6.5244, 3.3792], 13);
        win.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                position.coords.latitude;
                position.coords.longitude;
                position.coords.speed;
                lat = position.coords.latitude;
                long = position.coords.longitude;
            });
            let data = await axios.get(`api/map/weather?lat=${lat}&long=${long}`);
             weather = data.data;
            console.log(weather);
            handleWeather(weather);

            navigator.geolocation.watchPosition(refreshLocation);
        } else {
            alert("No geolocation API on your browser F*** out");
        }
    });
</script>

<svelte:head>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
    />
    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""
    />
    <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
</svelte:head>

<div>
    <div style=" height: 104vh; z-index: 0" id="map" />
    <div class="weather row">
        <div class="col-6">
            {#if air}
            <button type="button" class:btn-primary={air == 'Good'} class:btn-success={air == 'Moderate'} class:btn-warning={air == 'Slightly Unhealthy' || air == 'Unhealthy'} class:btn-danger={air == 'Very Unhealty' || air == 'Hazardous'}  class="btn  btn-lg">
                <small>air quality</small><span class="badge bg-secondary">{air}</span>
              </button>
            {:else}
                 <!-- else content here -->
            {/if}
        </div>
        <div class="col-6 float-right "><img style="width: 64px; height:64px" src="{weather.current.condition.icon || 'img/index.png'}" alt="weather" /></div>
    </div>
    <div class="speed-button">
        <h3>{speed}</h3>
        <p><small>KM/H</small></p>
    </div>
</div>

<style>
    .speed-button {
        position: absolute;
        z-index: 100;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: white;
        box-shadow: 1px;
        top: 79vh;
        left: 80vw;
        text-align: center;
        padding-top: 2px;
    }
    .speed-button > h3 {
        margin-bottom: -17px;
    }
    .weather {
        position: absolute;
        z-index: 100;
        height: 50px;
        top: 12vh;
        left: 2vw;
    }
</style>
