// 複数回 open が起動されたときにダイアログが重ならないように制御する
let count = 0;
let dialog: HTMLDialogElement | null = null;

export function useLoading() {
  return {
    open() {
      count++;

      // ダイアログを表示するのは初回だけ
      if (count === 1) {
        dialog = document.createElement('dialog');
        setupLoadingDialog(dialog);
        document.body.appendChild(dialog);
        dialog.showModal();
      }

      return {
        close() {
          count--;

          // ダイアログを閉じるのは最後だけ
          if (count === 0) {
            dialog?.addEventListener('transitionend', (e) => {
              if (e.target === dialog) {
                dialog?.close();
                if (dialog) document.body.removeChild(dialog);
                dialog = null;
              }
            });
            dialog?.classList.remove('open');
          }
        },
      };
    },
  };
}

function setupLoadingDialog(dialog: HTMLDialogElement) {
  dialog.addEventListener('keydown', (e) => {
    // ESCキーでキャンセルするとき閉じない
    if (e.key === 'Escape') {
      // cancel イベントを preventDefault しても、なぜか２－３回目ですり抜けてダイアログが消えるため、キーイベントを止める
      e.preventDefault();
    }
  });
  dialog.addEventListener('cancel', (e) => {
    // ESCキーでキャンセルするとき閉じない
    e.preventDefault();
  });
  dialog.addEventListener(
    'toggle',
    (e /* ToggleEvent */) => {
      // showModal したらイベントが発火する
      if (e.target === dialog) {
        dialog.classList.add('open');
      }
    },
    { once: true },
  );

  const template = `
    <span
      class="icon-[eos-icons--bubble-loading] text-opacity-60 dark:text-opacity-60 h-16 w-16 text-gray-600 dark:text-gray-800"
    ></span>
    <span class="sr-only">Loading...</span>
    <input autofocus class="border-none bg-transparent caret-transparent outline-hidden" />
    `;

  dialog.innerHTML = template;

  dialog.classList.add(
    ...[
      'relative m-auto flex flex-col items-center bg-transparent outline-hidden',
      'opacity-0 transition duration-200 ease-out',
      '[&.open]:opacity-100',
      'backdrop:bg-gray-400/10 backdrop:opacity-0 backdrop:backdrop-blur-[1px] backdrop:transition backdrop:duration-150 backdrop:ease-out',
      '[&.open]:backdrop:opacity-100',
    ]
      .map((x) => x.split(' '))
      .flat(),
  );
}
