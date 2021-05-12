/**
 * PageLoad component
 * @author Paul M
 */
const PageLoad = () => {
    return (
      <div className="text-center my-5">
        <div className="spinner-grow text-info mx-3" role="status">
          <span className="sr-only">Page Loading...</span>
        </div>
      </div>
    );
  }
  
  export default PageLoad;