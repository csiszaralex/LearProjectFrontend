<template>
  <div class="input-div">
    <fa-layers full-width class="fa-2x">
      <fa-icon :icon="icon" />
    </fa-layers>
    <div>
      <h2 class="selection-none"><slot /></h2>
      <select ref="input" v-model="data" class="input form-control" @focus="focus" @blur="blur">
        <option v-for="num in nums" :key="num" :value="num">
          {{ values[num] ? values[num] : num }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  name: 'BaseSelect',
  props: {
    modelValue: { type: [Number, String], required: true },
    icon: { type: [Array, String], default: 'at' },
    nums: { type: Number, required: true },
    values: { type: Array, required: true },
    def: { type: [String, Number], default: '' },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const data = ref(props.modelValue ? props.modelValue : '');
    watch(data, () => {
      context.emit('update:modelValue', data.value);
    });
    watch(props, () => {
      data.value = props.modelValue;
    });

    function focus(e) {
      let parent = e.target.parentNode.parentNode;
      parent.classList.add('focus');
    }
    function blur(e) {
      let parent = e.target.parentNode.parentNode;
      if (e.target.value != props.def) parent.classList.remove('focus');
    }

    return { data, focus, blur };
  },
  mounted() {
    // if (this.$refs['input'].value !== '') this.check({ target: this.$refs['input'] });
    this.$refs['input'].parentNode.parentNode.classList.add('focus');
  },
};
</script>

<style lang="scss" scoped>
$szin1: darken($primary, 10%);
$h2szin: $dark;
$feher: $light;
$fail: $danger;
$okay: $success;

.input-div {
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 10% 85% 5%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #ccc;
  width: 40vw;
  &:after,
  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 50%;
    height: 2px;
    background-color: $okay;
    transition: 0.3s;
  }
  &:after {
    right: 50%;
  }
  &:before {
    left: 50%;
  }
  &.focus {
    &:after,
    &:before {
      width: 50%;
      background-color: $szin1;
    }
    .fa-layers {
      color: $szin1;
    }
  }
  .fa-layers {
    display: flex;
    color: $okay;
    justify-content: center;
    align-items: center;
    width: 100%;
    em {
      color: $h2szin;
      transition: 0.3s;
    }
  }
  & > div {
    position: relative;
    height: 45px;
    h2 {
      position: absolute;
      left: 10px;
      top: -10px;
      transform: translateY(-50%);
      color: $h2szin;
      font-size: 15px;
      transition: 0.3s;
    }
    .input {
      position: absolute;
      appearance: none;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border: none;
      background: none;
      padding: 0.5rem;
      font-size: 1.2rem;
      color: $h2szin;
      outline: none;
      & option {
        background-color: $light;
      }
    }
  }
  @media screen and (max-width: 768px) {
    width: 80vw;
  }
}
</style>
