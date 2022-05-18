/**
 * 共通のHTMLファイルを呼び出す
 *
 * ファイル呼び出し時、インクルードファイルをすべて読み込み後、init() を実行する
 * init という関数名を変更したい場合は、変数init_func を値を変更する
 */
 document.addEventListener("DOMContentLoaded", function() { 
  const init_func = (typeof init === 'function')? init: null,
        temp_path = 'data-template-path',
        tgt = document.querySelectorAll('[' + temp_path + ']'),
        tgt_length = tgt.length

  let count = 0

  if (tgt_length > 0) {
    tgt.forEach(dom => {

      fetch(dom.getAttribute(temp_path))
      .then(response => {
        return response.text()
      })
      .then(string => {
        const parent = dom.parentNode,
              temp_name = dom.getAttribute('class')

        dom.innerHTML = string

        if (temp_name && temp_name != '') {
          dom.removeAttribute(temp_path);
        } else {
          while (dom.firstChild) {
            parent.insertBefore(dom.firstChild, dom)
          }
          parent.removeChild(dom)
        }

        count++
        if (init_func && count === tgt_length) {
          init_func()
        }
      })
    });
  }
});