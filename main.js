// タクトスイッチでLEDの点灯を行うチュートリアル
const { requestGPIOAccess } = require("node-web-gpio");

async function button() {
    const gpioAccess = await requestGPIOAccess();

    // LEDの接続されているポートの指定
    const ledPort = gpioAccess.ports.get(26);
    await ledPort.export("out");

    // タクトスイッチの接続されているポートの指定
    const switchPort = gpioAccess.ports.get(5);
    await switchPort.export("in");

    // 点灯回数をカウントする引数cnt
    var cnt = 0;

    switchPort.onchange = function(val) {
        // ボタンを押すと点灯、離すと消灯する
        if (cnt > 9 && val.value == 0){
            console.log("Light : OFF");
            process.exit(1);
        }

        if(val.value == 1){
            ledPort.write(0);
            console.log("Light : OFF");
            cnt = cnt + 1;
        } else if(val.value == 0){
            ledPort.write(1);
            console.log("Light : ON");
            cnt = cnt + 1;
        }
    };
}

button();
