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

  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const text = event.target.innerText;
    if (text[text.length - 1] === triggerKey) {
      let range = document.createRange();
      let element = document.getElementById('content') as Node;
      let offset = window.getSelection()?.anchorOffset as number;
      range.setStart(element.firstChild as Node, offset);
      range.setEnd(element.firstChild as Node, offset);
      let rangeValue = range.getBoundingClientRect();
      setRangeValues({ top: rangeValue.top, left: rangeValue.left });
      setDropdownIsOpen(true);
    } else if (dropdownisOpen) {
      setDropdownIsOpen(false);
    }
  };

  const handleOnMouseEnter = (index: number) => {
    setActiveItemIndex(index);
  };

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item);
    setDropdownIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      if (activeItemIndex === 0) {
        return;
      }
      setActiveItemIndex(activeItemIndex - 1);
    } else if (event.key === 'ArrowDown') {
      if (activeItemIndex === items.length - 1) {
        return;
      }
      setActiveItemIndex(activeItemIndex + 1);
    } else if (event.key === 'Enter') {
      setSelectedItem(items[activeItemIndex]);
      setDropdownIsOpen(false);
    } else if (event.key === 'Escape') {
      setDropdownIsOpen(false);
    }
  };

  return (
    <div className={styles.markdown}>
      <div
        id="content"
        contentEditable={true}
        className={`${styles.test}`}
        placeholder={placeholder}
        onInput={handleChange}
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
