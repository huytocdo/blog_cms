<template>
<div>
  <h2>Thumbnail</h2>
  <div class="upload-picture-card" :class="{'is-error': isError}">
    <label v-if="!previewImg" class="upload-picture-button">
      <i class="el-icon-plus"></i>
      <input type="file" @change="inputChangeHandler" ref="fileInput">
    </label>
    <div v-if="previewImg" class="preview-image-card">
      <img :src="previewImg" />
      <div class="overlay">
        <!-- <button @click="zoomHandler"><i class="el-icon-zoom-in"></i></!--> 
        <label class="edit-picture-button">
          <i class="el-icon-edit"></i>
          <input type="file" @change="inputChangeHandler" ref="fileInput">
        </label>
        <button @click="deleteFileHandler"><i class="el-icon-delete"></i></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ["file", "isError"],
  data() {
    return {
      previewImg: '',
    }
  },
  watch: {
    file: function(newFile) {
      if(!newFile) return this.previewImg = '';
      if(typeof newFile === 'string') return this.previewImg = newFile;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImg = e.target.result;
      }
      reader.readAsDataURL(newFile);
    }
  },
  methods: {
    inputChangeHandler(e) {
      const input = this.$refs.fileInput;
      if(input.files && input.files[0]) {
        const file = input.files[0];
        this.$emit('fileChange', file)
      }
    },
    deleteFileHandler() {
      this.previewImg = '';
      this.$emit('fileChange', null)
    }
  }
}
</script>

<style scoped>
  .upload-picture-card {
    width: 160px;
  }
  .upload-picture-card.is-error {
    border: 1px dashed red;
  }
  .upload-picture-card img {
    width: 100%;
    height: auto;
  }
  .preview-image-card {
    position: relative;
  }
  .preview-image-card .overlay {
    position: absolute;
    background-color: rgba(0,0,0,.8);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    opacity: 0;
    transition: opacity .4s;
  }
  .preview-image-card:hover .overlay {
    opacity: 1;
  }
  .preview-image-card .overlay button,
  .preview-image-card .overlay label {
    margin: 0px 5px;
    background: none;
    border: none;
    color: #eee;
    font-size: 20px;
    cursor: pointer;
  }
  .preview-image-card .overlay label.edit-picture-button input[type="file"] {
    display: none;
  }
  .preview-image-card .overlay button:focus,
  .preview-image-card .overlay button:active {
    outline: none;
  }
  .upload-picture-button {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 160px;
    height: 160px;
    cursor: pointer;
    line-height: 158px;
    vertical-align: top;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .upload-picture-button:hover,
  .upload-picture-button:focus {
    border-color: #409eff;
    color: #409eff;
  }
  .upload-picture-button input[type="file"] {
    display: none;
  }
  .upload-picture-button i {
    font-size: 28px;
    color: #8c939d;
  }
</style>