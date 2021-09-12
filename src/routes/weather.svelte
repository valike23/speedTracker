<script lang="ts">
import axios from "axios";

import { onMount } from "svelte";
import type { Iweather, IweatherImage } from "../Model/map";

let lat = 0;
let long = 0;
let weather_data: IweatherImage = {};
weather_data.img = [];
let img;
let weather: Iweather = {};
    weather.current = {};
    weather.location = {};
    weather.current.condition = {};
    weather.current.air_quality = {};
let myDate = new Date();

onMount(async ()=>{
    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                position.coords.latitude;
                position.coords.longitude;
                position.coords.speed;
                lat = position.coords.latitude;
                long = position.coords.longitude;
                console.log(lat +"," + long);
            let data = await axios.get(`api/map/weather?lat=${lat}&long=${long}`);
             weather = data.data;
            myDate = new Date(weather.current.last_updated);
             console.log('my date: ', myDate);
             console.log(weather.current);
              let test_data = await axios.get(`api/map/weather_images?code=${weather.current.condition.code}&peroid=${weather.current.is_day}`);
              
              weather_data = test_data.data;
              console.log(weather_data);
              console.log(weather_data.img[Math.floor(Math.random() * (weather_data.img.length))]);
              img = weather_data.img[Math.floor(Math.random() * (weather_data.img.length))];
            });
           
        }
})

</script>




<svelte:head>
    <!-- head content -->

    <title>SpeedTrack :: Weather Page</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script defer src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
</svelte:head>

<div class:container-night={!weather.current.is_day}>
    <div  class="container px-1 px-md-4 py-5 mx-auto">
        <div class="row d-flex justify-content-center px-3">
            <div class:card-day={weather.current.is_day} class="card mcard" style=" background-image: url({ img ||'https://i.imgur.com/dpqZJV5.jpg'});">
                <h2 class="ml-auto mr-4 mt-3 mb-0">{weather.location.region}</h2>
                <p class="ml-auto mr-4 mb-0 med-font">{weather.current.condition.text}</p>
                <h1 class="ml-auto mr-4 large-font">{weather.current.temp_c}&#176;</h1>
                <h5 class="ml-auto mr-4 small-font">Feels Like {weather.current.feelslike_c}&#176;</h5>
                <p class="time-font mb-0 ml-4 mt-auto"> {#if myDate.getHours() > 12}
                    {myDate.getHours() - 12}:{myDate.getMinutes()} <span class="sm-font">PM</span>
                {:else}
                {myDate.getHours()}:{myDate.getMinutes()} <span class="sm-font">AM</span>
                {/if} </p>
                <p class="ml-4 mb-4">{myDate}</p>
            </div>
        </div>
    
        <div class="card dcard card-2">
            <div id="demo" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ul class="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0"></li>
                    <li data-target="#demo" data-slide-to="1" class="active"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                </ul> <!-- The slideshow -->
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row row6">
                            <div class="col col6">
                                <div class="row row1">21&deg;</div>
                                <div class="row row2"><img class="img-fluid" src="https://img.icons8.com/ios/100/000000/sun.png" /></div>
                                <div class="row row3">12:00</div>
                                <div class="row row4">PM</div>
                            </div>
                            <div class="col col6">
                                <div class="row row1">20&deg;</div>
                                <div class="row row2"><img class="img-fluid" src="https://img.icons8.com/ios/100/000000/sun.png" /></div>
                                <div class="row row3">1:00</div>
                                <div class="row row4">PM</div>
                            </div>
                            <div class="col col6">
                                <div class="row row1">20&deg;</div>
                                <div class="row row2"><img class="img-fluid" src="https://img.icons8.com/windows/100/000000/cloud.png" /></div>
                                <div class="row row3">2:00</div>
                                <div class="row row4">PM</div>
                            </div>
                            <div class="col col6">
                                <div class="row row1">19&deg;</div>
                                <div class="row row2"><img class="img-fluid" src="https://img.icons8.com/windows/100/000000/cloud.png" /></div>
                                <div class="row row3">3:00</div>
                                <div class="row row4">PM</div>
                            </div>
                            <div class="col col6">
                                <div class="row row1">18&deg;</div>
                                <div class="row row2"><img class="img-fluid" src="https://img.icons8.com/cotton/64/000000/rain--v3.png" /></div>
                                <div class="row row3">4:00</div>
                                <div class="row row4">PM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>

 .container-night {
     background-color: #000000;
     color: white;
 }
.card-day {
    color: yellow;
}
.mcard {
    background-size: cover;
    width: 600px;
    height: 350px;
    border-radius: 20px;
    box-shadow: 0px 8px 16px 4px #9E9E9E;
    margin-top: 50px;
    margin-bottom: 50px
}

.time-font {
    font-size: 50px
}

.sm-font {
    font-size: 18px
}

.med-font {
    font-size: 28px
}

.large-font {
    font-size: 60px
}


.container {
    width: fit-content
}

.dcard {
    padding: 1.2rem 3rem 1rem 3rem;
    margin: 1rem;
    border-radius: 1.5rem;
    border-color: rgba(238, 237, 237, 0.438);
    box-shadow: 5px 8px 10px #80808033
}



.carousel-indicators li {
    width: 5px;
    height: 6px;
    border-radius: 100%;
    opacity: 0.2;
    background-color: #000000
}

.carousel-indicators {
    margin-bottom: 0
}




.img-fluid {
    float: right;
    width: 65%;
    display: flex;
    align-items: center
}

.row2 .img-fluid {
    margin: 10% 0;
    opacity: 0.5;
    width: 40%
}

.card-2 .row {
    justify-content: center
}



.row1 {
    font-size: 0.7rem;
    font-weight: bold;
    color: black
}

.row3 {
    font-size: 0.9rem;
    font-weight: bold;
    color: black
}

@media(max-width:400px) {
    .row3 {
        font-size: 0.7rem;
        font-weight: bold;
        color: black
    }
}

@media(max-width:320px) {
    .row3 {
        font-size: 0.6rem;
        font-weight: bold;
        color: black
    }
}

.row4 {
    font-size: 0.6rem;
    color: rgb(196, 196, 196);
    margin: 5% 0 2.5rem
}



.col6 {
    overflow: visible
}

.row6 {
    overflow: visible
}
</style>