<template>
  <component
    :is='component'
    v-bind='linkProps'
    :class='classes'
    :type='type'
    :disabled='disabled'
    :aria-disabled='disabled'
  >
    <template v-if='isDefaultShape'>
      <span class='ui-button__label'>
	      {{label}}
      </span>
    </template>
  </component>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type Variant = 'primary' | 'attention' | 'secondary';

interface Props {
  variant?: Variant;
  shape?: 'default' | 'icon' | 'circle-icon';
  type?: HTMLButtonElement['type'];
  pending?: boolean;
  label?: string;
  href?: string;
  to?: string;
  disabled?: boolean;
  flat?: boolean;
  outline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  shape: 'default',
  type: 'button',
  disabled: false,
  label: undefined,
  href: undefined,
  to: undefined
})

const component = computed(() =>
  props.to ? RouterLink : props.href ? 'a' : 'button'
)

const linkProps = computed(() =>
  props.to ? { to: props.to } : { href: props.href }
)

const type = computed(() => (props.href || props.to ? null : props.type))
const disabled = computed(() => props.disabled || props.pending)
const isDefaultShape = computed(() => props.shape === 'default')

const classes = computed(() => [
  'ui-button',
  `ui-button--${props.variant}`,
  `ui-button--${props.shape}`,
])
</script>

<style lang='scss' scoped>
.ui-button {
  width: 100%;
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  transition: all 0.2s ease;
  
  border-radius: 4px;
  
  &:active:not(:disabled) {
    opacity: 0.7;
  }
  
  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.7;
  }
  
  &--primary {
    background-color: #4B6EB9;
    color: white;
  }
  
  &--secondary {
    background-color: #874BAD;
    color: white;
  }
  
  &--attention {
    background-color: #E63246;
  }
}
</style>
