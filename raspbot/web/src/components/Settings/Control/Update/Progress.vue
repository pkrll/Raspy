<template>
  <div id="container">
    <div class="heading">{{textElement}}</div>
    <div id="progress">
      <div :class="downloadStatus | statusClass">Downloading</div>
      <div :class="installationStatus | statusClass">Installing</div>
    </div>
    <div id="console">
      <div>
        <pre v-for="log in logs">{{log}}</pre>
      </div>
    </div>
  </div>
</template>

<script>

export default {
	name: "Progress",
  props: ["textElement", "downloadStatus", "installationStatus", "logs"],
  filters: {
    statusClass: function(value) {
      if (value == 0) return 'waiting';
      if (value == 1) return 'inprogress animation';
      if (value == 2) return 'done';
      if (value == 3) return 'error';
    }
  }
}
</script>

<style scoped src="@/components/Settings/Control/Update/update.css"></style>
<style scoped>
#container {
  flex-grow: 1;
  max-height: 100%;
  max-width: 100%;
}

#progress {
  margin-top: 20px;
  padding: 10px;
  font-size: 5vw;
}

.waiting {
  color: grey;
}

.done {
  color: green;
}

.inprogress {
  color: yellow;
}

.error {
  color: red;
}

.animation {
   -webkit-animation: flicker 1.5s ease-in-out infinite;
      -moz-animation: flicker 1.5s ease-in-out infinite;
        -o-animation: flicker 1.5s ease-in-out infinite;
           animation: flicker 1.5s ease-in-out infinite;
}

#console {
  background: #000;
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  text-align: left;
}

#console pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

#console > div {
  padding: 5px 20px;
}

</style>
