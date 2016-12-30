<template>
	<div>
		<el-row v-for="action in actions" :actionname="action.actionname">
			 <el-col :span="24">
			 	<div class="element">
				 	<span>{{action.actionname}}</span><span class="mf-5">
				 	<!-- <component v-bind:is="action.which_to_show"></component> -->
				 	<el-checkbox v-if="action.which_to_show=='first'" v-model="action.value" checked></el-checkbox>
				 	<el-input v-if="action.which_to_show=='second'" v-model="action.value" class="inline-input" size="small" placeholder="请输入内容"></el-input>
				 	<el-date-picker v-if="action.which_to_show=='third'" v-model="action.value" type="date" placeholder="选择日期" ></el-date-picker>
				 </span> <span class="mf-5"><el-button type="text" @click="del(action)">x</el-button></span>
				 </div>
			 </el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	import $ from 'webpack-zepto'

	export default {

		data: function(){
			return{
				which_to_show: '',
				acitonname: '',
				value:''
			};
		},
	
		props:{
			actionname: String,
			actions:Array
		},
		methods:{
			del: function(action){
				//actions.splice()
				this.actions.forEach((entry,index)=>{
					if(entry.actionname == action.actionname)
						this.actions.splice(index,1);
				});
			}
		},
		components:{
			'first': { //第一个子组件 
				template: '<el-checkbox v-model="value" checked></el-checkbox>'
			}, 
			'second': {
				template: '<el-input v-model="value" class="inline-input" size="small" placeholder="请输入内容"></el-input>'
			},
			'third':{
				template: '<el-date-picker v-model="value" type="date" placeholder="选择日期" ></el-date-picker>'
			}


		}
		
	}
</script>
<style type="text/css">
	.mf-5{
		margin-left: 5px;
		display: inline-block;
	}
	.element{
		margin:3px 0 3px 5px;
		font-size: 15px;
	}
	/* .el-input{
		width: 250px;
	} */
</style>
