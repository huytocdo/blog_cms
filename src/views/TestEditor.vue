<template>
  <medium-editor 
    v-model="content"
    :readOnly="false"
    :prefill="defaultValue"
    :options="options"
    :onChange="onChange"
    ></medium-editor>
</template>

<script>
export default {
  data() {
    return {
      content: ``,
      defaultValue: `<h1>Tiêu đề bài viết</h1>
      <p>Nội dung bài viết</p>`,
      options: {
        uploadUrl: "http://localhost:3000/v1/upload/image"
      }
    }
  },
  methods: {
    onChange() {
      // eslint-disable-next-line no-console
      console.log("change", this.content)
    }
  }
}
</script>

<style>

</style>