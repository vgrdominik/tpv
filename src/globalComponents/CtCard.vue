<template>
  <v-card v-if="type !== 'empty'" :shaped="type === 'shaped'" :rounded="type === 'rounded'" :tile="type === 'tile'" v-on="$listeners" v-bind="$attrs">
    <v-toolbar flat :color="titleColor">
      <slot name="leftTitleContent" />

      <v-spacer />
      <slot name="centerTitleContent">
        <v-toolbar-title style="color: white;" v-html="title" />
      </slot>
      <v-spacer />

      <slot name="rightTitleContent" />
    </v-toolbar>
    <slot v-if="fluid" />
    <v-container v-else>
      <slot />
    </v-container>
  </v-card>
  <v-card v-else v-on="$listeners" v-bind="$attrs">
    <slot />
  </v-card>
</template>

<script type="application/javascript">
export default {
  name: "CtCard",

  props: {
    'type': {
      type: String,
      default: 'shaped',
      validator: function (value) {
        // The value must match one of these strings
        return ['shaped', 'rounded', 'tile', 'empty'].indexOf(value) !== -1
      }
    },
    'title': {
      type: String,
      default: '',
    },
    'title-color': {
      type: String,
      default: 'primary',
    },
    'fluid': {
      type: Boolean,
      default: false,
    },
  },
}
</script>
