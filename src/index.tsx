import * as React from 'react';
import styles from './styles.module.css';
import './styles/tailwind.css';
export interface MarkdownProps {
  placeholder?: string;
  triggerKey?: string;
}

export const Markdown = ({ placeholder = 'Type Something', triggerKey = '/' }: MarkdownProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    if (event.target.innerText === triggerKey) {
      console.log('Triggered');
    }
  };
  return (
    <div
      contentEditable={true}
      className={`${styles.test} bg-gray-300 border-gray-300`}
      placeholder={placeholder}
      onInput={handleChange}
    />
  );
};
