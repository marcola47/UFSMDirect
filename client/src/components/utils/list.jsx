import React, { useRef, useLayoutEffect } from 'react';
import { v4 as uuid } from 'uuid';

export function List({ elements, ListItem, onClick, styles = null, classes = "", ids = "", unwrapped = false })
{
  const listRef = useRef(null);

  useLayoutEffect(() => 
  {
    const listElement = listRef.current;
    const storedScrollOffsetY = sessionStorage.getItem(`${ids}:y`);
    const storedScrollOffsetX = sessionStorage.getItem(`${ids}:x`);
    
    if (listElement)
    {
      listElement.scrollTop = Number(storedScrollOffsetY);
      listElement.scrollLeft = Number(storedScrollOffsetX);
    }

    // eslint-disable-next-line
  }, []);

  function handleScroll() 
  {
    const listElement = listRef.current;
    
    if (listElement)
    {
      const scrollOffsetY = listElement.scrollTop;
      const scrollOffsetX = listElement.scrollLeft;

      sessionStorage.setItem(`${ids}:y`, scrollOffsetY);
      sessionStorage.setItem(`${ids}:x`, scrollOffsetX);
    }
  }

  if (unwrapped)
    return <>{ elements.map(element => { return <ListItem itemData={ element } key={ element.id ?? uuid() }/> }) }</>

  return (
    <ul 
      className={ classes } 
      id={ ids } 
      ref={ listRef } 
      onScroll={ handleScroll } 
      onClick={ onClick } 
      styles={ styles }
      children={ elements.map(element => { return <ListItem itemData={ element } key={ element.id ?? uuid() }/> }) }
    />
  )
}