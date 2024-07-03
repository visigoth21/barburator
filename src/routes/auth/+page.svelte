<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Main system</h1>

{#if data.localsUser}
  <p>
    You are logged in as {data.localsUser.email}.
  </p>
{/if}
