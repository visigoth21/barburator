<script lang="ts">
	import './styles.css';
	import { page } from '$app/stores';

	//export let data;
	//console.log($page.url.pathname);
</script>

<nav>
	<div id="nav-container">
		<div id="nav-inner">
			<div class:nav-active={$page.url.pathname === '/auth'}>
				<a href="/auth">Home</a>
			</div>
			<div class:nav-active={$page.url.pathname.includes('/auth/books')}>
				<a href="/auth/books">Books</a>
			</div>
			<div class:nav-active={$page.url.pathname.includes('/auth/users')}>
				<a href="/auth/users">Users</a>
			</div>
			<div class:nav-active={$page.url.pathname.includes('/auth/companies')}>
				<a href="/auth/companies">Companies</a>
			</div>
			<div class:nav-active={$page.url.pathname.includes('/auth/properties')}>
				<a href="/auth/properties">Properties</a>
			</div>
			<div class="nav-child">
				<form action="/?/logout" method="post">
					<button type="submit">Logout</button>
				</form>
			</div>
		</div>
	</div>
</nav>

<slot />

<style>
	#nav-container {
		background-color: rgb(120, 139, 100);
		overflow: hidden;
	}

	#nav-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-child {
		margin: 0 10px;
	}
	.nav-active {
		background-color: gray;
		color:white;
	}
	.nav-active a {
		text-decoration: none;
		color: white;
		padding: 10px;
	}
	
</style>
