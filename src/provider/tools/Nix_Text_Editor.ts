 import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



 export class NIX_TEXT_EDITOR {
  constructor() { }

  Editor = ClassicEditor;
  Editors = ClassicEditor.default.defaultConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'insertTable',
        '|',
        '|',
        'undo',
        'redo'
      ]
    },
    image: {
      toolbar: ['imageTextAlternative'] // Add an item to the "image" toolbar
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    language: 'en',
  };
}