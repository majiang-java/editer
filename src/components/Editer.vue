<template>
	<div id="edit" class="content">
		<div class="conter">
			<el-row>
			  <el-col :span="24"><el-button type="text" @click="dialogPreVisible = true">+添加先决条件</el-button></el-col>
			</el-row>
			<preActionLine :actions="pushEle"></preActionLine>
			<el-row>
			  <el-col :span="24"><span class="b_label">如果</span></el-col>
			</el-row>
			<el-row>
			  	<el-button type="text" @click="openmodel">+添加条件</el-button>
				<div id="subConditon">
					<singleline v-for="(model,index) in models" :id="index" :fields="model.fields" :modelname="model.modelname" v-on:opensubModel="fopensubModel" v-on:updateSubField="updateSubField" v-on:closemodel="closemodel" v-on:closefield="closefield" ><singleline>
				</div>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="cobol"><span class="b_label">那么</span></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24">
				  <el-col :span="24">
			  		<el-button type="text" @click="actionlVisible = true">+添加动作</el-button>
			  		<actionline :actions="actions" v-on:opensub="openSubAction"></actionline>
				 </el-col>
			  </el-col>
			</el-row>
		</div>
		<!-- 先决条件对话框 -->
		 <el-dialog title="创建先决动作" v-model="dialogPreVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="resetPreAction">
			<el-form id="preaction" :model="preActionForm" :rules="prerules" ref="preActionForm" label-width="100px">
				 <el-form-item label="先决动作" prop="actionname">
				   <el-select v-model="preActionForm.actionname"  placeholder="请选择先决条件">
				    <el-option
				      v-for="item in elementData"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogPreVisible = false">取 消</el-button>
			    <el-button type="primary" :loading="createLoading" @click="createPreAction">确 定</el-button>
			</div>
		</el-dialog> 
		<!--  条件对话框 -->
		 <el-dialog title="创建条件" v-model="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="reset">
			<el-form id="condition" :model="conditionForm" :rules="createrules" ref="conditionForm" label-width="100px">
			 
						 <div class="line"></div>
						   <el-form-item label="别名" prop="modelargs">
						    <el-input v-model="conditionForm.modelargs" ></el-input>
						  </el-form-item>
						 <el-form-item label="模型名称" prop="modelname">
							   <el-select v-model="conditionForm.modelname"  placeholder="请选择活动区域">
							    <el-option
							      v-for="item in options"
							      :label="item.modelname"
							      :value="item.modelname">
							    </el-option>
							  </el-select>
						  </el-form-item>
						   <div class="line"></div>
						   <el-form-item label="条件逻辑" prop="logicFlag">
						   	    <el-select v-model="conditionForm.logicFlag"  placeholder="请选择逻辑运算符">
								    <el-option
								      v-for="logic in logicOption"
								      :label="logic.label"
								      :value="logic.value">
								    </el-option>
							  </el-select>
						  </el-form-item>
						  <p>{{conditionForm.logicFlag}}</p>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogTableVisible = false">取 消</el-button>
			    <el-button type="primary" :loading="createLoading" @click="createBaseConditon">确 定</el-button>
			</div>
		</el-dialog> 
			<!-- 子模型对话框 -->
		<el-dialog title="创建模型子条件" v-model="submodelVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="resetsub" >
					  <el-form id="currSubfield" :model="currSubfield" :rules="createSubFieldRules" ref="currSubfield" label-width="100px">
					  	  <h3>{{currSubfield.modelname}}</h3>
					  	  <div class="line"></div>
					    	<h4>字段</h4>
						    <el-form-item label="别名" prop="args">
							    <el-input v-model="currSubfield.args"></el-input>
							  </el-form-item>
							  <el-form-item label="字段名称" prop="field">
							    <el-select v-model="currSubfield.field" placeholder="请选择活动区域">
							      <el-option v-for="field in fields" :label="field.field" :value="field.field"></el-option>	     
							    </el-select>
							  </el-form-item>
							  <div class="line"></div>
							  	<h4>操作</h4>
							  <el-form-item label="操作符" prop="operation">
							    <el-select v-model="currSubfield.operation" placeholder="请选择活动区域" >
							      <el-option label="<=" value="<="></el-option>
							      <el-option label="<" value="<"></el-option>
							      <el-option label=">=" value=">="></el-option>
							      <el-option label=">" value=">"></el-option>
							      <el-option label="==" value="=="></el-option>
							    </el-select>
							  </el-form-item>
							  <div class="line"></div>
							   <h4>值</h4>
							   <el-form-item  label="值">
								<el-radio class="radio" v-model="currSubfield.valueOps" label="1">字面值</el-radio>
									<el-radio class="radio" v-model="currSubfield.valueOps" label="2">表达式</el-radio>
								   </el-form-item>
								<el-form-item v-if="currSubfield.valueOps=='1'" label="字面值" prop="value">
							      <el-input v-model="currSubfield.value"></el-input>
							   </el-form-item>
							   <el-form-item v-if="currSubfield.valueOps=='2'" label="@exp" prop="value">
							      <el-input v-model="currSubfield.value"></el-input>
							   </el-form-item>				
					  </el-form>
					  <div slot="footer" class="dialog-footer">
					      <el-button @click="submodelVisible = false">取 消</el-button>
					      <el-button type="primary" :loading="createLoading" @click="createSubFieldArea">确 定</el-button>
					  </div>
		</el-dialog>

		<el-dialog title="创建动作" v-model="actionlVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="resetAction" >
				<el-form id="action" :model="actionForm"  ref="actionForm" label-width="100px">
			 
					 <div class="line"></div>
					 <el-form-item label="插入模型" prop="insertmodel">
						   <el-select v-model="actionForm.insertmodel"  placeholder="请选择要插入的模型">
						    <el-option
						      v-for="item in options"
						      :label="item.modelname"
						      :value="item.modelname">
						    </el-option>
						  </el-select>
					  </el-form-item>
					   <div class="line"></div>
					  <el-form-item label="更新模型" prop="updatemodel">
					   	      <el-select v-model="actionForm.updatemodel"  placeholder="请选择要更新的绑定变量">
							    <el-option
							      v-for="item in argslist"
							      :label="item.args"
							      :value="item.mname">
							    </el-option>
						  </el-select>
					  </el-form-item>
				</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="actionlVisible = false">取 消</el-button>
			    <el-button type="primary" @click="createAction">确 定</el-button>
			</div>

		</el-dialog>

		<el-dialog title="创建动作字段" v-model="actionFieldlVisible" :close-on-click-modal="false" :close-on-press-escape="false"  >
				<el-form id="actionField" :model="actionFieldForm"  ref="actionFieldForm" label-width="100px">
			 		<h3>{{actionFieldForm.actionmodelname}}</h3>
					 <div class="line"></div>
				
						    <el-form-item label="字段名称" prop="field">
							    <el-select v-model="actionFieldForm.fieldname" placeholder="请选择活动区域">
							      <el-option v-for="field in fields" :label="field.field" :value="field.field"></el-option>	     
							    </el-select>
							  </el-form-item>
			
				</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="actionFieldlVisible = false">取 消</el-button>
			    <el-button type="primary" @click="createFieldAction">确 定</el-button>
			</div>

		</el-dialog>




	</div>
