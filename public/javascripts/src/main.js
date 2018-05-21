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
        //Used for dragStore and dragFetch
        this.draggedHeads = [];
    }

    // place the heads according to arg:positions and display them.
    showHeads(positions) {
        positions.forEach(function (aHead) {
            let headElem = window.headsManager.heads.find((elem) => elem.id === aHead.name);
            window.headsManager.placeHead(headElem, aHead);
        });
    }

    //place the head in headElem at headPosition
    //headElem : DOM element
    placeHead(headElem, headPosition) {
        headElem.style.position = "absolute";
        headElem.style.left = headPosition.position.substring(0, 3) + "px";
        headElem.style.top = headPosition.position.substring(3, 6) + "px";
        headElem.style.display = "inline-block";

        document.onmousedown = faceDragStart;
    }

    dragStore(name, posX, posY) {
        this.draggedHeads.push([name,posX,posY]);
    }

    dragFetch() {
        const head = this.draggedHeads[0];
        this.draggedHeads.splice(0,1);
        return(head);
    }
};

function faceDragStart(event) {
    if(event.target.className === "face") {
        window.headsManager.dragStore(event.target.id,event.clientX,event.clientY);
        document.onmouseup = faceDragEnd;
    }
}

function faceDragEnd(event) {
    const initialsHeadPosition = window.headsManager.dragFetch();
    const elemHead = document.getElementById(initialsHeadPosition[0]);
    const diffX = event.clientX - initialsHeadPosition[1];
    const diffY = event.clientY - initialsHeadPosition[2];
    const elemX = parseInt(elemHead.style.left.replace("px", ""));
    const elemY = parseInt(elemHead.style.top.replace("px", ""));
    let newX = elemX + diffX;
    let newY = elemY + diffY;
    if(newX > 870) newX = 870;
    if(newY > 620) newY = 620;
    if(newX < 0) newX = 0;
    if(newY < 0) newY = 0;
    elemHead.style.left = newX + "px";
    elemHead.style.top = newY + "px";
    sendHead([elemHead.id, formatPosition(newX,newY)]);
    document.onmouseup = () => false;
}

function formatPosition(x,y) {
    let posString = "";
    if (x.toString().length === 1){
        posString = "00" + x.toString();
    } else if (x.toString().length === 2){
        posString = "0" + x.toString();
    } else {
        posString = x.toString();
    }

    if (y.toString().length === 1){
        posString = posString + "00" + y.toString();
    } else if (y.toString().length === 2){
        posString = posString + "0" + y.toString();
    } else {
        posString = posString + y.toString();
    }

    return posString;
}

function sendHead(head) {
    let ajax = new XMLHttpRequest()

    ajax.onload = function (event) {
        if (this.status !== 200) {
            setError("There was an error while uploading a new position, error code : " + this.status);
        }
        getHeads();
    }

    ajax.open("POST", "/head", true);
    ajax.setRequestHeader("Content-type", "application/json; charset=utf-8");
    ajax.send(JSON.stringify(head));
}

function getHeads() {
    let ajax = new XMLHttpRequest();

    ajax.onload = function (event) {
        if (this.status === 200) {
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

    document.ondragstart = () => false;

    getHeads();

};