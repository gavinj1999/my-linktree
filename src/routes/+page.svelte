<script>
  import { links } from '$lib/stores/links';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let profile = {
    name: 'Your Name',
    bio: 'Welcome to my Linktree! Connect with me below.',
    avatar: '/assets/profile.jpg'
  };

  function handleAuth() {
    if ($auth.isAuthenticated) {
      auth.set({ isAuthenticated: false, user: null });
    } else {
      goto('/login');
    }
  }
</script>

<svelte:head>
  <title>My Linktree</title>
</svelte:head>

<header>
  <nav class="menu">
    <a href="/" class="logo">My Linktree</a>
    <div class="menu-right">
      {#if $auth.isAuthenticated}
        <a href="/add-link">Manage Links</a>
        <button on:click={handleAuth}>Logout</button>
      {:else}
        <button on:click={handleAuth}>Login</button>
      {/if}
    </div>
  </nav>
</header>

<main>
  <div class="container">
    <img
      src={profile.avatar}
      alt="Profile"
      class="avatar"
      on:error={(e) => (e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Ccircle cx=%6060%22 cy=%6060%22 r=%6060%22 fill=%22%23ccc%22/%3E%3C/svg%3E')}
    />
    <h1>{profile.name}</h1>
    <p>{profile.bio}</p>
    <div class="links">
      {#each $links as link}
        <a href={link.url} target="_blank" style="background-color: {link.color}" class="link">
          {link.title}
        </a>
      {/each}
    </div>
  </div>
</main>

<style>
  :global(body) {
    background-color: #00444b;
    margin: 0;
  }

  header {
    background-color: #1a2b2e;
    padding: 1rem 2rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  .menu {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    color: #ffddd2;
    text-decoration: none;
    font-weight: bold;
  }

  .menu-right {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .menu-right a {
    color: #83c5be;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s;
  }

  .menu-right a:hover {
    color: #e29578;
  }

  .menu-right button {
    padding: 0.5rem 1rem;
    background-color: #006d77;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }

  .menu-right button:hover {
    background-color: #83c5be;
    transform: scale(1.02);
  }

  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #1a2b2e;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-family: Arial, sans-serif;
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid #83c5be;
  }

  h1 {
    font-size: 1.8rem;
    color: #ffddd2;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #83c5be;
    margin-bottom: 2rem;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .link {
    display: block;
    padding: 1rem;
    color: #ffffff;
    text-decoration: none;
    font-size: 1.2rem;
    border-radius: 8px;
    transition: transform 0.2s, background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  .link:hover {
    transform: scale(1.05);
    background-color: #e29578;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 480px) {
    .container {
      padding: 1rem;
      margin: 1rem;
    }

    .avatar {
      width: 100px;
      height: 100px;
    }

    h1 {
      font-size: 1.5rem;
    }

    .link {
      font-size: 1rem;
      padding: 0.8rem;
    }

    .menu {
      flex-direction: column;
      gap: 1rem;
    }

    .menu-right {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>