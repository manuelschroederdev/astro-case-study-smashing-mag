<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({ blok: Object })

const activeTab = ref(0)

const setActiveTab = (index) => {
  activeTab.value = index
}

const tabWidth = ref(100 / props.blok.entries.length)
</script>

<template>
  <ul class="relative border-b border-gray-900 mb-8 flex">
    <li
      v-for="(entry, index) in blok.entries"
      :key="entry._uid"
      :style="'width:' + tabWidth + '%'"
    >
      <button
        @click.prevent="setActiveTab(index)"
        class="w-full cursor-pointer p-3 text-center"
        :class="index === activeTab ? 'font-bold' : ''"
      >
        {{ entry.headline }}
      </button>
    </li>
  </ul>
  <section
    v-for="(entry, index) in blok.entries"
    :key="entry._uid"
    :id="'entry-' + entry._uid"
  >
    <div v-if="index === activeTab" class="grid grid-cols-2 gap-12">
      <div>
        <p>{{ entry.description }}</p>
        <a
          :href="entry.link?.cached_url"
          class="inline-flex bg-gray-900 text-white py-3 px-6 mt-6"
          >Explore {{ entry.headline }}</a
        >
      </div>
      <img :src="entry.image?.filename" :alt="entry.image?.alt" />
    </div>
  </section>
</template>

<style scoped>
ul:after {
  content: '';
  @apply absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-500;
  width: v-bind(tabWidth + '%');
  margin-left: v-bind(activeTab * tabWidth + '%');
}
</style>
