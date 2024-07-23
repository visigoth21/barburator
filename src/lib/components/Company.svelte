<script lang="ts">
	import { getPhoneNumView } from '$lib/components/formats';

	export let data;

</script>

<h3>Company Info</h3>

	<h2>Name : {data.name}</h2>
	<div>{data.address}</div>
	<div>{data.city}, {data.state}. {data.zip}</div>
	<div>{getPhoneNumView(data.phoneNumber)}</div>

