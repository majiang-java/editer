<template>
	<div>
		<el-row v-for="action in actions" :actionname="action.actionmodelname">
				  <el-col :span="24">
				  	 	<span v-if="action.type=='insert'">插入</span><span v-if="action.type=='update'">更新</span><el-button type="text" @click="opensub(action)">{{action.actionmodelname}}</el-button> <span class="mf-5"><el-button type="text" @click="closemodel()">x</el-button></span>
				  	 	<div class="fieldTag">
				  	 		<ul >
				  	 			<li v-for="field in actions.fields" @click="updateSubField(field)">
				  	 				<span>{{field.fieldname}}</span>  <span>{{field.value}}</span><span class="mf-5"><el-button type="text" @click="closefield(field)">x</el-button></span>
				  	 			</li>
				  	 		</ul>
				  	 	</div>
				  </el-col>
		
		</el-row>
	</div>
	
</template>

<script type="text/javascript">
	export default{
		data: function(){
			return{

			};
		},
		props:{
			actions: Array
		},
		methods:{
			closemodel: function(){

			},
			opensub: function(action){
				//debugger;
				this.$emit("opensub",action);
			}
		}

	}

</script>

<style type="text/css">
	.fieldTag{
		margin:0px 0px 5px 20px;
		display:block;
	}
	.fieldTag ul{
		list-style: none;
		padding:0;
		margin:0;
	}
	.fieldTag ul li{
		display: block;
		min-height: 36px;
		line-height: 36px;
		padding: 2px 0 0 2px;
		color:#20a0ff;
		cursor:pointer;
	}
	.mf-5{
		margin-left: 5px;
	}
</style>