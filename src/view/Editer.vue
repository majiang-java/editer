<template>
	<div id="edit" class="content">
		<div class="conter">
			<el-row>
				 <el-tabs :active-name="activeName">
				    <el-tab-pane label="规则配置" name="first">规则配置</el-tab-pane>
				    <el-tab-pane label="源代码" name="second">源代码</el-tab-pane>
				    <el-tab-pane label="版本管理" name="third">版本管理</el-tab-pane>
				    <el-tab-pane label="数据对象" name="fourth">数据对象</el-tab-pane>
				  </el-tabs>
			</el-row>

			<el-row>
			  <el-col :span="24"><h5>如果</h5></el-col>
			</el-row>
			<el-row>
			     
			  		<el-button type="text" @click="dialogTableVisible = true">+添加条件</el-button>
				 
				<div id="subConditon">
					<singleline v-for="model in models" :id="index" :fields="model.fields" :modelname="model.modelname" v-on:opensubModel="fopensubModel" v-on:closemodel="closemodel" v-on:closefield="closefield" ><singleline>
				</div>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="cobol"><h5>那么</h5></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24">
				  <el-col :span="24">
			  		<el-button type="text" @click="dialogTableVisible = true">+添加动作</el-button>
				 </el-col>
			  </el-col>
			</el-row>
		</div>
		 <el-dialog title="创建条件" v-model="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false"  >
				  <el-form id="#create" :model="condition" :rules="rules" ref="create" label-width="100px">
				     	<el-alert
						    title="警告提示的文案"
						    type="warning">
						 </el-alert>
						 <div class="line"></div>
						   <el-select v-model="value" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
				  </el-form>
				  <div slot="footer" class="dialog-footer">
				      <el-button @click="dialogTableVisible = false">取 消</el-button>
				      <el-button type="primary" :loading="createLoading" @click="createBaseConditon">确 定</el-button>
				  </div>
			</el-dialog> 
			 <el-dialog title="创建模型子条件" v-model="submodelVisible" :close-on-click-modal="false" :close-on-press-escape="false"  >
				  <el-form id="#create" :model="currSubfield" :rules="rules" ref="create" label-width="100px">
				    	<h4>字段</h4>
					    <el-form-item label="别名">
						    <el-input v-model="currSubfield.args"></el-input>
						  </el-form-item>
						  <el-form-item label="字段名称">
						    <el-select v-model="currSubfield.field" placeholder="请选择活动区域">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						  </el-form-item>
						  <div class="line"></div>
						  	<h4>操作</h4>
						  <el-form-item label="操作符">
						    <el-select v-model="currSubfield.operation" placeholder="请选择活动区域">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						  </el-form-item>
						  <div class="line"></div>
						   <h4>值</h4>
						   <el-form-item  label="值">
							<el-radio class="radio" v-model="currSubfield.valueOps" label="1">字面值</el-radio>
								<el-radio class="radio" v-model="currSubfield.valueOps" label="2">表达式</el-radio>
							   </el-form-item>
								<el-form-item v-if="currSubfield.valueOps=='1'" label="字面值">
						      <el-input v-model="currSubfield.value"></el-input>
						   </el-form-item>
						   <el-form-item v-if="currSubfield.valueOps=='2'" label="@exp">
						      <el-input v-model="currSubfield.value"></el-input>
						   </el-form-item>				
				  </el-form>
				  <div slot="footer" class="dialog-footer">
				      <el-button @click="submodelVisible = false">取 消</el-button>
				      <el-button type="primary" :loading="createLoading" @click="createBaseConditon">确 定</el-button>
				  </div>
			</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import $ from 'webpack-zepto'
 	import singleline from '../components/Singleline.vue';

	export default{
		data: function(){
			return{
				e: '234',
				dialogTableVisible: false,
				condition: {
					type : ''
				},
				options: [{
		          value: '选项1',
		          label: 'Person'
		        }, {
		          value: '选项2',
		          label: 'LoanApp'
		        }, {
		          value: '选项3',
		          label: 'Inc'
		        }],
		        value: '',
		        conditionbtn : true,
		        actionbtn : true,
				createLoading : false,
				submodelVisible:false,
				models: [],
				model: {
					modelname: '',
					ifshow : '',
					fields :[]
				},
				currmodel:{
					modelname: ''
				},
				currSubfield:{
					args:'', //别名
					field : '',
					operation: '',
					value: '',
					valueOps: '1',
					exp:''
				},
				radio: '1',
				activeName: 'first'
			}
		},
		mounted: function(){
			this.models = [{id:1,modelname:'loanapp',
							fields: [{field: 'totalscore',
									 operation: '>=',
									 value: '12'},
									 {field: 'trimscore',
									 operation: '>=',
									 value: '12'}]
							},
						   {id:2,modelname:'pack',
							fields: [{field: 'totalscore',
									 operation: '>=',
									 value: '12'}]
							}];
		},
		methods: {
			createBaseConditon(){
				console.log('create');
				this.conditionbtn = false; 
				this.createLoading = false;
				this.dialogTableVisible = false;
				this.models.push(this.model);
			},
			fopensubModel:function(n){
				this.submodelVisible = true;
			},
			closemodel: function(modelname){
			 	this.models = this.models.filter(t => t.modelname != modelname)
			},
			closefield: function(field){
				let fields = this.models.fields;
				debugger;
				fields = fields.filter(t => t.field != field)
			}
		},
		components:{
			singleline
		}


	}

</script>
<style type="text/css">
	.line{
		border-top:1px dashed #000;
		margin:5px 0 5px 0;

	}
	.conter{
		margin-left:20px;
	}
</style>