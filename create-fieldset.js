import createHtml from './utilities/create-html.js';
import createId from './utilities/create-id.js';
import suffix from './utilities/suffix.js';

export default function createFieldset(definition) {
    const {
        fieldProvider,
        id = createId('input-'),
        preHelpText,
        postHelpText,
        required,
        title
    } = definition;

    const legendId = suffix(id, '-legend');
    const preHelpTextId = suffix(id, '-prehelptext');
    const postHelpTextId = suffix(id, '-posthelptext');

    return createHtml({
        name: 'div',
        attributes: {
            id: suffix(id, '-element'),
            role: 'group',
            'aria-labelledby': legendId
        },
        classes: ['fieldset'],
        children: [
            !title ? null : {
                name: 'legend',
                attributes: { id: legendId },
                children: [
                    title,
                    required ? null : [
                        ' ',
                        {
                            name: 'span',
                            children: ['(Optional)']
                        }
                    ]
                ]
            },
            !preHelpTextId ? null : {
                name: 'div',
                attributes: { id: preHelpTextId },
                classes: ['pre-help-text'],
                children: [preHelpText]
            },
            fieldProvider({ legendId, preHelpTextId, postHelpTextId }),
            !postHelpTextId ? null : {
                name: 'div',
                attributes: { id: postHelpTextId },
                classes: ['post-help-text'],
                children: [postHelpText]
            },
        ]
    });
}