import * as React from 'react';
import styles from './styles.module.css';
import './styles/base.css';
import { Dropdown, DropdownItem } from './components/Dropdown';
import { EditableBlock } from './components/EditableBlock';
import uuid from './utils/uuid';
export interface MarkdownProps {
  placeholder?: string;
  triggerKey?: string;
}

const items = [
  {
    name: 'Text',
    description: 'Plain text',
    tag: 'p',
  },
  {
    name: 'Heading 1',
    description: 'Big section heading',
    tag: 'h1',
  },
  {
    name: 'Heading 2',
    description: 'Medium section heading',
    tag: 'h2',
  },
  {
    name: 'Heading 3',
    description: 'Small section heading',
    tag: 'h3',
  },
];

const initalBlock = {
  uuid: uuid(),
  tag: 'p',
  content: '',
};

export const Markdown = ({ placeholder = 'Type Something', triggerKey = '/' }: MarkdownProps) => {
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState<DropdownItem>();
  const [dropdownisOpen, setDropdownIsOpen] = React.useState(false);
  const [rangeValues, setRangeValues] = React.useState({ top: 0, left: 0 });
  const [blocks, setBlocks] = React.useState([initalBlock]);
  const [blockFocus, setBlockFocus] = React.useState(initalBlock.uuid);

  const node = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (node?.current?.contains(e?.target)) {
      return;
    }

    setDropdownIsOpen(false);
  };

  React.useEffect(() => {
    console.log('blockFocus', blockFocus);
    const element = document.getElementById(blockFocus);
    element?.focus();
  }, [blockFocus]);

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
    alert('You selected ' + items[activeItemIndex].name);
  };

  return (
    <div id="content" className={styles.markdown}>
      {blocks?.map((block) => {
        return (
          <EditableBlock
            key={block.uuid}
            activeItemIndex={activeItemIndex}
            dropdownisOpen={dropdownisOpen}
            items={items}
            placeholder={placeholder}
            setActiveItemIndex={setActiveItemIndex}
            setDropdownIsOpen={setDropdownIsOpen}
            setRangeValues={setRangeValues}
            setSelectedItem={setSelectedItem}
            triggerKey={triggerKey}
            block={block}
            blocks={blocks}
            setBlocks={setBlocks}
            setBlockFocus={setBlockFocus}
          />
        );
      })}

      {dropdownisOpen && (
        <div ref={node}>
          <Dropdown
            items={items}
            activeItemIndex={activeItemIndex}
            handleItemClick={handleItemClick}
            handleOnMouseEnter={handleOnMouseEnter}
          />
        </div>
      )}
    </div>
  );
};
