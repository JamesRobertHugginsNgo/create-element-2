import createHtml from './utilities/create-html.js';
import mergeValues from './utilities/merge-values.js';
import suffix from './utilities/suffix.js';

import createSection from './create-section.js';

const creators = { 'section': createSection }

export default function createForm(definition) {
    let modelSetter;

    const { id, sections, title } = definition;
    const element = createHtml({
        name: 'form',
        attributes: { id },
        classes: ['form'],
        children: [
            !title ? null : {
                name: 'h2',
                attributes: { id: suffix(id, '-form-title') },
                children: [title]
            },
            !sections ? null : sections.map((section) => {
                const { type = 'section' } = section;
                const { element: sectionEl, modelSetter: sectionModelSetter } = creators[type](section);
                modelSetter = mergeValues(modelSetter, sectionModelSetter);
                return sectionEl;
            })
        ]
    });

    return { element, modelSetter };
}