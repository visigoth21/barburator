<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Bardurator</title>
</svelte:head>

<h1>Main system</h1>


{#if data.localsUser}
	<p>
		You are logged in as {data.localsUser.email}.
	</p>
{/if}

<!-- <pre>
	{JSON.stringify($page, null, 2)}
</pre> -->
