<script lang="ts">
    /** @type {import('./$types').Actions} */
    import "./styles.css";  
    import { enhance } from "$app/forms";
  
    export let data;
</script>
  
  <nav>
    <div id="container">
      <div id="inner">
          <div class="child">
            <a href="/auth">Home</a>
          </div>
          <div class="child">
            <a href="/auth/books">Books</a>
          </div>
          <div class="child">
            <a href="/auth/users">Users</a>
          </div>
          <div class="child">
            <a href="/auth/companies">Companies</a>
          </div>
          <div class="child">
            <a href="/auth/properties">Properties</a>
          </div>
          <div class="child">
            <form action="/?/logout" method="post" use:enhance>
              <button type="submit">Logout</button>
            </form>
          </div>
      </div>
    </div>
  </nav>
  
  <slot />