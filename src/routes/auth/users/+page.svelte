<!-- src/routes/auth/users/+page.svelte -->

<script lang="ts">
	import { getPhoneNumView } from '$lib/components/formats';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>
<div class="actions">
<article>
	<legend>
		<h1>User info</h1>
	</legend>

	{#if data.users && data.users.length}
	
				{#each data.users as user (user.id)}
				<fieldset>
					<div>
						{#if user.sysAdmin}
							<div class='sysadmindiv'>System Admin</div>
						{/if}
						<div>{user.firstName} {user.lastName}</div>
						<div>{user.email}</div>
						<div>{getPhoneNumView(user.phoneNumber)}</div>
						<div><a href="/auth/users/{user.id}">Edit</a></div>
					</div>
				</fieldset>
				{/each}

	{/if}
	</article>
	as {data.sessionId}
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
	.sysadmindiv {
		background-color: #a4dabd;
	}	
</style>

