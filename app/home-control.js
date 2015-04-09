'use strict';

function HomeControl(controlDiv, map) {
  var dashBoard = document.createElement('div');
  dashBoard.innerHTML = templates.home();
  dashBoard.id = 'dashboard';
  dashBoard.className = 'dashboard';
  controlDiv.appendChild(dashBoard);
}