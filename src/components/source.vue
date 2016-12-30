<template>
    <div>
	   <pre v-html="sourcecode"></pre>
    </div>
</template>
<script type="text/javascript">
	 export default{
		data:function(){
            return{
                sourcecode:'private static Logger logger = Logger.getLogger(AntifraudInvoker.class); private static final String NULLVALUE = "无";   private Map<String,Object> hmcreate = new ConcurrentHashMap<String,Object>() ;'
            }
		}
	}
</script>
<style type="text/css">
	
	pre, code {
        display: block;
        background: none repeat scroll 0 0;
        background-color: #555555;
        border-radius:4px 4px 4px 4px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 10px inset;
        clear: both;
        font-family: 'Consolas', 'Courier', 'Monaco', monospace;
        color: #fff;
        /*background-color: #f8f8f8;*/
        margin: 5px 0px;
        overflow: auto;
        padding: 10px;
        white-space: pre;
        /*text-indent: 1em;*/
    }
</style>