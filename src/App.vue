<template>
  <div class="app">
    <div class="content">
      <div class="settings">
        <span>С названием</span>

        <button
          @click="isNamed = !isNamed"
          type="button"
          class="toggler"
          :class="{ 'toggler--off': !isNamed }"
        >
          <span>OFF</span>
          <span>ON</span>
        </button>
      </div>

      <div class="table">
        <div class="table__titles">
          <span v-if="isNamed">Продукт</span>
          <span>Цена</span>
          <span>шт.</span>
        </div>
        <ul>
          <li v-for="(item, idx) in items" :key="item.id">
            <CInput
              :id="item.id"
              :caption="item.caption"
              :price="item.price"
              :quantity="item.quantity"
              :isNamed="isNamed"
              :class="{ 'only-price': !isNamed }"
              @input-caption="setCaption($event.target.value, item)"
              @input-price="setPrice($event.target.value, item)"
              @input-quantity="setQuantity($event.target.value, item)"
            />
            <button @click="deleteItem(idx)" class="table__delete">x</button>
          </li>
        </ul>

        <button @click="addNewItem" type="button" class="table__add">+</button>
      </div>
    </div>

    <ul class="total">
      <li>
        <h4>{{ total }}</h4>
        <p>стоимость</p>
      </li>

      <li>
        <h4>{{ quantity }}</h4>
        <p>количество</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import CInput from "@/components/CInput.vue";
import { storageManager } from "@/storageManager.js";

export default {
  components: { CInput },
  setup() {
    const isNamed = ref(true);

    const items = ref(
      storageManager.getItem("items") || [
        {
          id: 1,
          caption: "",
          price: 0,
          quantity: 1,
        },
      ]
    );

    watch(
      items,
      (newValue) => {
        storageManager.setItem("items", newValue);
      },
      { deep: true }
    );

    function addNewItem() {
      items.value.push({
        id: items.value.length + 1,
        caption: "",
        price: 0,
        quantity: 1,
      });
    }

    function deleteItem(idx) {
      if (items.value.length === 1) {
        items.value.splice(idx, 1);
        addNewItem();
      } else {
        items.value.splice(idx, 1);
      }
    }

    function setCaption(newCaption, item) {
      item.caption = newCaption;
    }

    function setPrice(newPrice, item) {
      item.price = Number(newPrice);
    }

    function setQuantity(newQuantity, item) {
      item.quantity = Number(newQuantity);
    }

    const total = computed(() => {
      let r = 0;

      items.value.forEach((v) => {
        let q = v.quantity || 1;
        if (typeof v.price === "number") {
          r = r + v.price * q;
        }
      });

      return r;
    });

    const quantity = computed(() => {
      let r = 0;

      items.value.forEach((v) => {
        if (typeof v.quantity === "number") {
          r = r + v.quantity;
        }
      });

      return r;
    });

    return {
      quantity,
      items,
      total,
      isNamed,
      setCaption,
      addNewItem,
      setPrice,
      deleteItem,
      setQuantity,
    };
  },
};
</script>

<style lang="scss">
@import "../node_modules/normalize.css";

.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.content {
  flex-grow: 1;
}

.total {
  flex-shrink: 0;
}

.table {
  padding: 0 8px;

  &__content {
    flex-grow: 1;
    box-sizing: border-box;
  }

  &__add {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    background-color: #7d4e25;
    color: #fff;
    border: none;
    border-radius: 2px;
    margin: 10px auto;
  }

  &__delete {
    background-color: transparent;
    border: none;
    color: #7d4e25;
    padding: 0;
    width: 35px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }

  &__titles {
    // max-width: 500px;
    display: grid;
    grid-template-columns: 40% 40% 20%;
    text-transform: uppercase;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    font-size: 14px;
    padding: 8px 0;

    span {
      flex-grow: 1;
    }
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    height: 35px;
    display: flex;
    position: relative;
    border: 1px solid #222b1b;
    border-top: none;
    max-width: 500px;
  }

  li:first-child {
    border-top: 1px solid #222b1b;
  }
}

.total {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  height: 250px;
  list-style: none;
  padding: 8px 16px;
  background-color: #f1ebd8;

  li {
    padding: 8px;
    width: auto;
    min-width: 100px;
    height: 50px;
    border-radius: 8px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h4 {
      font-size: 24px;
      line-height: 30px;
      margin: 0;
      margin-bottom: 4px;
    }

    p {
      margin: 0;
    }

    &:first-child {
      background-color: #787d46;
    }

    &:last-child {
      background-color: #e4ba6a;
    }
  }

  li + li {
    margin-left: 20px;
  }
}

.settings {
  display: flex;
  background-color: #f1ebd8;
  padding: 16px;
  justify-content: flex-end;

  .toggler {
    margin-left: 20px;
    width: 30px;
    height: 20px;
    border: none;
    padding: 0;
    justify-content: space-between;
    align-items: center;
    display: flex;
    background-color: #787d46;
    position: relative;
    -webkit-tap-highlight-color: transparent;

    span {
      position: absolute;
      align-items: center;
      justify-content: center;
      display: flex;
      font-size: 8px;
      line-height: 12px;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      color: #787d46;
      background-color: #787d46;
      top: 0;
    }

    span:first-child {
      left: 0;
      transform: translateX(-50%);
    }

    span:last-child {
      animation: textFadeIn 0.3s ease-in forwards;
      right: 0;
      transform: translateX(50%);
    }

    &::before {
      content: "";
      position: absolute;
      box-shadow: 0 0 0 1px #fff;
      width: 20px;
      height: 20px;
      top: 0;
      right: 0;
      z-index: 1;
      border-radius: 50%;
      transform: translate3d(50%, 0, 0);
      transition: transform 0.2s;
    }
  }

  .toggler--off {
    background-color: #e4ba6a;

    span {
      background-color: #e4ba6a;
    }

    span:first-child {
      color: #fff;
      animation: textFadeIn 0.3s ease-in forwards;
    }

    span:last-child {
      animation: none;
      color: #e4ba6a;
    }

    &::before {
      transform: translate3d(-100%, 0, 0);
    }
  }
}

@keyframes textFadeIn {
  0% {
    color: rgba(#fff, 0);
  }

  100% {
    color: rgba(#fff, 1);
  }
}
</style>
