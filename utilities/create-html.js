export default function createHtml(definition) {
    const {
        name,
        attributes,
        classes,
        styles,
        children,
        callback
    } = definition;

    const htmlEl = !name
        ? document.createDocumentFragment()
        : document.createElement(name);

    if (attributes) {
        for (const name in attributes) {
            const value = attributes[name];
            if (value == null) {
                continue;
            }

            htmlEl.setAttribute(name, value);
        }
    }

    if (classes) {
        htmlEl.classList.add(...classes.filter((className) => className != null));
    }

    if (styles) {
        const values = [];
        for (const style in styles) {
            values.push(`${style}:${styles[style]};`)
        }
        htmlEl.setAttribute('style', values.join(''));
    }

    if (children) {
        for (const child of children) {
            if (child == null) {
                continue;
            }

            if (Array.isArray(child)) {
                htmlEl.append(createHtml({ children: child }));
                continue;
            }

            if (typeof child === 'object' && !(child instanceof Node)) {
                htmlEl.append(createHtml(child));
                continue;
            }

            htmlEl.append(child);
        }
    }

    if (callback) {
        callback(htmlEl, definition);
    }

    return htmlEl;
}