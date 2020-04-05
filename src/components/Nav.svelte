<script>
	export let segment;
  import {UPDATE_DATE} from '../constants.js';
  let showDropdown = false;
  function handleClick() {
    showDropdown = !showDropdown;
  }
</script>

<style>
	nav {
    border-bottom: 1px solid #0771bb44;
		font-weight: 300;
		padding: 0 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
	}

	ul {
		margin: 0;
		padding: 0;
    display: flex;
    align-items: center;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #0771bb;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

  .updated {
    font-size: .725em;
    width: 50px;
    margin-right: 16px;
  }

  .phone-nav {
    display: none;
    position: relative;
    padding: 1em 0.5em;
    cursor: pointer;
    margin-right: 5px;
  }

  .phone-nav::before {
    position: absolute;
    right: -4px;
    content: '⌄';
  }

  .phone-nav ul {
    position: absolute;
    z-index: 1;
    background-color: #eee;
    flex-direction: column;
    top: 40px;
    display: none;
  }

  .phone-nav:hover ul,
  .phone-nav.show ul {
    display: flex;
  }

  @media (max-width: 750px) {
    .updated {
      margin-right: none;
    }

    .phone-nav {
      display: block;
    }
    .wide-nav {
      display: none;
    }
  }
</style>

<nav>
	<ul>
    <li
      class="phone-nav"
      on:touchend={handleClick}
      class:show={showDropdown}
      aria-current='{
      !segment ||
      segment === "deaths" ||
      segment === "hospitalizations" ?
      "page" :
      undefined}'
    >
      charts
      <ul>
        <li>
          <a rel=prefetch href='/'>
            cases
          </a>
        </li>
        <li>
          <a rel=prefetch href='deaths'>
            deaths
          </a>
        </li>
        <li>
          <a rel=prefetch href='hospitalizations'>
            hospitalizations
          </a>
        </li>
      </ul>
    </li>
    <div class="wide-nav">
      <li>
        <a rel=prefetch aria-current='{!segment ? "page" : undefined}' href='/'>
          cases
        </a>
      </li>
      <li>
        <a rel=prefetch aria-current='{segment === "deaths" ? "page" : undefined}' href='deaths'>
          deaths
        </a>
      </li>
      <li>
        <a rel=prefetch aria-current='{segment === "hospitalizations" ? "page" : undefined}' href='hospitalizations'>
          hospitalizations
        </a>
      </li>
    </div>
    <li> <a rel=prefetch aria-current='{segment === "maps" ? "page" : undefined}' href='maps'>maps</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>about</a></li>
	</ul>
  <div class='updated'>Updated {UPDATE_DATE.toLocaleDateString()}</div>
</nav>
