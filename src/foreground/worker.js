var i = 0;

function timedAction() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedAction()",100);
}

timedAction();