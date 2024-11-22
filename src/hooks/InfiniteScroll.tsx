import { useEffect, useRef } from 'react';
import Loader from '../views/Loader/Loader';



type Props = {
  callback: Function;
  children: any;
  isLoading: Boolean;
  hideSentinal: Boolean
}
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9,
};

function InfiniteScroller({ callback, isLoading, children, hideSentinal }: Props) {
  const observer = useRef<IntersectionObserver>();
  const ref = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading) {
          callback();
        }
      });
    }, options);

    if (observer.current && ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };

  }, [callback, isLoading]);

  return (
    <div style={{ width: "100%" }}>
      {children}
      {isLoading && <Loader size='medium' coverPage={false}/>}
      {hideSentinal && < div ref={ref} id="sentinel" style={{ height: "40px" }}> </div>}
    </div>
  )

}

export default InfiniteScroller;