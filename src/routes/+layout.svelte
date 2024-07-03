<script lang="ts">
  import "../styles.css";

  import { enhance } from "$app/forms";

  export let data;
</script>

<nav>
  <div id="container">
    <div id="inner">
      {#if !data.localsUser}
        <a href="/">Start</a>
        <a href="/signup">Signup</a>
        <a href="/login">Login</a>
      {:else}
        <div class="child">
          <a href="/auth">Home</a>
        </div>
        <div class="child">
          <a href="/auth/books">Books</a>
        </div>
        <div class="child">
          <form action="/?/logout" method="post" use:enhance>
            <button type="submit">Logout</button>
          </form>
        </div>
      {/if}
    </div>
  </div>
</nav>

<slot />
