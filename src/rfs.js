'use strict';

//引入外部依赖
import relationship from './lib/relationship';

let callName, sex,
	handlers = {
		//配置欢迎词
		"ROKID.INTENT.WELCOME": function () {
			try {
				this.setTts({tts: WELCOME_TTS}),
					this.emit(":done")
			} catch (s) {
				this.emit(":error", s)
			}
		},
		//根据用户命中词，与用户进行交互；
		//此处注意session的保存，否则无法识别用户最初的用意
		relativeConfirm: function () {
			callName = Rokid.param.request.content.sentence.replace("叫什么", ""),
				console.log(callName);
			try {
				//设置session内容
				this.setSession({
					sessionKey: {
						call: callName
					}
				});
				console.log("成功第一步"),
					this.setTts({tts: "请问你的性别是？"}),
					//设置交互，注意confirmIntent对应语音交互中的 "intent": "whichSex",
					// 因为用户接下来的回复是匹配此意图;confirmSlot对应语音交互中的"name": "sex1",而不是"type": "sexList"；
					this.setConfirm({
						confirmIntent: "whichSex",
						confirmSlot: "sex1",
						retryTts: "匹配错误,请重试"
					}),
					this.emit(":done")
			} catch (s) {
				this.emit(":error", s)
			}
		},
		//当用户成功回答问题后，进入识别阶段，此时需要用到session中存储的字段
		whichSex: function () {
			console.log('进入识别');
			var sex2 = Rokid.param.request.content.sentence;
			//获取session的内容
			var session = Rokid.param.session.attributes.sessionKey.call;
			console.log(Rokid.param.session.attributes.sessionKey.call);
			if (sex2.indexOf('男') > 0) {
				sex = 1
			}
			if (sex2.indexOf('女') > 0) {
				sex = 0
			}

			let s = {text: session, sex: sex};
			try {
				console.log("success");
				console.log(session, sex);
				let f = relationship(s);
				let d = f.toString();
				console.log(f.toString());
				//返回结果
				this.setTts({tts: session + '叫' + d}),
					this.emit(":done")
			} catch (s) {
				this.emit(":error", s)
			}
		},
		"ROKID.INTENT.EXIT": function () {
			try {
				console.log("技能退出成功"), this.emit(":done")
			} catch (s) {
				this.emit(":error", s)
			}
		}
	};
exports.handler = function (event, context, callback) {
	var rokid = Rokid.handler(event, context, callback);
	rokid.registerHandlers(handlers);
	rokid.execute();
};