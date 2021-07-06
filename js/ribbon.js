/**
	 * Created by zproo on 2017/4/8.
	 */
	!function () {
	    document.addEventListener('touchmove', function (e) {
	        e.preventDefault()
	    });
	

	    function getAttr(script, attr, default_val) {
	        return Number(script.getAttribute(attr)) || default_val;
	    }
	

	    // 獲取自訂配置
	    var ribbon = document.getElementById('ribbon');  // 當前載入的script
	    config = {
	        zIndex: getAttr(ribbon, "zIndex", -1), // z-index
	        alpha: getAttr(ribbon, "alpha", 0.6), // alpha
	        ribbon_width: getAttr(ribbon, "size", 90), // size
	    };
	

	    var canvas = document.createElement("canvas");
	    canvas.style.cssText = "position:fixed;top:0;left:0;z-index:"+config.zIndex;
	    document.getElementsByTagName("body")[0].appendChild(canvas);
	

	    var canvasRibbon = canvas,
	        ctx = canvasRibbon.getContext('2d'),    // 獲取canvas 2d上下文
	        dpr = window.devicePixelRatio || 1, // the size of one CSS pixel to the size of one physical pixel.
	        width = window.innerWidth,     // 返回視窗的文檔顯示區的寬高
	        height = window.innerHeight,
	        RIBBON_WIDTH = config.ribbon_width,
	        path,
	        math = Math,
	        r = 0,
	        PI_2 = math.PI * 2,    // 圓周率*2
	        cos = math.cos,   // cos函數返回一個數值的余弦值（-1~1）
	        random = math.random;   // 返回0-1亂數
	

	    canvasRibbon.width = width * dpr;     // 返回實際寬高
	    canvasRibbon.height = height * dpr;
	    ctx.scale(dpr, dpr);    // 水準、豎直方向縮放
	    ctx.globalAlpha = config.alpha;  // 圖形透明度
	

	    function init() {
	        ctx.clearRect(0, 0, width, height);     // 擦除之前繪製內容
	        path = [{x: 0, y: height * 0.7 + RIBBON_WIDTH}, {x: 0, y: height * 0.7 - RIBBON_WIDTH}];
	        // 路徑沒有填滿螢幕寬度時，繪製路徑
	        while (path[1].x < width + RIBBON_WIDTH) {
	            draw(path[0], path[1])
	        }
	    }
	

	    function draw(start, end) {
	        ctx.beginPath();    // 創建一個新的路徑
	        ctx.moveTo(start.x, start.y);   // path起點
	        ctx.lineTo(end.x, end.y);   // path終點
	        var nextX = end.x + (random() * 2 - 0.25) * RIBBON_WIDTH,
	            nextY = geneY(end.y);
	        ctx.lineTo(nextX, nextY);
	        ctx.closePath();
	

	        r -= PI_2 / -50;
	        // 隨機生成並設置canvas路徑16進制顏色
	        ctx.fillStyle = '#' + (cos(r) * 127 + 128 << 16 | cos(r + PI_2 / 3) * 127 + 128 << 8 | cos(r + PI_2 / 3 * 2) * 127 + 128).toString(16);
	        ctx.fill();     // 根據當前樣式填充路徑
	        path[0] = path[1];    // 起點更新為當前終點
	        path[1] = {x: nextX, y: nextY}     // 更新終點
	    }
	

	    function geneY(y) {
	        var temp = y + (random() * 2 - 1.1) * RIBBON_WIDTH;
	        return (temp > height || temp < 0) ? geneY(y) : temp;
	    }
	

	    document.onclick = init;
	    document.ontouchstart = init;
	    init();
	}();

