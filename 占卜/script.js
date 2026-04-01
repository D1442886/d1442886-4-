/**
 * 神秘運勢占卜 - 主程式
 * 集中管理占卜結果，如有需要可在此直接修改、新增或刪除項目
 */

const fortuneData = [
    {
        name: "🌟 大吉星高照",
        work: "貴人相助，升職加薪有望，所有企劃皆能順利推進",
        study: "思緒清晰，理解力大增，考試將有超常發揮",
        love: "桃花朵朵開，魅力無法擋，單身者有望遇見心儀對象",
        money: "財運亨通，投資有不錯回報，甚至可能有意外之財",
        description: "今天是你的絕對幸運日！宇宙的能量都匯聚在你身邊，所做的事情大多能順利進行，請充滿自信地迎接挑戰，不要害怕展現自己。",
        closing: "幸運女神站在你這邊，放手去做吧！✨"
    },
    {
        name: "☀️ 晴空萬里",
        work: "任務如期完成，團隊合作愉快，一切順風順水",
        study: "穩定發揮，學習效率高，適合推進進度落後的科目",
        love: "感情穩定升溫，適合安排一場浪漫的晚餐約會",
        money: "收支平衡，偶有小偏財，可買張彩券試試手氣",
        description: "整體運勢相當不錯，沒有任何烏雲籠罩。保持平常心與愉悅的心情，就能收穫美好的一天。",
        closing: "微笑是你最好的幸運符！😊"
    },
    {
        name: "🌱 穩步成長",
        work: "需要一點耐心，目前的努力即將在未來顯現成果",
        study: "積沙成塔，努力不會白費，適合埋頭扎實基礎",
        love: "適合平心靜氣的溝通，解開過去的小心結",
        money: "宜守財，避免衝動消費，規劃長遠理財計畫",
        description: "這是一個打基礎的好時機，或許感受不到立竿見影的效果，但請不要急於求成，腳踏實地才是通往成功的最佳捷徑。",
        closing: "慢慢來，比較快。龜兔賽跑的贏家是你喔！🐢"
    },
    {
        name: "🧐 靈光乍現",
        work: "創意滿滿，在腦力激盪時能提出令人驚豔的好點子",
        study: "適合學習新技能或新觀念，會很快抓到訣竅",
        love: "給對方一個意想不到的小驚喜，會有很棒的化學反應",
        money: "可能會在不經意間發現不錯的理財資訊或商機",
        description: "你的直覺今天特別敏銳，不要忽視那些突然冒出來的想法，相信自己內心的聲音，或許能為你帶來突破。",
        closing: "抓住那一閃而過的靈感，世界將為你改變！💡"
    },
    {
        name: "☕ 慵懶午後",
        work: "適合處理不耗腦力的例行公事，不宜做重大決定",
        study: "稍微放慢腳步，休息是為了走更長遠的路",
        love: "平淡是福，享受兩人靜靜待在一起的簡單陪伴",
        money: "正常開銷，無大起大落，看緊荷包即可",
        description: "運勢平平，節奏稍顯緩慢。不妨給自己泡杯咖啡，聽點輕音樂，放鬆一下緊繃的神經，這也是生活的一部分。",
        closing: "即使平凡，也是美好的一天。享受當下吧！🕊️"
    },
    {
        name: "🎭 轉角遇驚喜",
        work: "可能會接手突如其來的任務或天外飛來一筆的機會",
        study: "換個環境讀書（如咖啡廳）會有意想不到的專注效果",
        love: "單身者有望在意外場合結識新朋友，多留意身旁",
        money: "出門或許能撿到零錢或對中幾個月前的發票",
        description: "今天充滿了不確定性與變數，但多半是好的驚喜。請保持開放的心態，對未知的挑戰說一聲「Yes」。",
        closing: "擁抱未知，生活處處是驚喜與彩蛋！🎁"
    },
    {
        name: "💪 潛能爆發",
        work: "克服了長期以來的瓶頸，效率驚人，讓同事刮目相看",
        study: "茅塞頓開，難題迎刃而解，越是有挑戰性越感興趣",
        love: "鼓起勇氣表達心意的好時機，不要再退縮了",
        money: "積極理財會看到初步成效，適合檢視手上的資產",
        description: "你的潛力正在甦醒，過去默默累積的努力即將轉化為實質的回饋。今天就大膽展現你的實力吧！",
        closing: "你比你想像的還要強大好幾倍！🔥"
    },
    {
        name: "🌧️ 雨過天晴",
        work: "早晨或許會稍微遇到阻礙，但午後將能化險為夷",
        study: "遇到盲點卡關，請教同學或老師便可瞬間破局",
        love: "經歷小摩擦後更了解彼此，感情反而變得更好",
        money: "雖有意外支出，但尚能應付，並從中學到教訓",
        description: "今天開局可能帶點挑戰，但請記得「這是過程，不是結果」。保持樂觀積極的態度，好運會在下半場降臨。",
        closing: "風雨過後，總會看見最美麗的彩虹。🌈"
    },
    {
        name: "🛡️ 謹慎前行",
        work: "反覆核對文件細節，今天容易因為粗心而出錯",
        study: "溫故知新比學習新章節更重要，先鞏固舊有知識",
        love: "多傾聽對方的想法，少說多做，避免無心之言傷人",
        money: "看緊錢包，小心詐騙陷阱或過度推銷",
        description: "今天是個需要多點自我防護與細心的日子，凡事三思而後行，穩紮穩打能幫助你避開無謂的麻煩。",
        closing: "小心駛得萬年船，謹慎能讓你平安駛向安全港。⚓"
    },
    {
        name: "🦋 蛻變重生",
        work: "適合轉換跑道、提出辭呈或大膽嘗試全新企劃",
        study: "放下舊有的學習迷思，大膽採用新的讀書方法",
        love: "勇敢斬斷不健康的關係，或是迎接嶄新的戀愛篇章",
        money: "重新檢視財務規劃，汰弱留強，設立新的存錢目標",
        description: "一個舊的階段正在結束，新的機會正在向你招手。不要眷戀過去的安逸，勇敢撕下標籤，為自己翻頁吧。",
        closing: "破繭而出的蝴蝶，才能看見更廣闊的天空。🦋"
    }
];

