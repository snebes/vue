'use strict';

(function () {
    CKEDITOR.plugins.add('cdpNumberedList', {
        requires: 'widget',
        icons: 'cdpnumberedlist',
        hidpi: true,
        init: function (editor) {
            if (editor.blockless) {
                return;
            }

            editor.on('change', function (evt) {
                var editor = evt.editor,
                    doc = editor.document;

                var lists = doc.find('ol'),
                    listItems, ol, li, label,
                    i, iMax, j, jMax;

                for (i = 0, iMax = lists.count(); i < iMax; ++i) {
                    ol = lists.getItem(i);
                    ol.addClass('cdp-numbered-list');

                    listItems = ol.find('>li');

                    for (j = 0, jMax = listItems.count(); j < jMax; ++j) {
                        li = listItems.getItem(j);

                        if (!li.is({li: 1})) {
                            continue;
                        }

                        // Check that label is the first element.
                        label = li.getFirst();

                        if ('div' === label.getName() && label.hasClass('label')) {
                            continue;
                        }

                        label = li.findOne('>div.label');

                        if (!label) {
                            label = doc.createElement('div');
                            label.addClass('label');
                            label.setText('#.');
                        }

                        label.insertBefore(li.getFirst());
                    }
                }
/*
                console.log(listItems);

                for (i = 0, iMax = listItems.length; i < iMax; ++i) {
                    var li = listItems[i],
                        liLabel = null,
                        liListItem = null,
                        subList = null,
                        hasOther = false;

                    for (j = 0, jMax = li.getChildCount(); j < jMax; ++j) {
                        var child = li.getChild(j);

                        if (!(child instanceof CKEDITOR.dom.element)) {
                            console.log(child);
                            continue;
                        }

                        if (child.is(CKEDITOR.dtd.$empty)) {
                            hasOther = false;
                        } else if (child.is('div') && child.hasClass('label')) {
                            liLabel = child;
                        } else if (child.is('div') && child.hasClass('list-item')) {
                            liListItem = child;
                        } else if (child.is('ol')) {
                            subList = true;
                        } else {
                            hasOther = true;
                        }
                    }

                    if (!liLabel) {
                        liLabel = doc.createElement('div');
                        liLabel.addClass('label');
                        liLabel.setText('#.');

                        if (liListItem instanceof CKEDITOR.dom.element) {
                            liLabel.insertBefore(liListItem);
                        } else {
                            liLabel.appendTo(li);
                        }
                    }

                    if (!liListItem) {
                        liListItem = doc.createElement('div');
                        liListItem.addClass('list-item');

                        if (hasOther) {
                            li.moveChildren(liListItem);
                        } else {
                            liListItem.setText('Enter text...');
                        }

                        if (liLabel) {
                            liListItem.insertAfter(liLabel);
                        } else {
                            liListItem.appendTo(li);
                        }
                    }
                }*/
            });
        },
        onLoad: function () {
            CKEDITOR.addCss(

            );
        }
    });
})();
