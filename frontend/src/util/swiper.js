export const swipeLeft = (set, index) => {
    let elem = document.getElementById("swipeContainer");
    let title = document.getElementById("swipeTitle");
    let pos = 0;
    let id = setInterval(frame, 0.1);
    let start = 0;
    let clipValue = 100;

    function frame() {
        if (pos === 100) {
            clearInterval(id);
            set(index);
            setTimeout(() => {
                pos = -100;
                clipValue = 100;
                id = setInterval(frame, 0.1);
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

export const swipeRight = (set, index) => {
    let elem = document.getElementById("swipeContainer");
    let title = document.getElementById("swipeTitle");
    let pos = 0;
    let id = setInterval(frame, 0.1);
    let start = 0;
    let clipValue = 0;

    function frame() {
        if (pos === 100) {
            clearInterval(id);
            set(index);
            setTimeout(() => {
                pos = -100;
                clipValue = 0;
                id = setInterval(frame, 0.1);
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


// {/* <map name="workmap">
// <area title="Acousticness" shape="rect" coords="458,78,282,47" alt="Acousticness" onClick={handleMapClick} href="#"/>
// <area title="Danceability" shape="rect" coords="548,137,761,174" alt="Danceability" onClick={handleMapClick} href="#"/>
// <area title="Energy" shape="rect" coords="548,366,761,403" alt="Energy" onClick={handleMapClick} href="#"/>
// <area title="Happiness" shape="rect" coords="441,570,654,607" alt="Happiness" onClick={handleMapClick} href="#"/>
// <area title="Instrumentalness" shape="rect" coords="89,572,302,610" alt="Instrumentalness" onClick={handleMapClick} href="#"/>
// <area title="Liveness" shape="rect" coords="-21,363,193,401" alt="Liveness" onClick={handleMapClick} href="#"/>
// <area title="Loudness" shape="rect" coords="224,184,49,139" alt="Loudness" onClick={handleMapClick} href="#"/>
// </map> */}