// 取得 DOM 元素
const drawBtn = document.getElementById('draw-btn');
const retryBtn = document.getElementById('retry-btn');
const divinationArea = document.getElementById('divination-area');
const resultArea = document.getElementById('result-area');

// 結果卡片元素
const resultTitle = document.getElementById('result-title');
const resultWork = document.getElementById('result-work');
const resultStudy = document.getElementById('result-study');
const resultLove = document.getElementById('result-love');
const resultMoney = document.getElementById('result-money');
const resultDesc = document.getElementById('result-desc');
const resultClosing = document.getElementById('result-closing');

let isDrawing = false; // 防止重複點擊

// 綁定事件
drawBtn.addEventListener('click', () => {
    if (isDrawing) return;
    isDrawing = true;

    // 按下按鈕時的特效 (加入震動動畫類別)
    drawBtn.classList.add('shaking');
    const icon = drawBtn.querySelector('.btn-icon');
    icon.style.animation = 'none'; // 暫停漂浮動畫
    
    // 模擬抽籤的神秘感停頓
    setTimeout(() => {
        drawBtn.classList.remove('shaking');
        icon.style.animation = 'float 3s ease-in-out infinite'; // 恢復漂浮動畫
        showResult();
        isDrawing = false;
    }, 1000);
});

retryBtn.addEventListener('click', () => {
    // 隱藏結果，顯示抽籤按鈕
    resultArea.classList.add('hidden');
    resultArea.classList.remove('active');
    
    divinationArea.classList.remove('hidden');
    divinationArea.classList.add('active');
    
    // 捲動回頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 顯示占卜結果的邏輯
function showResult() {
    // 隨機選取一個結果
    const randomIndex = Math.floor(Math.random() * fortuneData.length);
    const result = fortuneData[randomIndex];

    // 填入資料
    resultTitle.textContent = result.name;
    resultWork.textContent = result.work;
    resultStudy.textContent = result.study;
    resultLove.textContent = result.love;
    resultMoney.textContent = result.money;
    resultDesc.textContent = result.description;
    resultClosing.textContent = result.closing;

    // 切換顯示區塊
    divinationArea.classList.add('hidden');
    divinationArea.classList.remove('active');
    
    resultArea.classList.remove('hidden');
    // 強制重繪以觸發動畫
    void resultArea.offsetWidth;
    resultArea.classList.add('active');
}

// ----------------------------------------
// Canvas 星空背景特效 (增加神祕與平靜感)
// ----------------------------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function initBackground() {
    // 確保 canvas 覆蓋全螢幕
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    stars = [];
    // 根據螢幕大小決定星星數量，避免畫面過密或過疏
    const starCount = Math.floor((width * height) / 4000);
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.3,
            alpha: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            fadeDirection: Math.random() > 0.5 ? 1 : -1
        });
    }
}

function animateBackground() {
    // 每次繪製前清空畫面
    ctx.clearRect(0, 0, width, height);
    
    stars.forEach(star => {
        // 閃爍邏輯：改變透明度
        star.alpha += star.twinkleSpeed * star.fadeDirection;
        
        if (star.alpha >= 1) {
            star.alpha = 1;
            star.fadeDirection = -1;
        } else if (star.alpha <= 0.1) {
            star.alpha = 0.1;
            star.fadeDirection = 1;
            // 當星星變暗時，稍微改變位置，產生緩慢流動或閃爍錯覺
            star.x += (Math.random() - 0.5) * 10;
            star.y += (Math.random() - 0.5) * 10;
            
            // 避免星星超出邊界
            if(star.x < 0) star.x = width;
            if(star.x > width) star.x = 0;
            if(star.y < 0) star.y = height;
            if(star.y > height) star.y = 0;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        // 設定發光效果
        ctx.shadowBlur = Math.random() * 5 + 2;
        ctx.shadowColor = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0; // 重置
    });
    
    requestAnimationFrame(animateBackground);
}

// 監聽視窗大小改變
window.addEventListener('resize', initBackground);

// 初始化背景
initBackground();
animateBackground();
