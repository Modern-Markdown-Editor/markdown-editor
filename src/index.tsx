import * as React from 'react';
import styles from './styles.module.css';
import './styles/base.css';
import { Dropdown } from './components/Dropdown';
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
  React.useEffect(() => {
    let element = document.getElementById('content');
  });
  const [dropdownisOpen, setDropdownIsOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    const text = event.target.innerText;
    if (text[text.length - 1] === triggerKey) {
      setDropdownIsOpen(true);
    } else if (dropdownisOpen) {
      setDropdownIsOpen(false);
    }
  };

  return (
    <div className={styles.markdown}>
      <div contentEditable={true} className={`${styles.test}`} placeholder={placeholder} onInput={handleChange} />
      <Dropdown isOpen={dropdownisOpen} items={items} />
      <input id="content" type="text"></input>
    </div>
  );
};
