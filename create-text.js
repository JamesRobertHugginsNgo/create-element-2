import createId from './utilities/create-id.js';

import createField from './create-field.js';

export default function createText(definition) {
    let modelSetter;

    const {
        ariaDescribedby,
        bindTo,
        id = createId('text-'),
        pattern,
        preHelpText,
        postHelpText,
        readOnly,
        required,
        title,
        type = 'text'
    } = definition;

    let inputEl;
    const fieldProvider = ({ preHelpTextId, postHelpTextId }) => {
        return {
            name: 'input',
            attributes: {
                id,
                name: id,
                pattern,
                readonly: !readOnly ? null : '',
                required: !required ? null : '',
                type,
                'aria-describedby': !ariaDescribedby && !preHelpTextId && !postHelpTextId
                    ? null
                    : [ariaDescribedby, preHelpTextId, postHelpTextId].filter(Boolean).join(' '),
                'aria-required': !required ? null : true
            },
            callback: (element) => {
                inputEl = element;
            }
        }
    };

    const element = createField({
        fieldProvider,
        id,
        preHelpText,
        postHelpText,
        required,
        title
    });

    element.classList.add('text-field');

    if (bindTo != null) {
        let changeListener;
        modelSetter = (model) => {
            if (changeListener) {
                inputEl.removeEventListener('change', changeListener);
                changeListener = null;
            }
            if (model) {
                const { [bindTo] : value = '' } = model;
                inputEl.value = value;
                changeListener = () => {
                    model[bindTo] = inputEl.value;
                };
                inputEl.addEventListener('change', changeListener);
            } else {
                inputEl.value = '';
            }
        };
    }

    return { element, modelSetter };
}