import createHtml from './utilities/create-html.js';
import createId from './utilities/create-id.js';
import mergeValues from './utilities/merge-values.js';
import suffix from './utilities/suffix.js';

import createRow from './create-row.js';

const creators = {
    'repeatcontrol': createRepeatcontrolRow,
    'row': createRow
}

export default function createRepeatcontrolRow(definition) {
    let modelSetter;

    const {
        bindTo,
        id = createId('repeatcontrol-row-'),
        title,
        rows,
        setTitle
    } = definition;

    let addButtonEl, repeatcontrolSetsEl;

    const titleId = suffix(id, '-title');

    const element = createHtml({
        name: 'div',
        attributes: { id },
        classes: ['repeatcontrol-row'],
        children: [
            !title ? null : {
                name: 'h4',
                attributes: { id: titleId },
                children: [title]
            },
            {
                name: 'div',
                classes: ['repeatcontrol-sets'],
                callback(element) {
                    repeatcontrolSetsEl = element;
                }
            },
            {
                name: 'button',
                attributes: { type: 'button' },
                children: !title ? 'Add' : `Add ${title}`,
                callback(element) {
                    addButtonEl = element;
                }
            }
        ]
    });

    if (rows) {
        let collection;

        let counter = 0;
        const addRow = (rowModel) => {
            counter++;

            const setTitleFinal = !setTitle ? null : `${setTitle} (${counter})`;
            const setTitleId = !setTitleFinal ? null : suffix(id, `-set-title-${counter}`);

            let rowModelSetter, removeButtonEl;
            const rowElement = createHtml({
                name: 'div',
                classes: ['repeatcontrol-set'],
                children: [
                    !setTitleFinal ? null : {
                        name: 'h5',
                        attributes: { id: setTitleId },
                        children: [setTitleFinal]
                    },
                    {
                        name: 'div',
                        children: rows.map((row) => {
                            const { type = 'row' } = row;
                            const { element: rowEl, modelSetter } = creators[type](row);
                            if (rowModel) {
                                rowModelSetter = mergeValues(rowModelSetter, modelSetter);
                            }
                            return rowEl;
                        })
                    },
                    {
                        name: 'button',
                        attributes: { type: 'button' },
                        children: [!setTitleFinal ? 'Remove' : `Remove ${setTitleFinal}`],
                        callback: (element) => {
                            removeButtonEl = element;
                        }
                    }
                ]
            });
            removeButtonEl.addEventListener('click', () => {
                if (collection) {
                    collection.splice(collection.indexOf(rowModel), 1);
                }
                rowElement.remove();
            });
            repeatcontrolSetsEl.append(rowElement);
            if (rowModel && rowModelSetter) {
                rowModelSetter(rowModel);
            }
        };

        addButtonEl.addEventListener('click', () => {
            const rowModel = !collection ? null : {};
            if (rowModel) {
                collection.push(rowModel);
            }
            addRow(rowModel);
        });


        if (bindTo != null) {
            modelSetter = (model) => {
                if (model) {
                    const { [bindTo]: value = [] } = model;
                    if (model[bindTo] !== value) {
                        model[bindTo] = value;
                    }

                    collection = value;

                    repeatcontrolSetsEl.replaceChildren();

                    for (const rowModel of collection) {
                        addRow(rowModel);
                    }
                } else {
                    collection = null;
                }
            };
        }
    }

    return { element, modelSetter };
}