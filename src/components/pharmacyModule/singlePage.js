// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";

// export default function SinglePage(props) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   function changePage(offset) {
//     setPageNumber(prevPageNumber => prevPageNumber + offset);
//   }

//   function previousPage() {
//     changePage(-1);
//   }

//   function nextPage() {
//     changePage(1);
//   }

//   const { pdf } = props;

//   return (
//     <>
//       <Document
//         file={pdf}
//         options={{ workerSrc: "/pdf.worker.js" }}
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <div>
//         <p>
//           Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
//         </p>
//         <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
//           Previous
//         </button>
//         <button
//           type="button"
//           disabled={pageNumber >= numPages}
//           onClick={nextPage}
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';
 
const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
 
  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    let previousButton = <li className="previous" onClick={() => setPage(page - 1)}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={() => setPage(page + 1)}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }
 
  const canvasEl = useRef(null);
 
  const [loading, numPages] = usePdf({
    file: 'test.pdf',
    page,
    canvasEl
  });
 
  useEffect(() => {
    setPages(numPages);
  }, [numPages]);
 
  return (
    <div>
      {loading && <span>Loading...</span>}
      <canvas ref={canvasEl} />
      {renderPagination(page, pages)}
    </div>
  );
}
 
export default MyPdfViewer;
