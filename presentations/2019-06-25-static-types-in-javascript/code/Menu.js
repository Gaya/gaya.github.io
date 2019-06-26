import React, { useRef } from 'react';

function Search() {
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current.focus();

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput} value="focus input" />
    </>
  );
}

export default Search;
