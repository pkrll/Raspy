<template>
  <div id="loading-splash-view">
    <div id="spinner"></div>
    <div>{{textElement}}</div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: ['textElement'],
}
</script>

<style scoped>
#loading-splash-view {
  font-size:        4vw;
  display:          flex;
  flex-grow:        1;
  align-items:      center;
  justify-content:  center;
  flex-direction:   column;
  margin: 				  50px 0;
}

#spinner {
  border: 				16px solid #fff;
  border-top: 		16px solid rgb(82, 172, 120);
  border-radius: 	50%;
  width: 					120px;
  height: 				120px;
  animation: 			spin 2s linear infinite;
}

@keyframes spin {
  0% 	 { transform: rotate(0deg); 	}
  100% { transform: rotate(360deg); }
}
</style>
