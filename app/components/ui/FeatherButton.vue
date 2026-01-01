<template>
  <UButton
    v-bind="buttonProps"
    :class="[buttonClasses, $attrs.class]"
  >
    <slot />
  </UButton>
</template>

<script setup lang="ts">
// Define the props interface based on Nuxt UI Button documentation
interface Props {
  // Button-specific props
  label?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  activeColor?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  activeVariant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  square?: boolean
  block?: boolean
  
  // Loading props
  loading?: boolean
  loadingAuto?: boolean
  loadingIcon?: string
  
  // Icon props
  icon?: string
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  
  // Avatar props
  avatar?: object
  
  // Link props
  to?: string
  target?: string
  
  // HTML button props
  autofocus?: boolean
  disabled?: boolean
  name?: string
  type?: 'button' | 'submit' | 'reset'
  
  // Custom feather variant prop
  featherVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

// Set up props with defaults
const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'solid',
  size: 'md',
  type: 'button',
  featherVariant: 'primary'
})

// Pass all props to UButton except our custom featherVariant
const buttonProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { featherVariant, ...uButtonProps } = props
  return uButtonProps
})

// Compute classes based on featherVariant
const buttonClasses = computed(() => {
  const featherVariantClasses = {
    primary: 'feather-button text-white font-medium hover:shadow-lg',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white font-medium hover:shadow-lg',
    outline: 'border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-600 hover:text-white font-medium',
    ghost: 'text-purple-600 bg-transparent hover:bg-purple-100 font-medium'
  }
  
  return featherVariantClasses[props.featherVariant] || featherVariantClasses.primary
})

// Configure attribute inheritance - exclude class to handle it manually
defineOptions({
  inheritAttrs: false
})
</script>