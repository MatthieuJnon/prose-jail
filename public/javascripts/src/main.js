"use strict";
import '../../stylesheets/src/style.scss'

window.touchCheck = function() {
    return (window.orientation > -1);
};

function alertMobileUsers() {
    if (window.touchCheck()) {
        let error = document.getElementById("error").innerText = "It seems like you are using a device with touch, it is currently not supported.";
    }
}

window.onload = alertMobileUsers;
