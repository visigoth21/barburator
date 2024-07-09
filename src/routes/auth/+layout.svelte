<script lang="ts">
	import './styles.css';
	import { page } from '$app/stores';

	//export let data;
</script>

<nav>
	<div id="container">
		<div id="inner">
			<div class:active={$page.url.pathname === '/auth'}>
				<a href="/auth">Home</a>
			</div>
			<div class:active={$page.url.pathname === '/auth/books'}>
				<a href="/auth/books">Books</a>
			</div>
			<div class:active={$page.url.pathname === '/auth/users'}>
				<a href="/auth/users">Users</a>
			</div>
			<div class:active={$page.url.pathname === '/auth/companies'}>
				<a href="/auth/companies">Companies</a>
			</div>
			<div class:active={$page.url.pathname === '/auth/properties'}>
				<a href="/auth/properties">Properties</a>
			</div>
			<div class="child">
				<form action="/?/logout" method="post">
					<button type="submit">Logout</button>
				</form>
			</div>
		</div>
	</div>
</nav>

<slot />

<style>
	.active {
		background-color: white;
	}
</style>
