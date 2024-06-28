<!-- src/routes/books/+page.svelte -->

<script lang="ts">
	import { getReadableDate } from '$lib/utils';

	export let data;
</script>

<svelte:head>
	<title>All Books</title>
</svelte:head>

<section>
	<h1>All Books</h1>

	{#if data.books && data.books.length}
		<table>
			<thead>
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Author</th>
					<th scope="col">Publication Date</th>
					<th scope="col">ISBN</th>
				</tr>
			</thead>

			<tbody>
				{#each data.books as book (book.id)}
					<tr>
						<td>
							<a href="/books/{book.id}">{book.title}</a>
						</td>
						<td>{book.author}</td>
						<td>{getReadableDate({ date: book.publicationDate })}</td>
						<td>{book.isbn || '-'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>