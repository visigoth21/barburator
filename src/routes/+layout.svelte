<script lang="ts">
	import '../styles.css';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	// import { enhance } from "$app/forms";

	export let data;
</script>

<nav>
	<div id="container">
		<div id="inner">
			{#if !data.localsUser}
				<a href="/">Start</a>
				<a href="/signup">Signup</a>
				<a href="/login">Login</a>
			{/if}
		</div>
	</div>
</nav>

<slot />
