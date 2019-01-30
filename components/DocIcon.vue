<template>
  <a :href="link" download>
    <div class="document">
      <div class="document__icon-wrap">
        <div class="file-icon" :data-type="type"></div>
      </div>
      <div class="document__text">
        <div class="document__name">
          {{name}}
        </div>
        {{size}}
      </div>
    </div>
  </a>
</template>

<script>
  export default {
    name: "DocIcon",
    props: ['type', 'size', 'name', 'link']
  }
</script>

<style scoped>
  .document {
    display: flex;
    margin-top: 10px;
    margin-left: 15px;
    font-size: 11px;
  }

  .document__icon-wrap {
    font-size: 0;
    margin-bottom: 9px;
    margin-right: 10px;
  }

  .file-icon {
    position: relative;
    width: 32px;
    height: 46px;
    border: 2px solid #000;
    border-radius: 1px;
  }

  .file-icon:before {
    font-size: 8px;
    position: absolute;
    right: -8px;
    bottom: 6px;
    display: inline-block;
    width: 26px;
    padding: 2px 1px 1px;
    content: attr(data-type);
    text-align: center;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid #fff;
    background-color: #000;
  }

  .file-icon:after {
    position: absolute;
    top: -2px;
    right: -2px;
    display: inline-block;
    width: 0;
    height: 0;
    content: '';
    border-width: 4px;
    border-style: solid;
    border-color: #fff #fff #000 #000;
  }

  .document__name {
    font-size: 12px;
    line-height: 21px;
    display: block;
    margin-bottom: 10px;
    transition: color .2s linear;
    text-decoration: underline;
    letter-spacing: -.28px;
    color: #d04802;
  }
</style>
