<script lang="ts">
    export let type: 'success' | 'error' | 'warning';
    export let message: string;
</script>

<div class="notice notice-{type}">
    {message}
</div>

<style>
    .notice {
        padding: 1em;
        margin: 1em 0;
        border-left-width: 0.25em;
        border-left-style: solid;
        background-color: #fff;
        border-color: #fff;
    }
    .notice-success {
        border-left-color: #2ecc71;
    }
    .notice-error {
        border-left-color: #e74c3c;
    }
    .notice-warning {
        border-left-color: #f1c40f;
    }
</style>