<script>
  import { links } from '$lib/stores/links';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  let newLink = { id: null, title: '', url: '', color: '#83c5be' };
  let error = '';

  if (!$auth.isAuthenticated) {
    goto('/login');
  }

  async function addOrUpdateLink() {
    if (!newLink.title || !newLink.url) {
      error = 'Please fill in both title and URL';
      return;
    }

    const linkData = {
      title: newLink.title,
      url: newLink.url,
      color: newLink.color,
      user_id: $auth.user.id
    };

    let response;
    if (newLink.id) {
      response = await supabase
        .from('links')
        .update(linkData)
        .eq('id', newLink.id)
        .eq('user_id', $auth.user.id);
    } else {
      response = await supabase.from('links').insert([linkData]);
    }

    if (response.error) {
      error = response.error.message;
      return;
    }

    const { data } = await supabase.from('links').select('*').eq('user_id', $auth.user.id);
    links.set(data || []);
    newLink = { id: null, title: '', url: '', color: '#83c5be' };
    error = '';
  }

  async function editLink(link) {
    newLink = { ...link };
  }

  async function deleteLink(id) {
    const { error: deleteError } = await supabase
      .from('links')
      .delete()
      .eq('id', id)
      .eq('user_id', $auth.user.id);

    if (deleteError) {
      error = deleteError.message;
      return;
    }

    const { data } = await supabase.from('links').select('*').eq('user_id', $auth.user.id);
    links.set(data || []);
    error = '';
  }
</script>

<svelte:head>
  <title>Manage Links</title>
</svelte:head>

<main>
  <div class="container">
    <h1>Manage Links</h1>
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
      <button on:click={addOrUpdateLink}>{newLink.id ? 'Update Link' : 'Add Link'}</button>
    </div>
    <div class="links-list">
      <h2>Your Links</h2>
      {#if $links.length === 0}
        <p>No links yet.</p>
      {:else}
        {#each $links as link}
          <div class="link-item">
            <span>{link.title}</span>
            <div class="link-actions">
              <button class="edit" on:click={() => editLink(link)}>Edit</button>
              <button class="delete" on:click={() => deleteLink(link.id)}>Delete</button>
            </div>
          </div>
        {/each}
      {/if}
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

  h2 {
    font-size: 1.4rem;
    color: #ffddd2;
    margin: 2rem 0 1rem;
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

  button:hover:not(:disabled) {
    background-color: #83c5be;
    transform: scale(1.02);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .links-list {
    margin-top: 2rem;
    text-align: left;
  }

  .link-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: #2e3f42;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  .link-item span {
    color: #ffddd2;
    font-size: 1rem;
  }

  .link-actions {
    display: flex;
    gap: 0.5rem;
  }

  .edit {
    background-color: #83c5be;
  }

  .edit:hover:not(:disabled) {
    background-color: #006d77;
  }

  .delete {
    background-color: #e29578;
  }

  .delete:hover:not(:disabled) {
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

    h2 {
      font-size: 1.2rem;
    }

    button {
      padding: 0.6rem;
    }

    .link-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style>