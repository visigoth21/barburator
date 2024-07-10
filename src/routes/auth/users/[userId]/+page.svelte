<script lang="ts">
	import { enhance } from '$app/forms';
	import { getPhoneNumView } from '$lib/utils';
	import Notice from '$lib/components/Notice.svelte';

	export let data;
	export let form;

	let running = false;
	let openEditDialog = false;

	$: ({ user } = data);

	$: if (form?.success) {
		openEditDialog = false;
	}
</script>

<dialog open={openEditDialog}>
	<article>
		{#if form?.error}
			<Notice message={form.error} type="error" />
		{/if}

		<header>
			<button aria-label="Close" rel="prev" on:click={() => (openEditDialog = false)}>X</button>
			<h2>Edit {user.firstName + ' ' + user.lastName}</h2>
		</header>

		<form action="?/updateBook" method="post" use:enhance>
			<fieldset>
				<label>
					First name
					<input type="text" name="firstName" placeholder="Last Name" value={user.firstName} />
				</label>

				<label>
					Last name
					<input type="text" name="lastName" placeholder="Last Name" value={user.lastName} />
				</label>

				<label>
					Middle name
					<input type="text" name="middleName" placeholder="Middle" value={user.middleName} />
				</label>

				<label>
					Phone number
					<input
						type="text"
						name="phoneNumber"
						placeholder="Phone Number"
						value={user.phoneNumber.replace(/\D/g, '')}
					/>
				</label>
			</fieldset>

			<button type="submit">Save</button>
		</form>
	</article>
</dialog>

<section>
	<h1>{user.firstName + ' ' + user.lastName}</h1>

	<div>
		<h2>Actions</h2>

		{#if running}
			<div class="spinner-wrapper">
				<span aria-busy="true">Deleting book {user.lastName}...</span>
			</div>
		{/if}

		<div class="actions">
			<button on:click={() => (openEditDialog = !openEditDialog)} class="action">Edit</button>

			<form
				action="?/deleteBook"
				method="post"
				use:enhance={() => {
					running = true;

					return async ({ update }) => {
						running = false;
						return update();
					};
				}}
			>
				<button class="contrast action">Delete</button>
			</form>
		</div>
	</div>

	<!-- single book code -->
</section>
