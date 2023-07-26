export const swipeRight = (set, index) => {
    let elem = document.getElementById("swipeContainer");
    let title = document.getElementById("swipeTitle");
    let pos = 0;
    let id = setInterval(frame, 1);
    let start = 0;
    let clipValue = 100;

    function frame() {
        if (pos === 100) {
            clearInterval(id);
            set(index);
            setTimeout(() => {
                pos = -100;
                clipValue = 100;
                id = setInterval(frame, 1);
            }, 100);
        } else if (pos === 0 && start === 1) {
            clearInterval(id);
        } else {
            if (pos === 0) start++;
            pos++;
            elem.style.left = pos*0.9 + '%';
            title.style.left = pos*0.5 + '%';
            if(pos > 0){
                clipValue--;
                elem.style.clipPath = `polygon(0% 0%, ${clipValue}% 0%, ${clipValue}% 100%, 0% 100%)`;
                title.style.clipPath = `polygon(0% 0%, ${clipValue}% 0%, ${clipValue}% 100%, 0% 100%)`;
            }
            if(pos <= 0){
                clipValue--;
                elem.style.clipPath = `polygon(${clipValue}% 0%, 100% 0%, 100% 100%, ${clipValue}% 100%)`;
                title.style.clipPath = `polygon(${clipValue}% 0%, 100% 0%, 100% 100%, ${clipValue}% 100%)`;
            }
            
        }
    }
};

export const swipeLeft = (set, index) => {
    let elem = document.getElementById("swipeContainer");
    let title = document.getElementById("swipeTitle");
    let pos = 0;
    let id = setInterval(frame, 1);
    let start = 0;
    let clipValue = 0;

    function frame() {
        if (pos === 100) {
            clearInterval(id);
            set(index);
            setTimeout(() => {
                pos = -100;
                clipValue = 0;
                id = setInterval(frame, 1);
            }, 100);
        } else if (pos === 0 && start === 1) {
            clearInterval(id);
        } else {
            if (pos === 0) start++;
            pos++;
            elem.style.left = -pos*0.9 + '%';
            title.style.left = -pos*0.5 + '%';
            if(pos > 0){
                clipValue++;
                elem.style.clipPath = `polygon(${clipValue}% 0%, 100% 0%, 100% 100%, ${clipValue}% 100%)`;
                title.style.clipPath = `polygon(${clipValue}% 0%, 100% 0%, 100% 100%, ${clipValue}% 100%)`;
            }
            if(pos <= 0){
                clipValue++;
                elem.style.clipPath = `polygon(0% 0%, ${clipValue}% 0%, ${clipValue}% 100%, 0% 100%)`;
                title.style.clipPath = `polygon(0% 0%, ${clipValue}% 0%, ${clipValue}% 100%, 0% 100%)`;
            }
            
        }
    }
};



