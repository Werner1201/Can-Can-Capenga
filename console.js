/*
essas funcoes de addText funcionam com essas tags
<form name="myform">
        <textarea name="inputtext"></textarea>
    </form> */

function addtext(string) {
  let newtext = string;
  const textoArea = document.FrameConsole.console;
  textoArea.value += newtext;
  textoArea.scrollTop = textoArea.scrollHeight;
}

function cleantext() {
  const textoArea = document.FrameConsole.console;
  console.log(textoArea);
  textoArea.value = "";
  textoArea.scrollTop = textoArea.scrollHeight;
  console.log("aqui");
}

function FechaConsole() {
  location.href =
    "https://cdn.shopify.com/s/files/1/1061/1924/products/Sad_Face_Emoji_large.png?v=1480481055";
  console.log("To aqui");
}
