<script>
  import { getPhoneNumView } from '$lib/components/formats';

  export let data;
  
  let clicked = () => {
    console.log('clicked');
  }
</script>

{data.company.name}
{#if data.company.active === false}
<div>
  <h2>{data.company.name}</h2>
  <div>{data.company.address}</div>
  <div>{data.company.city}, {data.company.state}. {data.company.zip}</div>
  <div>{getPhoneNumView(data.company.phoneNumber)}</div>
</div>
{:else}
  {data.company.active}
  <button on:click={() => {clicked}}>Add Company</button>
{/if}
