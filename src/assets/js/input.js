export default {
  selectFocus(e) {
    if (e.target.tagName === "DIV") {
      e.target.firstChild.focus();
    } else {
      e.target.parentElement.style.border = "1px solid blue";
    }
  },
  inputOn(e) {
    e.target.parentElement.style.border = "1px solid blue"
  },
  inputLeave(e) {
    e.target.parentElement.style.border = "1px solid rgba(55, 55, 55, .5)"
  }
}