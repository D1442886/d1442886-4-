// 1. 定義故事節點：包含文字與選項，支援多分支與結局判斷
const storyNodes = {
    start: {
        text: "今天是高中的第一天。你在前往教室的走廊上，不小心撞到了一個嘴裡咬著吐司的女孩。她手裡的書散落一地...",
        options: [
            { text: "幫她撿起書，並問：「妳沒事吧？」", nextNode: "node2" },
            { text: "站在原地發呆，心想：「這不是動漫的情節嗎？」", nextNode: "node3" },
            { text: "嚴肅地說：「同學，走廊上不能吃早餐喔！」", nextNode: "node4" }
        ]
    },
    node2: {
        text: "你幫她撿起書，發現是一本叫做《校園七大不可思議》的舊書。她紅著臉道謝後匆匆跑走。\n\n下午你在圖書館又遇到了她，她正踮起腳尖，試圖拿取頂層的書。",
        options: [
            { text: "走過去溫柔地幫她拿下來。", nextNode: "node5" },
            { text: "裝作沒看到，去別區找自己的書。", nextNode: "ending1" }
        ]
    },
    node3: {
        text: "她自己撿起書，瞪了你一眼說：「笨蛋，不要擋路！」然後跑掉了。\n\n中午休息時，你看到她在天台獨自吃飯，看起來有點寂寞。",
        options: [
            { text: "走過去搭話：「妳還好嗎？早上抱歉啦。」", nextNode: "node6" },
            { text: "覺得她脾氣太差，還是不要靠近比較好。", nextNode: "ending1" }
        ]
    },
    node4: {
        text: "她有些錯愕，吞下吐司說：「對、對不起！」然後一溜煙跑了。\n\n放學後，你身為紀律股長在巡視校園，發現她在已經廢棄的舊校舍前徘徊。",
        options: [
            { text: "上前詢問：「妳在這裡做什麼？舊校舍很危險的。」", nextNode: "node7" },
            { text: "覺得很可疑，躲在旁邊偷偷觀察。", nextNode: "node8" }
        ]
    },
    node5: {
        text: "你幫她拿下了書，她很開心，並告訴你她在研究學校的『七大不可思議』，邀請你晚上一起去舊校舍探險尋找線索。",
        options: [
            { text: "欣然答應：「聽起來很有趣，我加入！」", nextNode: "ending2" },
            { text: "婉拒：「這太危險了，我要回家念書。」", nextNode: "ending1" }
        ]
    },
    node6: {
        text: "她分了一半的三明治給你，告訴你她其實是因為換了新環境太緊張才那麼兇。你們聊得很開心，她害羞地問你週末要不要一起去貓咪咖啡廳。",
        options: [
            { text: "開心地答應：「好啊，我很喜歡貓！」", nextNode: "ending3" },
            { text: "抱歉拒絕：「不好意思，我週末要補習。」", nextNode: "ending1" }
        ]
    },
    node7: {
        text: "她嚇了一跳，跟你坦白因為學校太大了她迷路了。你帶著她離開舊校舍，兩人順路一起走回家，看到了美麗的夕陽，氣氛變得有些曖昧。",
        options: [
            { text: "主動開口：「明天...我們一起上學吧？」", nextNode: "ending3" },
            { text: "默默地說再見，各自回家。", nextNode: "ending1" }
        ]
    },
    node8: {
        text: "你躲在樹後，看到她突然拿出一根會發光的魔杖，對著牆壁唸咒語。沒想到牆壁開了一道門！\n\n她轉過頭發現了你，問你要不要成為她的秘密助手。",
        options: [
            { text: "興奮答應：「魔法？太酷了吧，我要當！」", nextNode: "ending2" },
            { text: "覺得自己出現幻覺，嚇得轉身逃跑。", nextNode: "ending1" }
        ]
    }
};

// 2. 定義結局資料
const endings = {
    ending1: {
        title: "結局：平淡的高中生活",
        desc: "你的選擇讓你避開了所有可能的風波，但也錯過了青春的悸動與特別的際遇。你的三年高中生活將在平靜與唸書中度過...即使平凡，這也算是一種腳踏實地的幸福吧！"
    },
    ending2: {
        title: "結局：奇幻的校園冒險",
        desc: "沒想到這個轉學生居然是個有秘密的魔法學徒！你被捲入了充滿未知與驚喜的校園冒險中，平凡無奇的高中日常就此結束，充滿魔法的新的一頁展開了！"
    },
    ending3: {
        title: "結局：甜蜜的青春日常",
        desc: "兩人的距離迅速拉近！看來這場如同動漫般的邂逅，真的會發展成一段充滿粉紅泡泡的校園戀愛。準備好迎接充滿粉紅色牽手的每一天吧！"
    }
};

