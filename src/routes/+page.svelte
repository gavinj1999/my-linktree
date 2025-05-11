<script>
  // Sample data for links
  let links = [
    { title: "Twitter", url: "https://twitter.com", color: "#1DA1F2" },
    { title: "GitHub", url: "https://github.com", color: "#333" },
    { title: "Portfolio", url: "https://example.com", color: "#FF5733" }
  ];

  // Profile info
  let profile = {
    name: "GavinJ1999",
    bio: "Welcome to my Winktree! Connect with me below.",
    avatar: "/assets/profile.jpg" // Placeholder; add your image later
  };
</script>

<svelte:head>
  <title>My Winktree</title>
</svelte:head>

<main>
  <div class="container">
    <!-- Profile Section -->
    <img src={profile.avatar} alt="Profile" class="avatar" />
    <h1>{profile.name}</h1>
    <p>{profile.bio}</p>

    <!-- Links Section -->
    <div class="links">
      {#each links as link}
        <a href={link.url} target="_blank" style="background-color: {link.color}" class="link">
          {link.title}
        </a>
      {/each}
    </div>
  </div>
</main>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    font-family: Arial, sans-serif;
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
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
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    border-radius: 8px;
    transition: transform 0.2s;
  }

  .link:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    .container {
      padding: 1rem;
    }

    .avatar {
      width: 100px;
      height: 100px;
    }

    .link {
      font-size: 1rem;
      padding: 0.8rem;
    }
  }
</style>