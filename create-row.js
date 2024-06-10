import createHtml from './utilities/create-html.js';
import mergeValues from './utilities/merge-values.js';

import createCheckboxSet from './create-checkbox-set.js';
import createText from './create-text.js';
import createTextarea from './create-textarea.js';

const creators = {
    'checkboxset': createCheckboxSet,
    'text': createText,
    'textarea': createTextarea
};

export default function createRow(definition) {
    let modelSetter;

    const { fields, id } = definition;

    const element = createHtml({
        name: 'div',
        attributes: { id },
        classes: ['row'],
        children: [
            !fields ? null : fields.map((field) => {
                const { type = 'text' } = field;
                const { element: fieldEl, modelSetter: fieldModelSetter } = creators[type](field);
                modelSetter = mergeValues(modelSetter, fieldModelSetter);
                return {
                    name: 'div',
                    children: [fieldEl]
                };
            })
        ]
    });

    return { element, modelSetter };
}