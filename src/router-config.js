import index from './view/Index'
import home from './view/App'
import editor from './view/Editer'
export default [
	{
		path:'/',
        component:home,
        children: [
	        {
	          // 当 /user/:id/profile 匹配成功，
	          // UserProfile 会被渲染在 User 的 <router-view> 中
	          path:'',
	       	  component:editor,
	        }
        ]
    }
   
]