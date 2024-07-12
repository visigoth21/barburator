<script lang="ts">
	import { enhance } from '$app/forms';
	import { cleanPhoneNum, states } from '$lib/components/formats';

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
	<input type="text" name="lastName" placeholder="lastName" required />
	<input type="text" name="middleName" placeholder="middleName" /><br />
	<input type="text" name="phoneNumber" placeholder="phoneNumber" required /><br />
	<input type="text" name="address" placeholder="address" required />
	<input type="text" name="address2" placeholder="address2" /><br />
	<input type="text" name="city" placeholder="city" required />
	{#if states}
						<select name="state" id="state">
							{#each states as state}
									<option value="state">{state}</option>
							{/each}
						</select>
					{/if}
	<input type="text" name="zip" placeholder="zip" required /><br />
	<br />
	<button type="submit">Signup</button>
</form>
