import createForm from './create-form.js';

const { element, modelSetter } = createForm({
    id: 'form-id',
    title: 'Form Title',
    sections: [
        {
            title: '§ Text Field',
            rows: [
                {
                    fields: [
                        {
                            type: 'text',
                            title: 'Text Field 1',
                            preHelpText: 'Pre Help Text',
                            postHelpText: 'Post Help Text',
                            required: true,
                            bindTo: 'text-1'
                        },
                        {
                            type: 'text',
                            title: 'Text Field 1',
                            preHelpText: 'Pre Help Text',
                            postHelpText: 'Post Help Text',
                            readOnly: true,
                            required: true,
                            bindTo: 'text-2'
                        }
                    ]
                }
            ]
        },
        {
            title: '§ Textarea Field',
            rows: [
                {
                    fields: [
                        {
                            type: 'textarea',
                            title: 'Textarea Field 1',
                            preHelpText: 'Pre Help Text',
                            postHelpText: 'Post Help Text',
                            required: true,
                            rows: 5,
                            bindTo: 'textarea-1'
                        }
                    ]
                }
            ]
        },
        {
            title: '§ Checkbox Set',
            rows: [
                {
                    fields: [
                        {
                            type: 'checkboxset',
                            title: 'Checkbox Set Field 1',
                            preHelpText: 'Pre Help Text',
                            postHelpText: 'Post Help Text',
                            choices: [
                                { text: 'Choice 1', value: 'Choice 1' },
                                { text: 'Choice 2', value: 'Choice 2' },
                                { text: 'Choice 3', value: 'Choice 3' }
                            ],
                            bindTo: 'checkbox-set-1'
                        }
                    ]
                }
            ]
        },
        {
            title: '§ Repeatcontrol Row',
            rows: [
                {
                    type: 'repeatcontrol',
                    title: 'Repeatcontrol',
                    setTitle: 'Group',
                    rows: [
                        {
                            fields: [
                                {
                                    type: 'text',
                                    title: 'Text Field 1',
                                    preHelpText: 'Pre Help Text',
                                    postHelpText: 'Post Help Text',
                                    required: true,
                                    bindTo: 'text-1'
                                }
                            ]
                        },
                        {
                            fields: [
                                {
                                    type: 'textarea',
                                    title: 'Textarea Field 1',
                                    preHelpText: 'Pre Help Text',
                                    postHelpText: 'Post Help Text',
                                    required: true,
                                    rows: 5,
                                    bindTo: 'textarea-1'
                                }
                            ]
                        }
                    ],
                    bindTo: 'repeatcontrol-1'
                }
            ]
        }
    ]
});

document.body.append(element);

const model = window.model = {
    'text-1': 'Initial Value',
    'textarea-1': 'Initial Value',
    'checkbox-set-1': ['Choice 2'],
    'repeatcontrol-1': [
        { 'text-1': 'Initial Value' },
        { 'textarea-1': 'Initial Value' }
    ]
};
modelSetter(model);