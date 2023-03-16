import React, { useEffect } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

interface IdBottonProps {
  idRange: string[];
  idSelect: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterButtons = ({ idRange, onChange, idSelect }: IdBottonProps) => {
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    let str = 'check=';
    idSelect.forEach(e => (str = str.concat(e, '_')));
    setQuery(str);
  }, [idSelect]);

  const onSelect = (value: string) => {
    if (idSelect.includes(value)) {
      onChange(idSelect.filter(v => v !== value));
    } else {
      onChange([...idSelect, value]);
    }
  };

  return (
    <>
      <ButtonGroup colorScheme={'gray'}>
        {idRange.map(element => {
          return (
            <Button
              key={element}
              value={element}
              isActive={idSelect.includes(element)}
              onClick={() => onSelect(element)}
            >
              {element}
            </Button>
          );
        })}
      </ButtonGroup>
      <Button bg={'gray.100'} onClick={() => onChange([])}>
        초기화
      </Button>
    </>
  );
};

export default FilterButtons;
