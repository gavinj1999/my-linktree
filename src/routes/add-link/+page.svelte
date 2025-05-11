<script>
  import { links } from '$lib/stores/links';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let newLink = { title: '', url: '', color: '#83c5be' };
  let error = '';

  if (!$auth.isAuthenticated) {
    goto('/login');
  }

  function addLink() {
    if (!newLink.title || !newLink.url) {
      error = 'Please fill in both title and URL';
      return;
    }
    links.update((current) => [...current, { ...newLink }]);
    newLink = { title: '', url: '', color: '#83c5be' };
    error = '';
  }
</script>

<svelte:head>
  <title>Add Link</title>
</svelte:head>

<main>
  <div class="container">
    <h1>Add a New Link</h1>
    {#if error}
      <p class="error">{error}</p>
    {/if}
    <div class="form">
      <label for="link-title">Link Title</label>
      <input id="link-title" type="text" bind:value={newLink.title} aria-label="Link Title" />
      <label for="link-url">URL</label>
      <input id="link-url" type="url" bind:value={newLink.url} aria-label="URL" />
      <label for="link-color">Color</label>
      <input id="link-color" type="color" bind:value={newLink.color} />
      <button on:click={addLink}>Add Link</button>
      <button class="logout" on:click={() => auth.set({ isAuthenticated: false })}>Logout</button>
    </div>
  </div>
</main>

<style>
  :global(body) {
    background-color: #00444b;
    margin: 0;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #1a2b2e;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-family: Arial, sans-serif;
  }

  h1 {
    font-size: 1.8rem;
    color: #ffddd2;
    margin-bottom: 1rem;
  }

  .error {
    color: #e29578;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.9rem;
    color: #ffddd2;
    text-align: left;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #83c5be;
    border-radius: 6px;
    background-color: #2e3f42;
    color: #edf6f9;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: #e29578;
    outline: none;
  }

  button {
    padding: 0.75rem;
    font-size: 1rem;
    background-color: #006d77;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }

  button:hover {
    background-color: #83c5be;
    transform: scale(1.02);
  }

  .logout {
    background-color: #e29578;
    margin-top: 1rem;
  }

  .logout:hover {
    background-color: #ffddd2;
    color: #006d77;
  }

  @media (max-width: 480px) {
    .container {
      padding: 1rem;
      margin: 1rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    button {
      padding: 0.6rem;
    }
  }
</style>