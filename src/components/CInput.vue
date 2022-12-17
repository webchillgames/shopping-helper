<template>
  <div class="c-input" :class="{ nameless: !isNamed }">
    <input
      v-if="isNamed"
      id="caption"
      type="text"
      :value="caption"
      @input="$emit('input-caption', $event)"
    />

    <input
      id="price"
      type="number"
      :value="price ? price : null"
      @input="$emit('input-price', $event)"
    />

    <input
      id="quantity"
      type="number"
      :value="quantity"
      @input="$emit('input-quantity', $event)"
      class="c-input__quantity"
    />
  </div>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      required: false,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    isNamed: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["input-caption", "input-price", "input-quantity"],
};
</script>

<style lang="scss">
.c-input {
  width: 100%;
  display: grid;
  grid-template-columns: 40% 40% 20%;

  input {
    padding: 3px;
    border: none;
    box-sizing: border-box;
    height: 100%;

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 1px orange;
    }
  }

  input[type="number"] {
    border-radius: 0;
    border-left: 1px solid #12232e;
  }

  &.nameless {
    grid-template-columns: 1fr 20%;

    input:first-child {
      border-left: none;
    }
  }
}
</style>
