<script lang="ts" setup></script>
<template>
  <div class="text-3xl text-center pt-20 pb-24 top_bg w-full z-10 text-nord-5">
    <div class="main-container">
      <span class="text-4xl text-nord-11 font-bold">
        <img
          src="~/assets/logo.png"
          alt="Logo"
          class="w-[64px] rounded-full bg-nard-4 inline"
        />
        &nbsp;FastDelivery
      </span>
      - это компания, главной целью которой является максимально быстрая и качественная доставка грузов по всей России!
    </div>
  </div>
  <div class="bg-nord-5 dark:bg-nord-1 -z-10 -mt-10 pt-14 relative sub-bg">
    <div class="main-container">
      <div class="">
        <h2 class="mb-4 text-3xl text-center">Обширный парк техники!</h2>
        <landing-car-preview class=""></landing-car-preview>
      </div>
    </div>
  </div>
  <div class="main-container py-10">
    <div class="text-3xl text-center">
      <h2 class="mb-4">Мы работаем по всей России!</h2>
      <img
        src="~/assets/img/landing_img/map.png"
        alt="map"
        class="block mx-auto"
      />
    </div>
  </div>
  <div class="bg-nord-5 dark:bg-nord-1 py-10 sub-bg">
    <div class="main-container">
      <h2 class="mb-4 text-3xl text-center">Помогать вам - наша работа!</h2>
      <div class="flex flex-wrap">
        <img
          src="~/assets/img/landing_img/1.webp"
          alt="l1"
          class="w-1/3 px-2 tablet:w-full tablet:mb-4"
        />
        <img
          src="~/assets/img/landing_img/2.webp"
          alt="l1"
          class="w-1/3 px-2 tablet:w-full tablet:mb-4"
        />
        <img
          src="~/assets/img/landing_img/3.webp"
          alt="l1"
          class="w-1/3 px-2 tablet:w-full tablet:mb-4"
        />
      </div>
    </div>
  </div>
  <div class="main-container py-10 flex flex-col items-center">
    <h2 class="mb-4 text-3xl text-center">Присоединяйтесь к нам!</h2>
    <p class="text-center text-xl mb-4">
      Найдите пункт выдачи заказов в своем городе и мы постараемся доставить ваши посылки максимально быстро!
    </p>
    <NuxtLink
      to="/signin"
      class="!font-bold !text-nord-5 !text-3xl !py-5 animate__bounceIn animate__animated el-button el-button--primary"
    >
      Присоединяйся!
    </NuxtLink>
  </div>
</template>
<style lang="sass">
.top_bg
  background-image: url('~/assets/img/landing_img/bg-np.png')
  background-size:     cover
  background-repeat:   no-repeat
  background-position: center center
.sub-bg
  background-image: url('~/assets/img/landing_img/hompage-top_trans3.png')
  background-size:     cover
  background-repeat:   no-repeat
  background-position: center center
  background-blend-mode: overlay
</style>
