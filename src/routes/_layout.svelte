<script>
	import Nav from '../components/Nav.svelte';
  import Footer from '../components/Footer.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
    flex: 1;
	}

  .container {
    display: flex;
    flex-direction: column;
    height: calc(100% - 53px);
  }

  @media (max-width: 450px) {
    main {
      padding: 1em 0 0 0;
    }
  }
</style>

<Nav {segment}/>

<div class="container">
  <main>
    <slot></slot>
  </main>
  <Footer />
</div>
