<script>
import MusicBtmNav from "../../components/MusicBtmNav.svelte";


</script>



<svelte:head>
    <link rel="stylesheet" href="https://cdn.metroui.org.ua/v4/css/metro-all.min.css">
    <script src="https://cdn.metroui.org.ua/v4/js/metro.min.js"></script>
</svelte:head>
<div class="main">
    <form>
        <input type="text" data-role="materialinput"
        placeholder="Search Music"
        data-icon="<span class=' mif-search'>"
        data-label="Search"
        data-informer="Enter music title or artist"
        data-cls-line="bg-black"
        data-cls-label="fg-white"
        data-cls-informer="fg-white"
        data-cls-icon="fg-white"
 >
    </form>
<MusicBtmNav active="home"/>
</div>
<style>
    .main{
        height: 100vh;
        width: 100vw;
        background-color:rgb(10, 9, 9);
    }
   
</style>