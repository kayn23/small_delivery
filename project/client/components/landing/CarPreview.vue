<script lang="ts" setup>
type IDeliveryType = {
  id: number
  name: string
  img: string
}
import car1t from '~/assets/img/cars/1t.png'
import car2t from '~/assets/img/cars/2t.png'
import car3_5t from '~/assets/img/cars/3_5t.png'

const deliveryTypeList: IDeliveryType[] = [
  {
    id: 1,
    name: 'Перевозка грузов до 1 тонны',
    img: car1t,
  },
  {
    id: 2,
    name: 'Перевозка грузов до 2 тонн',
    img: car2t,
  },
  {
    id: 3,
    name: 'Перевозка грузов до 3,5 тонн',
    img: car3_5t,
  },
  {
    id: 4,
    name: 'Перевозка грузов до 1 тонны',
    img: car1t,
  },
  {
    id: 5,
    name: 'Перевозка грузов до 2 тонн',
    img: car2t,
  },
  {
    id: 6,
    name: 'Перевозка грузов до 3,5 тонн',
    img: car3_5t,
  },
]
</script>
<template>
  <div class="flex justify-around items-center flex-wrap">
    <div
      v-for="item in deliveryTypeList"
      :key="item.id"
      class="flex flex-col items-center p-4 tablet:max-w-[180px] text-center"
    >
      <img
        :src="item.img"
        :alt="item.name"
      />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>
<style lang="sass"></style>
