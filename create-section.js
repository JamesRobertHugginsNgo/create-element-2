import createHtml from './utilities/create-html.js';
import mergeValues from './utilities/merge-values.js';
import suffix from './utilities/suffix.js';

import createRepeatcontrolRow from './create-repeatcontrol-row.js';
import createRow from './create-row.js';

const creators = { 
    'repeatcontrol': createRepeatcontrolRow,
    'row': createRow 
}

export default function createSection(definition) {
    let modelSetter;

    const { id, rows, title } = definition;

    const element = createHtml({
        name: 'div',
        attributes: { id },
        classes: ['section'],
        children: [
            !title ? null : {
                name: 'h3',
                attributes: { id: suffix(id, '-section-title') },
                children: [title]
            },
            {
                name: 'div',
                children: !rows ? null : rows.map((row) => {
                    const { type = 'row' } = row;
                    const { element: rowEl, modelSetter: rowModelSetter } = creators[type](row);
                    modelSetter = mergeValues(modelSetter, rowModelSetter);
                    return rowEl;
                })
            }
        ]
    });

    return { element, modelSetter };
}