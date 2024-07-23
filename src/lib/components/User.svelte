<script>
	import { getPhoneNumView } from '$lib/components/formats';

	export let data;
</script>

<div class="usercard">
	{#if data.sysAdmin}
		<div class="sysadmindiv">System Admin</div>
	{/if}
	<div>{data.email}</div>
	<div>{data.firstName} {data.lastName}</div>
	<div>{getPhoneNumView(data.phoneNumber)}</div>
	<div><a href="/auth/users/{data.id}" class="button">Edit</a></div>
</div>

<style>
	.usercard {
		background-color: #b49b9b;
		border-top: 1px solid #cccccc;
		border-right: 1px solid #333333;
		border-bottom: 1px solid #333333;
		border-left: 1px solid #cccccc;
		max-width: 300px;
	}
	.sysadmindiv {
		background-color: rgb(141, 156, 176);
		color: white;
		border-top: 1px solid #cccccc;
		border-right: 1px solid #333333;
		border-bottom: 1px solid #333333;
		border-left: 1px solid #cccccc;
	}
	.button {
		font: bold 11px Arial;
		text-decoration: none;
		background-color: #eeeeee;
		color: #333333;
		padding: 2px 6px 2px 6px;
		border-top: 1px solid #cccccc;
		border-right: 1px solid #333333;
		border-bottom: 1px solid #333333;
		border-left: 1px solid #cccccc;
	}
</style>
