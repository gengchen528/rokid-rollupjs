'use strict';

import relationship from './lib/relationship';

let callName;
let sex;
let handlers = {
	'ROKID.INTENT.WELCOME':function() {
		try {
			this.setTts({tts:WELCOME_TTS});
			this.emit(':done');
		} catch (e) {
			this.emit(':error', e);
		}
	},
	'relativeConfirm':function() {
		callName = Rokid.param.request.content.sentence.replace('叫什么','');
		console.log(callName);
		try {
			console.log('成功第一步');
			this.setTts({tts:'请问你的性别是？'});
			this.setConfirm({
				confirmIntent: 'sex',
				confirmSlot: 'sex1',
				retryTts: '请重试'
			});
			this.emit(':done')
		} catch (e) {
			this.emit(':error', e);
		}
	},
	'sex':function(){
		sex = Rokid.param.request.content.sentence;
		if(sex.indexof('男')>0){
			sex=1;
		}else if(sex.indexof('女')>0){
			sex=0;
		}
		let options = {
			text:callName,
			sex:sex
		};
		try {
			let resTts=relationship(options);
			this.setTts({tts:resTts});
			console.log('success');
			this.emit(':done')
		} catch (e) {
			this.emit(':error', e);
		}
	},
	'ROKID.INTENT.EXIT':function() {
		try {
			console.log('技能退出成功');
			this.emit(':done');
		} catch (e) {
			this.emit(':error', e);
		}
	}
}

// 响应事件注册
exports.handler = function (event, context, callback) {
	appMain.init(event, context, callback);
	appMain.registerHandlers(handlers);
	appMain.execute();
};
