<!-- src/routes/auth/users/+page.svelte -->

<script lang="ts">
	import User from '$lib/components/User.svelte';
	import Company from '$lib/components/Company.svelte';
	

	/** @type {import('./$types').PageData} */

	export let data;


	let clicked = () => {
		console.log('clicked');
	}

</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

	<legend>
		<h1>User info</h1>
	</legend>

	<!-- <Company data={data} /> -->

	{#if data.users && data.users.length}
		<User data={data.users} />
{/if}

	<div>
		<button on:click={() => {clicked}}>+ Add User</button>
	</div>



<style>

	legend {
		background-color: gray;
		color: white;
		font-size:      10px;
		padding-left: 20px;
		padding-right:  20px;
		height: 30px;
	}
</style>

