<template>
	<el-row>
	  <el-col :span="24">
	  	 	{{idx}} 存在<el-button type="text" @click="open">{{modelname}}</el-button> <span class="mf-5"><el-button type="text" @click="closemodel()">x</el-button></span>
	  	 	<div class="fieldTag">
	  	 		<ul >
	  	 			<li v-for="field in fields" @click="updateSubField(field)">
	  	 				<span>{{field.field}}</span> <span>{{field.operation}}</span>  <span>{{field.value}}</span><span class="mf-5"><el-button type="text" @click="closefield(field.field)">x</el-button></span>
	  	 			</li>
	  	 		</ul>
	  	 	</div>
	  </el-col>
	</el-row>
</template>

<script type="text/javascript">
	export default{
		props:{
			'idx': String,
			'modelname': String,
			'fields': Array
		},
		methods:{
			open(){
				let convue = {parent:this.modelname,child:this.fields};
				this.$emit("opensubModel",convue);
			},
			closemodel(){
				this.$emit("closemodel",this.modelname);
			},
			closefield(field){
				this.$emit("closefield",{parent:this.modelname,child:field});
			},
			updateSubField: function(field){
				console.log(field);
				this.$emit("updateSubField",field);
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