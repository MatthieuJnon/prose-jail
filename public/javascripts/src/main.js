"use strict";
import '../../stylesheets/src/style.scss'

window.touchCheck = function () {
    return (window.orientation > -1);
};

function alertMobileUsers() {
    if (window.touchCheck()) {
        let error = document.getElementById("error").innerText = "It seems like you are using a device with touch, it is currently not supported.";
    }
}


class HeadsManager {
    constructor() {
        this.faceIds = ["mosca", "matthieu", "mehdi", "leroy", "pavlo", "greg", "legrand"];
        let ids = this.faceIds;
        this.heads = ids.map((id) => document.getElementById(id));
    }
    showHeads() {
        let heads = this.heads;
        console.log(heads);
    }
};

window.onload = function () {
    alertMobileUsers();
    window.headsManager = new HeadsManager();
    window.headsManager.showHeads();
};