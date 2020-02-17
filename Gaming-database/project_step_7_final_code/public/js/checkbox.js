var checkbox = document.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change",function(){
     this.value = this.checked ? 1 : 0;
  });