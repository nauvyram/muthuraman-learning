/*
	customVirutualDom.js

	A tiny custom virtual DOM implementation with:
	- h(type, props, ...children) to create vnodes
	- render(vnode, container) to mount/update the DOM
	- simple diff/patch algorithm (index-based)

	Usage (browser): include this script and it will run a small demo that
	mounts a counter and updates it on a button click.

	API contract (minimal):
	- h(type, props, ...children) -> vnode
	- render(vnode, container) -> mounts or updates container._vnode

	Edge cases handled: text nodes, event props (onClick style), removal/replacement
*/

function h(type, props, ...children) {
  props = props || {};
  const flatChildren = children
    .flat()
    .map((c) => (typeof c === "object" ? c : createTextVNode(c)));
  return { type, props, children: flatChildren };
}

function createTextVNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: { nodeValue: String(text) },
    children: [],
  };
}

// Create a DOM node from a vnode
function createDom(vnode) {
  const dom =
    vnode.type === "TEXT_ELEMENT"
      ? document.createTextNode(vnode.props.nodeValue)
      : document.createElement(vnode.type);

  // Save a back-reference for future diffs
  vnode.dom = dom;

  // Set properties
  updateDomProperties(dom, {}, vnode.props);

  // Append children
  vnode.children.forEach((child) => dom.appendChild(createDom(child)));
  return dom;
}

function isEventProp(prop) {
  return /^on/.test(prop);
}

function extractEventName(prop) {
  return prop.slice(2).toLowerCase();
}

function updateDomProperties(dom, prevProps, nextProps) {
  // Remove old or changed event listeners
  Object.keys(prevProps).forEach((name) => {
    if (isEventProp(name)) {
      const eventType = extractEventName(name);
      dom.removeEventListener(eventType, prevProps[name]);
    } else if (!(name in nextProps)) {
      // remove old attributes
      if (name === "className") dom.removeAttribute("class");
      else dom.removeAttribute(name);
    }
  });

  // Set new or changed props
  Object.keys(nextProps).forEach((name) => {
    const value = nextProps[name];
    if (isEventProp(name)) {
      const eventType = extractEventName(name);
      dom.addEventListener(eventType, value);
    } else if (name === "className") {
      dom.setAttribute("class", value);
    } else if (name === "style" && typeof value === "object") {
      Object.assign(dom.style, value);
    } else if (name === "style") {
      dom.setAttribute("style", value);
    } else if (name !== "children") {
      // regular attribute
      dom.setAttribute(name, value);
    }
  });
}

function changed(node1, node2) {
  // Different type -> changed. Also text nodes with different value.
  if (!node1 && node2) return true;
  if (node1 && !node2) return true;
  if (node1.type !== node2.type) return true;
  if (
    node1.type === "TEXT_ELEMENT" &&
    node1.props.nodeValue !== node2.props.nodeValue
  )
    return true;
  return false;
}

// updateElement: diffs newVNode vs oldVNode and patches the actual DOM.
function updateElement(parentDom, newVNode, oldVNode, index = 0) {
  // If there was no old vnode, create and append
  if (!oldVNode) {
    parentDom.appendChild(createDom(newVNode));
    return;
  }

  // If newVNode is undefined/null -> remove old DOM node
  if (!newVNode) {
    parentDom.removeChild(oldVNode.dom);
    return;
  }

  if (changed(newVNode, oldVNode)) {
    parentDom.replaceChild(createDom(newVNode), oldVNode.dom);
    return;
  }

  // Same node type -> update props and recurse on children
  const dom = (newVNode.dom = oldVNode.dom);
  updateDomProperties(dom, oldVNode.props, newVNode.props);

  // Reconcile children (simple index-based algorithm)
  const newLen = newVNode.children.length;
  const oldLen = oldVNode.children.length;
  const max = Math.max(newLen, oldLen);
  for (let i = 0; i < max; i++) {
    updateElement(dom, newVNode.children[i], oldVNode.children[i], i);
  }
}

// render: mounts or updates a vnode tree into container
function render(vnode, container) {
  const prev = container._vnode;
  if (!prev) {
    container.appendChild(createDom(vnode));
  } else {
    updateElement(container, vnode, prev);
  }
  container._vnode = vnode;
}

// Expose API in a gentle way for the browser or modules
(function expose() {
  if (typeof window !== "undefined") {
    window.VDom = { h, render };
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { h, render };
  }
})();

// Demo: if running in a browser, create a small counter app to show updates
if (typeof document !== "undefined") {
  const root =
    document.getElementById("root") ||
    (function () {
      const d = document.createElement("div");
      d.id = "root";
      document.body.appendChild(d);
      return d;
    })();

  let count = 0;

  function view(c) {
    return h(
      "div",
      {
        className: "vdom-demo",
        style: { fontFamily: "sans-serif", padding: "10px" },
      },
      h("h2", null, "Custom Virtual DOM Demo"),
      h("p", null, "Count: ", String(c)),
      h(
        "button",
        {
          onClick: () => {
            count++;
            rerender();
          },
          style: { padding: "6px 10px" },
        },
        "Increment",
      ),
      h(
        "button",
        {
          onClick: () => {
            count = 0;
            rerender();
          },
          style: { marginLeft: "8px", padding: "6px 10px" },
        },
        "Reset",
      ),
    );
  }

  function rerender() {
    const vnode = view(count);
    render(vnode, root);
  }

  // initial render
  rerender();
}
