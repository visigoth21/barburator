<!-- src/routes/users/add/+page.svelte -->

<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Notice from '$lib/components/Notice.svelte';
	import { cleanPhoneNum, states } from '$lib/components/formats';

	export let form;

	$: if (form?.success) {
		goto(`/users/${form.userId}`);
	}
</script>

<svelte:head>
	<title>New User</title>
</svelte:head>

<section>
	<h1>Add a new User</h1>

	{#if form?.error}
		<Notice message={form.error} type="error" />
	{/if}

	<form action="?/addNewUser" method="post" use:enhance>
    <div>
      <label for="eMail">eMail</label>
    <input type="email" name="email" placeholder="Email" required />
    </div>
    <div>
      <label for="password">Password</label>
    <input type="password" name="password" placeholder="Password" required />
    </div>
    <div>
      <label for="firstName">firstName</label>
    <input type="text" name="firstName" placeholder="firstName" required />
    </div>
    <div>
      <label for="lastName">lastName</label>
    <input type="text" name="lastName" placeholder="lastName" required />
    </div>
    <div>
      <label for="middleName">middleName</label>
    <input type="text" name="middleName" placeholder="middleName" />
    </div>
    <div>
      <label for="phoneNumber">phoneNumber</label>
    <input type="text" name="phoneNumber" placeholder="phoneNumber" required />
    </div>
    <div>
      <label for="address">address</label>
    <input type="text" name="address" placeholder="address" required />
    </div>
    <div>
      <label for="address2">address2</label>
    <input type="text" name="address2" placeholder="address2" /><br />
    </div>
    <div>
      <label for="city">city</label>
    <input type="text" name="city" placeholder="city" required />
    </div>
    <div>
      <label for="state">state</label>
    {#if states}
    <select name="state" id="state">
      {#each states as state}
          <option value="{state}">{state}</option>
      {/each}
    </select>
    {/if}
    </div>
    <div>
      <label for="zip">zip</label>
    <input type="text" name="zip" placeholder="zip" required />
    </div>
		<div>
			<button type="submit">Add book</button>
		</div>
	</form>
</section>
