(function () {
  const { registerFormatType } = wp.richText;
  const { RichTextToolbarButton } = wp.blockEditor;

  registerFormatType('sitesanddesign/replace-spaces', {
    title: 'Заменить пробелы на неразрывные',
    tagName: 'span', // Используем span для регистрации формата
    className: 'non-breaking-space', // Класс для стиля, если нужно
    edit: ({ value, onChange }) => {
      const replaceSpaces = () => {
        const nbsp = '\u00A0'; // Неразрывный пробел

        // Достаём текст, начало и конец выделения
        const { text, start, end } = value;

        if (start === end) {
          // Если ничего не выделено — ничего не делаем
          return;
        }

        // Получаем выделенный фрагмент текста
        const selectedText = text.substring(start, end);

        // Заменяем обычные пробелы на неразрывные
        const replacedText = selectedText.replace(/ /g, nbsp);

        // Формируем новый текст с заменённым выделением
        const newText =
          text.substring(0, start) + replacedText + text.substring(end);

        // Обновляем значение
        const newValue = { ...value, text: newText };
        onChange(newValue);
      };

      return (
        wp.element.createElement(RichTextToolbarButton, {
          icon: 'editor-code', // Иконка кнопки
          title: 'Заменить пробелы на неразрывные',
          onClick: replaceSpaces,
        })
      );
    },
  });
})();