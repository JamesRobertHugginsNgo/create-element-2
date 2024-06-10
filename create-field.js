import createHtml from './utilities/create-html.js';
import createId from './utilities/create-id.js';
import suffix from './utilities/suffix.js';

export default function createField(definition) {
    const {
        fieldProvider,
        id = createId('input-'),
        preHelpText,
        postHelpText,
        required,
        title
    } = definition;

    const preHelpTextId = suffix(id, '-prehelptext');
    const postHelpTextId = suffix(id, '-posthelptext');

    return createHtml({
        name: 'div',
        attributes: { id: suffix(id, '-element') },
        classes: ['field'],
        children: [
            !title ? null : {
                name: 'label',
                attributes: { for: id },
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
            fieldProvider({ preHelpTextId, postHelpTextId }),
            !postHelpTextId ? null : {
                name: 'div',
                attributes: { id: postHelpTextId },
                classes: ['post-help-text'],
                children: [postHelpText]
            },
        ]
    });
}