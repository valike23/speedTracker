<script lang="ts">
    import {onMount} from 'svelte';
    let win: any = {};
    let map: any = {};
    let speed = 0;
    const refreshLocation = (position) =>{
	console.log(position);
    speed = position.coords.speed;
    speed = speed || 0;
    win.L.marker([position.coords.latitude,
                position.coords.longitude]).addTo(map)
    .bindPopup('You are here!!!')
    .openPopup();
}
    onMount(()=>{
        win = window;
        map = win.L.map('map').setView([6.5244, 3.3792], 13);
        win.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                position.coords.latitude;
                position.coords.longitude;
                position.coords.speed;
            })
			navigator.geolocation.watchPosition(refreshLocation);
		}
		else{
			alert('No geolocation API on your browser F*** out')
		}
    })
</script>
<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
</svelte:head>

<div>
    <div style="width:105vw; height: 104vh; z-index: 0" id="map"></div>
    <div class="speed-button"><h3>{speed}</h3><p><small>KM/H</small></p></div>
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
        top: 81vh;
        left: 80vw;
        text-align: center;
        padding-top: 2px;
    }
    .speed-button > h3 {
        margin-bottom: -10px;
    }
</style>