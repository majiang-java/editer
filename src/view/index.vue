<template>
	<el-row>
		 <el-tabs :active-name="activeName">
		    <el-tab-pane label="规则配置" name="first"><editer></editer></el-tab-pane>
		    <el-tab-pane label="源代码" name="second"><source></source></el-tab-pane>
		    <el-tab-pane label="版本管理" name="third">版本管理</el-tab-pane>
		    <el-tab-pane label="数据对象" name="fourth">数据对象</el-tab-pane>
		  </el-tabs>
	</el-row>
</template>

<script type="text/javascript">
	import editer from '../components/Editer'
	import source from '../components/source'

	 export default{
		data:function(){
			return{
				activeName:'first'
			}
		},
		components:{
			editer,source
		}
	}
</script>