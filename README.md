# 认亲大师
------
根据用户语音输入结果返回相应的称谓，最多支持8层嵌套关系，需要二次交互判断使用人的性别，引入外部依赖，使用rollupjs打包压缩。涉及大量自定义词表内容，已整理好放在`template.txt`文件中；

------
# 入口词
------
> * "若琪，打开认亲大师"
> * "若琪，爸爸的爸爸叫什么"
> * "若琪，妈妈的妈妈叫什么"
> * "若琪，妈妈的妈妈的爸爸的儿子叫什么"

------
# 若琪询问
------
> 请问你的性别是？

此时你需要回复若琪你的性别

> 男性 / 女性

------
# 功能
------
- [x] 亲戚计算器
- [x] 支持8层关系嵌套
- [ ] 《爸爸的爸爸叫什么》儿歌

------
# 技能打包
------
这里要感谢 [@xqbumu](https://github.com/RokidSkills/notepad-nodejs)的模板让我可以放肆的引入外部依赖，我在他的基础上简化了一下，只选取了我需要的部分；改项目使用rollup工具打包，谢谢rokid开发以及运维组的帮助与支持；同时也感谢[@mumuy](https://github.com/mumuy/relationship)的亲戚关系计算器依赖，让我省了很多的时间去处理逻辑问题；

------
# 打包工具安装
------
## 全局安装rollup

      npm install -g rollup

## 下载项目

     git clone git@github.com:gengchen528/rokid-rollupjs.git
     cd rokid-roullpjs
     npm install
## 打包

打包完成后会生成`dist`文件夹，里面的rfs.js即为打包后的文件

      cd rokid-roullpjs
      npm run build



------
# 文件释义
------
| 文件名        | 说明        |
| :--------:    | :--------:  |
| intends.json  | 语音交互定义|
| frs.js        | 服务定义    |
|template.txt   | 自定义词表模板|

------
# 开发过程
------
## 用户意图定义
### 词表内容
**sexList**
> * 男人
> * 男生
> * 男孩
> * 男性
> * 男
> * 小男孩
> * 大男人
> * 小男人
> * 大女人
> * 小女人
> * 小女孩
> * 女
> * 女性
> * 女人
> * 女孩
> * 女生

**callTemplate**
直接导入`template.txt`文件
