<template>
  <div class="pi-play-{{kebabCaseComponentName}}">

  </div>
</template>
<script>
import { createNamespaceStr } from '../utils';

const { name } = createNamespaceStr('{{kebabCaseComponentName}}');
const IMG = require('./img').IMG;
export default {
  name
};
</script>
