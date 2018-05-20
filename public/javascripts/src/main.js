"use strict";
import '../../stylesheets/src/style.scss'

window.touchCheck = function () {
    return (window.orientation > -1);
};

function alertMobileUsers() {
    if (window.touchCheck()) {
        setError("It seems like you are using a device with touch, it is currently not supported.");
    }
}

function setError(error) {
    document.getElementById("error").innerText = error;
}

class HeadsManager {
    constructor() {
        this.faceIds = ["mosca", "matthieu", "mehdi", "leroy", "pavlo", "greg", "legrand"];
        let ids = this.faceIds;
        this.heads = ids.map((id) => document.getElementById(id));
    }

    // place the heads according to arg:positions and display them.
    showHeads(positions) {
        positions.forEach(function(aHead) {
            let headElem = window.headsManager.heads.find((elem) => elem.id === aHead.name);
            window.headsManager.placeHead(headElem, aHead);
        });
    }

    //place the head in headElem at headPosition
    //headElem : DOM element
    placeHead(headElem, headPosition) {
        headElem.style.position = "absolute";
        headElem.style.left = headPosition.position.substring(0,3) + "px";
        headElem.style.top = headPosition.position.substring(4,6) + "px";
        headElem.style.display = "inline-block";
    }
};

function getHeads() {
    let ajax = new XMLHttpRequest();

    ajax.onload = function (event) {
        if(this.status === 200) {
            let heads = JSON.parse(this.responseText);
            window.headsManager.showHeads(heads);
        } else {
            setError("There was an error with the server, error code : " + this.status);
        }
    };

    ajax.open("GET", "heads", true);
    ajax.send();
}

window.onload = function () {

    alertMobileUsers();

    window.headsManager = new HeadsManager();

    getHeads();

};