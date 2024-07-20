<script>
  import { getPhoneNumView } from '$lib/components/formats';
	import Company from '$lib/components/Company.svelte';

  export let data;
  
</script>

		{#each data as user (data.id)}
			<fieldset>
				<div>
					{#if user.sysAdmin}
						<div class='sysadmindiv'>System Admin</div>
						<div><Company data={user.company_id} /></div>
					{/if}
					<div>{user.firstName} {user.lastName}</div>
					<div>{user.email}</div>
					<div>{getPhoneNumView(user.phoneNumber)}</div>
					<div><a href="/auth/users/{user.id}">Edit</a></div>
			</fieldset>
			{/each}


<style>
	fieldset {
		background-color: #eeeeee;
	}
	.sysadmindiv {
		background-color: rgb(140, 167, 203);
		color: white;
	}
</style>
