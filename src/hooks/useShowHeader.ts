const useShowHeader = () => {
  const inIframe = () => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };
  return !inIframe();
};

export default useShowHeader;
