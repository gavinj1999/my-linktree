<script>
  import { supabase } from '$lib/supabase';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  async function login() {
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      error = signInError.message;
      return;
    }

    auth.set({ isAuthenticated: true, user: data.user });
    goto('/add-link');
  }

  async function signUp() {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      error = signUpError.message;
      return;
    }

    error = 'Check your email for a confirmation link!';
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<main>
  <div class="container">
    <h1>Login or Sign Up</h1>
    {#if error}
      <p class="error">{error}</p>
    {/if}
    <div class="form">
      <label for="email">Email</label>
      <input id="email" type="email" bind:value={email} aria-label="Email" />
      <label for="password">Password</label>
      <input id="password" type="password" bind:value={password} aria-label="Password" />
      <button on:click={login}>Login</button>
      <button class="signup" on:click={signUp}>Sign Up</button>
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

  .signup {
    background-color: #e29578;
    margin-top: 1rem;
  }

  .signup:hover {
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