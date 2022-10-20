function init() {
    const DIRECTIONS = {
        1: "👊🏽",
        2: "👈🏽",
        4: "👉🏽",
        8: "👆🏽",
        16: "👇🏽",
    };
    const logElement = document.querySelector(".log");
    const canvas = document.querySelector('#canvas');
    const hammerManager = new Hammer.Manager(canvas);

    const twoFingerPan = new Hammer.Pan({event: "twoFingerPan", direction: Hammer.DIRECTION_ALL, pointers: 2, threshold: 0});
    const pinch = new Hammer.Pinch({ event: 'pinch', });
    hammerManager.add(twoFingerPan);
    hammerManager.add(pinch);
    hammerManager.add(new Hammer.Tap({ event: "doubletap", taps: 2 }));
    hammerManager.add(new Hammer.Tap({ event: "singletap" }));
    hammerManager.on("twoFingerPan pinch", (e) => {
        console.log(e);

        logElement.innerHTML = `Event: </br>
        <ul>
            <li>type: ${e.type}</li>
            <li>Dir: ${DIRECTIONS[e.direction] || e.direction}</li>
            <li>ΔX: ${e.deltaX} - ΔY: ${e.deltaY}</li>
            <li>⇱ (scale): ${e.scale}</li>
        </ul>
        <p>${JSON.stringify(e.srcEvent.offsetX)}</p>`;
    });

    hammerManager.on("singletap doubletap", (ev) => {
        console.log(ev);
        logElement.innerHTML = ev.type;
    });
}

document.addEventListener('DOMContentLoaded', init);
