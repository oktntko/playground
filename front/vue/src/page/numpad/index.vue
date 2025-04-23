<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';
import { Decimal } from '~/lib/decimal.js';

const modelvalue = ref('');
const refInput = useTemplateRef<HTMLInputElement>('refInput');

async function setNewValueAndSetSelectionToRefInput(
  fn: (current: { start: number; end: number; value: string }) => {
    newValue: string;
    newSelection: number;
  },
  target: EventTarget | null,
) {
  const input = refInput.value;
  if (!input) {
    return;
  }

  const start = input.selectionStart;
  const end = input.selectionEnd;
  if (start == null || end == null) {
    return;
  }

  input.focus();
  const value = modelvalue.value;
  const { newValue, newSelection } = fn({ start, end, value });
  modelvalue.value = newValue;

  await nextTick();
  input.setSelectionRange(newSelection, newSelection);
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
          newValue: current.value.slice(0, current.start - 1) + current.value.slice(current.start),
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
          newValue: current.value.slice(0, current.start) + current.value.slice(current.start + 1),
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
  modelvalue.value = '';

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
const numlockState = useKeyModifier('NumLock', { initial: true });
const pseudoNumlockState = ref(numlockState.value);
watch(numlockState, num);

function num(newValue: boolean) {
  pseudoNumlockState.value = newValue;

  if (pseudoNumlockState.value) {
    document.getElementById(numlockID)?.focus();
  } else {
    refInput.value?.focus();
  }
}

const numpad = computed(
  (): {
    id?: string;
    type?: ButtonHTMLAttributes['type'];
    label: string;
    onClick?: (payload: MouseEvent) => void;
    additionalClass?: string;
    positions: {
      col: number;
      row: number;
    }[];
  }[] => {
    return [
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
        onClick: () => num(!pseudoNumlockState.value),
        positions: [{ col: 0, row: 1 }],
        additionalClass: pseudoNumlockState.value
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
    ];
  },
);

const refHistory = useTemplateRef<HTMLButtonElement[]>('refHistory');
const refNumpad = useTemplateRef<HTMLButtonElement[]>('refNumpad');

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
    return refInput.value?.focus();
  }

  const index = numpad.value.findIndex(
    ({ positions: position }) =>
      ~position.findIndex(
        (position) => position.col === moveToPosition.col && position.row === moveToPosition.row,
      ),
  );

  if (~index) {
    refNumpad.value?.[index]?.focus();
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
const calculateResult = ref('');
function calculate(expression: string) {
  calculateResult.value = '';
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
  calculateResult.value = result.toLocaleString();
  return result;
}

const historyList = ref<{ expression: string; result: number }[]>([]);

async function handleSubmit() {
  const result = calculate(modelvalue.value);
  if (result == null) {
    return;
  }

  const activeElement = document.activeElement;
  refInput.value?.focus();

  const newValue = result.toString();

  historyList.value.push({
    expression: modelvalue.value,
    result,
  });
  modelvalue.value = newValue;

  await nextTick();
  refInput.value?.setSelectionRange(newValue.length, newValue.length);
  if (activeElement instanceof HTMLElement) {
    activeElement.focus();
  }
  const container = document.getElementById('history-list');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}
function isTypingElement(el: Element | null): boolean {
  return (
    !!el &&
    (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || (el as HTMLElement).isContentEditable)
  );
}

function isKeyHandleKey(key: string): key is (typeof NUMPAD)[number] {
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

  return (NUMPAD as readonly string[]).includes(key);
}

useEventListener(document, 'keydown', (e) => {
  if (isTypingElement(document.activeElement)) {
    return;
  }

  if (!isKeyHandleKey(e.key)) {
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
});
</script>

<template>
  <div class="my-8 text-center">
    <form class="inline-flex flex-col gap-4" @submit.prevent="handleSubmit">
      <!-- 履歴 -->
      <div
        id="history-list"
        :class="[
          'h-20 snap-y snap-mandatory overflow-y-scroll scroll-smooth',
          'text-right font-mono',
        ]"
      >
        <button
          v-for="(history, i) of historyList"
          :key="i"
          ref="refHistory"
          type="button"
          :class="[
            'flex h-20 w-full snap-center snap-always flex-col items-end justify-center px-2',
            'transition-shadow ring-inset focus:ring-2 focus:ring-blue-400 focus:outline-none',
            'hover:bg-blue-50 focus:bg-blue-50',
          ]"
          @keydown="
            (e) => {
              switch (e.key) {
                case 'ArrowUp':
                  e.preventDefault();
                  if (i > 0) {
                    refHistory?.[i - 1].focus();
                  }
                  break;
                case 'ArrowDown':
                  e.preventDefault();
                  if (i < historyList.length - 1) {
                    return refHistory?.[i + 1].focus();
                  } else {
                    return refInput?.focus();
                  }
              }
            }
          "
          @click="
            async () => {
              await $navigator.clipboard.writeText(`${history.result}`);
              $toast.info('copied to clipboard');
            }
          "
        >
          <div class="text-lg">{{ history.expression }}</div>
          <div class="text-base">{{ history.result }}</div>
        </button>
      </div>

      <!-- 入力部 -->
      <div>
        <div class="relative h-12 w-full">
          <div
            :class="[
              'absolute top-0 left-0 h-full w-full',
              'z-0 whitespace-pre-wrap text-transparent',
              'rounded border-[0.5px] border-black p-2.5 text-right font-mono text-lg',
              'transition-shadow ring-inset focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none',
            ]"
          >
            <div>
              <span
                v-for="(token, i) of modelvalue.split('')"
                :key="i"
                :class="
                  token.match(/[\d.]/)
                    ? 'text-gray-800'
                    : ['+', '-', '*', '/'].includes(token)
                      ? 'text-purple-600'
                      : token === '(' || token === ')'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                "
              >
                {{ token }}
              </span>
            </div>
          </div>
          <input
            ref="refInput"
            v-model="modelvalue"
            type="text"
            required
            pattern="^[\d\s\+\-\*\/\(\)\.]+"
            maxlength="32"
            :class="[
              'absolute top-0 left-0 h-full w-full',
              'z-10 bg-transparent text-black/25' /* opacity だとすべて透明、 transparent・rgba(/0) だとカーソルも透明になるんので、カーソルがギリギリ見えて裏の文字色が有効に見える濃さにしている */,
              'rounded border-[0.5px] border-black p-2.5 text-right font-mono text-lg',
              'transition-shadow ring-inset focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none',
            ]"
            @input="
              () => {
                const validNewValue = (modelvalue.match(/([\d\s+\-*/().])/g) ?? []).join('');
                modelvalue = validNewValue;
                calculate(validNewValue);
              }
            "
            @keydown="
              (e) => {
                switch (e.key) {
                  case 'ArrowUp':
                    e.preventDefault();
                    if (historyList.length > 0) {
                      refHistory?.[historyList.length - 1].focus();
                    }
                    break;
                  case 'ArrowDown':
                    e.preventDefault();
                    return refNumpad?.[0]?.focus();
                }
              }
            "
          />
        </div>
        <div class="h-8 text-right font-mono">
          <!-- 計算結果 -->
          {{ calculateResult }}
        </div>
      </div>

      <!-- テンキー -->
      <div class="flex justify-center">
        <div class="grid grid-cols-4 grid-rows-6 gap-0.5">
          <button
            v-for="(button, i) of numpad"
            :id="button.id"
            :key="i"
            ref="refNumpad"
            :type="button.type ?? 'button'"
            :class="[
              button.additionalClass,
              'relative inline-flex flex-col items-center justify-center rounded border-[0.5px] border-black p-4 text-lg capitalize',
              'transition-shadow ring-inset focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none',
              'hover:bg-blue-50 focus:bg-blue-50',
            ]"
            @keydown="
              (e) => {
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
              }
            "
            @click="button.onClick"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* https://jangidrahulkumar.medium.com/25-css-glowing-effect-these-effects-blow-your-mind-ec1c50f4ccdd */
</style>
