import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./styles.css";
import SVG from "react-inlinesvg";
import drag from "./drag.svg";
import edit from "./edit.svg";
import close from "./close.svg";

const SortableItem = SortableElement(
  ({
    value,
    currentIndex,
    items,
    updateItems,
    updateActiveItem,
    updateShowEditModal
  }) => {
    return (
      <div data-index={currentIndex} className="layout-field">
        <div className="flex-row">
          <div className="drag-icon-container">
            <SVG src={drag} alt="draggable" className="draggable" />
          </div>
          <span>{value.name}</span>
        </div>
        <div className="flex-row">
          <span
            onClick={() => {
              updateActiveItem(value);
              updateShowEditModal(true);
            }}
          >
            <SVG src={edit} alt="edit" className="field-action" />
          </span>
          <span
            onClick={() =>
              updateItems(items.filter((i) => i.name !== value.name))
            }
          >
            <SVG src={close} alt="remove" className="field-action" />
          </span>
        </div>
      </div>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, updateItems, updateActiveItem, template, updateShowEditModal }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.name}`}
            index={index}
            value={value}
            items={items}
            updateItems={updateItems}
            updateActiveItem={updateActiveItem}
            template={template}
            updateShowEditModal={updateShowEditModal}
            disabled={index === 0}
          />
        ))}
      </div>
    );
  }
);

const SortableComponent = ({
  template,
  updateShowEditModal,
  activeItem,
  updateActiveItem,
  items,
  updateItems
}) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (newIndex !== 0) updateItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="Builder">
      <SortableList
        updateShowEditModal={updateShowEditModal}
        template={template}
        activeItem={activeItem}
        updateActiveItem={updateActiveItem}
        updateItems={updateItems}
        items={items}
        onSortEnd={onSortEnd}
        onSortStart={() => {
          document.body.style.cursor = "grabbing";
        }}
        distance={1}
      />
    </div>
  );
};

export default SortableComponent;
