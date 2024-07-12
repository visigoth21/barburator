<!-- src/routes/auth/users/+page.svelte -->

<script lang="ts">
	import { getPhoneNumView } from '$lib/components/formats';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<section>
	<h1>User info</h1>

	{#if data.users && data.users.length}
		<table>
			<thead>
				<tr>
					<th scope="col" colspan="3"> Users</th>
				</tr>
			</thead>

			<tbody>
				{#each data.users as user (user.id)}
					<tr>
						<td>{user.firstName}</td><td>{user.lastName}</td>
						<td> | {user.email} | </td>
						<td>{getPhoneNumView(user.phoneNumber)}</td>
						<td><a href="/auth/users/{user.id}">View</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>
