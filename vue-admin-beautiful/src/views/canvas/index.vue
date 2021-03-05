<template>
  <div>
    <img
      src="http://39.101.161.231/images/ticket.png"
      v-show="false"
      id="img"
    />
    <canvas
      class="hideCanvas"
      style="width: 750px; height: 312px; overflow: scroll"
      id="ticket_id"
    ></canvas>
  </div>
</template>
<script>
  export default {
    async mounted() {
      var c = document.getElementById('ticket_id')
      var ctx = c.getContext('2d')
      ctx.fillStyle = '#FFFFFF'
      //   ctx.fillRect(0, 0, 375 * 2, 156 * 2)
      let img = document.getElementById('img')
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 2431, 1016, 0, 0, 375, 156)

        ctx.font = 'bold 150px'
        ctx.fillStyle = '#bf073e'
        ctx.fillText('湖人', 40, 127.5)
        ctx.fillText('篮网', 100, 127.5)
      }

      //   ctx.setFontSize(24)
      //   ctx.setFillStyle('#bf073e')
      //   ctx.setTextBaseline('middle')
      //   ctx.setTextAlign('center')
    },
    methods: {},
  }
</script>
