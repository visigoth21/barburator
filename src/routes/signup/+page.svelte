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
	<input type="password" name="password" placeholder="Password" required /><br />
	<input type="text" name="firstName" placeholder="firstName" required />
	<input type="text" name="middleName" placeholder="middleName" />
	<input type="text" name="lastName" placeholder="lastName" required /><br />
	<input type="text" name="phoneNumber" placeholder="phoneNumber" required /><br />
	<input type="text" name="address" placeholder="address" required />
	<input type="text" name="address2" placeholder="address2" /><br />
	<input type="text" name="city" placeholder="city" required />
	<input type="text" name="state" placeholder="state" required />
	<input type="text" name="zip" placeholder="zip" required /><br />

	<button type="submit">Signup</button>
</form>
