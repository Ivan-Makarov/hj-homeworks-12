'use strict';

function createElement(node) {
    return typeof node === 'string' ? document.createTextNode(node) : createNodeFromObject()

    function createNodeFromObject() {
        const element = document.createElement(node.name);

        if (typeof node.props === 'object' && node.props !== null) {
            Object.keys(node.props).forEach(i => element
                .setAttribute(i, node.props[i]));
        }

        if (node.childs instanceof Array) {
            node.childs.forEach(child => {
                const nodeChild = createElement(child);
                element.appendChild(nodeChild);
            })
        }
        return element;
    }
}
