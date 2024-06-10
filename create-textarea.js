import createId from './utilities/create-id.js';

import createField from './create-field.js';

export default function createText(definition) {
    let modelSetter;

    const {
        bindTo,
        cols,
        id = createId('textarea-'),
        pattern,
        preHelpText,
        postHelpText,
        readOnly,
        required,
        rows,
        title
    } = definition;

    let textareaEl;
    const fieldProvider = ({ preHelpTextId, postHelpTextId }) => {
        return {
            name: 'textarea',
            attributes: {
                cols,
                id,
                name: id,
                pattern,
                readonly: !readOnly ? null : '',
                required: !required ? null : '',
                rows,
                'aria-describedby': !preHelpTextId && !postHelpTextId
                    ? null
                    : [preHelpTextId, postHelpTextId].filter(Boolean).join(' '),
                'aria-required': !required ? null : true
            },
            callback: (element) => {
                textareaEl = element;
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

    element.classList.add('textarea-field');

    if (bindTo != null) {
        let changeListener;
        modelSetter = (model) => {
            if (changeListener) {
                textareaEl.removeEventListener('change', changeListener);
                changeListener = null;
            }
            if (model) {
                const { [bindTo] : value = '' } = model;
                textareaEl.value = value;
                changeListener = () => {
                    model[bindTo] = textareaEl.value;
                };
                textareaEl.addEventListener('change', changeListener);
            } else {
                textareaEl.value = '';
            }
        };
    }

    return { element, modelSetter };
}