<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css';

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
