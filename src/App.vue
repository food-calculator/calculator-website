<script setup>

</script>

<template>
  <div id="gridContainer">
    <header>
      <h1>Essens Kalkulator</h1>
    </header>
    <div id="account">
      <RouterLink to="/login">Login</RouterLink>
    </div>
    <nav>
      <p>
        <RouterLink to="/ingredients">Zutaten</RouterLink>
      </p>
      <p>
        <RouterLink to="/recipes">Rezepte</RouterLink>
      </p>
      <p>
        <RouterLink to="/plans">Pläne</RouterLink>
      </p>
    </nav>
    <main>
      <h2>Wilkommen zum Essensklakulator</h2>
    </main>
  </div>
</template>

<style scoped>
h1, h2 {
  text-align: center;
}

@media (min-width: 1024px) {
  #gridContainer {
    height: 100%;
    display: grid;

    grid-template-rows: min-content 1fr;
    grid-template-columns: min-content 1fr;
    gap: 20px;
  }

  header {
    grid-row-start: 1;
    grid-column-start: 2;

    border: 1px solid var(--color-border);
    border-top: none;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }

  #account {
    grid-row: 1;
    grid-column: 1;
    width: max-content;
    height: max-content;
    place-self: center;
  }

  nav {
    grid-row: 2;
    grid-column: 1;

    border: 1px solid var(--color-border);
    border-left: none;
    border-bottom: none;
    border-top-right-radius: 25px;
    padding: 10px 10px 0 0;
  }

  main {
    grid-row: 2;
    grid-column: 2;
  }
}
</style>
