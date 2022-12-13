<template>
  <div class="app">
    <button
      @click="isNamed = !isNamed"
      type="button"
      class="toggler"
      :class="{ 'toggler--off': !isNamed }"
    >
      <span>С названием</span>
      <span v-if="isNamed">ON</span>
      <span v-else>OFF</span>
    </button>

    <div class="table">
      <div>
        <div class="table__titles">
          <span v-if="isNamed">Продукт</span>
          <span>Цена</span>
        </div>
        <ul>
          <li v-for="item in items" :key="item.id">
            <CInput
              :id="item.id"
              :caption="item.caption"
              :price="item.price"
              :isNamed="isNamed"
              @input-caption="setCaption($event.target.value, item)"
              @input-price="setPrice($event.target.value, item)"
            />
          </li>
        </ul>
      </div>

      <button @click="addNewItem" type="button">+</button>
    </div>

    <div class="total">
      <p>стоимость: {{ total }}</p>
      <p>количество: {{ items.length }}</p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import CInput from "@/components/CInput.vue";

export default {
  components: { CInput },
  setup() {
    const items = ref([{ id: 1, caption: "", price: 0 }]);
    const isNamed = ref(true);
    function addNewItem() {
      items.value.push({
        id: items.value.length + 1,
        caption: "",
        price: 0,
      });
    }

    function setCaption(newCaption, item) {
      item.caption = newCaption;
    }

    function setPrice(newPrice, item) {
      item.price = Number(newPrice);
    }

    const total = computed(() => {
      let r = 0;

      items.value.forEach((v) => {
        if (typeof v.price === "number") {
          r = r + v.price;
        }
      });

      return r;
    });

    return {
      items,
      total,
      isNamed,
      setCaption,
      addNewItem,
      setPrice,
    };
  },
};
</script>

<style lang="scss">
@import "../node_modules/normalize.css";

.app {
  padding: 16px 8px;
}

.toggler {
  border-radius: 4px;
  display: flex;
  border: 1px solid green;
  padding: 0;
  background-color: transparent;
  color: #000;

  span {
    padding: 4px;
  }

  span:last-child {
    border-left: 1px solid green;
    background-color: green;
    color: white;
  }

  &--off {
    border-color: grey;

    span:last-child {
      border-left-color: grey;
      background-color: grey;
    }
  }
}

.table {
  margin-top: 30px;
  display: flex;
  width: 100%;

  button {
    align-self: flex-end;
    margin-left: 4px;
  }

  &__titles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 8px 0;
    text-transform: uppercase;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey;
  }

  li:first-child {
    border-top: 1px solid grey;
  }
}

.total {
  margin-top: 40px;
  border-top: 1px solid black;
}
</style>
