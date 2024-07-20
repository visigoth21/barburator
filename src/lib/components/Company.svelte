<script lang="ts">

  import { getPhoneNumView } from '$lib/components/formats';

  export let data;

  // console.log("now it works : " + corpData.id);

</script>

<h3>Company Info</h3>

			<!-- {#each data as corp (data.id)} -->
        <h2>ID : {data}</h2>
			<!-- {/each} -->
<!-- {:else}
  <div>no data</div>
{/if} -->


<!-- {#if corp.active === true} -->
<!-- <div>
  <button on:click={() => {clicked}}>+ Add Company</button>
</div> -->
<!-- {:else} -->
  
<!-- {/if} -->


<!-- <h2>Name : {corp.company.name}</h2>
<div>{corp.company.address}</div>
<div>{corp.company.city}, {corp.company.state}. {corp.company.zip}</div>
<div>{getPhoneNumView(corp.company.phoneNumber)}</div> -->