// 3. 取得 HTML 元素
const startScreen = document.getElementById('start-screen');
const storyScreen = document.getElementById('story-screen');
const endingScreen = document.getElementById('ending-screen');

const storyText = document.getElementById('story-text');
const optionsContainer = document.getElementById('options-container');

const btnStart = document.getElementById('start-btn');
const btnRestart = document.getElementById('restart-btn');

// 綁定開始與重新開始按鈕事件
btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', startGame);

// 切換畫面的功能
function switchScreen(screenToActive) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screenToActive.classList.add('active');
}

// 開始遊戲
function startGame() {
    switchScreen(storyScreen);
    goToNode('start');
}

// 前進到指定的劇情節點或結局
function goToNode(nodeId) {
    // 檢查是否為結局節點
    if (endings[nodeId]) {
        showEnding(nodeId);
        return;
    }

    const node = storyNodes[nodeId];
    
    // 透過移除再加入 fade-in class，觸發 CSS 轉場動畫，讓畫面更新有明顯提示
    storyText.classList.remove('fade-in');
    optionsContainer.classList.remove('fade-in');
    
    // 觸發重繪 (Reflow) 以重置動畫
    void storyText.offsetWidth; 
    void optionsContainer.offsetWidth;

    storyText.classList.add('fade-in');
    optionsContainer.classList.add('fade-in');

    // 渲染故事內容
    // 將換行符號取代為 <br> 來處理段落
    storyText.innerHTML = node.text.replace(/\n\n/g, '<br><br>');
    
    // 清空並渲染選項按鈕
    optionsContainer.innerHTML = '';
    node.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = opt.text;
        btn.addEventListener('click', () => {
            goToNode(opt.nextNode);
        });
        optionsContainer.appendChild(btn);
    });
}

// 顯示結局畫面
function showEnding(endingId) {
    switchScreen(endingScreen);
    const ending = endings[endingId];
    
    const endingTitle = document.getElementById('ending-title');
    const endingDesc = document.getElementById('ending-desc');
    
    endingTitle.innerText = ending.title;
    endingDesc.innerHTML = `<p style="margin: 0; text-align: left;">${ending.desc}</p>`;
    
    // 套用動畫
    endingTitle.classList.remove('fade-in');
    endingDesc.classList.remove('fade-in');
    void endingTitle.offsetWidth;
    endingTitle.classList.add('fade-in');
    endingDesc.classList.add('fade-in');
}

// 4. 背景櫻花飄落效果 (Canvas)
const canvas = document.getElementById('sakuraCanvas');
const ctx = canvas.getContext('2d');

let petals = [];
const numPetals = 40;

// 設定 Canvas 大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 初始化櫻花花瓣
for (let i = 0; i < numPetals; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 6,
        speedX: Math.random() * 1.5 - 0.75, // 左右飄動速度
        speedY: Math.random() * 1.5 + 1,    // 下降速度
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1
    });
}

// 繪製單片櫻花
function drawPetal(x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.beginPath();
    
    // 使用簡單弧線畫出類似花瓣或愛心的形狀
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-size, -size*1.5, -size*2, size/2, 0, size);
    ctx.bezierCurveTo(size*2, size/2, size, -size*1.5, 0, 0);
    
    ctx.fillStyle = 'rgba(255, 183, 197, 0.7)'; // 淺粉色
    ctx.fill();
    ctx.restore();
}

// 產生動畫
function animateSakura() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numPetals; i++) {
        let p = petals[i];
        
        // 更新位置與旋轉角度
        p.x += p.speedX;
        p.y += p.speedY; // 飄落
        p.rotation += p.rotationSpeed;

        // 若花瓣飄出畫面或超過底部，讓它從頂部重新出現
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.y > canvas.height + p.size) {
            p.y = -p.size;
            p.x = Math.random() * canvas.width;
        }

        drawPetal(p.x, p.y, p.size, p.rotation);
    }
    requestAnimationFrame(animateSakura);
}

// 啟動動畫
animateSakura();
