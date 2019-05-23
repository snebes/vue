'use strict';

(function () {
    var listCommand = {
        exec: function (editor) {
            var state = editor.getCommand('cdpNumberedList').state,
                selection = editor.getSelection(),
                range = selection && selection.getRanges()[0];

            if (!range) {
                return;
            }

            var bookmarks = selection.createBookmarks();

            // @todo: move cursor to block element.

            var iterator = range.createIterator(),
                block;
            iterator.enlargeBr = editor.config.enterMode != CKEDITOR.ENTER_BR;

            if (state == CKEDITOR.TRISTATE_OFF) {
                var paragraphs = [];

                while ((block = iterator.getNextParagraph())) {
                    paragraphs.push(block);
                }

                // If no paragraphs, create one from the current selection position.
                if (paragraphs.length < 1) {
                    var para = editor.document.createElement('div'),
                        firstBookmark = bookmarks.shift();

                    range.insertNode(para);
                    para.append(new CKEDITOR.dom.text('\ufeff', editor.document));
                    range.moveToBookmark(firstBookmark);
                    range.selectNodeContents(para);
                    range.collapse(true);

                    firstBookmark = range.createBookmark();
                    paragraphs.push(para);
                    bookmarks.unshift(firstBookmark);
                }

                // Make sure all paragraphs have the same parent.
                var commonParent = paragraphs[0].getParent(),
                    tmp = [];

                for (var i = 0; i < paragraphs.length; ++i) {
                    block = paragraphs[i];
                    commonParent = commonParent.getCommonAncestor(block.getParent());
                }

                var newOl = editor.document.createElement('ol'),
                    newLi = editor.document.createElement('li'),
                    newLabel = editor.document.createElement('div'),
                    newContent = editor.document.createElement('div');

                newOl.addClass('cdp-numbered-list').insertBefore(paragraphs[0]);
                newLi.appendTo(newOl);

                newLabel.addClass('label');
                newLabel.setText('#.');
                newLabel.appendTo(newLi);
                newContent.addClass('list-item');
                newContent.setText('Enter text...');
                newContent.appendTo(newLi);
            }

            selection.selectBookmarks( bookmarks );
            editor.focus();
        },
    };

    CKEDITOR.plugins.add('cdpNumberedList', {
        requires: 'widget',
        icons: 'cdpnumberedlist',
        hidpi: true,
        init: function (editor) {
            if (editor.blockless) {
                return;
            }

            editor.on('change', function (evt) {
                console.log(evt.editor.getData());
            });

            // editor.addCommand('cdpNumberedList', listCommand);
            // editor.ui.addButton && editor.ui.addButton('CdpNumberedList', {
            //     label: 'Insert Numbered List (c)',
            //     command: 'cdpNumberedList',
            //     toolbar: 'list,10'
            // });





            editor.widgets.add('cdpNumberedList', {
                template: '<li><div class="label"></div><div class="list-item"></div></li>',
                editables: {
                    label: {
                        selector: 'div.label'
                    },
                    content: {
                        selector: 'div.list-item'
                    }
                },
                upcast: function (el) {
                    console.log(el);
                    if (el.name != 'li' || el.parent.name != 'ol') {
                        return false;
                    }

                    return el;
                }
            });

            // editor.addCommand('cdpNumberedList', {
            //     context: 'ol',
            //     allowedContent: 'ol[class]; li; div; del ins sub sup',
            //     requiredContent: 'ol; li',
            // });
        }
    });
})();
