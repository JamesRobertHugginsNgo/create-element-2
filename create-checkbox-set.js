import createId from './utilities/create-id.js';
import suffix from './utilities/suffix.js';

import createFieldset from './create-fieldset.js';

export default function createCheckboxSet(definition) {
    let modelSetter;

    const {
        bindTo,
        choices,
        id = createId('checkbox-set-'),
        preHelpText,
        postHelpText,
        required,
        title
    } = definition;

    let checkboxEls = [];
    const fieldProvider = ({ legendId, preHelpTextId, postHelpTextId }) => {
        return !choices ? null : {
            name: 'div',
            classes: ['checkbox-set'],
            children: choices.map(({ text, value }, index) => {
                const checkboxId = suffix(id, `-${index}`);
                return [
                    {
                        name: 'div',
                        children: [
                            {
                                name: 'input',
                                attributes: {
                                    id: checkboxId,
                                    name: id,
                                    type: 'checkbox',
                                    value,
                                    'aria-checked': false,
                                    'aria-describedby': !preHelpTextId && !postHelpTextId
                                        ? null
                                        : [preHelpTextId, postHelpTextId].filter(Boolean).join(' '),
                                },
                                callback: (element) => {
                                    element.addEventListener('click', () => {
                                        element.setAttribute('aria-checked', element.checked);
                                    });
                                    checkboxEls.push(element);
                                }
                            },
                            ' ',
                            {
                                name: 'label',
                                attributes: { for: checkboxId },
                                children: [text]
                            }
                        ]
                    }
                ]
            })
        };
    };

    const element = createFieldset({
        fieldProvider,
        id,
        preHelpText,
        postHelpText,
        required,
        title
    });
    element.classList.add('checkbox-set-field');

    if (bindTo != null) {
        let clickListener;
        modelSetter = (model) => {
            if (clickListener) {
                for (const checkboxEl of checkboxEls) {
                    checkboxEl.removeEventListener('click', clickListener);
                }
                clickListener = null;
            }
            if (model) {
                const { [bindTo]: value = [] } = model;
                for (const checkboxEl of checkboxEls) {
                    checkboxEl.checked = value.indexOf(checkboxEl.value) !== -1;
                    checkboxEl.setAttribute('aria-checked', checkboxEl.checked);
                    clickListener = () => {
                        const values = [];
                        for (const checkboxEl of checkboxEls) {
                            if (!checkboxEl.checked) {
                                continue;
                            }
                            values.push(checkboxEl.value);
                        }
                        model[bindTo] = values;
                    };
                    checkboxEl.addEventListener('click', clickListener);
                }
            } else {
                for (const checkboxEl of checkboxEls) {
                    checkboxEl.checked = false;
                }
            }
        };
    }

    return { element, modelSetter };
}