<script lang="ts">
export let active;
</script>
<div class="bottom-nav pos-absolute bottom">
    <button class="button bottom">
        <span class:fg-red={active == 'home'} class="icon mif-home"></span>
        
    </button>
    <button class="button bottom">
        <span class:fg-red={active == 'favorites'} class="icon mif-heart"></span>
    </button>
    <button class="button bottom">
        <span class:fg-red={active == 'user'} class="icon mif-user"></span>
    </button>
</div>
<style>
.bottom {
    background-color: rgb(44, 43, 43);
    color: white;
}
</style>