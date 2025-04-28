export function useToast() {
  return {
    async open({
      colorset = 'blue',
      icon = 'icon-[bx--info-circle]',
      message = '',
      duration = 2000,
    }: {
      colorset?: 'blue' | 'green' | 'yellow' | 'red';
      icon?: string;
      message?: string;
      duration?: number;
    }) {
      const parent = document.createElement('div');

      const container = document.getElementById('toast-container');

      if (container) {
        container.appendChild(parent);
      } else {
        const container = document.createElement('div');
        container.setAttribute('id', 'toast-container');

        container.style.position = 'fixed';
        container.style.zIndex = '10';
        container.style.bottom = '2rem';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';

        container.appendChild(parent);
        document.body.appendChild(container);
      }

      parent.innerHTML = templateToast({ colorset, icon, message });

      parent.animate(
        { opacity: [0, 100], transform: ['translate(0, 1rem)', 'translate(0)'] },
        { duration: 200, easing: 'ease-out', fill: 'both' },
      );

      setTimeout(() => {
        const animate = parent.animate(
          { opacity: [100, 0], transform: ['translate(0)', 'translate(0, 1rem)'] },
          { duration: 200, easing: 'ease-in', fill: 'both' },
        );
        animate.onfinish = () => {
          const container = document.getElementById('toast-container');
          if (container) {
            container.removeChild(parent);
            if (!container.hasChildNodes()) {
              document.body.removeChild(container);
            }
          }
        };
      }, duration);
    },

    async success(message: string) {
      return this.open({
        message,
        colorset: 'green',
        icon: 'icon-[bx--check]',
      });
    },

    async info(message: string) {
      return this.open({
        message,
        colorset: 'blue',
        icon: 'icon-[bx--info-circle]',
      });
    },
  };
}

function templateToast(props: {
  colorset: 'blue' | 'green' | 'yellow' | 'red';
  icon: string;
  message: string;
}) {
  const bgColor = (function () {
    switch (props.colorset) {
      case 'green':
        return 'bg-green-100 dark:bg-green-800';
      case 'yellow':
        return 'bg-yellow-100 dark:bg-yellow-800';
      case 'red':
        return 'bg-red-100 dark:bg-red-800';
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-800';
    }
  })();

  const textColor = (function () {
    switch (props.colorset) {
      case 'green':
        return 'text-green-500 dark:text-green-200';
      case 'yellow':
        return 'text-yellow-500 dark:text-yellow-200';
      case 'red':
        return 'text-red-500 dark:text-red-200';
      case 'blue':
        return 'text-blue-500 dark:text-blue-200';
    }
  })();

  return `
    <div class="relative mt-4 flex rounded-lg p-2 items-center gap-2 text-gray-500 shadow-md ${bgColor}">
      <div class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-lg ${textColor}">
        <span class="h-5 w-5 ${props.icon}"> </span>
      </div>

      <div class="min-w-0 grow">
${props.message}
      </div>
    </div>
  `;
}