</template>

<script type="text/javascript">
	import $ from 'webpack-zepto'
 	import singleline from '../components/Singleline.vue';
 	import utils from '../lib/utils.js';
 	import staticDate from '../lib/static_data.js';
 	import preActionLine from '../components/PreActionLine.vue';
 	import actionline from '../components/actionline.vue'
 	//import formC from '../view/FormC.vue'
	export default{
		data: function(){
			return{
				actionlVisible: false,
				dialogTableVisible: false,
				dialogPreVisible: false,
				actionFieldlVisible: false,
				conditionForm: {
					modelname: '',
					modelargs: '',
					logicFlag: ''
				},
				preActionForm: {
					actionname: '',
					value: ''
				},
				options: [],
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
				prerules:{
				  actionname: [
                      { required: true, message: '请选择先决名称', trigger: 'change' }
                  ]
				},
				createrules: {
				  modelargs:[
				  	 { required: true, message: '请输入用户名', trigger: 'blur' },
                     { min: 3, max: 25, message: '长度在 3 到 25 个字符'}
				  ],
                  modelname: [
                      { required: true, message: '请选择模型名称', trigger: 'change' }
                  ],
                  modelname: [
                      { required: true, message: '请选择模型名称', trigger: 'change' }
                  ]
                },
                createSubFieldRules: {
                	args:[
                		{required:false, message: '请输入变量别名', trigger: 'blur'}
                	],
                	field:[
                		{required:true, message: '请选择别名', trigger: 'change'}
                	],
                	operation:[
                		{required:true, message: '请选择操作符号', trigger: 'change'}
                	],
                	value: [
                		{required:true, message: '请输入对应的值', trigger: 'blur'}
                	]

                },
				currmodel:{
					modelname: ''
				},
				currSubfield:{
					modelname: '',
					args:'', //别名
					field : '',
					operation: '',
					value: '',
					valueOps: '1',
					exp:''
				},
				actionForm:{
					insertmodel:'',
					updatemodel:''
				},
				actionField:{
					actionname:'',
					fields:[],
					type: ''
				},
				actionFieldForm:{
					actionmodelname: '',
					fieldname:'',
					value: ''
				},
				radio: '1',
				activeName: 'first',
				fields: [],
				datamodel: [],
				//元素数据
				elementData: [],
				pushEle:[],
				logicOption:[],
				//动作数据
				actions:[],
				//别名列表
				argslist:[]

			};
		},
		mounted: function(){
			this.datamodel = [{id:1,modelname:'loanapp',
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

			/*$.get("url",d =>{

			});*/
			this.elementData = staticDate.element; 
			//console.log(this.elementData);
			this.logicOption = staticDate.logicOption;
			this.options = this.datamodel;
		},
		methods: {
			//打来模型对话框
			openmodel: function(){
				this.conditionForm= {
					modelargs: '',
					modelname: ''
				};
				this.dialogTableVisible = true;
				
			},
			//保存模型对话框
			createBaseConditon: function(){
				this.$refs.conditionForm.validate((valid) => {
				//	debugger;
	                if (valid) {
						console.log('create');
						this.conditionbtn = false; 
						this.createLoading = false;
						this.dialogTableVisible = false;
					/*	this.datamodel.forEach(entry => {
							if(entry.modelname == this.model.modelname){
								this.models.push(entry);
							}
						});*/
						if(utils.contains(this.models,this.conditionForm.modelname)){
							this.$message.error('错了哦，元素重复了');
						}else{
							let temp = {};
							temp.modelname = this.conditionForm.modelname;
							temp.fields =[]
							//let temp = Object.assign(this.condition);
							this.models.push(temp);
						}
						let arvar = {};
						arver.mname = this.conditionForm.modelname;
						arver.args = this.conditionForm.args;
						argslist.push(arver);
					}else{
						return false;
					}
				});
				
			},
			fopensubModel:function(n){
				this.currSubfield = {
					modelname: '',
					args:'', //别名
					field : '',
					operation: '',
					value: '',
					valueOps: '1',
					exp:''
				};
				this.submodelVisible = true;
				this.fields = n.child;
				this.datamodel.forEach(entry => {
					if(entry.modelname == n.parent){
						this.fields = entry.fields;
					}
				});
				//this.$refs.currSubfield.resetFields();
				//this.currSubfield = {};
				this.currSubfield.modelname = n.parent;

			},
			closemodel: function(modelname){
			 	this.models = this.models.filter(t => t.modelname != modelname);
			 	this.argslist.forEach((entry,index) =>{
			 		if(entry.modelname == modelname){
			 			this.argslist.splice(index,1);
			 		}
			 	})
			},
			closefield: function(f){
				//let fields = this.models.fields;
				//fields = fields.filter(t => t.field != field)
				this.models.forEach((entry) => {
					if(entry.modelname === f.parent){

						//entry.fields = entry.fields.filter(t => t.field != f.child);
						entry.fields.forEach((e,index) =>{
								//console.log(entry.child);
							console.log(e.field);
							console.log(index);
							if(e.field === f.child){
								entry.fields.splice(index,1);
							}
						});
					}
				});
			},
			reset: function() {

                this.$refs.conditionForm.resetFields();
            },
            resetsub: function() {

                this.$refs.currSubfield.resetFields();
            },
            resetPreAction: function(){
            	this.$refs.preActionForm.resetFields();
            },
            resetAction: function(){
  				this.$refs.actionForm.resetFields();
            },
			createSubFieldArea: function(){
				this.$refs.currSubfield.validate((valid) =>{
					if(valid){
						this.models.forEach((entry) => {
							if(entry.modelname === this.currSubfield.modelname){
								if(utils.field_contains(entry.fields,this.currSubfield.field)){
									this.$message.error('错了哦，字段重复了');
								}else{
									let f = {};
									f.args = this.currSubfield.args;
									f.field = this.currSubfield.field;
									f.operation = this.currSubfield.operation;
									f.exp = this.currSubfield.exp;
									f.value = this.currSubfield.value;
									f.valueOps = this.currSubfield.valueOps;
									//if(!entry.fields) entry.fields = [];
									entry.fields.push(f);
								}
							}
						});
						this.submodelVisible = false;
					}else{
						return false;
					}
				
				});
			},
			updateSubField: function(field){

					this.currSubfield.modelname = field.modelname;
					this.currSubfield.args = field.args;//别名
					this.currSubfield.field = field.field;
					this.currSubfield.operation = field.operation;
					this.currSubfield.value = field.value;
					this.currSubfield.valueOps = field.valueOps;
					this.currSubfield.exp= field.exp;
					this.submodelVisible = true;
			},
			createPreAction: function(){
				let f = {};
				f.actionname =  this.preActionForm.actionname;
					switch(f.actionname){
					  case "no-loop":
					  		f.which_to_show = 'first';
					  		break; 
					  case "salience":
					  		f.which_to_show = 'second';
					 		break; 
					  case "date-effective":
					  		f.which_to_show = 'third';
					  		break; 
					  case "date-expires":
					  		f.which_to_show = 'third'; 
							break; 
					  case "agenda-group":
					  		f.which_to_show = 'second';
					 		break; 
					  case "activation-group":
					  		f.which_to_show = 'second';
					  		break; 
					  case "duration":
					  		f.which_to_show = 'second';
					  		break; 
					  case "timer":
					  		f.which_to_show = 'second';
					  		break; 
				      case "calendars":
					  		f.which_to_show = 'second';
					  		break; 
					  case "lock-on-active":
					  		f.which_to_show = 'first';
					  		break; 
					  case "ruleflow-group":
					  		f.which_to_show = 'second';
					  		break; 
					  case "dialect":
					  		f.which_to_show = 'second';
					  		break;
				}
				f.value = '';
				this.pushEle.push(f);
				this.dialogPreVisible = false;
			},
			createAction:function(){		
				
				if(this.actionForm.insertmodel){
					let f = {};
					f.actionmodelname = this.actionForm.insertmodel;
					f.type = 'insert';
					f.fields = [];
					this.actions.push(f);
				}
				if(this.actionForm.updatemodel){
					let f = {};
					f.actionmodelname = this.actionForm.updatemodel;
					f.type = 'update';
					f.fields = [];
					this.actions.push(f);
				}
				this.actionlVisible = false;

			},
			createFieldAction: function(){
				this.actions.forEach(entry =>{
					if(entry.actionmodelname == this.actionFieldForm.actionmodelname){
						var f = {};
						f.fieldname = actionFieldForm.fieldname;
						f.value = actionFieldForm.value;
						entry.fields.push(f);
					}
				});
			},
			openSubAction: function(action){
				//debugger;
				this.actionFieldlVisible = true;
				this.actionFieldForm. actionmodelname= action.actionmodelname;
				this.datamodel.forEach(entry => {
					if(entry.modelname == action.actionmodelname){
						this.fields = entry.fields;
					}
				});
			}

		},
		components:{
			singleline,
			preActionLine,
			actionline
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
	.b_label{
	    font-size: 22px;
    	font-weight: 400;
	}
</style>