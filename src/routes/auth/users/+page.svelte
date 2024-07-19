<!-- src/routes/auth/users/+page.svelte -->

<script lang="ts">
	import User from '$lib/components/User.svelte';
	import Company from '$lib/components/Company.svelte';

	/** @type {import('./$types').PageData} */

	export let data;

	console.log(data.company.name);

</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

	<legend>
		<h1>User info</h1>
	</legend>

	{#if data.users && data.users.length}
<Company {data} />
<User {data} />
{/if}
<legend>
	<h1>Add User</h1>
</legend>


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

