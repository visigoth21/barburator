<script lang="ts">
	import { enhance } from '$app/forms';
	import { getReadableDate } from '$lib/utils';
	import Notice from '$lib/components/Notice.svelte';

	export let data;
	export let form;

	let running = false;
	let openEditDialog = false;

	$: ({ book, coverIdPromise } = data);

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
			<h2>Edit "{book.title}"</h2>
		</header>

		<form action="?/updateBook" method="post" use:enhance>
			<fieldset>
				<label>
					Title
					<input type="text" name="title" placeholder="Book title" value={book.title} />
				</label>

				<label>
					Author
					<input type="text" name="author" placeholder="Author" value={book.author} />
				</label>

				<label>
					ISBN
					<input type="text" name="isbn" placeholder="ISBN" value={book.isbn} />
				</label>

				<label>
					Publication Date
					<input
						type="date"
						name="publicationDate"
						placeholder="Publication date"
						value={book.publicationDate.toISOString().slice(0, 10)}
					/>
				</label>
			</fieldset>

			<button type="submit">Save</button>
		</form>
	</article>
</dialog>

<section>
	<h1>{book.title}</h1>

	<div>
		<h2>Actions</h2>

		{#if running}
			<div class="spinner-wrapper">
				<span aria-busy="true">Deleting book {book.title}...</span>
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
