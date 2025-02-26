import { RefCallback, useEffect, useRef, useState } from 'react';

interface UseIntersectArgs {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

type UseIntersectReturn = [
  RefCallback<HTMLElement>, // function that receives the element to observe -- setNode aka ref
  boolean, // whether the element is in view -- isIntersecting
];

/**
 * React hook using Intersection Observer API to detect element visibility in viewport.
 * @param {Object} options - Configuration options
 * @param {Element} [options.root=null] - Viewport element (browser viewport if null)
 * @param {string} [options.rootMargin='0px'] - Margin around root--CSS format. e.g. "10px 20px 30px 40px" (top, right, bottom, left).
 * @param {number|number[]} [options.threshold=0] - Visibility percentage to trigger callback
 * @returns {[RefCallback<HTMLElement>, boolean]} [setNode, isIntersecting]
 * @example
 * const [setRef, isIntersecting] = useIntersect({ threshold: 0.5 });
 */

export function useIntersect({
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseIntersectArgs): UseIntersectReturn {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up any previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { root, rootMargin, threshold }
    );

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);

  return [setNode, isIntersecting];
}
