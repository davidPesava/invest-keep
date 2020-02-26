<template>
	<div>
       <div v-for="test in poleA">
           <div>{{test.name}}</div>
           <div v-for="company in test.history">
               <div><pre>{{company}}</pre></div>
           </div>
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
                            poleA: [ // chatHistoryData
                                { //outer helper
                                    name: "company",
                                    history: [
                                         [7, 30, 0],
                                         [17, 30, 0]
                                    ]
                                },
                                {
                                    name: "company",
                                    history: [
                                         [7, 30, 0],
                                         [17, 30, 0]
                                    ]
                                }                               
                            ],
						}
				},
		}
</script>
