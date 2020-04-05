<script>
  export let segment;
</script>
<li>
  <a rel=prefetch aria-current='{segment === "cases" ? "page" : undefined}' href='cases'>
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
