import * as React from 'react';
import { DropdownItem } from './Dropdown';
import styles from '../styles.module.css';
import uuid from '../utils/uuid';

interface EditableBlockProps {
  triggerKey: string;
  dropdownisOpen: boolean;
  setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
  activeItemIndex: number;
  items: {
    name: string;
    description: string;
    tag: string;
  }[];
  setSelectedItem: React.Dispatch<React.SetStateAction<DropdownItem | undefined>>;
  placeholder: string;
  setRangeValues: React.Dispatch<
    React.SetStateAction<{
      top: number;
      left: number;
    }>
  >;
  block: {
    uuid: string;
    tag: string;
    content: string;
  };
  blocks: {
    uuid: string;
    tag: string;
    content: string;
  }[];
  setBlocks: React.Dispatch<
    React.SetStateAction<
      {
        uuid: string;
        tag: string;
        content: string;
      }[]
    >
  >;
  setBlockFocus: React.Dispatch<React.SetStateAction<string>>;
}

export const EditableBlock = ({
  triggerKey,
  dropdownisOpen,
  setRangeValues,
  setDropdownIsOpen,
  setActiveItemIndex,
  activeItemIndex,
  items,
  setSelectedItem,
  placeholder,
  block,
  blocks,
  setBlocks,
  setBlockFocus,
}: EditableBlockProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (dropdownisOpen) {
      event.preventDefault();
    }

    switch (event.key) {
      case triggerKey: {
        let range = document.createRange();
        let offset = window.getSelection()?.anchorOffset as number;
        let element;
        if (!document.activeElement?.firstChild) {
          element = document.activeElement as HTMLElement;
          element.innerHTML = ' ';
        }
        element = document.activeElement as Node;
        range.setStart(element.firstChild as Node, offset);
        range.setEnd(element.firstChild as Node, offset);

        let rangeValue = range.getBoundingClientRect();
        setRangeValues({ top: rangeValue.top, left: rangeValue.left });
        setDropdownIsOpen(true);
        break;
      }
      case 'ArrowUp': {
        if (activeItemIndex === 0) {
          return;
        }
        setActiveItemIndex(activeItemIndex - 1);
        break;
      }
      case 'ArrowDown': {
        if (activeItemIndex === items.length - 1) {
          return;
        }
        setActiveItemIndex(activeItemIndex + 1);
        break;
      }
      case 'Enter': {
        if (!dropdownisOpen) {
          event.preventDefault();
          const tempBlocks = [...blocks];
          const tempBlock = {
            uuid: uuid(),
            tag: 'p',
            content: '',
          };
          tempBlocks.splice(tempBlocks.findIndex(({ uuid }) => uuid === block.uuid) + 1, 0, tempBlock);
          setBlocks([...tempBlocks]);
          setBlockFocus(tempBlock.uuid);
        } else {
          setDropdownIsOpen(false);
          alert('You selected ' + items[activeItemIndex].name);
          // const tempBlocks = [...blocks];
          // const tempBlock = tempBlocks[tempBlocks.findIndex(({ uuid }) => uuid === block.uuid)];
          // tempBlock.tag = items[activeItemIndex].tag;
          // tempBlocks.splice(
          //   tempBlocks.findIndex(({ uuid }) => uuid === block.uuid),
          //   1,
          //   tempBlock,
          // );
          // setBlocks([...tempBlocks]);
        }

        break;
      }
      default: {
        if (dropdownisOpen) {
          setDropdownIsOpen(false);
        }
        break;
      }
    }
  };

  console.log('block', block);

  return React.createElement(block.tag || 'div', {
    onKeyDown: handleKeyDown,
    placeholder: placeholder || '',
    className: `${styles.test}`,
    contentEditable: true,
    id: block.uuid,
    onInput: (event: React.ChangeEvent<HTMLElement>) => {
      // console.log('event', event.target.innerText);
      // const tempBlocks = [...blocks];
      // const tempBlock = tempBlocks[tempBlocks.findIndex(({ uuid }) => uuid === block.uuid)];
      // Change the content as we type.
      // tempBlock.content = event.target.innerText;
      // tempBlocks.splice(
      //   tempBlocks.findIndex(({ uuid }) => uuid === block.uuid),
      //   1,
      //   tempBlock,
      // );
      // setBlocks([...tempBlocks]);
      // Need to move the cursor to the end of the line
    },
    dangerouslySetInnerHTML: {
      __html: block.content,
    },
  });
};
