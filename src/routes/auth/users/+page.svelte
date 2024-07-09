<!-- src/routes/users/+page.svelte -->

<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>User</title>
</svelte:head>

<section>
	<h1>User info</h1>

	<table>
		<thead>
			<tr>
				<th scope="col" colspan="3"> User</th>
			</tr>
		</thead>

		<tbody>
			<tr>
				<td>
					<a href="/auth/users/">Firstname</a>
				</td><td>
					<a href="/auth/users/">Middle</a>
				</td><td>
					<a href="/auth/users/">Lastname</a>
				</td>
			</tr>
		</tbody>
	</table>
</section>
