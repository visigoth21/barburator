<!-- src/routes/books/add/+page.svelte -->

<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Notice from '$lib/components/Notice.svelte';

	export let form;

	$: if (form?.success) {
		goto(`/books/${form.bookId}`);
	}
</script>

<svelte:head>
	<title>New Book</title>
</svelte:head>

<section>
	<h1>Add a new book</h1>

	{#if form?.error}
		<Notice message={form.error} type="error" />
	{/if}

	<form action="?/addNewBook" method="post" use:enhance>


		<div>
			<label for="title">Title</label>
			<input type="text" name="title" id="title" required />
		</div>
		<div>
			<label for="author">Author</label>
			<input type="text" name="author" id="author" required />
		</div>
		<div>
			<label for="isbn">ISBN</label>
			<input type="number" name="isbn" id="isbn" required />
		</div>
		<div>
			<label for="publicationDate">Publication Date</label>
			<input type="date" name="publicationDate" id="publicationDate" required />
		</div>
		<div>
			<button type="submit">Add book</button>
		</div>
	</form>
</section>
