// 會員系統連線設定（Supabase）。前台網站和後台 admin.html 共用這一份
// SB_URL：Supabase 專案網址（https://xxxx.supabase.co）
// SB_KEY：Supabase 的「publishable / anon」公開金鑰。這把本來就是給網頁用的，
//         安全靠資料庫權限把關。千萬不要貼「secret / service_role」那把！
// 兩個都空白＝會員功能先不開，網站照原本方式報名
var SB_URL = 'https://tgnivqigsdkmdfphdtxq.supabase.co';
var SB_KEY = 'sb_publishable_YLuD1H4NzOgXS_k7Evjb9A_75C1ylvP';
var BRAND = 'mandala';   // 浪人網站改成 'ronin'

// 新會員首購折 100 的彈出視窗：活動結束改成 false 就不會再跳（折扣規則本身在資料庫，要停也要跟 Claude 說）
var PROMO_ON = true;
