/*
tgchannel：https://t.me/ZhiYi_Script
github：https://github.com/ZhiYi-N/script
boxjs：https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/ZhiYi-N.boxjs.json
转载留个名字，谢谢
邀请码：7672016831
谢谢
作者：执意ZhiYi-N
#签到界面或者签到详情
#读书任务可以完成，时长上传没做好，广告偶尔可以
[mitm]
hostname = *.snssdk.com
#圈x
[rewrite local]
luckycat/novel/v1/task/sign_in/* url script-request-header https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/FQXS1.js


#loon
http-request luckycat/novel/v1/task/sign_in/* script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/FQXS1.js, requires-body=true, timeout=10, tag=🍅番茄小说


#surge
🍅番茄小说 = type=http-request,pattern=luckycat/novel/v1/task/sign_in/*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/FQXS1.js,script-update-interval=0

*/

const zhiyi = '🍅番茄小说'
const $ = Env(zhiyi)
const notify = $.isNode() ?require('./sendNotify') : '';
let status,no;
status = (status = ($.getval("fqxsstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const fqxsurlArr = ['&_request_from=web&ip=192.168.68.200&caid1=ff9212c8b48bfb3617081759701b9d55&version_code=410&app_name=novelapp&vid=943E198D-3DDF-4CE0-B247-251541A20930&device_id=3747551210666765&channel=App%20Store&resolution=750*1334&aid=1967&version_name=4.1.0.32&update_version_code=41032&gender=2&cdid=847D23DA-1A05-4511-9964-88A19FBF1EF3&idfv=943E198D-3DDF-4CE0-B247-251541A20930&ac=wifi&os_version=12.5.1&ssmix=a&ab_sdk_version=&caid2=&device_platform=ipad&iid=387464260496088&device_type=iPad%20Mini%20Retina&idfa=2F85DC28-DD9D-4EE5-9E3C-408FF5E6A5CA'],fqxsArr = ['{"x-Tt-Token":"00a3e33b122eeffe07cf6d4be243512465059d53bb7d4af4ad5a314fa5324305ccaae14d76b6c985ebb2e18c7f77575da089600522f9aa6db76207f4d41d5cb767fdf1b85cab1983cce2143aa7b7783a6f016d4bde0a5797f5c046c3b0808ab02edc7-1.0.1","x-tt-trace-id":"00-5b1f43c20dd5060c2b07b0d73af307af-5b1f43c20dd5060c-01","X-Tyhon":"+nGou+d9vqDpf96W83SduoB9uK7GUKuG4HWuwNE=","sdk-version":"2","Host":"i.snssdk.com","Accept-Encoding":"gzip, deflate","X-Gorgon":"840420620000609202388147550027557280070c97839d0c9daa","x-vc-bdturing-sdk-version":"2.0.0","X-Khronos":"1616436478","User-Agent":"Reading 4.1.0 rv:4.1.0.32 (iPad; iOS 12.5.1; zh_CN) Cronet","passport-sdk-version":"5.13.3","Connection":"keep-alive","Cookie":"excgd=20210323; install_id=387464260496088; ttreq=1$5145c377039b276de98a6e4e90000688e0fbbb58; passport_csrf_token_default=2b7dc6398684b1be40fc33c084ecf4e0; passport_csrf_token=2b7dc6398684b1be40fc33c084ecf4e0; odin_tt=f5dedf3ce91b652897da6a995fdf2efb8d64c58848d27924b0b8699cd24afcd3a39cdf946afb7fe83690f8dceb02214ddffd6fe751a4f38231ad9b99104b3068; n_mh=8FGDldISPta7HgzwJWfpL5ipE0qedsbsmQ7idOE7lqc; sid_guard=a3e33b122eeffe07cf6d4be243512465%7C1616436192%7C5184000%7CFri%2C+21-May-2021+18%3A03%3A12+GMT; uid_tt=942a19322366230aa38578917d6c36ce; uid_tt_ss=942a19322366230aa38578917d6c36ce; sid_tt=a3e33b122eeffe07cf6d4be243512465; sessionid=a3e33b122eeffe07cf6d4be243512465; sessionid_ss=a3e33b122eeffe07cf6d4be243512465; d_ticket=c033f04a9fe26e520ac419f1b718ace162727; MONITOR_WEB_ID=3747551210666765"}']
let fqxaurl = $.getdata('FQXSURL1')
let FQXS1= $.getdata('FQXS1')
let host = $.getdata('host')
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const invite=1;//新用户自动邀请，0关闭，1默认开启
const logs =0;//0为关闭日志，1为开启
var hour=''
var minute=''
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行
let isfqxsck = typeof $request !== 'undefined'
if (isfqxsck) {
   fqxsck();
   $.done()
}
if ($.isNode()) {
   if (process.env.FQXSURL1 && process.env.FQXSURL1 .indexOf('#') > -1) {
   FQXSURL1 = process.env.FQXSURL1 .split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.FQXSURL1 && process.env.FQXSURL1 .indexOf('\n') > -1) {
   FQXSURL1 = process.env.FQXSURL1 .split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   FQXSURL1 = process.env.FQXSURL1 .split()
  };
  if (process.env.FQXS1&& process.env.FQXS1.indexOf('#') > -1) {
   FQXS1= process.env.FQXS1.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.FQXS1&& process.env.FQXS1.indexOf('\n') > -1) {
   FQXS1= process.env.FQXS1.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   FQXS1= process.env.FQXS1.split()
  };
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    fqxsurlArr.push($.getdata('FQXSURL1'))
    fqxsArr.push($.getdata('FQXS1'))
    let fqxscount = ($.getval('fqxscount') || '1');
  for (let i = 2; i <= fqxscount; i++) {
    fqxsurlArr.push($.getdata(`FQXSURL1${i}`))
    fqxsArr.push($.getdata(`FQXS1${i}`))
  }
}
!(async () => {
if (!fqxsurlArr[0] && !fqxsArr[0] ) {
    $.msg($.name, '【提示】请先获取🍅番茄小说一cookie')
    return;
  }
   console.log(`------------- 共${fqxsurlArr.length}个账号----------------\n`)
  for (let i = 0; i < fqxsArr.length; i++) {
    if (fqxsArr[i]) {
      message = ''
      note = ''
      FQXSURL1= fqxsurlArr[i];
      FQXS1 = fqxsArr[i];
      $.index = i + 1;
      console.log(`\n开始【番茄小说${$.index}】`)
      await task_list() 
      await showmsg()
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
function fqxsck() {
if($request&&$request.url.indexOf("sign_in")>=0) {
   const FQXSURL1 = $request.url.split('?')[1]
   if(FQXSURL1)     $.setdata(FQXSURL1,`FQXSURL1${status}`)
   $.log(`[${zhiyi}] 获取fqxsurl请求: 成功,FQXSURL1: ${FQXSURL1}`)
   $.msg(`FQXSURL1${status}: 成功🎉`, ``)
   const host = $request.headers['Host']
   if(host)   $.setdata(host,'host')
   $.log(`[${zhiyi}] 获取host请求: 成功,host: ${host}`)
   const FQXS1 = JSON.stringify($request.headers)
    if(FQXS1)    $.setdata(FQXS1,`FQXS1${status}`)
    $.log(`[${zhiyi}] 获取fqxs请求: 成功,FQXS1: ${FQXS1}`)
    $.msg(`FQXS1${status}: 成功🎉`, ``)
}
}
//task_list
async function task_list(){
 return new Promise((resolve) => {
    let task_list_url = {
   	url: `https://${host}/luckycat/novel/v1/task/list?${FQXSURL1}polaris_page=client_task_page&new_bookshelf=1`,
    	headers: JSON.parse(FQXS1),
    	}
   $.get(task_list_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        let qd_status = result.data.task_list.daily.find(item => item.task_id === 203)
        let sign_status = qd_status.completed
        if(!sign_status) 
        await sign_in()
        let yd_status_5 = result.data.task_list.daily.find(item => item.task_id === 1006)
        if(!yd_status_5.completed) 
        no = 5
        let yd_status_10 = result.data.task_list.daily.find(item => item.task_id === 1003)
        if(!yd_status_10.completed) 
        no = 10
        let yd_status_30 = result.data.task_list.daily.find(item => item.task_id === 1009)
        if(!yd_status_30.completed) 
        no = 30
        let yd_status_60 = result.data.task_list.daily.find(item => item.task_id === 1010)
        if(!yd_status_60.completed) 
        no = 60
        let yd_status_120 = result.data.task_list.daily.find(item => item.task_id === 1011)
        if(!yd_status_120.completed) 
        no = 120
        let yd_status_180 = result.data.task_list.daily.find(item => item.task_id === 1012)
        if(!yd_status_180.completed) 
        no = 180
        if(yd_status_180.completed && yd_status_120.completed && yd_status_120.completed && yd_status_60.completed && yd_status_30.completed && yd_status_10.completed && yd_status_5.completed){
        console.log('阅读任务已经完成\n')
        message += '阅读任务已经完成\n'
        }else{
        $.log('开始阅读任务\n')
        await read()
        }
        let sp_status = result.data.task_list.daily.find(item => item.task_id === 111)
        let video_status = sp_status.completed
        console.log('开始视频任务\n视频任务进度：'+sp_status.desc)
        if(!video_status) 
        await ad()
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//sign_in
async function sign_in(){
 return new Promise((resolve) => {
    let sign_in_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/sign_in?${FQXSURL1}`,
    	headers: JSON.parse(FQXS1),
    	body: `{}`
    	}
   $.post(sign_in_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log(result.err_tips+'获得'+result.data.amount+'🍅') 
        message += result.err_tips+'获得'+result.data.amount+'🍅\n'
        }else{
        console.log('签到任务：'+result.err_tips)
        message += '签到任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这是因为之前提交数据错误导致的\n')
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//read
async function read(){
 return new Promise((resolve) => {
    let read_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/daily_read_${no}m?${FQXSURL1}`,
    	headers: JSON.parse(FQXS1),
    	body: `{
  "new_bookshelf" : true,
  "task_key" : "daily_read_${no}m"
}`
    	}
   $.post(read_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log(`第${no}时段阅读`+result.err_tips+'获得'+result.data.amount+'🍅\n') 
        message += `第${no}时段阅读`+ result.err_tips+'获得'+result.data.amount+'🍅\n'
        }else{
        console.log('阅读任务：'+result.err_tips)
        message += '阅读任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这是因为之前提交数据错误导致的\n')
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//ad
async function ad(){
 return new Promise((resolve) => {
    let ad_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/excitation_ad?${FQXSURL1}`,
    	headers: JSON.parse(FQXS1),
    	body: `{
  "new_bookshelf" : true,
  "task_key" : "excitation_ad"
}`
    	}
   $.post(ad_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log('视频任务：'+result.err_tips+'获得'+result.data.amount+'🍅') 
        message += '视频任务：'+result.err_tips+'获得'+result.data.amount+'🍅'
        }else{
        console.log('视频任务：'+result.err_tips)
        message += '视频任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这个广告没找到解决办法')
        note = '\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号'
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//showmsg
async function showmsg(){
  if(tz == 1){
   if ($.isNode()){
       await notify.sendNotify($.name,message)
   }else{
       $.msg(zhiyi,'',message+note)
   }
  }else{
       console.log(message+note)
   }
 }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
