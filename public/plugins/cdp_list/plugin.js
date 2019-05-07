'use strict';

(function () {
    CKEDITOR.plugins.add('cdpNumberedList', {
        icons: 'cdpnumberedlist',
        hidpi: true,
        init: function (editor) {
            if (editor.blockless) {
                return;
            }

            editor.on('change', function (evt) {
                var editor = evt.editor,
                    doc = editor.document;

                var lists = doc.getElementsByTag('ol'),
                    listItems = [],
                    children, i, iMax;

                for (i = 0, iMax = lists.count(); i < iMax; ++i) {
                    children = lists.getItem(i).getElementsByTag('li');

                    for (var j = 0, jMax = children.count(); j < jMax; ++j) {
                        listItems.push(children.getItem(j));
                    }
                }

                var item, hasLabel, isLabelEmpty, hasListItem, isListItemEmpty, hasSublist;

                for (i = 0, iMax = listItems.length; i < iMax; ++i) {
                    item = listItems[i];
                    hasLabel = false;
                    hasListItem = false;
                    hasSublist = false;
                    isLabelEmpty = true;
                    isListItemEmpty = true;



                    if (0 == item.$.children.length) {
                        newLabel = doc.createElement('div');
                        newLabel.setAttribute('class', 'label');
                        newLabel.setText('#.');

                        newItem = doc.createElement('div');
                        newItem.setAttribute('class', 'list-item');

                        item.moveChildren(newItem);
                        newLabel.appendTo(item);
                        newItem.appendTo(item);
                    } else if (1 == item.$.children.length) {
                        firstChild = item.getFirst();

                        if ('div' == firstChild.getName() && 'label' == firstChild.getAttribute('class')) {
                            newItem = doc.createElement('div');
                            newItem.setAttribute('class', 'list-item');
                            newItem.setText('Enter text...');
                            newItem.insertAfter(firstChild);
                        } else if ('div' == firstChild.getName() && 'list-item' == firstChild.getAttribute('class')) {
                            newLabel = doc.createElement('div');
                            newLabel.setAttribute('class', 'label');
                            newLabel.setText('#.');
                            newLabel.insertBefore(firstChild);
                        }
                    }
                }
            });
        }
    });
})();