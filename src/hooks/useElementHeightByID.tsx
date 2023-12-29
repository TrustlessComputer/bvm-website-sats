const useElementHeightByID = (id: string) => {
  return () => {
    const element = document.getElementById(id);
    if (element) {
      return element.offsetHeight;
    }
    return 0;
  };
};

export default useElementHeightByID;
