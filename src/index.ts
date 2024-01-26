const component: () => HTMLElement = () => {
  const element = document.createElement("div");
  element.innerText = "Hello";
  return element;
};

document.body.appendChild(component());
