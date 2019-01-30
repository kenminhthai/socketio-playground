export default function renderButtons(components) {
  return `<button onClick="console.log(${components})">Load Module 1</button>
<button onClick="console.log('works 2')">Load Module 2</button>`;
}
