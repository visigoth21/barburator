<script lang="ts">
	import { counter } from '$lib/stores/counter.store';
	import { page } from '$app/stores';
	import { states } from '$lib/components/formats';

	let count = 0;

	counter.subscribe((value) => {
		count = value;
	});

	//counter.set(10);

	export let data;
</script>

<svelte:head>
	<title>Bardurator</title>
</svelte:head>

<h1>Main system</h1>

<h3>The count is {count}</h3>

{#if data.localsUser}
	<p>
		You are logged in as {data.localsUser.email}.
	</p>
{/if}

<pre>
	{JSON.stringify($page, null, 2)}
</pre>
