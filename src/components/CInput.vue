<template>
  <div class="c-input">
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
    id: {
      type: Number,
      required: true,
    },
    isNamed: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["input-caption", "input-price"],
};
</script>

<style lang="scss">
.c-input {
  input {
    padding: 3px;
    border: none;

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 1px orange;
    }
  }

  input:first-child {
    border-radius: 0;
    border-right: 1px solid grey;
  }
}
</style>
