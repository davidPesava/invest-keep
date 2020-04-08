<template>
<div>
    <div id='example-3'>
        <div v-for="symbol in symbols">
            {{symbol}}
            <input type="checkbox"  :value="symbol" v-model="checked.symbols">
        
        </div>
        <input type="checkbox" id="jack" value="Jack" v-model="checked.symbols">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checked.symbols">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="true" v-model="checked.graph1">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checked }}</span>
    </div>
</div>

</template>

<script>


		export default {
                
                layout: 'app-layout',
				created: function () { 
					
				},
				methods: {
		
				},
				data() {
						return {
                            symbols: ["F","TWTR","R"],
                            checked: {
                                symbols: [],
                                graph1: false,
                            }
						}
				},
		}
</script>
