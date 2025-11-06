import { useComponentStateContext } from '@/context/ComponentStateContext';
import { set } from 'date-fns';
import { useLayoutEffect } from 'react';

/**
 * Custom hook to manage the state of a drawer component.
 *
 * @param {string} key - The unique key identifying the drawer.
 * @param {boolean} defaultOpen - The default open state for the drawer (default: false).
 * @returns {object} An object containing the drawer's state and control functions.
 * @throws {Error} If the hook is used outside of a ComponentStateProvider.
 */
export function useDrawer(key: string, defaultOpen: boolean = false) {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error('useDrawer must be used within a ComponentStateProvider');
  }

  const { open, setOpen, setClose } = context;

  // Initialize with default if key doesn't exist yet
  const isOpen = key in open ? !!open[key] : defaultOpen;

  // Set the initial state if this is the first time this key is used
  // Use useLayoutEffect to avoid setState during render
  useLayoutEffect(() => {
    if (!(key in open) && defaultOpen) {
      setOpen(key)();
    } else {
      setClose(key)();
    }
  }, []); // no dependencies to run only once on mount

  return { isOpen, openDrawer: setOpen(key), closeDrawer: setClose(key) };
}

/**
 * Custom hook to manage the state of a bag component.
 *
 * **bag** holds all the data for the bag per key. Meaning you can have multiple bags based on the key.
 *
 * **addToBag** is a function that takes a key and returns a function that takes a bag and adds it to the bag.
 *
 * **setBag** is a function that takes a key and returns a function that takes a bag and sets the bag. Meaning it will swap out the existing bag with the new bag.
 *
 *
 * @param {string} key - The unique key identifying the bag.
 * @returns {object} An object containing the bag's state and control functions.
 * @throws {Error} If the hook is used outside of a ComponentStateProvider.
 */
export function useBag(key: string) {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error('useBag must be used within a ComponentStateProvider');
  }

  const { bag, addToBag, setBag } = context;

  const currentBag = bag[key] || {};

  return { bag: currentBag, addToBag: addToBag(key), setBag: setBag(key) };
}

/**
 * Custom hook to manage the state of a temp component.
 *
 * @param {string} key - The unique key identifying the temp.
 * @returns {object} An object containing the temp's state and control functions.
 * @throws {Error} If the hook is used outside of a ComponentStateProvider.
 */
export function useTemp(key: string) {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error('useTemp must be used within a ComponentStateProvider');
  }

  const { temp, addToTemp, setTemp } = context;

  const currentTemp = temp[key] || {};

  return {
    temp: currentTemp,
    addToTemp: addToTemp(key),
    setTemp: setTemp(key),
  };
}

/**
 * Custom hook to manage the loading state of a component.
 *
 * @param {string} key - The unique key identifying the component.
 * @returns {object} An object containing the loading state and control functions.
 * @throws {Error} If the hook is used outside of a ComponentStateProvider.
 */
export function useLoading(key: string) {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error('useLoading must be used within a ComponentStateProvider');
  }

  const { loading, setLoading } = context;

  const isLoading = !!loading[key];

  return { isLoading, setLoading: setLoading(key) };
}

/**
 * Custom hook to toggle the open state of a component.
 *
 * @param {string} key - The unique key identifying the component.
 * @param {boolean} defaultOpen - The default open state for the component (default: false).
 * @returns {object} An object containing the toggle state and control functions.
 * @throws {Error} If the hook is used outside of a ComponentStateProvider.
 */
export function useToggle(key: string, defaultOpen: boolean = false) {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error('useToggle must be used within a ComponentStateProvider');
  }

  const { open, toggleOpen, setOpen } = context;

  // Initialize with default if key doesn't exist yet
  const isOpen = key in open ? !!open[key] : defaultOpen;

  // Set the initial state if this is the first time this key is used
  // Use useLayoutEffect to avoid setState during render
  useLayoutEffect(() => {
    if (!(key in open) && defaultOpen) {
      setOpen(key)();
    }
  }, []); // no dependencies to run only once on mount

  return { isOpen, toggleOpen: toggleOpen(key) };
}

/**
 * Custom hook to manage the disabled state of a component.
 *
 * @param {string} key - The unique key identifying the component.
 * @returns {object} An object containing the disabled state and control functions.
 * @throws {Error} If the hook is used outside of a ComponentStateProvider.
 */
export function useDisabled(key: string) {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error('useDisabled must be used within a ComponentStateProvider');
  }

  const { disabled, setDisabled } = context;

  const isDisabled = !!disabled[key];

  return { isDisabled, setDisabled: setDisabled(key) };
}

/**
 * Custom hook to manage the focused state of a component.
 *
 * @param {string} key - The unique key identifying the component.
 * @returns {object} An object containing the focused state and control functions.
 * @throws {Error} If the hook is used outside of a ComponentStateProvider.
 */
export function useFocused(key: string) {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error('useFocused must be used within a ComponentStateProvider');
  }

  const { focused, setFocused } = context;

  const isFocused = !!focused[key];

  return { isFocused, setFocused: setFocused(key) };
}

export function useItem(key: string) {
  const context = useComponentStateContext();
  if (!context) {
    throw new Error('useItem must be used within a ComponentStateProvider');
  }

  const { items, setItem } = context;

  const currentItem = items[key] || {};

  return { item: currentItem, setItem: setItem(key) };
}
