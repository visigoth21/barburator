<!-- src/routes/auth/users/+page.svelte -->

<script lang="ts">
	import User from '$lib/components/User.svelte';  
	import { getPhoneNumView } from '$lib/components/formats';
	import Company from '$lib/components/Company.svelte';

	/** @type {import('./$types').PageData} */

	export let data;

	let userData = data.users;

	let openUserEdit = false;
	let openUserAdd = false;
	let openCompanyEdit = false;
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<legend>
	<h1>Users</h1>
</legend>

<!-- <Company data={data} /> -->

{#if data.users && data.users.length}
	<company_div>
		{#if data.company.active === false}
			{#if openCompanyEdit && data.company.active === true}
				<Company data={data.company} />
			{:else}
				<button on:click={() => (openCompanyEdit = !openCompanyEdit)}> + Add Company </button>
			{/if}
		{:else}
			<Company data={data.company} />
		{/if}
	</company_div>
	<users_div>
		{#each data.users as user (user.id)}


		<User data={user} />
		<!-- <user_fieldset>
			<div>
				{#if user.sysAdmin}
					<div class='sysadmindiv'>System Admin</div>
				{/if}
				<div>{user.email}</div>
				<div>{user.firstName} {user.lastName}</div>
				<div>{getPhoneNumView(user.phoneNumber)}</div>
				<div><a href="/auth/users/{user.id}" class="button">Edit</a></div>
		</user_fieldset> -->
		{/each}
	</users_div>
{/if}

<!-- <div>
	<h2>Add a book</h2>

	{#if form?.error}
		<div class="notice notice-error">{form.error}</div>
	{/if}

	<form method="post" use:enhance>
		<input type="number" name="isbn" placeholder="ISBN" required />
		<button type="submit">Add book</button>
	</form>
</div> -->
<div><a href="/auth/users/0" class="button"> + Add User </a></div>
<div>
	<!-- <button on:click={() => (openUserAdd = !openUserAdd)}> + Add User </button> -->
</div>

<style>
	legend {
		background-color: gray;
		color: white;
		font-size: 10px;
		padding-left: 20px;
		padding-right: 20px;
		height: 30px;
	}
</style>
