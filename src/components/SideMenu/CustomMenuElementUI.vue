<script>
import { Menu } from 'element-ui';
export default {
  extends: Menu,
  props: ['hoverBackgroundColor'],
  computed: {
    hoverBackground: function hoverBackground() {
      return this.hoverBackgroundColor ? this.hoverBackgroundColor : this.backgroundColor ? this.mixColor(this.backgroundColor, 0.2) : '';
    },
  }
}
</script>

<style>

</style>