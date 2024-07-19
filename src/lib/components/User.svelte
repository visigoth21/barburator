<script>
  import { getPhoneNumView } from '$lib/components/formats';

  export let data;
  
  let clicked = () => {
    console.log('clicked');
  }
</script>

{#if data.users && data.users.length}
			{#each data.users as user (user.id)}
			<fieldset>
				<div>
					{#if user.sysAdmin}
						<div class='sysadmindiv'>System Admin</div>
					{/if}
					<div>{user.firstName} {user.lastName}</div>
					<div>{user.email}</div>
					<div>{getPhoneNumView(user.phoneNumber)}</div>
					<div><a href="/auth/users/{user.id}">Edit</a></div>
				</div>
			</fieldset>
			{/each}
	{/if}


<style>
	fieldset {
		background-color: #eeeeee;
	}
</style>
