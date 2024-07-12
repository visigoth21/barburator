<!-- src/routes/auth/companies/+page.svelte -->

<script lang="ts">
	import { getPhoneNumView } from '$lib/components/formats';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Properties</title>
</svelte:head>

<div class="actions">
<article>
	<legend>
		<h1>Property info</h1>
	</legend>

	{#if data.properties && data.properties.length}
	
				{#each data.properties as proprety (property.id)}
				<fieldset>
					<div>
						<!-- <div>{user.firstName} {user.lastName}</div>
						<div>{user.email}</div>
						<div>{getPhoneNumView(user.phoneNumber)}</div>
						<div><a href="/auth/users/{user.id}">Edit</a></div> -->
					</div>
				</fieldset>
				{/each}

	{/if}
	</article>
</div>

<style>
	fieldset {
		background-color: #eeeeee;
	}

	legend {
		background-color: gray;
		color: white;
		padding: 1px 20px;
	}

	input {
		margin: 5px;
	}
</style>