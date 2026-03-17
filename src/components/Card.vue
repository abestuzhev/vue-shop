<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>

<template>
  <div
      v-if="title && imageUrl"
      className="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
        v-if="onClickFavorite"
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like 1"
        class="absolute top-8 left-8"
        @click="onClickFavorite"
    />

    <img :src="imageUrl" style="max-height: 223px" alt="Sneaker"/>

    <p className="mt-2">{{ title }}</p>

    <div className="flex justify-between mt-5">
      <div className="flex flex-col">
        <span className="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>

      <img
          v-if="onClickAdd"
          @click="onClickAdd"
          :src="!isAdded ? '/plus.svg' : '/checked.svg'"
          alt="Plus"
      />
    </div>
  </div>
</template>