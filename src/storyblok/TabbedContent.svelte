<script>
  export let blok

  let tabWidth = 100 / blok.entries.length
  let activeTab = 0
  let marginLeft = 0

  const setActiveTab = (index) => {
    activeTab = index
    marginLeft = activeTab * tabWidth
  }
</script>

<ul
  class="relative border-b border-gray-900 mb-8 flex"
  style="--tab-width: {tabWidth}%; --margin-left: {marginLeft}%;"
>
  {#each blok.entries as entry, index}
    <li style="width: var(--tab-width)">
      <button
        class="{index === activeTab
          ? 'font-bold'
          : ''} w-full cursor-pointer p-3 text-center"
        on:click={() => setActiveTab(index)}>{entry.headline}</button
      >
    </li>
  {/each}
</ul>
{#each blok.entries as entry, index}
  {#if index === activeTab}
    <section id={entry._uid}>
      <div class="grid grid-cols-2 gap-12">
        <div>
          <p>{entry.description}</p>
          <a
            href={entry.link?.cached_url}
            class="inline-flex bg-gray-900 text-white py-3 px-6 mt-6"
            >Explore {entry.headline}</a
          >
        </div>
        <img src={entry.image?.filename} alt={entry.image?.alt} />
      </div>
    </section>
  {/if}
{/each}

<style>
  ul:after {
    content: '';
    @apply absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-500;
    width: var(--tab-width);
    margin-left: var(--margin-left);
  }
</style>
