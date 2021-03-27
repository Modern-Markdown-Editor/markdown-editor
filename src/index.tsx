import * as React from 'react';
import styles from './styles.module.css';
import './styles/base.css';
import { Dropdown, DropdownItem } from './components/Dropdown';
export interface MarkdownProps {
  placeholder?: string;
  triggerKey?: string;
}

const items = [
  {
    name: 'Text',
    description: 'Plain text',
  },
  {
    name: 'Heading 1',
    description: 'Big section heading',
  },
  {
    name: 'Heading 2',
    description: 'Medium section heading',
  },
  {
    name: 'Heading 3',
    description: 'Small section heading',
  },
  {
    name: 'Bullet list',
    description: 'List with bullet points',
  },
  {
    name: 'Numbered',
    description: 'List with numbering',
  },
];

export const Markdown = ({ placeholder = 'Type Something', triggerKey = '/' }: MarkdownProps) => {
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState<DropdownItem>();
  const [dropdownisOpen, setDropdownIsOpen] = React.useState(false);
  const [rangeValues, setRangeValues] = React.useState({ top: 0, left: 0 });
  React.useEffect(() => {
    if (dropdownisOpen) {
      let top = 0;
      let left = 0;
      let dropdown = document.getElementById('dropdown');
      if (dropdown) {
        top = rangeValues.top;
        left = rangeValues.left;
        if (rangeValues.left + dropdown.offsetWidth > window.innerWidth) {
          left = left - (rangeValues.left + dropdown.offsetWidth - window.innerWidth) - 50;
        }
        if (rangeValues.top + dropdown.offsetHeight > window.innerHeight) {
          top = top - (rangeValues.left + dropdown.offsetHeight - window.innerHeight) - 50;
        }
      }
      dropdown?.setAttribute('style', `top:${top}px;left:${left}px`);
    }
  }, [dropdownisOpen]);

  const handleOnMouseEnter = (index: number) => {
    setActiveItemIndex(index);
  };

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item);
    setDropdownIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (dropdownisOpen) {
      event.preventDefault();
    }
    if (event.key == triggerKey) {
      event.preventDefault();
      let range = document.createRange();
      let offset = window.getSelection()?.anchorOffset as number;
      let element = document.activeElement as Node;
      range.setStart(element.firstChild as Node, offset);
      range.setEnd(element.firstChild as Node, offset);

      let rangeValue = range.getBoundingClientRect();
      setRangeValues({ top: rangeValue.top, left: rangeValue.left });
      setDropdownIsOpen(true);
      switch (event.key) {
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
          setSelectedItem(items[activeItemIndex]);
          setDropdownIsOpen(false);
          break;
        }
        default: {
          if (dropdownisOpen) {
            setDropdownIsOpen(false);
          }
          break;
        }
      }
    } else {
      if (event.key == 'Enter') {
        event.preventDefault();
        let element = document.getElementById('content');
        let newElement = document.createElement('div') as HTMLElement;
        newElement.setAttribute('contenteditable', 'true');
        newElement.setAttribute('placeholder', placeholder);
        newElement.setAttribute('class', `${styles.test}`);
        element?.appendChild(newElement);
        newElement.focus();
      }
    }
  };

  return (
    <div id="content" className={styles.markdown}>
      <div
        contentEditable={true}
        className={`${styles.test}`}
        placeholder={placeholder}
        // onInput={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Dropdown
        isOpen={dropdownisOpen}
        items={items}
        activeItemIndex={activeItemIndex}
        handleItemClick={handleItemClick}
        handleOnMouseEnter={handleOnMouseEnter}
      />
    </div>
  );
};
