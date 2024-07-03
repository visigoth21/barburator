<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<svelte:head>
	<title>Signup</title>
</svelte:head>

<h1>Signup</h1>

{#if form?.error}
	<div class="notice notice-error">{form.error}</div>
{/if}

<form method="post" use:enhance>
	<input type="email" name="email" placeholder="Email" required />
	<input type="password" name="password" placeholder="Password" required />

	<button type="submit">Signup</button>
</form>
