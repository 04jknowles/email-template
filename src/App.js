import React, { Fragment, useEffect, useState } from "react";
import MjmlRenderer from "./template";
import SortableComponent from "./builder";
import "./styles.css";

export default function App() {
  const [mode, setMode] = useState("mobile");
  const [template, updateTemplate] = useState({
    title: "Heading",
    preview: "See what we have to say...",
    body:
      "This is an email. Skim it over and leave it in your inbox, or delete it, or move it to a folder. I wonder what you will do. So curious.",
    image: "https://xmh8v.mjt.lu/tplimg/xmh8v/b/0x23j/gs7nl.jpeg",
    cta: "Learn more",
    ctaLink: "https://www.wix.com/"
  });
  const [showEditModal, updateShowEditModal] = useState(false);
  const [internalText, updateInternalText] = useState(template.title);
  const [activeItem, updateActiveItem] = useState({});
  const [items, updateItems] = useState([
    {
      name: "Title",
      ordinality: 0,
      value: template.title
    },
    {
      name: "Body",
      ordinality: 1,
      value: template.body
    },
    {
      name: "CTA",
      ordinality: 2,
      value: template.cta,
      link: template.ctaLink
    },
    {
      name: "Image",
      ordinality: 3,
      value: template.image
    }
  ]);

  useEffect(() => {
    updateInternalText(activeItem.value);
  }, [activeItem]);

  return (
    <Fragment>
      {showEditModal ? (
        <div className="modal-background">
          <div className="create-input-options">
            <label>
              {activeItem.name}
              <input
                type="text"
                onChange={(e) => updateInternalText(e.target.value)}
                value={internalText}
              />
            </label>
            <div className="modal-button-group">
              <div
                className="edit-cancel"
                onClick={() => updateShowEditModal(false)}
              >
                Cancel
              </div>
              <div
                className="edit-submit"
                onClick={() => {
                  updateShowEditModal(false);
                  updateActiveItem({ ...activeItem, value: internalText });
                  updateItems(
                    items.map((i) => {
                      if (i.name === activeItem.name)
                        return { ...activeItem, value: internalText };
                      else return i;
                    })
                  );
                }}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="App">
        <h2>Email Builder</h2>
        <main>
          <section style={{ marginBottom: "15px" }}>
            <input
              onChange={(e) => setMode(e.target.value)}
              name="mode"
              type="radio"
              value="mobile"
              id="mobile"
              checked={mode === "mobile"}
            />
            <label for="mobile">Mobile</label>
            <input
              onChange={(e) => setMode(e.target.value)}
              name="mode"
              type="radio"
              value="pc"
              id="pc"
              checked={mode === "pc"}
            />
            <label for="mobile">PC</label>
          </section>
          <section>
            <SortableComponent
              template={template}
              updateShowEditModal={updateShowEditModal}
              activeItem={activeItem}
              updateActiveItem={updateActiveItem}
              items={items}
              updateItems={updateItems}
            />
            <MjmlRenderer mode={mode} template={template} items={items} />
          </section>
        </main>
      </div>
    </Fragment>
  );
}
