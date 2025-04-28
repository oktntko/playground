<script lang="ts">
  import { Decimal } from '$lib/decimal.js';
  import { routes } from '$lib/routes';
  import { tick } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { page } from '$app/state';
  import { useToast } from '$lib/toast';

  const toast = useToast();

  let modelvalue = $state('');
  let refInput: HTMLInputElement;

  async function setNewValueAndSetSelectionToRefInput(
    fn: (current: { start: number; end: number; value: string }) => {
      newValue: string;
      newSelection: number;
    },
    target: EventTarget | null,
  ) {
    const start = refInput.selectionStart;
    const end = refInput.selectionEnd;
    if (start == null || end == null) {
      return;
    }

    refInput.focus();
    const value = modelvalue;
    const { newValue, newSelection } = fn({ start, end, value });
    modelvalue = newValue;

    await tick();
    refInput.setSelectionRange(newSelection, newSelection);
    if (target instanceof HTMLElement) {
      target.focus();
    }
  }

  async function input({ target, char }: { target: EventTarget | null; char: string }) {
    return setNewValueAndSetSelectionToRefInput(
      (current) => ({
        newValue: current.value.slice(0, current.start) + char + current.value.slice(current.end),
        newSelection: current.start + char.length,
      }),
      target,
    );
  }

  async function backspace({ target }: { target: EventTarget | null }) {
    return setNewValueAndSetSelectionToRefInput((current) => {
      if (current.start === current.end) {
        if (current.start === 0) {
          return {
            newValue: current.value,
            newSelection: 0,
          };
        } else {
          return {
            newValue:
              current.value.slice(0, current.start - 1) + current.value.slice(current.start),
            newSelection: current.start - 1,
          };
        }
      } else {
        return {
          newValue: current.value.slice(0, current.start) + current.value.slice(current.end),
          newSelection: current.start,
        };
      }
    }, target);
  }

  async function del({ target }: { target: EventTarget | null }) {
    return setNewValueAndSetSelectionToRefInput((current) => {
      if (current.start === current.end) {
        if (current.start === current.value.length) {
          return {
            newValue: current.value,
            newSelection: current.value.length,
          };
        } else {
          return {
            newValue:
              current.value.slice(0, current.start) + current.value.slice(current.start + 1),
            newSelection: current.start,
          };
        }
      } else {
        return {
          newValue: current.value.slice(0, current.start) + current.value.slice(current.end),
          newSelection: current.start,
        };
      }
    }, target);
  }

  function clear({ target }: { target: EventTarget | null }) {
    modelvalue = '';

    if (target instanceof HTMLElement) {
      target.focus();
    }
  }

  function equal() {
    const button = document.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) {
      button.click();
    }
  }

  // プログラムから NumLock の切り替えは行えないので、疑似 NumLock を用意し、 実際の値を監視して値を合わせる
  const numlockID = 'pseudo-numlock';
  let numlockState = $state(true);
  let pseudoNumlockState = $state(true);
  $effect(() => {
    num(numlockState);
  });

  function num(newValue: boolean) {
    pseudoNumlockState = newValue;

    if (pseudoNumlockState) {
      document.getElementById(numlockID)?.focus();
    } else {
      refInput.focus();
    }
  }

  const numpad: {
    id?: string;
    type?: HTMLButtonAttributes['type'];
    label: string;
    onClick?: (payload: MouseEvent) => void;
    additionalClass?: string;
    positions: {
      col: number;
      row: number;
    }[];
  }[] = $derived([
    {
      label: 'clear',
      onClick: (e) => clear({ target: e.target }),
      positions: [{ col: 0, row: 0 }],
    },
    {
      label: '（',
      onClick: (e) => input({ target: e.target, char: '(' }),
      positions: [{ col: 1, row: 0 }],
      additionalClass: 'font-bold text-yellow-600',
    },
    {
      label: '）',
      onClick: (e) => input({ target: e.target, char: ')' }),
      positions: [{ col: 2, row: 0 }],
      additionalClass: 'font-bold text-yellow-600',
    },
    {
      label: 'del',
      onClick: (e) => del({ target: e.target }),
      positions: [{ col: 3, row: 0 }],
    },

    {
      label: 'num',
      id: numlockID,
      onClick: () => num(!pseudoNumlockState),
      positions: [{ col: 0, row: 1 }],
      additionalClass: pseudoNumlockState
        ? "before:absolute before:top-2.5 before:right-2.5 before:h-1 before:w-1 before:rounded-full before:bg-green-100 before:shadow-[0_0_2px_2px_var(--color-green-200),0_0_4px_4px_var(--color-green-400)] before:content-['']"
        : '',
    },
    {
      label: '➗',
      onClick: (e) => input({ target: e.target, char: '/' }),
      positions: [{ col: 1, row: 1 }],
    },
    {
      label: '✖️',
      onClick: (e) => input({ target: e.target, char: '*' }),
      positions: [{ col: 2, row: 1 }],
    },
    {
      label: '🔙',
      onClick: (e) => backspace({ target: e.target }),
      positions: [{ col: 3, row: 1 }],
    },

    {
      label: '７',
      onClick: (e) => input({ target: e.target, char: '7' }),
      positions: [{ col: 0, row: 2 }],
    },
    {
      label: '８',
      onClick: (e) => input({ target: e.target, char: '8' }),
      positions: [{ col: 1, row: 2 }],
    },
    {
      label: '９',
      onClick: (e) => input({ target: e.target, char: '9' }),
      positions: [{ col: 2, row: 2 }],
    },
    {
      label: '➖',
      onClick: (e) => input({ target: e.target, char: '-' }),
      positions: [{ col: 3, row: 2 }],
    },

    {
      label: '４',
      onClick: (e) => input({ target: e.target, char: '4' }),
      positions: [{ col: 0, row: 3 }],
    },
    {
      label: '５',
      onClick: (e) => input({ target: e.target, char: '5' }),
      positions: [{ col: 1, row: 3 }],
    },
    {
      label: '６',
      onClick: (e) => input({ target: e.target, char: '6' }),
      positions: [{ col: 2, row: 3 }],
    },
    {
      label: '➕',
      onClick: (e) => input({ target: e.target, char: '+' }),
      positions: [{ col: 3, row: 3 }],
    },

    {
      label: '１',
      onClick: (e) => input({ target: e.target, char: '1' }),
      positions: [{ col: 0, row: 4 }],
    },
    {
      label: '２',
      onClick: (e) => input({ target: e.target, char: '2' }),
      positions: [{ col: 1, row: 4 }],
    },
    {
      label: '３',
      onClick: (e) => input({ target: e.target, char: '3' }),
      positions: [{ col: 2, row: 4 }],
    },
    {
      label: '🟰',
      type: 'submit',
      additionalClass: 'row-span-2',
      positions: [
        { col: 3, row: 4 },
        { col: 3, row: 5 },
      ],
    },

    {
      label: '０',
      onClick: (e) => input({ target: e.target, char: '0' }),
      additionalClass: 'col-span-2',
      positions: [
        { col: 0, row: 5 },
        { col: 1, row: 5 },
      ],
    },
    {
      label: '．',
      onClick: (e) => input({ target: e.target, char: '.' }),
      positions: [{ col: 2, row: 5 }],
    },
  ]);

  let refHistory = $state<HTMLButtonElement[]>([]);
  let refNumpad = $state<HTMLButtonElement[]>([]);

  function moveFocus({
    currentPosition,
    move: { col = 0, row = 0 },
  }: {
    currentPosition: {
      col: number;
      row: number;
    };
    move: {
      col?: number;
      row?: number;
    };
  }) {
    const moveToPosition = {
      col: currentPosition.col + col,
      row: currentPosition.row + row,
    };

    if (moveToPosition.row < 0) {
      return refInput.focus();
    }

    const index = numpad.findIndex(
      ({ positions: position }) =>
        ~position.findIndex(
          (position) => position.col === moveToPosition.col && position.row === moveToPosition.row,
        ),
    );

    if (~index) {
      refNumpad[index]?.focus();
    }
  }

  type Operator = {
    precedence: number;
    assoc: 'L' | 'R';
    func: (...args: number[]) => number;
  };

  const ops: Record<string, Operator> = {
    '+' /*   */: { precedence: 1, assoc: 'L', func: (a, b) => Decimal(a).add(b).toNumber() },
    '-' /*   */: { precedence: 1, assoc: 'L', func: (a, b) => Decimal(a).sub(b).toNumber() },
    '*' /*   */: { precedence: 2, assoc: 'L', func: (a, b) => Decimal(a).mul(b).toNumber() },
    '/' /*   */: { precedence: 2, assoc: 'L', func: (a, b) => Decimal(a).div(b).toNumber() },
    'u-' /*  */: { precedence: 3, assoc: 'R', func: (a) => -a }, // 単項マイナス
  };
  let calculateResult = $state('');
  function calculate(expression: string) {
    calculateResult = '';
    if (expression.length === 0) {
      return;
    }

    const rawTokens = expression.match(/(\d+(\.\d+)?|[()+\-*/])/g);
    if (!rawTokens) {
      return;
    }

    // 単項マイナスを u- に変換
    const tokens: string[] = [];
    for (let i = 0; i < rawTokens.length; i++) {
      const token = rawTokens[i];
      if (token === '-' && (i === 0 || ['(', '+', '-', '*', '/'].includes(rawTokens[i - 1]))) {
        tokens.push('u-');
      } else {
        tokens.push(token);
      }
    }

    const output: (number | string)[] = [];
    const stack: string[] = [];

    for (const token of tokens) {
      if (!isNaN(Number(token))) {
        output.push(parseFloat(token));
      } else if (token in ops) {
        while (
          stack.length &&
          stack[stack.length - 1] in ops &&
          ((ops[token].assoc === 'L' &&
            ops[token].precedence <= ops[stack[stack.length - 1]].precedence) ||
            (ops[token].assoc === 'R' &&
              ops[token].precedence < ops[stack[stack.length - 1]].precedence))
        ) {
          output.push(stack.pop() as string);
        }
        stack.push(token);
      } else if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        while (stack.length && stack[stack.length - 1] !== '(') {
          output.push(stack.pop() as string);
        }
        if (stack.length === 0) {
          return;
        }
        stack.pop(); // remove '('
      }
    }

    while (stack.length) {
      const op = stack.pop()!;
      if (op === '(' || op === ')') {
        return;
      }
      output.push(op);
    }

    // RPN 評価
    const evalStack: number[] = [];

    for (const token of output) {
      if (typeof token === 'number') {
        evalStack.push(token);
      } else if (token in ops) {
        if (token === 'u-') {
          const a = evalStack.pop();
          if (a === undefined) {
            return;
          }
          evalStack.push(ops[token].func(a));
        } else {
          const b = evalStack.pop();
          const a = evalStack.pop();
          if (a === undefined || b === undefined) {
            return;
          }
          evalStack.push(ops[token].func(a, b));
        }
      }
    }

    if (evalStack.length !== 1) {
      return;
    }

    const result = evalStack[0];
    calculateResult = result.toLocaleString();
    return result;
  }

  const historyList = $state<{ expression: string; result: number }[]>([]);

  async function handleSubmit(e?: SubmitEvent) {
    e?.preventDefault();
    const result = calculate(modelvalue);
    if (result == null) {
      return;
    }

    const activeElement = document.activeElement;
    refInput.focus();

    const newValue = result.toString();

    historyList.push({
      expression: modelvalue,
      result,
    });
    modelvalue = newValue;

    await tick();
    refInput.setSelectionRange(newValue.length, newValue.length);
    if (activeElement instanceof HTMLElement) {
      activeElement.focus();
    }
    const container = document.getElementById('history-list');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
</script>

<svelte:window
  onkeydown={(e) => {
    // https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent/getModifierState
    // Mac は対応していない
    numlockState = e.getModifierState('NumLock');
  }}
/>

<svelte:document
  onkeydown={(e) => {
    const active = document.activeElement;
    if (
      active &&
      (active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        (active as HTMLElement).isContentEditable)
    ) {
      return;
    }

    const CLEAR = 'Clear';
    const DEL = 'Delete';
    const BACKSPACE = 'Backspace';
    const NUM = [
      '/',
      '*',
      '-',
      '+',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '.',
      '(',
      ')',
    ] as const;
    const EQUAL = '=';
    const NUMPAD = [CLEAR, DEL, BACKSPACE, ...NUM, EQUAL] as const;

    if (!(NUMPAD as readonly string[]).includes(e.key)) {
      return;
    }

    e.preventDefault();
    switch (e.key) {
      case 'Clear':
        return clear({ target: e.target });
      case 'Delete':
        return del({ target: e.target });
      case 'Backspace':
        return backspace({ target: e.target });
      case '/':
      case '*':
      case '-':
      case '+':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
      case '(':
      case ')':
        return input({ target: e.target, char: e.key });
      case '=':
        return equal();
    }
  }}
/>

<div class="p-4">
  <div class="">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center gap-2">
        <li class="inline-flex items-center">
          <a
            href={routes.home}
            class={[
              'inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-600',
              page.url.pathname === routes.home ? 'text-gray-900' : '',
            ]}
          >
            <span class="icon-[vscode-icons--file-type-svelte] h-4 w-4"> </span>
            <span class="ms-1 capitalize">svelte</span>
          </a>
        </li>

        <li class="inline-flex items-center">
          <span class="icon-[weui--arrow-filled]"></span>
        </li>
        <li class="inline-flex items-center">
          <a
            href={routes.numpad}
            class={[
              'inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-600',
              page.url.pathname === routes.numpad ? 'text-gray-900' : '',
            ]}
          >
            <span class="icon-[arcticons--remotenumpad] h-4 w-4"> </span>
            <span class="ms-1 capitalize">numpad</span>
          </a>
        </li>
      </ol>
    </nav>
  </div>
  <div class="my-8 text-center">
    <form class="inline-flex flex-col gap-4" onsubmit={handleSubmit}>
      <!-- 履歴 -->
      <div
        id="history-list"
        class={[
          'h-20 snap-y snap-mandatory overflow-y-scroll scroll-smooth',
          'text-right font-mono',
        ]}
      >
        {#each historyList as history, i (i)}
          <button
            bind:this={refHistory[i]}
            type="button"
            class={[
              'flex h-20 w-full snap-center snap-always flex-col items-end justify-center px-2',
              'transition-shadow ring-inset focus:ring-2 focus:ring-blue-400 focus:outline-none',
              'hover:bg-blue-50 focus:bg-blue-50',
            ]}
            onkeydown={(e) => {
              switch (e.key) {
                case 'ArrowUp':
                  e.preventDefault();
                  if (i > 0) {
                    refHistory[i - 1]?.focus();
                  }
                  break;
                case 'ArrowDown':
                  e.preventDefault();
                  if (i < historyList.length - 1) {
                    return refHistory[i + 1]?.focus();
                  } else {
                    return refInput.focus();
                  }
              }
            }}
            onclick={async () => {
              await navigator.clipboard.writeText(`${history.result}`);
              toast.info('copied to clipboard');
            }}
          >
            <div class="text-lg">{history.expression}</div>
            <div class="text-base">{history.result}</div>
          </button>
        {/each}
      </div>

      <!-- 入力部 -->
      <div>
        <div class="relative h-12 w-full">
          <div
            class={[
              'absolute top-0 left-0 h-full w-full',
              'z-0 whitespace-pre-wrap text-transparent',
              'rounded border-[0.5px] border-black p-2.5 text-right font-mono text-lg',
              'transition-shadow ring-inset focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none',
            ]}
          >
            <div>
              {#each modelvalue.split('') as token, i (i)}
                <span
                  class={token.match(/[\d.]/)
                    ? 'text-gray-800'
                    : ['+', '-', '*', '/'].includes(token)
                      ? 'text-purple-600'
                      : token === '(' || token === ')'
                        ? 'text-yellow-400'
                        : 'text-red-400'}
                >
                  {token}
                </span>
              {/each}
            </div>
          </div>
          <input
            bind:this={refInput}
            bind:value={modelvalue}
            type="text"
            required
            pattern="^[\d\s\+\-\*\/\(\)\.]+"
            maxlength="32"
            class={[
              'absolute top-0 left-0 h-full w-full',
              'z-10 bg-transparent text-black/25' /* opacity だとすべて透明、 transparent・rgba(/0) だとカーソルも透明になるんので、カーソルがギリギリ見えて裏の文字色が有効に見える濃さにしている */,
              'rounded border-[0.5px] border-black p-2.5 text-right font-mono text-lg',
              'transition-shadow ring-inset focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none',
            ]}
            oninput={() => {
              const validNewValue = (modelvalue.match(/([\d\s+\-*/().])/g) ?? []).join('');
              modelvalue = validNewValue;
            }}
            onkeydown={(e) => {
              switch (e.key) {
                case 'ArrowUp':
                  e.preventDefault();
                  if (historyList.length > 0) {
                    refHistory[historyList.length - 1].focus();
                  }
                  break;
                case 'ArrowDown':
                  e.preventDefault();
                  return refNumpad[0]?.focus();
              }
            }}
          />
        </div>
        <div class="h-8 text-right">
          <!-- 計算結果 -->
          {calculateResult}
        </div>
      </div>

      <!-- テンキー -->
      <div class="flex justify-center">
        <div class="grid grid-cols-4 grid-rows-6 gap-0.5">
          {#each numpad as button, i (i)}
            <button
              id={button.id}
              bind:this={refNumpad[i]}
              type={button.type ?? 'button'}
              class={[
                button.additionalClass,
                'relative inline-flex flex-col items-center justify-center rounded border-[0.5px] border-black p-4 text-lg capitalize',
                'transition-shadow ring-inset focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none',
                'hover:bg-blue-50 focus:bg-blue-50',
              ]}
              onkeydown={(e) => {
                switch (e.key) {
                  case 'ArrowUp':
                    e.preventDefault();
                    return moveFocus({
                      currentPosition: button.positions[0],
                      move: { row: -1 },
                    });
                  case 'ArrowLeft':
                    e.preventDefault();

                    return moveFocus({
                      currentPosition: button.positions[0],
                      move: { col: -1 },
                    });
                  case 'ArrowRight':
                    e.preventDefault();
                    return moveFocus({
                      currentPosition: button.positions[button.positions.length - 1],
                      move: { col: 1 },
                    });
                  case 'ArrowDown':
                    e.preventDefault();
                    return moveFocus({
                      currentPosition: button.positions[button.positions.length - 1],
                      move: { row: 1 },
                    });
                }
              }}
              onclick={button.onClick}
            >
              {button.label}
            </button>
          {/each}
        </div>
      </div>
    </form>
  </div>
</div>
