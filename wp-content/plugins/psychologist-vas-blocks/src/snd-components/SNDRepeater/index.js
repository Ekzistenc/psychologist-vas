import {
  Button
} from '@wordpress/components';

import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

import './style.scss';

export default function SNDRepeater({
  items = [],
  onAdd,
  onChange,
  onRemove,
  onDragEnd,
  renderItemTitle = (item, index) => `Item ${index + 1}`,
  renderItemPreview = (item, index) => null,
  children,
  droppableId = 'snd-repeater',
  addButtonText = 'Add'
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`${droppableId}-droppable`}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="snd-list-control"
            {...provided.droppableProps}
          >
            {items?.map((item, index) => (
              <Draggable
                key={`${droppableId}-draggable-${index}`}
                draggableId={`${droppableId}-draggable-${index}`}
                index={index}
              >
                {(provided) => (
                  <details
                    className="snd-list-control__item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <summary>
                      <div className="snd-list-control__dragabble-element"/>
                      <div className="snd-list-control__item-name">
                        {renderItemPreview(item, index)}
                        <span>{renderItemTitle(item, index)}</span>
                      </div>

                      <Button
                        __next40pxDefaultSize
                        variant="secondary"
                        size="small"
                        isDestructive={true}
                        title="Delete"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onRemove(index);
                        }}
                      >
                        ×
                      </Button>
                    </summary>

                    <div className="snd-list-control__item-content">
                      {children?.({
                        item,
                        index,
                        update: (field, value) =>
                          onChange(index, field, value)
                      })}
                    </div>
                  </details>
                )}
              </Draggable>
            ))}

            {provided.placeholder}

            <Button
              variant="primary"
              size="small"
              onClick={onAdd}
            >
              {addButtonText}
            </Button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}